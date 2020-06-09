import * as React from 'react';
import { Formik, Field, Form, FormikConfig } from 'formik';
import * as Yup from 'yup';
import { useAsyncFn } from 'react-use';
import { Link, useHistory } from 'react-router-dom';

import { Input, Button } from 'fabric-components';

import { buildUserDetailPath, UserAddPath } from '@/routes';

const UserListFilterSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!'),
});

function UserListFilter(
  props: Omit<FormikConfig<{ name: string }>, 'initialValues'>
) {
  return (
    <Formik
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      initialValues={{
        name: '',
      }}
      validationSchema={UserListFilterSchema}
    >
      {({ isSubmitting }) => {
        return (
          <Form>
            <Field as={Input} name="name" />
            <Button type="submit" disabled={isSubmitting}>
              搜索
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default function UserList() {
  const [userList, setUserList] = React.useState([]);
  const history = useHistory();

  const [_, queryUserList] = useAsyncFn(
    ({ name }: { name: string } = { name: '' }) =>
      Promise.resolve(
        [
          { id: 1, name: 'foo' },
          { id: 2, name: 'bar' },
        ].filter((user) => (name ? user.name.startsWith(name) : true))
      ).then(setUserList),
    []
  );

  React.useEffect(() => {
    queryUserList();
  }, []);

  return (
    <div>
      <div>
        <Button
          onClick={() => {
            history.push(UserAddPath);
          }}
        >
          新增
        </Button>
      </div>
      <div>
        <UserListFilter
          onSubmit={(values, { setSubmitting }) => {
            queryUserList(values).then(() => {
              setSubmitting(false);
            });
          }}
        />
      </div>
      <div>
        <ul>
          {userList.map((user) => (
            <li key={user.id}>
              <Link to={buildUserDetailPath(user.id)}>{user.name} </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
