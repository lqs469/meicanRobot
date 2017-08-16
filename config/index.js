// All URL configuration
// cookie 的过期时间未知，正在试验。。。
// TARGET_ADDR 目标地点与顺序无关
import cookie from '../COOKIE'

const TIME         = 60000
const TARGET_ADDR  = '首开'
const BASE_PREFIX  = 'https://meican.com/'
const ADDR         = 'preorder/api/v2.1/calendarItems/list'
const COOKIE       = cookie
const LQS469_ROBOT = 'https://oapi.dingtalk.com/robot/send?access_token=70d88eae5dc7d60096a12902122dd852567b7e086a8fdf1ffc0cfc1d9f4071a2'
const JARVIS       = 'https://oapi.dingtalk.com/robot/send?access_token=d85a89a9f348e0eeef4e949db950039f0734c1e332fc34e79dfdebb5cb2b4721'

// analysis
const DATE_COUNTER = 10

const config = {
  TIME,
  TARGET_ADDR,
  BASE_PREFIX,
  ADDR,
  COOKIE,
  LQS469_ROBOT,
  JARVIS,
  DATE_COUNTER,
  to: (addr) => BASE_PREFIX + addr
}

export const __DB__ = {
  host               : 'localhost',
  user               : 'root',
  password           : 'password',
  database           : 'meican',
  multipleStatements : true
}

export default config
