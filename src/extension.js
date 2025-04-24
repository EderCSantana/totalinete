"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
// Linters
const python_1 = require("./linters/python");
const cpp_1 = require("./linters/cpp");
const javascript_1 = require("./linters/javascript");
const go_1 = require("./linters/go");
const php_1 = require("./linters/php");
const rust_1 = require("./linters/rust");
const r_1 = require("./linters/r");
const java_1 = require("./linters/java");
const csharp_1 = require("./linters/csharp");
const lua_1 = require("./linters/lua");
const bash_1 = require("./linters/bash");
const norminette_1 = require("./linters/norminette");
const objectCalisthenics_1 = require("./linters/objectCalisthenics");
// Formatadores
const python_2 = require("./formatters/python");
const c_1 = require("./formatters/c");
const cpp_2 = require("./formatters/cpp");
const javascript_2 = require("./formatters/javascript");
const go_2 = require("./formatters/go");
const php_2 = require("./formatters/php");
const rust_2 = require("./formatters/rust");
const r_2 = require("./formatters/r");
const java_2 = require("./formatters/java");
const csharp_2 = require("./formatters/csharp");
const lua_2 = require("./formatters/lua");
const bash_2 = require("./formatters/bash");
function activate(context) {
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
                    output.appendLine(await (0, python_1.lintPython)(filePath));
                    output.appendLine(await (0, python_2.formatPython)(filePath));
                    break;
                case 'c':
                    output.appendLine(await (0, norminette_1.runNorminette)(filePath));
                    output.appendLine(await (0, c_1.formatC)(filePath));
                    break;
                case 'cpp':
                    output.appendLine(await (0, cpp_1.lintCpp)(filePath));
                    output.appendLine(await (0, cpp_2.formatCpp)(filePath));
                    break;
                case 'javascript':
                    output.appendLine(await (0, javascript_1.lintJavascript)(filePath));
                    output.appendLine(await (0, javascript_2.formatJavascript)(filePath));
                    break;
                case 'go':
                    output.appendLine(await (0, go_1.lintGo)(filePath));
                    output.appendLine(await (0, go_2.formatGo)(filePath));
                    break;
                case 'php':
                    output.appendLine(await (0, php_1.lintPhp)(filePath));
                    output.appendLine(await (0, php_2.formatPhp)(filePath));
                    output.appendLine(await (0, objectCalisthenics_1.runObjectCalisthenics)(filePath));
                    break;
                case 'rust':
                    output.appendLine(await (0, rust_1.lintRust)(filePath));
                    output.appendLine(await (0, rust_2.formatRust)(filePath));
                    break;
                case 'r':
                    output.appendLine(await (0, r_1.lintR)(filePath));
                    output.appendLine(await (0, r_2.formatR)(filePath));
                    break;
                case 'java':
                    output.appendLine(await (0, java_1.lintJava)(filePath));
                    output.appendLine(await (0, java_2.formatJava)(filePath));
                    output.appendLine(await (0, objectCalisthenics_1.runObjectCalisthenics)(filePath));
                    break;
                case 'csharp':
                    output.appendLine(await (0, csharp_1.lintCsharp)(filePath));
                    output.appendLine(await (0, csharp_2.formatCsharp)(filePath));
                    break;
                case 'lua':
                    output.appendLine(await (0, lua_1.lintLua)(filePath));
                    output.appendLine(await (0, lua_2.formatLua)(filePath));
                    break;
                case 'shellscript':
                    output.appendLine(await (0, bash_1.lintBash)(filePath));
                    output.appendLine(await (0, bash_2.formatBash)(filePath));
                    break;
                default:
                    vscode.window.showWarningMessage(`Linguagem "${langId}" ainda não suportada.`);
                    return;
            }
            vscode.window.showInformationMessage('✔️ Linter e formatador executados com sucesso!');
        }
        catch (err) {
            vscode.window.showErrorMessage(`❌ Erro ao rodar linter/formatador: ${err.message || err}`);
            output.appendLine(`Erro: ${err.message || err}`);
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map