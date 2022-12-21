// Render Prop
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { isValidPhoneNumber } from "react-phone-number-input";

const Home = () => {
    const formValues=useState()
    
  return (
    <>
      <div>
        <h1>Any place in your app!</h1>
        <Formik
          initialValues={{ email: "", name: "", contact: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Enter Woxsen email ID";
            } else if (!/^[A-Z0-9._%+-]+@woxsen.edu.in$/i.test(values.email)) {
              errors.email = "Please enter a valid Woxsen email ID";
            }
            if (!values.contact) {
              errors.contact = "Enter phone number";
            } else if (!isValidPhoneNumber("+91" + values.contact)) {
              errors.contact = "Enter valid phone number";
            }else{

            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
              <br />
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" />
              <br />
              <Field type="number" name="contact" />
              <ErrorMessage name="contact" component="div" />
              <br />

              <label for="cars">Choose arena:</label>
              <br />

              <select name="cars" id="cars">
                <option value="volvo">basketball</option>
                <option value="saab">cricket</option>
                <option value="mercedes">golf</option>
                <option value="audi">football</option>
              </select>
              <br />

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Home;
