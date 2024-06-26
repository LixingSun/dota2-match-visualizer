import { FC, useEffect, useRef } from 'react';
import Heatmap, { Heatmap as HeatmapType } from 'heatmap.js';
import minimap from '/minimap.jpeg';

export interface ILanePosData {
  x: number;
  y: number;
  value: number;
}

const minimapDataSize = 128;
const minimapSize = 400;

const PlayerHeatMap: FC<{ data: ILanePosData[] }> = ({ data }) => {
  const heatmapInstance = useRef<HeatmapType<'value', 'x', 'y'> | null>(null);

  useEffect(() => {
    const container = document.getElementById('player-heatmap') as HTMLElement;

    heatmapInstance.current = Heatmap.create({
      container,
      radius: 10,
    });

    heatmapInstance.current.setData({
      min: 0,
      max: 15,
      data: data.map((value) => ({
        x: ((value.x - minimapDataSize / 2) / minimapDataSize) * minimapSize,
        y: ((minimapDataSize * 1.5 - value.y) / minimapDataSize) * minimapSize,
        value: value.value,
      })),
    });
  }, [data]);

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
        id="player-heatmap"
        style={{ width: '400px', height: '400px' }}
      ></div>
    </div>
  );
};

export default PlayerHeatMap;
