import {Component} from 'react'
import {useParams, Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Headers from '../Headers'
import Jobdetails from '../jobdetails'

class JobItem extends Component {
  state = {id: '', details: {}, loader: true}

  componentDidMount() {
    this.getjobdetails()
  }

  getjobdetails = async () => {
    const {match} = this.props
    const {id} = match.params
    this.setState({loader: false})
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    this.setState({details: data})
  }

  render() {
    const {loader, details} = this.state
    const j = details.job_details
    const h = details.similar_jobs
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="jobDetails">
        <Headers />
        <div>
          {loader ? (
            <div className="products-loader-container">
              <div>djksfjsd</div>
              <Loader
                type="ThreeDots"
                color="#0b69ff"
                height="50"
                width="50"
                data-testid="loader"
              />
            </div>
          ) : (
            <div>
              <div className="jo">
                <div>
                  <img src={j.company_logo_url} alt="company logo" />
                  <div>
                    <h1>{j.title}</h1>
                    <div>
                      <p>{j.rating}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <p>{j.location}</p>
                  </div>
                  <div>
                    <p>{j.employment_type}</p>
                  </div>
                  <div>
                    <p>{j.package_per_annum}</p>
                  </div>
                </div>
                <hr />
                <div>
                  <h1>Description</h1>
                  <p>{j.job_description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default JobItem
