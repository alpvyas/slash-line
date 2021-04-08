import { actions } from "react-table";

const ADD_DETAILS = "details/ADD"

const add = (gameDetails) => ({
  type: ADD_DETAILS,
  details: gameDetails
})

export const get_game_details = (date) => async (dispatch) => { const response = 
  await fetch(
  `https://fly.sportsdata.io/v3/mlb/scores/json/GamesByDate/${date}'`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": process.env.REACT_APP_API_KEY,
  },
  })

  const gameDetails = await response.json();

  if (response.ok && !gameDetails.errors) {
    dispatch(add(gameDetails));
  }
};

const initialState = { gameDetails: [] };

const gameDetailsReducer = (state = initialState, action) => {
  switch (actions.type) {
    case ADD_DETAILS:
      let newState = {...state};
      newState.gameDetails = [...action.details];
      return newState;
    default:
      return state;
  }
};

export default gameDetailsReducer;