#!/usr/bin/env node

'use strict';

/**
 * Usage: update the version name(bundle version short) or version code(bundle version)
 * Author: Spikef < Spikef@Foxmail.com >
 * Copyright: Envirs Team < http://envirs.com >
 */

var fs = require('fs');
var path = require('path');
var helper = require('../helper');
var prompt = require('cli-prompt');

module.exports = function(Type, options) {
    if ( !helper.isReactNativeProject() ) {
        console.log('It seems that you didn\'t run this inside a react-native project.');
        return;
    }

    var root = process.cwd();
    var project = helper.getProjectName();

    var version = {ios: {}, android: {}};

    // iOS: Info.plist
    var info = path.resolve(root, 'ios/' + project + '/Info.plist');
    var ios = fs.readFileSync(info, 'utf8');

    version.ios.name = ios.match(/(<key>CFBundleShortVersionString<\/key>\s*<string>)([^<]*)(<\/string>)/)[2];
    version.ios.code = ios.match(/(<key>CFBundleVersion<\/key>\s*<string>)([^<]*)(<\/string>)/)[2];

    parse(Type, options, version.ios);

    ios = ios.replace(/(<key>CFBundleShortVersionString<\/key>\s*<string>)([^<]*)(<\/string>)/, '$1' + version.ios.name + '$3');
    ios = ios.replace(/(<key>CFBundleVersion<\/key>\s*<string>)([^<]*)(<\/string>)/, '$1' + version.ios.code + '$3');

    fs.writeFileSync(info, ios);

    // Android: build.gradle
    var build = path.resolve(root, 'android/app/build.gradle');
    var android = fs.readFileSync(build, 'utf8');

    version.android.name = android.match(/(versionName\s+")([\d\.]+)(")/)[2];
    version.android.code = android.match(/(versionCode\s+)([\d]+)/)[2];

    parse(Type, options, version.android);

    android = android.replace(/(versionName\s+")([\d\.]+)(")/, '$1' + version.android.name + '$3');
    android = android.replace(/(versionCode\s+)([\d]+)/, '$1' + version.android.code);

    fs.writeFileSync(build, android);

    console.log('Successfully set the version to: \n' + JSON.format(version.ios));
};

function parse(type, args, vers) {
    var isVal, isMain, isMinor, isFix, name, code, step;

    isVal = /^(name )?(\d+)(\.\d+)?(\.\d+)?$/.test(type);
    isMain = args.main ? true : false;
    isFix = args.fix ? true : false;
    isMinor = args.minor || (!isMain && !isFix) ? true : false;

    if ( isVal ) {
        if ( type.indexOf('name ') === 0 || type.indexOf('.') > 0 ) {
            name = type.replace('name ', '');
            type = 'name';
        } else {
            code = type;
            type = 'code';
        }
    } else {
        step = Number(args.plus) || 1;
        code = parseInt(vers.code) + step;
        name = vers.name;

        name = name.replace(/^(\d+)(\.\d+)?(\.\d+)?$/, function($0, $1, $2, $3) {
            if ( isMain ) {
                $1 = Number($1) || 0;
                $1 = $1 + step;
                $1 = String($1);
            }

            if ( isMinor ) {
                $2 = Number($2) || 0;
                $2 = $2 + step;
                $2 = '.' + String($2);
            }

            if ( isFix ) {
                $3 = Number($3) || 0;
                $3 = $3 + step;
                $3 = '.' + String($3);
            }

            return ($1 || '') + ($2 || '') + ($3 || '');
        });
    }

    if ( type === 'name' || type === 'all' || !type && name ) {
        vers.name = name;
    }

    if ( type === 'code' || type === 'all' && code && /^\d+$/.test(code) ) {
        vers.code = code;
    }
}