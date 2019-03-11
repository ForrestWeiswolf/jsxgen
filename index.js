#!/usr/bin/env node

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
const readlineSync = require('readline-sync');

function createFile(path, text, next, flag = 'wx') {
  try {
    fs.writeFileSync(`${path}.jsx`, text, {
      flag: 'wx'
    })

    console.log(`Created ${path}.jsx`)
    next()
  } catch (err) {
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
    } else {
      console.log(err)
    }
  }
}

function recurseThrough(arr, callback, end, index) {
  index = index || 0
  if (index < arr.length) {
    callback(arr[index], () => recurseThrough(arr, callback, end, 1 + index))
  } else {
    end()
  }
}

recurseThrough(argv['_'], (namepath, next) => {
  const namepathArr = namepath.split('/')
  const componentName = namepathArr[namepathArr.length - 1]

  const componentText = createComponent(
    componentName,
    argv
  )

  createFile(namepath, componentText, next)
}, process.exit)