/* ----------------------------------------------------------------------------
                          ACTION TYPES
------------------------------------------------------------------------------*/

const GET_TEAMS = "teams/GET";
const ADD_TEAM = "teams/ADD";

/* ----------------------------------------------------------------------------
                          ACTION CREATORS
------------------------------------------------------------------------------*/

const add = (teamData) => ({
  type: ADD_TEAM,
  data: teamData
});

/* ----------------------------------------------------------------------------
                          THUNK ACTION CREATORS
------------------------------------------------------------------------------*/

export const get_league_teams = (leagueId) => async (dispatch) => { 
  const response = await fetch(`/api/teams/leagues/${leagueId}`, {
  method: "GET"
  });

  const teams = await response.json();

  if (response.ok && !teams.errors) {
    return teams.teams;
  };
};

/* ----------------------------------------------------------------------------
                          TEAMS REDUCER
------------------------------------------------------------------------------*/

const initialState = { teams: [] };

const teamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TEAM:
      let newState = {...state};
      newState.teams = [...state, ...action.data];
      return newState;
    default:
      return state;
  }
};

export default teamsReducer;