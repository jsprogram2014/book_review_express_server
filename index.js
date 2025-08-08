const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const registered_user=require('./router/general.js').registered_user

const app = express();

app.use(express.json());

// Check if a user with the given username already exists
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = registered_user.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}


app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    const {username,password}=req.body
    if (doesExist(username)){
        const token=jwt.sign({user:username},"access",{expiresIn:60*60})
        req.session.authorization={token,username}
        res.status(200).send("Successfully logged in")
    }
    else{
        res.status(400).send("Invalid Login")
    }
});
 
const PORT =5001;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
