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

var platform = navigator.platform;
var language = navigator.language;
var product = navigator.product;
var productSub = navigator.productSub;
var security = navigator.security;

document.getElementById("broswer_details").innerHTML = (''
 +'Browser name  = '+browserName+'<br>'
 +'Version = '+majorVersion+'<br>'
 +'navigator.appName = '+navigator.appName+'<br>'
 +'navigator.userAgent = '+navigator.userAgent+'<br>'
 +'Platform = ' + platform + '<br>'
 +'Language = ' + language + '<br>'
 +'product = '  + product + '<br>'
 +'product sub = ' + productSub + '<br>'
 +'security = ' + security + '<br>'
)

//Height and Width of screen //https://stackoverflow.com/questions/2242086/how-to-detect-the-screen-resolution-with-javascript
var height = window.screen.height;
var width = window.screen.width
document.getElementById("screen_size").innerHTML = ('Height = ' + height + '<br>' + 'Width = ' + width + '<br>')

//Viewport Width and Height <- This is more the size of the window they are viewing the website on //https://stackoverflow.com/questions/1248081/how-to-get-the-browser-viewport-dimensions
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
document.getElementById("viewport").innerHTML = ('Height = ' + vh + '<br>' + 'Width = ' + vw + '<br>');

//Color Depth //https://www.w3schools.com/jsref/prop_screen_colordepth.asp
var color_depth = screen.colorDepth;
document.getElementById("color_depth").innerHTML = color_depth;

//Pixel Depth //https://www.w3schools.com/jsref/prop_screen_pixeldepth.asp
var pixel_depth = screen.pixelDepth;
document.getElementById("pixel_depth").innerHTML = pixel_depth;


//Orientation
var orient;
if (height < width) {
   orient = "Landscape"
} else {
   orient = "Portrait"
}
document.getElementById("orientation").innerHTML = orient;

//Date & Time //https://phoenixnap.com/kb/how-to-get-the-current-date-and-time-javascript
var Date_Time = new Date();
var date = Date_Time.getFullYear()+'-'+(Date_Time.getMonth()+1)+'-'+Date_Time.getDate();
var time = Date_Time.getHours() + ":" + Date_Time.getMinutes() + ":" + Date_Time.getSeconds();
var offset = Date_Time.toString().match(/\(([A-Za-z\s].*)\)/)[1]; //https://stackoverflow.com/questions/1091372/getting-the-clients-time-zone-and-offset-in-javascript
document.getElementById("date_time").innerHTML = 'Date = ' + date + "<br>" + 'Time = ' + time + '<br>' + offset;

//Access to video and audio?? //well have to test this out
if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
   // Firefox 38+ seems having support of enumerateDevicesx
   navigator.enumerateDevices = function(callback) {
       navigator.mediaDevices.enumerateDevices().then(callback);
   };
}

var MediaDevices = [];
var isHTTPs = location.protocol === 'https:';
var canEnumerate = false;

if (typeof MediaStreamTrack !== 'undefined' && 'getSources' in MediaStreamTrack) {
   canEnumerate = true;
} else if (navigator.mediaDevices && !!navigator.mediaDevices.enumerateDevices) {
   canEnumerate = true;
}

var hasMicrophone = false;
var hasSpeakers = false;
var hasWebcam = false;

var isMicrophoneAlreadyCaptured = false;
var isWebcamAlreadyCaptured = false;

