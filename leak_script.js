//timezone
const tz = Intl.DateTimeFormat().resolvedOptions().timeZone; //https://stackoverflow.com/questions/6939685/get-client-time-zone-from-browser
//console.log(tz);
document.getElementById("timezone").innerHTML = tz; //prints timezone

//get Browser details //https://stackoverflow.com/questions/11219582/how-to-detect-my-browser-version-and-operating-system-using-javascript
var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName  = navigator.appName;
var majorVersion = parseInt(navigator.appVersion,10);
var nameOffset,verOffset,ix;

// In Opera, the true version is after "Opera" or after "Version"
if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
 browserName = "Opera";
 fullVersion = nAgt.substring(verOffset+6);
 if ((verOffset=nAgt.indexOf("Version"))!=-1) 
   fullVersion = nAgt.substring(verOffset+8);
}
// In MSIE, the true version is after "MSIE" in userAgent
else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
 browserName = "Microsoft Internet Explorer";
 fullVersion = nAgt.substring(verOffset+5);
}
// In Chrome, the true version is after "Chrome" 
else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
 browserName = "Chrome";
 fullVersion = nAgt.substring(verOffset+7);
}
// In Safari, the true version is after "Safari" or after "Version" 
else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
 browserName = "Safari";
 fullVersion = nAgt.substring(verOffset+7);
 if ((verOffset=nAgt.indexOf("Version"))!=-1) 
   fullVersion = nAgt.substring(verOffset+8);
}
// In Firefox, the true version is after "Firefox" 
else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
 browserName = "Firefox";
 fullVersion = nAgt.substring(verOffset+8);
}
// In most other browsers, "name/version" is at the end of userAgent 
else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
          (verOffset=nAgt.lastIndexOf('/')) ) 
{
 browserName = nAgt.substring(nameOffset,verOffset);
 fullVersion = nAgt.substring(verOffset+1);
 if (browserName.toLowerCase()==browserName.toUpperCase()) {
  browserName = navigator.appName;
 }
}

majorVersion = parseInt(''+fullVersion,10);
if (isNaN(majorVersion)) {
 fullVersion  = ''+parseFloat(navigator.appVersion); 
 majorVersion = parseInt(navigator.appVersion,10);
}

document.getElementById("broswer_details").innerHTML = (''
 +'Browser name  = '+browserName+'<br>'
 +'Version = '+majorVersion+'<br>'
 +'navigator.appName = '+navigator.appName+'<br>'
 +'navigator.userAgent = '+navigator.userAgent+'<br>'
)

//Height and Width of screen //https://stackoverflow.com/questions/2242086/how-to-detect-the-screen-resolution-with-javascript
var height = window.screen.height;
var width = window.screen.width
document.getElementById("screen_size").innerHTML = ('Height = ' + height + '<br>' + 'Width = ' + width + '<br>')

//Viewport Width and Height <- This is more the size of the window they are viewing the website on //https://stackoverflow.com/questions/1248081/how-to-get-the-browser-viewport-dimensions
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
document.getElementById("viewport").innerHTML = ('Height = ' + vh + '<br>' + 'Width = ' + vw + '<br>')

//Color Depth //https://www.w3schools.com/jsref/prop_screen_colordepth.asp
var color_depth = screen.colorDepth;
document.getElementById("color_depth").innerHTML = color_depth

//Pixel Depth