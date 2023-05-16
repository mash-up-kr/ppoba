import { CheckWarningError } from '../CheckListError';
import { createChecker } from '../Chekcer';

export const NodeVersionChecker = createChecker(async () => {
  const versionMessage = `current ${process.version}`;
  if (process.version.startsWith('v18')) {
    return versionMessage;
  }
  throw new CheckWarningError(versionMessage, ['노드 버전을 v18로 맞춰주세요', 'https://www.npmjs.com/package/n']);
});
