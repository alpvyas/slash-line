/* ----------------------------------------------------------------------------
                          ACTION TYPES
------------------------------------------------------------------------------*/

const OPEN_MODAL = "create-league/open";
const CLOSE_MODAL = "create-league/close";

const ADD_LEAGUES = "league/ADD";
const SET_LEAGUE = "league/SET";

/* ----------------------------------------------------------------------------
                          ACTION CREATORS
------------------------------------------------------------------------------*/

export const openCreateLeague = () => {
  return {
    type: OPEN_MODAL,
  };
};

export const closeCreateLeague = () => {
  return {
    type: CLOSE_MODAL,
  };
};


const addLeagues = (leagues) => {
  return {
    type: ADD_LEAGUES,
    payload: leagues
  }
};

const setLeague = (league) => {
  return {
    type: SET_LEAGUE,
    payload: league
  }
};

/* ----------------------------------------------------------------------------
                          THUNK ACTION CREATORS
------------------------------------------------------------------------------*/

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
      // if(response.ok && !data.errors){
      //   dispatch(setUser(data))
      // }
      return data.errors;
  };

  export const get_user_leagues = (userId) => async (dispatch) => {
    const response = await fetch(`/api/leagues/user/${userId}`, {
        method: "GET",
      });

      const data = await response.json()

      console.log("LEAGUE DATA: ", data)
      if (response.ok && !data.errors) {
        dispatch(addLeagues(data));
      }

      return data;
    };

  export const setCurrentLeague = (league) => dispatch => {
    dispatch(setLeague(league));
  }

/* ----------------------------------------------------------------------------
                          LEAGUES REDUCER
------------------------------------------------------------------------------*/

const initialState = { leagues: {managed: [], member: []}, current: {}, status: false };
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
      newState = {...state};
      newState.leagues.managed = action.payload.managed;
      newState.leagues.member = action.payload.member;
      return newState;
    case SET_LEAGUE:
      newState = {...state};
      newState.current = action.payload;
      return newState;
    default:
      return state;
  }
};

export default leagueReducer;