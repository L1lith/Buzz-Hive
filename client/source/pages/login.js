import autoBind from 'auto-bind'
import {Redirect} from 'react-router-dom'
import {Form, Input} from 'sandforms-react'

const mapResponseTexts = {
  "Unauthorized": "Incorrect Username or Password",
  "Bad Request": "Malformed Request"
}

class Login extends React.Component {
  constructor(props) {
    super(props)
    autoBind(this)
    this.state = {successful: null, error: null}
  }
  async submit({username, password}) {
    username = username.toLowerCase()
    let response
    try {
      response = await fetch('/auth/login', {headers: {Authorization: "Basic "+btoa(`${username}:${password}`)}})
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
      <Form className="login" onSubmit={this.submit} onError={error => this.setState({error})}>
        {this.state.error ? (
          <span className="error">{this.state.error}</span>
        ) : null}
        <Input name="username" placeholder="username" customFormat="username"/>
        <Input name="password" placeholder="password" type="password"/>
        <Input type="submit" value="Login"/>
      </Form>
    )
  }
}

export default {path: '/login', exact: true, component: Login, connect: {auth: true}}
