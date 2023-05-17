import { createChecker } from '../Chekcer';
import { shell } from '../../../utils/shell';
import { CheckFailureError } from '../CheckListError';

export const AWSChecker = createChecker(async () => {
  const awsIdentity = shell`aws sts get-caller-identity`;
  if (awsIdentity.includes('command not found')) {
    throw new CheckFailureError(`aws-cli를 설치해주세요`, ['https://aws.amazon.com/ko/cli/']);
  }
  if (!awsIdentity.includes('002685347355')) {
    throw new CheckFailureError(`aws profile을 설정해주세요`, [`$ aws configure --profile ppoba`]);
  }
  return;
});
