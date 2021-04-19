const GET_TEAM_SEASON_STATS = "stats/team/seasons/GET";
const GET_TEAM_GAME_STATS = "stats/teams/games/GET";
const GET_PLAYER_SEASON_STATS = "stats/players/seasons/GET";
const GET_PLAYER_GAME_STATS = "stats/players/games/GET";
const GET_CAREER_HITTING_STATS = "stats/players/career/hitting/GET";
const GET_CAREER_PITCHING_STATS = "stats/players/career/pitching/GET";

const ADD_TEAM_SEASON_STATS = "stats/team/seasons/ADD";
const ADD_TEAM_GAME_STATS = "stats/teams/games/ADD";
const ADD_PLAYERS_SEASON_STATS = "stats/players/seasons/ADD";
const ADD_PLAYER_GAME_STATS = "stats/players/games/ADD";
const ADD_CAREER_HITTING_STATS = "stats/players/career/hitting/ADD";
const ADD_CAREER_PITCHING_STATS = "stats/players/career/pitching/ADD";

const add = (playerStats, season) => ({
  type: ADD_PLAYERS_SEASON_STATS,
  data: playerStats,
  season: season,
});

// const players = [641355, 572041, 608369, 621035, 457759, 605131]

// const player = 641355;
// const season = 2017;
// const gameType = "R";

export const get_stats_from_backend = (players, season, gameType) => async dispatch => {
  const responses = players.map(player => fetch (`/api/stats/game_type/${gameType}/season/${season}/players/${player.player_id}`, {
    method: "GET",
  }));

  console.log("HELLO")
  // const data = await response.json()

  console.log("BACKEND REPLY: ", responses)

  const resolvedResponses = await Promise.all(responses);
  console.log("RESOLVED RESPONSES: ", resolvedResponses)
  const playerSats = resolvedResponses.map(response => response.json());
  const resolvedPlayerStats = await Promise.all(playerSats);

  const resolvedStatsList = []
  resolvedPlayerStats.forEach(stats => resolvedStatsList.push(stats))
  const allPlayerStats = []
console.log("RESOLVED STATS LIST: ", resolvedStatsList)
  resolvedStatsList.forEach(playerStat =>{
    if (playerStat.sport_hitting_tm.queryResults.row) {
      allPlayerStats.push(playerStat.sport_hitting_tm.queryResults.row)
    }
  })
console.log("MARKER 5")
  dispatch(add(allPlayerStats, season))
  console.log("MARKER 6") 

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
      console.log("MARKER 7")
      let newState = {...state};
      console.log("MARKER 8")
      newState.stats = action.data;
      console.log("MARKER 9")
      return newState;
    default:
      return state;
  }
};

export default statsReducer;