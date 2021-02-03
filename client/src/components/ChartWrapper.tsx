import React, { useEffect, useState } from 'react'
import Chart from './Chart'
const moment = require('moment')

export default function ChartWrapper({data}) {
  const [chartData, setChartData] = useState([])
  const [meta, setMeta] = useState({})
  useEffect(() => {
    if (!data?.l?.length) {
      return
    }
    const newChartData: any = [{
      id: 'stockz',
      color: "hsl(53, 70%, 50%)",
      data: []
    }]

    for (let i = 0; i < data.l.length; i++) {
      const date = moment.unix(data.t[i]).format('YYYY-MM-DD')
  
      newChartData[0].data.push({
        x: date,
        y: (+data.c[i]).toFixed(2),
      })
    }

    const totalLength = data.l.length
    const newMeta = {
      tickValues: [
        moment.unix(data.t[0]).format('YYYY-MM-DD'),
        moment.unix(data.t[Math.floor(totalLength / 3)]).format('YYYY-MM-DD'),
        moment.unix(data.t[Math.floor(totalLength * 2 / 3)]).format('YYYY-MM-DD'),
        moment.unix(data.t[totalLength - 1]).format('YYYY-MM-DD')
      ]
    }
    setMeta(newMeta)
    setChartData(newChartData)
    console.log('[Chart Wrapper]', newMeta, newChartData)
  }, [data])
  return (
    <div>
      {!data && <span>No data available</span>}
      <Chart data={chartData} meta={meta}></Chart>
    </div>
  )
}