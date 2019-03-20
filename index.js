#!/usr/bin/env node

const fs = require('fs')
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

function createFile(path, text, next, flag = 'wx') {
  fs.writeFile(`${path}.jsx`, text, {
    flag: 'wx'
  }, (err) => {
    if (err && err.code === 'EEXIST') {
      if (readlineSync.keyInYN(`${path}.jsx already exists! Overwrite?\n`)) {
        fs.writeFileSync(`${path}.jsx`, text, {
          flag: 'w'
        })
        console.log(`Overwrote ${path}.jsx`)
        next()
      } else {
        console.log("Skipping...")
        next()
      }
    } else if (err) {
      console.log(err)
    } else {
      console.log(`Created ${path}.jsx`)
      next()
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
}, process.exit)