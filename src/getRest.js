import moment from 'moment'
import _ from '../config'
import get from '../utils/fetch'

const today = moment().format('YYYY-MM-DD')

export default function getRest (restaurantId, time) {
  return new Promise((resolve, reject) => {
    get(_.to(`preorder/api/v2.1/restaurants/list?tabUniqueId=${restaurantId}&targetTime=${today}+${time}`), {
      headers: { 'cookie': _.COOKIE }
    }).then(body => {
      resolve(body)
    })
  })
}
