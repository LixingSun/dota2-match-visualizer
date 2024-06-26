import { FC, useContext, useState } from 'react';
import { Card, Flex, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { IPlayerData, MatchDataContext } from '@/contexts/MatchData';
import PlayerHeatMap, { ILanePosData } from '@/components/PlayerHeatMap';

const extractLanePos = (playerData: IPlayerData): ILanePosData[] => {
  const posData = [];
  for (const x in playerData.lanePos) {
    for (const y in playerData.lanePos[x]) {
      posData.push({
        x: Number(x),
        y: Number(y),
        value: playerData.lanePos[x][y],
      });
    }
  }

  return posData;
};

const Players: FC = () => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const matchData = useContext(MatchDataContext);
  const tabItems: TabsProps['items'] = matchData.players.map(
    (player, index) => ({
      key: index.toString(),
      label: player.name,
    })
  );
  const playerData = matchData.players[currentPlayerIndex];
  const lanePosData = extractLanePos(playerData);

  return (
    <>
      <Tabs
        activeKey={currentPlayerIndex.toString()}
        items={tabItems}
        onChange={(newIndex) => {
          setCurrentPlayerIndex(Number(newIndex));
        }}
      />

      <Flex justify="center">
        <Card title="Lane Position">
          <PlayerHeatMap key={currentPlayerIndex} data={lanePosData} />
        </Card>
      </Flex>
    </>
  );
};

export default Players;
