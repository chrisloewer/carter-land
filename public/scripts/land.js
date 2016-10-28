
// Initial Page Load
window.addEventListener('load', function () {

  // Initialize slideshow
  var slideshowOne= new Slideshow('prop-slideshow-1', true);
  slideshowOne.initializeControls(slideshowOne);

  // Update slideshow to use background-image if object-fit not supported
  if(!Modernizr.objectfit || getBrowser() == 'Firefox') {
    replaceSlideshowImages('prop-slideshow-1');
  }
});

function toggleSlideshow() {
  var modalBgOne = document.getElementById('modal-bg-1');
  var bodyContainer = document.getElementById('body-container');

  toggleClass(modalBgOne, 'open');
  toggleClass(bodyContainer, 'modal-open');
}
