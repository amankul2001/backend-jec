const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Developer = require('./models/developer');
const bcrypt = require('bcrypt')

passport.use(

    new LocalStrategy(async (username , password , done)=>{
        try {
            console.log("recived", username, password);

            const user = await Developer.findOne({username:username});

            if(!user){
                return done(null , false , {message:"Incorrect username"})
            }

            // const isPasswordMatch = user.password === password ? true : false;
            const isPasswordMatch = await bcrypt.compare(password , user.password)
            // const isPasswordMatch = await user.com

        // password === $2b$10$ewdbmFHISpx5W5lhUIr5duyBiKGUmksGa1RxVwcaQqVNTXOTAqqFW

            if(isPasswordMatch){
                return done(null, user)
            }else{
                return done(null, false, {message:"Incorrect Password"})
            }
        } catch (error) {
            done(error);
        }
    })
);


app.use(passport.initialize());

module.exports = passport;