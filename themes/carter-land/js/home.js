
var mainSplash;
var slideshow;

// Initial Page Load
window.addEventListener('load', function () {
  var bodyContainer = document.getElementById('body-container');
  mainSplash = document.getElementById('main-splash');
  var aboutUsContainer = document.getElementById('about-us');
  var splashBgImage = document.getElementById('bg-image');

  // Shift background image focus on mouse move
  window.addEventListener('resize', adjustBg, false);
  document.addEventListener('mousemove', adjustBg, false);
  splashBgImage.addEventListener('touchend', function (e) {
    if(e instanceof TouchEvent && e.cancelable) {
      e.preventDefault();
    }
  }, false);

  // Add parallax on bg image
  var bgImg = document.getElementById('bg-image');
  setScrollSpeed(bgImg, 0.5, bodyContainer, {});
  var aboutUsImg = document.getElementById('about-us-img');
  setScrollSpeed(aboutUsImg, 0.2, aboutUsContainer, {});

  document.addEventListener('scroll', splashController, false);
  splashController();


  // Lazy-load images
  // echo.init({
  //   offset: 100,
  //   throttle: 250,
  //   unload: false
  // });

});


// -------------------------------------------------------------------------------------------------------
// Splash Screen Hiding -- avoid overlap with footer
function splashController() {
  var breakpoint = window.innerHeight + 100;
  var currentPosition = getWindowScrollY();

  if(currentPosition > breakpoint) {
    addClass(mainSplash, 'background');
  }
  else {
    removeClass(mainSplash, 'background');
  }
}

// -------------------------------------------------------------------------------------------------------
// Validate Form
function validateForm() {
  var form = document.forms['contact-form'];
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var emailAddress = form['email'].value;
  var emailBody = form['body'].value;
  var emailError = document.getElementById('email-error');
  var bodyError = document.getElementById('body-error');

  removeClass(emailError, 'visible');
  removeClass(bodyError, 'visible');

  if(!regex.test(emailAddress)) {
    addClass(emailError, 'visible');
    return false;
  }
  if(emailBody == null || emailBody == '') {
    addClass(bodyError, 'visible');
    return false;
  }

  return true;
}
