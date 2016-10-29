
// Initial Page Load
window.addEventListener('load', function () {

  // Initialize slideshow
  // var item = document.getElementById('prop-slideshow-1');
  // var slideshowOne= new Slideshow(item, true);
  // slideshowOne.initializeControls(slideshowOne);

  var slideshows = document.getElementsByClassName('slideshow');
  var len = slideshows.length;
  for(var i=0; i< len; i++) {
    var ss = new Slideshow(slideshows[i], true);
    ss.initializeControls(ss);
  }
});

function toggleDescription(elemId, root) {
  var elem = document.getElementById(elemId);

  if(root.dataset.active == 'false') {
    addClass(elem, 'active');
    root.innerText = 'View Less Information';
    root.dataset.active = true;
  }
  else {
    removeClass(elem, 'active');
    root.innerText = 'View More Information';
    root.dataset.active = false;
  }
}

function toggleMap(elemId, root) {
  var elem = document.getElementById(elemId);

  if(root.dataset.active == 'false') {
    addClass(elem, 'active');
    root.innerText = 'Hide Map';
    root.dataset.active = true;
  }
  else {
    removeClass(elem, 'active');
    root.innerText = 'View Map';
    root.dataset.active = false;
  }
}
