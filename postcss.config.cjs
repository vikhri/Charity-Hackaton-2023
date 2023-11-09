module.exports = (ctx) => ({
  parser: ctx.parser ? 'sugarss' : false,
  map: ctx.env === 'development' ? ctx.map : false,
  plugins: {
    'postcss-nested': {},
    'autoprefixer': {},
    'postcss-mixins': {},
    'postcss-preset-env': {},
  },
})