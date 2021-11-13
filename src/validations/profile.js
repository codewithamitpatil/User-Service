const joi = require('joi');

module.exports = {

update : joi.object({

  urlTwitter : joi.string().optional(),
  urlGitHub  : joi.string().optional(),
  name :       joi.string().optional(),
  phone :      joi.string().optional(),
  city :       joi.string().optional(),
  country :    joi.string().optional()

}),

Change_Password : joi.object({
        pid : joi.string().required(),
        oldPassword : joi.string().required(),
        newPassword : joi.string().min(8).max(16).required()
})

}