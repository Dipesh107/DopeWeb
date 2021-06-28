//jshint esversion:6

//Importing all the modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const port = 3000;

//Creation of App
const app = express();

//Setting view engines for ejs templates
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


//connecting to database
mongoose.connect("mongodb://localhost/personalDB", { useNewUrlParser: true, useUnifiedTopology: true });

//creating schema as we want
const contactSchema = {
  name: String,
  email: String,
  message: String
};

const userSchema = {
  name: String,
  email: String,
  password: String
}

//Using the Schema to create models
const Contact = mongoose.model("Contact", contactSchema);
const User = mongoose.model("User", userSchema);

//Calling methods get and post
app.get("/login", function (req, res) {
  res.render('login');
});

app.post("/login", function (req, res) {

  //taking from db
  email = req.body.email;
  password = req.body.password;

  //login using croos verify with db 

  console.log(email);
  console.log(password);
  res.redirect('/');
});

app.get("/register", function (req, res) {
  res.render('register');
});

app.post("/register", function (req, res) {
  //saving into database
  registerName = req.body.registerName;
  registerEmail = req.body.registerEmail;
  password1 = req.body.password1;
  password2 = req.body.password2;

  //condition to check passwords verify
  if (password1 === password2) {
    res.redirect('/login');
  } else {
    res.redirect('/register');
  }

})

app.get("/", function (req, res) {
  res.render('home')
})

app.get("/newsletter", function (req, res) {
  res.render('newsletter');
})

app.get("/contact", function (req, res) {
  res.render('contact');
})

app.post("/contact", function (req, res) {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });


  contact.save(function (err) {
    if (!err) {
      res.redirect("/home");
    }
  });
});

app.get("/about", function (req, res) {
  res.render('about');
});

//Listening to the Port
app.listen(port, function (req, res) {
  console.log("Successfully started on port " + port);
});