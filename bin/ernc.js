#!/usr/bin/env node

'use strict';

var fs = require('fs');
var path = require('path');
var child = require('child_process');
var helper = require('./helper');
var Package = require('../package.json');
var program = require('commander');
var prompt = require('cli-prompt');

program
    .version(Package.version);

program
    .command('keygen')
    .description('generate an android keystore')
    .action(function() {
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
    });

program
    .command('bundle')
    .description('bundle the android files')
    .option('-m, --minify', 'whether to minify the bundle file')
    .action(function(options) {
        if ( !helper.isReactNativeProject() ) {
            console.log('It seems that you didn\'t run this inside a react-native project.');
            return;
        } else {
            console.log('Begin to save the android bundle, please wait a seconds.');
        }

        var http = require('http');
        http.get(helper.bundleServer.android, function(res) {
            var body = '';  // init body data
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                if (options.minify) {
                    var UglifyJS = require('uglify-js');
                    var result = UglifyJS.minify(body, {fromString: true});
                    body = result.code;
                }

                var root = process.cwd();
                var project = path.basename(root);
                var main = path.resolve(root, 'android/app/src/main/java/com/' + project + '/MainActivity.java');
                var output = path.resolve(root, helper.bundleLocal.android, helper.getBundleAsset(main));
                var folder = path.resolve(output, '../');
                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder)
                }
                fs.writeFile(output, body, function(err) {
                    if (err) {
                        console.log('Save error: ' + err)
                    } else {
                        console.log('Successfully finished.');
                    }
                });
            });
        }).on('error', function(e) {
            console.log('Request error: ' + e.message);
        });
    });

program
    .command('build <Platform>')
    .description('build the app package')
    .action(function(Platform) {
        if ( !helper.isReactNativeProject() ) {
            console.log('It seems that you didn\'t run this inside a react-native project.');
            return;
        }

        if (Platform.toLowerCase() == 'android') {
            var root = process.cwd();
            var work = path.resolve(root, 'android/app');
            var output = path.resolve(root, 'android/app/build/outputs/apk/app-release.apk');
            var result = child.spawnSync('../gradlew', ['assembleRelease'], {stdio: 'inherit', cwd: work});
            if (result.status == 0) {
                // success
                console.log('Successfully build the apk, you can find the file here:');
                console.log(output);

                prompt.multi(
                    [{
                        label: 'Would you like to open the folder right now?',
                        key: 'open', type: 'boolean'
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
    });

program.parse(process.argv);