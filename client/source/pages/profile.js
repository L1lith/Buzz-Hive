import Authorized from 'Components/authorized'
import {Link} from 'react-router-dom'

class Profile extends React.Component {
  render() {
    return (
      <Authorized>
        <p>Welcome {this.props.store.auth.name}</p>
        <button className="logout"><Link to="/logout">Logout</Link></button>
      </Authorized>
    )
  }
}

export default {path: '/profile', component: Profile, connect: {auth: true}}
