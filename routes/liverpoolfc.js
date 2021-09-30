const Liverpool_FC = require("../models/LiverpoolFC");

const router = require('express').Router();


// POST PLAYERS TO CLUB
router.post('/', async (req, res) => {
     const newPlayer = new Liverpool_FC(req.body);
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
     const savedplayer = await Liverpool_FC.findById(req.params.id)
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
    players = await Liverpool_FC.find().sort({
      createdAt: -1}).limit(5);
  
  }  else if (qplayername) {
    clubs = await Liverpool_FC.find({
      playerName: {
        $in: [qplayername],   
    },
  });
  } else {
    clubs = await Liverpool_FC.find();

  }
  res.status(200).json(players);
  } catch (error) {
    res.status(500).json(error);
  }
})



module.exports = router;