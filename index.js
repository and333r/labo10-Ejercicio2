const session = require('express-session')
const express = require("express");
const app = express()

const PORT = 4000;

// use static files
app.use(express.static("public"));

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use ejs views
app.set("view engine", "ejs");
app.set("views", "views");

const sess = {
    secret: 'ausazko hitz multzoa',
    cookie: {}
}
app.use(session(sess))

//username and password
const myusername = 'user1'
const mypassword = 'mypassword'

app.get('/protected',(req,res) => {

    if(req.session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
        res.redirect('form.html')
});

app.post('/user',(req,res) => {
    if(req.body.username == myusername && req.body.password == mypassword){

        req.session.userid=req.body.username;
        console.log(req.session)
        res.redirect('/protected');
    }
    else{
        res.send('Invalid username or password');
    }
})

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);})
