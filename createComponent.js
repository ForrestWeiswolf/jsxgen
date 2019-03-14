const standardArguments = require('./standardArguments')

function createComponent(name, options) {
  const isClass = options.stateful || (options.methods && options.methods.length > 0)

  const imports = (
    `import React${isClass ? ', { Component }' : ''} from 'react'\n` +
    (options.redux ? `import { connect } from 'react-redux'\n` : '') +
    (options.propTypes ? `import PropTypes from 'prop-types'\n\n` : '\n')
  )

  let component
  if (isClass) {
    let binds = ''
    let methods = ''

    if (options.methods) {
      options.methods.forEach(methodName => {
        if (standardArguments[methodName] === undefined) {
          binds += `    this.${methodName} = this.${methodName}.bind(this)\n`
        }
        methods += `  ${methodName}(${standardArguments[methodName] || ''}) {}\n\n`
      })
    }

    const constructor =
      `  constructor(props) {\n` +
      `    super(props)\n` +
      // initialize state if stateful
      (options.stateful ? `    this.state = {}\n` : '') +
      binds +
      `  }\n\n`

    component = (
      `class ${name} extends Component {\n` +
      // if it's stateful or we need to bind methods, make a constructor
      (options.stateful || binds !== '' ? constructor : '') +
      methods +
      `  render(){\n` +
      `    return (\n` +
      `      <div></div>\n` +
      `    )\n` +
      `  }\n` +
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

  const mapFunctions = (
    `const mapState = (state) => {\n` +
    `  return {}\n` +
    `}\n\n` +
    `const mapDispatch = (dispatch) => {\n` +
    `  return {}\n` +
    `}\n\n`
  )

  const exportComponent = options.redux ?
    `export default connect(mapState, mapDispatch)(${name})` :
    `export default ${name}`

  return (
    imports +
    component +
    (options.propTypes ? propTypes : '') +
    (options.redux ? mapFunctions : '') +
    exportComponent
  )
}

module.exports = createComponent