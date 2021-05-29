/* ----------------------------------------------------------------------------
                          ACTION TYPES
------------------------------------------------------------------------------*/

const GET_PLAYER = "team/GET";
const ADD_PLAYER = "team/ADD";
const REMOVE_PLAYER = "team/REMOVE"
const ADD_IL = "team/ADD_IL";
const REMOVE_IL = "team/REMOVE_IL";

/* ----------------------------------------------------------------------------
                          ACTION CREATORS
------------------------------------------------------------------------------*/

const add = (player) => ({
  type: ADD_PLAYER,
  data: player
});

const remove = (player) => ({
  type: REMOVE_PLAYER,
  data: player,
});

const addIL = (player) => ({
  type: ADD_IL,
  data: player,
});

const removeIL = (player) => ({
  type: REMOVE_IL,
  data: player,
})

/* ----------------------------------------------------------------------------
                          THUNK ACTION CREATORS
------------------------------------------------------------------------------*/

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

export const add_player = (player, userId, leagueId) => async dispatch => {
  console.log("INSIDE ADD PLAYER THUNK")
  const response = await fetch(`/api/teams/leagues/${leagueId}/users/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: player,
  });

  const status = await response.json();

  console.log("STATUS MESSAGE: ", status.message)
  if (status.ok) {
    dispatch(add(player))
  }else{
    alert(status.message)
  }

}

export const remove_player = (player) => dispatch => {
  dispatch(remove(player))
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

/* ----------------------------------------------------------------------------
                          USER TEAM REDUCER
------------------------------------------------------------------------------*/

const initialState = { active: [], injuredList: [] };
let newState;
const userTeamReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER:
      newState = {...state};
      newState.userTeam = [...state.active, action.data];
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
    default:
      return state;
  }
};

export default userTeamReducer;