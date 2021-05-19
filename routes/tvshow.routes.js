const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const WishList = require("../models/WhishList.model");
const Show = require("../models/Show.model");
const User = require("../models/User.model");

// router.post("/tvshows/:showName/add-to-wishlists", (req, res, next) => {
//   res.status(400).json({ message: "Route is still not completed..."})
// })

router.post("/:showName/add-to-watchedList", (req, res, next) => {
  const { showName } = req.params;
  
  if (!req.user) {
    res.status(400).json({ message: "There is no user logged in"})
    return;
  } 
  
  Show.findOne( {name: showName} )
  .then((tvShowFound) => {

    return !tvShowFound ? Show.create(req.body) : tvShowFound;
  })
  .then((showResult) => {
    
    return User.findByIdAndUpdate(req.user._id, {$push: {watchedShows: showResult._id}})
  })
  .then((rsl) => {
    
    res.status(200).json(rsl)
  })
  .catch(err => next(err))
})

// router.delete("/:showId", (req, res, next) => {
//   const { showId } = req.params;
  
//   req.user.shows.findByIdAndRemove(showId)
//   .then((removedList) => {
//     res.status(200).json(`Projec with ${removedList._id} id was successfully removed from user's watched list!`);
//   })
//   .catch( err =>{ 
//     res.json(err)
//   })
// })

module.exports = router;