import { FC, useContext } from 'react';
import { Row, Col } from 'antd';
import ChartCard from '@/components/ChartCard';
import TeamLineChart from '@/components/TeamLineChart';
import AreaChart from '@/components/AreaChart';
import { MatchDataContext } from '@/contexts/MatchData';
import TeamScoreboard from './TeamScoreboard';
import Overview from './Overview';
import PieChart from '@/components/PieChart';

const Match: FC = () => {
  const matchData = useContext(MatchDataContext);
  const radiantHeroDamage = matchData.players
    .filter((player) => player.isRadiant)
    .map((player) => ({ value: player.heroDamage, name: player.name }));
  const direHeroDamage = matchData.players
    .filter((player) => !player.isRadiant)
    .map((player) => ({ value: player.heroDamage, name: player.name }));

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Overview {...matchData.overview} />
      </Col>
      <Col span={24}>
        <TeamScoreboard data={matchData.radiant_scoreboard} isRadiant={true} />
      </Col>
      <Col span={24}>
        <TeamScoreboard data={matchData.dire_scoreboard} isRadiant={false} />
      </Col>
      <Col xs={24} lg={12}>
        <ChartCard title="Radiant Hero Damage">
          <PieChart data={radiantHeroDamage} isRadiant={true} />
        </ChartCard>
      </Col>
      <Col xs={24} lg={12}>
        <ChartCard title="Dire Hero Damage">
          <PieChart data={direHeroDamage} isRadiant={false} />
        </ChartCard>
      </Col>
      <Col xs={24} lg={12}>
        <ChartCard title="Gold">
          <TeamLineChart data={[matchData.radiant_gold, matchData.dire_gold]} />
        </ChartCard>
      </Col>
      <Col xs={24} lg={12}>
        <ChartCard title="Gold Advantage">
          <AreaChart data={matchData?.radiant_gold_adv} />
        </ChartCard>
      </Col>
      <Col xs={24} lg={12}>
        <ChartCard title="Experience">
          <TeamLineChart data={[matchData.radiant_xp, matchData.dire_xp]} />
        </ChartCard>
      </Col>
      <Col xs={24} lg={12}>
        <ChartCard title="Experience Advantage">
          <AreaChart data={matchData?.radiant_xp_adv} />
        </ChartCard>
      </Col>
    </Row>
  );
};
export default Match;
