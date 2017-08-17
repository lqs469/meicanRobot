import fetch from 'node-fetch'

const Universefetch = (url, params) => {
  return fetch(url, params)
    .then(res => res.json())
}

export default Universefetch
