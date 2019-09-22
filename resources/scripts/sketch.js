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
    });

    el.registerAsSwitchButton();
    c.registerAsPushButton(spawnNewShape);
    tri.registerAsPushButton();
    el2.zIndex = -5; // Move back 
}

function spawnNewShape(){
    let x = getRandom(5, width - 50);
    let y = getRandom(5, height - 50);
    let w = getRandom(10,20);
    let h = getRandom(10,20);
    let t = getRandom(0,4);

    let obj = null;

    if(t == 0)
        obj = new Square(x,y, w);
    if(t == 1)
        obj = new Rectangle(x, y, w,h);
    if(t == 2)
        obj = new Circle(x, y, w);
    if(t == 3)
        obj = new Ellipse(x, y, w, h);

    obj.registerAsPushButton(t => console.log("Position:", t._x, t._y));

    renderPipe.push(obj);
    hoverPipe.push(obj);
    clickPipe.push(obj);
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