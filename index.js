const express = require('express')
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
require('./config/passport-auth');
dotenv.config();

const app = express()


const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.status(401);
}

app.use(session({
  secret: 'glory to the king',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  res.send(`<a href='/auth/google'>Authenticate with <b>Google</b> here!</a>`)
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/logged-in',
    failureRedirect: '/auth-error'
  }),
);

app.get('/logged-in', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
  // console.log(req.user);
})

app.get('/auth-error', (req, res) => {
  res.send(`Login Failed ! Try again here <a href='/auth/google'>Click Me</a>`)
})

app.get('/logout', (req, res, next) => {
  req.session = null;
  req.logout((err) => {
    if (err) next(err);
  });
  res.redirect('/');
});

app.listen(5000, () => {
  console.log(`Server running`)
});

// console.log(process.env.PORT);