import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { Redirect } from "react-router";
import SignUpForm from "../auth/SignUpForm";
import LoginForm from "../auth/LoginForm";
import * as sessionActions from "../../store/session";

const LoginModal = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  Modal.setAppElement("#root");
  const closeSignup = () => {
    setSignup(false);
  };

  const closeLogin = () => {
    if (signup) setSignup(false);
    setLogin(false);
  };

  const openSignup = () => {
    if (login) setLogin(false);
    setSignup(true);
  };

  const openLogin = () => {
    if (signup) setSignup(false);
    setLogin(true);
  };

  const demoLogin = () => {
    const user = dispatch(sessionActions.login("demo@demo.com", "password"));
    setAuthenticated(true);
  };

  if (user) {
    return (
      <Redirect to="/home" />
    )
  };
  
  return (
    <>
      <Modal
        isOpen={signup}
        contentLabel="Sign up"
        className="defaultInner"
        overlayClassName="defaultOuter"
        onRequestClose={closeSignup}
        >
          <div className="closeIcoOuterShell">
            <button className="closeIcoShell" onClick={(e) => setSignup(false)}>
              <i className="fas fa-times closeIco"></i>
            </button>
          </div>
          <SignUpForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            signup={signup}
            setSignup={setSignup}
            login={login}
            setLogin={setLogin}
            />
        </Modal>
        <Modal
          isOpen={login}
          contentLabel="Login"
          className="defaultInner"
          overlayClassName="defaultOuter"
          onRequestClose={closeLogin}
          >
            <div className="closeIcoOuterShell">
              <button className="closeIcoShell" onClick={(e) => setLogin(false)}>
                <i className="fas fa-times closeIco"></i>
              </button>
            </div>
            <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            signup={signup}
            setSignup={setSignup}
            login={login}
            setLogin={setLogin}
            openLogin={openLogin}
            />
          </Modal>
    </>
  )
}

export default LoginModal;






















// import { Modal } from '../../context/Modal';
// import LoginForm from './LoginForm';

// function LoginModal() {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <>
//       <button onClick={() => setShowModal(true)}>Log In</button>
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <LoginForm />
//         </Modal>
//       )}
//     </>
//   );
// }

// export default LoginModal;