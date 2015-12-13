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

module.exports = function() {
    if ( !helper.isReactNativeProject() ) {
        console.log('It seems that you didn\'t run this inside a react-native project.');
        return;
    }

    // prompt user input key args
    prompt.multi([
        {
            label: 'Input the name of the key (such as: mykey)',
            key: 'keyName',
            default: '',
            validate: function (val) {
                if (val.length < 1) {
                    throw new Error ('key name must be at least 1 characters');
                }
            }
        },
        {
            label: 'Input the alias name of the key (such as: reactnative)',
            key: 'keyAlias',
            default: '',
            validate: function (val) {
                if (val.length < 1) {
                    throw new Error ('key alias name must be at least 1 characters');
                }
            }
        },
        {
            label: 'Input the file name of the key (such as: release-key)',
            key: 'keyFile',
            validate: function (val) {
                if (val.length < 1){
                    throw new Error('key file name must be at least 1 characters')
                }
            }
        },
        {
            label: 'Input the password of the key (at least 6 characters)',
            key: 'password',
            type: 'password',
            validate: function (val) {
                if (val.length < 6){
                    throw new Error('password must be at least 6 characters')
                }
            }
        }
    ], function(options){
        var keyAlias = options.keyAlias;
        var keyName = options.keyName;
        var keyFile = options.keyFile;
        var password = options.password;

        var root = process.cwd();
        var keyPath = path.resolve(root, 'android/app/' + keyFile + '.keystore');

        if ( fs.existsSync(keyPath) ) fs.unlinkSync(keyPath);

        var args = [
            '-genkey', '-v', '-keyalg', 'RSA', '-validity', '20000',
            '-keystore', keyName +'.keystore',
            '-alias', keyAlias,
            '-keystore', keyPath,
            '-keypass', password,
            '-storepass', password
        ];

        var result = child.spawnSync('keytool', args, {stdio: 'inherit'});
        if (result.status == 0) {
            // success
            helper.setBuildGradle(
                path.resolve(root, 'android/app/build.gradle'),
                {keyAlias: keyAlias, keyFile: keyFile, keyName: keyName, password: password}
            );

            console.log('Successfully generated your key, now try [ernc build Android] to release the apk.');
        }
    });
};