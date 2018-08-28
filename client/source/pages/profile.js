import Authorized from 'Components/authorized'
import {Link} from 'react-router-dom'

class Profile extends React.Component {
  render() {
    return (
      <Authorized>
        <div className="info profile">
          <p className="name">Welcome {this.props.store.auth.name}</p>
        </div>
      </Authorized>
    )
  }
}

export default {path: '/profile', exact: true, component: Profile, connect: {auth: true}}
