import LineChart from '@/components/LineChart';
import { Row, Col } from 'antd';

export const Match: React.FC = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <LineChart />
      </Col>
      <Col span={12}>
        <LineChart />
      </Col>
      <Col span={12}>
        <LineChart />
      </Col>
      <Col span={12}>
        <LineChart />
      </Col>
    </Row>
  );
};
