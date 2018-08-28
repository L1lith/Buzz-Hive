import Authorized from 'Components/authorized'
import {Link} from 'react-router-dom'

class Profile extends React.Component {
  render() {
    return (
      <Authorized>
        <div className="info profile">
          <p className="name">Welcome {this.props.store.auth.name}</p>
          <button className="logout"><Link to="/logout">Logout</Link></button>
        </div>
      </Authorized>
    )
  }
}

export default {path: '/profile', exact: true, component: Profile, connect: {auth: true}}
