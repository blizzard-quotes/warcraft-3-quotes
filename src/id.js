/**
 * Generate short id
 */
'use strict';
const uuidv4 = require('uuid/v4');

console.log(uuidv4().split('-')[0]);
