// rest api for the backbone client

// article model
var Article  = require('../models/article.js').Article;

// get all articles
// GET /api/article
module.exports.AllArticles = function(req, res) {
  Article.find({user: req.user._id}, function(err, articles){
    if(err) {
      console.log(err);
      res.json(500, {
        error: true
      });
      return;
    }
    res.json(articles);
  });
};

// create an article
// POST /api/article
module.exports.CreateArticle = function(req, res) {
  
  // validate all fields
  // can this be done better?
  var title = req.body.title;
  var url = req.body.url;
  var article = req.body.article;
  if(!title || !url || !article) {
    res.json(400, {error: true});
    return;
  }

  // tags are a represented by a string seperated by comma
  var tags = [];
  if (typeof req.body.tags === 'string') {
    tags = req.body.tags.split(',');
  }

  var articleObject = new Article({
    user: req.user,
    title: title,
    url: url,
    article: article,
    tags: tags
  });
  articleObject.save(function(err){
    if(err) {
      console.log(err);
      res.send(500, {error:true});
      return;
    }
    res.json(articleObject);
  });
};

// deletes an article
// DELETE /api/article/:id
module.exports.DeleteArticle = function(req, res) {

  Article.findOne({
    _id: req.params.id
  })
  .where('user').equals(req.user._id)
  .remove()
  .exec(function(err){

    if(err) {
      console.log(err);
      res.json(500);
      return;
    }

    res.json({
      'success': 'object deleted'
    });

  });

};