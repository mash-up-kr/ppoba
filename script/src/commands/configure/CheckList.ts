import { sleep } from '../../utils/sleep';
import { createChecker } from './Chekcer';
import { DirenvChecker } from './checkers/DirenvChecker';
import { NodeVersionChecker } from './checkers/NodeVersionChecker';
import { PnpmVersionChecker } from './checkers/PnpmVersionChecker';
import { RootChecklist } from './types';

const dummyChecker = createChecker(async () => {
  await sleep(1000);
  return;
});

export const checklist: RootChecklist = {
  'system: 시스템 설정을 확인합니다': {
    'NodeJS v18 버전을 사용합니다': NodeVersionChecker,
    'Pnpm vesion을 확인합니다': PnpmVersionChecker,
    'direnv가 설치되어 있는지 확인합니다': DirenvChecker,
  },
  'system: AWS 설정을 확인합니다': {
    'AWS profile이 제대로 선언되어 있어야 합니다': dummyChecker,
    'AWS key가 profile에 등록되어있어야 합니다': dummyChecker,
  },
};
