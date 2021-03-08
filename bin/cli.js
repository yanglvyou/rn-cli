#!/usr/bin/env node

const program = require("commander");
const version = require("../package.json").version;
const chalk = require('chalk');

const build = require('./build');

program.version(version, "-v, --version");

program
    .version(version)
    // .command("create <app-name>")
    .description("使用 yang-rn-cli 创建一个新的项目")
    .option("-d --dir <dir>", "创建目录")
    .parse(process.argv);



if (program.args.length > 0) {
    build(program.args[0]);
} else if (program.args.length < 1) {
    console.log(chalk.red('Please supply a name for your new React XP app.'));
}