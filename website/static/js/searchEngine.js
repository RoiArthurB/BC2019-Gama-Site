//import Fuse from 'fuse.js';

/*
 *  VARIABLES
 */
var database, fuse;

var realUrl = document.URL.split('/');

var options = {
  shouldSort: false,
  tokenize: true,
  findAllMatches: true,
  threshold: 0.2,
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
  client.open('GET', '../database/index.json');

  // Prepare request
  client.onreadystatechange = function() {
  
    // Get database
    const tmp = client.responseText;
    database = JSON.parse(tmp);

    // Load Fuse search engine
    fuse = new Fuse(database, options);

    /*  EVENT LISTENER  */
    if (realUrl[realUrl.length -1] == "search" || realUrl[realUrl.length -1].charAt(6) == "?"){
      // Redirect API
      endpoint();
    }else{
      // Get search input
      document.getElementById('search_input_react').addEventListener('keyup', requestSearch);
      document.getElementById('search_input_react').setAttribute("onfocusout", "setTimeout(cleanSearchResult, 200)");
    }
  }

  // Send request
  client.send();
}


/*
 *  SEARCH ENGINE
 */
function requestSearch(e) {

  // Clean previous result (if multiple request)
  cleanSearchResult();

  // Don't display empty result if field empty
  if( e.srcElement.value != "") {
    // Send request
    var result = fuse.search(e.srcElement.value);

    createSearchResult(result);
  }
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
    var url = queryBuilder( result[i]["url"] );
    
    link.setAttribute( "href", url.replace(/\s/g, '') );
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


/*
 *  END POINT
 */
function endpoint(){
  var getRequest = document.URL.split('?')[1];

  console.log(getRequest);

  if (getRequest == undefined || getRequest == '' ){
    // Home doc
    window.location.replace( queryBuilder(true, true, true) );
  }

  /* Request on tag */
  const optionsTag = {
    findAllMatches: true,
    threshold: 0.1,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      "tag"
    ]
  };
  fuse = new Fuse(database, optionsTag);
  var resultTag = fuse.search( getRequest.split("&")[0].split("=")[1] );

  if (resultTag.length == 0)
    resultTag = database;

  /* Request on title 
  on filtred db */
  const optionsTitle = {
    shouldSort: true,
    findAllMatches: true,
    threshold: 0.1,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      "title"
    ]
  };

  fuse = new Fuse(resultTag, optionsTitle);
  resultTag = fuse.search( getRequest.split("&")[1].split("=")[1] )[0];
  if (resultTag == undefined)
    window.location.replace( queryBuilder(true, true, true) );
  else
    window.location.replace( queryBuilder(resultTag["url"]) );
}

function queryBuilder(item, wiki=true, doc=false){
    var url;

    if(doc){
      if (realUrl[3] == "search")
        url = realUrl[0] + "//" + realUrl[2] + "/wiki/Home";
      else
        url = realUrl[0] + "//" + realUrl[2] + "/" + realUrl[3] + "/wiki/Home"; 
    }else{

      if (wiki) {
        if (realUrl[3] == "wiki")
          url = realUrl[0] + "//" + realUrl[2] + "/wiki/" + item;
        else
          url = realUrl[0] + "//" + realUrl[2] + "/" + realUrl[3] + "/wiki/" + item; 
      }
      else{
          url = realUrl[0] + "//" + realUrl[2] + item;
      }

    }

    return url;
}

/*
 *  INIT
 */
// On page ready
// -> Wait Fuse.js to be loaded
document.addEventListener('DOMContentLoaded', initSearchEngine, false);