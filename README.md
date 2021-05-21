# Slash Line

By Alpesh Vyas
[Visit Slash Line]()

## Slash Line at a Glance

Slash Line is a fullstack fantasy baseball app where users can create leagues and teams using real-time MLB team, player and game data and statistics.

Slash Line is integrated with the MLB Data API used for player information and statistics as well as SportsDataAPI which was used for live game scores and data.

## Basic Setup

_IMPORTANT!_
If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
You can do this by running:

```bash
pipenv lock -r > requirements.txt
```

_ALSO IMPORTANT!_
psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.

---

## Deploy to Heroku

1. Create a new project on Heroku
2. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
3. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
4. Run

    ```bash
    heroku login
    ```

5. Login to the heroku container registry

    ```bash
    heroku container:login
    ```

6. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"
7. Push your docker container to heroku from the root directory of your project.
   This will build the dockerfile and push the image to your heroku container registry

    ```bash
    heroku container:push web -a {NAME_OF_HEROKU_APP}
    ```

8. Release your docker container to heroku

    ```bash
    heroku container:release web -a {NAME_OF_HEROKU_APP}
    ```

9. set up your database:

    ```bash
    heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade
    heroku run -a {NAME_OF_HEROKU_APP} flask seed all
    ```

10. Under Settings find "Config Vars" and add any additional/secret .env variables.

11. profit
