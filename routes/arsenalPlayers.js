const router = require('express').Router()

const Player = require('../models/ArsenalPlayers');

// CREATE NEW PLAYER
router.post('/', async(req, res) => {
     const newPlayer =  new Player(req.body)
   try {
   const savedPlayer = await newPlayer.save();
   res.status(201).json(savedPlayer)
   } catch (error) {
        res.status(500).json(error)
   }
})  


// GET EACH PLAYER
router.get('/find/:id', async(req, res) => {
     try {
      const newPlayer = await Player.findById(req.params.id)
      res.status(200).json(newPlayer)    
     } catch (error) {
          res.status(500).json(error)
     }
})



//GET ALL PLAYERS

router.get('/', async(req, res) => {
   const qNew = req.query.new;
    const qArsenalplayer = req.query.playerName;
    try {
         let players;
        

         if(qNew){
          players = await Player.find().sort({
            createdAt: -1}).limit(1);
        
        }  else if (qArsenalplayer) {
          players = await Player.find({
            playerName: {
              $in: [qArsenalplayer],   
          },
        });
        } else {
          players = await Player.find();
          
        }
        res.status(200).json(players);
    } catch (error) {
         res.status(500).json(error)
    } 
})











module.exports = router;