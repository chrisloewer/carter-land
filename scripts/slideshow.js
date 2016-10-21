
function Slideshow(elementId) {

  var element = document.getElementById(elementId);
  var images = element.getElementsByClassName('slide');
  var imgCount = images.length;
  this.imageContainer = element.getElementsByClassName('image-container')[0];
  var prevButton = element.getElementsByClassName('prev')[0];
  var nextButton = element.getElementsByClassName('next')[0];
  var currentPage = 0;
  addClass(images[currentPage], 'active');

  this.initializeControls = function(context) {
    nextButton.addEventListener('click', function () {
      context.nextSlide();
    });
    prevButton.addEventListener('click', function() {
      context.prevSlide();
    });
  };

  function translateElement(element, amount) {
    var translate = 'translateX(' + amount + ')';
    element.style['-webkit-transform'] = translate;
    element.style['-moz-transform'] = translate;
    element.style['-ms-transform'] = translate;
    element.style['-o-transform'] = translate;
    element.style.transform = translate;
  }

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
}

// -------------------------------------------------------------------------------------------------------
// Fallback for browser that don't support object-fit - replace images with divs with bg-img
function replaceSlideshowImages(elementId) {
  var element = document.getElementById(elementId);
  var imageContainer = element.getElementsByClassName('image-container')[0];
  var images = imageContainer.getElementsByTagName('img');
  var len = images.length;

  for(var i=0; i < len; i++) {
    var src = images[0].getAttribute('src');
    var div = document.createElement('div');
    addClass(div, 'slide');
    if(i==0) {
      addClass(div, 'active');
    }
    div.style.backgroundImage = 'url(' + src + ')';
    imageContainer.appendChild(div);

    // This removes the element from the image array as well,
    // so using the index of 1 instead of i removes the first element
    imageContainer.removeChild(images[0]);
  }
}
