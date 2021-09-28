
const League = require("../models/Leagues");


const router = require("express").Router();



router.post("/add", async (req, res) => {
 const newLeague = new League(req.body);
 try {
      const savedLeague = await newLeague.save();
      res.status(201).json(savedLeague);
           
     } catch (error) {
        res.status(500).json(error)
         
     }
    
});

//GET  EACH LEAGUE

router.get("/find/:id", async (req, res) => {
   try{
const league = await League.findById(req.params.id)
res.status(200).json(league);
   }catch (error){
        res.status(500).json(error);
   }
     
})


//GET ALL LEAGUES
router.get("/", async (req, res) => {
   const qNew = req.query.new;
   const qleagueName = req.query.leagueName;
   try {
      let leagues;

      if(qNew) {
         leagues = await League.find().sort({
            createdAt: -1 }).limit(1);
         
      } else if (qleagueName){
         leagues = await League.find({
            leagueName: {
               $in: [qleagueName],
            },
         })  
      } else {
         leagues = await League.find();
      }
      res.status(200).json(leagues)
   } catch (error) {
      res.status(500).json({
         message: error
      })
   }


})








module.exports = router;