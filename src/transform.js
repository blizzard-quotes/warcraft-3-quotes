/**
 * Transform Warcraft III quotes
 */
'use strict';
const fs = require('fs');
const path = require('path');
const uuidv5 = require('uuid/v5');
const constants = require('./utils/constants');

const pathInput = path.join(__dirname, '../quotes/extract');
const pathOutput = path.join(__dirname, '../quotes/transform');
const pathQuotes = path.join(__dirname, '../quotes/warcraft-3-quotes.json');

/**
 * Ensure strings are clean / neat for .json file
 * @param {string} value - string to make 'clean'
 */
const cleanString = value => {
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
};

/**
 * Ensure unit name is clean / correct
 * @param {string} unit - unit to 'clean'
 */
const cleanQuoteUnit = unit => {
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
  } else if (unit.trim() == `Batrider`) {
    return 'Troll Batrider';
  }

  return cleanString(unit);
};

/**
 * Ensure action is clean / correct
 * @param {string} action - action to 'clean'
 */
const cleanQuoteAction = action => {
  if (action.includes('What:')) {
    return 'What';
  } else if (action.includes(`Attack\nYes`)) {
    return 'Yes';
  } else if (action.includes(`Suicide Attack`)) {
    return 'Kamikaze';
  }

  return cleanString(action);
};

/**
 * Ensure faction is clean / correct
 * @param {string} faction - faction to 'clean'
 */
const cleanQuoteFaction = faction => {
  return cleanString(faction);
};

/**
 * Ensure the actual quote is clean / correct
 * @param {string} value - the actual quote to 'clean'
 */
const cleanQuoteValue = value => {
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
};
/**
 * Determine if unit is a hero
 * @param {string} unit
 */
const isHero = unit => {
  if (constants.heroes.find(hero => hero === unit)) {
    return true;
  } else {
    return false;
  }
};

/**
 * Determine if unit is a melee unit
 * @param {string} unit
 */
const isMelee = unit => {
  if (constants.unitsMelee.find(element => element === unit)) {
    return true;
  } else {
    return false;
  }
};

/**
 * Transforms all quotes including metadata
 * @param {string} input - the name of the JSON file to transform
 * @param {string} output  - the location of the transformed JSON file
 */
const quoteTransformer = (input, output) => {
  console.log('I WISH ONLY TO SERVE');
  console.log(`TRANSFORMING: ${input}`);

  let cleanQuotes = [];

  let rawData = fs.readFileSync(input);
  let quotes = JSON.parse(rawData);

  quotes.forEach(function(quote) {
    let cleanUnit = cleanQuoteUnit(quote['unit']);
    let cleanValue = cleanQuoteValue(quote['value']);
    let cleanFaction = cleanQuoteFaction(quote['faction']);
    let cleanAction = cleanQuoteAction(quote['action']);

    let cleanQuote = {
      value: cleanValue,
      faction: cleanFaction,
      unit: cleanUnit,
      action: cleanAction,
      isHero: isHero(cleanUnit),
      isMelee: isMelee(cleanUnit),
      id: uuidv5(
        `${cleanValue} ${cleanFaction} ${cleanUnit} ${cleanAction}`,
        uuidv5.URL
      )
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
};

fs.mkdir(pathOutput, { recursive: true }, err => {
  if (err) throw err;
});

let files = fs.readdirSync(pathInput);
let quotes = [];

files.forEach(function(file) {
  quotes = quotes.concat(
    quoteTransformer(`${pathInput}/${file}`, `${pathOutput}/${file}`)
  );
});

let data = JSON.stringify(quotes, null, 2);

fs.writeFileSync(pathQuotes, data);
console.log('SUMMONING IS COMPLETE');
console.log(`OUTPUT: ${pathQuotes}`);
