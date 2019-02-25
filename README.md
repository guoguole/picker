# picker

> A Vue.js project

## Build Setup
``` bash
# 需要install下载的资源
1、jade
2、css-loader
3、sass-loader
4、node-sass
5、px2rem-loader
6、mint-ui
# 需要配置的文件：
npm run dev
1、./build/utils.js
    exports.cssLoaders = function (options) {
       const px2remLoader = {
           loader: 'px2rem-loader',
           options: {
             remUnit: 16;//pm转rem的倍数
           }
         }
    }
    function generateLoaders (loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader, px2remLoader] : [cssLoader, px2remLoader]
    }
2、./config/index.js
    host: 'localhost' 改成 host: '0.0.0.0'
   
```
    
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
