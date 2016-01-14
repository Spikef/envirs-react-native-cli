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

module.exports = function(Platform) {
    if ( !helper.isReactNativeProject() ) {
        console.log('It seems that you didn\'t run this inside a react-native project.');
        return;
    }

    if (Platform.toLowerCase() == 'android') {
        var root = process.cwd();
        var work = path.resolve(root, 'android');
        var output = path.resolve(root, 'android/app/build/outputs/apk/app-release.apk');
        var result = child.spawnSync('./gradlew', ['assembleRelease'], {stdio: 'inherit', cwd: work});
        if (result.status == 0) {
            // success
            console.log('Successfully build the apk, you can find the file here:');
            console.log(output);

            prompt.multi(
                [{
                    label: 'Would you like to open the folder right now?',
                    key: 'open', type: 'boolean', default: 'true'
                }],
                function(options){
                    if (options.open) {
                        child.exec('open ' + path.dirname(output));
                    }
                }
            );
        }
    } else {
        console.log('Only support build android yet.');
    }
};