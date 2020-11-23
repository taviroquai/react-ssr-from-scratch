import React from 'react'
import {
  HashRouter,
  StaticRouter,
  Switch,
  Route
} from "react-router-dom"
import App from './App'
import Other from './Other'

function Root(props) {
  const { ssr, location, ...rest } = props;
  const Router = ssr ? StaticRouter : HashRouter;
  return (
    <Router location={location || '/'}>
      <Switch>
        <Route exact path="/">
          <React.Fragment>
            <App { ...rest } />
          </React.Fragment>
        </Route>
        <Route path="/other">
          <Other { ...rest } />
        </Route>
      </Switch>
    </Router>
  )
}

export default Root;
