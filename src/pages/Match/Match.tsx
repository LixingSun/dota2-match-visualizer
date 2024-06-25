import { useEffect, useState, FC } from 'react';
import { Row, Col } from 'antd';
import LineChart from '@/components/LineChart';
import data from '@/data/match.json';
import ChartCard from '@/components/ChartCard';

interface IMatchData {
  radiant_gold_adv?: number[];
  radiant_xp_adv?: number[];
}

export const Match: FC = () => {
  const [matchData, SetMatchData] = useState<IMatchData | null>(null);

  useEffect(() => {
    SetMatchData({
      radiant_gold_adv: data.radiant_gold_adv,
      radiant_xp_adv: data.radiant_xp_adv,
    });
  }, []);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} lg={12}>
        <ChartCard title="Gold Advantage">
          <LineChart data={matchData?.radiant_gold_adv} />
        </ChartCard>
      </Col>
      <Col xs={24} lg={12}>
        <ChartCard title="Experience Advantage">
          <LineChart data={matchData?.radiant_xp_adv} />
        </ChartCard>
      </Col>
    </Row>
  );
};
