import React from 'react';
import './App.css';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ResponsiveLine } from '@nivo/line'

const chartData = [{
  id: "stockz",
  color: "hsl(53, 70%, 50%)",
  data: [
    { x: 'Jan 04 2016', y: 105.35 },
    { x: 'Jan 05 2016', y: 102.71 },
    { x: 'Jan 06 2016', y: 100.7 },
    { x: 'Jan 07 2016', y: 96.45 },
    { x: 'Jan 08 2016', y: 96.96 },
    { x: 'Jan 11 2016', y: 98.53 },
    { x: 'Jan 12 2016', y: 99.96 },
    { x: 'Jan 13 2016', y: 97.39 },
    { x: 'Jan 14 2016', y: 99.52 },
    { x: 'Jan 15 2016', y: 97.13 },
    { x: 'Jan 19 2016', y: 96.66 },
    { x: 'Jan 20 2016', y: 96.79 },
    { x: 'Jan 21 2016', y: 96.3 },
    { x: 'Jan 22 2016', y: 101.42 },
    { x: 'Jan 25 2016', y: 99.44 },
    { x: 'Jan 26 2016', y: 99.99 },
    { x: 'Jan 27 2016', y: 93.42 },
    { x: 'Jan 28 2016', y: 94.09 },
    { x: 'Jan 29 2016', y: 97.34 },
    { x: 'Feb 01 2016', y: 96.43 },
    { x: 'Feb 02 2016', y: 94.48 },
    { x: 'Feb 03 2016', y: 96.35 },
    { x: 'Feb 04 2016', y: 96.6 },
    { x: 'Feb 05 2016', y: 94.02 },
    { x: 'Feb 08 2016', y: 95.01 },
    { x: 'Feb 09 2016', y: 94.99 },
    { x: 'Feb 10 2016', y: 94.27 },
    { x: 'Feb 11 2016', y: 93.7 },
    { x: 'Feb 12 2016', y: 93.99 },
    { x: 'Feb 16 2016', y: 96.64 },
    { x: 'Feb 17 2016', y: 98.12 },
    { x: 'Feb 18 2016', y: 96.26 },
    { x: 'Feb 19 2016', y: 96.04 },
    { x: 'Feb 22 2016', y: 96.88 },
    { x: 'Feb 23 2016', y: 94.69 },
    { x: 'Feb 24 2016', y: 96.1 },
    { x: 'Feb 25 2016', y: 96.76 },
    { x: 'Feb 26 2016', y: 96.91 },
    { x: 'Feb 29 2016', y: 96.69 },
    { x: 'Mar 01 2016', y: 100.53 },
    { x: 'Mar 02 2016', y: 100.75 },
    { x: 'Mar 03 2016', y: 101.5 },
    { x: 'Mar 04 2016', y: 103.01 },
    { x: 'Mar 07 2016', y: 101.87 },
    { x: 'Mar 08 2016', y: 101.03 },
    { x: 'Mar 09 2016', y: 101.12 },
    { x: 'Mar 10 2016', y: 101.17 },
    { x: 'Mar 11 2016', y: 102.26 },
    { x: 'Mar 14 2016', y: 102.52 },
    { x: 'Mar 15 2016', y: 104.58 },
    { x: 'Mar 16 2016', y: 105.97 },
    { x: 'Mar 17 2016', y: 105.8 },
    { x: 'Mar 18 2016', y: 105.92 },
    { x: 'Mar 21 2016', y: 105.91 },
    { x: 'Mar 22 2016', y: 106.72 },
    { x: 'Mar 23 2016', y: 106.13 },
    { x: 'Mar 24 2016', y: 105.67 },
    { x: 'Mar 28 2016', y: 105.19 },
    { x: 'Mar 29 2016', y: 107.68 },
    { x: 'Mar 30 2016', y: 109.56 },
    { x: 'Mar 31 2016', y: 108.99 },
    { x: 'Apr 01 2016', y: 109.99 },
    { x: 'Apr 04 2016', y: 111.12 },
    { x: 'Apr 05 2016', y: 109.81 },
    { x: 'Apr 06 2016', y: 110.96 },
    { x: 'Apr 07 2016', y: 108.54 },
    { x: 'Apr 08 2016', y: 108.66 },
    { x: 'Apr 11 2016', y: 109.02 },
    { x: 'Apr 12 2016', y: 110.44 },
    { x: 'Apr 13 2016', y: 112.04 },
    { x: 'Apr 14 2016', y: 112.1 },
    { x: 'Apr 15 2016', y: 109.85 },
    { x: 'Apr 18 2016', y: 107.48 },
    { x: 'Apr 19 2016', y: 106.91 },
    { x: 'Apr 20 2016', y: 107.13 },
    { x: 'Apr 21 2016', y: 105.97 },
    { x: 'Apr 22 2016', y: 105.68 },
    { x: 'Apr 25 2016', y: 105.08 },
    { x: 'Apr 26 2016', y: 104.35 },
    { x: 'Apr 27 2016', y: 97.82 },
    { x: 'Apr 28 2016', y: 94.83 },
    { x: 'Apr 29 2016', y: 93.74 },
    { x: 'May 02 2016', y: 93.64 },
    { x: 'May 03 2016', y: 95.18 },
    { x: 'May 04 2016', y: 94.19 },
    { x: 'May 05 2016', y: 93.24 },
    { x: 'May 06 2016', y: 92.72 },
    { x: 'May 09 2016', y: 92.79 },
    { x: 'May 10 2016', y: 93.42 },
    { x: 'May 11 2016', y: 92.51 },
    { x: 'May 12 2016', y: 90.34 },
    { x: 'May 13 2016', y: 90.52 },
    { x: 'May 16 2016', y: 93.88 },
    { x: 'May 17 2016', y: 93.49 },
    { x: 'May 18 2016', y: 94.56 },
    { x: 'May 19 2016', y: 94.2 },
    { x: 'May 20 2016', y: 95.22 },
    { x: 'May 23 2016', y: 96.43 },
    { x: 'May 24 2016', y: 97.9 },
    { x: 'May 25 2016', y: 99.62 },
    { x: 'May 26 2016', y: 100.41 },
    { x: 'May 27 2016', y: 100.35 },
    { x: 'May 31 2016', y: 99.86 },
    { x: 'Jun 01 2016', y: 98.46 },
    { x: 'Jun 02 2016', y: 97.72 },
    { x: 'Jun 03 2016', y: 97.92 },
    { x: 'Jun 06 2016', y: 98.63 },
    { x: 'Jun 07 2016', y: 99.03 },
    { x: 'Jun 08 2016', y: 98.94 },
    { x: 'Jun 09 2016', y: 99.65 },
    { x: 'Jun 10 2016', y: 98.83 },
    { x: 'Jun 13 2016', y: 97.34 },
    { x: 'Jun 14 2016', y: 97.46 },
    { x: 'Jun 15 2016', y: 97.14 },
    { x: 'Jun 16 2016', y: 97.55 },
    { x: 'Jun 17 2016', y: 95.33 },
    { x: 'Jun 20 2016', y: 95.1 },
    { x: 'Jun 21 2016', y: 95.91 },
    { x: 'Jun 22 2016', y: 95.55 },
    { x: 'Jun 23 2016', y: 96.1 },
    { x: 'Jun 24 2016', y: 93.4 },
    { x: 'Jun 27 2016', y: 92.04 },
    { x: 'Jun 28 2016', y: 93.59 },
    { x: 'Jun 29 2016', y: 94.4 },
    { x: 'Jun 30 2016', y: 95.6 },
    { x: 'Jul 01 2016', y: 95.89 },
    { x: 'Jul 05 2016', y: 94.99 },
    { x: 'Jul 06 2016', y: 95.53 },
    { x: 'Jul 07 2016', y: 95.94 },
    { x: 'Jul 08 2016', y: 96.68 },
    { x: 'Jul 11 2016', y: 96.98 },
    { x: 'Jul 12 2016', y: 97.42 },
    { x: 'Jul 13 2016', y: 96.87 },
    { x: 'Jul 14 2016', y: 98.79 },
    { x: 'Jul 15 2016', y: 98.78 },
    { x: 'Jul 18 2016', y: 99.83 },
    { x: 'Jul 19 2016', y: 99.87 },
    { x: 'Jul 20 2016', y: 99.96 },
    { x: 'Jul 21 2016', y: 99.43 },
    { x: 'Jul 22 2016', y: 98.66 },
    { x: 'Jul 25 2016', y: 97.34 },
    { x: 'Jul 26 2016', y: 96.67 },
    { x: 'Jul 27 2016', y: 102.95 },
    { x: 'Jul 28 2016', y: 104.34 },
    { x: 'Jul 29 2016', y: 104.21 },
    { x: 'Aug 01 2016', y: 106.05 },
    { x: 'Aug 02 2016', y: 104.48 },
    { x: 'Aug 03 2016', y: 105.79 },
    { x: 'Aug 04 2016', y: 105.87 },
    { x: 'Aug 05 2016', y: 107.48 },
    { x: 'Aug 08 2016', y: 108.37 },
    { x: 'Aug 09 2016', y: 108.81 },
    { x: 'Aug 10 2016', y: 108 },
    { x: 'Aug 11 2016', y: 107.93 },
    { x: 'Aug 12 2016', y: 108.18 },
    { x: 'Aug 15 2016', y: 109.48 },
    { x: 'Aug 16 2016', y: 109.38 },
    { x: 'Aug 17 2016', y: 109.22 },
    { x: 'Aug 18 2016', y: 109.08 },
    { x: 'Aug 19 2016', y: 109.36 },
    { x: 'Aug 22 2016', y: 108.51 },
    { x: 'Aug 23 2016', y: 108.85 },
    { x: 'Aug 24 2016', y: 108.03 },
    { x: 'Aug 25 2016', y: 107.57 },
    { x: 'Aug 26 2016', y: 106.94 },
    { x: 'Aug 29 2016', y: 106.82 },
    { x: 'Aug 30 2016', y: 106 },
    { x: 'Aug 31 2016', y: 106.1 },
    { x: 'Sept 01 2016', y: 106.73 },
    { x: 'Sept 02 2016', y: 107.73 },
    { x: 'Sept 06 2016', y: 107.7 },
    { x: 'Sept 07 2016', y: 108.36 },
    { x: 'Sept 08 2016', y: 105.52 },
    { x: 'Sept 09 2016', y: 103.13 },
    { x: 'Sept 12 2016', y: 105.44 },
    { x: 'Sept 13 2016', y: 107.95 },
    { x: 'Sept 14 2016', y: 111.77 },
    { x: 'Sept 15 2016', y: 115.57 },
    { x: 'Sept 16 2016', y: 114.92 },
    { x: 'Sept 19 2016', y: 113.58 },
    { x: 'Sept 20 2016', y: 113.57 },
    { x: 'Sept 21 2016', y: 113.55 },
    { x: 'Sept 22 2016', y: 114.62 },
    { x: 'Sept 23 2016', y: 112.71 },
    { x: 'Sept 26 2016', y: 112.88 },
    { x: 'Sept 27 2016', y: 113.09 },
    { x: 'Sept 28 2016', y: 113.95 },
    { x: 'Sept 29 2016', y: 112.18 },
    { x: 'Sept 30 2016', y: 113.05 },
    { x: 'Oct 03 2016', y: 112.52 },
    { x: 'Oct 04 2016', y: 113 },
    { x: 'Oct 05 2016', y: 113.05 },
    { x: 'Oct 06 2016', y: 113.89 },
    { x: 'Oct 07 2016', y: 114.06 },
    { x: 'Oct 10 2016', y: 116.05 },
    { x: 'Oct 11 2016', y: 116.3 },
    { x: 'Oct 12 2016', y: 117.34 },
    { x: 'Oct 13 2016', y: 116.98 },
    { x: 'Oct 14 2016', y: 117.63 },
    { x: 'Oct 17 2016', y: 117.55 },
    { x: 'Oct 18 2016', y: 117.47 },
    { x: 'Oct 19 2016', y: 117.12 },
    { x: 'Oct 20 2016', y: 117.06 },
    { x: 'Oct 21 2016', y: 116.6 },
    { x: 'Oct 24 2016', y: 117.65 },
    { x: 'Oct 25 2016', y: 118.25 },
    { x: 'Oct 26 2016', y: 115.59 },
    { x: 'Oct 27 2016', y: 114.48 },
    { x: 'Oct 28 2016', y: 113.72 },
    { x: 'Oct 31 2016', y: 113.54 },
    { x: 'Nov 01 2016', y: 111.49 },
    { x: 'Nov 02 2016', y: 111.59 },
    { x: 'Nov 03 2016', y: 109.83 },
    { x: 'Nov 04 2016', y: 108.84 },
    { x: 'Nov 07 2016', y: 110.41 },
    { x: 'Nov 08 2016', y: 111.06 },
    { x: 'Nov 09 2016', y: 110.88 },
    { x: 'Nov 10 2016', y: 107.79 },
    { x: 'Nov 11 2016', y: 108.43 },
    { x: 'Nov 14 2016', y: 105.71 },
    { x: 'Nov 15 2016', y: 107.11 },
    { x: 'Nov 16 2016', y: 109.99 },
    { x: 'Nov 17 2016', y: 109.95 },
    { x: 'Nov 18 2016', y: 110.06 },
    { x: 'Nov 21 2016', y: 111.73 },
    { x: 'Nov 22 2016', y: 111.8 },
    { x: 'Nov 23 2016', y: 111.23 },
    { x: 'Nov 25 2016', y: 111.79 },
    { x: 'Nov 28 2016', y: 111.57 },
    { x: 'Nov 29 2016', y: 111.46 },
    { x: 'Nov 30 2016', y: 110.52 },
    { x: 'Dec 01 2016', y: 109.49 },
    { x: 'Dec 02 2016', y: 109.9 },
    { x: 'Dec 05 2016', y: 109.11 },
    { x: 'Dec 06 2016', y: 109.95 },
    { x: 'Dec 07 2016', y: 111.03 },
    { x: 'Dec 08 2016', y: 112.12 },
    { x: 'Dec 09 2016', y: 113.95 },
    { x: 'Dec 12 2016', y: 113.3 },
    { x: 'Dec 13 2016', y: 115.19 },
    { x: 'Dec 14 2016', y: 115.19 },
    { x: 'Dec 15 2016', y: 115.82 },
    { x: 'Dec 16 2016', y: 115.97 },
    { x: 'Dec 19 2016', y: 116.64 },
    { x: 'Dec 20 2016', y: 116.95 },
    { x: 'Dec 21 2016', y: 117.06 },
    { x: 'Dec 22 2016', y: 116.29 },
    { x: 'Dec 23 2016', y: 116.52 },
    { x: 'Dec 27 2016', y: 117.26 },
    { x: 'Dec 28 2016', y: 116.76 },
    { x: 'Dec 29 2016', y: 116.73 },
    { x: 'Dec 30 2016', y: 115.82 },
  ]
}]


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

const MyResponsiveLine = ({ data /* see data tab */ }) => (
  <ResponsiveLine
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
)

export default function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <div className={classes.root}>
        <Button variant="contained" color="primary">
          Somethin
        </Button>
      </div>
      <div className="chart-wrapper">
        <MyResponsiveLine data={chartData}></MyResponsiveLine>
      </div>
    </div>
  );
}
