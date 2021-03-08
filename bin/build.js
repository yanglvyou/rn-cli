#!/usr/bin/env node

require('shelljs/global');
const paths = require('path');
const fs = require('fs');
const figlet = require('figlet');
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const spawn = require('cross-spawn');

function shouldUseYarn() {
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

const installPackages = () => {
  console.log(chalk.white.bold('Installing Packages'));
  return new Promise((resolve, reject) => {
    let command;
    let args = ['install'];

    if (shouldUseYarn()) {
      command = 'yarn';
    } else {
      command = 'npm';
    }

    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('close', code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`
        });
        return;
      }
      resolve();
    })
  })
}

const build = (appName) => {
  cp('-r', __dirname + '/../src/.', appName);
  console.log('----------------------------------------------------------');
  figlet.text('React Native', {
    font: 'Graffiti'
  }, function (err, data) {
    if (err) {
      console.log(chalk.white.bold('React Native'));
    } else {
      console.log(data);
    }
    console.log('----------------------------------------------------------');
    console.log(chalk.green.bold('Welcome to React Native'));
    console.log('----------------------------------------------------------');
    cd(appName);
    installPackages().then(() => {
      console.log(chalk.green('恭喜！！！项目创建成功'));
      console.log('----------------------------------------------------------');
    })
      .catch(error => {
        console.log(chalk.red('An unexpected error occurred'))
        console.log(chalk.red(error));
      });
  });
}

module.exports = build;
