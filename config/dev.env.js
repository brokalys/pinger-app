'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  GMAPS_KEY: '"AIzaSyDR3WZeo7IIIIPPb114g-kyl3zgdGotsL0"',
})
