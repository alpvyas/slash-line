import { actions } from "react-table";

const ADD_DETAILS = "details/ADD"

const add = (gameDetails) => ({
  type: ADD_DETAILS,
  details: gameDetails
})

export const get_game_details = (date) => async (dispatch) => { const response = 
  await fetch(
  `https://fly.sportsdata.io/v3/mlb/scores/json/GamesByDate/2021-APR-08`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": "10502986f1944b58a416ba0d87ce4b5f",
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