const express = require('express');
const route = express.Router();
const users = require('../utility/constant')

// get all the users
route.get("/", (req, res) => {
    res.send(users);
  });
  
  // get user by it's id
  route.get("/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((person) => {
      return person.id === userId;
    });
  
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
  
    res.json(user);
  });
  
  // create user
  
  route.post("/", (req, res) => {
    const { name, email } = req.body;
  
    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are requied",
      });
    }
  
    const newUser = {
      id: users.length + 1,
      name,
      email,
    };
  
    users.push(newUser);
    res.status(201).json(newUser);
  });
  
  // update
  
  route.put("/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
  
    let user = users.find((person) => {
      return person.id === userId;
    });
  
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
  
    user.name = name;
    user.email = email;
  
    res.json(user);
  });
  
  // Delete User
  
  route.delete("/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex((person) => {
      return person.id === userId;
    });
  
    if (userIndex === -1) {
      return res.status(404).json({
        message: "User not found",
      });
    }
  
    users.splice(userIndex, 1);
  
    res.status(204).send();
  });

  module.exports = route;