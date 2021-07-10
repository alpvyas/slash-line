import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
// import { login } from "../../services/auth";
import logo from "../../images/logo.png";
import "./index.css";

const LoginForm = ({ 
  authenticated,
  setAuthenticated,
  setSignup,
  setLogin,
  // demoLogin,
 }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.session.user);

  const onLogin = (e) => {
    e.preventDefault();
    const userAuth = dispatch(sessionActions.login(email, password))
    .then(() => setAuthenticated(true))
    // if (!userAuth.errors) {
    // setAuthenticated(true);
    // } else {
    //   setErrors(userAuth.errors);
    // }
  };

  const demoLogin = () => {
    const user = dispatch(sessionActions.login("demo@demo.com", "password")).then(() => setAuthenticated(true));
  };

  const signupButton = () => {
    setLogin(false);
    setSignup(true);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  // if (user) {
  //   return (
  //   <Redirect to="/home"/>
  // )}

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
        <img alt="logo" src={logo} />
        <span className="login-slash">Slash Line</span>
      </div>

      <form className="login-form" onSubmit={(e) => onLogin(e)}>
        <div>
          {/* <label htmlFor="email">Email</label> */}
          <input
            name="email"
            type="text"
            placeholder="Email address"
            value={email}
            onChange={(e) => updateEmail(e.target.value)}
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
            onChange={(e) => updatePassword(e.target.value)}
          />
          {/* {"password" in checkError ? <div className="form-error-container">
            <p className="error-text">{checkError.password}</p></div> : null} */}
        </div>
        <button className="text" type="submit">Login</button>
        <button className="text" onClick={(e) => demoLogin(e)}>Demo User</button>
      </form>
      <div className="login-footer-container">
        <div className="no-account">
          <span>Don't have an account?</span>
          <button className="create-button" onClick={() => signupButton()}>
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
