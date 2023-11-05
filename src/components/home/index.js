import Cookies from 'js-cookie'
import {Link, Redirect} from 'react-router-dom'
import Headers from '../Headers'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <Headers />
      <div className="home">
        <h1>Find The Job That Fits Your Life</h1>
        <p>Millions of people are searching for jobs</p>
        <Link to="/jobs">
          <button>Find Jobs</button>
        </Link>
      </div>
    </div>
  )
}

export default Home
