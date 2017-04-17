import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router'

class User extends Component {
  static propTypes = {
    user: PropTypes.shape({
      login: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
      name: PropTypes.string
    }).isRequired
  }

  render () {
    const { login, avatarUrl, name } = this.props.user

    return (
      <div className='User'>
        <Link to={`/${login}`}>
          <img src={avatarUrl} width='72' height='72' alt={name}/>
          <h3>
            {login} {name && <span>({name})</span>}
          </h3>
        </Link>
      </div>
    )
  }
}

export default User
