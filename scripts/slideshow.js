
function Slideshow(elementId) {

  var element = document.getElementById(elementId);
  var images = element.getElementsByTagName('img');
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
