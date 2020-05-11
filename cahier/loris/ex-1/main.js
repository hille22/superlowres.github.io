const NUM_X = 32;
const NUM_Y = 32;
const CELL = 16;

const data = new Array(NUM_X * NUM_Y).fill(0)

function preload() {

}

function setup() {
	createCanvas(windowWidth, windowHeight)
}

function draw() {


	for (let j = 0; j < NUM_Y; j++) {
		for (let i = 0; i < NUM_X; i++) {
			const idx = i + j * NUM_X
			data[idx] = (i + j) % (NUM_X / CELL);
		}
	}



	for (let j = 0; j < NUM_Y; j++) {
		for (let i = 0; i < NUM_X; i++) {

			const x = i * CELL + (width/2 - NUM_X *CELL/2)
			const y = j * CELL + (height/2 - NUM_Y *CELL/2)
			const idx = i + j  * NUM_X;
			const v = data[idx];

			fill(v * 255)

			rect(x, y, CELL, CELL)
		}
	}
}

function mousePressed() {

}

function keyPressed() {

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}