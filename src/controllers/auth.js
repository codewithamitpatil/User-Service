
const httpErrors       = require('http-errors');
const nodemailer       = require('nodemailer');
const otp              = require('in-memory-otp');

// includes
const AuthValidations  = require('./../validations/auth');

const authModel = require('../models/auth');
// importing mail Handler
const { SendMail } = require('../helpers/mailSender');
// importing config
const { optValidForTime } = require('../config'); 
// importing redis connection
const redisClient      = require('./../db/init_redis');
// importing jwt helper
const jwtToken         = require('./../helpers/jwt'); 

const mongoose = require('mongoose');

const toId = mongoose.Types.ObjectId();


module.exports = {

//  Signup  
    Signup:async(req,res,next) => {
    
    // validations
    const valData = await AuthValidations.Signup.validateAsync(req.body);
    const { email ,username } = valData;
 
    const doesEmailExist =  await authModel.findOne({email:email});
    const doesUnameExist =  await authModel.findOne({username:username});
   
    if(doesEmailExist !== null){
      return next(new  httpErrors.BadRequest(`${email} This Email Is Already Taken`));
    }
   
    if(doesUnameExist!== null){   
      return next(new httpErrors.BadRequest(`${username} This Username Is Already Taken`));
    }
    
    // to save user
    const user         = new  authModel(valData);
    const savedUser    = user.save();               
    
    // to send otp 
    otp.startOTPTimer(new Date().getTime());
    const userOTP = otp.generateOTP(email,optValidForTime );
    const payload = { otp : userOTP }; 
    SendMail(email,'Otp Verification','Otp',payload); 

    return res.status(200).json({ 
        "status":200,
        "msg":"Your Account created successfully.Please Verify Email To Activate your acount ",
    });

    }
,

//  Login 
    Login:async(req,res,next) => {
  
    const valData = await AuthValidations.Login.validateAsync(req.body);
    const uid = await authModel.Authentication(valData);    
    const AccessToken  = await jwtToken.SignAccessToken(uid); 
    const RefreshToken = await jwtToken.SignRefreshToken(uid); 

    return  res.send({ 
        status:200,
        message:"User Logged In SuccessFully" ,
        AccessToken , 
        RefreshToken 
    });

    }
,


// Reset Password
   Reset_Password:async(req,res,next) => {
    
    const uid = req.user.aud;
   
    const valData = await AuthValidations.Change_Password.
                        validateAsync(req.body);
    const data = { 
        id:uid,
        password:valData.OldPassword ,
        newpassword:valData.NewPassword 
    };

    const HashPass = await authModel.OldPassWordCheck(data);
    const UpdatePass = await authModel.findOneAndUpdate({email:uid},{password:HashPass});
   
    return res.json({status:'200',msg:'Password Updated Successfully'});

   }    
,


//  Logout
    Logout : async(req,res,next) => {
 
    const valdata = await AuthValidations.Refresh_Token.validateAsync(req.body);
    const uid = await jwtToken.VerifyRefreshToken( valdata.RefreshToken);                     

    return redisClient.del(uid.aud,(err,replay)=>{
       if(err){  
            return next(new httpErrors.Unauthorized());
        }
        return res.json({
                    'status':200,
                    'msg':'user logged out successfully'
                });;
        });
    }
,

//  Refresh-Token 
    Refresh_Token:async(req,res,next) => {
    
    const datas = req.user.data; 
    const data = { 
                   ...datas
                };
    const AccessToken  = await jwtToken.SignAccessToken(data); 
    const RefreshToken = await jwtToken.SignRefreshToken(data); 
    
    return res.send({ AccessToken , RefreshToken });
 
    }
,

//  Forgot Password 
    Forgot_Password:async(req,res,next)=>{

    const email = req.body.email;

    const DoesEmailExist = await authModel.findOne({email:email});
  
    if(DoesEmailExist == null || DoesEmailExist == "undefien"){   
      return  next(new httpErrors.BadRequest(`We Does Not Found Any Account With ${email} This Email`));
    }
   
    // to send otp 
    otp.startOTPTimer(new Date().getTime());
    const userOTP = otp.generateOTP(email,optValidForTime );
    const payload = { otp : userOTP }; 
    SendMail(email,'Otp Verification','Otp',payload); 

    res.json({
        "status":200,
        "msg":"Check Your Email For The OTP ",
        "email":email
    });

    }
,

//  New Password 
    New_Password:async(req,res,next)=>{
      
      const email = req.user.aud;

      const valData = await AuthValidations.NewPass.
                            validateAsync(req.body);

      const HashPass = await authModel.HashPass(valData.newpass);
       console.log(HashPass)
      const UpdatePass = await authModel.findOneAndUpdate({email :email },{password:HashPass});
      
      return res.status(200).json({'status':200,'msg':'Your Password Changed SuccessFully.Now You Can Login With New Password'});
      
    }  
,

//  Verify Otp  
    Verify_Otp:async(req,res,next)=>{

    const valData  = await AuthValidations.VerifyOtp.validateAsync(req.body);  
    const Otpresult = otp.validateOTP(valData.email, valData.otp);
   
    if(Otpresult){
        const UpdateStaus = await authModel.findOneAndUpdate({email:valData.email},{account:'verified'},{new:true});
        const AccessToken  = await jwtToken.SignAccessToken(UpdateStaus); 
        const RefreshToken = await jwtToken.SignRefreshToken(UpdateStaus); 
        return res.json( {'status':200,'msg':'Your Account Has Been Verified Successfully',AccessToken , RefreshToken});
    }else{
        return next(new httpErrors.Unauthorized(`The OTP You Entered Is Invalid .Plz Enter The Correct Otp`));
    }


    }    
    
,

   
}




















