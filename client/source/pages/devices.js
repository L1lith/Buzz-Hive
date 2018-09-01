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
    if (this.props.store.device !== null || this.state.devices === null) return
    const device = await setupPushNotifications(await registerServiceWorker())
    console.log(device)
    this.setState({devices: this.state.devices.concat([{id: device.id, name: device.name}])})
  }
  render() {
    const {devices} = this.state
    const {device} = this.props.store
    return (
      <Authorized>
        {devices === null ? (
          <p>Loading Devices...</p>
        ) : (
          <div className="devices">
              {devices.length > 0 ?
                (<ul className="list"><h2 className="title">Devices</h2>{devices.map(({name, id}, index) => (
                <li key={index} className="device">
                  <h3 className="name">{name}{device !== null && name === device.name ? " (This Device)" : null}</h3>
                  <span className="id">ID: {id}</span>
                </li>
              ))}</ul>) : (
                <p>No Devices Found.</p>
              )}
            {device === null ? <button onClick={this.registerThisDevice}>Register This Device</button> : null}
          </div>
        )}
      </Authorized>
    )
  }
}

export default {path: '/devices', component: Devices, exact: true, connect: {auth: true, device: true}}
