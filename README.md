# Slash Line Baseball

_By Alpesh Vyas - [Visit Slash Line](http://slashlinebaseball.herokuapp.com/)_

**Table of Contents**

-   [Slash Line at a Glance](#slashline-at-a-glance)
-   [Application Architecture & Technologies Used](#application-architecture)
-   [Frontend Overview](#frontend-overview)
-   [Backend Overview](#backend-overview)
-   [Conclusion & Next Steps](#conclusion-and-next-steps)

## Slash Line at a Glance

Slash Line Baseball is a fullstack fantasy baseball app that integrates real-time player, stats and game data which allows users to create and join public or private leagues, draft and trade for their favorite players and keep up with player and team stats and live updating game data.

Slash Line uses React, Redux and both vanilla CSS and Material-UI components on the frontend. Flask and SQLAlchemy are used on the backend to connect the app to a PostgreSQL database as well as top interact with external third-party APIs.

Users can search and explore the player info and player stats data tables, which feature apporximately 1,200 players, using the integrated search box. Users can also filter data by column in ascending or descending order.

##### Slash Line at a glance

![Slash Line at a glance](/readme-resources/rappa-mappa-demo-1.gif)

Slash Line is also integrated with the [MLB Data API](https://appac.github.io/mlb-data-api-docs/) for player, team and stats data. The MLB API from [Sports Data IO](https://sportsdata.io/developers/api-documentation/mlb) for live game data used to update current game scores, innings and game status and times.

##### Slash Line player data table

![Slash Line player data table](/readme_resources/players_table_demo_1.gif)

##### Slash Line stats data table

![Slash Line stats data table](/readme_resources/stats_demo.gif)

##### Slash Line game carousel

![Slash Line game carousel](/readme_resources/carousel_demo.gif)

## Application Architecture

As noted above, Slash Line uses React and Redux on the front end with Flask and PostgreSQL on the backend. The majority of the application logic occurs within front end's [Redux](https://redux.js.org/) store as well as the Flask backend with its interactions with the [MLB Data API](https://appac.github.io/mlb-data-api-docs/) and the MLB API from [Sports Data IO](https://sportsdata.io/developers/api-documentation/mlb). Slash Line uses both the [Material UI framework](https://material-ui.com/) and vanilla CSS3 for styling components.

The backend serves the frontend, responds to frontend requests, acts as an intermediary to serve MLB data to the frontend, and fetches data from the PostgreSQL database.

![Slash Line application architecture](/readme_resources/slashline_architecture.png)

## Frontend Overview

Slash Line is a very frontend heavy application. It makes extensive use of 3rd-party APIs and resources to create a dynamic and data-rich experience. Below are the frontend technologies that make this application possible.

### Frontend Technologies Used:

#### React

At its core, Slash Line is a React application. It uses much of the core React library and also makes extensive use of the technologies and libraries of the React ecosystem. Without the robust and well-documented React ecosystem, creating Slash Line would have been a substantially more challenging enterprise.

#### Redux

[Redux](https://redux.js.org/) and the [react-redux](https://react-redux.js.org/) library were used to manage application state and make fetch requests to the server for data.

All player information and statistics are fetched on page load and kept in the Redux store. While this expensive operation lengthens the initial load time, it also allows for a snappy experience after that load.

Redux also stores user selections such as the current league being viewed, the. current team they are managing or the current selected team they are viewing (users can be members of multiple leagues and therefore have multiple teams). By managing this state in Redux, it provides easy access to the information across components without prop threading. This was particularly important because there were so many components in the application that if too many components were re-rendering constantly because of state change it would cause significant performance issues or crash the application completely. Redux provided a relatively simple way to manage this point of complexity.

Redux also allows for a lot of extendibility if new features are to be implemented (additional feature wish-list discussed in [conclusion](#conclusion-and-next-steps)).

#### Material UI

Slash Line uses a combination of styling done with vanilla CSS and the [Material UI](https://material-ui.com/) framework. Material provides a great library of elegant, responsive components, and tools for refactoring them to the application's need. There is also extensive documentation of Material, which helped resolve the issues that came up during the development process.

Material is also great for mobilize optimizing custom components with its `makeStyles` and `useMediaQuery` hooks. These hooks were particularly useful for making the navbar and popup box responsive to varying device widths.

#### MLB Data API

The [MLB Data API](https://appac.github.io/mlb-data-api-docs/) is absolutely essential to this project. All player information and player statistics were fetched from this API and due to the massive amount of data available through the API future features will be easy to implement. For example, in addition to player season stats MLB Data API can be used to include player career stats among other relevant data.

The API features a truly robust amount of data, of which this application just scratched the surface. However, due to a lack of quality documentation available implementation of the data in this API was at times difficult to navigate. An example of this was getting player data for all active players in the league. The API does not have an endpoint for getting information for all active players at once and player ids were not published. In order to get player data and player stats, I first had to fetch each MLB team's 40 man roster and from that data extract each player's MLB Player ID. Once I had those ids I was then able to make fetch requests for each player's data and stats individually. Because of the the way the API endpoints are structured this made getting the player data and stats an expensive operation.

#### Sports Data API

[Sports Data IO](https://sportsdata.io/developers/api-documentation/mlb) was used to retrieve real time game data.

## Backend Overview

Slash Line uses a Flask server with PostgreSQL as the database. Compared to the frontend, the backend of Slash Line is fairly simple, with the server sending the front end to the client, receiving requests, and sending data to the frontend. Below are the backend technologies used with some notes regarding their implementation.

### Backend Technologies Used

#### Flask

[Flask](https://expressjs.com/) was a natural choice for Slash Line's server-side framework. The minimalism of Flask and the use of Python lent itself to the data heavy responsibilities of Slash Line's server. The server has several routes for players, states, auth, users, leagues, teams and game details.

#### PostgreSQL

[PostgreSQL](https://www.mongodb.com/) was perfect for this project because its collections of JSON-like records made it very easy to store the artist information, which is in JSON object form. The [SQLAlchemy ORM](https://mongoosejs.com/) was used to communicate between the database, hosted in [Heroku PostgreSQL](https://www.mongodb.com/cloud/atlas), and the server.

## Conclusion and Next Steps

Time to break the 4th wall. Slash Line Baseball was a ton of fun to build. I'm a lifelong fan of baseball, so it was an amazing experience getting to combine that passion with my passion for coding and building fun projects.

This also marks the first time that I've built a fullstack app solo, and my first project of significant scope where I originated the idea and brought it into existence. Slash Line has been an incredibly rewarding to create.

While making Slash Line, I got to play with a whole bunch of new technologies and get better at even more. At the beginning of the project, I'd only learned React a few weeks previous, and Redux a couple of weeks before. I've come out of it stronger with both, and eager to continue getting better with React and creating cool stuff with the many amazing libraries and technologies of the React ecosystem.

This was also my first time using Flask (I've previously worked with Express). I really enjoyed how simple and easy it was to get things in motion with Flask and its minimal, lightweight framework showed itself to be very robust and capable of heavy lifting.

**Next Steps:** Next steps for Slash Line may be found in the [project todo list](https://github.com/bpmutter/RappaMappa/blob/master/project-todos.md), where you can also find a somewhat exhaustive list of the tasks of the project development. If you'd like to participate in the further development of SlasH line, [reach out to me (Alpesh Vyas) on Twitter](https://twitter.com/alpvyas). And if you want to support this project financially, please make a contribution to [Black Lives Matter](https://secure.actblue.com/donate/ms_blm_homepage_2019) instead.

Thanks for reading! ✌🏽
