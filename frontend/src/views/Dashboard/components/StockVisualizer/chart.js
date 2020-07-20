import palette from 'theme/palette';
import React from 'react';
import { ResponsiveLine } from '@nivo/line';


const commonProperties = {
  margin: { top: 20, right: 60, bottom: 60, left: 60 },
  animate: true,
  enableSlices: 'x',
}

export const StockChart = ({ data }) => (
  <ResponsiveLine
    {...commonProperties}
    data={data}
    margin={{ top: 0, right: 110, bottom: 50, left: 60 }}
    xScale={{
      type: 'time',
      format: '%Y-%m-%d %H:%M:%S',
      useUTC: true,
      precision: 'minute',
      min: 'auto',
      max: 'auto'
    }}
    xFormat="time:%H:%M"
    yScale={{
      type: 'linear',
      stacked: false,
      min: 'auto',
      max: 'auto',
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 2,
      tickRotation: 0,
      legend: 'stock price (USD)',
      legendOffset: -40,
      legendPosition: 'middle'
    }}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'day of month (UTC)',
      legendOffset: 36,
      legendPosition: 'middle',
      format: '%d',
      // // tickValues: 'every 1 day',
      // legend: 'time scale',
      // legendOffset: 20,
    }}
    curve={'monotoneX'}
    enablePointLabel={false}

    pointSize={2}
    pointBorderWidth={0.2}
    pointBorderColor={{
      from: 'color',
      modifiers: [['darker', 0.3]],
    }}
    colors={{ scheme: 'nivo' }}
    useMesh={true}
    enableSlices={false}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
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
