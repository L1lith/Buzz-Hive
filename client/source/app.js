import Header from 'Components/header'
import pages from './pages'
import {Switch} from 'react-router-dom'

console.log(pages, typeof pages)

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header/>
        <main className="page">
          <Switch>
            {pages}
          </Switch>
        </main>
      </div>
    )
  }
}

export default App
