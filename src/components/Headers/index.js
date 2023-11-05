import './index.css'
import Cookies from 'js-cookie'
import {Link, Redirect, withRouter} from 'react-router-dom'

const Headers = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="headers">
      <ul className="headers">
        <Link to="/">
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </li>
        </Link>
        <Link to="/">
          {' '}
          <li>Home</li>
        </Link>
        <Link to="/jobs">
          {' '}
          <li>Jobs</li>
        </Link>
      </ul>
      <button onClick={logout} className="button">
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Headers)
