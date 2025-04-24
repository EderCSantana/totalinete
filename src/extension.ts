import * as vscode from 'vscode';

// Linters
import { lintPython } from './linters/python';
import { lintCpp } from './linters/cpp';
import { lintJavascript } from './linters/javascript';
import { lintGo } from './linters/go';
import { lintPhp } from './linters/php';
import { lintRust } from './linters/rust';
import { lintR } from './linters/r';
import { lintJava } from './linters/java';
import { lintCsharp } from './linters/csharp';
import { lintLua } from './linters/lua';
import { lintBash } from './linters/bash';
import { runNorminette } from './linters/norminette';
import { runObjectCalisthenics } from './linters/objectCalisthenics';

// Formatadores
import { formatPython } from './formatters/python';
import { formatC } from './formatters/c';
import { formatCpp } from './formatters/cpp';
import { formatJavascript } from './formatters/javascript';
import { formatGo } from './formatters/go';
import { formatPhp } from './formatters/php';
import { formatRust } from './formatters/rust';
import { formatR } from './formatters/r';
import { formatJava } from './formatters/java';
import { formatCsharp } from './formatters/csharp';
import { formatLua } from './formatters/lua';
import { formatBash } from './formatters/bash';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('totalinete.runLinterAndFormatter', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage('Nenhum arquivo aberto.');
      return;
    }

    const document = editor.document;
    const filePath = document.uri.fsPath;
    const langId = document.languageId;

    const output = vscode.window.createOutputChannel('Totalinete Linter & Formatter');
    output.clear();
    output.show();

    try {
      output.appendLine(`📂 Arquivo: ${filePath}`);
      output.appendLine(`🌐 Linguagem: ${langId}`);
      output.appendLine(`🔍 Executando linter e formatador...`);

      switch (langId) {
        case 'python':
          output.appendLine(await lintPython(filePath));
          output.appendLine(await formatPython(filePath));
          break;
        case 'c':
          output.appendLine(await runNorminette(filePath));
          output.appendLine(await formatC(filePath));
          break;
        case 'cpp':
          output.appendLine(await lintCpp(filePath));
          output.appendLine(await formatCpp(filePath));
          break;
        case 'javascript':
          output.appendLine(await lintJavascript(filePath));
          output.appendLine(await formatJavascript(filePath));
          break;
        case 'go':
          output.appendLine(await lintGo(filePath));
          output.appendLine(await formatGo(filePath));
          break;
        case 'php':
          output.appendLine(await lintPhp(filePath));
          output.appendLine(await formatPhp(filePath));
          output.appendLine(await runObjectCalisthenics(filePath));
          break;
        case 'rust':
          output.appendLine(await lintRust(filePath));
          output.appendLine(await formatRust(filePath));
          break;
        case 'r':
          output.appendLine(await lintR(filePath));
          output.appendLine(await formatR(filePath));
          break;
        case 'java':
          output.appendLine(await lintJava(filePath));
          output.appendLine(await formatJava(filePath));
          output.appendLine(await runObjectCalisthenics(filePath));
          break;
        case 'csharp':
          output.appendLine(await lintCsharp(filePath));
          output.appendLine(await formatCsharp(filePath));
          break;
        case 'lua':
          output.appendLine(await lintLua(filePath));
          output.appendLine(await formatLua(filePath));
          break;
        case 'shellscript':
          output.appendLine(await lintBash(filePath));
          output.appendLine(await formatBash(filePath));
          break;
        default:
          vscode.window.showWarningMessage(`Linguagem "${langId}" ainda não suportada.`);
          return;
      }

      vscode.window.showInformationMessage('✔️ Linter e formatador executados com sucesso!');
    } catch (err: any) {
      vscode.window.showErrorMessage(`❌ Erro ao rodar linter/formatador: ${err.message || err}`);
      output.appendLine(`Erro: ${err.message || err}`);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
