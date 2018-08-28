import autoBind from 'auto-bind'
import {Redirect} from 'react-router-dom'
import {Form} from 'sandforms-react'

const mapResponseTexts = {
  "Bad Request": "Malformed Request"
}

class Signup extends React.Component {
  constructor(props) {
    super(props)
    autoBind(this)
    this.state = {successful: null, error: null}
  }
  async submit({username, password, email}) {
    username = username.toLowerCase()
    let response
    try {
      response = await fetch('/auth/signup', {body: {username, password, email}, method: 'post'})
    } catch (error) {
      return this.setState({error: "Network Error"})
    }
    if (Math.floor(response.status / 100) === 2) {
      const {auth} = this.props.store
      this.props.store.auth = {loggedIn: true, name: (await response.json()).name}
      this.setState({successful: true})
    } else {
      this.setState({error: mapResponseTexts.hasOwnProperty(response.statusText) ? mapResponseTexts[response.statusText] : response.statusText || null})
    }
  }
  render() {
    if (this.state.successful === true ) return <Redirect to="/"/>
    return (
      <Form className="signup" onSubmit={this.submit} onError={error => this.setState({error})}>
        {this.state.error ? (
          <span className="error">{this.state.error}</span>
        ) : null}
        <label htmlFor="username">Username</label>
        <input autoComplete="username" id="username" name="username"/>
        <label htmlFor="password">Password</label>
        <input autoComplete="new-password" id="password" name="password" type="password"/>
        <label htmlFor="email">Email</label>
        <input autoComplete="email" id="email" name="email" email/>
        <input type="submit"/>
      </Form>
    )
  }
}

export default {path: '/signup', exact: true, component: Signup, connect: {auth: true}}
