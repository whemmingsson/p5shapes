# p5shapes.js
Aims to extend the standard p5.js library with an addon to simplify development of interactive user interfaces and simple board games

## Getting started
Simply include the addon, and make sure you have the following code in your main sketch file

    function draw() {
      p5shapes.render();
    }

    function mouseClicked() { 
      p5shapes.mouseClicked();
    }
    
All shapes / groups created in the project will automatically be added to the two pipelines (more about pipelines below). As an example, create a rectangle using:

    let rectangle = new Rectangle(350, 200, 75, 200);

## Objects
The addon adds several custom objects into the mix. They are divided in two categories: shapes and groups.

### Shapes
All shapes can be created and placed on the canvas, given some (x,y) coordinate. 
The shapes are based on the default geometric rendering functions in p5.js. For example, the Rectangle shape uses the p5.js function rect(...) to render itself.

### Groups
Groups, or containers, are added to simplify placement and alignment of shapes on the canvas. Currently, there are two types of groups: Flex groups and static groups.

Flex groups are dynamic containers with a fixed position, but with a flexible size. Either you can choose to make the entire container flexible, or lock the width or height. 

Static groups are containers with a fixed position, but also a fixed width and height. That means that shapes added to this type of group will be scaled down to fit within the container.

## Styling
This addon includes an object refered to as a *style*. A style can be applied to any shape, but not to groups. A style consits of several different properties to change the following:

1. Background color
2. Border color
3. Border thickness

The style objects also makes it possible to apply the forementioned properties when the shape is either hovered on by the mouse or clicked on.


## Interactivity
The main goal with this addon is to make it easier to create shapes on the canvas the user can interact with. To make any shape act as a button, the shape must be registered.

    rectangle.registerAsSwitchButton();

or

    rectangle.registerAsPushButton();
    
A *Switch button* is a button that has two states, on or off. A *Push button* does not contain a state.

A button is hoverable and the hover style can be fully customized (see the section on styling below). The "on state" of a switch button can also be styled.

If you want to register the shape as a button and add some functionality, simply pass a function to the register method:

    rectangle.registerAsPushButton(t => console.log('My position: ', t.position));

When called, the button passes itself too the function via the parameter *t*, so that the function can modify the button or access its properties. In this case, the button logs its position in the browser console. 
