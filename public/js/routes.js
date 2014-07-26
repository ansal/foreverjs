// Routes for backbone app

// Global forever app
var Forever = Forever || {};

(function(){

  var $container = $('#app-container');

  var Router = Backbone.Router.extend({

    routes: {
      'article/:id': 'showArticle'
    },

    showArticle: function(id) {
      var article = Forever.Articles.get(id);
      var view = new Forever.ArticlePreviewView({model: article});
      $container.html( view.render().$el );
    }

  });

  Forever.Router = new Router();
  Backbone.history.start();

})();