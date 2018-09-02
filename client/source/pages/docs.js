class Docs extends React.Component {
  render() {
    return (
      <div className="docs">
        <div className="section authentication info-row">
          <h2 className="title">Authenticating</h2>
          <p>In order to become authenticated you must make a GET request to the /auth/login endpoint using <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication">Basic Authentication</a>. It will set your session and username cookies. You must ensure that whatever library/environment you are using (if you are using the browser this is done automatically) to make the request is saving and setting these cookies on future requests in order to be authenticated.</p>
        </div>
        <div className="section notifications info-row">
          <h2 className="title">Sending Notifications</h2>
          <p>You can send notifications by making an authenticated POST request to the /devices/notification endpoint. The Content-Type header must be set to "application/json" and the body must conform to this format:</p>
          <code className="format">{
`{
  "message": String,
  "title": String (optional)
}`}</code>
          <p>Device IDs can be used to specify which devices to send the notification to. If no device ID is supplied then the notification will be sent to all devices. To specify which device IDs to send the notification to supply them as a comma separated list in the devices query parameter. For example:</p>
          <code className="url">POST /devices/notification?devices=5b8c3aa089c3a88e52477375,5b8c4f819247fd8f505a8436</code>
        </div>
      </div>
    )
  }
}

export default {path: '/docs', exact: true, component: Docs}
