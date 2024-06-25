import { useEffect, useState, FC } from 'react';
import { Row, Col } from 'antd';
import TeamLineChart from '@/components/TeamLineChart';
import data from '@/data/match.json';
import ChartCard from '@/components/ChartCard';
import AreaChart from '@/components/AreaChart';

interface IMatchData {
  radiant_gold_adv: number[];
  radiant_xp_adv: number[];
  radiant_gold: number[];
  dire_gold: number[];
  radiant_xp: number[];
  dire_xp: number[];
}

const calcTeamGoldXp = (teamNumber: number, isGold: boolean): number[] => {
  const playersData = data.players.filter(
    (player) => player.team_number == teamNumber
  );

  const playersFilteredData = playersData.map(
    (playerData) => playerData[isGold ? 'gold_t' : 'xp_t']
  );

  const teamSum = playersFilteredData[0].map((player0Gold, timeIndex) => {
    let sum = player0Gold;
    for (
      let playerIndex = 1;
      playerIndex < playersFilteredData.length;
      playerIndex++
    ) {
      sum += playersFilteredData[playerIndex][timeIndex];
    }
    return sum;
  });

  return teamSum;
};

export const Match: FC = () => {
  const [matchData, SetMatchData] = useState<IMatchData>({
    radiant_gold_adv: [],
    radiant_xp_adv: [],
    radiant_gold: [],
    dire_gold: [],
    radiant_xp: [],
    dire_xp: [],
  });

  useEffect(() => {
    SetMatchData({
      radiant_gold_adv: data.radiant_gold_adv,
      radiant_xp_adv: data.radiant_xp_adv,
      radiant_gold: calcTeamGoldXp(0, true),
      dire_gold: calcTeamGoldXp(1, true),
      radiant_xp: calcTeamGoldXp(0, false),
      dire_xp: calcTeamGoldXp(1, false),
    });
  }, []);

  return (
    <Row gutter={[16, 16]}>
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
