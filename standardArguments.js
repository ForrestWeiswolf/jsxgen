module.exports = {
  componentDidUpdate: 'prevProps, prevState, snapshot',
  shouldComponentUpdate: 'nextProps, nextState',
  'static getDerivedStateFromProps': 'props, state',
  getSnapshotBeforeUpdate: 'prevProps, prevState',
  'static getDerivedStateFromError': 'error',
  componentDidCatch: 'error, info',
  UNSAFE_componentWillReceiveProps: 'nextProps',
  componentWillReceiveProps: 'nextProps',
  UNSAFE_componentWillUpdate: 'nextProps, nextState',
  componentWillUpdate: 'nextProps, nextState',
  componentDidMount: '',
  componentWillUnmount: '',
  UNSAFE_componentWillMount: '',
  componentWillMount: ''
}