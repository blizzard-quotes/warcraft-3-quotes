const humanHeroesMelee = ['Paladin', 'Archmage', 'Mountain King', 'Blood Mage'];
const humanHeroesEtc = [
  'Arthas Menethil',
  'Muradin Bronzebeard',
  'Jaina Proudmoore',
  'Lord Garithos',
  'Uther the Lightbringer',
  "Kael'thas Sunstrider",
  'Sylvanas Windrunner'
];
const orcHeroesMelee = [
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
const undeadHeroesMelee = ['Death Knight', 'Lich', 'Dreadlord', 'Crypt Lord'];
const undeadHeroesEtc = [
  "Kel'Thuzad",
  'Arthas Menethil',
  'Tichondrius',
  'Sylvanas Windrunner',
  'Varimathras'
];
const elfHeroesMelee = [
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
const neutralHeroesMelee = [
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
  ...humanHeroesMelee,
  ...humanHeroesEtc,
  ...orcHeroesMelee,
  ...orcHeroesEtc,
  ...undeadHeroesMelee,
  ...undeadHeroesEtc,
  ...elfHeroesMelee,
  ...elfHeroesEtc,
  ...neutralHeroesMelee,
  ...neutralHeroesEtc
];

const humanUnitsMelee = [
  'Peasant',
  'Footman',
  'Rifleman',
  'Knight',
  'Priest',
  'Sorceress',
  'Spell Braker',
  'Dragonhawk Rider',
  'Mortar Team',
  'Gyrocopter',
  'Gryphon Rider'
];

const orcUnitsMelee = [
  'Peon',
  'Grunt',
  'Raider',
  'Tauren',
  'Troll Headhunter',
  'Kodo Beast',
  'Wyvern Rider',
  'Troll Witch Doctor',
  'Shaman',
  'Spirit Walker',
  'Batrider'
];

const undeadUnitsMelee = [
  'Acolyte',
  'Shade',
  'Ghoul',
  'Abomination',
  'Crypt Fiend',
  'Banshee',
  'Necromancer'
];

const elfUnitsMelee = [
  'Archer',
  'Huntress',
  'Dryad',
  'Hippogryph Rider',
  'Druid of the Talon',
  'Druid of the Claw',
  ''
];

const neutralUnitsMelee = [
  'Bandit',
  'Draenei',
  'Forest Troll',
  'Harpy',
  'Ice Troll',
  'Ogre',
  'Goblin Sapper',
  'Goblin Zeppelin',
  'Naga Myrmidon'
];

const unitsMelee = [
  ...humanHeroesMelee,
  ...orcHeroesMelee,
  ...undeadHeroesMelee,
  ...elfHeroesMelee,
  ...neutralHeroesMelee,
  ...humanUnitsMelee,
  ...orcUnitsMelee,
  ...undeadUnitsMelee,
  ...elfUnitsMelee,
  ...neutralUnitsMelee
];

module.exports = { heroes, unitsMelee };
