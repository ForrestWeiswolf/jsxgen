function createImports() {
  return (
    `import React from 'react'\n` +
    `import PropTypes from 'prop-types'\n\n`
  )
}

function createComponent(name) {
  return (
    `class ${name} extends Component {\n` +
    `  constructor(props) {\n` +
    `    super(props)\n` +
    `    this.state = {}\n` +
    ` }\n\n` +
    ` render(){\n` +
    `   return (\n` +
    `     <div></div>\n` +
    `   )\n` +
    ` }\n` +
    `}\n\n`
  )
}

function createPropTypes(name) {
  return (
    `${name}.propTypes = {\n` +
    `}\n\n`
  )
}

function creatExport(name) {
  return `export default ${name}\n\n`
}


const testName = 'foo'
console.log(createImports() + createComponent(testName) + createPropTypes(testName) + creatExport(testName))