// Page routes for ForeverJS app

var Article = require('../models/article.js').Article;

exports.index = function(req, res){
  
  if(!req.user) {
    res.render('index');
    return;
  }

  // user is logged in
  // fetch his saved articles from database
  // pass it to jade to bootstrap models
  Article.find({user: req.user._id})
  .sort('date')
  .exec(function(err, articles){
    
    if(err) {
      console.log(err);
      res.json(500, {
        error: true
      });
      return;
    }

    res.render('user', {
      user: req.user,
      articles: JSON.stringify(articles)
    });

  });
};

// logouts a user
exports.logout = function(req, res) {
  req.logout();
  res.redirect('/?loggedOut=true');
};