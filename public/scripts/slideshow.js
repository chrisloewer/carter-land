
function Slideshow(element, hasFullscreen) {

  if (hasFullscreen === undefined) {
    hasFullscreen = false;
  }

  var slideshowBody = element.getElementsByClassName('slideshow-body')[0];
  var images = element.getElementsByClassName('slide');
  var imgCount = images.length;
  var prevButton = element.getElementsByClassName('prev')[0];
  var nextButton = element.getElementsByClassName('next')[0];
  var currentPage = 0;
  var touches = {
    "touchstart": {"x":-1, "y":-1},
    "touchmove" : {"x":-1, "y":-1},
    "touchend"  : false,
    "direction" : "undetermined"
  };

  // Persistent variables
  this.imageContainer = element.getElementsByClassName('image-container')[0];
  this.bgModal = undefined;
  this.closeIcon = undefined;

  // Set first image to active
  addClass(images[currentPage], 'active');


  this.initializeControls = function (context) {

    nextButton.addEventListener('click', function () {
      context.nextSlide();
    });
    prevButton.addEventListener('click', function () {
      context.prevSlide();
    });

    slideshowBody.addEventListener('touchstart', function (e) {
      touchHandler(e, context);
    }, {passive: true});
    slideshowBody.addEventListener('touchmove', function (e) {
      touchHandler(e, context);
    }, {passive: true});
    slideshowBody.addEventListener('touchend', function (e) {
      touchHandler(e, context);
    }, {passive: true});

    // Fallback for browsers with poor support
    if (!Modernizr.objectfit || getBrowser() == 'Firefox') {
      this.replaceSlideshowImages();
    }

    if (hasFullscreen) {
      var fullscreenButton = element.getElementsByClassName('has-fullscreen')[0];
      this.bgModal = element.getElementsByClassName('modal-backdrop')[0];
      this.closeIcon = element.getElementsByClassName('close-icon')[0];

      fullscreenButton.addEventListener('click', function () {
        context.toggleFullscreen();
      });
      this.closeIcon.addEventListener('click', function () {
        context.toggleFullscreen();
      });
    }
  };

  this.nextSlide = function () {
    if (currentPage < imgCount - 1) {
      removeClass(images[currentPage], 'active');
      currentPage++;
      translateElement(this.imageContainer, currentPage * -100 + '%');
      addClass(images[currentPage], 'active');
      if ('echo' in window && echo !== undefined) {
        echo.render();
      }
    }
  };

  this.prevSlide = function () {
    if (currentPage > 0) {
      removeClass(images[currentPage], 'active');
      currentPage--;
      translateElement(this.imageContainer, currentPage * -100 + '%');
      addClass(images[currentPage], 'active');
    }
  };

  this.toggleFullscreen = function () {
    var body = document.getElementById('body');
    var bodyContainer = document.getElementById('body-container');

    if (this.bgModal !== undefined) {
      toggleClass(this.bgModal, 'open');
      toggleClass(bodyContainer, 'modal-open');
      toggleClass(body, 'scroll-lock');
    }
  };

  // Fallback for browser that don't support object-fit - replace images with divs with bg-img
  this.replaceSlideshowImages = function () {
    var images = this.imageContainer.getElementsByTagName('img');
    var len = images.length;

    for (var i = 0; i < len; i++) {
      // Check if image is lazy-loaded with echo
      var src = (images[0].dataset.echo !== undefined) ? images[0].dataset.echo : images[0].getAttribute('src');
      var div = document.createElement('div');

      addClass(div, 'slide');
      if (i == 0) {
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

  function touchHandler(e, context) {
    var touch;
    var minTouchDistance = 50;
    if (typeof e !== 'undefined'){
      // e.preventDefault();
      if (typeof e.touches !== 'undefined') {
        touch = e.touches[0];
        switch (e.type) {
          case 'touchstart':
          case 'touchmove':
            touches[e.type].x = touch.pageX;
            touches[e.type].y = touch.pageY;
            break;
          case 'touchend':
            touches[e.type] = true;
            if (touches.touchstart.y > -1 && touches.touchmove.y > -1) {
              touches.direction = touches.touchstart.x < touches.touchmove.x ? "right" : "left";
              var swipeDistX = Math.abs(touches.touchstart.x - touches.touchmove.x);
              var swipeDistY = Math.abs(touches.touchstart.y - touches.touchmove.y);

              if(touches.direction == 'left' && swipeDistX > minTouchDistance && swipeDistX > swipeDistY) {
                context.nextSlide();
              }
              else if(touches.direction == 'right' && swipeDistX > minTouchDistance && swipeDistX > swipeDistY) {
                context.prevSlide();
              }
            }

            // Reset
            touches = {
              "touchstart": {"x":-1, "y":-1},
              "touchmove" : {"x":-1, "y":-1},
              "touchend"  : false,
              "direction" : "undetermined"
            };
            break;
          default:
            break;
        }
      }
    }
  }

}
