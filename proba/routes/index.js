const express = require('express');
const router = express.Router();
const app=express()
const mongojs= require('mongojs')
const path= require('path')
const session = require('express-session')
const db = mongojs('mongodb://127.0.0.1:27017/users', ['users'])

router.use(express.static("public"));

// parsing the incoming data
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// use ejs views
app.set("view engine", "ejs");
app.set("views", "views");

const sess = {
  secret: 'ausazko hitz multzoa',
  cookie: {}
}
router.use(session(sess))

//username and password
const myusername = 'user1'
const mypassword = 'mypassword'

router.get('/protected',(req,res) => {

  if(req.session.userid){
    res.send("Welcome User <a href=\'/logout'>click to logout</a>");
  }else
    res.render('form.ejs', {'mensajeUsuario':'','mensajeContraseña':'' })

});

router.post('/user',(req,res) => {


  db.collection('users').findOne({username: req.body.username} , (err,doc)=>{
    let userPwd= null
  try{
    userPwd=doc.password
  }
     catch (err){
       res.render('form.ejs', {'mensajeUsuario' : 'El nombre de usuario no existe', 'mensajeContraseña' : ''});
     }

  if(req.body.password == userPwd){

    req.session.userid=req.body.username;
    console.log(req.session)
    res.redirect('/protected');
  }
  else{
    res.render('form.ejs', {'mensajeContraseña' : 'La contraseña es incorrecta','mensajeUsuario' : ''});
  }
  })

})

router.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});

router.get("/", (req, res) => {
  res.send("Hello World");
})


module.exports = router;
