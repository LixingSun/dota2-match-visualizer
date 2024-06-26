import { useEffect, useState, FC } from 'react';
import { Row, Col } from 'antd';
import TeamLineChart from '@/components/TeamLineChart';
import data from '@/data/match.json';
import ChartCard from '@/components/ChartCard';
import AreaChart from '@/components/AreaChart';
import TeamScoreboard, {
  IPlayerScoreboardData,
} from '@/components/TeamScoreboard';

interface IMatchData {
  radiant_gold_adv: number[];
  radiant_xp_adv: number[];
  radiant_gold: number[];
  dire_gold: number[];
  radiant_xp: number[];
  dire_xp: number[];
  radiant_scoreboard: IPlayerScoreboardData[];
  dire_scoreboard: IPlayerScoreboardData[];
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

const calcScoreboard = (teamNumber: number): IPlayerScoreboardData[] => {
  return data.players
    .filter((player) => player.team_number == teamNumber)
    .map((player) => ({
      key: player.account_id.toString(),
      name: player.personaname,
      heroId: player.hero_id,
      level: player.level,
      kills: player.kills,
      deaths: player.deaths,
      assists: player.assists,
      lastHits: player.last_hits,
      denies: player.denies,
      netWorth: player.net_worth,
      gpm: player.gold_per_min,
      xpm: player.xp_per_min,
      heroDamage: player.hero_damage,
      towerDamage: player.tower_damage,
      heroHealing: player.hero_healing,
    }));
};

export const Match: FC = () => {
  const [matchData, SetMatchData] = useState<IMatchData>({
    radiant_gold_adv: [],
    radiant_xp_adv: [],
    radiant_gold: [],
    dire_gold: [],
    radiant_xp: [],
    dire_xp: [],
    radiant_scoreboard: [],
    dire_scoreboard: [],
  });

  useEffect(() => {
    SetMatchData({
      radiant_gold_adv: data.radiant_gold_adv,
      radiant_xp_adv: data.radiant_xp_adv,
      radiant_gold: calcTeamGoldXp(0, true),
      dire_gold: calcTeamGoldXp(1, true),
      radiant_xp: calcTeamGoldXp(0, false),
      dire_xp: calcTeamGoldXp(1, false),
      radiant_scoreboard: calcScoreboard(0),
      dire_scoreboard: calcScoreboard(1),
    });
  }, []);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <TeamScoreboard data={matchData.radiant_scoreboard} isRadiant={true} />
      </Col>
      <Col span={24}>
        <TeamScoreboard data={matchData.dire_scoreboard} isRadiant={false} />
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
