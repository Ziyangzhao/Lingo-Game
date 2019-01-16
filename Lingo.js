var container = document.getElementById('container');
var rdmWord = words[Math.floor(Math.random() * words.length)];
var letters = [];
var row = 1;

function rows() { 
	var instrTxt = document.createElement('div');
	instrTxt.id = 'instrTxt';
	instrTxt.innerHTML = "Welkom in het spel 'Lingo'. De eerste letter van het woord wordt aangegeven. De taak aan jou is om het woord goed te raden. Je hebt 5 kansen om het woord te raden. Om te checken of de letters goed staan of er in zitten, druk je op 'Enter'. Groen betekent dat het letter goed staat en geel betekent dat de letter in het woord voorkomt maar niet op de juiste positie staat. De woorden bestaan alleen uit letters (a-z) en geen cijfers.";
	for (var a = 1; a <= 5; a++) {
		for (var i = 0; i < rdmWord.length; i++) {
			var box = document.createElement('input');
			box.id = 'box'+ a + '_' + i;
			box.maxLength = '1';
			document.getElementById('container').appendChild(box);
		}	
	}
	document.getElementById('box1_0').value = rdmWord[0]; //.value is voor input // innertext/innerHTML is voor div
	document.getElementById('instruction').appendChild(instrTxt);
}

function typer(evt) {
	if(goNextEmptyColumn() <= 5) {
		document.getElementById("box" + row + "_" + goNextEmptyColumn()).focus();
	}

	if(evt.key === "Enter") {
		check();
	}
}

function goNextEmptyColumn(e) {
	for (var i = 0; i < 5; i++) {
		if(document.getElementById('box' + row + '_' + i).value === "") {
			return i;
		}		
	}
}

function assembleWord() {
	var typedWord = [];
	for(var i=0; i < rdmWord.length; i++) {
		typedWord.push(document.getElementById('box' + row + '_' + i).value)
	}
	return typedWord;
}

function check() {
	var playerInp = assembleWord();
	var randomWordSplit = [];
	var geraden = [];
	var restart = [];
	var guess = playerInp.join('');
	console.log(guess);


	for(b = 0; b < rdmWord.length; b++) {
		randomWordSplit.push(rdmWord[b])
	}

	if(playerInp === rdmWord) { 
		return true
	}

	for (var i = 0; i < rdmWord.length; i++) {
		if (randomWordSplit[i].toUpperCase() === playerInp[i].toUpperCase()){
			document.getElementById('box' + row + '_' + i).style.backgroundColor = '#47d147'; //Green
			randomWordSplit[i] = "";
			playerInp[i] = "*";
			geraden.push(randomWordSplit[i]);
		} 
	}

	for (var i = 0; i < rdmWord.length; i++) {
		if(randomWordSplit.indexOf(playerInp[i]) != -1) {
			randomWordSplit[randomWordSplit.indexOf(playerInp[i])] = "";
			playerInp[i] = "*";
			document.getElementById('box' + row + '_' + i).style.borderRadius = '50%';
			document.getElementById('box' + row + '_' + i).style.backgroundColor = 'Gold';
		}
	}

	if (guess == rdmWord) {
		alert('Je hebt gewonnen. Refresh om opnieuw te spelen.');

	} else if(row >= 5 && guess != rdmWord) {
		alert('Je hebt verloren. Refresh om opnieuw te spelen. Het juiste woord was:' + ' ' + rdmWord);
	}

	if (guess != rdmWord) {
		row++
	}

	document.getElementById('box' + row + '_0').value = rdmWord[0]
}

rows();
