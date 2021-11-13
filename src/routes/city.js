
const express         = require('express');
const router          = express.Router();

// importing async handler to avoid try catch
const asyncHandler = require('../middlewares/asyncHandler');

// includes
const cityController  = require('./../controllers/city');


//Cities List
router.get('/cities/all',asyncHandler(cityController.GetAll));
//City List with Condition
router.get('/cities',asyncHandler(cityController.GetAllWithCon));
//City Creation
router.post('/cities',asyncHandler(cityController.Create));

// City Single Fetch
router.get('/cities/:cid',asyncHandler(cityController.GetSingle));

// City Update
router.patch('/cities/:cid',asyncHandler(cityController.Update));
// City Deletion
router.delete('/cities/:cid',asyncHandler(cityController.Delete));


// export routes
module.exports = router;
