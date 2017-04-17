import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    routes: PropTypes.node.isRequired
  }

  render () {
    const { store, history, routes } = this.props

    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    )
  }
}
