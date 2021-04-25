module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "houssem",
  DB: "testdb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  URL:"https://community-open-weather-map.p.rapidapi.com/find",
  KEY:"144f20b125mshe914be74b1f3bacp199ccbjsna20e5f7d4fb6",
  METEOURL:"community-open-weather-map.p.rapidapi.com"

};
