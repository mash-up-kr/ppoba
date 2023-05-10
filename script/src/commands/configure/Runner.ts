import { Category } from './Category';
import { ConfigurationChecker } from './ConfigurationChecker';
import { match } from 'ts-pattern';
import ora from 'ora';
import boxen from 'boxen';

export class Runner {
  private readonly checkers: ConfigurationChecker[];

  constructor(checkers: ConfigurationChecker[]) {
    this.checkers = checkers;
  }

  async run(category?: Category) {
    const match = (checker: ConfigurationChecker) => {
      if (category === 'all') {
        return true;
      } else {
        return checker.category === category;
      }
    };

    for (const checker of this.checkers) {
      if (!match(checker)) {
        continue;
      }
      await this.runChecker(checker);
    }
  }

  private async runChecker(checker: ConfigurationChecker) {
    const spinner = ora({ text: checker.title });
    spinner.start();
    const result = await checker.check();

    match(result)
      .with({ result: 'success' }, ({ message }) => {
        spinner.succeed(`${checker.title} - ${message}`);
      })
      .with({ result: 'warning' }, ({ message, diagnotics }) => {
        spinner.warn(`${checker.title} - ${message}`);
        this.reportDiagnotics(diagnotics);
      })
      .with({ result: 'failure' }, ({ message, diagnotics }) => {
        spinner.fail(`${checker.title} - ${message}`);
        this.reportDiagnotics(diagnotics);
        process.exit(1);
      })
      .exhaustive();
  }

  private reportDiagnotics(diagnotics: string[]) {
    console.info(boxen(diagnotics.join('\n\n'), { padding: 1, margin: 1 }));
  }
}
