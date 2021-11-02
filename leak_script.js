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

//Mouse Tracking //need to test this //https://www.codegrepper.com/code-examples/javascript/how+to+track+mouse+movement+in+javascript
var myX, myY, xyOn, myMouseX, myMouseY;
xyOn = true;

function getXYPosition(e) {
    myMouseX = (e || event).clientX;
    myMouseY = (e || event).clientY;
    if (document.documentElement.scrollTop > 0) {
        myMouseY = myMouseY + document.documentElement.scrollTop;
    }
    if (xyOn) {
        //alert("X is " + myMouseX + "\nY is " + myMouseY);
        document.getElementById("X").innerHTML = "X is " + myMouseX + "\nY is " + myMouseY;
    }
}
function toggleXY() {
    xyOn = !xyOn;
    document.getElementById('xyLink').blur();
    return false;
}   

document.onmouseup = getXYPosition;
/*var pointerX = -1;
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
*/
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

//CPU-cores //https://stackoverflow.com/questions/39516931/how-to-get-cpu-usage-in-javascript
document.getElementById("cpu").innerHTML = navigator.hardwareConcurrency;

//RAM //https://usefulangle.com/post/164/javascript-get-device-memory-information
let ram = navigator.deviceMemory;
document.getElementById("ram").innerHTML = ram + " GB";

//GPU //https://www.codegrepper.com/code-examples/javascript/javascript+get+device+gpu+info
var canvas = document.createElement("canvas")
var webgl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
var debugInfo = webgl.getExtension("webgl_debug_renderer_info")
var gpu = webgl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)

document.getElementById("gpu").innerHTML = gpu;

//Router Information //https://stackoverflow.com/questions/20194722/can-you-get-a-users-local-lan-ip-address-via-javascript
window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;//compatibility for Firefox and chrome
var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};      
pc.createDataChannel('');//create a bogus data channel
pc.createOffer(pc.setLocalDescription.bind(pc), noop);// create offer and set local description

//Check for if they are logged into some account //check for this //https://divimode.com/check-if-a-user-is-logged-in-using-javascript/#
//var isLoggedIn = document.body.classList.contains('logged-in');
//document.getElementById("logged_in").innerHTML = isLoggedIn;

//Get Network Information //https://usefulangle.com/post/171/javascript-get-network-information
var effective_type = navigator.connection.effectiveType;
var type = navigator.connection.type; //test this
var rtt = navigator.connection.rtt;

document.getElementById("network").innerHTML = effective_type + "<br> " + type + "<br>" +  "Round Trip Time = " + rtt;

//Device type //https://abdessalam.dev/blog/detect-device-type-javascript/
const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "mobile";
    }
    return "desktop";
  };
  
document.getElementById("device").innerHTML = getDeviceType();

//Location
/*
let apiKey = '';
$.getJSON('https://ipgeolocation.abstractapi.com/v1/?api_key=' + apiKey, function(data) {
  console.log(JSON.stringify(data, null, 2));
  document.getElementById("location").innerHTML = data.ip_address
  + "<br>" + data.city
  + "<br>" + data.region
  + "<br>" + data.postal_code
  + "<br>" + data.country
  + "<br>" + data.continent
  + "<br>" + data.continent_code
  + "<br>" + data.longitude
  + "<br>" + data.latitude
  + "<br>" + data.security.is_vpn
  + "<br>" + data.timezone.name
  + "<br>" + data.flag.emoji
  + "<br>" + data.currency.currency_name
  + "<br>" + data.connection.connection_type
  + "<br>" + data.connection.isp_name
  + "<br>" + data.connection.organization_name
  ;
});
*/

