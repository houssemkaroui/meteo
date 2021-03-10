# Working with React and Node JS and PostgreSQL

## About the project
This project utlizes both react and node js to create a application meteo from city.

React is used to render the front end (app) and renders on port 3000.
Node js is used to create the back end (server) which holds all the data.


## Set up
To set up the project you need to install all the node modules in both of the projects
```sh
$ cd client
$ npm install
$ 
$ npm install
$ cd app/config
Modify config.js: PASSWORD: "your postgresql password" and DB: "your database name"
```

## Running the projects
For this to work you need to have both the node server and the react project running.
### Start the server
To start the server you need to call these commands
```sh

$ node server.js
```
This server should now be running on port 8080.


### Start the App
To start the app you need to call 
```sh
$ cd client
$ npm start
```
This will start the react application on port 3000.

