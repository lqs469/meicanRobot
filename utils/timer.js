import _ from '../config'

export default function timer (func) {
  const time = process.env.NODE_ENV === 'prod' ? _.TIME : _.TIME / 20

  return (arg) => setInterval(() => {
    func(arg)
  }, time)
}
