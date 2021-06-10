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

const add = (playerStats, season) => ({
  type: ADD_PLAYERS_SEASON_STATS,
  data: playerStats,
  season: season,
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

  dispatch(add(statsData, season))


};

export const get_single_player_stats = (player) => async (dispatch) => {
  console.log("PLAYER: ", player)
  const response = await fetch(`/api/stats/players/${player.mlb_player_id}`, {
    method: "GET",
  });

  const result = await response.json();
  console.log("RESULT: ", result)
  return result;
};

export const update_season_stats = () => async (dispatch) => {

  const response = await fetch(`/api/stats/update`, {
  method: "GET",
  })

  const data = await response.json()

};

// export const get_stats = () => async (dispatch) => {

//   const response = await fetch(`/api/stats`, {
//   method: "GET",
//   })

//   const data = await response.json()

//   console.log("STATS DATA: ", data)
  
 

  // console.log("HELLO")
  // const data = await response.json()

//   console.log("BACKEND REPLY: ", responses)
//   console.log("PLAYERS: ", players)

//   const resolvedResponses = await Promise.all(responses);
//   console.log("RESOLVED RESPONSES: ", resolvedResponses)
//   const playerSats = resolvedResponses.map(response => response.json());
//   const resolvedPlayerStats = await Promise.all(playerSats);

//   const resolvedStatsList = []
//   resolvedPlayerStats.forEach(stats => resolvedStatsList.push(stats))
//   const allPlayerStats = []
// console.log("RESOLVED STATS LIST: ", resolvedStatsList)
//   resolvedStatsList.forEach(playerStat =>{
//     if (playerStat.sport_hitting_tm.queryResults.row) {
//       allPlayerStats.push(playerStat.sport_hitting_tm.queryResults.row)
//     }
//   })

//   console.log("ALL PLAYER STATS: ", allPlayerStats)

//   // const filteredPlayers = players.filter(player => player.player_id !== undefined)

//   // console.log("FILTERED PLAYERS LENGTH: ", filteredPlayers.length)

//   allPlayerStats.forEach(playerStatObj => {
//     const id = playerStatObj.player_id;
//     console.log("PLAYER ID AND NAME: ", playerStatObj.sport, " and ", id, " and ", playerStatObj.team_abbrev)
//     let flag = true;
//     let i = 0;
//     while(true) {
//       if (players[i] && (players[i].player_id === id)) {
//         playerStatObj.name = players[i].name_display_first_last;
//         flag = false;
//         break;
//       }else {
//         i++;
//       }
//     }
//   })
//   // console.log("BEFORE DISPATCH")
//   dispatch(add(allPlayerStats, season))
  // console.log("AFTER DISPATCH / END OF STATS THUNK") 

// };

// export const get_season_hitting_stats = (gameType, season) => async (dispatch) => { 
//   const responses = players.map(player => fetch(`http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2018'&player_id='${player}'`, {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   }));

//   const resolvedResponses = await Promise.all(responses);

//   const playerSats = resolvedResponses.map(response => response.json());
//   const resolvedPlayerStats = await Promise.all(playerSats);

//   const resolvedStatsList = []
//   resolvedPlayerStats.forEach(stats => resolvedStatsList.push(stats))
//   const allPlayerStats = []
// console.log("RESOLVED STATS LIST: ", resolvedStatsList)
//   resolvedStatsList.forEach(playerStat =>
//     allPlayerStats.push(playerStat.sport_hitting_tm.queryResults.row))
// console.log("MARKER 5")
//   dispatch(add(allPlayerStats, season))
//   console.log("MARKER 6") 
// };

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