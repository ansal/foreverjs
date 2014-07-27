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
      // if the articles has not loaded yet, do a page refresh by going to home page
      if(!Forever.AppState.articlesReset){
        window.location.href = '/';
        return;
      }
      if(Forever.AppState.currentView) {
        Forever.AppState.currentView.remove();
      }
      Forever.AppState.currentView = new Forever.ArticleListView();
      $container.html('');
      Forever.AppState.currentView.addAllArticleBoxes();
      $progressAnim.hide();
    },

    showArticle: function(id) {
      if(Forever.AppState.currentView) {
        Forever.AppState.currentView.remove();
      }
      var article = Forever.Articles.get(id);
      Forever.AppState.currentView = new Forever.ArticlePreviewView({model: article});
      $container.html( Forever.AppState.currentView.render().$el );
    }

  });

})();