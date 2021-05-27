/* ----------------------------------------------------------------------------
                          ACTION TYPES
------------------------------------------------------------------------------*/

const ADD_DETAILS = "details/ADD"

/* ----------------------------------------------------------------------------
                          ACTION CREATORS
------------------------------------------------------------------------------*/
const add = (gameDetails) => ({
  type: ADD_DETAILS,
  details: gameDetails
})

/* ----------------------------------------------------------------------------
                          THUNK ACTION CREATORS
------------------------------------------------------------------------------*/

export const get_game_details_backend = (date) => async (dispatch) => {

  const response = await fetch(`/api/game_details/date/${date}`, {
    method: "GET"
  })

  const gameDetails = await response.json();

  // if (response.ok && !gameDetails.errors) {
    dispatch(add(gameDetails));
  // }

  return gameDetails;
};

/* ----------------------------------------------------------------------------
                          GAME DETAILS REDUCER
------------------------------------------------------------------------------*/

const initialState = { gameDetails: [] };

const gameDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DETAILS:
      let newState = {...state};
      newState.gameDetails = action.details;
      return newState;
    default:
      return state;
  }
};

export default gameDetailsReducer;