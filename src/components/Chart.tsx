import React from 'react'
import { ResponsiveLine } from '@nivo/line'

const RenderedChart = ({data}) => {
  return <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          tickValues: ['Jan 04 2016', 'Apr 15 2016', 'Jul 25 2016', 'Dec 23 2016'],
          legend: 'transportation',
          legendOffset: 36,
          legendPosition: 'middle'
      }}
      axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle'
      }}
      enablePoints={false}
      enableGridX={false}
      colors={{ scheme: 'nivo' }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor', modifiers: [] }}
      pointLabelYOffset={-12}
      areaOpacity={1}
      useMesh={true}
      legends={[
          {
              anchor: 'bottom-right',
              direction: 'row',
              justify: false,
              translateX: -1,
              translateY: 49,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 130,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemBackground: 'rgba(0, 0, 0, .03)',
                          itemOpacity: 1
                      }
                  }
              ]
          }
      ]}
  />
}

export default function Chart({data: chartData}) {
  return (
    <div className="chart-wrapper">
      <RenderedChart data={chartData}></RenderedChart>
    </div>
  )
}