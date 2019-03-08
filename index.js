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

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

function confirmYN(message, yesCallback, noCallback) {
  rl.question(message, (answer) => {
    if (answer[0] && answer[0].toLowerCase() === 'y') {
      console.log('close')
      rl.close()
      yesCallback()
    } else {
      console.log('close')
      rl.close()
      noCallback()
    }
  });
}

function createFile(path, text, next, flag = 'wx') {
  console.log(path)
  try {
    fs.writeFileSync(`${path}.jsx`, text, {
      flag: 'wx'
    })
  } catch (err) {
    if (err && err.code === 'EEXIST') {
      confirmYN(
        `${path}.jsx already exists! Overwrite?\n`,
        () => {
          // createFile(path, text, next, 'w')
          next()
        },
        () => {
          console.log("Skipping...")
          next()
        }
      )
    } else if (err) {
      console.log(err)
    } else {
      console.log(`Created ${path}.jsx`)
      next()
    }
  }
}

console.log(argv['_'])
// argv['_'].forEach(namepath => {
//   const namepathArr = namepath.split('/')
//   const componentName = namepathArr[namepathArr.length - 1]

//   const componentText = createComponent(
//     componentName,
//     argv
//   )

//   console.log(namepath)
//   createFile(namepath, componentText)
// })

function recurseThrough(arr, callback, index = 0) {
  callback(arr[index], () => recurseThrough(arr, callback, index + 1))
}

recurseThrough(argv['_'], (namepath, next) => {
  const namepathArr = namepath.split('/')
  const componentName = namepathArr[namepathArr.length - 1]

  const componentText = createComponent(
    componentName,
    argv
  )

  console.log(namepath)
  createFile(namepath, componentText, next)
})