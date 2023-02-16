import {getRandomColor, getRandomInt} from "./utils.js";
import { drawArc, drawLine, drawRectangle } from "./canvas-utils.js";

let ctx;
let paused = false;
let clearScreen = false;
let canvas;
let createRectangles = true;
let createArcs = true;
let createLines = true;

const init = () => {
    console.log("page loaded!");
    canvas = document.querySelector("canvas");
    
    ctx = canvas.getContext("2d");
    
    ctx.fillStyle = "#61b1d4"; 
    ctx.fillRect(0,0,640,480); 

    // drawing stuff
    drawRectangle(ctx,20,20,600,440);
    drawRectangle(ctx,120,90,400,300,"rgba(255,255,255,.9)");
    drawRectangle(ctx,170,170,300,200,"black",10,"yellow");
    drawRectangle(ctx,220,220,200,100,"yellow",10,"purple");
    
    drawArc(ctx,220,120,15,0,2*Math.PI,"purple",5,"white");

    drawLine(ctx,25,150,200,150,5,"orange");
    drawLine(ctx,300,200,400,250,5,"orange");

    drawArc(ctx,325,290,50,0,Math.PI,"purple",2,"white");
    drawArc(ctx,300,250,15,0,2*Math.PI,"black",5,"white");
    drawArc(ctx,340,250,15,0,2*Math.PI,"black",5,"white");

    drawLine(ctx,20,150,620,150,20,"yellow");

    setupUI();

    update();
}

const update = () => {
    if (paused) return;
    
    requestAnimationFrame(update);
    if (createArcs) drawRandomArc();
    if (createLines) drawRandomLine();

    if (createRectangles) drawRandomRect(ctx);

}

const drawRandomRect = (ctx) => {
    drawRectangle(ctx,getRandomInt(0,640),getRandomInt(0,480),getRandomInt(2,15),getRandomInt(2,20),getRandomColor(),getRandomInt(1,3),getRandomColor());
}

const drawRandomArc = () => {
    drawArc(ctx,getRandomInt(0,640),getRandomInt(0,480),getRandomInt(10,20),getRandomInt(0,15),2*Math.PI,getRandomColor());
}

const drawRandomLine = () => {
    drawLine(ctx,getRandomInt(40,400),getRandomInt(40,400),getRandomInt(40,400),getRandomInt(40,400),getRandomInt(1,5),getRandomColor());
}

// event handlers!
const canvasClicked = (e) => {
    let rect = e.target.getBoundingClientRect();
    let mouseX = e.clientX - rect.x;
    let mouseY = e.clientY - rect.y;
    console.log(mouseX,mouseY);

    for (let i = 0; i < 10; i++){
        let x = getRandomInt(-100,100) + mouseX;
        let y = getRandomInt(-100,100) + mouseY;
        let radius = getRandomInt(10,20);
        let color = getRandomColor();
        drawArc(ctx,x,y,radius,0,2*Math.PI,color,0,color);
    }
}
    
// helpers
const setupUI = () => {
    document.querySelector("#btn-pause").onclick = function(){
        paused = true;
        clearScreen = false;
    };

    document.querySelector("#btn-play").onclick = function(){
        if (paused){
        clearScreen = false;
        paused = false;
        update();
        }
    }
    document.querySelector("#btn-clear").onclick = function(){
        clearScreen = true;
        if (clearScreen){
        ctx.fillStyle = "#61b1d4"; 
        ctx.fillRect(0,0,640,480); 
        }
    }

    document.querySelector("#cb-rectangles").onclick = function(e){
        createRectangles = e.target.checked;
    }
    document.querySelector("#cb-arcs").onclick = function(e){
        createArcs = e.target.checked;
    }            
    document.querySelector("#cb-lines").onclick = function(e){
        createLines = e.target.checked;
    }

    canvas.onclick = canvasClicked;

}

init();