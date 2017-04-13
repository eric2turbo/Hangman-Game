var bank = ['aquamarine','bittersweet','citrine','diamond','firebrick', 'gamboge', 
'gunmetal', 'heliotrope', 'irresistible', 'keppel', 'liberty', 'mahogany', 'nyanza', 
'orange', 'phlox', 'rackley', 'sinopia', 'turquoise', 'vermilion', 'wisteria', 'xanadu'];



var wins = 0;
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
		'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

var wd = "";
var guesses = 0;
var current = [];
var misses = [];

function starting(x) {
	var blanks = [];
	for (var i=0; i<x.length; i++) {
		blanks.push('_');
	}
	return blanks;
};


function makeString(arr) {
	var out ="";
	for (var i=0; i<arr.length; i++) {
		out = out + arr[i]  + " ";
	}
	return out;
};


document.onkeyup = function(event) {
	
	var userGuess = event.key;
	var guess = userGuess.toLowerCase();

	// initialize game
	if (current.length === 0) {
		wd = bank[Math.floor(Math.random() * bank.length)];
		guesses = 9;
		current = starting(wd);
		misses = [];
		} 
		else if (alphabet.indexOf(guess)>-1) {

		//incorrect guess
		if (wd.indexOf(guess) < 0) {
			guesses--;
			// out of guesses.  reinitialize
			if (guesses <= 0) {
				wd = bank[Math.floor(Math.random() * bank.length)];
				guesses = 9;
				current = starting(wd);
				misses = [];
				//guesses left
			} else {
				misses.push(guess);
			}
		//correct guess.  replace '_' with letter
		} else {
			for (var i = 0; i < current.length; i++) {
				if (guess === wd[i]) {
					current[i] = wd[i];
				}
			}
		//check for win
			if (current.indexOf("_") === -1) {
				console.log("you win with " + makeString(current));
				wins++;
				current = [];
			}
		}
	}
	//Update state of the game in browser
	var htmlword = makeString(current);
	var htmlmisses = makeString(misses);
	var htmlscores = "<p>Guesses Left: " + guesses + "</p>"+
			"<p>Wins: " + wins + " </p>";

	document.querySelector("#word").innerHTML = htmlword;
	document.querySelector("#used").innerHTML = htmlmisses;
	document.querySelector("#scores").innerHTML = htmlscores;

	
};
