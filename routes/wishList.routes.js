const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const WishList = require("../models/WhishList.model");
const Show = require("../models/Show.model");
const User = require("../models/User.model");

router.post("/create-list", (req, res, next) => {
  const { listName } = req.body;
   
  if (!req.user) {
    res.status(400).json({ message: "There is no user logged in"})
    return;
  }

  if (!listName) {
    res.status(400).json({ message: "Give a name to your new list"})
    return;
  }

  WishList.create({ listName, shows: [], owner: req.user._id }) 
  .then((listCreated) => {
    
    User.findById(req.user._id)
    .then((loggedUserFound) => {
      loggedUserFound.wishLists.push(listCreated);
      return loggedUserFound.save();
    })
    .catch(err => next(err));

    res.status(200).json(listCreated);
  })
  .catch( err => next(err));
})

router.get("/wishlists", (_, res) => {

  const { id } = req.user;

  User.findById(id) 
  .then((userLogged) => {

    res.status(200).json(allLists);
  })
  .catch( err => next(err));
})

router.put("/wishlists/:listId/edit", (req, res, next) => {
  const { listName } = req.body;
  const { listId } = req.params;

  if(!mongoose.Types.ObjectId.isValid(listId)) {
    res.status(400).json({ message: "Specified id is not valid"})
    return;
  }

  WishList.findByIdAndUpdate(listId, { listName }) 
  .then((listUpdated) => {
    res.status(200).json(listUpdated);
  })
  .catch( err => next(err));
})

router.get("/wishlists/:listId", (req, res) => {
  const { listId } = req.params;

  if(!mongoose.Types.ObjectId.isValid(listId)) {
    res.status(400).json({ message: "Specified id is not valid"})
    return;
  }

  WishList.findById(listId)
  .populate("shows")
  .then((listFound) => {
    res.status(200).json(listFound);
  })
  .catch( err =>{ 
    res.json(err)
  })
})

router.delete("/wishlists/:listId/delete", (req, res, next) => {
  const { listId } = req.params;

  if(!mongoose.Types.ObjectId.isValid(listId)) {
    res.status(400).json({ message: "Specified id is not valid"})
    return;
  }

  WishList.findByIdAndRemove(listId)
  .then((removedList) => {
    res.status(200).json(`Projec with ${removedList._id} id was successfully removed!`);
  })
  .catch( err =>{ 
    res.json(err)
  })
})

module.exports = router;