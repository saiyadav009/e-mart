import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(error) { return { error } }
  componentDidCatch(error, info) { console.error('Render error:', error, info) }
  render() {
    if (this.state.error) {
      return <div style={{padding:20}}>App crashed: {String(this.state.error)}</div>
    }
    return this.props.children
  }
}