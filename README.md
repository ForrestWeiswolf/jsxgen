# mkjsx

React components can have quite a bit of boilerplate, and exactly what it is depends on what component you're making - stateful, functional, redux-connected...
mkjsx is a React component generator - a command line tool to create all that boilerplate for you. Designed to have flexile options but sensible defaults, it can be as simple to use as `mkjsx Foo`:

```javascript
import React from 'react'
import PropTypes from 'prop-types'

const Foo = props => {
  return (
    <div>
    </div>
  )
}

Foo.propTypes = {
}

export default Foo
```

But can handle situations as particular as `mkjsx Bar -s --methods componentDidUpdate handleClick`:

```javascript
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Foo extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleClick() {}

  render(){
    return (
      <div></div>
    )
  }
}

Foo.propTypes = {
}

export default Foo
```

# Installation:
`npm i -g mkjsx`

(Alternatively, you can run it with npx if your version of node supports that.)

# Usage:
`mkjsx <ComponentNames> [options]`

Options:

| name        | description           | type  |
| ------------- |:-------------:| -----:|
| `--help` | Show help | [boolean] |
| `--version` | Show version number | [boolean] |
| `--stateful`, `-s` | Make stateful components | [boolean] |
| `--propTypes`, `-p` | Import PropTypes | [boolean] [default: true] |
| `--methods`, `-m` | Define and bind methods for stateful (-s) components | [array]
