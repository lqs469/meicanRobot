import moment from 'moment'
import _ from '../config'
import get from '../utils/fetch'

const today = moment().format('YYYY-MM-DD')

export default function getCalendarItems () {
  return new Promise((resolve, reject) => {
    get(_.to(`preorder/api/v2.1/calendarItems/list?beginDate=${today}&endDate=${today}`), {
      headers: { 'cookie': _.COOKIE }
    }).then(body => {
      resolve(body)
    })
  })
}
