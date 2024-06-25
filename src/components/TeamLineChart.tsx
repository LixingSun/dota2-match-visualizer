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
  series: [],
  tooltip: {
    trigger: 'axis',
  },
};

interface ILineChartProps {
  data: number[][];
}

const TeamLineChart: React.FC<ILineChartProps> = ({ data }) => {
  const chartRef = useRef<ReactECharts>(null);
  useChartResize(chartRef);

  const options = useMemo(() => {
    return {
      ...defaultOptions,
      xAxis: {
        type: 'category',
        data: data[0].map((_, index) => formatMinute(index)),
      },
      series: [
        {
          name: 'Radiant',
          type: 'line',
          smooth: true,
          data: data[0],
          itemStyle: { color: '#6f9412' },
          lineStyle: { color: '#6f9412' },
        },
        {
          name: 'Dire',
          type: 'line',
          smooth: true,
          data: data[1],
          itemStyle: { color: '#d32029' },
          lineStyle: { color: '#d32029' },
        },
      ],
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
export default TeamLineChart;
