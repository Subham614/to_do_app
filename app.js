const express=require('express');
const exphbs=require('express-handlebars');
const bodyParser=require('body-parser');
const path=require('path');

//Database

const db=require('./config/database');

//Test Database Connection
db.authenticate()
    .then(()=>console.log('Database Connection Established!...'))
    .catch(err=>console.log('Error:'+err));

const app=express();

//Handlebars

app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');

//set static folder
app.use(express.static(path.join(__dirname,'public')));
//app.get('/',(req,res)=>res.send('INDEX'));

//index routes
app.get('/',(req,res)=>res.render('index',{layout:'landing'}));

// Gig routes

app.use('/gigs', require('./routes/gigs.js'));

const PORT=process.env.PORT||5000;

app.listen(PORT,console.log(`Server started on Port ${PORT}`));
