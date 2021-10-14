const ManCityFc = require("../models/ManCityFc");

const router = require('express').Router();


// POST PLAYERS TO CLUB
router.post('/', async (req, res) => {
     const newPlayer = new ManCityFc(req.body);
     try {
          const savedPlayer = await newPlayer.save();
          res.status(201).json(savedPlayer);
         
        } catch (err) {
          res.status(500).json(err);
        }
})


// GEt EACH PLAYER IN MANCITY.....
router.get('/find/:id',async (req, res) =>{
  try{
     const savedPlayer = await ManCityFc.findById(req.params.id)
     if(!savedPlayer) {
      return res.status(404).json({
        message: 'player not found'
      })
    }
     res.status(200).json(savedPlayer)
  }catch (error) {
    res.status(500).json(error)
  }
});

// GET ALL PLAYER IN MANCITY
router.get("/", async (req, res) => {
  const qnew = req.query.new;
  const qplayerName = req.query.playerName;

  try {
  let players;
  if(qnew){
    players = await ManCityFc.find().sort({
      createdAt: -1}).limit(5);
  
  }  else if (qplayerName) {
    players = await ManCityFc.find({
      playerName: {
        $in: [qplayerName],   
    },
  });
  } else {
    players = await ManCityFc.find();

  }
  res.status(200).json(players);
  } catch (error) {
    res.status(500).json(error);
  }
})



module.exports = router;