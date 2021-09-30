const mongoose = require('mongoose');

const PlayresSchema =  mongoose.Schema({
  team_id:{type:String,required: true},
  league_id:{type:String,required: true},
  playerName:{type: String ,required: true, unique: true}, 
  age:{type:Number,required: true},
  nationality:{type:String},
  position:{type:String},
  number:{type:Number},
  isCaptain:{
       type: Boolean,
       default: false,
  },

  },
  { timestamps: true }
  );
  
   

module.exports = mongoose.model('LiverpoolFC', PlayresSchema); 