import { getUserLeagues } from "./leagues";
import { getUserTeams } from "./userTeams";

const GET_USER = "session/GET_USER";
const NEW_USER = "session/NEW_USER";
const REMOVE_USER = "session/REMOVE_USER";
const SET_AUTH = "session/SET_AUTH";


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
    console.log("DATA: ", data)
    dispatch(setUser(data))
    dispatch(getUserLeagues(data.id))
    dispatch(getUserTeams(data.id))
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
  cookies.forEach((cookie) => {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
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
    //  console.log("RESPONSE: ", response)
    const valid = await response.json();
    console.log("valid: ", valid)
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

  export const setAuthenticated = (authStatus) => async (dispatch) => {
    dispatch(setAuthStatus(authStatus));
  };

  const initialState = {};
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
      default:
        return state;
    };
  };

  export default sessionReducer;