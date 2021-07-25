import { store } from "../index";

/* ----------------------------------------------------------------------------
                          ACTION TYPES
------------------------------------------------------------------------------*/

const ADD_FILE = "uploads/ADD";



/* ----------------------------------------------------------------------------
                          ACTION CREATORS
------------------------------------------------------------------------------*/

const add = () => ({
  type: ADD_FILE,
});

/* ----------------------------------------------------------------------------
                          THUNK ACTION CREATORS
------------------------------------------------------------------------------*/

//upload files
export const upload_files = (data) => async (dispatch) => {

  const response = await fetch('/api/upload/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data,
    })
  });

  if (response) {
    const message = await response.json()
    console.log(message)
  }
  return response;
};

/* ----------------------------------------------------------------------------
                          UPLOADS REDUCER
------------------------------------------------------------------------------*/

const initialState = { uploads: [] };

const uploadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FILE:
      let newState = {...state};
      newState.stats = action.data;
      return newState;
    default:
      return state;
  }
};

export default uploadsReducer;