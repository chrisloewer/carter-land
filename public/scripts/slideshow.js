
function Slideshow(element, hasFullscreen) {

  if(hasFullscreen === undefined) {
    hasFullscreen = false;
  }

  var images = element.getElementsByClassName('slide');
  var imgCount = images.length;
  var prevButton = element.getElementsByClassName('prev')[0];
  var nextButton = element.getElementsByClassName('next')[0];
  var currentPage = 0;

  // Persistent variables
  this.imageContainer = element.getElementsByClassName('image-container')[0];
  this.bgModal = undefined;
  this.closeIcon = undefined;

  // Set first image to active
  addClass(images[currentPage], 'active');


  this.initializeControls = function(context) {

    nextButton.addEventListener('click', function () { context.nextSlide(); });
    prevButton.addEventListener('click', function() { context.prevSlide(); });

    // Fallback for browsers with poor support
    if(!Modernizr.objectfit || getBrowser() == 'Firefox') {
      this.replaceSlideshowImages();
    }

    if(hasFullscreen) {
      var fullscreenButton = element.getElementsByClassName('has-fullscreen')[0];
      this.bgModal = element.getElementsByClassName('modal-backdrop')[0];
      this.closeIcon = element.getElementsByClassName('close-icon')[0];

      fullscreenButton.addEventListener('click', function () { context.toggleFullscreen(); });
      this.closeIcon.addEventListener('click', function () { context.toggleFullscreen(); });
    }
  };

  this.nextSlide = function() {
    if(currentPage < imgCount-1) {
      removeClass(images[currentPage], 'active');
      currentPage++;
      translateElement(this.imageContainer, currentPage*-100 + '%');
      addClass(images[currentPage], 'active');
    }
  };

  this.prevSlide = function() {
    if(currentPage > 0) {
      removeClass(images[currentPage], 'active');
      currentPage--;
      translateElement(this.imageContainer, currentPage*-100 + '%');
      addClass(images[currentPage], 'active');
    }
  };

  this.toggleFullscreen = function() {
    var bodyContainer = document.getElementById('body-container');

    if(this.bgModal !== undefined) {
      toggleClass(this.bgModal, 'open');
      toggleClass(bodyContainer, 'modal-open');
    }
  };

  // Fallback for browser that don't support object-fit - replace images with divs with bg-img
  this.replaceSlideshowImages = function() {
    var images = this.imageContainer.getElementsByTagName('img');
    var len = images.length;

    for(var i=0; i < len; i++) {
      var src = images[0].getAttribute('src');
      var div = document.createElement('div');
      addClass(div, 'slide');
      if(i==0) {
        addClass(div, 'active');
      }
      div.style.backgroundImage = 'url(' + src + ')';
      this.imageContainer.appendChild(div);

      // This removes the element from the image array as well,
      // so using the index of 0 instead of i removes the first element
      this.imageContainer.removeChild(images[0]);
    }
  };

  function translateElement(element, amount) {
    var translate = 'translateX(' + amount + ')';
    element.style['-webkit-transform'] = translate;
    element.style['-moz-transform'] = translate;
    element.style['-ms-transform'] = translate;
    element.style['-o-transform'] = translate;
    element.style.transform = translate;
  }

}
