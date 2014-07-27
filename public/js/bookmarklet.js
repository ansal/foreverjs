// Bookmarklet for ForeverJS

(function(){
  'use strict';

  var API_URL = 'http://localhost:3000/api/bookmarklet/article?callback=?'

  // check for jquery
  if (window.jQuery === undefined) {
    var script = document.createElement('script');
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js';
    script.onload = script.onreadystatechange = initBookmarklet;
    document.getElementsByTagName('head')[0].appendChild(script);
  } else {
    initBookmarklet();
  }

  function initBookmarklet() {
    jQuery.getJSON(API_URL, {
      url: window.location.href
    }).done(function(data){
      alert('Saved to ForeverJS!');
    }).fail(function(){
      alert('Please login to save this article into ForeverJS!');
    });
  }

})();