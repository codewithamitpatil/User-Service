
const httpErrors       = require('http-errors');

// includes
const profileValidations  = require('./../validations/profile');

const authModel = require('../models/auth');


// exports 
module.exports = {

GetSingle:async(req,res,next)=>{
  const pid = req.params.pid;
  const temp = await authModel.findOne({_id:pid}).select('-account -__v -password'); 
  res.send(temp);
},

Update:async(req,res,next)=>{

  const pid = req.params.pid;
  const valData = await profileValidations
                        .update
                        .validateAsync(req.body);

  const dataObj = {...valData};

  const temp = await authModel.findOneAndUpdate({_id:pid},dataObj); 
  
  res.json({status:200,msg:"Profile Updated SuccessFully"});


},

Change_Password:async(req,res,next)=>{

    const valData = await profileValidations.Change_Password.
                        validateAsync(req.body);
 
    const pid = valData.pid;
    const data = { 
        id:valData.pid,
        password:valData.oldPassword ,
        newpassword:valData.newPassword 
    };

    const HashPass = await authModel.OldPassWordCheck(data);
    const UpdatePass = await authModel.findOneAndUpdate({_id:pid},{password:HashPass});
   
    return res.json({status:'200',msg:'Password Updated Successfully'});


},


};
