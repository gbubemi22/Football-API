const ManCity_Fc = require("../models/ManCityFc");

const router = require('express').Router();


// POST PLAYERS TO CLUB
router.post('/', async (req, res) => {
     const newPlayer = new ManCity_Fc(req.body);
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
     const savedPlayer = await ManCity_Fc.findById(req.params.id)
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
    players = await ManCity_Fc.find().sort({
      createdAt: -1}).limit(5);
  
  }  else if (qplayerName) {
    players = await ManCity_Fc.find({
      playerName: {
        $in: [qplayerName],   
    },
  });
  } else {
    players = await ManCity_Fc.find();

  }
  res.status(200).json(players);
  } catch (error) {
    res.status(500).json(error);
  }
})



module.exports = router;