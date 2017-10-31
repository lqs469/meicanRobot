import React from 'react'
import ReactDOM from 'react-dom'
import Home from './home'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function main () {
  ReactDOM.render(
    <Router>
      <Route path='/' component={Home} />
    </Router>,
    document.getElementById('root'))
}

main()
