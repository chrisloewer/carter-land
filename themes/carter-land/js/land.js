
// Initial Page Load
window.addEventListener('load', function () {

  // Initialize slideshow
  var slideshows = document.getElementsByClassName('slideshow');
  var len = slideshows.length;
  for(var i=0; i< len; i++) {
    var s = new Slideshow(slideshows[i], true);
    s.initializeControls(s);
  }

  // Lazy-load images
  echo.init({
    offset: 100,
    throttle: 250,
    unload: false
  });
});

function toggleMap(elemId, root) {
  var elem = document.getElementById('prop-map-' + elemId);

  if(root.dataset.active === 'false') {
    addClass(elem, 'active');
    root.innerText = 'Hide Map';
    root.dataset.active = true;
  }
  else {
    removeClass(elem, 'active');
    root.innerText = 'View Map';
    root.dataset.active = false;
  }

  // Load map if not loaded
  var iframe = document.getElementById('map-frame-' + elemId);
  if(iframe.src === "") {
    iframe.src = iframe.dataset.src;
  }
}

function enableScroll(root) {
  addClass(root, 'scrollable');
}

function disableScroll(root) {
  removeClass(root, 'scrollable');
}
