
var mainSplash;
var slideshow;

// Initial Page Load
window.addEventListener('load', function () {
  var bodyContainer = document.getElementById('body-container');
  mainSplash = document.getElementById('main-splash');
  var aboutUsContainer = document.getElementById('about-us');

  // Shift background image focus on mouse move
  document.addEventListener('mousemove', adjustBg, false);
  window.addEventListener('resize', adjustBg, false);
  // TODO disable this effect if on a phone

  // Add parallax on bg image
  var bgImg = document.getElementById('bg-image');
  var aboutUsImg = document.getElementById('about-us-img');
  setScrollSpeed(bgImg, 0.5, bodyContainer, {});
  setScrollSpeed(aboutUsImg, 0.15, aboutUsContainer, {});

  document.addEventListener('scroll', splashController, false);
  splashController();

  // Initialize slideshow
  slideshow = new Slideshow('featured-slideshow');
  slideshow.initializeControls(slideshow);

  // Update slideshow to use background-image if object-fit not supported
  if(!Modernizr.objectfit || getBrowser() == 'Firefox') {
    replaceSlideshowImages('featured-slideshow');
  }
});


// -------------------------------------------------------------------------------------------------------
// Splash Screen Hiding -- avoid overlap with footer
function splashController() {
  var breakpoint = window.innerHeight + 650;
  var currentPosition = getWindowScrollY();

  if(currentPosition > breakpoint) {
    addClass(mainSplash, 'background');
  }
  else {
    removeClass(mainSplash, 'background');
  }
}
