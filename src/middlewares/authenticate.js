
const httpErrors = require('http-errors');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// importing configs
const {  private_access_key } = require('../config/index');

module.exports = (passport)=>{

  passport.use(
    
    new JwtStrategy({
        secretOrKey: private_access_key,
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
    },async function(jwt_payload,cb){
               cb(null,jwt_payload);
  })

  );

}





