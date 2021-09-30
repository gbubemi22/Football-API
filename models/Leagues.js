const mongoose = require('mongoose');

const LeagueSchema = new  mongoose.Schema({
     country:{type:String, require: true},
     leagueName: {type:Array, required: true},
     flagImg: {type:String},
     location: {type:String}
         
    },
    {timestamps: true}
    );
    
  
  
 

module.exports = mongoose.model('Leagues', LeagueSchema); 