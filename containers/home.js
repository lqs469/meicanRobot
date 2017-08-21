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
          console.log(data.longitude, data.latitude, data.name, data.availeDish, data.dishLimit)
          this.addLayout(data.longitude, data.latitude, data.name, data.availeDish, data.dishLimit)
        })

        // this.setState({ data })
      })
  }

  addLayout (x, y, name, a, l) {
    const marker = new AMap.Marker({
      position: [x, y],
      map: this.map
    })
    const circle = new AMap.Circle({
      center: [x, y],
      radius: a / l * 100,
      fillOpacity: a / l * 0.75,
      strokeWeight: 0.1
    })
    circle.setMap(this.map)

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
