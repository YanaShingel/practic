import React from 'react';
import { withFormik, Formik as FormikRenderProps, Field } from 'formik';

const InnerForm = () => (
  <FormikRenderProps
    onSubmit={(a, b, c) => {
      console.log(a, b, c);
    }}
    initialValues={{ email: '', password: '' }}
    render={({ handleSubmit, touched, errors }) => (
      <form onSubmit={handleSubmit}>
        <Field type="email" name="email" />
        {touched.email && errors.email && <div>{errors.email}</div>}

        <Field type="password" name="password" />
        {touched.password && errors.password && <div>{errors.password}</div>}
        <button type="submit">Submit</button>
      </form>
    )}
  />
);

const Formik = () => (
  <div>
    <h1>My Form</h1>
    <p>This can be anywhere in your application</p>
    <InnerForm />
  </div>
);

export default Formik;
