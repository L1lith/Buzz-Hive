import {connect} from 'jabr-react'
import autoBind from 'auto-bind'
import {Link, withRouter} from 'react-router-dom'

class Header extends React.Component {
  constructor(props) {
    super(props)
    autoBind(this)
  }
  render() {
    return (
      <header className="main">
        <h1 className="site-title"><Link to="/">Buzz Hive</Link></h1>
        <Link to="/devices">Devices</Link>
        <Link to="/docs">API</Link>
        <div className="right">{this.renderAuth()}</div>
      </header>
    )
  }
  renderAuth() {
    if (this.props.location.pathname === '/login') return <button><Link to="/signup">Signup</Link></button>
    const {loggedIn, name} = this.props.store.auth
    if (loggedIn === null) {
      return null
    } else if (loggedIn === true) {
      return <button className="logout"><Link to="/logout">Logout {name}</Link></button>
    } else if (loggedIn === false) {
      return <button><Link to="/login">Login</Link></button>
    } else {
      return null
    }
  }
}

export default withRouter(connect(<Header/>, {auth: true}))
