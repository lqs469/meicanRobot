import config from '../config'

export default function timer (func) {
  const time = process.env.NODE_ENV === 'prod' ? config.TIME : 5000

  return arg =>
    setInterval(() => {
      func(arg)
    }, time)
}
