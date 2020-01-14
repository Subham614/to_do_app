const express=require('express');
const router=express.Router();
const db=require('../config/database');
const gig=require('../models/Gig');

// Get gig list
router.get('/',(req,res)=>
    gig.findAll()
    .then(gigs=>{
        console.log(gigs);
       res.render('gigs',{gigs:gigs});
    })
    .catch(err=>console.log(err)));
//Display add gig form    
router.get('/add',(req,res)=>res.render('add'));

//add a gig

router.post('/add',(req,res)=>{
    const data={
        title:'simple Wordpress Developer',
        technologies :'react,wordpress,html,css',
        budget:'$1000',
        description:'It is a job site portal where we can find the different jobs!',
        contact_email:'user2@gmail.com'
   } 

   let {title,technologies,budget,description,contact_email}=data;

   //insert into table

   gig.create({
       title:title,
       technologies:technologies,
       description: description,
       budget:budget,
       contact_email:contact_email
   })
        .then(gig=>res.redirect('/gigs'))
        .catch(err=>console.log(err));
});
module.exports=router;
