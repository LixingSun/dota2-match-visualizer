import { FC, ReactNode, createContext } from 'react';
import data from '@/data/match.json';
import { IOverviewProps } from '@/pages/Match/Overview';
import { IPlayerScoreboardData } from '@/pages/Match/TeamScoreboard';

interface IMatchData {
  overview: IOverviewProps;
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

export const MatchDataContext = createContext<IMatchData>({
  overview: {
    radiantWin: true,
    radiantTeamName: '',
    direTeamName: '',
    radiantScore: 0,
    direScore: 0,
    duration: 0,
    league: '',
    matchId: 0,
    startTime: 0,
  },
  radiant_gold_adv: [],
  radiant_xp_adv: [],
  radiant_gold: [],
  dire_gold: [],
  radiant_xp: [],
  dire_xp: [],
  radiant_scoreboard: [],
  dire_scoreboard: [],
});

export const MatchDataProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const matchData = {
    overview: {
      radiantWin: data.radiant_win,
      radiantTeamName: data.radiant_name,
      direTeamName: data.dire_name,
      radiantScore: data.radiant_score,
      direScore: data.dire_score,
      duration: data.duration,
      league: data.league.name,
      matchId: data.match_id,
      startTime: data.start_time,
    },
    radiant_gold_adv: data.radiant_gold_adv,
    radiant_xp_adv: data.radiant_xp_adv,
    radiant_gold: calcTeamGoldXp(0, true),
    dire_gold: calcTeamGoldXp(1, true),
    radiant_xp: calcTeamGoldXp(0, false),
    dire_xp: calcTeamGoldXp(1, false),
    radiant_scoreboard: calcScoreboard(0),
    dire_scoreboard: calcScoreboard(1),
  };

  return (
    <MatchDataContext.Provider value={matchData}>
      {children}
    </MatchDataContext.Provider>
  );
};
