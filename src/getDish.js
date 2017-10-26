import moment from 'moment'
import config from '../config'
import get from '../utils/fetch'


export default function getDish (restaurantId, time) {
  return new Promise((resolve) => {
    const today = moment().format('YYYY-MM-DD')
    get(config.to(`preorder/api/v2.1/restaurants/list?tabUniqueId=${restaurantId}&targetTime=${today}+${time}`), {
      headers: { cookie: config.COOKIE }
    }).then(body => {
      resolve(body)
    })
  })
}
