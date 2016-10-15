
var mousePageX = 0;
var mousePageY = 0;
var headerNav;
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
  // TODO add fallback for object-fit on Edge and IE
  // TODO disable this effect if on a phone

  // Add parallax on bg image
  var bgImg = document.getElementById('bg-image');
  var aboutUsImg = document.getElementById('about-us-img');
  setScrollSpeed(bgImg, 0.5, bodyContainer, {});
  setScrollSpeed(aboutUsImg, 0.15, aboutUsContainer, {});
  // TODO Disable parallax if IE and garbage

  // Make hamburger toggle open menu
  var menuIcon = document.getElementById('hamburger-icon-body');
  menuIcon.addEventListener('click', toggleMenuPopup, false);

  var headerIcon = document.getElementById('header-icon');
  headerIcon.addEventListener('click', scrollToTop, false);

  // Resize header and hide splash screen if scrolling past a certain point
  headerNav = document.getElementById('header-nav');
  document.addEventListener('scroll', headerController, false);
  document.addEventListener('scroll', splashController, false);
  headerController();
  splashController();

  // Initialize slideshow
  slideshow = new Slideshow('featured-slideshow');
  slideshow.initializeControls(slideshow);
});



// -------------------------------------------------------------------------------------------------------
// Menu Resizing
function headerController() {
  var breakpoint = 400;
  var currentPosition = window.scrollY;

  if(currentPosition > breakpoint) {
    addClass(headerNav, 'mini');
  }
  else {
    removeClass(headerNav, 'mini');
  }
}

// -------------------------------------------------------------------------------------------------------
// Splash Screen Hiding -- avoid overlap with footer
function splashController() {
  var breakpoint = window.innerHeight + 650;
  var currentPosition = window.scrollY;

  if(currentPosition > breakpoint) {
    addClass(mainSplash, 'background');
  }
  else {
    removeClass(mainSplash, 'background');
  }
}


// -------------------------------------------------------------------------------------------------------
// Hamburger Menu
function toggleMenuPopup() {
  var menu = document.getElementById('menu-popup');
  var icon = document.getElementById('hamburger-icon-body');
  if (menu !== undefined && icon !== undefined) {
    toggleClass(menu, 'open');
    toggleClass(icon, 'open');
  }
}

function closeMenuPopup() {
  var menu = document.getElementById('menu-popup');
  if (menu !== undefined) {
    removeClass(menu, 'open');
  }
}

function openMenuPopup() {
  var menu = document.getElementById('menu-popup');
  if (menu !== undefined) {
    addClass(menu, 'open');
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
function setScrollSpeed(element, speedMultiplier, parentElement, context) {
  var ticking = false;
  context.lastScrollY = 0;
  var parentElementY = parentElement.getBoundingClientRect().top;
  doScroll();

  function updatePosition() {
    var translateValue = Math.abs(context.lastScrollY * speedMultiplier);

    ticking = false;

    var translate = 'translate3d(-50%, ' + (-translateValue) + 'px, 0px)';
    element.style['-webkit-transform'] = translate;
    element.style['-moz-transform'] = translate;
    element.style['-ms-transform'] = translate;
    element.style['-o-transform'] = translate;
    element.style.transform = translate;
  }

  function doScroll() {

    if (!ticking) {
      context.lastScrollY = parentElement.getBoundingClientRect().top;
      window.requestAnimationFrame(updatePosition);
      ticking = true;
    }
  }

  window.addEventListener('scroll', doScroll, false);
  doScroll();
}


// -------------------------------------------------------------------------------------------------------
// Scroll to top of page
function scrollToTop() {
  var scrollSpeed = 30;
  var scrollStep = -window.scrollY / scrollSpeed,
      scrollInterval = setInterval(function(){
        if ( window.scrollY != 0 ) {
          window.scrollBy( 0, scrollStep );
        }
        else clearInterval(scrollInterval);
      },15);
}
