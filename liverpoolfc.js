const LiverpoolFC = require("../models/LiverpoolFC");

const router = require('express').Router();


// POST PLAYERS TO CLUB
router.post('/', async (req, res) => {
     const newPlayer = new LiverpoolFC(req.body);
     try {
          const savedplayer = await newPlayer.save();
          res.status(201).json(savedplayer);
         
        } catch (err) {
          res.status(500).json(err);
        }
})


// GEt EACH CLUB IN LIVERPOOL.....
router.get('/find/:id',async (req, res) =>{
  try{
     const savedplayer = await LiverpoolFC.findById(req.params.id)
     if(!savedplayer) {
      return res.status(404).json({
        message: 'player not found'
      })
    }
     res.status(200).json(savedplayer)
  }catch (error) {
    res.status(500).json(error)
  }
});

// GET ALL PLAYER IN LIVERPOOL
router.get("/", async (req, res) => {
  const qnew = req.query.new;
  const qplayername = req.query.playerName;

  try {
  let players;
  if(qnew){
    players = await LiverpoolFC.find().sort({
      createdAt: -1}).limit(5);
  
  }  else if (qplayername) {
    clubs = await LiverpoolFC.find({
      playerName: {
        $in: [qplayername],   
    },
  });
  } else {
    clubs = await LiverpoolFC.find();

  }
  res.status(200).json(players);
  } catch (error) {
    res.status(500).json(error);
  }
})



module.exports = router;