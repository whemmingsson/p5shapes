// Main addon object
const p5shapes = {
    render : function() {
                let hover = false;
                let hoverItems = [];
                p5shapes.interactionPipeline.forEach(shape => {
                    if(shape.onMouseMove()){
                        hover = true;
                        hoverItems.push(shape);                    
                    }
                });

                if(hoverItems.length > 1){
                    hoverItems.splice(0, hoverItems.length - 1).forEach(shape => {
                        shape.hover = false;
                    });
                }

                cursor(!hover ? 'default' : 'pointer');

                p5shapes.renderPipeline.forEach(shape => {
                    shape.render();
                });
    },

    mouseClicked : function() {
        p5shapes.interactionPipeline.forEach(shape => {
            shape.onClick();
        });
    },

    orderPipelines : function() {
        const orderFunc = function(a,b){
            return a.zIndex - b.zIndex;
        };

        p5shapes.renderPipeline.sort(orderFunc);
        p5shapes.interactionPipeline.sort(orderFunc);
    },

    renderPipeline : [],
    interactionPipeline : []
}

class Shape {
    constructor(x,y) {
        // Structure
        this._x = x;
        this._y = y;

        // Interaction
        this._isHoverable = true;
        this._hover = false;   
        this._pushFunc = null;
        this._switchFunc = null;
        this._clickedState = false;
        this._isButton = false;
        this._zIndex = 0.0;

        // Display
        this._useFill = true;
        this._fillColor = '#000000';
        this._strokeColor = '#ffffff';
        this._strokeThickness = 2;

        this._hoverFillColor = '#88eeee';
        this._hoverStrokeColor = '#ffffff';

        this._clickedFillColor = '#ffffff';
        this._clickedStrokeColor = '#000000'

        // Push the shape to render pipe
        p5shapes.renderPipeline.push(this);   
    }

    set fillColor(color){
        this._fillColor = color;
    }

    set strokeColor(color){
        this._strokeColor = color;
    }

    set strokeThickness(weight){
        this.strokeThickness = weight;
    }

    set hoverFillColor(color){
        this._hoverFillColor = color;
    }

    set hoverStrokeColor(color){
        this._hoverStrokeColor = color;
    }

    set hover(isHover) {
        this._hover = isHover;
    }

    set useFill(fill){
        this._useFill = fill;
    }

    get hover() {
        return this._hover;
    }

    set zIndex(index) {
        this._zIndex = index;

        // To optimize performance, only reorder the items when any z-index has changed.
        p5shapes.orderPipelines();
    }

    get zIndex() {
        return this._zIndex;
    }

    registerAsPushButton(func) {
        this._pushFunc = func;
        this._isButton = true;

        p5shapes.interactionPipeline.push(this);
    }

    registerAsSwitchButton(func){
        this._switchFunc = func;
        this._isButton = true;

        p5shapes.interactionPipeline.push(this);
    }

    onClick(){
        if(!this._hover || !this._isButton)
            return;

        if(this._pushFunc)  {
            this._pushFunc(this);
            return;
        }

        if(this._isButton){
            this._clickedState = !this._clickedState;
        }
        
        if(this._switchFunc){            
            this._switchFunc(this);          
        }
    }
   
    /* P5.js render settings function. Call to use the shapes defined properties. */
    setupForRender(){

        if(this._useFill)
            fill(this._fillColor);
        else
            noFill();
        stroke(this._strokeColor);
        strokeWeight(this._strokeThickness);

         // Button is clicked (switch button only)
         if(this._switchFunc !== null && this._clickedState) {
            fill(this._clickedFillColor);
            stroke(this._clickedStrokeColor);
        }

        // Mouse is over
        if(this._hover && this._isButton){
            fill(this._hoverFillColor);
            stroke(this._hoverStrokeColor);
        }

        if(this._strokeThickness <= 0)
            noStroke();        
    }
}