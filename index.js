#!/usr/bin/env node

const fs = require('fs')
const util = require('util')
const writeFile = util.promisify(fs.writeFile)

const readlineSync = require('readline-sync')
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

const argv = yargs.argv

/* Flag defaults to 'wx' - throws an error if the file already exists.
The callback function called next will be used to advance to the next file
(neccessary because we might need to wait for both async file creation
and for user confirmation before moving on.)
*/
function createFile(path, text, next, flag = 'wx') {
  return writeFile(`${path}.jsx`, text, {
      flag: 'wx'
    })
    .then(() => {
      console.log(`Created ${path}.jsx`)
    })
    .catch((err) => {
      // if that error is thrown (the file already exists)...
      if (err.code === 'EEXIST') {
        // ask if the user wants to overwrite it (using readlineSync)
        if (readlineSync.keyInYN(`${path}.jsx already exists! Overwrite?\n`)) {
          // if yes, we try this again, but with 'w' flag - overwrites existing files
          return writeFile(`${path}.jsx`, text, {
            flag: 'w'
          }).then(() => {
            console.log(`Overwrote ${path}.jsx`)
          })
        } else {
          console.log("Skipping...")
        }
      } else {
        // other errors just get logged
        console.error(err)
      }
    })
}

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

  const componentText = createComponent(
    componentName,
    argv
  )

  createFile(namepath, componentText, next)
    .then(next)
}, process.exit)