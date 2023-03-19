/*
	The purpose of this file is to take in the analyser node and a <canvas> element: 
	  - the module will create a drawing context that points at the <canvas> 
	  - it will store the reference to the analyser node
	  - in draw(), it will loop through the data in the analyser node
	  - and then draw something representative on the canvas
	  - maybe a better name for this file/module would be *visualizer.js* ?
*/

// colors
// pink: #ff66e5; 255, 102, 229
// offwhite: #ffe6fb; 255, 230, 251

import * as utils from './utils.js';

let ctx,canvasWidth,canvasHeight,gradient,analyserNode,audioData;

const noiseCheckBox = document.querySelector("#cb-noise");
const circleCheckBox = document.querySelector("#cb-circles");
const barsCheckBox = document.querySelector("#cb-bars");
const gradientCheckBox = document.querySelector("#cb-gradient");
const invertCheckbox = document.querySelector("#cb-invert");

let currentFill = "black";
const BAR_WIDTH = 30;
const MAX_BAR_HEIGHT = 100;
const PADDING = 4;
const MIDDLE_Y = canvasHeight/2;

class SparkleSprite{
    cosntructor(x=0,y=0,scale=1){
        this.x = x;
        this.y = y;
        this.scale = scale;
    }

    update(){
        let startScale = scale;
        if (scale >= startScale){
            scale -= .01;
        }
        if (scale <= .1){
            scale += .01;
        }
    }

    draw(ctx){
        ctx.lineWidth = 6;
        ctx.strokeStyle = "rgba(0,0,0,.15)";
        ctx.fillStyle = "white";
        ctx.scale(scale,scale);

        // make sure to divide x and y by scale so the intended x and y positions are used

        ctx.save();
        ctx.beginPath();

        // first half
        ctx.moveTo(x/scale, y/scale);
        ctx.quadraticCurveTo(x/scale - 40, y/scale, x/scale - 50, y/scale - 50);
        ctx.quadraticCurveTo(x/scale - 40, y/scale, x/scale - 90, y/scale);

        // second half
        ctx.moveTo(x/scale,y/scale);
        ctx.quadraticCurveTo(x/scale - 40, y/scale, x/scale - 50, y/scale + 50);
        ctx.quadraticCurveTo(x/scale - 40, y/scale, x/scale - 90, y/scale);

        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.restore();

        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

}

const setupCanvas = (canvasElement,analyserNodeRef) => {
	// create drawing context
	ctx = canvasElement.getContext("2d");
	canvasWidth = canvasElement.width;
	canvasHeight = canvasElement.height;
	// create a gradient that runs top to bottom
	gradient = utils.getLinearGradient(ctx,0,0,0,canvasHeight,[{percent:0,color:"#ff66e5"},{percent:.25,color:"#ffe6fb"},{percent:.5,color:"#ffe6fb"},{percent:.75,color:"#ffe6fb"},{percent:1,color:"#ff66e5"}]);
	// keep a reference to the analyser node
	analyserNode = analyserNodeRef;
	// this is the array where the analyser data will be stored
	audioData = new Uint8Array(analyserNode.fftSize/2);
}

const draw = (params={}) => {
  // 1 - populate the audioData array with the frequency data from the analyserNode
	// notice these arrays are passed "by reference" 
	analyserNode.getByteFrequencyData(audioData);
	// OR
	//analyserNode.getByteTimeDomainData(audioData); // waveform data
	
	// 2 - draw background
	ctx.save();
    ctx.fillStyle = currentFill;
    ctx.globalAlpha = .1;
    ctx.fillRect(0,0,canvasWidth,canvasHeight)
		
	// 3 - draw gradient
    if (gradientCheckBox.checked){
        if (params.showGradient){
            ctx.save();
            currentFill = gradient;
            ctx.fillStyle = currentFill;
            ctx.globalAlpha = .3;
            ctx.fillRect(0,0,canvasWidth,canvasHeight);
            ctx.restore();
        }
    }
    else{
        currentFill = "black";
    }

    // 4 - draw bars
    if (barsCheckBox.checked){
        if (params.showBars){
            let barSpacing = 0;
            let margin = 0;
            let barWidth = canvasWidth/64;
            let barHeight = 200;
            let topSpacing = 200;
    
            ctx.save();
            ctx.fillStyle = 'rgba(255,102,229,1)';
    
            // loop through the data and draw!
            for (let i=0; i<audioData.length; i++){
                ctx.fillRect(margin + i * (barWidth + barSpacing), topSpacing + 256-audioData[i], barWidth, barHeight);
            }
    
            ctx.restore();
        }
    }

	// 5 - draw circles
    if (circleCheckBox.checked){
        if (params.showCircles){
            let maxRadius = canvasHeight/4;
            ctx.save();
            ctx.globalAlpha = 0.5;
            
            for (let i=0; i<audioData.length; i++){
                // red-ish circles
                let percent = audioData[i] / 255; 
                let centerX = canvasWidth/2;
                let centerY = (canvasHeight/2) - 50;

                ctx.lineWidth = 6;
                ctx.strokeStyle = `rgba(255,230,251,.15)`;
                ctx.fillStyle = "#ff66e5";
                drawHeart(ctx,centerX,centerY,percent);
                ctx.fill();
                ctx.stroke();
            }
            ctx.restore();
        }
    }

    // 6 - bitmap manipulation
    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let data = imageData.data;
    let length = data.length;
    let width = imageData.width; // not using here

    // B) Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)
    for (let i = 0; i < length; i += 4) {    
        // C) randomly change every 20th pixel to red
        if (noiseCheckBox.checked){
            if (params.showNoise && Math.random() < .00009){
                // data[i] is the red channel
                // data[i+1] is the green channel
                // data[i+2] is the blue channel
                // data[i+3] is the alpha channel
                // zero out the red and green and blue channels
                // make the red channel 100% red
                data[i] = data[i+1] = data[i+2] = 0;// zero out the red, green and blue channels
                //data[i] = 255; //make the red channel 100% red
            } // end if
        }

        // invert?
        if(invertCheckbox.checked){
            if (params.showInvert){
                let red = data[i], green = data[i+1], blue = data[i+2];
                data[i] = 255 - red; // set red
                data[i+1] = 255 - green; // set green
                data[i+2] = 255 - blue; // set blue
                //data[i+3] is the alpha, but we're leaving that alone
            }
        }

    } // end for
 
    // D) copy image data back to canvas
    ctx.putImageData(imageData, 0, 0);
}

// shape functions!
const drawHeart = (ctx,x,y,scale=1) => {
    ctx.save();
    ctx.beginPath();

    if (scale == 0){
        scale = .01;
    }

    x = (x*scale)/scale;
    y = (y*scale)/scale;

    ctx.translate(x-(x*scale),y-(scale*y));
    ctx.scale(scale,scale);

    //starting point
    ctx.moveTo(x, y);

    // right side
    ctx.quadraticCurveTo(x + 30, y - 40, x + 70, y - 40);
    ctx.arcTo(x + 130, y - 40, x + 130, y, 55);
    ctx.quadraticCurveTo(x + 130, y + 70, x, y + 170);

    // back to starting point
    ctx.moveTo(x, y);

    // left side
    ctx.quadraticCurveTo(x - 30, y - 40, x - 70, y - 40);
    ctx.arcTo(x - 130, y - 40, x - 130, y, 55);
    ctx.quadraticCurveTo(x - 130, y + 70, x, y + 170);

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.restore();

}

const clearScreen = (canvasElement) => {
    ctx = canvasElement.getContext("2d");
    ctx.fillStyle = currentFill;
}

export {setupCanvas,draw};