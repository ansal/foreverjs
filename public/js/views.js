// Views for backbone app

// Global forever app
var Forever = Forever || {};

(function(){

  // List view for articles
  // Also handles events for add and delete actions
  Forever.ArticleListView = Backbone.View.extend({

    initialize: function() {

      // cache dom elements
      this.$appContainer = $('#app-container');

      // listen to collection events
      this.listenTo(Forever.Articles, 'reset', this.articlesReset);

    },

    addOneArticleBox: function(article) {
      var view = new ArticleBoxView({ model: article});
      this.$appContainer.append(view.render().$el);
    },

    addAllArticleBoxes: function() {
      Forever.Articles.each(this.addOneArticleBox, this);
    },

    articlesReset: function() {
      window.location.href = "#/app";
    }

  });

  var ArticleBoxView = Backbone.View.extend({

    tagName: 'div',
    className: 'col-md-3 articleBox',

    template: _.template( $('#articleBoxTemplate').html() ),

    events: {
      'click .articleRemoveLink': 'removeArticle'
    },

    initialize: function() {
      // listen to model events
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      var html = this.template({
        article: this.model
      });
      this.$el.html(html);
      return this;
    },

    removeArticle: function(e) {
      e.preventDefault();
      var confirmation = window.confirm('There is no going back!\n\nAre you sure?')
      if(confirmation) {
        this.model.destroy();
      }
    }

  });

  Forever.ArticlePreviewView = Backbone.View.extend({

    tagName: 'div',
    className: 'col-md-offset-1 col-md-8 articlePreview',

    template: _.template( $('#articlePreviewTemplate').html() ),

    render: function() {
      var html = this.template({
        article: this.model
      });
      this.$el.html(html);
      return this;
    }

  });

})();