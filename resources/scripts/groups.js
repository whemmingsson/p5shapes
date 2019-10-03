class ContentBoundingBox {
    constructor(x,y) {
        this._x = x;
        this._y = y;
        this._width = 0;
        this._height = 0;
        this._rows = 0;
    }

    get width(){
        return this._width;
    }

    get height(){
        return this._height;
    }

    increaseWidth(width){
        this._width += width;
    }

    increaseHeight(height){
        this._height += height;
    }

    addRow(){
        this._rows++;
    }

    getRightBoundary(){
        return this._x + this._width;
    }
}
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


}

class StaticGroup extends Group{
    constructor(x,y, width, height) {
        super(x,y);
        this._width = width;
        this._height = height;   
        this._boundingBox = new ContentBoundingBox(x,y);
        this._padding = 5; // Set the size between all items in the group
    }

    
    render(){
        stroke("#11dd44");
        strokeWeight(1);
        fill("#ddd");
        rect(this._x, this._y, this._width, this._height);

        this._shapes.forEach(shape => {
            shape.render();
        });
    }

    _modifyPosition(shape){
        let box = this._boundingBox;
        let oldPos = shape.position;     
        shape.position = new Position2D(box.getRightBoundary() + shape.position.x + this._padding, oldPos.y + this._y + this._padding);
        box.increaseWidth(shape.width + this._padding);
       // this._boundingBox.increaseHeight(shape.height + this._padding);

       if(box.getRightBoundary() > this._x + this._width){
           console.error("Group is overfilled. Consider remove the latest element.");
       }
    }

    addShape(shape){
        if(!(shape instanceof Rectangle))
            throw "Version 1 of p5shapes.js only supports rectangles, squares, ellipses and circles for grouping.";  

        this._shapes.push(shape);
        this._modifyPosition(shape);
    }
}