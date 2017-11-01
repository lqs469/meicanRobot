import React, { Component } from 'react'
import echarts from 'echarts'
import 'whatwg-fetch'
import './home.less'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import moment from 'moment'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.columns = [
      {
        Header: '店名',
        accessor: 'name'
      },
      {
        Header: '可订总量',
        accessor: 'dishLimit'
      },
      {
        Header: '已订',
        accessor: 'availeDish'
      },
      {
        id: 'targetTime',
        Header: '时间',
        accessor: item => {
          return moment(item.targetTime).format('MM-DD HH:mm')
        }
      },
      {
        id: 'rank',
        Header: '订餐率',
        accessor: item => {
          return ((item.dishLimit - item.availeDish) / item.dishLimit * 100).toFixed(3) + '%'
        }
      }
    ]
    this.state = {
      data: []
    }
  }

  componentDidMount () {
    fetch('/getAllData')
      .then(res => res.json())
      .then(res => {
        this.setState({ data: res.data })
        this.dateChart(res.data)
        this.shopChart(res.data)
      })
  }

  dateChart (data) {
    let dataByDate = {}
    data.forEach((item, i) => {
      const date = moment(item.targetTime)
        .add(2, 'hours')
        .format('MM-DD')
      if (dataByDate[date]) {
        dataByDate[date].avail += item.availeDish
        dataByDate[date].count += item.dishLimit
      } else {
        dataByDate[date] = {
          avail: item.availeDish,
          count: item.dishLimit
        }
      }
    })

    const myChart = echarts.init(document.getElementById('date'))
    myChart.setOption({
      title: { text: '每日总订餐率' },
      tooltip: {},
      xAxis: {
        data: Object.keys(dataByDate),
        axisLabel: {
          inside: !true,
          interval: 0,
          rotate: 45,
          fontWeight: '700'
        },
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'line',
          data: Object.values(dataByDate).map(d => (d.count - d.avail) / d.count)
        }
      ]
    })
  }

  shopChart (data) {
    let dataByName = {}
    data.forEach((item, i) => {
      const name = item.name
      if (dataByName[name]) {
        dataByName[name].avail += item.availeDish
        dataByName[name].count += item.dishLimit
      } else {
        dataByName[name] = {
          avail: item.availeDish,
          count: item.dishLimit
        }
      }
    })

    const myChart = echarts.init(document.getElementById('shop'))
    myChart.setOption({
      title: { text: '餐厅订餐率' },
      tooltip: {},
      grid: {
        bottom: '120'
      },
      xAxis: {
        data: Object.keys(dataByName),
        axisLabel: {
          inside: !true,
          interval: 0,
          rotate: 45,
          fontWeight: '700'
        },
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: Object.values(dataByName).map(d => ({
            value: (d.count - d.avail) / d.count,
            itemStyle: {
              normal: {
                color: '#' + Math.round(Math.random() * 10000000).toString(16)
              },
              emphasis: {
                color: '#ff0000'
              }
            }
          }))
        }
      ]
    })
  }

  render () {
    const { data } = this.state

    return (
      <div>
        <section>
          <ReactTable data={data} columns={this.columns} defaultPageSize={10} />
        </section>
        <section>
          <div id='date' style={{ width: '100%', height: '400px' }} />
        </section>
        <section>
          <div id='shop' style={{ width: '100%', height: '400px' }} />
        </section>
      </div>
    )
  }
}
