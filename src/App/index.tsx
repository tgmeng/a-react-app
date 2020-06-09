import { hot } from 'react-hot-loader/root';
import * as React from 'react';

import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { UserPath, HomePath } from '@/routes';
import Home from '@/routes/Home';
import User from '@/routes/User';
import * as AppLayout from '@/components/Layout/App';

function App() {
  return (
    <AppLayout.Container>
      <Router>
        <AppLayout.SideBar>
          <nav>
            <ul>
              <li>
                <Link to={HomePath}>Home</Link>
              </li>
              <li>
                <Link to={UserPath}>User</Link>
              </li>
            </ul>
          </nav>
        </AppLayout.SideBar>

        <AppLayout.Main>
          <Switch>
            <Route path={HomePath} exact>
              <Home />
            </Route>
            <Route path={UserPath}>
              <User />
            </Route>
          </Switch>
        </AppLayout.Main>
      </Router>
    </AppLayout.Container>
  );
}

export default hot(App);
