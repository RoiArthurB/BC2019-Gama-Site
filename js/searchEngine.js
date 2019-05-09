//import Fuse from 'fuse.js';

/*
var request = new XMLHttpRequest();
request.open('POST', 'database/index.json', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);

    console.log(data);
  } else {
    // We reached our target server, but it returned an error
    console.error("Can't load database for Search Engine");
    console.error(request);
  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();
*/

// Get generated json index
//const database = 'database/index.json'.toURL().text();
/*
const fuse = new Fuse(database, {
  keys: ['title'],
  shouldSort: true
});*/

var client = new XMLHttpRequest();
client.open('GET', 'database/index.json');
client.onreadystatechange = function() {
  alert(client.responseText);
}
client.send();