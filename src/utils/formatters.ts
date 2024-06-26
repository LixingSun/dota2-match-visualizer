import { format } from 'date-fns/format';

export const formatMinute = (minute: number): string => {
  return `${minute}:00`;
};

export const SecondsToMinutes = (value: number): string => {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

export const formatThousand = (number: number): string => {
  if (number < 1000) return number.toString();
  let hundred = Math.round(number / 100);
  const thousand = Math.floor(hundred / 10);
  hundred -= thousand * 10;
  return hundred == 0 ? `${thousand}K` : `${thousand}.${hundred}K`;
};

export const formatUnixTimeStamp = (timeStamp: number): string => {
  return format(new Date(timeStamp * 1000), 'HH:mm MM/dd');
};
