const tz = Intl.DateTimeFormat().resolvedOptions().timeZone; //https://stackoverflow.com/questions/6939685/get-client-time-zone-from-browser
//console.log(tz);

document.getElementById("Code_Output").innerHTML = tz //prints timezone