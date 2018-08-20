import Header from 'Components/header'
import pages from './pages'
import {Switch, withRouter} from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header/>
        <main className="page" path={this.props.location.pathname}>
          <Switch>
            {pages}
          </Switch>
        </main>
      </div>
    )
  }
}

export default withRouter(App)
