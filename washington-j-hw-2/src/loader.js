import * as main from "./main.js";
window.onload = ()=>{
	console.log("window.onload called");
	// 1 - do preload here - load fonts, images, additional sounds, etc...
	loadJSON();
	// 2 - start up app
	main.init();
}

const loadJSON = () => {

    const url = "data/av-data.json";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();


    xhr.onload = (e) => {
		console.log(`In onload - HTTP Status Code = ${e.target.status}`);
		const text = e.target.responseText;
		console.log(`Success - the file length is ${text. length}`);

		//get the data from the file
		//set title
		let JSONdata = JSON.parse(text);
		document.title = JSONdata.title;
		let header = document.querySelector("h1");
		header.innerHTML = JSONdata.title;

		// get track names
		let songDropdown = document.querySelector("#track-select");
		let newSongs;
		for (let s of JSONdata.songs){
			newSongs += `<option value="media/${s}.mp3">${s}</option>`;
		}
	
		songDropdown.innerHTML = newSongs;


		let instructions = document.querySelector("#instructions");
		instructions.innerHTML = JSONdata.instructions;

    };

    xhr.onerror = (e) =>
    console.log(`In onerror - HTTP Status Code = ${e.target.status}`);


}