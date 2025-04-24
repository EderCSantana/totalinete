"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runLinterAndFormatterForFile = runLinterAndFormatterForFile;
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const util_1 = __importDefault(require("util"));
const execPromise = util_1.default.promisify(child_process_1.exec);
// importe os linters e formatadores igual ao extension.ts
const c_1 = require("../formatters/c");
const norminette_1 = require("../linters/norminette");
// ...
async function runLinterAndFormatterForFile(filePath) {
    const ext = path_1.default.extname(filePath).slice(1); // remove o ponto
    const langId = ext === 'c' ? 'c' : ext;
    console.log(`📂 Arquivo: ${filePath}`);
    console.log(`🌐 Linguagem: ${langId}`);
    console.log(`🔍 Executando linter e formatador...`);
    switch (langId) {
        case 'c':
            console.log(await (0, norminette_1.runNorminette)(filePath));
            console.log(await (0, c_1.formatC)(filePath));
            break;
        // outros casos iguais ao extension.ts...
        default:
            console.warn(`⚠️ Linguagem "${langId}" ainda não suportada.`);
    }
}
//# sourceMappingURL=runLinterAndFormatter.js.map