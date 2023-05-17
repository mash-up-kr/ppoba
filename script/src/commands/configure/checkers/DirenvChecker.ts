import { shell } from '../../../utils/shell';
import { CheckFailureError } from '../CheckListError';
import { createChecker } from '../Chekcer';

export const DirenvChecker = createChecker(async () => {
  try {
    if (shell.orThrow`which direnv`) {
      return;
    }
  } catch (e: any) {
    throw new CheckFailureError(e.message, ['direnv를 설치해주세요', 'https://direnv.net/']);
  }
});
