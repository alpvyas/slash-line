import { clearLeaguesState } from "./leagues";
import { clearUserTeamState } from "./userTeams";

const GET_USER = "session/GET_USER";
const REMOVE_USER = "session/REMOVE_USER";


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
    console.log("I MADE IT TO THIS POINT")
    dispatch(setUser(data))
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
  dispatch(clearUserTeamState());
  dispatch(clearLeaguesState());
  
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

  const initialState = {};
  let newState;

  const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USER:
        newState = {...state};
        newState.user = action.payload;
        return newState;
      case REMOVE_USER:
        newState = {...state};
        newState.user = null;
        return newState;
      default:
        return state;
    };
  };

  export default sessionReducer;