import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';
import { useRef } from 'react';
import { useChartResize } from '../hooks/useChartResize';

const options = {
  backgroundColor: 'transparent',
  grid: { top: 8, right: 16, bottom: 24, left: 36 },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
    },
  ],
  tooltip: {
    trigger: 'axis',
  },
};

const LineChart: React.FC = () => {
  const chartRef = useRef<ReactECharts>(null);
  useChartResize(chartRef);

  return (
    <Card style={{ width: '100%' }}>
      <div style={{ height: 400 }}>
        <ReactECharts
          ref={chartRef}
          option={options}
          theme="dark"
          style={{ height: '100%', width: '100%' }}
        />
      </div>
    </Card>
  );
};
export default LineChart;
