class Group {
    constructor(x,y) {
        this._x = x;
        this._y = y;
        this._shapes = [];
    }
}

class FlexGroup extends Group{
    constructor(x,y) {
        super(x,y);
    }

    _modifyPosition(shape){

    }

    addShape(shape){
        if(typeof shape !== Rectangle)
            throw "Version 1 of p5shapes.js only supports rectangles, squares, ellipses and circles for grouping.";  

        this._shapes.push(shape);
    }
}

class StaticGroup extends Group{
    constructor(x,y, width, height) {
        super(x,y);
        this._width = width;
        this._height = height;   
    }
}