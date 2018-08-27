class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="info intro">
          <h3 className="title">What is Buzz Hive?</h3>
          <p className="description">Buzz Hive allows you to register devices to your account, and then send messages to our API which will send push notifications to your devices.</p>
        </div>
      </div>
    )
  }
}

export default {exact: true, path: '/', component: Home}
