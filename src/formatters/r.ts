import * as cp from 'child_process';

export function formatR(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cp.exec("Rscript -e \"styler::style_file('" + filePath + "')\"", (err: Error | null, stdout: string, stderr: string) => {
      if (err) return reject(stderr || stdout);
      resolve(stdout);
    });
  });
}
