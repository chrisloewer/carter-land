
// ------------------------------------ GENERAL UTILITIES ------------------------------------ //

function addClass(element, className) {
  if(element.classList.contains(className)) {
    // console.log(className + ' already in classList');
  }
  else {
    element.classList.add(className);
  }
}

function removeClass(element, className) {
  if(element.classList.contains(className)) {
    element.classList.remove(className);
  }
  else {
    // console.log(className + ' not in classList');
  }
}

function toggleClass(element, className) {
  if(element.classList.contains(className)) {
    element.classList.remove(className);
  }
  else {
    element.classList.add(className);
  }
}

function removeChildNodes(element) {
  while(element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}

// Adds leading zeros if necessary
function padInt(int, len){
  var str = int + '';
  while (str.length < len) {
    str = '0' + str;
  }
  return str;
}

// ------------------------------------ BROWSER UTILITIES ------------------------------------ //

function getBrowser() {
  // Opera 8.0+
  if ((window.opr && opr.addons) || window.opera || (navigator.userAgent.indexOf(' OPR/') >= 0))
    return "Opera";

  // Firefox 1.0+
  if (typeof InstallTrigger !== 'undefined')
    return "Firefox";

  // At least Safari 3+: "[object HTMLElementConstructor]"
  if (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0)
    return "Safari";

  // Internet Explorer 6-11
  if ((/*@cc_on!@*/false) || (document.documentMode))
    return "IE";

  // Edge 20+
  if (!(document.documentMode) && window.StyleMedia)
    return "Edge";

  // Chrome 1+
  if (window.chrome && window.chrome.webstore)
    return "Chrome";
}

  function getWindowScrollY() {
  if(window.scrollY !== undefined) {
    return window.scrollY;
  }
  else {
    return document.documentElement.scrollTop;
  }
}
