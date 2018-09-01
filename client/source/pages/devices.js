import Authorized from 'Components/authorized'
import autoBind from 'auto-bind'
import registerServiceWorker from 'Functions/registerServiceWorker'
import setupPushNotifications from 'Functions/setupPushNotifications'

class Devices extends React.Component {
  constructor(props) {
    super(props)
    this.state = {devices: null}
    autoBind(this)
  }
  componentDidMount() {
    if (this.props.store.auth.loggedIn === true) {
      this.fetchDevices()
    }
  }
  async fetchDevices(setState = true) {
    const devices = await (await fetch('/devices/all', {statusRange: 200, standardAuth: true})).json()
    if (setState === true) this.setState({devices})
    return devices
  }
  async registerThisDevice() {
    const worker = await registerServiceWorker()
    const pushSubscription = await setupPushNotifications(worker)
    console.log(pushSubscription, worker)
  }
  render() {
    const {devices} = this.state
    return (
      <Authorized>
        {devices === null ? (
          <p>Loading Devices...</p>
        ) : (
          <div className="devices">

              {this.state.devices.length > 0 ?
                (<ul className="list">{this.state.devices.map((device, index) => (
                <li key={index} className="device">

                </li>
              ))}</ul>) : (
                <p>No Devices Found.</p>
              )}
            <button onClick={this.registerThisDevice}>Register This Device</button>
          </div>
        )}
      </Authorized>
    )
  }
}

export default {path: '/devices', component: Devices, exact: true, connect: {auth: true}}
