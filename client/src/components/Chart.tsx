import React, { Fragment } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { line } from "d3-shape"

const Line = (showMedian) => (chartData) => {
  const {
    points,
    xScale,
    yScale,
    data
  } = chartData

  if (!showMedian) {
    return null
  }
  const medianY = points.reduce((sum, d) => sum + d.y, 0) / points.length
  const average = (points.reduce((sum, d) => sum + d.data.y, 0) / points.length).toFixed(2)
  const lineGenerator = line()
    .x(point => {
      return point.x
    })
    .y(() => {
      return medianY
    })

  const denominator = points.length > 20 ? Math.ceil(points.length / 20) : 1

  return (
    <Fragment>
      <path
        d={lineGenerator(points)}
        fill="none"
        stroke="#f00"
        style={{ pointerEvents: "none" }}
      />
      {points.slice(0, 20).map(point => (
        <circle
          key={point.index}
          cx={point.x * denominator}
          cy={medianY}
          r={2}
          fill="white"
          stroke={"#f00"}
          style={{ pointerEvents: "none" }}
        />
      ))}
      <text
        x={points[points.length-1].x}
        y={medianY}
      >${average} (avg)</text>
    </Fragment>
  );
};

const RenderedChart = ({data, meta, showMedian}) => {
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
      enablePoints={false}
      enableGridX={false}
      colors={{ scheme: 'category10' }}
      pointSize={4}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor', modifiers: [] }}
      pointLabelYOffset={-12}
      areaOpacity={1}
      useMesh={true}
      layers={['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines', 'points', Line(showMedian), 'slices', 'mesh', 'legends']}
  />
}

export default function Chart({data: chartData, meta, showMedian}) {
  return (
    <div className="chart-wrapper">
      <RenderedChart data={chartData} meta={meta} showMedian={showMedian}></RenderedChart>
    </div>
  )
}