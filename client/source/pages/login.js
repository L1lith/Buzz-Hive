import autoBind from 'auto-bind'
import {Redirect} from 'react-router-dom'
import {Form} from 'sandforms-react'

const mapResponseTexts = {
  "Unauthorized": "Invalid Username or Password"
}

class Login extends React.Component {
  constructor(props) {
    super(props)
    autoBind(this)
    this.state = {successful: null, error: null}
  }
  async submit({username, password}) {
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
    console.log(this.state.error)
    return (
      <Form onSubmit={this.submit} onError={error => this.setState({error})}>
        {this.state.error ? (
          <span className="error">{this.state.error}</span>
        ) : null}
        <input name="username"/>
        <input name="password" type="password"/>
        <input type="submit"/>
      </Form>
    )
  }
}

export default {path: '/login', component: Login, connect: {auth: true}}
