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
    const response = await fetch(`/api/league`, {
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
      const data = await response.text()
      // if(response.ok && !data.errors){
      //   dispatch(setUser(data))
      // }
      console.log("data:", (data))
      return data.errors;
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