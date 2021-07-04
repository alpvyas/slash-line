/* ----------------------------------------------------------------------------
                          ACTION TYPES
------------------------------------------------------------------------------*/
const TEST = "test";
const OPEN_MODAL = "create-league/open";
const CLOSE_MODAL = "create-league/close";

const ADD_LEAGUES = "league/ADD";
const SET_LEAGUE = "league/SET";

const CLEAR_STATE = "leagues/CLEAR_STATE";

/* ----------------------------------------------------------------------------
                          ACTION CREATORS
------------------------------------------------------------------------------*/
export const test = () => (
  {
    type: TEST,
  }
)


export const openCreateLeague = () => (
  {
    type: OPEN_MODAL,
  });

export const closeCreateLeague = () => (
  {
    type: CLOSE_MODAL,
  });


const addLeagues = (leagues) => ({
    type: ADD_LEAGUES,
    payload: leagues
  });

const setLeague = (league) => ({
    type: SET_LEAGUE,
    payload: league
  });

const clearState = () => (
  {
    type: CLEAR_STATE,
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
  console.log("TEAMS: ", teams)
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
        dispatch(addLeagues(leagues));
      }

      return leagues;
    };

  export const joinUserLeague = (leagueId, passcode) => async(dispatch) => {

  console.log("DATA: ", leagueId, passcode)
  const response = await fetch(`/api/leagues/${leagueId}/join/${passcode}`, {
    method: "GET",
  });

  const check = await response.json();

  if (!check.ok) {
    alert(check.errors)
  }

  return check;

  };

  export const setCurrentLeague = (league) => dispatch => {
    dispatch(setLeague(league));
  }

  export const clearLeaguesState = () => dispatch => {
    dispatch(clearState());
  };

/* ----------------------------------------------------------------------------
                          LEAGUES REDUCER
------------------------------------------------------------------------------*/


/* 


leagues:  {
            league_01: {
                        league_info: {league info}
                        teams: {
                                team_01: {
                                          user: {user info}
                                          active: [],
                                          injured: [],
                                },
                                team_02: {
                                          user: {}
                                          active: [],
                                          injured: [],
                                },
                                team_03: {
                                          user: {}
                                          active: [],
                                          injured: [],
                                },
                                team_04: {
                                          user: {}
                                          active: [],
                                          injured: [],
                                },
                                team_05: {
                                          user: {}
                                          active: [],
                                          injured: [],
                                },
                        },
                        commisioner: {user info}
            }


}




*/


const initialState = {leagues: {}, status: false };
const leagueReducer = (state = initialState, action) => {
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
      newState.current = leagues[Object.keys(leagues)[0]];
      return newState;
    case SET_LEAGUE:
      newState = {...state};
      newState.current = action.payload;
      return newState;
    case CLEAR_STATE:
      newState = {...initialState};
      return newState;
    case TEST:
      newState = {...state}
      return newState
    default:
      return state;
  }
};

export default leagueReducer;