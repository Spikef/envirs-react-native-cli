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
    .version(Package.version, '-v, --version');

program
    .command('keygen')
    .description('generate an android keystore')
    .action(Command.keygen);

program
    .command('bundle <Platform>')
    .description('bundle the android files')
    .option('-m, --minify', 'whether to minify the bundle file')
    .option('-d, --dev', 'whether to minify the bundle file')
    .action(Command.bundle);

program
    .command('build <Platform>')
    .description('build the app package')
    .action(Command.build);

program
    .command('name <Name>')
    .description('set the display name for app')
    .action(Command.name);

program
    .command('versions [Type]')
    .description('update the version name(bundle version short) or version code(bundle version)')
    .option('-p, --plus [n]', 'An integer to plus')
    .option('-m, --main', 'To update the main version number')
    .option('-n, --minor', 'To update the minor version number')
    .option('-f, --fix', 'To update the fix version number')
    .action(Command.version);

program
    .command('link [PackageName]')
    .description('Updates your project and links all native dependencies')
    .action(Command.link);

program.parse(process.argv);