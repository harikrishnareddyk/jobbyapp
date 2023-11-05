import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: ''}

  username = event => {
    this.setState({username: event.target.value})
  }

  password = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitdetails = async event => {
    event.preventDefault()
    const {username, password, showSubmitError} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, showSubmitError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <form onSubmit={this.submitdetails}>
          <label htmlFor="USERNAME">USERNAME</label>
          <input
            id="USERNAME"
            value={username}
            onChange={this.username}
            placeholder="Username"
            type="text"
          />
          <label htmlFor="PASSWORD">PASSWORD</label>
          <input
            value={password}
            id="PASSWORD"
            type="password"
            onChange={this.password}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
        {showSubmitError ? <p>{errorMsg}</p> : null}
      </div>
    )
  }
}

export default Login
