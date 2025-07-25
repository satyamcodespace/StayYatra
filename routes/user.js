const express= require("express");
const router = express.Router();
const User =require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRediretUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router
    .route("/signup")
    .get(userController.renerSignupForm)
    .post(wrapAsync(userController.signup ));


router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(saveRediretUrl, passport.authenticate("local",{
    failureRedirect:'/login' ,  
    failureFlash:true,
    }),
    userController.login 
    );

router.get("/logout",userController.logout);

module.exports=router;