#!/usr/bin/env node

'use strict';

/***
 * author: Spikef
 * mail: Spikef@foxmail.com
 * Copyright @ Envirs Team
 * http://envirs.com
 */

var fs = require('fs');
var path = require('path');
var child = require('child_process');
var helper = require('../helper');
var prompt = require('cli-prompt');

module.exports = function(Platform, options) {
    if ( !helper.isReactNativeProject() ) {
        console.log('It seems that you didn\'t run this inside a react-native project.');
        return;
    } else {
        console.log('Begin to save the js bundle, please wait a seconds.');
    }

    var minify = options.minify ? true : false;
    var develop = options.dev ? true : false;

    if (Platform.toLowerCase() == 'android') {
        let root = process.cwd();
        let main = helper.getAndroidPackage(path.resolve(root, 'android/app/src/main/AndroidManifest.xml'));
        let output = path.resolve(root, helper.bundleLocal.android, helper.getBundleAsset(main));
        let assets = path.resolve(output, '../');

        if (!fs.existsSync(assets)) {
            fs.mkdirSync(assets)
        }

        let args = [
            'bundle', '--platform', 'android', '--entry-file', 'index.android.js',
            '--bundle-output', output,
            '--assets-dest', 'android/app/src/main/res/',
            '--reset-cache', 'true'
        ];

        args.push('--minify', minify);
        args.push('--dev', develop);

        let result = child.spawnSync('react-native', args, {stdio: 'inherit', cwd: root});

        if (result.status == 0) {
            // success
            console.log('Successfully save the js bundle, you can find the file here:');
            console.log(output);

            prompt.multi(
                [{
                    label: 'Would you like to open the folder right now?',
                    key: 'open', type: 'boolean', default: 'false'
                }],
                function(options){
                    if (options.open) {
                        child.exec('open ' + path.dirname(output));
                    }
                }
            );
        }
    } else {
        let root = process.cwd();
        let output = path.resolve(root, helper.bundleLocal.iOS);

        let args = [
            'bundle', '--platform', 'ios', '--entry-file', 'index.ios.js',
            '--bundle-output', output,
            '--reset-cache', 'true'
        ];

        args.push('--minify', minify);
        args.push('--dev', develop);

        let result = child.spawnSync('react-native', args, {stdio: 'inherit', cwd: root});

        if (result.status == 0) {
            // success
            console.log('Successfully save the js bundle, you can find the file here:');
            console.log(output);

            prompt.multi(
                [{
                    label: 'Would you like to open the folder right now?',
                    key: 'open', type: 'boolean', default: 'false'
                }],
                function(options){
                    if (options.open) {
                        child.exec('open ' + path.dirname(output));
                    }
                }
            );
        }
    }
};