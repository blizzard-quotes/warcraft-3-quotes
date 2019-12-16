/**
 * Extract Warcraft III quotes from online
 */
'use strict';
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const URL = 'https://wowwiki.fandom.com/wiki/Quotes_of_Warcraft_III';
const OUTPUT_DIRECTORY = './quotes/extract';

/**
 * Returns true or false depending on if the 'unit' should be ignored
 * @param {string} unit - the unit to inspect
 */
function isIgnoredUnit(unit) {
  if (
    unit.trim() == 'Warning quotes' ||
    unit.trim() == 'Dialogue' ||
    unit.trim() == `Vengeful Spirit (her voices are backwards)` ||
    unit.trim().includes('Mannoroth')
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 * Extract all quotes from specified uri for faction
 * @param {string} faction - the faction to extract quotes from
 * @param {string} uri - the uri the quotes reside in
 * @param {string} header - the h elements to look for the quotes under
 * @param {string} file_name_override - file name override option
 */
async function quoteExtractor(
  faction,
  uri,
  header = 'h3',
  file_name_override = ''
) {
  console.log('READY TO WORK');
  console.log(`EXTRACTING: ${uri}`);

  let value, unit, action;
  let quotes = [];
  let quote = {};

  try {
    const response = await axios.get(uri);

    let $ = cheerio.load(response.data);

    // Iterate through each unit, starting at the element with the name of the unit
    $(`${header} > span.mw-headline`).each(function(i, element) {
      unit = $(element).text();
      let current_element = $(element).parent();

      do {
        current_element = $(current_element).next();

        if (isIgnoredUnit(unit)) {
          break;
        }

        if ($(current_element).is('p')) {
          action = $(current_element).text();
        } else if ($(current_element).is('ul')) {
          $(current_element)
            .children()
            .each(function(i, element) {
              value = $(element).text();

              quote = {
                value: value,
                faction: faction.charAt(0).toUpperCase() + faction.slice(1),
                unit: unit,
                action: action
              };
              quotes.push(quote);
            });
        }
      } while (
        $(current_element).next()[0] !== undefined &&
        !$(current_element)
          .next()[0]
          ['name'].match(/h\d/g)
      );
    });
  } catch (err) {
    console.log(err);
  }

  // Quick fix because wowwiki splits neutral units and neutral heroes
  if (file_name_override !== '') {
    faction = file_name_override;
  }

  let data = JSON.stringify(quotes, null, 2);

  fs.mkdir(OUTPUT_DIRECTORY, { recursive: true }, err => {
    if (err) throw err;
  });

  fs.writeFileSync(`${OUTPUT_DIRECTORY}/${faction}.json`, data);
  console.log('WORK COMPLETE');
  console.log(`OUTPUT: ${OUTPUT_DIRECTORY}/${faction}.json`);
}

quoteExtractor('human', `${URL}/Human_Alliance`);
quoteExtractor('orc', `${URL}/Orc_Horde`);
quoteExtractor('undead', `${URL}/Undead_Scourge`);
quoteExtractor('elf', `${URL}/Night_Elf_Sentinels`);
quoteExtractor('neutral', `${URL}/Neutral`);
quoteExtractor('neutral', `${URL}/Neutral_Heroes`, 'h2', 'neutral-heroes');
