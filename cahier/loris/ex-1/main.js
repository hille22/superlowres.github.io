const NUM_X = 32;
const NUM_Y = 32;
const CELL = 16;
const N_CIRCLE = 20;
const data = new Array(NUM_X * NUM_Y).fill(0)

let posX = [];
let posY = [];

function preload() {

}

function setup() {
	createCanvas(windowWidth, windowHeight)
	for(let i = 0; i < N_CIRCLE; i++){
		posX[i] = "Math.sin(frameCount *" + random(0.01,0.06) + ") * 0.4"
		posY[i] = "Math.sin(frameCount *" + random(0.01,0.06) + ") * 0.4"
	}
}

function sign(v) {
	if (v < 0) return -1
	else return 1
}

function draw() {

	noStroke()

	
	for (let j = 0; j < NUM_Y; j++) {
		for (let i = 0; i < NUM_X; i++) {
			const idx = i + j * NUM_X
			const u = (i * 2 - NUM_X) / NUM_X
			const v = (j * 2 - NUM_Y) / NUM_Y
			let d = 1e1000


			for (let c = 0; c < N_CIRCLE; c++) {
				d = Math.min(dist(0, 0, u  + (-0.5 + (c/10)) + eval(posX[c]), v  + (-0.5 + (c/10)) + eval(posY[c])) - .3, d)
			}
			//d = Math.min(dist(0,0,u + x2,v + y2) - .3, d)

			data[idx] = 1 - Math.exp(-5 * Math.abs(d)) // outline
			//data[idx] = sign(d) //pixel perfect
			//data[idx] = d // gradient


		}
	}


	const ox = (width / 2 - (NUM_X * CELL) / 2)
	const oy = (height / 2 - (NUM_Y * CELL) / 2)

	for (let j = 0; j < NUM_Y; j++) {
		for (let i = 0; i < NUM_X; i++) {

			const x = i * CELL + ox
			const y = j * CELL + oy
			const idx = i + j * NUM_X;
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