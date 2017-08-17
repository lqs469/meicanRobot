import pool from '../db/pool'

export default function run (gen) {
  const g = gen()

  function next () {
    const result = g.next()
    if (result.done) {
      pool.end()
      return result
    }
    result.value.then(() => {
      next()
    }).catch((err) => {
      console.log('run generator err:', err)
    })
  }

  next()
}
