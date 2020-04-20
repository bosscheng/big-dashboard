/*
* date: 2019-06-08
* desc:
*/
const path = require('path');
module.exports = {
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
            '~': path.join(__dirname, 'src'),
        }
    },
};
