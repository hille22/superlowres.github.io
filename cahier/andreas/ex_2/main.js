/**
 * 	Example SDF
 */


const NUM_X = 32
const NUM_Y = 32
const CELL  = 16

const data = new Array(NUM_X * NUM_Y)

function setup(){
	createCanvas(windowWidth, windowHeight)
}

// Fonction qui retourne -1 pour les numeros negatifs
// et 1 pour les numeros positifs (et pour zero)
function sign(v) {
	if (v < 0) return -1
	else return 1
}

// Smooth operation
// https://www.iquilezles.org/www/articles/distfunctions/distfunctions.htm
function smoothUnion( d1, d2, k ) {
    const h = clamp(0.5 + 0.5 * (d2-d1) / k, 0.0, 1.0 );
    return mix( d2, d1, h ) - k * h * (1.0-h);
}

function clamp(v, min, max) {
	if (v < min) return min
	if (v > max) return max
	return v
}

function mix(v1, v2, a){
	return v1 * (1 - a) + v2 * a
}

function draw(){

	const x1 = Math.sin(frameCount*0.021)*0.4
	const y1 = Math.cos(frameCount*0.032)*0.4
	const r1 = 0.4

	const x2 = Math.sin(frameCount*0.043)*0.4
	const y2 = Math.cos(frameCount*0.034)*0.4
	const r2 = 0.4

	// On "remplit" le tableau des données "data"
	// avec des valeurs entre 0.0 et 1.0
	for (let j=0; j<NUM_Y; j++){
		for (let i=0; i<NUM_X; i++){

			// index du tableau en focntion de x et y de la celle
			const idx = i + j * NUM_X
			// coordonnées u et v normalisées entre -1.0 et 1.0
			const u = (i * 2 - NUM_X) / NUM_X
			const v = (j * 2 - NUM_Y) / NUM_Y

			// on calcule la distance de chaque celle par raport a un "centre"
			let d = 1e100
			// cercle 1
			d = smoothUnion(dist(0, 0, u+x1, v+y1) - r1, d, 0.3)
			// cercle 2
			d = smoothUnion(dist(0, 0, u-x2, v-y2) - r2, d, 0.3)

			// visualization distance
			// data[idx] = d

			// visualization step
			// data[idx] = sign(d)

			// visualization outline (avec abs())
			data[idx] = 1.0 - Math.exp(-20 * Math.abs(d))

			// visualization fill
			// data[idx] = 1.0 - Math.exp(-15 * d)

			// visualization fill
			// data[idx] = Math.cos(d * 5 + frameCount * 0.2)
		}
	}


	// Visualization du contenu du tableau (rendering)
	// textSize(9)
	// textAlign(CENTER, CENTER)

	background(220)
	fill(0)
	noStroke()

	const ox = (width - NUM_X * CELL) / 2  // offset de la matrice
	const oy = (height - NUM_Y * CELL) / 2

	for(let j=0; j<NUM_Y; j++) {
		for(let i=0; i<NUM_X; i++) {
			const x = i * CELL + ox
			const y = j * CELL + oy
			const idx = i + j * NUM_X
			const v = data[idx]
			fill(v * 255)
			rect(x, y, CELL-1, CELL-1)
			// fill(255,0,0)
			// text(v, x+CELL/2, y+CELL/2)
		}
	}
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}