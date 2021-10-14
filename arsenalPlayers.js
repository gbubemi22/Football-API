const router = require('express').Router()

const ArsenalPlayers = require('../models/ArsenalPlayers');

// CREATE NEW PLAYER
router.post('/', async(req, res) => {
     const newPlayer =  new ArsenalPlayers(req.body)
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
      const playerName = await ArsenalPlayers.findById(req.params.id)
      if(!playerName) {
          return res.status(404).json({
            message: 'player not found'
          })
        }
      res.status(200).json(playerName)    
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
          players = await ArsenalPlayers.find().sort({
            createdAt: -1}).limit(5);
        
        }  else if (qArsenalplayer) {
          players = await ArsenalPlayers.find({
            playerName: {
              $in: [qArsenalplayer],   
          },
        });
        } else {
          players = await ArsenalPlayers.find();
          
        }
        res.status(200).json(players);
    } catch (error) {
         res.status(500).json(error)
    } 
})











module.exports = router;