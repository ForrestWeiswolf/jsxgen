const fs = require('fs')
const yargs = require('yargs')
  .usage('Usage: $0 <ComponentNames> [options]')
  .demandCommand(1)
  .boolean('stateful')
  .alias('stateful', 's')
  .describe('s', 'Make a stateful component')
  .boolean('propTypes')
  .alias('propTypes', 'p')
  .default('p', true)
  .describe('p', 'Import PropTypes')
  .array('methods')
  .alias('methods', 'm')
  .describe('m', 'Define and bind methods for a stateful (-s) component')
  .array('redux')
  .alias('redux', 'react-redux')
  .alias('redux', 'r')
  .describe('r', 'Import react-redux and create mapState and mapDispatch functions')

const createComponent = require('./createComponent')

const argv = yargs.argv

function createFile(path, text) {
  fs.writeFile(`${namepath}.jsx`, text, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log(`Created ${path}.jsx`)
    }
  })
}

argv['_'].forEach(namepath => {
  const namepathArr = namepath.split('/')
  const componentName = namepathArr[namepathArr.length - 1]

  const componentText = createComponent(
    componentName,
    argv
  )

  fs.access(`${namepath}.jsx`, fs.constants.F_OK, (err) => {
    if (err) {
      // if file doesn't exist
      createFile(namepath, componentText)
    } else {
      // if file does exist
      console.log(`${namepath}.jsx already exists.`)
    }
  })
})