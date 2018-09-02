import Authorized from 'Components/authorized'
import autoBind from 'auto-bind'
import registerServiceWorker from 'Functions/registerServiceWorker'
import setupPushNotifications from 'Functions/pushNotifications/setup'
import loadDevice from 'Functions/loadDevice'
import unregisterDevice from 'Functions/pushNotifications/unregisterDevice'
import store from 'Store'

loadDevice()

class Devices extends React.Component {
  constructor(props) {
    super(props)
    this.state = {devices: null}
    this.fetched = false
    autoBind(this)
  }
  componentWillMount() {
    this.checkFetch()
  }
  componentWillUpdate() {
    this.checkFetch()
  }
  checkFetch() {
    if (this.fetched === false && this.props.store.auth.loggedIn === true) {
      this.fetched = true
      this.fetchDevices()
    }
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
    this.props.store.device = {id: device.id, name: device.name}
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
                (<ul className="list"><h2 className="title">Devices</h2>{devices.map(({name, id}, index) => (<Device refreshDevices={this.fetchDevices} store={this.props.store} currentDevice={device && device.name === name} key={index} name={name} id={id}/>))}</ul>) : (
                <p>No Devices Found.</p>
              )}
            {device === null && this.props.store.deviceLoaded === true ? <button onClick={this.registerThisDevice}>Register This Device</button> : null}
          </div>
        )}
      </Authorized>
    )
  }
}

class Device extends React.Component {
  constructor(props) {
    super(props)
    autoBind(this)
    this.state = {editingName: false, deleted: false, name: props.name}
  }
  render() {
    if (this.state.deleted === true) return null
    return (
      <li className="device info-row">
        {this.state.editingName !== true ? (
          <h3 className="name"><span className="icons actions"><button className="delete icon" onClick={this.delete}>✖</button><button onClick={this.editName} className="edit icon">✎</button></span>{this.state.name}{this.props.currentDevice === true ? <span className="this noselect"> (This Device)</span> : null}</h3>
        ) : (
          <input ref={ref => this.editorInput = ref} onKeyPress={this.editorKeyPress} defaultValue={this.state.name} className="editname" placeholder="name"/>
        )}
        <span className="id"><span className="noselect">ID: </span>{this.props.id}</span>
      </li>
    )
  }
  componentWillMount() {
    if (!this.state.hasOwnProperty('name')) this.setState({name: this.props.name})
  }
  async delete() {
    await unregisterDevice(this.props.id)
    if (this.props.currentDevice === true) {
      this.props.store.device = null
    }
    this.props.refreshDevices()
  }
  editName() {
    this.setState({editingName: true})
  }
  async editorKeyPress(event) {
    if (event.key === 'Enter') {
      this.editorInput.value = this.editorInput.value.trim()
      const {value} = this.editorInput
      if (value.length < 1) return
      this.setState({editingName: false, name: value})
      if (value === this.state.name) return
      const response = await fetch(`/devices/update?device=${this.props.id}`, {statusRange: 200, method: 'PUT', body: {name: value}})
      if (this.props.currentDevice === true) {
        localStorage.deviceName = value
        this.props.store.device.name = value
      }
    }
  }
}

export default {path: '/devices', component: Devices, exact: true, connect: {auth: true, device: true}}
