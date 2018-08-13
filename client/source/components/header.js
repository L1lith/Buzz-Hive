import {connect} from 'jabr-react'

class Header extends React.Component {
  render() {
    const {loggedIn, username} = this.props.store.auth
    if (loggedIn === true) {
      return <p>Welcome {username}</p>
    } else if (loggedIn === false){
      return <p>Please Login</p>
    } else {
      return null
    }
  }
}

export default connect(<Header/>, {auth: true})
