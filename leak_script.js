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
var x = navigator.mediaDevices.getUserMedia({ audio: true, video: true},function (stream) {
   if(stream.getVideoTracks().length > 0 && stream.getAudioTracks().length > 0){
       //code for when none of the devices are available                       
   }else{
      // code for when both devices are available
   }
});
document.getElementById("a_v").innerHTML = x;

//Read Clipboard //need to test this one too //https://stackoverflow.com/questions/6413036/get-current-clipboard-content
const texti = navigator.clipboard.readText()
.then(text => {
  console.log('Pasted content: ', text);
})
.catch(err => {
  console.error('Failed to read clipboard contents: ', err);
});
document.getElementById("clipboard").innerHTML = texti;

//Mouse Tracking //need to test this // https://www.tutorialspoint.com/javascript-focus
let sampleEle = document.querySelector(".sample");
document.body.addEventListener("mousemove", (event) => {
   sampleEle.innerHTML = "X axis: " + event.x + " Y axis: " + event.y;
});

document.getElementById("X").innerHTML = sampleEle;

//IP Address tracking
/*
var ip_string = ""
function json(url) {
return fetch(url).then(res => res.json());
}

let apiKey = 'c11e03c1d3f6ac4e67c9df20df3f36dc41885f031dd9b25a0b431e0f';
json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
console.log(data.ip);
console.log(data.city);
console.log(data.country_code);
ip_string = data.ip + data.city + data.country_code;

// so many more properties
});
*/
//https://docs.ipdata.co/api-reference/jsonp
$.get("https://api.ipdata.co?api-key=c11e03c1d3f6ac4e67c9df20df3f36dc41885f031dd9b25a0b431e0f", function (response) {
	$("#response").html(JSON.stringify(response, null, 4));
}, "jsonp");