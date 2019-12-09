const humanHeroes = ['Paladin', 'Archmage', 'Mountain King', 'Blood Mage'];
const humanHeroesEtc = [
  'Arthas Menethil',
  'Muradin Bronzebeard',
  'Jaina Proudmoore',
  'Lord Garithos',
  'Uther the Lightbringer',
  "Kael'thas Sunstrider",
  'Sylvanas Windrunner'
];
const orcHeroes = [
  'Blademaster',
  'Far Seer',
  'Tauren Chieftain',
  'Shadow Hunter'
];
const orcHeroesEtc = [
  'Cairne Bloodhoof',
  'Grom Hellscream',
  'Thrall',
  'Rokhan',
  "Drek'Thar",
  'Nazgrel'
];
const undeadHeroes = ['Death Knight', 'Lich', 'Dreadlord', 'Crypt Lord'];
const undeadHeroesEtc = [
  "Kel'Thuzad",
  'Arthas Menethil',
  'Tichondrius',
  'Sylvanas Windrunner',
  'Varimathras'
];
const elfHeroes = [
  'Keeper of the Grove',
  'Priestess of the Moon',
  'Demon Hunter',
  'Warden'
];
const elfHeroesEtc = [
  'Illidan Stormrage',
  'Maiev Shadowsong',
  'Tyrande Whisperwind',
  'Malfurion Stormrage'
];
const neutralHeroes = [
  'Beastmaster',
  'Dark Ranger',
  'Naga Sea Witch',
  'Pandaren Brewmaster',
  'Pit Lord',
  'Goblin Tinker',
  'Firelord',
  'Goblin Alchemist'
];
const neutralHeroesEtc = ['Akama', 'Funny Bunny'];

const heroes = [
  ...humanHeroes,
  ...humanHeroesEtc,
  ...orcHeroes,
  ...orcHeroesEtc,
  ...undeadHeroes,
  ...undeadHeroesEtc,
  ...elfHeroes,
  ...elfHeroesEtc,
  ...neutralHeroes,
  ...neutralHeroesEtc
];

module.exports = { heroes };
