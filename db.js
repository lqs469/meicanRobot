import fs from 'fs'
import pool from './db/pool'
import run from './utils/runGenerators'
import getCalendarItems from './src/getCalendarItems'
import getRest from './src/getRest'
import moment from 'moment'
import config from './config'

const __INIT_SQL__ = fs.readFileSync('./db/init.sql').toString()
const __ACTION_SQL__ = fs.readFileSync('./db/actions.sql').toString()

const creator = () => pool.connect(__INIT_SQL__)

const actions = () => pool.connect(__ACTION_SQL__)

const insert = __INSERT_SQL__ => pool.connect(__INSERT_SQL__)

const calendarItems = []
const restsList = []

function getUniqueId () {
  return new Promise((resolve, reject) => {
    getCalendarItems()
      .then(data => {
        data.dateList[0].calendarItemList.forEach(c => {
          const targetTime = moment(c.targetTime).format('+HH:mm')
          calendarItems.push({
            uniqueId: c.userTab.uniqueId,
            targetTime
          })
        })
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  })
}

const getRests = () => {
  const getArr = []
  for (let i = 0; i < config.DATE_COUNTER; i++) {
    const date = moment().subtract(i, 'days').format('YYYY-MM-DD')
    calendarItems.forEach(c => {
      getArr.push({
        uniqueId: c.uniqueId,
        timestamp: `${date}${c.targetTime}`
      })
    })
  }

  function pushSql (d) {
    if (d.restaurantList.length > 0) {
      d.restaurantList.forEach(r => {
        restsList.push(r)
        const SQL =
          `use meican;CALL addRest('${r.name}',${r.latitude},${r.longitude},${r.dishLimit},` +
          `${r.availableDishCount},${r.rating},'${r.uniqueId}','${d.targetTime}')`
        console.log(SQL)
        insert(SQL)
      })
    }
    this.count++
  }

  function fetchRest (element) {
    return getRest(element.uniqueId, element.timestamp)
  }

  function run (resolve) {
    let p = Promise.resolve()
    let time = { count: 0 }

    getArr.forEach(element => {
      p = p
        .then(() => {
          if (time.count === getArr.length - 1) {
            resolve()
          }
          return fetchRest(element)
        })
        .then(pushSql.bind(time))
    })
  }

  return new Promise(resolve => {
    run(resolve)
  })
}

const saved = () => Promise.resolve().then(() => console.log('[saved]'))

function getDishes () {
  function run (resolve) {
    console.log(restsList)
    resolve()
  }

  return new Promise(resolve => {
    run(resolve)
  })
}

function *gen () {
  yield creator()
  yield actions()
  yield getUniqueId()
  yield getRests()
  yield saved()
  yield getDishes()
}

run(gen)
