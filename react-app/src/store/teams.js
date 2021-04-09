import { useState } from "react";

const GET_TEAMS = "teams/GET";
const ADD_TEAM = "teams/ADD";

const add = (teamData) => ({
  type: ADD_TEAM,
  data: teamData
});

export const get_league_teams = (leagueId) => async (dispatch) => { 
  const response = await fetch(`/api/leagues/${leagueId}/teams`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  });

  const teams = await response.json();

  if (response.ok && !teams.errors) {
    return teams.teams;
  };
};

const initialState = { teams: [] };

const teamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TEAM:
      let newState = {...state};
      newState.teams = [...state, ...action.data];
      return newState;
    default:
      return state;
  }
};

export default teamsReducer;