// Collections for backbone app

// Global forever app
var Forever = Forever || {};

(function(){

  var Articles = Backbone.Collection.extend({
    model: Forever.Article,
    url: '/api/article'
  });

  Forever.Articles = new Articles();

})();