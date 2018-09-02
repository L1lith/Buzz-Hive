import Authorized from 'Components/authorized'
import autoBind from 'auto-bind'
import registerServiceWorker from 'Functions/registerServiceWorker'
import setupPushNotifications from 'Functions/pushNotifications/setup'
import loadDevice from 'Functions/loadDevice'

class Devices extends React.Component {
  constructor(props) {
    super(props)
    this.state = {devices: null, deviceLoaded: false}
    autoBind(this)
  }
  componentDidMount() {
    if (this.props.store.auth.loggedIn === true) {
      this.fetchDevices()
    }
    loadDevice().then(()=>{
      this.setState({deviceLoaded: true})
    })
  }
  async fetchDevices(setState = true) {
    const devices = await (await fetch('/devices/all', {statusRange: 200, standardAuth: true})).json()
    const {device} = this.props.store
    if (device !== null) {
      let index = null
      for (let i = 0; i < devices.length; i++) {
        const checkDevice = devices[i]
        if (checkDevice.id === device.id) {
          index = i
          break
        }
      }
      if (index !== null) {
        devices.splice(index, 1)
        devices.unshift(device)
      }
    }
    if (setState === true) this.setState({devices})
    return devices
  }
  async registerThisDevice() {
    if (this.props.store.device !== null || this.state.devices === null) return
    const device = await setupPushNotifications(await registerServiceWorker())
    this.setState({devices: [{id: device.id, name: device.name}, ...this.state.devices]})
  }
  render() {
    const {devices} = this.state
    const {device} = this.props.store
    return (
      <Authorized>
        {devices === null || this.state.deviceLoaded !== true ? (
          <p>Loading Devices...</p>
        ) : (
          <div className="devices">
              {devices.length > 0 ?
                (<ul className="list"><h2 className="title">Devices</h2>{devices.map(({name, id}, index) => (
                <li key={index} className="device">
                  <h3 className="name"><button className="edit">✎</button>{name}{device !== null && name === device.name ? " (This Device)" : null}</h3>
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
