
const httpErrors       = require('http-errors');

// includes
const userValidations  = require('./../validations/user');

const authModel = require('../models/auth');

// importing pagination handler
const modifyQueryData = require('../helpers/queryModifier');
// importing filtered result helper
const FilterResult = require('../helpers/filterdResult');


// exports 
module.exports = {

GetAll:async(req,res,next)=>{

const pageData = await modifyQueryData(req.query);
    
  let filter = { name :pageData.filter };
   
   if(pageData.filter == null){
       filter = "";
   }
  
  const temp = await  FilterResult(authModel,pageData,filter);

  res.send(temp);

},

GetSingle:async(req,res,next)=>{
  const uid = req.params.uid;
  const temp = await authModel.findOne({_id:uid})
                              .select('-urlTwitter -urlGitHub  -account -__v -password'); 
  res.send(temp);
},

Create:async(req,res,next)=>{

  const valData = await userValidations
                        .create
                        .validateAsync(req.body);

  const isEmailExists = await authModel.isEmailExists(valData.email);

  if(isEmailExists){
         return next(new  httpErrors.BadRequest(`${valData.email} This Email Is Already Taken`));
  }

  const dataObj = {...valData};
    
  const temp = await authModel.create(dataObj); 
  
  res.json({status:200,msg:"User Created SuccessFully"});

},

Update:async(req,res,next)=>{
 
  const uid = req.params.uid;
  const valData = await userValidations
                        .update
                        .validateAsync(req.body);

  const dataObj = {...valData};

  const temp = await authModel.findOneAndUpdate({_id:uid},dataObj); 
  
  res.json({status:200,msg:"User Updated SuccessFully"});


},

Delete:async(req,res,next)=>{

    const uid = req.params.uid;
    const temp = await authModel.findOneAndDelete({_id:uid}); 
    res.json({status:200,msg:"User Deleted SuccessFully"});

},


};
