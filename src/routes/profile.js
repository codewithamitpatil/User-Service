
const express         = require('express');
const router          = express.Router();

// importing async handler to avoid try catch
const asyncHandler = require('../middlewares/asyncHandler');

// includes
const profileController  = require('./../controllers/profile');


// Profile Update
router.patch('/profile/:pid',asyncHandler(profileController.Update));
// Profile Fetch
router.get('/profile/:pid',asyncHandler(profileController.GetSingle));
//Change Password
router.post('/profile/changePassword',asyncHandler(profileController.Change_Password));

// export routes
module.exports = router;
