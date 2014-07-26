// Models for backbone app

// global app variable
var Forever = Forever || {};

// Article model
(function(){

  Forever.Article = Backbone.Model.extend({
    defaults: {
      url: '#',
      tags: []
    },
    idAttribute: '_id'
  });

})();