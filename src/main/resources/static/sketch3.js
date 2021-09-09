let rSlider1, gSlider1, bSlider1;
let rSlider2, gSlider2, bSlider2;
let rSlider3, gSlider3, bSlider3;
let oSlider1, oSlider2, oSlider3;
let pC, p1, p2, p3, p4, p5, p6, p7, p8, p9;
let r;
let palette = [];
let hTriangle = {};

function setup() {
	let canvas = createCanvas(windowWidth / 2.0, windowWidth * 0.866 / 2.0);
	background(127);
	canvas.parent('canvas');
	textSize(15);
	noStroke();

	// create sliders
	rSlider1 = createSlider(0, 255, 255);
	rSlider1.parent('r');
	rSlider1.class('slider');

	gSlider1 = createSlider(0, 255, 0);
	gSlider1.parent('g');
	gSlider1.class('slider');

	bSlider1 = createSlider(0, 255, 0);
	bSlider1.parent('b');
	bSlider1.class('slider');

	rSlider2 = createSlider(0, 255, 255);
	rSlider2.parent('r');
	rSlider2.class('slider');

	gSlider2 = createSlider(0, 255, 255);
	gSlider2.parent('g');
	gSlider2.class('slider');

	bSlider2 = createSlider(0, 255, 0);
	bSlider2.parent('b');
	bSlider2.class('slider');

	rSlider3 = createSlider(0, 255, 0);
	rSlider3.parent('r');
	rSlider3.class('slider');

	gSlider3 = createSlider(0, 255, 0);
	gSlider3.parent('g');
	gSlider3.class('slider');

	bSlider3 = createSlider(0, 255, 255);
	bSlider3.parent('b');
	bSlider3.class('slider');

	// create points
	r = width / 4.0;
	pC = [width / 2.0, (height + r) / 2.0];
	p1 = [pC[0] + pol2rec(r, 180)[0], pC[1] + pol2rec(r, 180)[1]];
	p2 = [pC[0] + pol2rec(r, 240)[0], pC[1] + pol2rec(r, 240)[1]];
	p3 = [pC[0] + pol2rec(r, 300)[0], pC[1] + pol2rec(r, 300)[1]];
	p4 = [pC[0] + pol2rec(r, 0)[0], pC[1] + pol2rec(r, 0)[1]];
	p5 = [pC[0] + pol2rec(r, 60)[0], pC[1] + pol2rec(r, 60)[1]];
	p6 = [pC[0] + pol2rec(r, 120)[0], pC[1] + pol2rec(r, 120)[1]];
	p7 = [pC[0] + pol2rec(r * sqrt(3), 150)[0], pC[1] + pol2rec(r * sqrt(3), 150)[1]];
	p8 = [pC[0] + pol2rec(r * sqrt(3), 270)[0], pC[1] + pol2rec(r * sqrt(3), 270)[1]];
	p9 = [pC[0] + pol2rec(r * sqrt(3), 30)[0], pC[1] + pol2rec(r * sqrt(3), 30)[1]];

	// create optionsSlider
	oSlider1 = createSlider(0, 3, 0, 1);
	oSlider1.parent('o');
	oSlider1.class('slider');
	oSlider2 = createSlider(0, 3, 0, 1);
	oSlider2.parent('o');
	oSlider2.class('slider');
	oSlider3 = createSlider(0, 3, 0, 1);
	oSlider3.parent('o');
	oSlider3.class('slider');
}

