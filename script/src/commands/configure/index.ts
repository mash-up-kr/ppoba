import { Command, Option } from 'clipanion';
import { categories } from './Category';
import * as t from 'typanion';
import { Runner } from './Runner';
import { checkers } from './checkers';

const usage = Command.Usage({
  description: `프로젝트의 설정이 제대로 되어 있는지 확인합니다.`,
  details: `
category := ${categories.join(', ')}
  `,
  examples: [
    [`전체 설정 확인`, `$0 configure all`],
    [`시스템 설정만 확인`, `$0 configure system`],
  ],
});

export class ConfigureCommand extends Command {
  public static paths = [[`configure`]];

  public static usage = usage;

  public readonly category = Option.String({
    required: false,
    validator: t.isEnum(categories),
  });

  async execute(): Promise<void> {
    if (this.category == null) {
      return console.info(this.cli.usage(ConfigureCommand, { detailed: true }));
    }
    await new Runner(checkers).run(this.category);
  }
}
