import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import zip from 'lodash.zip'
import { loadUserPage, loadMoreStarred } from '../actions'
import User from '../components/User'
import Repo from '../components/Repo'
import List from '../components/List'

class UserPage extends Component {
  static propTypes = {
    login: PropTypes.string.isRequired,
    user: PropTypes.object,
    starredPagination: PropTypes.object,
    starredRepos: PropTypes.array.isRequired,
    starredRepoOwners: PropTypes.array.isRequired,
    loadUserPage: PropTypes.func.isRequired,
    loadMoreStarred: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.loadUserPage(this.props.login)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.login !== nextProps.login) {
      this.props.loadUserPage(nextProps.login)
    }
  }

  render () {
    const { user, login, loadMoreStarred } = this.props

    if (!user) {
      return <h1><i>{`Loading ${login}’s profile...`}</i></h1>
    }

    const { starredRepos, starredRepoOwners, starredPagination } = this.props
    return (
      <div>
        <User user={user} />
        <hr />
        <List renderItem={([repo, owner]) =>
            (<Repo repo={repo} owner={owner} key={repo.fullName} />)}
          items={zip(starredRepos, starredRepoOwners)}
          onLoadMoreClick={() => (loadMoreStarred(login))}
          loadingLabel={`Loading ${login}’s starred...`}
          {...starredPagination} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // We need to lower case the login due to the way GitHub's API behaves.
  // Have a look at ../services/api.js for more details.
  const login = state.router.params.login.toLowerCase()
  const {
    pagination: { starredByUser },
    entities: { users, repos }
  } = state

  const starredPagination = starredByUser[login] || { ids: [] }
  const starredRepos = starredPagination.ids.map(id => repos[id])
  const starredRepoOwners = starredRepos.map(repo => users[repo.owner])

  return {
    login,
    starredRepos,
    starredRepoOwners,
    starredPagination,
    user: users[login]
  }
}

export default connect(mapStateToProps, {
  loadUserPage,
  loadMoreStarred
})(UserPage)