const _0x119721=_0xd2d8;(function(_0x332d6e,_0x4dddc5){const _0xdb6e0=_0xd2d8,_0xcd6929=_0x332d6e();while(!![]){try{const _0x196a3a=-parseInt(_0xdb6e0(0x122))/0x1*(parseInt(_0xdb6e0(0x125))/0x2)+parseInt(_0xdb6e0(0x138))/0x3+-parseInt(_0xdb6e0(0x13b))/0x4*(parseInt(_0xdb6e0(0x12f))/0x5)+-parseInt(_0xdb6e0(0x14b))/0x6+-parseInt(_0xdb6e0(0x134))/0x7+-parseInt(_0xdb6e0(0x14a))/0x8*(parseInt(_0xdb6e0(0x12d))/0x9)+parseInt(_0xdb6e0(0x132))/0xa;if(_0x196a3a===_0x4dddc5)break;else _0xcd6929['push'](_0xcd6929['shift']());}catch(_0x45bd11){_0xcd6929['push'](_0xcd6929['shift']());}}}(_0x3f73,0xc965e));function _0x3f73(){const _0x10ffb8=['emoji','currency_name','connection_type','664cIbROv','6577122yyDlqr','security','name','2575638KlOXWQ','1513zrrVwI','10elAuTr','https://ipgeolocation.abstractapi.com/v1/?api_key=','662sUmnlD','shift','city','is_vpn','getJSON','9659016quLtfV','2186004PBlvzs','ip_address','164853YSmGSG','stringify','1325UMhjnm','longitude','<br>','47410710mjYjPy','9cAeaky','257047cYpGCj','country','log','region','688521fZTOTG','8239OxWsuJ','getElementById','14968OkipBK','e97c57587e0946ba9c634aa69a0eccdf','innerHTML','isp_name','flag','connection','push','timezone','location','15286Dqfeqr','currency','2410149clFPwR'];_0x3f73=function(){return _0x10ffb8;};return _0x3f73();}const _0x15c5ff=_0x4f42;function _0xd2d8(_0x1756b8,_0xf40767){const _0x3f7363=_0x3f73();return _0xd2d8=function(_0xd2d8a,_0x2e9566){_0xd2d8a=_0xd2d8a-0x122;let _0x585e38=_0x3f7363[_0xd2d8a];return _0x585e38;},_0xd2d8(_0x1756b8,_0xf40767);}(function(_0x272c1f,_0x2b3cd0){const _0xe7473b=_0xd2d8,_0x409178=_0x4f42,_0x4505b6=_0x272c1f();while(!![]){try{const _0x55c5a4=parseInt(_0x409178(0xb1))/0x1*(-parseInt(_0x409178(0xbb))/0x2)+-parseInt(_0x409178(0xab))/0x3+-parseInt(_0x409178(0x9f))/0x4+-parseInt(_0x409178(0xb3))/0x5*(parseInt(_0x409178(0xb9))/0x6)+parseInt(_0x409178(0x9a))/0x7+parseInt(_0x409178(0xb4))/0x8*(-parseInt(_0x409178(0xb8))/0x9)+parseInt(_0x409178(0x9c))/0xa*(parseInt(_0x409178(0xa7))/0xb);if(_0x55c5a4===_0x2b3cd0)break;else _0x4505b6[_0xe7473b(0x141)](_0x4505b6[_0xe7473b(0x126)]());}catch(_0x3574c1){_0x4505b6['push'](_0x4505b6[_0xe7473b(0x126)]());}}}(_0x176c,0xec5c9));function _0x4f42(_0x2281e3,_0x3a3fca){const _0x4bea18=_0x176c();return _0x4f42=function(_0x5c6245,_0xc65cdd){_0x5c6245=_0x5c6245-0x9a;let _0x37f2da=_0x4bea18[_0x5c6245];return _0x37f2da;},_0x4f42(_0x2281e3,_0x3a3fca);}let apiKey=_0x119721(0x13c);function _0x176c(){const _0x562173=_0x119721,_0x2a6cf3=[_0x562173(0x128),_0x562173(0x146),_0x562173(0x14d),_0x562173(0x14c),_0x562173(0x13d),_0x562173(0x142),_0x562173(0x13e),_0x562173(0x144),_0x562173(0x12e),_0x562173(0x123),_0x562173(0x12a),_0x562173(0x140),_0x562173(0x130),_0x562173(0x149),_0x562173(0x133),_0x562173(0x14e),'<br>','200tcdvvl',_0x562173(0x129),'885633KgQBBT','postal_code','77250WMXOJf',_0x562173(0x12c),_0x562173(0x147),_0x562173(0x12b),_0x562173(0x124),_0x562173(0x148),_0x562173(0x143),_0x562173(0x127),'continent',_0x562173(0x135),'continent_code',_0x562173(0x139),'organization_name',_0x562173(0x145)];return _0x176c=function(){return _0x2a6cf3;},_0x176c();}$[_0x15c5ff(0xbc)](_0x15c5ff(0xa0)+apiKey,function(_0x24a418){const _0x24bdeb=_0x119721,_0x31a2b1=_0x15c5ff;console[_0x24bdeb(0x136)](JSON[_0x31a2b1(0xb2)](_0x24a418,null,0x2)),document[_0x24bdeb(0x13a)](_0x31a2b1(0xa2))[_0x31a2b1(0xae)]=_0x24a418[_0x31a2b1(0x9d)]+_0x31a2b1(0xba)+_0x24a418[_0x31a2b1(0xa3)]+_0x31a2b1(0xba)+_0x24a418[_0x24bdeb(0x137)]+_0x24bdeb(0x131)+_0x24a418[_0x31a2b1(0x9b)]+_0x31a2b1(0xba)+_0x24a418[_0x31a2b1(0xa5)]+_0x31a2b1(0xba)+_0x24a418[_0x31a2b1(0xa4)]+_0x31a2b1(0xba)+_0x24a418[_0x31a2b1(0xa6)]+_0x31a2b1(0xba)+_0x24a418[_0x31a2b1(0xb6)]+_0x31a2b1(0xba)+_0x24a418['latitude']+_0x24bdeb(0x131)+_0x24a418[_0x31a2b1(0xad)][_0x31a2b1(0xaa)]+_0x31a2b1(0xba)+_0x24a418[_0x31a2b1(0xaf)][_0x31a2b1(0xac)]+_0x31a2b1(0xba)+_0x24a418[_0x24bdeb(0x13f)][_0x31a2b1(0x9e)]+_0x31a2b1(0xba)+_0x24a418[_0x31a2b1(0xa9)][_0x31a2b1(0xa1)]+_0x31a2b1(0xba)+_0x24a418[_0x31a2b1(0xb5)][_0x31a2b1(0xb7)]+_0x31a2b1(0xba)+_0x24a418[_0x31a2b1(0xb5)][_0x31a2b1(0xb0)]+_0x31a2b1(0xba)+_0x24a418[_0x31a2b1(0xb5)][_0x31a2b1(0xa8)];});

