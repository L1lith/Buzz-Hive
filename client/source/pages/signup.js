import autoBind from 'auto-bind'
import {Redirect} from 'react-router-dom'
import {Form, Input} from 'sandforms-react'

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
        <Input autoComplete="username" placeholder="username" name="username"/>
        <Input autoComplete="new-password" placeholder="password" name="password" type="password"/>
        <Input autoComplete="email" placeholder="email" name="email" email/>
        <Input type="submit" value="Signup"/>
      </Form>
    )
  }
}

export default {path: '/signup', exact: true, component: Signup, connect: {auth: true}}
