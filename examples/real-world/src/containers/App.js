import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { navigate, updateRouterState, resetErrorMessage } from '../actions'
import Explore from '../components/Explore'

class App extends Component {
  static propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    inputValue: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
    updateRouterState: PropTypes.func.isRequired,
    resetErrorMessage: PropTypes.func.isRequired,
    // Injected by React Router
    children: PropTypes.node
  }

  componentWillMount () {
    this.props.updateRouterState({
      pathname: this.props.location.pathname,
      params: this.props.params
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.updateRouterState({
        pathname: nextProps.location.pathname,
        params: nextProps.params
      })
    }
  }

  renderErrorMessage () {
    const { errorMessage, resetErrorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href='#'
          onClick={(e) => {
            resetErrorMessage()
            e.preventDefault()
            return false
          }}>
          Dismiss
        </a>)
      </p>
    )
  }

  render () {
    const { children, inputValue, navigate } = this.props
    return (
      <div>
        <Explore value={inputValue}
          onChange={(nextValue) => (navigate(`/${nextValue}`))} />
        <hr />
        {this.renderErrorMessage()}
        {children}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  errorMessage: state.errorMessage,
  inputValue: state.router.pathname.substring(1)
})

export default connect(mapStateToProps, {
  navigate,
  updateRouterState,
  resetErrorMessage
})(App)
