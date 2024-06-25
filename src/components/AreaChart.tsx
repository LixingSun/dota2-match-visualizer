import ReactECharts from 'echarts-for-react';
import { useMemo, useRef } from 'react';
import { useChartResize } from '@/hooks/useChartResize';
import { formatMinute } from '@/utils/converters';

const defaultOptions = {
  backgroundColor: 'transparent',
  grid: { top: 8, right: 16, bottom: 24, left: 54 },
  xAxis: {
    type: 'category',
    data: [],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [],
      type: 'line',
      smooth: true,
    },
  ],
  tooltip: {
    trigger: 'axis',
    valueFormatter: (value: number) =>
      `${value >= 0 ? 'Radiant' : 'Dire'} leads by ${Math.abs(value)}`,
  },
};

interface IAreaChartProps {
  data: number[];
}

const AreaChart: React.FC<IAreaChartProps> = ({ data }) => {
  const chartRef = useRef<ReactECharts>(null);
  useChartResize(chartRef);

  const options = useMemo(() => {
    return {
      ...defaultOptions,
      xAxis: {
        type: 'category',
        data: data.map((_, index) => formatMinute(index)),
      },
      series: [
        {
          type: 'line',
          smooth: true,
          data,
          areaStyle: {},
        },
      ],
      visualMap: {
        left: 'right',
        min: 0,
        max: 1,
        inRange: {
          color: ['#d32029', '#6f9412'],
        },
        text: ['>0', '<0'],
        show: false,
      },
    };
  }, [data]);

  return (
    <ReactECharts
      ref={chartRef}
      option={options}
      theme="dark"
      style={{ height: '100%', width: '100%' }}
    />
  );
};
export default AreaChart;
