const ChelseaFc = require("../models/ChelseaFc");

const router = require('express').Router();


// CREATE CHELSEA PLAYER
router.post('/', async (req, res) => {
     const newPlayer = new ChelseaFc(req.body);
     try {
          const savedPlayer = await newPlayer.save();
          res.status(201).json(savedPlayer);
         
        } catch (err) {
          res.status(500).json(err);
        }
})


// GEt EACH PLAYER IN CHELSEA.....
router.get('/find/:id',async (req, res) =>{
  try{
     const savedPlayer = await ChelseaFc.findById(req.params.id)
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

// GET ALL CHELSEA PLAYERS
router.get("/", async (req, res) => {
  const qnew = req.query.new;
  const qplayerName = req.query.playerName;

  try {
  let players;
  if(qnew){
    players = await ChelseaFc.find().sort({
      createdAt: -1}).limit(5);
  
  }  else if (qplayerName) {
    players = await ChelseaFc.find({
      teamName: {
        $in: [qleagueName],   
    },
  });
  } else {
    players = await ChelseaFc.find();

  }
  res.status(200).json(players);
  } catch (error) {
    res.status(500).json(error);
  }
})



module.exports = router;