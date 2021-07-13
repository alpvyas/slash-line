# Slash Line
*By Alpesh Vyas - [Visit Slash Line](http://slashlinebaseball.herokuapp.com/)*

**Table of Contents**
* [Slash Line at a Glance](#slashline-at-a-glance)
* [Application Architecture & Technologies Used](#application-architecture) 
* [Frontend Overview](#frontend-overview)
* [Backend Overview](#backend-overview)
* [Conclusion & Next Steps](#conclusion-and-next-steps)

## Slash Line at a Glance
Slash Line is a fullstack fantasy baseball app that integrates real-time player, stats and game data which allows users to create and join public or private leagues, draft and trade for their favorite players and keep up with player and team stats and live updating game data.

Slash Line uses React, Redux and both vanilla CSS and Material-UI components on the frontend. Flask and SQLAlchemy are used on the backend to connect the app to a PostgreSQL database. 

Users can search and explore the player and player stats data tables, which feature apporximately 1,200 players, using the integrated search box. Users can also filter data by column.

##### Slash Line at a glance
![Slash Line at a glance](/readme-resources/rappa-mappa-demo-1.gif)

Slash Line is also integrated with the [MLB Data API](https://appac.github.io/mlb-data-api-docs/) for player, team and stats data. The MLB API from [Sports Data IO](https://sportsdata.io/developers/api-documentation/mlb) for live game data used to update current game scores, innings and game status and times. 

##### Slash Line player data table
![Slash Line player data table](/readme-resources/rappa-mappa-demo-2.gif)

##### Slash Line stats data table
![Slash Line stats data table](/readme-resources/rappa-mappa-demo-2.gif)

##### Slash Line game carousel
![Slash Line game carousel](/readme-resources/rappa-mappa-demo-2.gif)

## Application Architecture
As noted above, Slash Line uses React and Redux on the front end with Flask and PostgreSQL on the backend. The majority of the application logic occurs within front end's [Redux](https://redux.js.org/) store as well as the Flask backend with its interactions with the [MLB Data API](https://appac.github.io/mlb-data-api-docs/) and the MLB API from [Sports Data IO](https://sportsdata.io/developers/api-documentation/mlb). Slash Line uses both the [Material UI framework](https://material-ui.com/) and vanilla CSS3 for styling components. 

The backend serves the frontend, responds to frontend requests, acts as an intermediary to serve MLB data to the frontend, and fetches data from the PostgreSQL database. 

![Slash Line application architecture](https://github.com/alpvyas/slash-line/blob/main/db_images/slashline_architecture.png)

## Frontend Overview
Slash Line is a very frontend heavy application. It makes extensive use of 3rd-party APIs and resources to create a dynamic and data-rich experience. Below are the frontend technologies that make this application possible. 

### Frontend Technologies Used:
#### React
At its core, Slash Line is a React application. It uses much of the core React library and also makes extensive use of the technologies and libraries of the React ecosystem. Without the robust and well-documented React ecosystem, creating Slash Line would have been a substantially more challenging enterprise. 

#### Redux
[Redux](https://redux.js.org/) and the [react-redux](https://react-redux.js.org/) library were used to manage application state and make fetch requests to the server for data. 

All player information and statistics are fetched on page load and kept in the Redux store. While this expensive operation lengthens the initial load time, it also allows for a snappy experience after that load.

