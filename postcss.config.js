const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = {
    plugins: [
        autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'iOS >= 8', 'Android >= 4']
        }),
        pxtorem({ rootValue: 100, propWhiteList: [] })
    ],
    options: {
        sourceMap: true
    }
}
