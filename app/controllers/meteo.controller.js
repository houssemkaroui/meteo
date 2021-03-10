const db = require("../models");
const Meteo = db.meteos;
const express = require("express");
const router = express.Router();
var axios = require("axios").default;
const Config = require("../config/config.js");


//create city meteo
router.post('/city', (req, res) =>{
  var city = req.body.city
  var country =req.body.country
  var options = {
      method: 'GET',
      url: Config.URL,
      params: {
        q: city,country,
        cnt: "1",
        mode: 'null',
        lon: '0',
        type: 'link, accurate',
        lat: '0',
        units: 'imperial, metric'
      },
      headers: {
        'x-rapidapi-key': Config.KEY,
        'x-rapidapi-host': Config.METEOURL
      }
    };
    axios.request(options).then(function (response) {
      
        let data = response.data.list.map((meteo) => {
          return {
            country:country,
            ville:city,
            temperature : meteo.main.temp,
            humidity : meteo.main.humidity,
            nuages:response.data.list[0].clouds.all,
            perssion:meteo.main.pressure,
            vitesseVent:meteo.wind.speed,
            longitude :response.data.list[0].coord.lon,
            latitude:response.data.list[0].coord.lat
            
          } 
        })
        var meteo= data[0]
        Meteo.create(meteo)
        .then(result=>{
          res.send(result)
        })
         .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred  ."
          });
        });
    }).catch(function (error) {
        
        res.send({message:"err"})
    });
  
});


module.exports = router