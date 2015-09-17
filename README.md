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

### build <Platform>

Build the app package.

> *Platform*
> + Android: build a android app.

*example:*

```
cd ~/helloworld
ernc build Android
```

## Known issue

If you generate the key two or more times for the same app, the keygen command won't update the build.gradle file. I'll fix it in the future.