/**
 * 	Example P5JS canvas
 */

const NUM_X = 32
const NUM_Y = 32
const CELL= 16

const data= new Array (NUM_X * NUM_Y).fill(0)


function setup(){
	createCanvas(windowWidth, windowHeight)
}

function draw(){
	//background(255)

	for (let j=0; j<NUM_Y; j++){
		for(let i=0; i<NUM_X; i++) {

			const idx = i + j * NUM_X
			data[idx]=1
		}
	}

	//rendering
	for(let j=0; j<NUM_Y; j++) {
		for(let i=0; i<NUM_X; i++) {
			const x= i * CELL + 20
			const y= j * CELL + 20
			rect(x,y,CELL,CELL)
	}
	
	}
}


function windowResized(){
	resizeCanvas(windowWidth, windowHeight)

}