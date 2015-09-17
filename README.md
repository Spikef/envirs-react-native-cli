# envirs-react-native-cli

A react native command tool build by Envirs Team.

## Install

```
npm install envirs-react-native-cli -g
```

## Commands

> Note: Begin start any command, you should cd to your react-native project first.

### bundle

Bundle the android js files.  You should run "react-native run-android" first so far.

> *Options*
> + minify: whether to minify the bundle file.

*example:*

```
cd ~/helloworld
ernc bundle --minify
```

### keygen

Generate a private key for android apk.

*example:*

```
cd ~/helloworld
ernc keygen
```

*snapshot:*

![image](https://github.com/Spikef/envirs-react-native-cli/raw/master/images/keygen.jpg)