function draw() {
	const r1 = rSlider1.value();
	const g1 = gSlider1.value();
	const b1 = bSlider1.value();
	const r2 = rSlider2.value();
	const g2 = gSlider2.value();
	const b2 = bSlider2.value();
	const r3 = rSlider3.value();
	const g3 = gSlider3.value();
	const b3 = bSlider3.value();

	const o1 = oSlider1.value();
	const o2 = oSlider2.value();
	const o3 = oSlider3.value();
	//primaires
	palette[0] = [r1, g1, b1];
	fill(r1, g1, b1);
	triangle(p1[0], p1[1], p6[0], p6[1], p7[0], p7[1]);//1 bas gauche
	palette[3] = [r2, g2, b2];
	fill(r2, g2, b2);
	triangle(p2[0], p2[1], p8[0], p8[1], p3[0], p3[1]);//2 haut
	palette[6] = [r3, g3, b3];
	fill(r3, g3, b3);
	triangle(p5[0], p5[1], p9[0], p9[1], p4[0], p4[1]);//3 bas droite

	//secondaires
	let s1_2 = melange2(r1, g1, b1, r2, g2, b2);
	palette[2] = [s1_2[0], s1_2[1], s1_2[2]];
	fill(s1_2[0], s1_2[1], s1_2[2]);
	triangle(pC[0], pC[1], p1[0], p1[1], p2[0], p2[1]);//s1_2
	let s2_3 = melange2(r2, g2, b2, r3, g3, b3);
	palette[5] = [s2_3[0], s2_3[1], s2_3[2]];
	fill(s2_3[0], s2_3[1], s2_3[2]);
	triangle(pC[0], pC[1], p3[0], p3[1], p4[0], p4[1]);//s2_3
	let s1_3 = melange2(r1, g1, b1, r3, g3, b3);
	palette[7] = [s1_3[0], s1_3[1], s1_3[2]];
	fill(s1_3[0], s1_3[1], s1_3[2]);
	triangle(pC[0], pC[1], p5[0], p5[1], p6[0], p6[1]);//s1_3

	//tertiaires
	//t1
	let t1 = [0, 0, 0];
	if (oSlider1.value() == 0) {
		t1 = melange2(s1_2[0], s1_2[1], s1_2[2], s1_3[0], s1_3[1], s1_3[2]);
	} else if (oSlider1.value() == 1) {
		t1 = melange2(s1_3[0], s1_3[1], s1_3[2], r1, g1, b1);
	} else if ((oSlider1.value() == 2)) {
		t1 = melange2(s1_2[0], s1_2[1], s1_2[2], r1, g1, b1);
	} else if (oSlider1.value() == 3) {
		t1 = melange2(s1_2[0], s1_2[1], s1_2[2], r1, g1, b1);
		t1 = melange2(t1[0], t1[1], t1[2], s1_3[0], s1_3[1], s1_3[2]);
	}
	hTriangle.option1 = oSlider1.value();
	palette[1] = [t1[0], t1[1], t1[2]];
	fill(t1[0], t1[1], t1[2]);
	triangle(pC[0], pC[1], p6[0], p6[1], p1[0], p1[1]);//t1
	//t2
	let t2 = [0, 0, 0];
	if (oSlider2.value() == 0) {
		t2 = melange2(s1_2[0], s1_2[1], s1_2[2], s2_3[0], s2_3[1], s2_3[2]);
	} else if (oSlider2.value() == 1) {
		t2 = melange2(s1_2[0], s1_2[1], s1_2[2], r2, g2, b2);
	} else if ((oSlider2.value() == 2)) {
		t2 = melange2(s2_3[0], s2_3[1], s2_3[2], r2, g2, b2);
	} else if (oSlider2.value() == 3) {
		t2 = melange2(s2_3[0], s2_3[1], s2_3[2], r2, g2, b2);
		t2 = melange2(t2[0], t2[1], t2[2], s1_2[0], s1_2[1], s1_2[2]);
	}
	hTriangle.option2 = oSlider2.value();
	palette[4] = [t2[0], t2[1], t2[2]];
	fill(t2[0], t2[1], t2[2]);
	triangle(pC[0], pC[1], p2[0], p2[1], p3[0], p3[1]);//t2
	//t3
	let t3 = [0, 0, 0];
	if (oSlider3.value() == 0) {
		t3 = melange2(s1_3[0], s1_3[1], s1_3[2], s2_3[0], s2_3[1], s2_3[2]);
	} else if (oSlider3.value() == 1) {
		t3 = melange2(s2_3[0], s2_3[1], s2_3[2], r3, g3, b3);
	} else if ((oSlider3.value() == 2)) {
		t3 = melange2(s1_3[0], s1_3[1], s1_3[2], r3, g3, b3);
	} else if (oSlider3.value() == 3) {
		t3 = melange2(s1_3[0], s1_3[1], s1_3[2], r3, g3, b3);
		t3 = melange2(t3[0], t3[1], t3[2], s2_3[0], s2_3[1], s2_3[2]);
	}
	hTriangle.option3 = oSlider3.value();
	palette[8] = [t3[0], t3[1], t3[2]];
	fill(t3[0], t3[1], t3[2]);
	triangle(pC[0], pC[1], p4[0], p4[1], p5[0], p5[1]);//t3
	noFill();

	let couleurs = selectAll('.couleur');
	//console.log(couleurs);
	for (let i = 0; i < couleurs.length; i++) {
		couleurs[i].remove();
	}
	for (let i = 0; i < palette.length; i++) {
		let cString = 'rgb(' + palette[i][0] + ',' + palette[i][1] + ',' + palette[i][2] + ')';
		let lum = palette[i][0] * 0.2126 + palette[i][1] * 0.7152 + palette[i][2] * 0.0722;
		let cLum;
		let ctrste = 127;
		if ((lum + ctrste) >= 255) {
			cLum = lum - ctrste;
		} else {
			cLum = lum + ctrste;
		}
		let ccString = 'rgb(' + cLum + ',' + cLum + ',' + cLum + ')';
		let rgbString = palette[i][0] + ',' + palette[i][1] + ',' + palette[i][2];
		let span = createSpan(rgbString);
		span.style('background-color', cString);
		span.style('color', ccString);
		span.parent('palette-holder');
		span.class('couleur');
	}
	//**************************************** bouton post palette ************************************************
	let span = createSpan("Save");
	span.style('background-color', "#666666");
	span.style('color', "#ffffff");
	span.parent('palette-holder');
	span.class('couleur');
	span.mousePressed(postPalette);
}

