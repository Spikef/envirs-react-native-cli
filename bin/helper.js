/***
 * author: Spikef
 * mail: Spikef@foxmail.com
 * Copyright @ Envirs Team
 * http://envirs.com
 */

// 检测是否ReactNative项目目录
exports.isReactNativeProject = function() {
    var fs = require('fs');
    var path = require('path');

    var dpath = process.cwd();   //获取当前运行目录
    var pfile = path.resolve(dpath, 'package.json');

    if ( fs.existsSync(pfile) ) {
        var pack = require(pfile);
        return !!pack['dependencies']['react-native'];
    } else {
        return false;
    }
};

// 获取AndroidManifest.xml中java主程序包的包名
exports.getAndroidPackage = function(xml) {
    var fs = require('fs');
    var value = '';

    if (fs.existsSync(xml)) {
        var content = fs.readFileSync(xml, 'utf8');
        if (content) {
            var matches = content.match(/<manifest[^>]+?package="([^"]+)"/);
            if (matches) value = matches[1];
        }
    }

    return value;
};

// 获取MainActivity.java中定义的JS包文件名
exports.getBundleAsset = function(java) {
    var fs = require('fs');
    var value = '';

    if (fs.existsSync(java)) {
        var content = fs.readFileSync(java, 'utf8');
        if (content) {
            var matches = content.match(/\.setBundleAssetName\("([^"]+)"\)/);
            if (matches) value = matches[1].replace(/[^\w^\.]/g, '');
        }
    }

    return value;
};

// 设置build.gradle中的密钥
exports.setBuildGradle = function(file, keys) {
    var fs = require('fs');

    if (fs.existsSync(file)) {
        var content = fs.readFileSync(file, 'utf8');
        if (content.indexOf('signingConfigs') === -1) {
            content = content.replace('buildTypes',
    `signingConfigs{
        release {
            storeFile file("${keys.keyFile}.keystore")
            storePassword "${keys.password}"
            keyAlias "${keys.keyAlias}"
            keyPassword "${keys.password}"
        }
    }
    buildTypes`
            );

            content = content.replace(/(buildTypes[\s\r\n]*\{[^\{]*\{[^}]*)(})/, '$1\tsigningConfig signingConfigs.release\n\t\t$2');

            fs.writeFileSync(file, content, 'utf8');
        }
    }
};

// 遍历文件夹下所有文件
exports.getFiles = function(dir) {
    var fs = require('fs'),
        fileList = [];

    var traverse = function(path){
        var dirList = fs.readdirSync(path);
        dirList.forEach(function(item){
            if(fs.statSync(path + '/' + item).isDirectory()){
                traverse(path + '/' + item);
            }else{
                fileList.push(path + '/' + item);
            }
        });
    };

    traverse(dir);

    return fileList;
};

// JS包线上地址
exports.bundleServer = {
    android: 'http://localhost:8081/index.android.bundle',
    iOS: 'http://localhost:8081/index.ios.bundle'
};

// JS包本地地址
exports.bundleLocal = {
    android: 'android/app/src/main/assets',
    iOS: 'iOS/main.jsbundle'
};