const GET_PLAYER = "teams/GET";
const ADD_PLAYER = "teams/ADD";
const ADD_IL = "teams/ADD_IL";
const REMOVE_IL = "teams/REMOVE_IL";

const add = (player) => ({
  type: ADD_PLAYER,
  data: player
});

const addIL = (player) => ({
  type: ADD_IL,
  data: player,
});

const removeIL = (player) => ({
  type: REMOVE_IL,
  data: player,
})

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
  dispatch(add(player))
  return player
}

export const remove_player = (player) => dispatch => {

  return "Player Removed"
}

export const add_to_IL = (player) => dispatch => {
  dispatch(addIL(player))
  return player
}

export const make_active = (player) => dispatch => {
  dispatch(removeIL(player))
  return player
}

const initialState = { userTeam: [], injuredList: [] };

const myTeamReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER:
      let newState = {...state};
      newState.userTeam = [...state.userTeam, action.data];
      return newState;
    case ADD_IL:
      let newerState = {...state};
      newerState.injuredList = [...state.injuredList, action.data]
      const updatedTeamList = newerState.userTeam.filter(player => 
        player.player_id !== action.data.player_id
      );
      newerState.userTeam = [...updatedTeamList];
      return newerState;
    case REMOVE_IL:
      let newestState = {...state};
      const updatedIL = newestState.injuredList.filter(player => 
        player.player_id !== action.data.player_id
      );
      newestState.injuredList = [...updatedIL];
      newestState.userTeam = [...state.userTeam, action.data];
      return newestState;
    default:
      return state;
  }
};

export default myTeamReducer;