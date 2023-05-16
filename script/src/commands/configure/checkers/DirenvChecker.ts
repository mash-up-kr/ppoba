import { execSync } from 'child_process';
import { CheckFailureError } from '../CheckListError';
import { createChecker } from '../Chekcer';

export const DirenvChecker = createChecker(async () => {
  try {
    if (execSync('which direnv', { encoding: 'utf8' }).trim()) {
      return;
    }
  } catch (e: any) {
    throw new CheckFailureError(e.message, ['direnv를 설치해주세요', 'https://direnv.net/']);
  }
});
