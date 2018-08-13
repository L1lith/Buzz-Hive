import {connect} from 'jabr-react'
import autoBind from 'auto-bind'

class Header extends React.Component {
  constructor(props) {
    super(props)
    autoBind(this)
  }
  render() {
    return (
      <header className="main">
        <h1 className="site-title">Buzz Hive</h1>
        <div className="auth">{this.renderAuth()}</div>
      </header>
    )
  }
  renderAuth() {
    const {loggedIn, username} = this.props.store.auth
    if (loggedIn === null) {
      return null
    } else if (loggedIn === true) {
      return <p>Welcome {username}</p>
    } else if (loggedIn === false) {
      return <p>Login</p>
    } else {
      return null
    }
  }
}

export default connect(<Header/>, {auth: true})
