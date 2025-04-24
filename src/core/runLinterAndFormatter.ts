import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

// importe os linters e formatadores igual ao extension.ts
import { formatC } from '../formatters/c';
import { runNorminette } from '../linters/norminette';

// ...

export async function runLinterAndFormatterForFile(filePath: string) {
  const ext = path.extname(filePath).slice(1); // remove o ponto
  const langId = ext === 'c' ? 'c' : ext;

  console.log(`📂 Arquivo: ${filePath}`);
  console.log(`🌐 Linguagem: ${langId}`);
  console.log(`🔍 Executando linter e formatador...`);

  switch (langId) {
    case 'c':
      console.log(await runNorminette(filePath));
      console.log(await formatC(filePath));
      break;
    // outros casos iguais ao extension.ts...
    default:
      console.warn(`⚠️ Linguagem "${langId}" ainda não suportada.`);
  }
}
