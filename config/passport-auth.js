const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  // User.findById(id, function (err, user) {
  done(null, user);
  // });
});



passport.use(new GoogleStrategy({
  clientID: '451596714810-XXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.XXX',
  clientSecret: 'GOCSPX-XXXXXXXXXXXXXxOTy9viT6',
  callbackURL: "http://localhost:5000/google/callback"
},

  function (accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return done(null, profile);
    // });
  }
));
