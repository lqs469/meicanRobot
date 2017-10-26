import moment from 'moment'
import config from '../config'
import get from '../utils/fetch'


export default function getRest (uniqueId, time = moment().format('YYYY-MM-DD')) {
  return new Promise((resolve, reject) => {
    const url = `preorder/api/v2.1/restaurants/list?tabUniqueId=${uniqueId}&targetTime=${time}`
    get(config.to(url), {
      headers: { cookie: config.COOKIE }
    }).then(body => {
      resolve(body)
    }).catch((err) => {
      reject()
      console.log('getRest', err)
    })
  })
}
