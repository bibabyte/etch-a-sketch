const container = document.querySelector('#container');
const userInput = document.createElement('div');
const gridContainer = document.createElement('div');

userInput.className = 'userInput';


container.appendChild(gridContainer);
container.appendChild(userInput);

//container.textContent = 'test.container';
//gridContainer.textContet = 'text.gridContainer';
//userInput.textContent = 'text.userInput';

// Variables
let userInputWidth;
let colorSelected = false;
let randomColor;

// Size of default/start grid
let gridWidth = 16;
let gridHeight= Math.floor(gridWidth * 0.75);
setGrid();

function setGrid() {

	// Set dynamic rows and columns (CSS grid)
	gridContainer.className = 'gridContainer';
	gridContainer.style.gridTemplateColumns = `repeat(${gridWidth}, 1fr)`;
	gridContainer.style.gridTemplateRows = `repeat(${gridHeight}, 1fr)`;

	// Set etch-a-sketch window size dependent on browser orientation
	//------to learn: how to change if viewport changes after load-----
	if(window.innerHeight > window.innerWidth){
		gridContainer.style.width = `70vw`;
		gridContainer.style.height = `52.5vw`;
		userInputWidth = `${gridContainer.offsetWidth - 40}` + `px`;
		//userInput.style.width = `(${gridContainer.offsetWidth - 40})px`;
		userInput.style.width = userInputWidth;
	}
	else {
		gridContainer.style.width = `70vh`;
		gridContainer.style.height = `52.5vh`;
		userInputWidth = `${gridContainer.offsetWidth - 40}` + `px`;
		//userInput.style.width = `(${gridContainer.offsetWidth - 40})px`;
		userInput.style.width = userInputWidth;
	}

	// Place divs in the etch-a-sketch
	for(let i = gridWidth * gridHeight; i > 0; i--){
		let etchGrid = document.createElement('div');
		etchGrid.className = 'etchGridBox';
		
		etchGrid.addEventListener("touchstart", touchStart);
	
		gridContainer.appendChild(etchGrid);
	}
} 


// Buttons to clear and change color
let clearBtn = document.createElement('button');
clearBtn.textContent = "Shake it up";
clearBtn.className = 'button';
clearBtn.addEventListener('click', clear);

userInput.appendChild(clearBtn);

let changeBtn = document.createElement('button');
changeBtn.textContent = 'Random Color';
changeBtn.className = 'button';
changeBtn.addEventListener('click', getRandomColor);

userInput.appendChild(changeBtn);
 

// FUNCTIONS

// Changes box color for touches to the screen.
function touchStart(e) {
	if (!colorSelected){
		e.target.style.background = `#000`;
	}
	else {
		e.target.style.background = randomColor;
	}
}

// Clear canvas and reset grid
function clear() {
	gridWidth = prompt('How many squares per side?');
	if (gridWidth === null) {
		return;
	}
	else if (isNaN(gridWidth) || gridWidth < 10) {
		alert('Oops! That should be a positive number over 10!');
		gridWidth = prompt('How many squares per side?')
	}
	while (gridContainer.hasChildNodes()){
		gridContainer.removeChild(gridContainer.firstChild);
	}	
	gridHeight = Math.floor(gridWidth * 0.75);
	setGrid(gridWidth);		
	colorSelected = false;
}

function getRandomColor() {
	let hex = `0123456789ABCDEF`;
	randomColor = `#`;
	for (var i = 0; i < 6; i++) {
		randomColor += hex[Math.floor(Math.random() * 16)];
	}
	colorSelected = true;
	return randomColor;
}




//=======TESTS AND NOTES=========///

//---- IMPROVEMENTS ----
//choose your own color
//change back to black
//shake the screen on clear
//better design for grid
//

//----- MAKE LINES NOT JUST DOTS ----- 
// Should fill boxes as they are moved over
/*function touchMove(e) {
	e.target.classList.replace('etchGridBox', 'touched');
	let offsets = e.target.getBoundingClientRect()
	let top = offsets.top;
	let left = offsets.left;

	output.textContent = `coordinates: ${top}, ${left}`; ///yes
 	output.textContent = output.textContent + `------${e.changedTouches.length}`; ///yes

	for (var i = 0; i < e.changedTouches.length; i++) 	{
		output.textContent = output.textContent + `------e.changedTouches[${i}].identifier = '${e.changedTouches[i].identifier}'`; ///yes
		output.textContent = output.textContent + `-------${e.changed.Touches.length}`; ///no
	}
}*/

