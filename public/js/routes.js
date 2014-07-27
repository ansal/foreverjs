// Routes for backbone app

// Global forever app
var Forever = Forever || {};

(function(){

  var $container = $('#app-container');
  var $progressAnim = $('#progressAnim');

  Forever.appRouter = Backbone.Router.extend({

    routes: {
      'app': 'homePage',
      'article/:id': 'showArticle'
    },

    homePage: function() {
      $container.html('');
      Forever.homeListView.addAllArticleBoxes();
      $progressAnim.hide();
    },

    showArticle: function(id) {
      var article = Forever.Articles.get(id);
      var view = new Forever.ArticlePreviewView({model: article});
      $container.html( view.render().$el );
    }

  });

})();