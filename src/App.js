import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/home'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Jobs from './components/Jobs'
import JobItem from './components/JobItem'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/jobs" component={Jobs} />
      <Route exact path="/jobs/:id" component={JobItem} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
