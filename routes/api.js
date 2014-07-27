// rest api for the backbone client

var readability = require('node-readability');

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
  
  // validate url field
  var url = req.body.url;
  if(!url) {
    res.json(400, {error: true});
    return;
  }

  // tags are a represented by a string seperated by comma
  var tags = [];
  if (typeof req.body.tags === 'string') {
    tags = req.body.tags.split(',');
    // strip out all white spaces
    tags = tags.map(function(x){ return x.trim(); })
  }

  // build the article object to be saved
  // defaults for title and articles are also updated
  var article = {
    user: req.user,
    title: url,
    url: url,
    article: 'No content to show!',
    tags: tags
  }

  // use readability module to try extracting the main content of the page
  readability(url, function(err, extract, meta){
    
    // if an error occured, just save the object without the article &
    // title content
    if(err || !extract.content) {
      console.log(err);
    } else {
      article.title = extract.title;
      article.article = extract.content;
    }

    // finally save the model
    var articleObject = new Article(article);
    articleObject.save(function(err){
      if(err) {
        console.log(err);
        res.send(500, {error:true});
        return;
      }
      res.json(articleObject);
    });
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