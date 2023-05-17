import { createChecker } from '../Chekcer';
import * as fs from 'fs';

export const EnvrcChecker = createChecker(async () => {
  if (fs.existsSync('./.envrc')) {
    return;
  } else {
    fs.copyFileSync('./.envrc.template', './.envrc');
  }
});
