import Authorized from 'Components/authorized'

class Logout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {successful: null, error: null}
    this.renderBody = this.renderBody.bind(this)
  }
  async componentDidMount() {
    if (this.props.store.auth.loggedIn !== true) return
    const response = await fetch('/auth/logout')
    if (Math.floor(response.status / 100) === 2) {
      this.setState({successful: true})
      this.props.store.auth = {loggedIn: false, name: null}
    } else {
      this.setState({successful: false, error: response.statusText || null})
    }
  }
  render() {
    return <Authorized directTo="/">{this.renderBody()}</Authorized>
  }
  renderBody() {
    const {successful} = this.state
    if (successful === true) {
      return <p className="successful">Logged Out!</p>
    } else if (successful === false) {
      return <p>{this.state.error || "Error"}</p>
    } else {
      return <p>Logging Out...</p>
    }
  }
}

export default {path: '/logout', exact: true, component: Logout, connect: {auth: true}}
