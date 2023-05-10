import { ConfigurationChecker } from '../ConfigurationChecker';
import { ConfigurationWarning } from '../ConfigurationError';

export class NodeVersionChecker extends ConfigurationChecker({
  category: 'system',
  title: 'NodeJS v18 버전을 사용합니다',
}) {
  async _check() {
    const versionMessage = `current ${process.version}`;
    if (process.version.startsWith('v18')) {
      return versionMessage;
    }
    throw new ConfigurationWarning(versionMessage, [
      '노드 버전을 v18로 맞춰주세요',
      'https://www.npmjs.com/package/n',
    ]);
  }
}
