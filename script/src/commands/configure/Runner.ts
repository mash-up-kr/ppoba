import { Category } from './Category';
import { match } from 'ts-pattern';
import ora from 'ora';
import boxen from 'boxen';
import { CheckList, RootChecklist } from './types';
import { Checker } from './Chekcer';

export class Runner {
  constructor(private readonly checklist: RootChecklist) {}

  async run(category?: Category) {
    const match = (checklistTitle: string) => {
      if (category === 'all') {
        return true;
      } else {
        return checklistTitle.split(':')[0] === category;
      }
    };

    for (const title in this.checklist) {
      if (!match(title)) {
        continue;
      }
      await this.check(this.parseChecklistorChecker(this.checklist[title as keyof typeof this.checklist]), {
        title,
        depth: 0,
      });
    }
  }

  private parseChecklistorChecker(
    checklistOrChecker: CheckList | Checker
  ): { checklist: null; checker: Checker } | { checklist: CheckList; checker: null } {
    if (this.isChecker(checklistOrChecker)) {
      return {
        checklist: null,
        checker: checklistOrChecker,
      };
    } else {
      return {
        checklist: checklistOrChecker,
        checker: null,
      };
    }
  }

  private async check(
    {
      checklist,
      checker,
    }:
      | {
          checklist: null;
          checker: Checker;
        }
      | {
          checklist: CheckList;
          checker: null;
        },
    {
      depth,
      title,
    }: {
      depth: number;
      title: string;
    }
  ) {
    if (checker) {
      const spinner = ora({ text: title, indent: depth * 2 });
      spinner.start();
      const result = await checker.check();
      match(result)
        .with({ result: 'success' }, ({ message }) => {
          spinner.succeed(formatResult(message));
        })
        .with({ result: 'warning' }, ({ message, diagnotics }) => {
          spinner.warn(formatResult(message));
          this.reportDiagnotics(diagnotics);
        })
        .with({ result: 'failure' }, ({ message, diagnotics }) => {
          spinner.fail(formatResult(message));
          this.reportDiagnotics(diagnotics);
          process.exit(1);
        })
        .exhaustive();

      function formatResult(message: string | void) {
        if (message) {
          return `${title} - ${message}`;
        } else {
          return title;
        }
      }
    } else {
      console.log(`📋 ${title}`);
      for (const title in checklist) {
        await this.check(this.parseChecklistorChecker(checklist[title as keyof typeof checklist]), {
          title,
          depth: depth + 1,
        });
      }
    }
  }

  private reportDiagnotics(diagnotics?: string[]) {
    if (diagnotics) {
      console.info(boxen(diagnotics.join('\n\n'), { padding: 1, margin: 1 }));
    }
  }

  private isChecker(checklistOrChecker: CheckList | Checker): checklistOrChecker is Checker {
    return typeof checklistOrChecker.check === 'function';
  }
}
