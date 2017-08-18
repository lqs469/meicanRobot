import React, { Component } from 'react'
import 'whatwg-fetch'
import './home.less'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }


  componentDidMount () {
    this.getData()
    this.map = new AMap.Map('mapContainer')
  }

  componentDidUpdate () {
    console.log('update', this.state.data)
  }

  getData () {
    fetch('/getAllData').then(data => data.json())
      .then(data => {
        console.log('getData')
        data.data.forEach((data) => {
          // this.addLayout(data.longitude, data.latitude, data.name)
        })
        this.addLayout(116.493, 39.979)

        // this.setState({ data })
      })
  }

  addLayout (x, y, name) {
    console.log(x, y)

    const marker = new AMap.Marker({
      position: new AMap.LngLat(x, y), // [x, y],
      map: this.map
    })
    // marker.setMap(this.map)
    this.map.setFitView()

    marker.on('click', () => {
      const info = new AMap.InfoWindow({
        content: `${name} ${x} ${y}`,
        offset: new AMap.Pixel(0, -28)
      })
      info.open(this.map, [x, y])
    })
  }

  render () {
    return (
      <div className='home' id='mapContainer' />
    )
  }
}
