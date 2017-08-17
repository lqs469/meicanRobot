import mysql from 'mysql'
import { __DB__ } from '../config'

const pool = mysql.createPool({
  host               : __DB__.host,
  user               : __DB__.user,
  password           : __DB__.password,
  multipleStatements : __DB__.multipleStatements
})


function end () {
  pool.end(function (err) {
    if (err) throw err
    console.log('[close pool]')
  })
}

function connect (query) {
  return new Promise((resolve, reject) => {
    pool.query(query, function (error, data) {
      if (error) {
        reject(error)
        throw error
      }
      resolve(data)
    })
  })
}

export default { connect, end }
