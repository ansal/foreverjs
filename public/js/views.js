// Views for backbone app

// Global forever app
var Forever = Forever || {};

(function(){

  // List view for articles
  // Also handles events for add and delete actions
  Forever.ArticleListView = Backbone.View.extend({

    initialize: function() {

      // listen to collection events
      this.listenTo(Forever.Articles, 'reset', this.addAllArticleBoxes);

    },

    addOneArticleBox: function(article) {
      var view = new ArticleBoxView({ model: article});
      $('#articleContainer').append(view.render().$el);
    },

    addAllArticleBoxes: function() {
      Forever.Articles.each(this.addOneArticleBox, this);
    }

  });

  var ArticleBoxView = Backbone.View.extend({

    tagName: 'div',
    className: 'col-md-3 articleBox',

    template: _.template( $('#articleBoxTemplate').html() ),

    render: function() {
      var html = this.template({
        article: this.model
      });
      this.$el.html(html);
      return this;
    }

  });

})();