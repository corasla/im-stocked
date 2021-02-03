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
    let foundMax = Number.NEGATIVE_INFINITY
    let foundMin = Number.POSITIVE_INFINITY
    for (let i = 0; i < data.l.length; i++) {
      const min = data.l[i]
      const max = data.h[i]
      const average = (min + max) / 2
      if (max > foundMax) {
        foundMax = max
      }
      if (min < foundMin) {
        foundMin = min
      }
      const date = moment.unix(data.t[i]).format('YYYY-MM-DD')
  
      newChartData[0].data.push({
        x: date,
        y: average,
      })
    }

    // const totalLength = data.l.length
    // const diffBetweenMinAndMax = (foundMax-foundMin)
    const newMeta = {
      // max: foundMax,
      // min: foundMin
      // tickValues: [
      //   data.t[0],
      //   data.t[totalLength - 1],
      // ]
    }
    setMeta(newMeta)
    setChartData(newChartData)
    console.log('[Chart Wrapper]', newMeta, newChartData)
  }, [data])
  return (
    <div>
      {!data && <span>No data available</span>}
      {data && <Chart data={chartData} meta={meta}></Chart>}
    </div>
  )
}