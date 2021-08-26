import { getUserLeagues } from "./leagues";
import { getUserTeams } from "./userTeams";

const GET_USER = "session/GET_USER";
const NEW_USER = "session/NEW_USER";
const REMOVE_USER = "session/REMOVE_USER";
const SET_AUTH = "session/SET_AUTH";
const SET_PROFILE = "session/SET_PROFILE";


const setUser = user => {
  return {
    type: GET_USER,
    payload: user,
  };
};

const newUser = user => {
  return {
    type: NEW_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const setAuthStatus = authStatus => {
  return {
    type: SET_AUTH,
    payload: authStatus,
  };
};

const setUserProfile = user => {
  return {
    type: SET_PROFILE,
    payload: user
  };
};

export const login = (username, email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const data = await response.json();

  if (response.ok) {
    dispatch(setUser(data));
    dispatch(getUserLeagues(data.id));
    dispatch(getUserTeams(data.id));
    dispatch(setAuthStatus(true));
  };


  return data;
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  //deleting cookies on client-side in case connection to server is lost
  const cookies = document.cookie.split(";");
  cookies.forEach((c) => {
    document.cookie = c
    .replace(/^ +/, "")
    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  })

  dispatch(removeUser());
  
  return response;
};

export const signup = (username, firstName, lastName, email, password) =>
  async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok && !data.errors) {
      dispatch(newUser(data));
    };

    return data;
  };

  export const validateUsername = (username) => async () => {
    const response = await fetch("/api/users/validate-username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    });
    const valid = await response.json();
    return valid;
  };

  export const validateEmail = (email) => async () => {
    const response = await fetch("/api/users/validate-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const valid = await response.json();

    return valid;
  };

  export const restoreUser = () => async (dispatch) => {
    const response = await fetch("/api/auth/");
    const data = await response.json();
    if (response.ok && !data.errors) {
      dispatch(setUser(data));
    };
    return response
  };

  export const setAuthenticated = (authStatus) => (dispatch) => {
    dispatch(setAuthStatus(authStatus));
  };

  export const getUser = (userID) => async (dispatch) => {
    const response = await fetch(`/api/users/profile/${userID}`);

    const user = await response.json();
    // console.log("BACKEND USER::: ", user)
    if (response.ok && !user.errors) {
      dispatch(setUserProfile(user))
    }
  };

  const initialState = {authenticated: false};
  let newState;

  const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USER:
        newState = {...state};
        newState.user = action.payload;
        newState.authenticated = true;
        return newState;
      case NEW_USER:
        newState = {...state};
        newState.user = action.payload;
        newState.authenticated = true;
        newState.newUser = true;
        return newState;
      case REMOVE_USER:
        newState = {...state};
        newState.user = null;
        return newState;
      case SET_AUTH:
        newState = {...state};
        newState.authenticated = true;
        return newState;
      case SET_PROFILE:
        newState = {...state};
        newState.profile = action.payload;
        return newState;
      default:
        return state;
    };
  };

  export default sessionReducer;