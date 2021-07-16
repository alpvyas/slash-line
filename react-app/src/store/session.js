import { clearLeaguesState } from "./leagues";
import { clearUserTeamState } from "./userTeams";
import { getUserLeagues } from "./leagues";
import { getUserTeams } from "./userTeams";

const GET_USER = "session/GET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const SET_AUTH = "session/SET_AUTH";


const setUser = user => {
  return {
    type: GET_USER,
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

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (response.ok && !data.errors) {
    console.log("DATA: ", data)
    dispatch(setUser(data))
    dispatch(getUserLeagues(data.id))
    dispatch(getUserTeams(data.id))
  };


  return data.errors
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("RESPONSE LOGOUT: ", response)

  dispatch(removeUser());
  // dispatch(clearUserTeamState());
  // dispatch(clearLeaguesState());
  
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
      dispatch(setUser(data));
    };
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