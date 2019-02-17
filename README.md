# mkjsx

mkjsx is a React component generator.
Usage:
`mkjsx <ComponentNames> [options]`

Options:
| name        | description           | type  |
| ------------- |:-------------:| -----:|
| `--help` | Show help | [boolean] |
| `--version` | Show version number | [boolean] |
| `--stateful`, `-s` | Make a stateful component | [boolean] |
| `--propTypes`, `-p` | Import PropTypes | [boolean] [default: true] |
| `--methods`, `-m` | Define and bind methods for a stateful (-s) component | [array]