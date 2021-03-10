module.exports = (sequelize, Sequelize) => {
  const Meteo = sequelize.define("meteo", {
    country:{
      type:Sequelize.STRING
    },
    ville: {
      type: Sequelize.STRING
    },
    temperature: {
      type: Sequelize.REAL
    },
    humidity: {
      type: Sequelize.REAL
    },
    perssion:{
      type:Sequelize.REAL
    },
    nuages:{
      type:Sequelize.REAL
    },
    vitesseVent:{
      type:Sequelize.REAL
    },
    longitude :{
      type:Sequelize.REAL
    },
    latitude:{
      type:Sequelize.REAL
    }
   
  });

  return Meteo;
};
