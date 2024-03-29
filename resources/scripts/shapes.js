class Rectangle extends Shape {
    constructor(x, y, width, height) {
        super(x,y);
        this._width = width;
        this._height = height;    
    }

    render(){
        this.setupForRender();
        rect(this.position.x, this.position.y, this._width, this._height);

    }

    isMouseOver(){
        return mouseX > this.position.x && mouseX < this.position.x + this._width &&
               mouseY > this.position.y && mouseY < this.position.y + this._height;
    }

    onMouseMove(){
        if(this.isMouseOver())
            this._hover = true;
        else    
            this._hover = false;
        
        return this._hover; // We need this to properly set the cursor
    }

    get width(){
        return this._width;
    }

    get height(){
        return this._height;
    }

    set width(w){
        this._width = w;
    }

    set height(h){
        this._height = h;
    }
}

class Square extends Rectangle {
    constructor(x, y, side) {
        super(x, y, side, side);      
    }

    setSide(side){
        this._width = side;
        this._height = side;
    }
}

class Ellipse extends Rectangle {
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    render(){
        this.setupForRender();
        ellipseMode(CORNER);
        ellipse(this.position.x, this.position.y, this._width, this._height);
    }

    // Solution for checking this based on this: https://math.stackexchange.com/questions/76457/check-if-a-point-is-within-an-ellipse
    isMouseOver(){
        let x = this.position.x + this._width/2;
        let y = this.position.y + this._height/2;
        let h = mouseX;
        let k = mouseY;
        let ry = this._height/2;
        let rx = this._width/2;

        let ry2 = ry*ry;
        let rx2 = rx*rx;

        return ry2*(x-h)*(x-h) + rx2*(y-k)*(y-k) <= ry2*rx2;     
    }
}

class Circle extends Ellipse {
    constructor(x, y, diameter) {
        super(x, y, diameter, diameter);
    }
}

class Polygon extends Shape {
    constructor(points) {
        super(0,0); 
        this._points = points;
    }

    addPoint(point) {
        if(!this._points)
            this._points = [];

        this._points.push(point);
    }

    render() {
        this.setupForRender();

        beginShape();
            this._points.forEach(v => {
                vertex(v.x, v.y);
            });
        endShape(CLOSE);
    }

    onMouseMove(){
        if(this.isMouseOver())
            this._hover = true;
        else    
            this._hover = false;
        
        return this._hover; // We need this to properly set the cursor
    }

    isMouseOver() {
        const x = mouseX;
        const y = mouseY;

        let inside = false;
        for (let i = 0, j = this._points.length - 1; i < this._points.length; j = i++) {
            let xi = this._points[i].x, yi = this._points[i].y;
            let xj = this._points[j].x, yj = this._points[j].y;

            let intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    }
}