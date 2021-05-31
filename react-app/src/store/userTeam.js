/* ----------------------------------------------------------------------------
                          ACTION TYPES
------------------------------------------------------------------------------*/

const GET_PLAYER = "team/GET";
const ADD_PLAYER = "team/ADD";
const REMOVE_PLAYER = "team/REMOVE";
const UPDATE_PLAYERS = "team/UPDATE_PLAYERS";
const ADD_IL = "team/ADD_IL";
const REMOVE_IL = "team/REMOVE_IL";
const CLEAR_STATE = "team/CLEAR_STATE";

/* ----------------------------------------------------------------------------
                          ACTION CREATORS
------------------------------------------------------------------------------*/

const add = (player) => ({
  type: ADD_PLAYER,
  data: player
});

const remove = (player) => ({
  type: REMOVE_PLAYER,
  data: player
});

const updateAllPlayers = (players) => ({
  type: UPDATE_PLAYERS,
  data: players
});

const addIL = (player) => ({
  type: ADD_IL,
  data: player
});

const removeIL = (player) => ({
  type: REMOVE_IL,
  data: player
})

const clearState = () => ({
  type: CLEAR_STATE,
});

/* ----------------------------------------------------------------------------
                          THUNK ACTION CREATORS
------------------------------------------------------------------------------*/

//get all member teams for a league
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

//get all players across all teams belonging to current user
export const getUserAllPlayers = (userId) => async dispatch => {
  const response = await fetch(`/api/teams/users/${userId}`, {
    method: "GET",
  });

  const team = await response.json();

  console.log("TEAM: ", team);

  if (team.ok) {
    dispatch(updateAllPlayers(team.players));
  }else{
    alert(team.message);
  }
};

//add a player to a users team
export const add_player = (player, userId, leagueId) => async dispatch => {
  const response = await fetch(`/api/teams/leagues/${leagueId}/users/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: player.mlb_player_id,
  });

  const status = await response.json();

  console.log("STATUS MESSAGE: ", status.message)
  if (status.ok) {
    dispatch(add(player));
  }else{
    alert(status.message);
  }

}

//remove a player from users team
export const remove_player = (player) => dispatch => {
  dispatch(remove(player));
  return "Player Removed"
}

//add player to team injured list
export const add_to_IL = (player) => dispatch => {
  dispatch(addIL(player));
  return player
}

//reactive player from injured list
export const make_active = (player) => dispatch => {
  dispatch(removeIL(player));
  return player
}

//clear userTeam state when user logs out
export const clearUserTeamState = () => dispatch => {
  dispatch(clearState());
}
/* ----------------------------------------------------------------------------
                          USER TEAM REDUCER
------------------------------------------------------------------------------*/

const initialState = { active: [], injuredList: [], allPlayers: []};
let newState;
const userTeamReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER:
      newState = {...state};
      newState.active = [...state.active, action.data];
      return newState;
    case ADD_IL:
      newState = {...state};
      newState.injuredList = [...state.injuredList, action.data]
      const updatedTeamList = newState.active.filter(player => 
        player.player_id !== action.data.player_id
      );
      newState.active = [...updatedTeamList];
      return newState;
    case REMOVE_IL:
      newState = {...state};
      const updatedIL = newState.injuredList.filter(player => 
        player.player_id !== action.data.player_id
      );
      newState.injuredList = [...updatedIL];
      newState.active = [...state.active, action.data];
      return newState;
    case UPDATE_PLAYERS:
      newState = {...state};
      newState.allPlayers = [action.data];
      return newState;
      case CLEAR_STATE:
        newState = {...initialState};
        return newState; 
    default:
      return state;
  }
};

export default userTeamReducer;