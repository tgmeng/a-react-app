import * as React from 'react';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { Input, Button } from 'fabric-components';

const UserFormSchema = Yup.object().shape({
  name: Yup.string().trim().required('Required'),
});

export default function UserForm() {
  const { id } = useParams();

  const isEditing = Boolean(id);

  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={UserFormSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        return Promise.resolve(values).then(() => {
          setSubmitting(false);
        });
      }}
    >
      {({ isSubmitting, isValid }) => {
        return (
          <Form>
            <Field as={Input} name="name" />
            <Button type="submit" disabled={isSubmitting || !isValid}>
              {isEditing ? '创建' : '保存'}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}
