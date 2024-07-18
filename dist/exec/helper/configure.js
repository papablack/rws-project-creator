"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateEnvFiles = populateEnvFiles;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
function populateEnvFiles(toPopulateEnvVars, opts) {
    for (const envVarSourcePath of toPopulateEnvVars) {
        const envVarSource = path_1.default.resolve(envVarSourcePath);
        const sourceFileContent = fs_1.default.readFileSync(envVarSource, 'utf-8');
        let replacedFileContent = sourceFileContent;
        Object.keys(opts).forEach((key) => {
            const option = opts[key];
            replacedFileContent = replacedFileContent.replace(new RegExp('\\[\\[' + key + '\\]\\]', 'g'), option);
        });
        fs_1.default.unlinkSync(envVarSource);
        fs_1.default.writeFileSync(envVarSource.replace('.replace', ''), replacedFileContent);
    }
    console.log(chalk_1.default.blue('Environment prepared. Running install scripts on location:'));
}
