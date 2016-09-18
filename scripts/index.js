
var mousePageX = 0;
var mousePageY = 0;


// Initial Page Load
window.addEventListener('load', function () {
  console.log('window load');

  // shift background image focus on mouse move
  document.addEventListener('mousemove', adjustBg, false);
  window.addEventListener('resize', adjustBg, false);

  // Add parallax on bg image
  var bgImg = document.getElementById('bg-image');
  setScrollSpeed(bgImg, 0.5);
});


// Adjust background position on mouse move
function adjustBg(e) {
  var bgImage = document.getElementById('bg-image');
  var winHeight = window.innerHeight;
  var winWidth = window.innerWidth;
  var adjustment = 15;

  //
  if(e.pageX !== undefined && e.pageY !== undefined) {
    mousePageX = e.pageX;
    mousePageY = e.pageY;
  }

  var pageX = mousePageX - (winWidth / 2);
  var pageY = mousePageY - (winHeight / 2);
  var x = (adjustment / winWidth) * pageX * -1 + (winWidth / 2);
  var y = (adjustment / winHeight)* pageY * -1 - 25;

  // bgImage.style.backgroundPosition = x + 'px ' + y + 'px';
  bgImage.style.left = x + 'px ';
  bgImage.style.top = y + 'px';
}


// Parallax scrolling
function setScrollSpeed(element, speedMultiplier) {
  var ticking = false;
  var lastScrollY = 0;
  doScroll();

  function updatePosition() {
    var translateValue = lastScrollY * speedMultiplier;

    if (translateValue < 0) {
      translateValue = 0;
    }

    ticking = false;

    var translate = 'translate3d(-50%, -' + translateValue + 'px, 0px)';
    element.style['-webkit-transform'] = translate;
    element.style['-moz-transform'] = translate;
    element.style['-ms-transform'] = translate;
    element.style['-o-transform'] = translate;
    element.style.transform = translate;
  }

  function doScroll() {
    lastScrollY = window.pageYOffset;

    if (!ticking) {
      window.requestAnimationFrame(updatePosition);
      ticking = true;
    }
  }

  window.addEventListener('scroll', doScroll, false);
}
