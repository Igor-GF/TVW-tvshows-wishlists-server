const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const WishList = require("../models/WhishList.model");
const Show = require("../models/Show.model");
const User = require("../models/User.model");

router.post("/:showName/add-to/:listId", (req, res, next) => {
  const { showName, listId } = req.params;
  
  if (!req.user) {
    res.status(400).json({ message: "There is no user logged in"})
    return;
  } 
  
  Show.findOne( {name: showName} )
  .then((tvShowFound) => {

    return !tvShowFound ? Show.create(req.body) : tvShowFound;
  })
  .then((showResult) => {
    
    return WishList.findByIdAndUpdate(listId, {$push: {shows: showResult._id}})
  })
  .then((rslWishlist) => {
    
    res.status(200).json(rslWishlist)
  })
  .catch(err => next(err))
})

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

router.post("/:showId/:listId/remove", (req, res, next) => {
  const { showId, listId } = req.params;

  if (!req.user) {
    res.status(400).json({ message: "There is no user logged in"})
    return;
  } 
  
  WishList.findByIdAndUpdate(listId, {$pull: {shows: showId}})

  .then((updatedList) => {   
    res.status(200).json(updatedList);
  })
  .catch( err =>{ 
    res.json(err)
  })
})

router.post("/:showId/remove-watched", (req, res, next) => {
  const { showId } = req.params;
  
  if (!req.user) {
    res.status(400).json({ message: "There is no user logged in"})
    return;
  } 
  
  User.findByIdAndUpdate(req.user._id, {$pull: {watchedShows: showId}})

  .then((updatedList) => {   
    res.status(200).json(updatedList);
  })
  .catch( err =>{ 
    res.json(err)
  })
})

module.exports = router;