const englishPremierLeague = require("../models/EnglishTeams");

const router = require('express').Router();



router.post('/', async (req, res) => {
     const newEnglishTeam = new englishPremierLeague(req.body);
     try {
          const savedteam = await newEnglishTeam.save();
          res.status(200).json(savedteam);
         
        } catch (err) {
          res.status(500).json(err);
        }
})


// GEt EACH CLUB IN PREMIER LEAGUE.....
router.get('/find/:id',async (req, res) =>{
  try{
     const newEnglishTeam = await englishPremierLeague.findById(req.params.id)
     res.status(200).json(newEnglishTeam)
  }catch (error) {
    res.status(500).json(error)
  }
});

// GET ALL ENGLISH_PREMIER_LEAGUE
router.get("/", async (req, res) => {
  const qnew = req.query.new;
  const qclubName = req.query.teamName;

  try {
  let clubs;
  if(qnew){
    clubs = await englishPremierLeague.find().sort({
      createdAt: -1}).limit(1);
  
  }  else if (qclubName) {
    clubs = await englishPremierLeague.find({
      teamName: {
        $in: [qleagueName],   
    },
  });
  } else {
    clubs = await englishPremierLeague.find();

  }
  res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json(error);
  }
})



module.exports = router;