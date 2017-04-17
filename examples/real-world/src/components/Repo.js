import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router'

class Repo extends Component {
  static propTypes = {
    repo: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }).isRequired,
    owner: PropTypes.shape({
      login: PropTypes.string.isRequired
    }).isRequired
  }

  render () {
    const { repo, owner } = this.props
    const { login } = owner
    const { name, description } = repo

    return (
      <div className='Repo'>
        <h3>
          <Link to={`/${login}/${name}`}>
            {name}
          </Link>
          {' by '}
          <Link to={`/${login}`}>
            {login}
          </Link>
        </h3>
        {description &&
          <p>{description}</p>
        }
      </div>
    )
  }
}

export default Repo
