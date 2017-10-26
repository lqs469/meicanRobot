import moment from 'moment'
import config from '../config'
import get from '../utils/fetch'


export default function getCalendarItems (date = moment().format('YYYY-MM-DD')) {
  return new Promise((resolve, reject) => {
    get(config.to(`preorder/api/v2.1/calendarItems/list?beginDate=${date}&endDate=${date}`), {
      headers: { cookie: config.COOKIE }
    }).then(body => {
      resolve(body)
    }).catch((err) => {
      reject(err)
    })
  })
}
