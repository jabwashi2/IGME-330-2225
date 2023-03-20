/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the consts in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './canvas.js';

let highshelf = false;
let lowshelf = false;

// drawParams object 
const drawParams = {
  showGradient : true,
  showBars : true,
  showCircles : true,
  showNoise : true,
  showInvert : true,
  showSparkles : true
};

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
	sound1  :  "media/New Adventure Theme.mp3"
});

const init = () => {
  audio.setupWebAudio(DEFAULTS.sound1);
	console.log("init called");
	console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
	let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
  canvas.setupCanvas(canvasElement,audio.analyserNode);
	setupUI(canvasElement);
  loop();
}

const setupUI = (canvasElement) => {
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#fs-button");
	const playButton = document.querySelector("#play-button");

  // add .onclick event to fullscreen button
  fsButton.onclick = e => {
    console.log("init called");
    utils.goFullscreen(canvasElement);
  };

  // add .onclick event to play button
  playButton.onclick = e =>{
    console.log(`audioCtx.state before = ${audio.audioCtx.state}`);
    
    //check if contedxt is in suspended state (autoplay policy)
    if (audio.audioCtx.state == "suspended"){
        audio.audioCtx.resume();
    }
    console.log(`audioCtx.state after = ${audio.audioCtx.state}`);

    if (e.target.dataset.playing == "no"){
        // if track is currently paused, play it
        audio.playCurrentSound();
        e.target.dataset.playing = "yes"; // our CSS will set the text to 'Pause'
        // if the track IS playing, pause it
    }
    else{
        audio.pauseCurrentSound();
        e.target.dataset.playing = "no"; // our CSS will set the text to 'Play'
    }
  };

  // C - hookup volume slider & label
  let volumeSlider = document.querySelector("#slider-volume");
  let volumeLabel = document.querySelector("#label-volume");

  // add .oninput event to slider
  volumeSlider.oninput = e =>{
    // set the gain
    audio.setVolume(e.target.value);
    // update value of label to match value of slider
    volumeLabel.innerHTML = Math.round((e.target.value/2 * 100));
  }

  // set value of label to match initial value of slider
  volumeSlider.dispatchEvent(new Event("input"));

  // D - hookup track <select>
  let trackSelect = document.querySelector("#track-select");
  // add .onchange event to <select>
  trackSelect.onchange = e => {
    audio.loadSoundFile(e.target.value);
    // pause the current track if it is playing
    if (playButton.dataset.playing == "yes"){
      playButton.dispatchEvent(new MouseEvent("click"));
    }
  }

  // highshelf and lowshelfd
  document.querySelector('#cb-highshelf').checked = highshelf;
  document.querySelector('#cb-lowshelf').checked = lowshelf;

  document.querySelector('#cb-highshelf').onchange = e => {
    highshelf = e.target.checked;
    audio.toggleHighshelf(highshelf);
  };
  document.querySelector('#cb-lowshelf').onchange = e => {
    lowshelf = e.target.checked;
    audio.toggleLowshelf(lowshelf);
  };

  audio.toggleHighshelf();
  audio.toggleLowshelf();
	
} // end setupUI

const loop = () => {
  /* NOTE: This is temporary testing code that we will delete in Part II */
    requestAnimationFrame(loop);

    //canvas.clearScreen(document.querySelector("canvas"))

    canvas.draw(drawParams);
    // 1) create a byte array (values of 0-255) to hold the audio data
    // normally, we do this once when the program starts up, NOT every frame
    let audioData = new Uint8Array(audio.analyserNode.fftSize/2);
    
    // 2) populate the array of audio data *by reference* (i.e. by its address)
    audio.analyserNode.getByteFrequencyData(audioData);


}

export {init};