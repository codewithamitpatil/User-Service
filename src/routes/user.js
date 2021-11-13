
const express         = require('express');
const router          = express.Router();

// importing async handler to avoid try catch
const asyncHandler = require('../middlewares/asyncHandler');

// includes
const userController  = require('./../controllers/user');


// User Single Fetch
router.get('/users/:uid',asyncHandler(userController.GetSingle));
//Users List with Condition
router.get('/users',asyncHandler(userController.GetAll));
//User Creation
router.post('/users',asyncHandler(userController.Create));
// User Update
router.patch('/users/:uid',asyncHandler(userController.Update));
// User Deletion
router.delete('/users/:uid',asyncHandler(userController.Delete));


// export routes
module.exports = router;
