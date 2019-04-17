#!/usr/bin/env node

const createFile = require('./createFile')
const createComponent = require('./createComponent')
const yargs = require('yargs')
  .usage('Usage: $0 <ComponentNames> [options]')
  .demandCommand(1)
  .boolean('stateful')
  .alias('stateful', 's')
  .describe('s', 'Make stateful class components (If neither `--stateful` nor `--methods` are used, mkjsx will create functional components)')
  .boolean('propTypes')
  .alias('propTypes', 'p')
  .default('p', true)
  .describe('p', 'Import PropTypes')
  // props?
  .array('methods')
  .alias('methods', 'm')
  .describe('m', 'Define and bind methods for class components (If neither `--stateful` nor `--methods` are used, mkjsx will create functional components)')
  .array('redux')
  .alias('redux', 'react-redux')
  .alias('redux', 'r')
  .describe('r', 'Import react-redux and create mapState and mapDispatch functions')
  .boolean('jsx')
  .alias('jsx', 'x')
  .default('x', true)
  .describe('x', 'Make a .jsx (rather than .js) file')

const argv = yargs.argv

function recurseThrough(arr, callback, end, index) {
  index = index || 0
  if (index < arr.length) {
    callback(arr[index], () => recurseThrough(arr, callback, end, 1 + index))
  } else {
    end()
  }
}

const namepaths = argv['_']

recurseThrough(namepaths, (namepath, next) => {
  const namepathArr = namepath.split('/')
  const componentName = namepathArr[namepathArr.length - 1]

  const filename = `${namepath}.${argv['jsx'] ? 'jsx' : 'js'}`

  const componentText = createComponent(
    componentName,
    argv
  )

  createFile(filename, componentText, next)
    .then(next)
}, process.exit)