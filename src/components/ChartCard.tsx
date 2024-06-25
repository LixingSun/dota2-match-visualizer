import { Card } from 'antd';
import { FC, ReactNode } from 'react';

interface IChartCardProps {
  title: string;
  children: ReactNode;
}
const ChartCard: FC<IChartCardProps> = ({ title, children }) => {
  return (
    <Card style={{ width: '100%' }} title={title}>
      <div style={{ height: 400 }}>{children}</div>
    </Card>
  );
};

export default ChartCard;
