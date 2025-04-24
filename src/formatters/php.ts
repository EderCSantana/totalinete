import * as cp from 'child_process';

export function formatPhp(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cp.exec('php-cs-fixer fix ' + filePath, (err: Error | null, stdout: string, stderr: string) => {
      if (err) return reject(stderr || stdout);
      resolve(stdout);
    });
  });
}
