const OPEN_MODAL = "create-league/open";
const CLOSE_MODAL = "create-league/close";

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

  export const get_leagues = (user_id) => async (dispatch) => {
    const response = await fetch(`/api/user/${user_id}/league`, {
        method: "GET",
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });

      const data = await response.json()
      return data;
    };

const initialState = { status: false };
const createLeagueReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case OPEN_MODAL:
      newState = Object.assign({}, state, { status: true });
      return newState;
    case CLOSE_MODAL:
      newState = Object.assign({}, state, { status: false });
      return newState;
    default:
      return state;
  }
};

export default createLeagueReducer;