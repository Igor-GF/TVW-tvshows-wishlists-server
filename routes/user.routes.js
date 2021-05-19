const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const WishList = require("../models/WhishList.model");

router.get("/profile", (req, res) => {
  
  if (!req.user) {
    res.status(400).json({ message: "There is no user logged in"})
    return;
  }

  User.findById(req.user._id)
  .populate("wishLists")
  .then((loggedUser) => {
    res.status(200).json(loggedUser);
  })
  .catch(err => console.error(err));
})


router.put("/profile/edit", (req, res, next) => {
  
  if (!req.user) {
    res.status(400).json({ message: "There is no user logged in"})
    return;
  }

  User.findByIdAndUpdate(req.user._id, req.body)
  .then((updatedUser) => {
    res.status(200).json(updatedUser);
  })
  .catch(err => next(err));  
})

router.delete("/profile/delete", (req, res, next) => {
  
  if (!req.user) {
    res.status(400).json({ message: "There is no user logged in"})
    return;
  }
  
  User.findByIdAndRemove(req.user._id)
  .then((removedUser) => {
    res.status(200).json(`User profile with ${removedUser._id} id was successfully removed!`);
  })
  .catch( err =>{ 
    res.json(err)
  })
})

module.exports = router;