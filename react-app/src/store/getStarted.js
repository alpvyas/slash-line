/* ----------------------------------------------------------------------------
                          ACTION TYPES
------------------------------------------------------------------------------*/

const JOIN_LEAGUE = "get-started/JOIN_LEAGUE";




/* ----------------------------------------------------------------------------
                          ACTION CREATORS
------------------------------------------------------------------------------*/

const joinOpen = (league) => (
  {
    type: JOIN_LEAGUE,
    payload: league
  });

// const clearState = () => (
//   {
//     type: CLEAR_STATE,
//   });

/* ----------------------------------------------------------------------------
                          THUNK ACTION CREATORS
------------------------------------------------------------------------------*/

// export const checkTeamName = (league) => async (dispatch) => {
  //  const response = await fetch(`/api/leagues/${league}/teams`, {
  // method: "GET",
  // headers: {
  //   "Content-Type": "application/json",
  // },
  // });
  // console.log("HELLO!!!!")
// }

export const userSetUp = (userSelections) => async (dispatch) => {
    const response = await fetch("/api/users/setup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userSelections,
      }),
    });

    const success = await response.json();

    if (response.ok && !success.errors) {
      return 1;
    }
    else {
      return success.errors;
    }
};

export const joinOpenLeague = () => async (dispatch) => {
    
  };

export const getOpenLeagues = () => async (dispatch) => {
  const response = await fetch(`/api/leagues/open`, {
  method: "GET",
  });

  const leagues = await response.json();

  return leagues
};

/* ----------------------------------------------------------------------------
                          LEAGUES REDUCER
------------------------------------------------------------------------------*/

const initialState = {};
const getStartedReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case JOIN_LEAGUE:
      newState = Object.assign({}, state, { status: true });
      return newState;
    default:
      return state;
  }
};

export default getStartedReducer;