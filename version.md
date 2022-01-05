### 版本升级
#### 将3.0.21升级到3.2.1
```
    "@tarojs/cli": "3.2.1",
    "@tarojs/components": "3.2.1",
    "@tarojs/react": "3.2.1",
    "@tarojs/runtime": "3.2.1",
    "@tarojs/taro": "3.2.1",
    "@tarojs/mini-runner": "3.2.1",
    "@tarojs/webpack-runner": "3.2.1",
    "babel-preset-taro": "3.2.1",
    "eslint-config-taro": "3.2.1",
```
#### 删除全局taro-cli
> cli版本不同，有可能会出现问题，卸载全局cli使用项目中的cli

##### 查看全局cli版本：taro -v
> 卸载全局cli:npm uninstall -g @tarojs/cli
##### 查看项目cli版本: npx taro -v
