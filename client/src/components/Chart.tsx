import React from 'react'
import { ResponsiveLine } from '@nivo/line'

const RenderedChart = ({data, meta}) => {
  const tooltipStyle = {
    backgroundColor:'#fff',
    borderRadius: '4px',
    padding: '4px',
    border: '1px solid #c3c3c3'
  }
  return <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: meta.min || 'auto', max: meta.max || 'auto', reverse: false }}
      yFormat=" >-$.2f"
      axisTop={null}
      axisRight={null}
      tooltip={(input) => {
        return (
        <div>
          <div style={tooltipStyle}>${input.point.data.y} on {input.point.data.xFormatted}</div>
        </div>
      )}}
      axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          tickValues: meta?.tickValues ? [...meta.tickValues] : [],
          legendOffset: 36,
          legendPosition: 'middle'
      }}
      axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -40,
          legendPosition: 'middle',
          format: '$'
      }}
      enablePoints={true}
      enableGridX={false}
      colors={{ scheme: 'category10' }}
      pointSize={4}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor', modifiers: [] }}
      pointLabelYOffset={-12}
      areaOpacity={1}
      useMesh={true}
  />
}

export default function Chart({data: chartData, meta}) {
  return (
    <div className="chart-wrapper">
      <RenderedChart data={chartData} meta={meta}></RenderedChart>
    </div>
  )
}