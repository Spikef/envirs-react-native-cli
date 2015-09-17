# envirs-react-native-cli

A react native command tool build by Envirs Team.

## Install

```javascript
npm install envirs-react-native-cli -g
```

## Commands

> Note: Begin start any command, you should cd to your react-native project first.**

### bundle

Bundle the android js files.  You should run "react-native run-android" first so far.

* Options *

+ minify: whether to minify the bundle file.

example:

```javascript
cd ~/helloworld
ernc bundle --minify
```