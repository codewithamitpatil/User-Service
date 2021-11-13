
   const mongoose    = require('mongoose');

   const httpErrors  = require('http-errors');
   const passwordHash = require('password-hash');

// User Schema
   const AuthSchema = mongoose.Schema({

      name :  {
         type:String,
         required:true,
         unique:false
      },
      email    :  {
         type:String,
         required:true
      },
      password :  {
         type:String,
         required:true
      },
      role:{
         type:String,
         required:false
      },
      city:{
            type:String,
            required:false
      },
      country:{
         type:String,
         required:false
      },   
      phone:{
         type:String,
         required:false,
      },
      urlTwitter    :  {
         type:String,
         required:false,
         unique:false
      },
      urlGitHub:  {
         type:String,
         required:false
      },
      account :  {
         type:String,
         required:false,
         default:'notverified'
      }           

   });

// for password hashing
   AuthSchema.pre('save',async function(next){
      this.password = passwordHash.generate(this.password);
      return next();
  });


// For Hashing New Password    
   AuthSchema.statics.HashPass = async function(pass) {
       const hashpass =  passwordHash.generate(pass);
       return hashpass;
   }



 AuthSchema.statics = {
  
   // Authentication Check Middleware (Authcheck)
     Authentication : async function(data) {

      const { email, password } = data;
    
      // check username or email
      const user = await this.findOne({ email:email });

      // check account is verified or not
      const verifyCheck = await this.findOne({email:email,account :'verified' })
                                     .countDocuments('email');
        

      const conditionChecks = async function(resolve,reject){
      
      // check username or email is exist
         if(user == null || user == "undefined"){
            reject(new httpErrors.Unauthorized('Invalid Username or Password')); 
         }
      
      // check password is matched or not
         const passcheck = passwordHash.verify(data.password,user.password);
         if(!passcheck){
            reject(new httpErrors.Unauthorized('Invalid Username or Password')); 
         }

      // check account is verified or not
         if(verifyCheck !== 1){
           return reject(new httpErrors.BadRequest('Your Account is not verified')); 
         }
        
      // everything is correct return the user details  
      
        return resolve(user);

      };

      return new Promise(conditionChecks);

 }
,
// Old Passwrd Check 
   OldPassWordCheck : async function(data) {
    
    const user = await this.findOne({
      $or :[ {email:data.id},{_id:data.id} ]
    });
    const passcheck = passwordHash.verify(data.password,user.password);

    const checkCondition = async(resolve,reject)=>{
  
    if(!passcheck){
        return reject(new httpErrors.BadRequest('password doesnot match with old password')); 
    }
   
    const hashpass  = passwordHash.generate(data.newpassword);
    return resolve(hashpass);


    };
    return new Promise(checkCondition);
   }
,

// to genrate password hash
   HashPass :async function(pass){
    const hashpass  = passwordHash.generate(pass);
    return hashpass;
   },

// check email is exists
   isEmailExists : async function(email){
    
     const check = await this.findOne({ email:email });

     if(check == null || check == "undefined"){
        return false;
     }else{
        return true;
     }
   }

}
// User Model (Collection)
   const User = mongoose.model('Authentication',AuthSchema);

// Export Module
   module.exports = User;
