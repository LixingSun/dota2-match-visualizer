import { FC, useContext, useState } from 'react';
import { Card, Tabs, Row, Col, Flex, Checkbox } from 'antd';
import type { TabsProps } from 'antd';
import { IPlayerData, IPosData, MatchDataContext } from '@/contexts/MatchData';
import PlayerHeatMap, { IHeatmapPosData } from '@/components/PlayerHeatMap';

const formatPos = (posData: IPosData): IHeatmapPosData[] => {
  const formattedPosData = [];
  for (const x in posData) {
    for (const y in posData[x]) {
      formattedPosData.push({
        x: Number(x),
        y: Number(y),
        value: posData[x][y],
      });
    }
  }

  return formattedPosData;
};

const WARD_TYPE_SEN = 'sen';
type WARD_TYPE_SEN = typeof WARD_TYPE_SEN;
const WARD_TYPE_OBS = 'obs';
type WARD_TYPE_OBS = typeof WARD_TYPE_OBS;
type WARD_TYPES = WARD_TYPE_SEN | WARD_TYPE_OBS;

const consolidateWardPos = (
  activeWardTypes: WARD_TYPES[],
  playerData: IPlayerData
): IPosData => {
  let consolidatedWardPos = {} as IPosData;
  switch (activeWardTypes.length) {
    case 0:
      consolidatedWardPos = {};
      break;
    case 1:
      consolidatedWardPos =
        activeWardTypes[0] == WARD_TYPE_SEN
          ? playerData.senPos
          : playerData.obsPos;
      break;
    case 2:
      consolidatedWardPos = { ...playerData.senPos, ...playerData.obsPos };
  }

  return consolidatedWardPos;
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
  const lanePosData = formatPos(playerData.lanePos);
  const [activeWardTypes, setActiveWardTypes] = useState<WARD_TYPES[]>([
    WARD_TYPE_SEN,
    WARD_TYPE_OBS,
  ]);
  const wardPosData = formatPos(
    consolidateWardPos(activeWardTypes, playerData)
  );

  return (
    <>
      <Tabs
        activeKey={currentPlayerIndex.toString()}
        items={tabItems}
        onChange={(newIndex) => {
          setCurrentPlayerIndex(Number(newIndex));
        }}
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Lane Position">
            <Flex justify="center">
              <PlayerHeatMap
                id="lane-pos"
                key={currentPlayerIndex}
                data={lanePosData}
                max={15}
                radius={10}
              />
            </Flex>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Vision ">
            <div style={{ position: 'relative' }}>
              <Checkbox.Group
                options={[
                  { label: 'Sentry Ward', value: WARD_TYPE_SEN },
                  { label: 'Observer Ward', value: WARD_TYPE_OBS },
                ]}
                value={activeWardTypes}
                onChange={(selectedTypes) => {
                  setActiveWardTypes(selectedTypes as WARD_TYPES[]);
                }}
                style={{
                  position: 'absolute',
                  top: 16,
                  left: 0,
                  right: 0,
                  margin: '0 auto',
                  width: 400,
                  display: 'flex',
                  justifyContent: 'center',
                  zIndex: 1,
                }}
              />
              <Flex justify="center">
                <PlayerHeatMap
                  id="ward-pos"
                  key={currentPlayerIndex}
                  data={wardPosData}
                  max={2}
                  radius={15}
                />
              </Flex>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Players;
