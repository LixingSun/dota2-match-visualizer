import { Table, TableColumnsType, Tooltip, Image } from 'antd';
import { FC, useEffect, useMemo, useState } from 'react';
import { formatThousand } from '@/utils/formatters';
import { direColor, radiantColor } from '@/styles/variables';
import { getHeroData } from '@/utils/heroUtils';

export interface IPlayerScoreboardData {
  key: string;
  name: string;
  heroId: number;
  level: number;
  kills: number;
  deaths: number;
  assists: number;
  lastHits: number;
  denies: number;
  netWorth: number;
  gpm: number;
  xpm: number;
  heroDamage: number;
  towerDamage: number;
  heroHealing: number;
}
interface ITeamScoreboardProps {
  data: IPlayerScoreboardData[];
  isRadiant: boolean;
}

const updateColumnsConfig = (
  isRadiant: boolean
): TableColumnsType<IPlayerScoreboardData> => {
  return [
    {
      title: () => {
        return isRadiant ? (
          <span style={{ color: radiantColor }}>Radiant Player</span>
        ) : (
          <span style={{ color: direColor }}>Dire Player</span>
        );
      },
      dataIndex: 'player',
      fixed: 'left',
      width: '20%',
      render: (_, rowData) => {
        const { name, image } = getHeroData(rowData.heroId);

        return (
          <div>
            <Image
              preview={false}
              width={48}
              height={27}
              alt={name}
              src={image}
            />
            <span style={{ marginLeft: 8 }}>{rowData.name}</span>
          </div>
        );
      },
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      width: '5%',
    },
    {
      title: () => <Tooltip title="Kills">K</Tooltip>,
      dataIndex: 'kills',
      key: 'kills',
      width: '5%',
    },
    {
      title: () => <Tooltip title="Deaths">D</Tooltip>,
      dataIndex: 'deaths',
      key: 'deaths',
      width: '5%',
    },
    {
      title: () => <Tooltip title="Assists">A</Tooltip>,
      dataIndex: 'assists',
      key: 'assists',
      width: '5%',
    },
    {
      title: () => <Tooltip title="Last Hits / Denied Creeps">LH / DN</Tooltip>,
      dataIndex: 'lh-dn',
      width: '10%',
      render: (_, rowData) => {
        return `${rowData.lastHits} / ${rowData.denies}`;
      },
    },
    {
      title: () => <Tooltip title="Net Worth">NET</Tooltip>,
      dataIndex: 'netWorth',
      key: 'netWorth',
      width: '10%',
      render: (value) => formatThousand(value),
    },
    {
      title: () => <Tooltip title="Gold per minute">GPM</Tooltip>,
      dataIndex: 'gpm',
      key: 'gpm',
      width: '8%',
      render: (value) => formatThousand(value),
    },
    {
      title: () => <Tooltip title="Experience per minute">XPM</Tooltip>,
      dataIndex: 'xpm',
      key: 'xpm',
      width: '8%',
      render: (value) => formatThousand(value),
    },

    {
      title: () => <Tooltip title="Hero Damage">HD</Tooltip>,
      dataIndex: 'heroDamage',
      key: 'heroDamage',
      width: '8%',
      render: (value) => formatThousand(value),
    },
    {
      title: () => <Tooltip title="Tower Damage">TD</Tooltip>,
      dataIndex: 'towerDamage',
      key: 'towerDamage',
      width: '8%',
      render: (value) => formatThousand(value),
    },
    {
      title: () => <Tooltip title="Hero Healing">HH</Tooltip>,
      dataIndex: 'heroHealing',
      key: 'heroHealing',
      width: '8%',
      render: (value) => formatThousand(value),
    },
  ];
};

const TeamScoreboard: FC<ITeamScoreboardProps> = ({ data, isRadiant }) => {
  const columns = useMemo(() => updateColumnsConfig(isRadiant), [isRadiant]);
  const [scrollingProps, setScrollingProps] = useState({});

  useEffect(() => {
    const handleResize = (event: UIEvent) => {
      const currentTarget = event.currentTarget as Window;
      setScrollingProps(
        currentTarget.innerWidth > 1200 ? {} : { scroll: { x: 1500 } }
      );
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={{ hideOnSinglePage: true }}
      {...scrollingProps}
    />
  );
};

export default TeamScoreboard;
