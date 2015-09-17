#!/usr/bin/env node

'use strict';

var exec = require('child_process').execSync;
var helper = require('./helper');
var program = require('commander');

program
    .version('0.0.1');

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

                var fs = require('fs');
                var path = require('path');

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

program.parse(process.argv);