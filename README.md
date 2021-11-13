

Problem Statement<br/>
 <a href="https://documenter.getpostman.com/view/12851614/UV5XhcUE#5e817f63-5a56-4d71-bf05-85923b76f738">Api Documentation</a>
<br/>
  <h1 align="center"></h1>

<br />
<p align="center">
  <a href="hhttps://amitfoundation.herokuapp.com/">
    <img src="logo2.png" alt="Logo" width="280" height="180">
  </a>

  <h1 align="center"># User-Service 1.0</h1>

  <p align="center">
    <br />
    Developed By : Amit Gujar Patil
    <br />  <br />  


  
 <a href="https://documenter.getpostman.com/view/11617094/UVC8DRvd">Api Documentation</a>
    <br />

  </p>
</p>


## Data Flow

> Main Server  => Middlewares => Routes =>  Controllers  => Model    
> Main Server  <=  Routes <=  Controllers  <= Model    



## What I Did In This Repo ???

This is an Production Ready User Service .<br/>
This project is built on Microservice Architecture Along with all best practises.<br/>
<br>
Custom Logger - Genrate the logs with winston and morgan and collecting this logs into elastic search <br/>
Kibana - To visualize logs<br>
Tracer - Genrate traces with jaeger and and montior this traces in jaeger ui<br>
Monitor - To monitor application i use express monitior<br>
Centrlize Error Handler - To handle all error at one place<br>
Rate Limmiter - To stop Brute Force<br>
Jwt - To Authenticate and Authorize User</br> 




I had do clean code with clean folder structure </br> 



## What Operation I did With Mongodb ???

Creating , Updating , Reading , Deleting , Sorting , Ordering , Filtering  , Pagination 

## API Documentation


[Postman api documentation](https://documenter.getpostman.com/view/11617094/UVC8DRvd)


## Features


 

> Authentication 
  - Login 
  - Register 
  - Logout
  - Reset Password
  - Forgot Password 
  - New Password

> User
  - Add New User
  - Update User
  - Remove User
  - Fetch All User List  With Conditions (order,field,page,limit,filter)
  - Fetch Single User


> Profile
  - Update Profile
  - Change Password
  - Fetch Single Profile

> City
  - Add New City
  - Update City
  - Remove City
  - Fetch All City List
  - Fetch Single City
  - Fetch City List With Conditions (order,field,page,limit,filter)


## Technology

> Node Js

> Redis 

> Express Js

> MongoDb

> Elk Stack

> Winston Logger

> Express Status Monitor

> Jaeger Tracer

## Folder Structure 

![folder s](https://user-images.githubusercontent.com/62344675/140640594-72bcc20e-edc2-4f26-8385-314993fa9a79.png)


