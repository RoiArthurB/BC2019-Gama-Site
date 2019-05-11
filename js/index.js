	
/*
 *  INIT
 */
// On page ready
// -> Wait Fuse.js to be loaded
document.addEventListener('DOMContentLoaded', setImageHeight, false);

function setImageHeight(){
	document.getElementById("imgSoft").style.maxHeight = 'calc(65vh - ' + 2 * document.getElementById("promo").offsetHeight+'px)';
}