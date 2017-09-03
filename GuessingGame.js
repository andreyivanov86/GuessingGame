
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function(){
	return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function(){
	return this.playersGuess < this.winningNumber ? true : false;
}

Game.prototype.playersGuessSubmission = function(num){
	if (num < 1 || num > 100 || !(typeof num === 'number')){
		throw "That is an invalid guess.";
	} else {
		this.playersGuess = num;
		this.attempts++;		
		return this.checkGuess();
	}	
}

Game.prototype.checkGuess = function(){
		if(this.pastGuesses.length < 4){
			if (this.playersGuess === this.winningNumber){
				return "You Win!";
			}else	if(this.pastGuesses.includes(this.playersGuess)){
					this.pastGuesses.push(this.playersGuess);
					return "You have already guessed that number.";
			} else {
				this.pastGuesses.push(this.playersGuess);
				if (this.difference() < 10){
					return "You\'re burning up!";
				} else if(this.difference() < 25){
					return "You\'re lukewarm.";
				} else if(this.difference() < 50){
					return "You\'re a bit chilly.";
				}	else {
					return "You\'re ice cold!";
				}
			}
			
		}else {
			return 'You Lose.';
		}	
}

Game.prototype.provideHint = function(){
	return shuffle([this.winningNumber, 
					generateWinningNumber(), 
						generateWinningNumber()]);
}

function newGame(){
	return new Game;
}

function generateWinningNumber(){
	return Math.floor(Math.random()*100 + 1);
}

function shuffle(arr){
	var m = arr.length, temp, index;
	while(m){
		index = Math.floor(Math.random() * m--);
		temp = arr[m];
		arr[m] = arr[index];
		arr[index] = temp;
	}
	return arr;
}