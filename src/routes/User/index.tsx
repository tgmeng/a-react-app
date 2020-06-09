import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { UserPath, UserEditPath, UserAddPath } from '@/routes';

import UserList from './List';
import UserForm from './Form';

export type UserProps = {};

export default function User(props: UserProps) {
  return (
    <Switch>
      <Route path={UserPath} exact>
        <UserList />
      </Route>
      <Route path={UserAddPath}>
        <UserForm />
      </Route>
      <Route path={UserEditPath}>
        <UserForm />
      </Route>
      <Redirect to={UserPath} />
    </Switch>
  );
}
