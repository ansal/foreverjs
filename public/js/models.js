// Models for backbone app

// global app variable
var Forever = Forever || {};

// Article model
(function(){

  Forever.Article = Backbone.Model.extend({
    defaults: {
      title: 'Untitled Article',
      url: '#',
      article: 'No content to preview',
      tags: []
    }
  });

})();