import { store } from "../index";

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

const add = (playerStats, season) => ({
  type: ADD_PLAYERS_SEASON_STATS,
  data: playerStats,
  season: season,
});

const season = 2021;
const gameType = "R";

export const get_single_player_stats = (player) => async (dispatch) => {
  const response = await fetch(`/api/stats/game_type/${gameType}/season/${season}/players/${player.player_id}`, {
    method: "GET",
  });

  const resolvedResponse = await Promise.resolve(response);

  // const result = await response.json();

  const playerStats = await resolvedResponse.json();

  const resolvedPlayerStats = await Promise.resolve(playerStats);

  // return result

  return resolvedPlayerStats.sport_hitting_tm.queryResults.row;
};

export const get_stats_from_backend = () => async (dispatch, getState) => {

  const state = getState();
  const players = state.players.players;

  const response = fetch(`api/stats`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  })
  
  // const responses = players.map(player => fetch(`/api/stats/game_type/${gameType}/season/${season}/players/${player.player_id}`, {
  //   method: "GET",
  // }));

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

};

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

const initialState = { stats: [] };

const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYERS_SEASON_STATS:
      let newState = {...state};
      newState.stats = action.data;
      console.log("newState.stats UPDATED")
      return newState;
    default:
      return state;
  }
};

export default statsReducer;