/**
 * Transform Warcraft III quotes
 */
'use strict';
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const constants = require('./constants');

const INPUT_DIRECTORY = './quotes/extract';
const OUTPUT_DIRECTORY = './quotes/transform';

/**
 * Ensure strings are clean / neat for .json file
 * @param {string} value - string to make 'clean'
 */
function cleanString(value) {
  return (
    value
      // Remove newlines / carriage returns
      .replace(/\r?\n|\r/g, ' ')
      // Remove quotations
      .replace(/["]+/g, '')
      // Remove ( )
      .replace(/\([^)]*\)/g, '')
      // Remove *
      .replace(/\*[^*]*\*/g, '')
      // Remove < >
      .replace(/\<[^*]*\>/g, '')
      // Remove Head1: and Head2:
      .replace(/Head \d:/g, '')
      .replace(/Goblin \d:/g, '')
      .replace(/Ogre:/g, '')
      .replace(/Alchemist:/g, '')
      // Remove double spaces
      .replace(/  /g, ' ')
      // Add space after question mark
      .replace(/(\?)([A-Za-z])/g, '$1 $2')
      .trim()
  );
}

/**
 * Ensure unit name is clean / correct
 * @param {string} unit - unit to 'clean'
 */
function cleanQuoteUnit(unit) {
  if (unit.trim() == 'Orc Warchief') {
    return 'Slave Master';
  } else if (unit.trim() == `Wyvern / Wind Rider`) {
    return 'Wyvern Rider';
  } else if (unit.trim() == `Blood Elf Engineer & Worker`) {
    return 'Worker';
  } else if (unit.trim() == `Arthas`) {
    return 'Arthas Menethil';
  } else if (unit.trim() == `Dragon Hawk (High Elf)`) {
    return 'High Elf Dragonhawk';
  } else if (unit.trim() == `Orc Peon`) {
    return 'Peon';
  } else if (unit.trim() == `Orc Grunt`) {
    return 'Grunt';
  } else if (unit.trim() == `Orc Raider`) {
    return 'Raider';
  } else if (unit.trim() == `Troll Headhunter/Berserker`) {
    return 'Troll Headhunter';
  } else if (unit.trim() == `Orc Shaman`) {
    return 'Shaman';
  } else if (unit.trim() == `Pit Lord (Mannoroth)`) {
    return 'Pit Lord';
  } else if (unit.trim() == `Goblin Tinker`) {
    return 'Tinker';
  } else if (unit.trim() == `Goblin Alchemist`) {
    return 'Alchemist';
  }

  return cleanString(unit);
}

/**
 * Ensure action is clean / correct
 * @param {string} action - action to 'clean'
 */
function cleanQuoteAction(action) {
  if (action.includes('What:')) {
    return 'What';
  } else if (action.includes(`Attack\nYes`)) {
    return 'Yes';
  } else if (action.includes(`Suicide Attack`)) {
    return 'Kamikaze';
  }

  return cleanString(action);
}

/**
 * Ensure faction is clean / correct
 * @param {string} faction - faction to 'clean'
 */
function cleanQuoteFaction(faction) {
  return cleanString(faction);
}

/**
 * Ensure the actual quote is clean / correct
 * @param {string} value - the actual quote to 'clean'
 */
function cleanQuoteValue(value) {
  if (value.includes('reverse in audio recordings')) {
    return "Seert neerg evol'eah!";
  } else if (value.includes('Hi, my name is Roy')) {
    return "Hi, my name is Roy. I'm a magic addict.";
  } else if (
    value.includes(
      'What the Iron Troll is doing right now is putting heads in a pot'
    )
  ) {
    return '';
  } else if (value.includes(`Warriors of the night, assemble! tiger roars`)) {
    return `Warriors of the night, assemble!`;
  } else if (value.includes(`Eat mortar!`)) {
    return `Eat mortar! Eat lead!`;
  } else if (value.includes(`Look at me, I'm happy`)) {
    return `Look at me, I'm happy!`;
  }

  return cleanString(value);
}
/**
 * Determine if unit is a hero
 * @param {string} unit
 */
function isHero(unit) {
  if (constants.heroes.find(hero => hero === unit)) {
    return true;
  } else {
    return false;
  }
}

/**
 * Determine if unit is a melee unit
 * @param {string} unit
 */
function isMelee(unit) {
  if (constants.unitsMelee.find(element => element === unit)) {
    return true;
  } else {
    return false;
  }
}

/**
 * Transforms all quotes including metadata
 * @param {string} input - the name of the JSON file to transform
 * @param {string} output  - the location of the transformed JSON file
 */
function quoteTransformer(input, output) {
  console.log('I WISH ONLY TO SERVE');
  console.log(`TRANSFORMING: ${input}`);

  let cleanQuotes = [];

  let rawData = fs.readFileSync(input);
  let quotes = JSON.parse(rawData);

  quotes.forEach(function(quote) {
    let cleanUnit = cleanQuoteUnit(quote['unit']);

    let cleanQuote = {
      value: cleanQuoteValue(quote['value']),
      faction: cleanQuoteFaction(quote['faction']),
      unit: cleanUnit,
      action: cleanQuoteAction(quote['action']),
      isHero: isHero(cleanUnit),
      isMelee: isMelee(cleanUnit)
    };

    if (cleanQuote['value'] !== '') {
      cleanQuotes.push(cleanQuote);
    }
  });

  let data = JSON.stringify(cleanQuotes, null, 2);

  fs.writeFileSync(output, data);
  console.log('SUMMONING IS COMPLETE');
  console.log(`OUTPUT: ${output}`);

  return cleanQuotes;
}

/**
 * Adds short uuid for all quote objects
 * @param {array} quotes - an array of quote objects
 */
function shortId(quotes) {
  let uniqueIds = [];
  quotes.forEach(function(quote, i) {
    let uniqueId;
    let isUnique;
    do {
      uniqueId = uuidv4().split('-')[0];
      isUnique = false;
      if (!uniqueIds.includes(uniqueId)) {
        uniqueIds.push(uniqueId);
        isUnique = true;
      }
    } while (!isUnique);

    quote['id'] = uniqueId;
  });
}

fs.mkdir(OUTPUT_DIRECTORY, { recursive: true }, err => {
  if (err) throw err;
});

// succubus.json was manually created. Not found on wowwiki
const FILES = [
  'human.json',
  'orc.json',
  'undead.json',
  'elf.json',
  'neutral.json',
  'succubus.json',
  'neutral-heroes.json'
];

let quotes = [];

FILES.forEach(function(file) {
  quotes = quotes.concat(
    quoteTransformer(
      `${INPUT_DIRECTORY}/${file}`,
      `${OUTPUT_DIRECTORY}/${file}`
    )
  );
});

shortId(quotes);

let data = JSON.stringify(quotes, null, 2);

if (!fs.existsSync('./quotes/warcraft-3-quotes.json')) {
  fs.writeFileSync('./quotes/warcraft-3-quotes.json', data);
  console.log('SUMMONING IS COMPLETE');
  console.log('OUTPUT: ./quotes/warcraft-3-quotes.json');
}
