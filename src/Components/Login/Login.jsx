import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../Redux/actions/authActions";

function Login() {
  const [loading,setLoading]=useState(false);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const isLoggedIn =useSelector((state)=>state.auth.isLoggedIn)
  useEffect(() => {

    // const timer = setTimeout(() => {
      if(isLoggedIn){
        navigate('/admin')
      }
    // }, 1000);
    // return () => clearTimeout(timer);
  }, [isLoggedIn,navigate])
  
  return (
    <div className="ui container">
      <div>
        <div className="ui segment">
          <Formik
            initialValues={{ userName: "", password: "" }}
            validate={() => {}}
            onSubmit={(values) => {
              setLoading(true)
              try {
                dispatch(loginAction(values.userName, values.password));
                navigate('/admin')
                
              } catch (err) {
              }
              finally{
              }
            }}
          >
            {() => {
              return (
                <Form className="ui form">
                  <label>Username</label>
                  <Field type="text" name="userName" />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="userName"
                    component="div"
                  />
                  <br />
                  <br />
                  <label>Password</label>
                  <Field type="password" name="password" />
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="userName"
                    component="div"
                  />
                  <br />
                  <br />
                  <button className="ui labeled icon button" type="submit">
                    <i className="unlock alternate icon"></i>
                    Login{loading?<div class="ui active dimmer">
    <div class="ui loader"></div>
  </div>:null}
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
