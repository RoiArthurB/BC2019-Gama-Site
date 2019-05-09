//import Fuse from 'fuse.js';

/*
 *  VARIABLES
 */
var database, fuse, searchInput;

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
  /*  SET DB  */

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

  /*  EVENT LISTENER  */

  // Get search input
  searchInput = document.getElementById('search_input_react');

  document.addEventListener('keyup', requestSearch);
}


/*
 *  SEARCH ENGINE
 */
function requestSearch(e) {
  console.log(e.srcElement.value);
    if (e.keyCode == 13) { // Enter

      // Send request
      var result = fuse.search(e.srcElement.value);

      console.log(result);
    }
}

function displayResult(result){
  for (var i = 0; i < result.length; i++) {
    var url = document.URL.split('/')[2] + "/wiki/" + result[i]["url"];
  }
}


// On page ready
// -> Wait Fuse.js to be loaded
window.onload = initSearchEngine();