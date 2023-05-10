import { Cli, Builtins } from 'clipanion';
import { ConfigureCommand } from './commands/configure';

const cli = new Cli({
  binaryLabel: `프로젝트 CLI`,
  binaryName: `./ppoba`,
  binaryVersion: `👍`,
});

[
  ConfigureCommand,
  Builtins.HelpCommand,
  Builtins.VersionCommand,
  Builtins.DefinitionsCommand,
].forEach(command => cli.register(command));

cli.runExit(process.argv.slice(2));
