import getCalendarItems from './src/getCalendarItems'
import getDish from './src/getDish'
import postTips from './src/postTips'
import timer from './utils/timer'
import checkOneTimeOneDay from './src/checkOneTimeOneDay'
import moment from 'moment'
import config from './config'

function getMeiCanData () {
  return getCalendarItems().then(data => {
    return data.dateList[0].calendarItemList.map(i => {
      return getDishData(i.title, i.status, i.userTab.uniqueId, i.openingTime.postboxOpenTime)
    })
  })
}

function getDishData (title, status, id, time) {
  return getDish(id, time).then(data => {
    return { [`${title} ${status} ${time}`]: data.restaurantList.map(r => r.name) }
  })
}

function doTip (checkOneTimeOneDay) {
  getMeiCanData().then(data => {
    Promise.all(data).then(data => {
      let text = ''
      console.log('-------------------------------')
      console.log('Now is ' + moment().format('YYYY-MM-DD HH:mm:ss'))
      console.log(data)
      console.log('----------------')

      data.forEach(o => {
        const key = Object.keys(o)[0]
        const now = moment().add(3, 'hours')
        const endTime = moment(key.split(' ')[2], 'hhmm')
        console.log('now + 4 hours = ' + now.format('HH:mm'), 'EndTime is ' + endTime.format('HH:mm'), 'isTime?=' +
          endTime.isSame(now, 'minute'))

        if (key.indexOf(config.TARGET_ADDR) > -1 && key.indexOf('AVAILABLE') >= 0 && endTime.isSame(now, 'minute')) {
          console.log('do tip')
          let rests = ''

          for (let i in o[key]) {
            rests += ` ${o[key][i]}`
          }

          text += `\n##### **${key.replace(/[AVAILABLE|CLOSED|ORDER]|晚餐\d/g, '')}**
            店铺: ${rests}
            `
          // o[key].map(t => ` ${t}`)
        }
      })

      if (checkOneTimeOneDay(text)) {
        postTips(text)
      }
    })
  })
}

timer(doTip)(checkOneTimeOneDay)
