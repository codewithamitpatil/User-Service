
const express         = require('express');
const router          = express.Router();
const passport        = require('passport');


// importing passport jwt middleware
require('./../middlewares/authenticate')(passport);
const authenticate = passport.authenticate('jwt',{session:false, failWithError:true});


// includes
const authRoutes    = require('./auth');
const userRoutes    = require('./user');
const profileRoutes    = require('./profile');
const cityRoutes    = require('./city');

// intialize routes
router.use('',authRoutes);


router.use('',authenticate,userRoutes);
router.use('',profileRoutes );
router.use('',cityRoutes);

// export routes
module.exports = router;















