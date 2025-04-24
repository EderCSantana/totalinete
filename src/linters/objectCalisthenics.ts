import * as cp from 'child_process';

export function runObjectCalisthenics(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Exemplo com Java: checkstyle com regras customizadas
    cp.exec('checkstyle -c /path/to/object-calisthenics.xml ' + filePath, (err: Error | null, stdout: string, stderr: string) => {
      if (err) return reject(stderr || stdout);
      resolve(stdout);
    });
  });
}
