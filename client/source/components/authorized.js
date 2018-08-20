import {connect} from 'jabr-react'
import {Redirect} from 'react-router-dom'

const defaultOptions = {
  redirect: true
}

class Authorized extends React.Component {
  constructor(props) {
    super(props)
    this.options = Object.assign({}, defaultOptions, this.props)
  }
  render() {
    const {loggedIn} = this.props.store.auth
    if (loggedIn === true) {
      return this.props.children
    } else if (loggedIn === false) {
      if (this.options.redirect === true) {
        return <Redirect to={this.options.directTo || "/login"}/>
      } else {
        return this.options.unauthorized || <p>Unauthorized</p>
      }
    } else {
      return <span className="authorized waiting">Logging In...</span>
    }
  }
}

export default connect(<Authorized/>, {auth: true})
