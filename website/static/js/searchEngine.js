//import Fuse from 'fuse.js';

/*
 *  VARIABLES
 */
var database, fuse;

var options = {
  shouldSort: true,
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
  document.getElementById('search_input_react').setAttribute("onfocusout", "setTimeout(cleanSearchResult, 500)");
}


/*
 *  SEARCH ENGINE
 */
function requestSearch(e) {
    if (e.keyCode == 13) { // Enter

      // Send request
      var result = fuse.search(e.srcElement.value);

      console.log(result);

      createSearchResult(result);
    }
}

function displayResult(result){
  for (var i = 0; i < result.length; i++) {
    var url = document.URL.split('/')[2] + "/wiki/" + result[i]["url"];
  }
}

function createSearchResult(result) {
  var resultDiv = document.createElement("DIV");
  var resultList = document.createElement("UL");
  for (var j = 0; j < 100; j++) {
    
    for (var i = 0; i < result.length; i++) {
      var link = document.createElement("A");

      link.setAttribute("href", document.URL.split('/')[2] + "/BC2019-Gama-Site/wiki/" + result[i]["url"]);
      link.appendChild( document.createTextNode(result[i]["title"] + " <i>("+result[i]["tag"] + ")</i>" ) );

      var li = document.createElement("LI");

      li.appendChild(link);

      resultList.appendChild( li );
    }
  }

  resultDiv.appendChild(resultList);

  resultDiv.id = "searchResult";
  document.body.appendChild(resultDiv);
}

function cleanSearchResult(){
  var searchResult = document.getElementById('searchResult');
  searchResult.parentNode.removeChild(searchResult);
}

// On page ready
// -> Wait Fuse.js to be loaded
document.addEventListener('DOMContentLoaded', initSearchEngine, false);