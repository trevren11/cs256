var config = {
	//apiKey: "AIzaSyBDgHk3_m-vqyUbTGIqgCZ8qAb-CoY5ID4",
	authDomain: "luminous-torch-6850.firebaseapp.com",
	databaseURL: "https://luminous-torch-6850.firebaseio.com",
	storageBucket: "bucket.appspot.com"
};

firebase.initializeApp(config);
// https://firebase.google.com/docs/reference/js/firebase.database.Reference
var chattyref = firebase.database().ref('chatty/');

// from 
// http://stackoverflow.com/questions/4878756/javascript-how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
function capitalizeFirst(str) {
	return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

// function addtweet(message) {
// }

// see https://firebase.google.com/docs/database/web/retrieve-data
function startTweetListener() {
	chattyref.on('child_added', function (tweet, k) {
		// var message = tweet.val().message; 
		// console.log(tweet.val());
		var d = new Date(tweet.val().timeStamp);
		d = d.toDateString();
		console.log("KKKKKK " + k);
		$("#tweetlist").prepend(
			'<div class="panel panel-primary"><div class="panel-heading">'
			+ tweet.val().sender + '</div><div class="panel-body"><p>tweeted: '
			+ tweet.val().message + '</p>' + d + '</div></div>');
	});
}

$(document).ready(function () {
	// Add jQuery inside here
	console.log(firebase);
	startTweetListener();

	$('#addTweet').submit(function (event) {
		// console(this.name);
		// console.log(this);
		var name = $('#name').val();
		var message = $('#message').val();
		var date = new Date();
		date = date.getTime();
		// var ref = 
		firebase.database().ref('chatty/').push({
			sender: name,
			message: message,
			timeStamp: date
		});
		return false;
	});

}); 
