/*
* date: 2019-06-05
* desc:
*/
'use strict';
const path = require('path');

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    configureWebpack:{
        resolve: {
            alias: {
                '@': path.join(__dirname,'src')
            }
        },
        devtool: process.env.NODE_ENV === 'development' ? '#eval-source-map' : ''
    },
    devServer: {
        clientLogLevel: 'warning', //
        historyApiFallback: true, //
        hot: true, //
        compress: true, //
        port: 3000,
        host: 'localhost',
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        publicPath: '/',
        quiet: true, //
        proxy: {
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            [process.env.VUE_APP_BASE_API]: {
                target: 'http://120.55.166.112',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {
                  ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        watchOptions: {
            poll: false
        }
    },
};
