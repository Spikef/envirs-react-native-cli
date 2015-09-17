# 生成真机上运行的APK文件 （Mac Only）

当你的React Android程序已经运行起来之后，可以通过以下步骤打包生成可以在真机上安装并运行的APK文件。

## 第一步：在模拟器上运行你的程序
该步的主要目的是下载打包需要的各种依赖文件，并启用相应的Node服务。

> 1. 打开你的Android模拟器
> 2. 打开终端
> 3. cd *<你的项目目录>*
> 4. react-native run-android

## 第二步：保存JS包到本地
该步的目的是把React Native的JS包保存到应用目录下，以使该APP能够脱离开发环境独立运行。

> 1. 安装envirs-react-native-cli
> 2. 在终端执行 *ernc bundle --minify*

该命令会自动帮助你把你的JS包以正确的名称保存到正确的位置，并压缩JS包文件。

## 第三步：生成签名
Android应用必须经过签名才能在未root的真机上安装，该步骤将指引你生成一个自己的签名。

> 1. 在终端执行 *ernc keygen*
> 2. 按照指引输入生成密钥所必需的信息

该命令会引导你生成签名文件，并保存到APP项目目录下，同时增加build.gradle文件中密钥的设置。

## 第四步： 打包应用
> 1. 在终端执行 *ernc build Android*

## 参考

安装Android运行环境：http://wiki.jikexueyuan.com/project/react-native/DevelopmentSetupAndroid.html  
React Native Android的配置说明：https://github.com/ggchxx/React-Native-Android-Config  
Mac Android签名生成keystore：http://www.cnblogs.com/liqw/p/4064662.html  
ernc帮助文档：https://github.com/Spikef/envirs-react-native-cli/blob/master/README.md