
var mousePageX = 0;
var mousePageY = 0;
var headerNav;


// Initial Page Load
window.addEventListener('load', function () {
  console.log('window load');

  // Shift background image focus on mouse move
  document.addEventListener('mousemove', adjustBg, false);
  window.addEventListener('resize', adjustBg, false);

  // Add parallax on bg image
  var bgImg = document.getElementById('bg-image');
  setScrollSpeed(bgImg, 0.5);
  // TODO Disable parallax if IE and garbage

  // Make hamburger toggle open menu
  var menuIcon = document.getElementById('hamburger-icon-body');
  var popupIcon = document.getElementById('hamburger-icon-popup');
  menuIcon.addEventListener('click', openMenuPopup, false);
  popupIcon.addEventListener('click', closeMenuPopup, false);

  // Resize nav menu on scroll
  // headerNav = document.getElementById('header-nav');
  // document.addEventListener('scroll', headerController, false);
  // headerController();
});



// -------------------------------------------------------------------------------------------------------
// Menu Resizing
function headerController() {
  var breakpoint = 400;
  var currentPosition = window.scrollY;

  if(currentPosition > breakpoint) {
    addClass(headerNav, 'icon');
  }
  else {
    removeClass(headerNav, 'icon');
  }
}


// -------------------------------------------------------------------------------------------------------
// Hamburger Menu
function toggleMenuPopup() {
  var menu = document.getElementById('menu-popup');
  var body = document.getElementById('body-container');
  if (menu !== undefined && body !== undefined) {
    toggleClass(menu, 'open');
    toggleClass(body, 'popup-open');
  }
}

function closeMenuPopup() {
  var menu = document.getElementById('menu-popup');
  var body = document.getElementById('body-container');
  if (menu !== undefined && body !== undefined) {
    removeClass(menu, 'open');
    removeClass(body, 'popup-open');
    var bodyContainer = document.getElementById('body-container');
    bodyContainer.removeEventListener('click', closeMenuPopup);
  }
}

function openMenuPopup() {
  var menu = document.getElementById('menu-popup');
  var body = document.getElementById('body-container');
  if (menu !== undefined && body !== undefined) {
    addClass(menu, 'open');
    addClass(body, 'popup-open');

    var bodyContainer = document.getElementById('body-container');
    // bodyContainer.addEventListener('click', closeMenuPopup, false);
    //  TODO Allow clicking minimized body to reopen body
  }
}


// -------------------------------------------------------------------------------------------------------
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


// -------------------------------------------------------------------------------------------------------
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

