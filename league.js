
const Leagues = require("../models/Leagues");   


const router = require("express").Router();


// CREATE LEAGUE
router.post("/add", async (req, res) => {
 const newLeague = new Leagues(req.body);
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
const league = await Leagues.findById(req.params.id)
if(!league) {
   return res.status(404).json({
     message: 'league not found'
   })
 }
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
      let league;

      if(qNew) {
         league = await Leagues.find().sort({
            createdAt: -1 }).limit(5);
         
      } else if (qleagueName){
         league = await Leagues.find({
            leagueName: {
               $in: [qleagueName],
            },
         })  
      } else {
         league = await Leagues.find();
      }
      res.status(200).json(leagues)
   } catch (error) {
      res.status(500).json({
         message: error
      })
   }


})








module.exports = router;