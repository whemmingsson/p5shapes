let el = new Ellipse(200, 200, 100, 75);
let c = new Circle(200, 350, 135);
let sq = new Square(350, 50, 75);
let r = new Rectangle(350, 200, 75, 200);
let el2 = new Ellipse(300, 120, 300, 200);
let tri = new Polygon(
    [{x:100, y:175},
     {x:50,  y:300},
      {x:150, y:300}]
 );



function setup() {
    let canvas = createCanvas(850,700);
	    canvas.parent('sketch-holder');

    sq.registerAsPushButton(t => {
        t._x = getRandom(5, width-50);
        t._y = getRandom(5, height-50);
        t.setSide(getRandom(100, height));
        t.style = getRandomStyle();
    });

    el.registerAsSwitchButton();
    tri.registerAsPushButton(spawnNewShape);
    c.registerAsPushButton();

    el2.zIndex = -5; // Move back 
}

function spawnNewShape(){
    console.log("Spawned!")
    let x = getRandom(5, width - 50);
    let y = getRandom(5, height - 50);
    let w = getRandom(50,200);
    let h = getRandom(50,200);
    let t = getRandom(0,4);

    let obj =  new Rectangle(x,y, w,h);

    obj.registerAsSwitchButton(null);
    obj.zIndex = -5;

    obj.style = getRandomStyle();

    //renderPipe.push(obj);
    //overPipe.push(obj);
    //clickPipe.push(obj);
}

function getRandomStyle(){
    let style = new Style();

    let r = getRandom(0, 256);
    let g = getRandom(0, 256);
    let b = getRandom(0, 256);

    style.fillColor = color(r, g, b);

    return style;
}

function draw() {
   background(100);
   p5shapes.render();
}

function mouseClicked() { 
   p5shapes.mouseClicked();
}

function mouseMoved() {
}

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min); 
}