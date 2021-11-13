
const express         = require('express');
const router          = express.Router();
const passport        = require('passport');

// importing async handler to avoid try catch
const asyncHandler = require('../middlewares/asyncHandler');

// importing rate limiter
const rateLimit = require('../middlewares/ratelimiter');

// includes
const AuthController  = require('./../controllers/auth');

// importing passport jwt middleware
require('./../middlewares/authenticate')(passport);

const authenticate = passport.authenticate('jwt',{session:false, failWithError:true});


// Register the User
router.post('/register',asyncHandler(AuthController.Signup)); 

// Login
router.post('/login',rateLimit,asyncHandler(AuthController.Login)); 

// Token Fetch
router.get('/token',authenticate,asyncHandler(AuthController.Refresh_Token)); 

// New Password
router.post('/newpass',authenticate,asyncHandler(AuthController.New_Password)); 

// Reset Password
router.post('/reset',authenticate,asyncHandler(AuthController.Reset_Password)); 

// Forgot Password
router.post('/forgot',asyncHandler(AuthController.Forgot_Password)); 

// Verify the User
router.post('/verify',asyncHandler(AuthController.Verify_Otp)); 

// Reset Password
router.delete('/logout',authenticate,asyncHandler(AuthController.Logout)); 

// export routes
module.exports = router;















