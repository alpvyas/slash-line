import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
// import { login } from "../../services/auth";
import "./index.css";

const LoginForm = ({ 
  authenticated,
  setAuthenticated,
  setSignUp,
  setLogin,
 }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.session.user);

  const onLogin = async (e) => {
    e.preventDefault();
    const userAuth = await dispatch(sessionActions.login(email, password));
    // if (!userAuth.errors) {
    setAuthenticated(true);
    // } else {
    //   setErrors(userAuth.errors);
    // }
  };

  const signupButton = () => {
    setLogin(false);
    setSignUp(true);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  // const checkError = {};
  // if (errors) {
  //   errors.forEach(error => {
  //     error = error.split(':');
  //     checkError[error[0].trim()] = error[1]
  //   });
  // };

  // if (authenticated) {
  //   return <Redirect to="/" />;
  // }

  return (
    <div className="form-container">
      <div className="login-page-header">
        <img alt="logo" src={"something"} />
        <span className="login-slash">Slash Line</span>
      </div>

      <form className="login-form" onSubmit={onLogin}>
        <div>
          {/* <label htmlFor="email">Email</label> */}
          <input
            name="email"
            type="text"
            placeholder="Email address"
            value={email}
            onChange={updateEmail}
          />
          {/* {"email" in checkError ? <div className="form-error-container">
            <p className="error-text">{checkError.email}</p></div> : null} */}
        </div>
        <div>
          {/* <label htmlFor="password">Password</label> */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
          {/* {"password" in checkError ? <div className="form-error-container">
            <p className="error-text">{checkError.password}</p></div> : null} */}
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="login-footer-container">
        <div className="no-account">
          <span>Don't have an account?</span>
          <button className="login-button" onClick={signupButton}>
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
