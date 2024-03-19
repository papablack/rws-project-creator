#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("@rws-framework/console");
const path_1 = __importDefault(require("path"));
const packageExecDir = path_1.default.resolve(__dirname);
const bootstrap = console_1.rwsCli.bootstrap(['init'], packageExecDir + '/actions');
(async () => {
    bootstrap.run({
        args: ['project_name', 'target_dir'],
        options: [{
                short: 'o',
                long: 'override',
                defaultValue: 'false'
            }]
    });
})();
