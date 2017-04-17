import PropTypes from 'prop-types'
import React, { Component } from 'react'

const GITHUB_REPO = 'https://github.com/redux-saga/redux-saga'

class Explore extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    // inputElement is an instance variable used to hold the DOM node
    // for the input field. It is used by the keyup and onChange callbacks.
    // See https://facebook.github.io/react/docs/refs-and-the-dom.html for
    // details about the new model of storing refs, and deprication of
    // string refs
    this.inputElement = null
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      // Generally mutating DOM is a bad idea in React components,
      // but doing this for a single uncontrolled field is less fuss
      // than making it controlled and maintaining a state for it.
      this.inputElement.value = nextProps.value
    }
  }

  render () {
    const {value, onChange} = this.props
    return (
      <div>
        <p>Type a username or repo full name and hit 'Go':</p>
        <input size='45'
          ref={(input) => {this.inputElement = input}}
          defaultValue={value}
          onKeyUp={(e) => (13 === e.keyCode ? onChange(this.inputElement.value) : true)} />
        <button onClick={() => onChange(this.inputElement.value)}>
          Go!
        </button>
        <p>
          Code on <a href={GITHUB_REPO} target='_blank'>Github</a>.
        </p>
        <p>
          Move the DevTools with Ctrl+W or hide them with Ctrl+H.
        </p>
      </div>
    )
  }
}

export default Explore
