import React, { Component } from 'react'
import 'whatwg-fetch'
import './home.less'
import Store from './store'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount () {
    this.getData()
    this.map = new AMap.Map('mapContainer', {
      mapStyle: 'amap://styles/253e89dee4b710c717de629867d9a148'
    })
  }

  componentDidUpdate () {
    console.log('update', this.state.data)
  }

  getData () {
    fetch('/getAllData')
      .then(data => data.json())
      .then(data => {
        this.renderMap(data.data)
      })
  }

  renderMap (data) {
    // let started = false
    const { map } = this
    const canvas = document.createElement('canvas')
    canvas.width = this.map.getSize().width
    canvas.height = this.map.getSize().height
    const customLayer = new AMap.CustomLayer(canvas, {
      zooms: [3, 19],
      zIndex: 12
    })

    customLayer.render = onRender
    customLayer.setMap(this.map)

    function onRender () {
      let points = []
      for (let i = 0; i < data.length; i += 1) {
        points.push({
          containerPos: map.lngLatToContainer(new AMap.LngLat(data[i].longitude, data[i].latitude))
        })
      }
      draw(points)
    }

    function circle () {
      const c = document.createElement('canvas')
      c.width = c.height = 40
      let ctx = c.getContext('2d')
      let grd = ctx.createRadialGradient(20, 20, 0, 20, 20, 20)
      grd.addColorStop(0, 'rgba(255, 0, 0, 0.7)')
      ctx.fillStyle = grd
      ctx.beginPath()
      ctx.arc(20, 20, 20, 0, 2 * Math.PI)
      ctx.fill()
      return c
    }

    function draw (points) {
      const radious = 5
      const context = canvas.getContext('2d')
      context.clearRect(0, 0, canvas.width, canvas.height)

      points.forEach(point => {
        context.drawImage(
          circle(),
          point.containerPos.x - radious,
          point.containerPos.y - radious,
          radious * 2,
          radious * 2
        )
      })
    }
  }

  addLayout (x, y, name, a, l) {
    // const marker = new AMap.Marker({
    //   position: [x, y],
    //   map: this.map
    // })
    // const circle = new AMap.Circle({
    //   center: [x, y],
    //   radius: a / l * 100,
    //   fillOpacity: a / l * 0.75,
    //   strokeWeight: 0.1
    // })
    // circle.setMap(this.map)
    // this.map.setFitView()
    // marker.on('click', () => {
    //   const info = new AMap.InfoWindow({
    //     content: `${name} ${x} ${y}`,
    //     offset: new AMap.Pixel(0, -28)
    //   })
    //   info.open(this.map, [x, y])
    // })
  }

  render () {
    return (
      <div className='bg'>
        <div className='map' id='mapContainer' />
        <div className='content'>
          <Store />
        </div>
      </div>
    )
  }
}
