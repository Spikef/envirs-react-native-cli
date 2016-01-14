#!/usr/bin/env node

'use strict';

/**
 * Usage: Set the display name for app
 * Author: Spikef < Spikef@Foxmail.com >
 * Copyright: Envirs Team < http://envirs.com >
 */

var fs = require('fs');
var path = require('path');
var helper = require('../helper');
var prompt = require('cli-prompt');

module.exports = function(name) {
    if ( !helper.isReactNativeProject() ) {
        console.log('It seems that you didn\'t run this inside a react-native project.');
        return;
    }

    var root = process.cwd();
    var project = helper.getProjectName();

    // iOS: Info.plist
    var info = path.resolve(root, 'ios/' + project + '/Info.plist');
    var key = '<key>CFBundleDisplayName</key>';
    var ios = fs.readFileSync(info, 'utf8');

    if ( ios.indexOf(key) > -1 ) {
        ios = ios.replace(/(<key>CFBundleDisplayName<\/key>\s*<string>)([^<]*)(<\/string>)/, '$1' + name + '$3');
    } else {
        ios = ios.replace(/<dict>\t\n/, '<key>CFBundleDisplayName</key>\n\t<string>' + name + '</string>\n\t');
    }

    fs.writeFileSync(info, ios);

    // Android: strings.xml
    var strings = path.resolve(root, 'android/app/src/main/res/values/strings.xml');
    var android = fs.readFileSync(strings, 'utf8');
    android = android.replace(/(<string name="app_name">)([^<]*)(<\/string>)/, '$1' + name + '$3');

    fs.writeFileSync(strings, android);

    console.log('Successfully set the display name to: ' + name);
};