import _ from '../config'

export default function timer (func) {
  return (arg) => setInterval(() => {
    func(arg)
  }, _.TIME)
}
