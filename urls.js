// URLS defined by all the routes

var config = require('./config.js');
var utils = require('./utils.js');
var pages = require('./routes/pages.js');
var apis = require('./routes/api.js');

module.exports = function(app, passport) {

  // authentication urls, mostly hooks up with passportjs
  // google
  app.get('/auth/login/google', passport.authenticate('google'));
  app.get(config.google.callbackURL, 
    passport.authenticate('google', { 
      successRedirect: '/',
      failureRedirect: '/?loginError=true'
    })
  );
  // facebook
  app.get('/auth/login/facebook', passport.authenticate('facebook', {
    scope : 'email'
  }));
  app.get(config.facebook.callbackURL, 
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/?loginError=true'
    })
  );
  // twitter
  app.get('/auth/login/twitter', passport.authenticate('twitter'));
  app.get(config.twitter.callbackURL, 
    passport.authenticate('twitter', { 
      successRedirect: '/',
      failureRedirect: '/?loginError=true'
    })
  );

  // app specific urls
  app.get('/', pages.index);
  app.get('/logout', pages.logout);

  // rest apis
  app.get('/api/article', utils.restrictUser, apis.AllArticles);
  app.post('/api/article', utils.restrictUser, apis.CreateArticle);
  app.delete('/api/article/:id', utils.restrictUser, apis.DeleteArticle);
}