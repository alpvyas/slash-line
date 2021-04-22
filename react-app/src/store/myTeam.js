const GET_PLAYER = "teams/GET";
const ADD_PLAYER = "teams/ADD";

const add = (player) => ({
  type: ADD_PLAYER,
  data: player
});

export const get_league_teams = (leagueId) => async (dispatch) => { 
  const response = await fetch(`/api/leagues/${leagueId}/teams`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  });

  const teams = await response.json();

  if (response.ok && !teams.errors) {
    return teams.teams;
  };
};

export const add_player = (player) => dispatch => {
  console.log("INSIDE THUNK")
  dispatch(add(player))
  // console.log("INSIDE THUNK")
  return player
}

const initialState = { userTeam: [] };

const myTeamReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER:
      console.log("INSIDE REDUCER")
      let newState = {...state};
      console.log("AFTER SET NEW STATE")
      newState.userTeam = [...state.userTeam, action.data];
      console.log("AFTER UPDATE USERTEAM")
      return newState;
    default:
      return state;
  }
};

export default myTeamReducer;