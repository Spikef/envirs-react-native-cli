# Release a apk file to install on your device （Mac Only）

You can use the follow steps to release a apk file easily.

## Step 1：Run you app on simulate

> 1. Open your android simulate
> 2. Open the terminal
> 3. cd *<your project folder>*
> 4. react-native run-android

## Step 2：Save the JS bundle to local

> 1. npm install envirs-react-native-cli -g
> 2. ernc bundle --minify

## Step 3：Generate a key file
The Android Keystore system lets you store cryptographic keys in a container to make it more difficult to extract from the device.

> 1. ernc keygen
> 2. input the information needed step by step

## Step 4： build the apk
> 1. ernc build Android

## Reference

Android Setup：https://facebook.github.io/react-native/docs/android-setup.html#content
React Native Android Config：https://github.com/ggchxx/React-Native-Android-Config
Signing Your App Manually：http://developer.android.com/intl/zh-cn/tools/publishing/app-signing.html#signing-manually
ernc document：https://github.com/Spikef/envirs-react-native-cli/blob/master/README.md