# Warcraft III Quotes

## Summay

Wrapper returning Warcraft III quotes. 

Also contains quick scripts to extract and transform Warcraft III quotes.
Grabs every unique quote found.  
Includes selectable melee unit quotes and selectable campaign unit quotes.

Only campign units which have unique quotes are grabbed 
(i.e. melee units take precedence).

Does not include cinematic or cutscene quotes.

Thanks to https://wowwiki.fandom.com/ for housing the quotes.

## Notice

succubus-quotes.json was manually created under ./extract/.
This is due to the fact that the succubus unit was missing from the site scraped.

## Installation

`npm install warcraft-3-quotes`

## Example

```
const warcraft3Quotes = require('warcraft-3-quotes');

console.log(warcraft3Quotes);
```

## Execution

### Extract quotes and generate JSON files for each faction
`npm run extract`

Extracted quotes can be found under ./quotes/extract

### Transform quotes and generate JSON files for each faction along with one JSON file to rule them all.
`npm run transform`

Transformed quotes for each faction can be found under ./quotes/transform.

./quotes/warcraft-3-quotes.json contains all quotes found in ./quotes/transform.
