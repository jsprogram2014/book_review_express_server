const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;


const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

//code for making sure only authorized user can access the protected resource
app.use("/customer/auth/*",function verify(req,res,next){
    if(req.session.authorization){
        const token=req.session.authorization.accesstoken
        jwt.verify(token,"access",(err,user)=>{
            if(!err){
                req.user=user
                next()
            }
            else{
                res.status(400).send('Token got expired or manipulated')
            }
        })
    }
})
 
const PORT =5001;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
