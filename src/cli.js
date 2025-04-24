#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const runLinterAndFormatter_1 = require("./core/runLinterAndFormatter");
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error('❌ Você precisa passar o caminho de um arquivo.');
    process.exit(1);
}
const filePath = path_1.default.resolve(args[0]);
if (!fs_1.default.existsSync(filePath)) {
    console.error(`❌ Arquivo não encontrado: ${filePath}`);
    process.exit(1);
}
(0, runLinterAndFormatter_1.runLinterAndFormatterForFile)(filePath).then(() => {
    console.log('✔️ Finalizado com sucesso.');
}).catch((err) => {
    if (err instanceof Error) {
        console.error("Erro:", err.message);
    }
    else {
        console.error("Erro desconhecido:", err);
    }
});
//# sourceMappingURL=cli.js.map