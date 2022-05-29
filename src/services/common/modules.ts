import crypto from '../../modules/crypto';
import currency from '../../modules/currency';
import distance from '../../modules/distance';
import password from '../../modules/password';
import speed from '../../modules/speed';
import enginePower from '../../modules/enginePower';
import percentage from '../../modules/percentage';
import pixel from '../../modules/pixel';
import lorem from '../../modules/random/lorem';
import time from '../../modules/time';
import date from '../../modules/date';
import randomNumber from '../../modules/random/randomNumber';
import randomQuote from '../../modules/random/randomQuote';
import weight from '../../modules/weight';
import numberSystem from '../../modules/numberSystem';
import arithmetic from '../../modules/arithmetic';

import { Module } from '../../types/module';

const modules: Array<Module> = [
  // converters
  currency,
  crypto,
  weight,
  numberSystem,
  distance,
  speed,
  percentage,
  pixel,
  enginePower,

  // generators
  password,
  randomNumber,
  randomQuote,
  lorem,

  // common modules
  time,
  date,
  arithmetic,
];

export default modules;
