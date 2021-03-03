### 安装
npm install

### 运行
```
// production环境编译
npm run dev:weapp
或
yarn dev:weapp

//develop环境编译
npm run dev:weapp:dev
或
yarn dev:weapp:dev

```

#### 注意事项
* production环境增加了体验版和正式版的env的环境变量，根据env访问对应环境接口
* 非production环境，运行自己对应的环境接口，比如:
   development会调用‘/utils/requestApi/config.ts’中的development的配置

### 基础功能
* 配置有dva，可以进行状态管理
* 配置taroUI
* 请求接口封装处理
