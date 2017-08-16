import fs from 'fs'
import pool from './db/pool'
import run from './utils/runGenerators'
import getCalendarItems from './src/getCalendarItems'
import moment from 'moment'
import _ from './config'

const __INIT_SQL__ = fs.readFileSync('./db/init.sql').toString()
const __ACTION_SQL__ = fs.readFileSync('./db/actions.sql').toString()

const creator = () => pool.connect(__INIT_SQL__)

const actions = () => pool.connect(__ACTION_SQL__)

const insert = (__INSERT_SQL__) => pool.connect(__INSERT_SQL__)

const seekArr = []


const getData = () => {
  const getArr = []
  for (let i = 0; i < _.DATE_COUNTER; i++) {
    getArr.push(getCalendarItems(moment().subtract(i, 'days').format('YYYY-MM-DD')))
  }

  return Promise.all(getArr).then((data) => {
    console.log(data)
    seekArr.push(insert('CALL addRest("test",2,3,4,5,6,7,8)'))
    // return
  }).catch((err) => console.log(err))
}

const save = () => Promise.all(seekArr).then(data => data)

function* gen () {
  yield creator()
  yield actions()
  yield getData()
  yield save()
}

run(gen)
