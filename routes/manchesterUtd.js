const ManchesterUTD = require("../models/ManchesterUTD");

const router = require('express').Router();

// POST PLAYER TO CLUB
router.post('/', async (req, res) => {
     const newPlayer = new ManchesterUTD(req.body);
     try {
          const savedplayer = await newPlayer.save();
          res.status(201).json(savedplayer);
         
        } catch (err) {
          res.status(500).json(err);
        }
})


// GEt EACH CLUB IN PREMIER LEAGUE.....
router.get('/find/:id',async (req, res) =>{
  try{
     const savedplayer = await ManchesterUTD.findById(req.params.id)
     res.status(200).json(savedplayer)
  }catch (error) {
    res.status(500).json(error)
  }
});

// GET ALL ENGLISH_PREMIER_LEAGUE
router.get("/", async (req, res) => {
  const qnew = req.query.new;
  const qplayername = req.query.playerName;

  try {
  let players;
  if(qnew){
    players = await ManchesterUTD.find().sort({
      createdAt: -1}).limit(5);
  
  }  else if (qplayername) {
    players = await ManchesterUTD.find({
      playerName: {
        $in: [qplayername],   
    },
  });
  } else {
    players = await ManchesterUTD.find();

  }
  res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json(error);
  }
})



module.exports = router;