// Global forever app
var Forever = Forever || {};

// create views
(function(){

  // utility functions used in templates
  Forever.utils = {};
  // returns hostname of a url
  // See http://stackoverflow.com/questions/736513/how-do-i-parse-a-url-into-hostname-and-path-in-javascript
  Forever.utils.getHostname = function(url) {
    var parser = document.createElement('a');
    parser.href = url;
    return parser.hostname;
  };

  // create a new list view and listen for events
  var listView = new Forever.ArticleListView();

})();