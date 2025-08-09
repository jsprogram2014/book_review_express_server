const express = require('express');
let books = require("./booksdb.js");
let registered_users=require("./registeredusersdb.js")
// let isValid = require("./auth_users.js").isValid;
// let users = require("./auth_users.js").users;

const public_users = express.Router();



// Check if the user with the given username
const doesExist = (username) => {
    // Filter the users array for any user with the same username and password
    let validusers = registered_users.filter((user) => {
        return (user.username === username);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

//code to register customer
public_users.post("/register", (req,res) => {
  //Write your code here
  const {username,password}=req.body

  if(!username || !password){
    res.status(400).json({message:"Please make sure both fields are filled"})
  }
  if(!doesExist(username)){
    registered_users.push({username,password})
    res.send("You have been successully registered")
  }
  else{
    res.sendStatus(400).send('Please try another username')
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn=req.params.isbn
  let book=books[parseInt(isbn)]
  return res.send(book)
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
// module.exports.registered_users=registered_users
