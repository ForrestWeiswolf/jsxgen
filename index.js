const fs = require('fs')
const yargs = require('yargs')
  .usage('Usage: $0 <ComponentName> [options]')
  .demandCommand(1)
  .boolean('stateful')
  .alias('stateful', 's')
  .describe('s', 'Make a stateful component')
  .boolean('propTypes')
  .alias('propTypes', 'p')
  .default('p', true)
  .describe('p', 'Import PropTypes')

const createComponent = require('./createComponent')

const argv = require('yargs').argv

argv['_'].forEach(componentName => {
  const componentText = createComponent(componentName, argv['stateful'], argv['propTypes'])

  fs.writeFile(`${componentName}.jsx`, componentText, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log(`Created ${componentName}.jsx`)
    }
  })
})