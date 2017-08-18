const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'iOS >= 8', 'Android >= 4']
    })
  ],
  options: {
    sourceMap: true
  }
}
