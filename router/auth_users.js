const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const registered_user = require('./registeredusersdb.js')


const isUserRegistered = (username, password) => { //returns boolean
  //write code to check if username and password match the one we have in records.
  let userswithsamename = registered_user.filter((user) => {
    return user.username === username && user.password===password;
  });
  // Return true if any user with the same username is found, otherwise false
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const {username,password}=req.body
      if (isUserRegistered(username,password)){
          const accesstoken=jwt.sign({user:username},"access",{expiresIn:60*60})
          req.session.authorization={accesstoken,username}
          res.status(200).send("Successfully logged in")
      }
      else{
          res.status(400).send("Invalid Login")
      }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn=req.params.isbn
  const username=req.session.authorization.username
  let book=books[parseInt(isbn)]
  let review=book["review"]
  let addedReview={...review,username:req.body.review}
  book["review"]=addedReview
  books[parseInt(isbn)]=book
  res.send('Added book review successfully')

});




module.exports.authenticated = regd_users;


