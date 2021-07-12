import React, { useState } from "react";
import { Redirect, NavLink } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import logo from "../../images/logo.png";
import * as sessionActions from "../../store/session";
import "./index.css";

const SignUpForm = ({
  // authenticated,
  // setAuthenticated,
  setSignup,
  setLogin,
}) => {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector(state => state.session.user);


  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
    let successfulSignUp = await dispatch(sessionActions.signup(username, firstName, lastName, email, password))
        .catch(async (res) => {
          console.log("THIS IS RES", res)
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors)
        })
        setErrors(successfulSignUp)
      }
  };
  if (user) {
    return (
    <Redirect to="/home"/>
  )}

  const loginButton = () => {
    setSignup(false);
    setLogin(true);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const errorCheck = {} 
  
    errors.forEach(error => { 
    error = error.split(':') 
    errorCheck[error[0].trim()] = error[1]

  })




  // if (authenticated) {
  //   return (
  //     <Redirect
  //       to="/home"
  //       authenticated={authenticated}
  //       setAuthenticated={setAuthenticated}
  //     />
  //   );
  // }

  return (
    <div className="form-container">
      <div className="login-page-header">
        <img alt="logo" src={logo} />
        <span className="login-slash">Slash Line</span>
        <span></span>
      </div>

      <form onSubmit={onSignUp} className="signup_form">
        <div>
          {/* <label>User Name</label> */}
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            onChange={updateFirstName}
            value={firstName}
          ></input>
          {"firstName" in errorCheck ? <div className="form__error__container"><p className="form__error__text">{errorCheck.firstName}</p></div> : null}
  
        </div>
        <div>
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            onChange={updateLastName}
            value={lastName}
          ></input>
          {"lastName" in errorCheck ? <div className="form__error__container"><p className="form__error__text">{errorCheck.lastName}</p></div> : null}

        </div>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={updateUsername}
            value={username}
          ></input>
          {"username" in errorCheck ? <div className="form__error__container"><p className="form__error__text">{errorCheck.username}</p></div> : null}

        </div>
        <div>
          {/* <label>Email</label> */}
          <input
            placeholder="Email"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
          {"email" in errorCheck ? <div className="form__error__container"><p className="form__error__text">{errorCheck.email}</p></div> : null}

        </div>
        <div>
          {/* <label>Password</label> */}
          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          {/* <label>Repeat Password</label> */}
          <input
            placeholder="Confirm Password"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button className="text" type="submit">
          Continue
        </button>
      </form>
      <div className="login-footer-container">
        <div className="no-account">
          <span>Already have an account?</span>
          <button className="login-button" onClick={loginButton}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

































// import React, { useState } from "react";
// import { Redirect } from 'react-router-dom';
// import { signUp } from '../../services/auth';
// import * as sessionActions from '../../store/session';


// const SignUpForm = ({authenticated, setAuthenticated}) => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [repeatPassword, setRepeatPassword] = useState("");

//   const onSignUp = async (e) => {
//     e.preventDefault();
//     if (password === repeatPassword) {
//       const user = await signUp(username, email, password);
//       if (!user.errors) {
//         setAuthenticated(true);
//       }
//     }
//   };

//   const updateUsername = (e) => {
//     setUsername(e.target.value);
//   };

//   const updateEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const updatePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   const updateRepeatPassword = (e) => {
//     setRepeatPassword(e.target.value);
//   };

//   if (authenticated) {
//     return <Redirect to="/" />;
//   }

//   return (
//     <form onSubmit={onSignUp}>
//       <div>
//         <label>User Name</label>
//         <input
//           type="text"
//           name="username"
//           onChange={updateUsername}
//           value={username}
//         ></input>
//       </div>
//       <div>
//         <label>Email</label>
//         <input
//           type="text"
//           name="email"
//           onChange={updateEmail}
//           value={email}
//         ></input>
//       </div>
//       <div>
//         <label>Password</label>
//         <input
//           type="password"
//           name="password"
//           onChange={updatePassword}
//           value={password}
//         ></input>
//       </div>
//       <div>
//         <label>Repeat Password</label>
//         <input
//           type="password"
//           name="repeat_password"
//           onChange={updateRepeatPassword}
//           value={repeatPassword}
//           required={true}
//         ></input>
//       </div>
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };

// export default SignUpForm;
