const fs = require('fs')
const util = require('util')
const readlineSync = require('readline-sync')

const writeFile = util.promisify(fs.writeFile)

/* Flag defaults to 'wx' - throws an error if the file already exists.
The callback function called next will be used to advance to the next file
(neccessary because we might need to wait for both async file creation
and for user confirmation before moving on.)
*/
function createFile(filename, text, next, flag = 'wx') {
  return writeFile(filename, text, {
      flag: 'wx'
    })
    .then(() => {
      console.log(`Created ${filename}`)
    })
    .catch((err) => {
      // if that error is thrown (the file already exists)...
      if (err.code === 'EEXIST') {
        // ask if the user wants to overwrite it (using readlineSync)
        if (readlineSync.keyInYN(`${filename} already exists! Overwrite?\n`)) {
          // if yes, we try this again, but with 'w' flag - overwrites existing files
          return writeFile(`${filename}`, text, {
            flag: 'w'
          }).then(() => {
            console.log(`Overwrote ${filename}`)
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

module.exports = createFile