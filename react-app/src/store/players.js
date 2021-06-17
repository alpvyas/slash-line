import { update_stats } from "./stats";

// team ids for MLB DATA API
export const teams = [
                  {
                    team: "ATL",
                    id: 144,
                  },
                  { team: "MIA", 
                    id: 146,
                  },
                  { team: "NYM",
                    id: 121,
                  },
                  { team: "PHI",
                    id: 143,
                  },
                  { team: "WSH",
                    id: 120,
                  },
                  { team: "CHC",
                    id: 112,
                  },
                  { team: "CIN",
                    id: 113,
                  },
                  { team: "MIL",
                    id: 158,
                  },
                  { team: "PIT",
                    id: 134,
                  },
                  { team: "STL",
                    id: 138,
                  },
                  { team: "ARI",
                    id: 109,
                  },
                  { team: "COL",
                    id: 115,
                  },
                  { team: "LAD",
                    id: 119,
                  },
                  { team: "SD",
                    id: 135,
                  },
                  { team: "SF",
                    id: 137,
                  },
                  { team: "BAL",
                    id: 110,
                  },
                  { team: "BOS",
                    id: 111,
                  },
                  { team: "NYY",
                    id: 147,
                  },
                  { team: "TB",
                    id: 139,
                  },
                  { team: "TOR",
                    id: 141,
                  },
                  { team: "CWS",
                    id: 145,
                  },
                  { team: "CLE",
                    id: 114,
                  },
                  { team: "DET",
                    id: 116,
                  },
                  { team: "KC",
                    id: 118,
                  },
                  { team: "MIN",
                    id: 142,
                  },
                  { team: "HOU",
                    id: 117,
                  },
                  { team: "LAA",
                    id: 108,
                  },
                  { team: "OAK",
                    id: 133,
                  },
                  { team: "SEA",
                    id: 136,
                  },
                  { team: "TEX",
                    id: 140,
                  },
                  
];

/* ----------------------------------------------------------------------------
                          ACTION TYPES
------------------------------------------------------------------------------*/

const ADD_PLAYERS = "players/ADD";

/* ----------------------------------------------------------------------------
                          ACTION CREATORS
------------------------------------------------------------------------------*/

const add = (allPlayers) => ({
    type: ADD_PLAYERS,
    roster: allPlayers
});


/* ----------------------------------------------------------------------------
                          THUNK ACTION CREATORS
------------------------------------------------------------------------------*/

//update players --scheduled
export const update_players = () => async (dispatch) => {

  const players = await dispatch(get_roster_40());

  if (players) {
    dispatch(post_players(players));
    return true;
  }
};

//post updated players to backend database
export const post_players = (players) => async (dispatch) => {
  const response = await fetch('/api/players/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(players)
    })

  if (response) {
    const message = await response.json();
    console.log(message);
    dispatch(update_stats());
  }
};

//gets player data from backend
export const get_players = () => async (dispatch) => {
  const response = await fetch("/api/players", {
    method: "GET"
  })

  const responseObject = await response.json()

  const players = responseObject.players

  dispatch(add(players));
};

//gets player data from MLB Data API
//data comes as a roster of 40 player objects for each team
export const get_roster_40 = () => async (dispatch) => {
  //calling the API for each team and saving all responses in a variable
  const responses = teams.map(team => fetch(
  `http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id='${team.id}'`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  }))

  //Following 5 lines resolves the responses and adds each player to an array of
  //all players
  const resolvedResponses = await Promise.all(responses);
 
  const rosterObjects = resolvedResponses.map(response => response.json());

  const resolvedRosterObjects = await Promise.all(rosterObjects);

  const allPlayers = [];
  
  resolvedRosterObjects.forEach(roster => allPlayers.push(...roster.roster_40.queryResults.row))
  
  //adding all players to state
  dispatch(add(allPlayers));
  
  return allPlayers;
};

/* ----------------------------------------------------------------------------
                          PLAYERS REDUCER
------------------------------------------------------------------------------*/

const initialState = { players: [] };

const playersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYERS:
      let newState = {...state, };
      newState.players = action.roster;
      return newState;
    default:
      return state;
  }
};

export default playersReducer;