import { CheckFailureError } from '../CheckListError';
import { createChecker } from '../Chekcer';
import { execSync } from 'child_process';

export const PnpmVersionChecker = createChecker(async () => {
  try {
    const versionString = execSync('pnpm --version', { encoding: 'utf8' }).trim();
    if (/^7\./.test(versionString)) {
      return versionString;
    }
    throw new CheckFailureError(versionString, ['pnpm 버전을 7.X로 맞춰주세요']);
  } catch (e: any) {
    throw new CheckFailureError(e.message, ['pnpm이 제대로 설치되어있는지 확인해주세요', 'npm -g install pnpm@^7']);
  }
});
