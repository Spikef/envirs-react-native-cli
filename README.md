# envirs-react-native-cli

A react native command tool build by Envirs Team.

## Install

```
npm install envirs-react-native-cli -g
```

## Commands

> Note: Begin start any command, you should cd to your react-native project first.

### bundle

Bundle the js files, support both ios and android.

> *Options*
> + minify: whether to minify the bundle file.
> + dev: whether to use the dev mode.

*example:*

```
cd ~/helloworld
ernc bundle ios --minify
ernc bundle android --minify
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

### build \<Platform\>

Build the app package.

> *Platform*
> + Android: build a android app.
> + iOS: build a iOS app, not support yet.

*example:*

```
cd ~/helloworld
ernc build Android
```

### name \<Name\>

Set a new display name for app.

### link [Package]

Use rnpm-plugin-link to link native packages to your app. More information to visit: (https://github.com/rnpm/rnpm)