// Views for backbone app

// Global forever app
var Forever = Forever || {};

(function(){

  // dom elements common to all views
  var $progressAnim = $('#progressAnim');

  // List view for articles
  // Also handles events for add and delete actions
  Forever.ArticleListView = Backbone.View.extend({

    initialize: function() {

      // cache dom elements
      this.$appContainer = $('#app-container');

      // listen to collection events
      this.listenTo(Forever.Articles, 'add', this.addOneArticleBox);
      this.listenTo(Forever.Articles, 'reset', this.articlesReset);

    },

    addOneArticleBox: function(article) {
      var view = new ArticleBoxView({ model: article});
      this.$appContainer.prepend(view.render().$el);
      // hide progress bar
      $progressAnim.hide();
    },

    addAllArticleBoxes: function() {
      Forever.Articles.each(this.addOneArticleBox, this);
    },

    articlesReset: function() {
      Forever.AppState.articlesReset = true;
      window.location.href = "#/app";
    }

  });

  // Single article view in dashboard, rendered as a box
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

  // Full article preview, rendered in article/:id
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

  // View for adding a new article inside the app
  Forever.AddArticleView = Backbone.View.extend({

    el: '#app-body',

    events: {
      'click #showArticleModal': 'showArticleModal',
      'click #saveNewArticleButton': 'saveNewArticle'
    },

    initialize: function() {
      this.$newArticleModal = $('#newArticleModal');
      this.$newUrlErrorAlert = $('#newUrlErrorAlert');
      this.$urlFormGroup = $('#urlFormGroup');
      this.$newArticleUrl = $('#newArticleUrl');
      this.$newArticleTags = $('#newArticleTags');
    },

    showArticleModal: function(e) {
      e.preventDefault();
      // clear all fields and errors and then show the modal
      this.$newUrlErrorAlert.hide();
      this.$urlFormGroup.removeClass('has-error');
      this.$newArticleModal.modal('show');
    },

    saveNewArticle: function(e) {
      e.preventDefault();
      var url = this.$newArticleUrl.val().trim();
      if(!url) {
        this.$newUrlErrorAlert.show('fast');
        this.$urlFormGroup.addClass('has-error');
        return;
      }
      var tags = this.$newArticleTags.val();

      $progressAnim.show();
      Forever.Articles.create({
        url: url,
        tags: tags
      }, {
        wait: true
      });
      this.$newArticleModal.modal('hide');

    }

  });

})();