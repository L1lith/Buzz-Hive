import {connect} from 'jabr-react'
import autoBind from 'auto-bind'
import {Link, withRouter} from 'react-router-dom'

const noAuthHeaderRoutes = ['/login', '/signup', '/profile']

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
    if (noAuthHeaderRoutes.includes(this.props.location.pathname)) return null
    const {loggedIn, name} = this.props.store.auth
    if (loggedIn === null) {
      return null
    } else if (loggedIn === true) {
      return <Link to="/profile">{name}</Link>
    } else if (loggedIn === false) {
      return <Link to="/login">Login</Link>
    } else {
      return null
    }
  }
}

export default withRouter(connect(<Header/>, {auth: true}))