function postPalette() {
	let url = 'http://localhost:8080/palette/save';
	hTriangle.palette = palette;
	httpPost(url, "json", hTriangle, function() {
		//strokeWeight(2);
		//text(result.body, mouseX, mouseY);
	});
}

function melange2(aR, aG, aB, bR, bG, bB) {
	let aJab = XYZtoJab(rgbToXYZ([aR, aG, aB]));
	let bJab = XYZtoJab(rgbToXYZ([bR, bG, bB]));
	let cJab = [(aJab[0] + bJab[0]) / 2, (aJab[1] + bJab[1]) / 2, (aJab[2] + bJab[2]) / 2];
	let cRGB = xyzToRGB(JabtoXYZ(cJab));
	return cRGB;
}

function windowResized() {
	resizeCanvas(windowWidth / 2.0, windowWidth * 0.866 / 2.0);
	clear();
	// create points
	r = width / 4.0;
	pC = [width / 2.0, (height + r) / 2.0];
	p1 = [pC[0] + pol2rec(r, 180)[0], pC[1] + pol2rec(r, 180)[1]];
	p2 = [pC[0] + pol2rec(r, 240)[0], pC[1] + pol2rec(r, 240)[1]];
	p3 = [pC[0] + pol2rec(r, 300)[0], pC[1] + pol2rec(r, 300)[1]];
	p4 = [pC[0] + pol2rec(r, 0)[0], pC[1] + pol2rec(r, 0)[1]];
	p5 = [pC[0] + pol2rec(r, 60)[0], pC[1] + pol2rec(r, 60)[1]];
	p6 = [pC[0] + pol2rec(r, 120)[0], pC[1] + pol2rec(r, 120)[1]];
	p7 = [pC[0] + pol2rec(r * sqrt(3), 150)[0], pC[1] + pol2rec(r * sqrt(3), 150)[1]];
	p8 = [pC[0] + pol2rec(r * sqrt(3), 270)[0], pC[1] + pol2rec(r * sqrt(3), 270)[1]];
	p9 = [pC[0] + pol2rec(r * sqrt(3), 30)[0], pC[1] + pol2rec(r * sqrt(3), 30)[1]];
}
