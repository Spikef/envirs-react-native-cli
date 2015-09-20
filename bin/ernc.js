#!/usr/bin/env node

'use strict';

/***
 * author: Spikef
 * mail: Spikef@foxmail.com
 * Copyright @ Envirs Team
 * http://envirs.com
 */

var Package = require('../package.json');
var Command = require('./commands');
var program = require('commander');
var prompt = require('cli-prompt');

program
    .version(Package.version);

program
    .command('keygen')
    .description('generate an android keystore')
    .action(Command.keygen);

program
    .command('bundle')
    .description('bundle the android files')
    .option('-m, --minify', 'whether to minify the bundle file')
    .action(Command.bundle);

program
    .command('build <Platform>')
    .description('build the app package')
    .action(Command.build);

program.parse(process.argv);