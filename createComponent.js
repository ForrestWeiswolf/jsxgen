function createImports() {
  return (
    `import React, { Component } from 'react'\n` +
    `import PropTypes from 'prop-types'\n\n`
  )
}

function createComponentBody(name) {
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

module.exports = function createComponent(name) {
  return createImports() +
    createComponentBody(name) +
    createPropTypes(name) +
    creatExport(name)
}
