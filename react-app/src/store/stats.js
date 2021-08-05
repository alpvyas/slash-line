/* ----------------------------------------------------------------------------
                          ACTION TYPES
------------------------------------------------------------------------------*/

// const GET_TEAM_SEASON_STATS = "stats/team/seasons/GET";
// const GET_TEAM_GAME_STATS = "stats/teams/games/GET";
// const GET_PLAYER_SEASON_STATS = "stats/players/seasons/GET";
// const GET_PLAYER_GAME_STATS = "stats/players/games/GET";
// const GET_CAREER_HITTING_STATS = "stats/players/career/hitting/GET";
// const GET_CAREER_PITCHING_STATS = "stats/players/career/pitching/GET";

// const ADD_TEAM_SEASON_STATS = "stats/team/seasons/ADD";
// const ADD_TEAM_GAME_STATS = "stats/teams/games/ADD";
const ADD_PLAYERS_SEASON_STATS = "stats/players/seasons/ADD";
// const ADD_PLAYER_GAME_STATS = "stats/players/games/ADD";
// const ADD_CAREER_HITTING_STATS = "stats/players/career/hitting/ADD";
// const ADD_CAREER_PITCHING_STATS = "stats/players/career/pitching/ADD";


/* ----------------------------------------------------------------------------
                          ACTION CREATORS
------------------------------------------------------------------------------*/

const add = (playerStats) => ({
  type: ADD_PLAYERS_SEASON_STATS,
  data: playerStats,
});

const season = 2021;
const gameType = "R";

/* ----------------------------------------------------------------------------
                          THUNK ACTION CREATORS
------------------------------------------------------------------------------*/

//update player stats backend--scheduled
export const update_stats = () => async (dispatch) => {

  const response = await fetch('/api/stats/update', {
    method: "GET",
  });

  if (response) {
    const message = await response.json()
    console.log(message)
    dispatch(get_stats())
  }
  return response;
};

//get player stats from backend database
export const get_stats = () => async (dispatch) => {

  const response = await fetch(`/api/stats`, {
  method: "GET",
  })

  const statsData = await response.json()

  // console.log("STATS:", statsData)
  dispatch(add(statsData))


};

export const get_single_player_stats = (player) => async (dispatch) => {
  // console.log("PLAYER: ", player)
  const response = await fetch(`/api/stats/players/${player.mlb_player_id}`, {
    method: "GET",
  });

  const result = await response.json();
  // console.log("RESULT: ", result)
  return result;
};

export const update_season_stats = () => async (dispatch) => {

  const response = await fetch(`/api/stats/update`, {
  method: "GET",
  })

  const data = await response.json()

};

/* ----------------------------------------------------------------------------
                          STATS REDUCER
------------------------------------------------------------------------------*/

const initialState = { stats: [] };

const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYERS_SEASON_STATS:
      let newState = {...state};
      newState.stats = action.data;
      return newState;
    default:
      return state;
  }
};

export default statsReducer;