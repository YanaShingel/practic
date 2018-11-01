import React, { Fragment, PureComponent } from 'react';
import { Form, Field } from 'react-final-form';

const Input = ({ input, meta, label }) => {
  return (
    <Fragment>
      <p>{label}</p>
      <input {...input} />
      {meta.error &&
      meta.visited &&
      !meta.active && <pre style={{ color: 'red' }}>{meta.error}</pre>}
    </Fragment>
  );
};

// const inputValidation = value => {
//   if (value && value.length < 10) {
//     return 'First name must be more than 10 symbols';
//   }
// };

const formValidation = (values) => {
  console.log('formValidation');
  const errors = {};
  const user = {};
  if (!values.user) {
    user.first_name = 'Required';
    user.last_name = 'Required';
  } else if (!values.user.first_name) {
    user.first_name = 'Required';
  } else if (!values.user.last_name) {
    user.last_name = 'Required';
  }

  if (
    !user.last_name &&
    values.user &&
    values.user.last_name &&
    values.user.last_name.length < 10
  ) {
    user.last_name = 'Last name must be more than 10 symbols';
  }
  if (!user.first_name && values.user.first_name.length < 10) {
    user.first_name = 'First name must be more than 10 symbols';
  }

  if (Object.keys(user).length > 0) {
    errors.user = user;
    return errors;
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!values.user.email || values.user.email !== 'test@test.ru') {
          resolve({ user: { email: 'Not uniq email' } });
        } else {
          resolve({});
        }
      }, 3000);
    });
  }
};

export default class ReactFinalForm extends PureComponent {
  constructor (props) {
    super(props);
    let formValues;
    try {
      formValues = JSON.parse(localStorage.getItem('form'));
    } catch (e) {
      formValues = {};
    }
    // debugger;
    this._formValues = { user: {} };
    this.state = {
      initialValues: formValues,
    };
  }

  handleSubmit = (values) => {
    console.log('handleSubmit');
    console.log(values);
  };

  saveFormValues = (form) => {
    // debugger;
    console.log('saveFormValues');
    console.log(form.values.user);
    this._formValues.user = form.values.user;
  };

  componentDidMount () {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('form', JSON.stringify(this._formValues));
    });
  }

  render () {
    const { initialValues } = this.state;
    return (
      <Form
        initialValues={initialValues}
        debug={this.saveFormValues}
        onSubmit={this.handleSubmit}
        validate={formValidation}
        render={({ handleSubmit, validating }) => (
          <form onSubmit={handleSubmit}>
            {validating && <p>Async validating</p>}
            <Field name="user.first_name" label="First name" component={Input} />
            <br />
            <Field name="user.last_name" label="Last name" component={Input} />
            <Field name="user.email" label="Email" component={Input} />
            <br />
            <Field
              name="user.cardNumber"
              label="Credit card"
              format={(value) => (value ? value.replace(/(\S{4})/g, '$1 ').trim() : '')}
              parse={(valueStr) => valueStr.replace(/\s+/g, '').slice(0, 16)}
              component={Input}
            />
            <br />
            <button type="submit">Отправить</button>
          </form>
        )}
      />
    );
  }
}
