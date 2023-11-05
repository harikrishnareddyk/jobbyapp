import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BiSearch} from 'react-icons/bi'
import Headers from '../Headers'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profile: {},
    jobs: [],
    profileoutput: '',
    jobsoutput: '',
    searchinput: '',
  }

  componentDidMount() {
    this.getprofile()
  }

  searchEl = event => {
    this.setState({searchinput: event.target.value})
  }

  searchfun = async () => {
    const {searchinput} = this.state
    const url2 = `https://apis.ccbp.in/jobs?search=${searchinput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const respons2 = await fetch(url2, options)
    const data2 = await respons2.json()
    this.setState({jobs: data2.jobs})
  }

  getprofile = async () => {
    const {profile, jobs} = this.state
    const url = 'https://apis.ccbp.in/profile'
    const url1 = 'https://apis.ccbp.in/jobs'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    this.setState({profile: data.profile_details})
    this.setState({profileoutput: response.ok})

    const response1 = await fetch(url1, options)
    const data1 = await response1.json()
    this.setState({
      jobs: data1.jobs,
    })
    this.setState({jobsoutput: response1.ok})
  }

  render() {
    const {profile, jobs, profileoutput, jobsoutput, searchinput} = this.state
    console.log(jobs)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="jobCon">
        <Headers />
        <div className="jobs-con">
          <div>
            {profileoutput ? (
              <div className="profileEL">
                <img src={profile.profile_image_url} alt="profile" />
                <h1>{profile.name}</h1>
                <p>{profile.short_bio}</p>
              </div>
            ) : (
              <button onClick={this.getprofile}>Retry</button>
            )}
            <hr />
            <ul>
              <h1>Type of Employment</h1>
              {employmentTypesList.map(each => (
                <li>
                  <input htmlFor="label" type="checkbox" />
                  <label id="label">{each.label}</label>
                </li>
              ))}
            </ul>
            <hr />
            <ul>
              <h1>Salary Range</h1>
              {salaryRangesList.map(item => (
                <li>
                  <input htmlFor="label1" type="radio" />
                  <label id="label1">{item.label}</label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div>
              <input
                value={searchinput}
                onChange={this.searchEl}
                htmlFor="searchButton"
                type="search"
                placeholder="Search"
              />
              <button onClick={this.searchfun} data-testid="searchButton">
                <BiSearch />{' '}
              </button>
            </div>
            <div>
              {jobsoutput ? (
                <div>
                  {jobs.length !== 0 ? (
                    <ul>
                      {jobs.map(j => (
                        <Link to={`/jobs/${j.id}`}>
                          <li className="jo">
                            <div>
                              <img
                                src={j.company_logo_url}
                                alt="company logo"
                              />
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
                          </li>
                        </Link>
                      ))}
                    </ul>
                  ) : (
                    <div>
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                        alt="no jobs"
                      />
                      <h1>No Jobs Found</h1>
                      <p>We could not find any jobs. Try other filters</p>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                    alt="failure view"
                  />
                  <h1>Oops! Something Went Wrong</h1>
                  <p>We cannot seem to find the page you are looking for</p>
                  <button onClick={this.getprofile}>Retry</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
