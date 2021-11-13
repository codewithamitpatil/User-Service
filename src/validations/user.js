
const joi = require('joi');
const httpErrors  = require('http-errors');

module.exports = {

create : joi.object({

  email:     joi.string().email().required(),
  password : joi.string().required(),
  name :     joi.string().required(),
  role :     joi.string().valid('Admin','User').required()
                .error(new httpErrors.BadRequest('Invalid Role')),
  phone :    joi.string().required(),
  city :     joi.string().required(),
  country :  joi.string().required()

}),

update : joi.object({

  email:     joi.string().email().optional(),
  name :     joi.string().optional(),
  role :     joi.string().valid('Admin','User').optional()
                .error(new httpErrors.BadRequest('Invalid Role')),
  phone :    joi.string().optional(),
  city :     joi.string().optional(),
  country :  joi.string().optional()

}),

}