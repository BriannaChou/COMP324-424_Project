/*var usernames = [
	'userjalan',
	'userbrianna',
	'userharris'
];
var passwords = [
	'password',
	'password123',
	'passw0rd'
];
var username = 'userjalan';
var password = 'password';

for (var i = 0; i < username.length; i++) {
	if (username == usernames[i] && password == passwords[i]) {
		alert('Successful!');
		break;
	} else {
		alert('Failed!')
	}
}
*/

function loadpage() {
	var usernames = [
		'userjalan',
		'userbrianna',
		'userharris'
	];
	var passwords = [
		'password',
		'password123',
		'passw0rd'
	];
	//var username = 'userjalan';
	//var password = 'password';
	var username = document.getElementById("user").value;
	var password = document.getElementById("pass").value;
	
	for (var i = 0; i < username.length; i++) {
		if (username == usernames[i] && password == passwords[i]) {
			alert('Successful!');
			break;
		} else {
			//alert('Failed!')
			break;
		}
	}
}