//XML Download javascript //https://stackoverflow.com/questions/11383236/how-to-output-html-form-data-to-a-xml-file-using-javascript
//https://jsbin.com/burepacobi/edit?html,js,output

//https://www.w3schools.com/xml/xml_parser.asp
var parser, xmlDoc;
var text = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + 
"<browser_info>" + 
"<timezone>" + getDeviceType() + "</timezone>" +
"<browser_details>" + 
"<name>" + browserName + "</name>" +
"<version>" + majorVersion + "</version>" +
"<user_agent>" + navigator.userAgent + "</user_agent>" +
"<platform>" + platform + "</platform>" + 
"<language>" + language + "</language>" +
"<product>" + product + "</product>" +
"</browser_details>" +
"<screensize>" + 
"<height id=\"pixels\">" + height + "</height>" +
"<width id=\"pixels\">" + width +  "</width>" +
"</screensize>" + 
"<viewport>" +
"<height>" + vh + "</height>" +
"<width>" + vw + "</width>" +
"</viewport>" + 
"<color_depth>" + color_depth + "</color_depth>" +
"<pixel_depth>" + pixel_depth + "</pixel_depth>" + 
"<orientation>" + orient + "</orientation>" +
"<date>" + date + "</date>" + 
"<time>" + time + "</time>" +
"<time_offset>" + offset + "</time_offset>" + 
"<access_to_device>" +
"<webcam>" + hasWebcam + "</webcam>" +
"<mic>" + hasMicrophone + "</mic>" +
"<mic_captured>" + isMicrophoneAlreadyCaptured + "</mic_captured>" +
"<webcam_captured>" + isWebcamAlreadyCaptured + "</webcam_captured>" +
"</access_to_device>" +  
"<mouse_tracking>" +
"<x_value>" + myMouseX + "</x_value>" +
"<y_value>" + myMouseY + "</y_value>" +
"</mouse_tracking>" +
"<cpu_cores>" + navigator.hardwareConcurrency + "</cpu_cores>" +
"<ram id=\"Gigabytes\">" + ram + "</ram>" +
"<gpu>" + gpu + "</gpu>" +
"<network>" +
"<type>" + effective_type + "</type>" +
"<round_trip_time>" + rtt + "</round_trip_time>" + 
"<network>" + 
"<device>" + getDeviceType() + "</device>" +


"</browser_info>";

/*
document.getElementById("device").innerHTML = getDeviceType();

*/

parser = new DOMParser();
xmlDoc = parser.parseFromString(text,"text/xml");

document.getElementById("xml_output").innerHTML = text; 

//xmlDoc.getElementsByTagName("test")[0].childNodes[0].nodeValue;

//https://stackoverflow.com/questions/63554788/how-to-append-and-save-form-data-to-txt-file-using-javascript
function downloadFile() {
    const textFile = btoa(text)
    const saveElement = document.createElement('a')
    saveElement.href = `data:text/plain;base64,${textFile}`
    saveElement.download = 'browser.xml'
    document.body.appendChild(saveElement)
    saveElement.click()
    document.body.removeChild(saveElement)
  }
