export const formatMinute = (minute: number): string => {
  return `${minute}:00`;
};

export const formatThousand = (number: number): string => {
  if (number < 1000) return number.toString();
  let hundred = Math.round(number / 100);
  const thousand = Math.floor(hundred / 10);
  hundred -= thousand * 10;
  return hundred == 0 ? `${thousand}K` : `${thousand}.${hundred}K`;
};
