import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadRepoPage, loadMoreStargazers } from '../actions'
import Repo from '../components/Repo'
import User from '../components/User'
import List from '../components/List'

class RepoPage extends Component {
  static propTypes = {
    repo: PropTypes.object,
    fullName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.object,
    stargazers: PropTypes.array.isRequired,
    stargazersPagination: PropTypes.object,
    loadRepoPage: PropTypes.func.isRequired,
    loadMoreStargazers: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.loadRepoPage(this.props.fullName)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.fullName !== this.props.fullName) {
      this.props.loadRepoPage(nextProps.fullName)
    }
  }

  render () {
    const { repo, owner, name, fullName, loadMoreStargazers } = this.props
    if (!repo || !owner) {
      return <h1><i>Loading {name} details...</i></h1>
    }

    const { stargazers, stargazersPagination } = this.props
    return (
      <div>
        <Repo repo={repo}
          owner={owner} />
        <hr />
        <List renderItem={(user) => (<User user={user} key={user.login} />)}
          items={stargazers}
          onLoadMoreClick={() => (loadMoreStargazers(fullName))}
          loadingLabel={`Loading stargazers of ${name}...`}
          {...stargazersPagination} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let { login, name } = state.router.params
  const {
    pagination: { stargazersByRepo },
    entities: { users, repos }
  } = state
  // We need to lower case the login/name due to the way GitHub's API behaves.
  // Have a look at ../services/api.js for more details.
  login = login.toLowerCase()
  name = name.toLowerCase()

  const fullName = `${login}/${name}`
  const stargazersPagination = stargazersByRepo[fullName] || { ids: [] }
  const stargazers = stargazersPagination.ids.map(id => users[id])

  return {
    fullName,
    name,
    stargazers,
    stargazersPagination,
    repo: repos[fullName],
    owner: users[login]
  }
}

export default connect(mapStateToProps, {
  loadRepoPage,
  loadMoreStargazers
})(RepoPage)
