//import Fuse from 'fuse.js';

/*
 *  VARIABLES
 */
var database, fuse;

var options = {
  shouldSort: false,
  tokenize: true,
  findAllMatches: true,
  threshold: 0.4,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "title",
    "tag"
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
  document.getElementById('search_input_react').addEventListener('keyup', requestSearch);
  document.getElementById('search_input_react').setAttribute("onfocusout", "setTimeout(cleanSearchResult, 200)");
}


/*
 *  SEARCH ENGINE
 */
function requestSearch(e) {
  // Send request
  var result = fuse.search(e.srcElement.value);

  // Clean previous result (if multiple request)
  cleanSearchResult();

  createSearchResult(result);
}

function createSearchResult(result) {
  // Prepare list container
  var resultDiv = document.createElement("DIV");
  var resultList = document.createElement("UL");

  var prevTag = ""; 
  for (var i = 0; i < result.length; i++) {

    // Display new Tag title if changing
    if (prevTag != result[i]["tag"]) {
      prevTag = result[i]["tag"]
      resultList.appendChild( document.createElement("HR") );

      var tagTitle = document.createElement("H4");
      tagTitle.appendChild( document.createTextNode( prevTag ) );

      resultList.appendChild( tagTitle );
    }

    // Prepare result item
    var link = document.createElement("A");

    // Create link
    link.setAttribute("href", document.URL.split('/')[2] + "/BC2019-Gama-Site/wiki/" + result[i]["url"]);
    link.appendChild( document.createTextNode(result[i]["title"] ) );

    // Append result item
    var li = document.createElement("LI");

    li.appendChild(link);

    resultList.appendChild( li );
  }

  // Append result list
  resultDiv.appendChild(resultList);

  // Set id => Apply CSS
  resultDiv.id = "searchResult";

  // Append display in webpage
  document.body.appendChild(resultDiv);
}

// Look for result display (base on ID) and remove it
function cleanSearchResult(){
  var searchResult = document.getElementById('searchResult');
  if (searchResult != null)
    searchResult.parentNode.removeChild(searchResult);
}

// On page ready
// -> Wait Fuse.js to be loaded
document.addEventListener('DOMContentLoaded', initSearchEngine, false);