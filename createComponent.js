function createComponent(name, options) {
  const imports = (
    `import React${options.stateful ? ', { Component }' : ''} from 'react'\n` +
    (options.propTypes ? `import PropTypes from 'prop-types'\n\n` : '\n')
  )

  let component
  if (options.stateful) {
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

  return imports + component + (options.propTypes ? propTypes : '') + exportComponent
}

module.exports = createComponent