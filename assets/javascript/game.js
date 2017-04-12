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

	// first game
	if (current.length === 0 || current === ["Y", "O", "U", "W", "I", "N"]) {
		wd = bank[Math.floor(Math.random() * bank.length)];
		guesses = 9;
		current = starting(wd);
		} 
		else if (alphabet.indexOf(guess)>-1) {

		//incorrect guess
		if (wd.indexOf(guess) === -1) {
			guesses--;
			// out of guesses.  reinitialize
			if (guesses === 0) {
				wd = bank[Math.floor(Math.random() * bank.length)];
				guesses = wd.length + 5;
				current = starting(wd);
				misses = [];
				//guesses left
			} else {
				misses.push(guess);
			}
		//correct guess
		} else {
			for (var i = 0; i < current.length; i++) {
				if (guess === wd[i]) {
					current[i] = wd[i];
				}
			}
		//check for win
			if (current.indexOf("_") === -1) {
				current = ["Y", "O", "U", "W", "I", "N"];
				wins++;
			}
		}
	}

	var html = "<p>Current Word:" + makeString(current) + "</p><br>"+
	"<p>Guesses Left:" + guesses + " </p><br>"+
	"<p>Letters Used:" + makeString(misses) + "</p>";

	document.querySelector("#game").innerHTML = html;

	
};
