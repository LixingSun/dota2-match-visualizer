import { FC } from 'react';
import { Card, Flex, Typography, Tag } from 'antd';
import Icon from '@ant-design/icons';
import { SecondsToMinutes, formatUnixTimeStamp } from '@/utils/formatters';
import radiantLogo from '@/assets/TeamSpiritLogo.svg?react';
import direLogo from '@/assets/TeamFalconsLogo.svg?react';
import { direColor, radiantColor } from '@/styles/variables';

const { Text } = Typography;

export interface IOverviewProps {
  radiantWin: boolean;
  radiantTeamName: string;
  direTeamName: string;
  radiantScore: number;
  direScore: number;
  duration: number;
  startTime: number;
  league: string;
  matchId: number;
}
const Overview: FC<IOverviewProps> = ({
  radiantWin,
  radiantTeamName,
  direTeamName,
  radiantScore,
  direScore,
  duration,
  startTime,
  league,
  matchId,
}) => {
  return (
    <Card>
      <Flex justify="center" align="center">
        <Flex vertical justify="center" align="center">
          <Icon
            alt={radiantTeamName}
            component={radiantLogo}
            style={{ fontSize: 40, marginBottom: 8 }}
          />
          <Text
            strong
            style={{ fontSize: 20, color: radiantColor, marginBottom: 8 }}
          >
            {radiantTeamName}
          </Text>
          <Text strong style={{ fontSize: 24, marginBottom: 8 }}>
            {radiantScore}
          </Text>
          <Tag
            color="gold"
            style={{
              visibility: radiantWin ? 'visible' : 'hidden',
            }}
          >
            Victory
          </Tag>
        </Flex>
        <Flex
          vertical
          justify="center"
          align="center"
          style={{ margin: '0 16px' }}
        >
          <Text strong style={{ fontSize: 20 }}>
            {SecondsToMinutes(duration)}
          </Text>
          <Text>{formatUnixTimeStamp(startTime)}</Text>
          <Text>{league}</Text>
          <Text>ID: {matchId}</Text>
        </Flex>
        <Flex vertical justify="center" align="center">
          <Icon
            alt={direTeamName}
            component={direLogo}
            style={{ color: 'black', fontSize: 40, marginBottom: 8 }}
          />
          <Text
            strong
            style={{ fontSize: 20, color: direColor, marginBottom: 8 }}
          >
            {direTeamName}
          </Text>
          <Text strong style={{ fontSize: 24, marginBottom: 8 }}>
            {direScore}
          </Text>
          <Tag
            color="gold"
            style={{
              visibility: radiantWin ? 'hidden' : 'visible',
            }}
          >
            Victory
          </Tag>
        </Flex>
      </Flex>
    </Card>
  );
};
export default Overview;
