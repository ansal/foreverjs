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
  // returns neatly formatted date
  Forever.utils.printDate = function(date) {
    var d = new Date(date);
    return d.toDateString() + ', ' + d.toLocaleTimeString();
  }

  // simple state for keeping client side state
  Forever.AppState = {};

  // create a new list view and listen for events
  Forever.homeListView = new Forever.ArticleListView();
  Forever.addArticleView = new Forever.AddArticleView();

  // start backbone routing
  Forever.Router = new Forever.appRouter();
  Backbone.history.start();

})();