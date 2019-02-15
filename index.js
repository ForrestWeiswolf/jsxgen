const fs = require('fs')
const yargs = require('yargs')
  .usage('Usage: $0 <ComponentName> [options]')
  .demandCommand(1)
  .boolean('stateful')
  .alias('stateful', 's')
  .describe('s', 'Make a stateful component')

const createComponent = require('./createComponent')

const argv = require('yargs').argv

argv['_'].forEach(componentName => {
  const componentText = createComponent(componentName, argv['stateful'])

  fs.writeFile(`${componentName}.jsx`, componentText, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log(`Created ${componentName}.jsx`)
    }
  })
})