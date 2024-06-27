import { FC, useEffect, useRef } from 'react';
import Heatmap, { Heatmap as HeatmapType } from 'heatmap.js';
import minimap from '/minimap.jpeg';

export interface IHeatmapPosData {
  x: number;
  y: number;
  value: number;
}

const minimapDataSize = 128;
const minimapSize = 400;

interface IPlayerHeatmapProps {
  data: IHeatmapPosData[];
  id: string;
  max: number;
  radius: number;
}

const PlayerHeatMap: FC<IPlayerHeatmapProps> = ({ data, id, max, radius }) => {
  const heatmapInstance = useRef<HeatmapType<'value', 'x', 'y'> | null>(null);

  useEffect(() => {
    const container = document.getElementById(
      `player-heatmap-${id}`
    ) as HTMLElement;

    heatmapInstance.current = Heatmap.create({
      container,
      radius,
    });

    heatmapInstance.current.setData({
      min: 0,
      max: max,
      data: data.map((value) => ({
        x: ((value.x - minimapDataSize / 2) / minimapDataSize) * minimapSize,
        y: ((minimapDataSize * 1.5 - value.y) / minimapDataSize) * minimapSize,
        value: value.value,
      })),
    });

    return () => {
      heatmapInstance.current?.setData({
        min: 0,
        max: max,
        data: [],
      });
    };
  }, [data, id, max, radius]);

  return (
    <div
      style={{
        width: '400px',
        height: '400px',
        backgroundImage: `url(${minimap})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        id={`player-heatmap-${id}`}
        style={{ width: '400px', height: '400px' }}
      ></div>
    </div>
  );
};

export default PlayerHeatMap;
