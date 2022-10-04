const express = require('express')
const nodemailer = require('nodemailer');
const app = express();
const knex = require("./db")
const {authenticationToken, authorizationToken} = require("./jwt")

app.use(express.json())
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sk5105938@gmail.com',
        pass: 'gvuqloimkzplneth'
    }
});

  
transporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log(err);
    } else {
        console.log('Email sent successfully');
    }
});

app.get('/', authorizationToken, async(req,res)=>{
    try{
        var data= await knex("employee")
        res.send(data)
    }catch(err){
        res.send(err.message)
    }
})

app.post('/signIN', validate,async(req,res)=>{
    try{
        await knex("employee").insert(req.body)
        let mailDetails = {
            from: 'ankur19952709@gmail.com',
            to: req.body.email,
            subject: 'Test mail',
            text: 'HI everyone I m  ankur from up'
        };
        return res.status(201).send("signup successful")
    }
    catch(err){
        res.send(err.message)
    }
})
app.get('/login',async(req,res)=>{
    try{
       var a= await knex("employee").where({email:req.body.email})

       if (a.length && req.body.password === a[0].password) {
           const token = authenticationToken(a[0]);
           res.cookie('user_token', token).json({
               values: 'Logged In successfully',
               data: a
           })

       }

    }catch(err){
        res.send(err.message)
    }
})

app.delete('/delete/:id',(req,res)=>{
    knex('employee')
  .where(req.params.id)
  .del()
  res.send("Done")
})

app.put('/update/:id',(req,res)=>{
    knex('employee')
  .where(req.params.id)
  .update(req.body)
})
app.listen(3000,(req,res)=>{
    console.log('server connected at port number 3000')
})