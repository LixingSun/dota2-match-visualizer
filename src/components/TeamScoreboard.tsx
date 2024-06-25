import { Table } from 'antd';
import { FC, useMemo } from 'react';

export interface IPlayerScoreboardData {
  key: string;
  name: string;
  heroId: number;
  kills: number;
  deaths: number;
  assists: number;
  gpm: number;
  xpm: number;
}
interface ITeamScoreboardProps {
  data: IPlayerScoreboardData[];
  isRadiant: boolean;
}

const columnsDefaultConfig = [
  {
    title: 'Player',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Hero',
    dataIndex: 'heroId',
    key: 'heroId',
  },
  {
    title: 'Kills',
    dataIndex: 'kills',
    key: 'kills',
  },
  {
    title: 'Deaths',
    dataIndex: 'deaths',
    key: 'deaths',
  },
  {
    title: 'Assists',
    dataIndex: 'assists',
    key: 'assists',
  },
  {
    title: 'GPM',
    dataIndex: 'gpm',
    key: 'gpm',
  },
  {
    title: 'XPM',
    dataIndex: 'xpm',
    key: 'xpm',
  },
];

const TeamScoreboard: FC<ITeamScoreboardProps> = ({ data, isRadiant }) => {
  const columns = useMemo(() => {
    const currentConfig = structuredClone(columnsDefaultConfig);
    currentConfig[0].title = `${isRadiant ? 'Radiant' : 'Dire'} Player`;
    return currentConfig;
  }, [isRadiant]);

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={{ hideOnSinglePage: true }}
    />
  );
};

export default TeamScoreboard;
