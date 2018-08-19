import {Form, Input, Submit} from 'react-smart-form'
import autoBind from 'auto-bind'

class Login extends React.Component {
  constructor(props) {
    super(props)
    autoBind(this)
  }
  async submit({username, password}) {
    const response = await fetch('/auth/login', {headers: {Authorization: "Basic "+btoa(`${username}:${password}`)}})
    if (Math.floor(response.status / 100) === 2) {
      const {auth} = this.props.store
      auth.name = (await response.json()).name
      auth.loggedIn = true
      console.log(auth)
    } else {
      throw response.statusText || "Error"
    }
  }
  render() {
    return (
      <Form onSubmit={this.submit}>
        <Input name="username" label="Username" />
        <Input name="password" label="Password" />
      <Submit>
          Login
      </Submit>
    </Form>
    )
  }
}

export default {path: '/login', component: Login, connect: {auth: true}}
