
// Initial Page Load
window.addEventListener('load', function () {

  // Initialize slideshow
  var slideshowOne= new Slideshow('prop-slideshow-1', true);
  slideshowOne.initializeControls(slideshowOne);

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
