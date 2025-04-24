import * as cp from 'child_process';

export function lintBash(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cp.exec('shellcheck ' + filePath, (err: Error | null, stdout: string, stderr: string) => {
      if (err) return reject(stderr || stdout);
      resolve(stdout);
    });
  });
}
