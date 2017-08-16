import pool from '../db/pool'

export default function run (gen) {
  const g = gen()

  function next () {
    const result = g.next()
    console.log(result.value)
    if (result.done) {
      pool.end()
      return result
    }
    result.value.then(() => {
      next()
    })
  }

  next()
}
