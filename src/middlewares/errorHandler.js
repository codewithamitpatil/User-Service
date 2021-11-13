

// importing logger
const logger = require('../logger/logger');

const opentracing = require('opentracing');
const { Tags } = require("opentracing");


// const { tracer } = require("../helpers/reqTracer");

// global error handling middleware
module.exports =
{
 // all error handler
 ErrorResponse:async(err,req,res,next)=>{

      
    err.status = err.status || 500;

    // for joi validation errors
    if(err.isJoi)
    {
      err.status = 400;
    }
 

 const tracer = opentracing.globalTracer();
const span = tracer.startSpan("http_request");
    span.setTag(Tags.ERROR, true);
    span.setTag(Tags.HTTP_STATUS_CODE, err.status);
    span.log({
        event: "error",
        message: err.message,
        err,
    });

   logger.error({
     message:`${err}`,
     sta:err.status
   });


    res.status(err.status).json({
        'status':err.status,
        'msg':err.message
    })

    span.finish();


 }
 ,

 // 404 handler
Error404:async(req,res,next)=>{


   //res.setHeader("Content-Security-Policy", "script-src 'self' https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif");

   res.status(404).send("route does not exists");


}


}
