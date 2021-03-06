/* ----------------------------------------------------------------------------
                          ACTION TYPES
------------------------------------------------------------------------------*/
const TEST = "test";
const OPEN_MODAL = "leagues/CREATE_OPEN";
const CLOSE_MODAL = "leagues/CREATE_CLOSED";

const ADD_LEAGUES = "leagues/ADD";
const SET_LEAGUE = "leagues/SET";
const SET_CURRENT_LEAGUE = "leagues/CURRENT_LEAGUE";
const SET_CURRENT_USER_TEAM = "leagues/CURRENT_USER_TEAM"
const CLEAR_STATE = "leagues/CLEAR_STATE";
const SET_STATUS = "leagues/SET_STATUS";

const SET_SELECTED_TEAM = "leagues/SELECT_TEAM";

/* ----------------------------------------------------------------------------
                          ACTION CREATORS
------------------------------------------------------------------------------*/
export const test = () => (
  {
    type: TEST,
  }
)

export const setStatus = (status) => (
  {
    type: SET_STATUS,
    payload: status,
  });

export const openCreateLeague = () => (
  {
    type: OPEN_MODAL,
  });

export const closeCreateLeague = () => (
  {
    type: CLOSE_MODAL,
  });


const addLeagues = (leagues) => (
  {
    type: ADD_LEAGUES,
    payload: leagues
  });

const setLeague = (league) => (
  {
    type: SET_LEAGUE,
    payload: league
  });

const currentLeague = (league) => (
  {
    type: SET_CURRENT_LEAGUE,
    payload: league
  });

const currentUserTeam = (team) => (
  {
    type: SET_CURRENT_USER_TEAM,
    payload: team
  });
const clearState = () => (
  {
    type: CLEAR_STATE,
  });

const selectedTeam = (team) => (
  {
    type: SET_SELECTED_TEAM,
    payload: team,
  });
/* ----------------------------------------------------------------------------
                          THUNK ACTION CREATORS
------------------------------------------------------------------------------*/

//get all member teams for a league
export const get_league_teams = (leagueId) => async (dispatch) => { 
  const response = await fetch(`/api/teams/leagues/${leagueId}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  });

  const teams = await response.json();
  // console.log("TEAMS: ", teams)
  if (response.ok && !teams.errors) {
    return teams.teams;
  };
};

export const getLeagueInfo = (leagueId) => async (dispatch) => {
  const response = await fetch(`/api/leagues/${leagueId}`, {
  method: "GET",
  });

  const league = await response.json();

  return league
};

// export const checkTeamName = (league) => async (dispatch) => {
  //  const response = await fetch(`/api/leagues/${league}/teams`, {
  // method: "GET",
  // headers: {
  //   "Content-Type": "application/json",
  // },
  // });
  // console.log("HELLO!!!!")


// }

export const createLeague = 
  (user_id, name, type, permissions, draft, draft_date, draft_time) => 
  async (dispatch) => {
    const response = await fetch(`/api/user/${user_id}/league`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          name,
          type,
          permissions,
          draft,
          draft_date,
          draft_time
        }),
      });
      const data = await response.json()
  
      return data.errors;
  };

  export const getUserLeagues = (userId) => async (dispatch) => {
    const response = await fetch(`/api/leagues/user/${userId}`, {
        method: "GET",
      });

      const leagues = await response.json()

      if (response.ok && !leagues.errors) {
        const current_league = leagues[Object.keys(leagues)[0]];
        const current_team = current_league.teams[Object.keys(current_league.teams)[0]];
        dispatch(addLeagues(leagues));
        dispatch(currentLeague(current_league));
        dispatch(selectedTeam(current_team));
        dispatch(setLeagueStateSatus(true));
      }

      return leagues;
    };

  export const joinUserLeague = (leagueId, passcode) => async(dispatch) => {

  const response = await fetch(`/api/leagues/${leagueId}/join/${passcode}`, {
    method: "GET",
  });

  const check = await response.json();

  return check;

  };

  export const setCurrentLeague = (league) => dispatch => {
    const teams = league.teams;
    dispatch(setLeague(league));
    dispatch(setSelectedTeam(league.teams[Object.keys(teams)[0]]));
  };

  export const clearLeaguesState = () => dispatch => {
    dispatch(clearState());
  };

  export const setSelectedTeam = (team) => dispatch => {
    dispatch(selectedTeam(team));
  };

  export const getOpenLeagues = () => async (dispatch) => {
    const response = await fetch(`/api/leagues/open`, {
    method: "GET",
    });

    const leagues = await response.json();

    return leagues
  };

  export const setLeagueStateSatus = (status) => (dispatch) => {
    dispatch(setStatus(status));
  };

/* ----------------------------------------------------------------------------
                          LEAGUES REDUCER
------------------------------------------------------------------------------*/

const initialState = {current: {}, leagues: {}, status: false, loaded: false};
const leaguesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case OPEN_MODAL:
      newState = Object.assign({}, state, { status: true });
      return newState;
    case CLOSE_MODAL:
      newState = Object.assign({}, state, { status: false });
      return newState;
    case ADD_LEAGUES:
      const leagues = action.payload
      newState = {...state};
      newState.leagues = leagues;
      newState.current.league = leagues[Object.keys(leagues)[0]];
      return newState;
    case SET_CURRENT_LEAGUE:
      newState = {...state};
      newState.current.league = action.payload;
      return newState;
    case SET_CURRENT_USER_TEAM:
      newState = {...state};
      newState.current.userTeam = action.payload;
      return newState;
    case CLEAR_STATE:
      newState = {...initialState};
      return newState;
    case SET_SELECTED_TEAM:
      newState = {...state}
      newState.current.selectedTeam = action.payload
      return newState
    case SET_STATUS:
      newState = {...state}
      newState.loaded = action.payload
      return newState
    default:
      return state;
  }
};

export default leaguesReducer;