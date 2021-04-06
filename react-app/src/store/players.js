
export const team_ids = {
                  ATL: {
                    id: 144,
                  },
                  MIA: {
                    id: 146,
                  },
                  NYM: {
                    id: 121,
                  },
                  PHI: {
                    id: 143,
                  },
                  WSH: {
                    id: 120,
                  },
                  CHC: {
                    id: 112,
                  },
                  CIN: {
                    id: 113,
                  },
                  MIL: {
                    id: 158,
                  },
                  PIT: {
                    id: 134,
                  },
                  STL: {
                    id: 138,
                  },
                  ARI: {
                    id: 109,
                  },
                  COL: {
                    id: 115,
                  },
                  LAD: {
                    id: 119,
                  },
                  SD: {
                    id: 135,
                  },
                  SF: {
                    id: 137,
                  },
                  BAL: {
                    id: 110,
                  },
                  BOS: {
                    id: 111,
                  },
                  NYY: {
                    id: 147,
                  },
                  TB: {
                    id: 139,
                  },
                  TOR: {
                    id: 141,
                  },
                  CWS: {
                    id: 145,
                  },
                  CLE: {
                    id: 114,
                  },
                  DET: {
                    id: 116,
                  },
                  KC: {
                    id: 118,
                  },
                  MIN: {
                    id: 142,
                  },
                  HOU: {
                    id: 117,
                  },
                  LAA: {
                    id: 108,
                  },
                  OAK: {
                    id: 133,
                  },
                  SEA: {
                    id: 136,
                  },
                  TEX: {
                    id: 140,
                  },
                  
                };

export const get_roster_40 = (team_id) => async (dispatch) => { const response = 
  await fetch(
  `http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id='${team_id}'`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  })

  const roster = await response.json();

  // if (response.ok && !roster.errors) {
  //   dispatch(setSomething(roster));
  // }
  return roster.roster_40.queryResults.row;
};