import { FC, useMemo, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { useChartResize } from '@/hooks/useChartResize';
import { direColor, radiantColor } from '@/styles/variables';

const defaultOptions = {
  backgroundColor: 'transparent',
  grid: { top: 10, right: 10, bottom: 10, left: 10 },
  tooltip: {
    trigger: 'item',
  },
  visualMap: {
    show: false,
    min: 0,
    max: 90000,
    inRange: {
      colorLightness: [0, 1],
    },
  },
};

const seriesOption = {
  type: 'pie',
  roseType: 'radius',
  radius: '75%',
  center: ['50%', '50%'],
  labelLine: {
    lineStyle: {
      color: 'rgba(255, 255, 255, 0.3)',
    },
    smooth: 0.2,
    length: 10,
    length2: 20,
  },
};

export interface IPieChartDataEntity {
  value: number;
  name: string;
}

const PieChart: FC<{ data: IPieChartDataEntity[]; isRadiant: boolean }> = ({
  data,
  isRadiant,
}) => {
  const chartRef = useRef<ReactECharts>(null);
  useChartResize(chartRef);

  const options = useMemo(() => {
    return {
      ...defaultOptions,
      series: [
        {
          ...seriesOption,
          data: data.sort(function (a, b) {
            return a.value - b.value;
          }),
          itemStyle: {
            color: isRadiant ? radiantColor : direColor,
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      ],
    };
  }, [data, isRadiant]);

  return (
    <ReactECharts
      ref={chartRef}
      option={options}
      theme="dark"
      style={{ height: '100%', width: '100%' }}
    />
  );
};

export default PieChart;
