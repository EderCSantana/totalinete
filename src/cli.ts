#!/usr/bin/env node
import path from 'path';
import fs from 'fs';
import { runLinterAndFormatterForFile } from './core/runLinterAndFormatter';

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('❌ Você precisa passar o caminho de um arquivo.');
  process.exit(1);
}

const filePath = path.resolve(args[0]);

if (!fs.existsSync(filePath)) {
  console.error(`❌ Arquivo não encontrado: ${filePath}`);
  process.exit(1);
}

runLinterAndFormatterForFile(filePath).then(() => {
  console.log('✔️ Finalizado com sucesso.');
}).catch((err: unknown) => {
	if (err instanceof Error) {
	  console.error("Erro:", err.message);
	} else {
	  console.error("Erro desconhecido:", err);
	}
  });
