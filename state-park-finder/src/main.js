import * as map from "./map.js";
import * as ajax from "./ajax.js";
import * as myButton from "./myButton.js";
import * as myHeader from "./myHeader.js";
import * as myFooter from "./myFooter.js";

// I. Variables & constants
// NB - it's easy to get [longitude,latitude] coordinates with this tool: http://geojson.io/
const lnglatNYS = [-75.71615970715911, 43.025810763917775];
const lnglatUSA = [-98.5696, 39.8282];
let geojson;
let favoriteIds = [];
//"p20","p79","p180","p43"


// II. Functions
let loadFavoritesFromStorage = () => {
	const storedFavorites = JSON.parse(localStorage.getItem("acf6919-favorites-2"));
	if (storedFavorites) {
	  favoriteIds.push(...storedFavorites);
	}
}
//Creates favorite elements based on favorite id array.
const createFavoriteElement=(id)=>{
	
		const feature = map.getFeatureById(id);
		const a = document.createElement("a");
		a.className ="panel-block";
		a.id=feature.id;
		a.onclick =() =>{
			showFeatureDetails(a.id);
			map.setZoomLevel(6);
			map.flyTo(feature.geometry.coordinates);
		};
		a.innerHTML=`
		<span class ="panel-icon">
			<i class ="fas fa-map-pin"></i>
		</span>
		${feature.properties.title}
		`;
		return a;
	
};
//delete and remake favorites div
const refreshFavorites=()=>{
	const favoritesContainer = document.querySelector("#favorites-list");
	favoritesContainer.innerHTML = "";
	for(const id of favoriteIds){
		favoritesContainer.appendChild(createFavoriteElement(id));
	};	
};

const setupUI = () => {
	// NYS Zoom 5.2
	document.querySelector("#btn1").onclick = () =>{
		map.setZoomLevel(5.2);
		map.setPitchAndBearing(0,0);
		map.flyTo(lnglatNYS);
	}
	// NYS isometric view
	document.querySelector("#btn2").onclick =() =>{
		map.setZoomLevel(5.5);
		map.setPitchAndBearing(45,0);
		map.flyTo(lnglatNYS);
	}
	// World zoom 0
	document.querySelector("#btn3").onclick =() =>{
		map.setZoomLevel(3);
		map.setPitchAndBearing(0,0);
		map.flyTo(lnglatNYS);
	}
	refreshFavorites();
}
//fill divs with park information
const showFeatureDetails = (id) => {
	console.log(`showFeatureDetails - id=${id}`);
	const feature = map.getFeatureById(id);
	document.querySelector("#details-1").innerHTML = `Info for ${feature.properties.title}`;
	document.querySelector("#details-2").innerHTML = `
  	<p>Address: ${feature.properties.address}</p>
  	<p>Phone: <a href="tel:${feature.properties.phone}">${feature.properties.phone}</a></p>
  	<p>Website: <a href="${feature.properties.url}" target="_blank">${feature.properties.url}</a></p>
`;
let button= new myButton.MyButton(id);
//sets onclick method/disable for both buttons

	button.shadowRoot.querySelector(".is-warning").addEventListener("click", () => {
		console.log("Delete clicked");
		const index = favoriteIds.indexOf(id);
		if (index > -1) { // only splice array when item is found
			favoriteIds.splice(index, 1); // 2nd parameter means remove one item only
			localStorage.setItem("acf6919-favorites-2", JSON.stringify(favoriteIds));
			console.log("found it");
		}
		button.shadowRoot.querySelector(".is-warning").disabled = true;
		button.shadowRoot.querySelector(".is-success").disabled = false;
		refreshFavorites();
	});
	
	button.shadowRoot.querySelector(".is-success").addEventListener("click", () => {
		favoriteIds.push(id);
		localStorage.setItem("acf6919-favorites-2", JSON.stringify(favoriteIds));
		button.shadowRoot.querySelector(".is-warning").disabled = false;
		button.shadowRoot.querySelector(".is-success").disabled = true;
		refreshFavorites();
	});

if(favoriteIds.includes(id)){
	button.shadowRoot.querySelector(".is-success").disabled = true;
}
else{
	button.shadowRoot.querySelector(".is-warning").disabled = true;
}
  //Add items to bookmark list and update favorite counter
document.querySelector("#details-2").appendChild(button);
document.querySelector("#details-3").innerHTML = `<p>${feature.properties.description}</p>`;

};


const init = () => {
	//document.body.prepend(new myHeader.MyHeader);
	loadFavoritesFromStorage();
	map.initMap(lnglatNYS);
	ajax.downloadFile("data/parks.geojson", (str) =>{
		geojson = JSON.parse(str);
		console.log(geojson);
		map.addMarkersToMap(geojson,showFeatureDetails);
		setupUI();
	});
	if(!favoriteIds.length){
		favoriteIds.forEach((id) => {
			createFavoriteElement(id);
		});
	}

	// let footer = document.createElement("my-footer");
	// document.body.appendChild(footer);
	// document.body.appendChild(new myFooter.MyFooter);
	//localStorage.setItem("acf6919-favorites-2", JSON.stringify(""));
};

init();