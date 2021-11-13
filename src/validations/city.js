
const joi = require('joi');

module.exports = {

create : joi.object({
  name :     joi.string().required()
}),

update : joi.object({
  name :     joi.string().optional()
})

}