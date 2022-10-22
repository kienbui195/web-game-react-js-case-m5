import React from 'react';
import { Formik, Form, Field } from 'formik';

function validateEmail(value) {
    let error;
    if (!value) {
        error = 'Không được để trống!';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Email không hợp lệ!';
    }
    return error;
}

function validateUsername(value) {
    let error;
    if (value === 'admin') {
        error = 'Thử một tên khác!';
    }
    return error;
}

export const FieldLevelValidationExample = () => (
    <div>
        <h1>Signup</h1>
        <Formik
            initialValues={{
                username: '',
                email: '',
            }}
            onSubmit={values => {
                // same shape as initial values
                console.log(values);
            }}
        >
            {({ errors, touched, isValidating }) => (
                <Form>
                    <Field name="email" validate={validateEmail} />

                    {errors.email && touched.email && <div>{errors.email}</div>}

                    <Field name="username" validate={validateUsername} />
                    {errors.username && touched.username && <div>{errors.username}</div>}

                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    </div>
);