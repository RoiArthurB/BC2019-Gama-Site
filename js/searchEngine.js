//import Fuse from 'fuse.js';

/*
 *  VARIABLES
 */
var database, fuse;

var options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "title",
    "author.firstName"
  ]
};

/*
 *  INIT SEARCH ENGINE
 */
function initSearchEngine(){
  var client = new XMLHttpRequest();
  
  // Get json file with an asynchrone request
  client.open('GET', '/BC2019-Gama-Site/database/index.json');

  // Prepare request
  client.onreadystatechange = function() {
  
    // Get database
    const tmp = client.responseText;
    database = JSON.parse(tmp);

    // Load Fuse search engine
    fuse = new Fuse(database, options);
  }

  // Send request
  client.send();
}


// On page ready
// -> Wait Fuse.js to be loaded
window.onload = initSearchEngine();