function Game(){
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
		changeTitle('Invalid guess');
	} else {
		this.playersGuess = num;
		return this.checkGuess();
	}	
}

Game.prototype.checkGuess = function(){
		if(this.pastGuesses.length < 4){
			if (this.playersGuess === this.winningNumber){
				changeTitle('You Win!')
			} else	if(this.pastGuesses.includes(this.playersGuess)){
				this.pastGuesses.push(this.playersGuess);

				$("#guess-list li:nth-child(" +this.pastGuesses.length+")").text(this.playersGuess);
				
				changeTitle('You tried this already')
			} else {
				this.pastGuesses.push(this.playersGuess);
				
				$("#guess-list li:nth-child(" +this.pastGuesses.length+")").text(this.playersGuess);
				
				if (this.difference() < 10){
					changeTitle('You\'re burning up');
				} else if(this.difference() < 25){
					changeTitle('You\'re lukewarm');
				} else if(this.difference() < 50){
					changeTitle('You\'re a bit chilly');
				}	else {
					changeTitle('You\'re ice cold');
				}
			}			
		}else {
			$('li').last().text(this.playersGuess);
			changeTitle('You Lose')
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

function makeGuess(game){
	var playerInput = +$('#players-input').val();
	$('#players-input').val("");
	game.playersGuessSubmission(playerInput);
}

function changeTitle(str){
	$('#title').text(str.toUpperCase());
	if(str === 'You Win!' || str === 'You Lose'){
		$("#subtitle").text('CLICK RESET');
		disableButton();
	} else{
		$('#subtitle').text('TRY AGAIN');
	}	
}

function disableButton(){
	$('#submit').attr('disabled', true);
	$('#hint').attr('disabled', true);
}
$(document).ready(function(){
	var newGame = new Game();
	
	$('#submit').click(function(){
		makeGuess(newGame);
	});
	
	$('#players-input').keypress(function(event){
		if(event.which == 13){
			makeGuess(newGame);
		}
	});

	$('#reset').click(function(){
		newGame = new Game();
		$('#title').text('GUESSING GAME');
		$('#subtitle').text('GUESS A NUMBER 1 TO 100!');
		$('.guess').text('-');
		$('#submit').attr('disabled', false);
		$('#hint').attr('disabled', false);
	});

	$('#hint').click(function(){
		var hintArr = newGame.provideHint();
		$('#title').text('HINT: '+ hintArr.join(' '));
		$('#subtitle').text(' ');
	});
});