function checkDeviceSupport(callback) {
   if (!canEnumerate) {
       return;
   }

   if (!navigator.enumerateDevices && window.MediaStreamTrack && window.MediaStreamTrack.getSources) {
       navigator.enumerateDevices = window.MediaStreamTrack.getSources.bind(window.MediaStreamTrack);
   }

   if (!navigator.enumerateDevices && navigator.enumerateDevices) {
       navigator.enumerateDevices = navigator.enumerateDevices.bind(navigator);
   }

   if (!navigator.enumerateDevices) {
       if (callback) {
           callback();
       }
       return;
   }

   MediaDevices = [];
   navigator.enumerateDevices(function(devices) {
       devices.forEach(function(_device) {
           var device = {};
           for (var d in _device) {
               device[d] = _device[d];
           }

           if (device.kind === 'audio') {
               device.kind = 'audioinput';
           }

           if (device.kind === 'video') {
               device.kind = 'videoinput';
           }

           var skip;
           MediaDevices.forEach(function(d) {
               if (d.id === device.id && d.kind === device.kind) {
                   skip = true;
               }
           });

           if (skip) {
               return;
           }

           if (!device.deviceId) {
               device.deviceId = device.id;
           }

           if (!device.id) {
               device.id = device.deviceId;
           }

           if (!device.label) {
               device.label = 'Please invoke getUserMedia once.';
               if (!isHTTPs) {
                   device.label = 'HTTPs is required to get label of this ' + device.kind + ' device.';
               }
           } else {
               if (device.kind === 'videoinput' && !isWebcamAlreadyCaptured) {
                   isWebcamAlreadyCaptured = true;
               }

               if (device.kind === 'audioinput' && !isMicrophoneAlreadyCaptured) {
                   isMicrophoneAlreadyCaptured = true;
               }
           }

           if (device.kind === 'audioinput') {
               hasMicrophone = true;
           }

           if (device.kind === 'audiooutput') {
               hasSpeakers = true;
           }

           if (device.kind === 'videoinput') {
               hasWebcam = true;
           }

           // there is no 'videoouput' in the spec.

           MediaDevices.push(device);
       });

       if (callback) {
           callback();
       }
   });
}

// check for microphone/camera support!
checkDeviceSupport(function() {
   //document.write('hasWebCam: ', hasWebcam, '<br>');
   //document.write('hasMicrophone: ', hasMicrophone, '<br>');
   //document.write('isMicrophoneAlreadyCaptured: ', isMicrophoneAlreadyCaptured, '<br>');
   //document.write('isWebcamAlreadyCaptured: ', isWebcamAlreadyCaptured, '<br>');
   document.getElementById("a_v").innerHTML = 'hasWebCam: ' + hasWebcam + '<br>' + 'hasMicrophone: '+ hasMicrophone + '<br>' + 'isMicrophoneAlreadyCaptured: ' + isMicrophoneAlreadyCaptured + '<br>'
   'isWebcamAlreadyCaptured: ' +  isWebcamAlreadyCaptured +  '<br>';
});

//Read Clipboard //https://melvingeorge.me/blog/read-copied-text-from-clipboard-javascript
// get reference to paragraph
const paragraph = document.getElementById("textSpace");

// get reference to the button
const button = document.getElementById("btn");

// add click event handler to the button
// so that after clicking the button
// the copied text will be displayed in the paragraph tag
button.addEventListener("click", () => {
  // copy the text from clipboard
  navigator.clipboard.readText().then((copiedText) => {
    paragraph.innerText = copiedText;
  });
});

//Mouse Tracking //need to test this // https://www.tutorialspoint.com/javascript-focus
var pointerX = -1;
var pointerY = -1;
document.onmousemove = function(event) {
	pointerX = event.pageX;
	pointerY = event.pageY;
}
setInterval(pointerCheck, 1000);
function pointerCheck() {
	//console.log('Cursor at: '+pointerX+', '+pointerY);
   document.getElementById("X").innerHTML = 'Cursor at: '+pointerX+', '+pointerY;
}
document.getElementById("X").innerHTML = mousePos;
//IP Address
window.onload = function () {
   var script = document.createElement("script");
   script.type = "text/javascript";
   script.src = "https://api.ipify.org?format=jsonp&callback=DisplayIP";
   document.getElementsByTagName("head")[0].appendChild(script);
};
function DisplayIP(response) {
   document.getElementById("ipaddress").innerHTML = "Your IP Address is " + response.ip;
} 
