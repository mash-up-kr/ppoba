import { execSync } from 'child_process';

export function shell(parts: TemplateStringsArray, ...args: any[]): string {
  const command = concatTemplateString(parts, ...args);
  try {
    return execSync(command, { encoding: 'utf8' }).trim();
  } catch (error: any) {
    if ('stderr' in error) {
      return error.stderr.toString();
    }
    throw error;
  }
}

shell.orThrow = function (parts: TemplateStringsArray, ...args: any[]): string {
  const command = concatTemplateString(parts, ...args);
  return execSync(command, { encoding: 'utf8' }).trim();
};

function concatTemplateString(parts: TemplateStringsArray, ...args: any[]): string {
  let cmd = '';
  for (let i = 0; i < parts.length; i++) {
    cmd += parts[i] + (args[i] ?? '');
  }
  return cmd;
}
