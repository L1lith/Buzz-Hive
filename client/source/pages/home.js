class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="info intro">
          <h3 className="title">What is Buzz Hive?</h3>
          <p className="description">Buzz Hive allows you to register devices to your account, and then send push notifications to them with no configuration using the browsers native API.</p>
        </div>
      </div>
    )
  }
}

export default {exact: true, path: '/', component: Home}
