const fs = require('fs')
const yargs = require('yargs')
  .usage('Usage: jsxgen ComponentName')
  .demandCommand(1)
const createComponent = require('./createComponent')

const argv = require('yargs').argv
const componentName = argv['_'][0]

fs.writeFile(`${componentName}.jsx`, createComponent(componentName), function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log(`Created ${componentName}.jsx`)
  }
})
