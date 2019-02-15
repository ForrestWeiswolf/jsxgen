function createComponent(name, isStateful) {
  const imports = (
    `import React${isStateful ? ', { Component }' : ''} from 'react'\n` +
    `import PropTypes from 'prop-types'\n\n`
  )

  let component
  if (isStateful) {
    component = (
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
  } else {
    component = (
      `const ${name} = props => {\n` +
      `  return (\n` +
      `    <div>\n` +
      `    </div>\n` +
      `  )\n` +
      `}\n\n`
    )
  }

  const propTypes = (
    `${name}.propTypes = {\n` +
    `}\n\n`
  )

  const exportComponent = `export default ${name}`

  return imports + component + propTypes + exportComponent
}

module.exports = createComponent