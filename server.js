const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const EnglishClubRoutes = require('./routes/englishPeremierleague');
const leagueRoutes = require('./routes/league');
const ArsenalPlayersRoutes = require('./routes/arsenalPlayers');


dotenv.config();


mongoose.connect(process.env.MONGO_DB
    
    ) .then(() => {
        console.log('connected to db')
     })
     .catch((error) => {
          console.log(error)
     })



     
     app.use(morgan('dev'))
     app.use(express.json());
     app.use('/api/premierleague', EnglishClubRoutes);
     app.use('/api/leagues', leagueRoutes);
     app.use('/api/arsenalplayer',ArsenalPlayersRoutes);

     






app.listen(process.env.PORT || 7000 , () =>{
     console.log('Running on prot 7000...');
});




