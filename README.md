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
> + -m --minify: whether to minify the bundle file.
> + -d --dev: whether to use the dev mode.

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

### name [Type]

Set a new version for app.

Type: 'code', 'name', 'all' or any allowed version value(eg 1, 1.0, 1.1.1), default is 'name'.

When the type is a version value, the real type depends on the value format.

*example:*

`
1 --> Type is 'code'
1.1 --> Type is 'name'
'name 1' --> Type is 'name'
'code 1.1' --> won't update
`

> *Options*
> + -p, --plus [n]: An integer to plus, default is 1.
> + -m, --main: To update the main version number.
> + -n, --minor: To update the minor version number.
> + -f, --fix: To update the fix version number.

### link [Package]

Use rnpm-plugin-link to link native packages to your app. More information to visit: (https://github.com/rnpm/rnpm)