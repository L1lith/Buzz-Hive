import {Form, Input, Submit} from 'react-smart-form'
import autoBind from 'auto-bind'
import {Redirect} from 'react-router-dom'

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
    const response = await fetch('/auth/login', {headers: {Authorization: "Basic "+btoa(`${username}:${password}`)}})
    if (Math.floor(response.status / 100) === 2) {
      const {auth} = this.props.store
      this.props.store.auth = {loggedIn: true, name: (await response.json()).name}
      this.setState({successful: true})
    } else {
      this.setState({successful: false, error: mapResponseTexts.hasOwnProperty(response.statusText) ? mapResponseTexts[response.statusText] : response.statusText || null})
    }
  }
  render() {
    if (this.state.successful === true ) return <Redirect to="/"/>
    return (
      <Form onSubmit={this.submit}>
        <Input required type="text" name="username" label="Username" />
        <Input type="password" name="password" label="Password" />
      <Submit>
          Login
      </Submit>
    </Form>
    )
  }
}

export default {path: '/login', component: Login, connect: {auth: true}}
