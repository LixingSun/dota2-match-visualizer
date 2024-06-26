const imagePathPrefix =
  'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/';

interface IHeroMappng {
  name: string;
  image: string;
}
const heroMapping = new Map<number, IHeroMappng>([
  [
    3,
    {
      name: 'Bane',
      image: imagePathPrefix + 'bane.png',
    },
  ],
  [
    5,
    {
      name: 'Crystal Maiden',
      image: imagePathPrefix + 'crystal_maiden.png',
    },
  ],
  [
    28,
    {
      name: 'Slardar',
      image: imagePathPrefix + 'slardar.png',
    },
  ],
  [
    40,
    {
      name: 'Venomancer',
      image: imagePathPrefix + 'venomancer.png',
    },
  ],
  [
    48,
    {
      name: 'Luna',
      image: imagePathPrefix + 'luna.png',
    },
  ],
  [
    49,
    {
      name: 'Dragon Knight',
      image: imagePathPrefix + 'dragon_knight.png',
    },
  ],
  [
    54,
    {
      name: 'Life Stealer',
      image: imagePathPrefix + 'life_stealer.png',
    },
  ],
  [
    96,
    {
      name: 'Centaur Warrunner',
      image: imagePathPrefix + 'centaur.png',
    },
  ],
  [
    120,
    {
      name: 'Pangolier',
      image: imagePathPrefix + 'pangolier.png',
    },
  ],
  [
    123,
    {
      name: 'Hoodwink',
      image: imagePathPrefix + 'hoodwink.png',
    },
  ],
]);

export const getHeroData = (heroId: number): IHeroMappng => {
  return heroMapping.get(heroId) ?? heroMapping.get(54)!;
};
