const mongoose = require('mongoose');

const ClubSchema =  mongoose.Schema({
  league_id:{type:String,required: true},
  teamName:{type:Array,required: true, unique: true}, 
  nickName:{type:String,required: true, unique: true},
  location:{type:String}
  },
  { timestamps: true }
  );
  
   

module.exports = mongoose.model('EnglishTeams', ClubSchema); 