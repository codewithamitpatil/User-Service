
const httpErrors       = require('http-errors');

// includes
const cityValidations  = require('./../validations/city');

const cityModel = require('../models/city');
// importing pagination handler
const modifyQueryData = require('../helpers/queryModifier');
// importing filtered result helper
const FilterResult = require('../helpers/filterdResult');


// exports 
module.exports = {
GetAll:async(req,res,next)=>{

  const temp = await cityModel.find(); 
  res.send(temp);

},
GetSingle:async(req,res,next)=>{
  const cid = req.params.cid;  
  const temp = await cityModel.findOne({_id:cid}); 
  res.send(temp);
},

GetAllWithCon:async(req,res,next)=>{
 
  const pageData = await modifyQueryData(req.query);
    
  let filter = { name :pageData.filter };
   
   if(pageData.filter == null){
       filter = "";
   }
  
  const temp = await  FilterResult(cityModel,pageData,filter);


  res.send(temp);

},

Create:async(req,res,next)=>{

  const valData = await cityValidations
                        .create
                        .validateAsync(req.body);

  const temp = await cityModel.create(valData); 
  
  res.json({status:200,msg:"City Created SuccessFully"});

},

Update:async(req,res,next)=>{

  const cid = req.params.cid;  
  const valData = await cityValidations
                        .update
                        .validateAsync(req.body);

  const temp = await cityModel.findOneAndUpdate({_id:cid},valData); 
  
  res.json({status:200,msg:"City Updated SuccessFully"});

},

Delete:async(req,res,next)=>{
  
  const cid = req.params.cid;  

  const temp = await cityModel.findOneAndDelete({_id:cid}); 
  
  res.json({status:200,msg:"City Deleted SuccessFully"});

},


};
