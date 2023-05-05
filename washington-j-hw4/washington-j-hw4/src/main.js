import * as map from "./map.js";
import * as ajax from "./ajax.js";
import * as storage from "./storage.js";

// I. Variables & constants
// NB - it's easy to get [longitude,latitude] coordinates with this tool: http://geojson.io/
const lnglatNYS = [-75.71615970715911, 43.025810763917775];
const lnglatUSA = [-98.5696, 39.8282];
let favoriteIds = [];
let geojson;


// II. Functions

// ****** favorite and delete button functions ******
const addFavorite = (id) => {
	console.log("addFavorite clicked!");
	// add id to favorites array
	favoriteIds.push(id);
	storage.setFeaturesId(favoriteIds);
};

const deleteFavorite = (id) => {
	console.log("deleteFavorite clicked!");
	// remove id from favorites array
	for (let thisid of favoriteIds){
		if (thisid === id){
		  // get the index of the favorite to delete
		  let index = favoriteIds.indexOf(thisid);
	
		  // remove chosen favorite using splice; https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript
		  favoriteIds.splice(index, 1);
		}
	}

	storage.setFeaturesId(favoriteIds);
};
// ****** end of button functions ******

const createFavoriteElement = (id) => {
	const feature = getFeatureById(id);
	const a = document.createElement("a");
	a.className = "panel-block";
	a.id = feature.id;
	a.onclick = () => {
		showFeatureDetails(a.id);
		map.setZoomLevel(6);
		map.flyTo(feature.geometry.coordinates);
	};
	a.innerHTML = `
		<span class="panel-icon">
			<i class="fas fa-map-pin"></i>
		</span>
		${feature.properties.title}
	`;
	return a
};

const refreshFavorites = () => {
	const favoritesContainer = document.querySelector("#favorites-list");
	favoritesContainer.innerHTML = "";
	for (const id of favoriteIds){
		favoritesContainer.appendChild(createFavoriteElement(id));
	}
};

const getFeatureById = (id) => {
	for (let f of geojson.features){
		if (f.id === id){
			return f;
		}
	}
};

const showFeatureDetails = (id) => {
	console.log(`showFeatureDetails - id=${id}`);
	const feature = getFeatureById(id);
	document.querySelector("#details-1").innerHTML = `Info for ${feature.properties.title}`;

	// details-2 display:
	// - address
	// - phone
	// - web site + clickable link
	// - favorite + delete buttons
	document.querySelector("#details-2").innerHTML = `
	<p><b>Address: </b>${feature.properties.address}</p>

	<p tel:><b>Phone: </b><a href="tel:+${feature.properties.phone}">${feature.properties.phone}</a></p>

	<p><b>Website: </b> <a href="${feature.properties.url}">${feature.properties.url}</a></p>
	
	<div id="bookmark"><span id="buttons">
	<button class="button is-success is-small" id="btn-favorite">
	  <span class="icon is-small">
		<i class="fas fa-check"></i>
	  </span>
	  <span>Favorite</span>
	</button>
	<button class="button is-warning is-small" id="btn-delete">
	  <span>Delete</span>
	  <span class="icon is-small">
		<i class="fas fa-times"></i>
	  </span>
	</button>
    </span></div>`;

	// hooking up favorite and delete onclick
	let favoriteBtn = document.querySelector("#btn-favorite");
	let deleteBtn = document.querySelector("#btn-delete");

	// when favoriteBtn is clicked:
	// - add to favorites array
	// - update local storage
	// - disable this id's favoriteBtn
	favoriteBtn.onclick = () => {
		addFavorite(id);
		refreshFavorites();
		favoriteBtn.disabled = true;
		deleteBtn.disabled = false;
	}

	// when deleteBtn is clicked:
	// - remove from favorites array
	// - update local storage
	// - disable this id's deleteBtn
	deleteBtn.onclick = () => {
		deleteFavorite(id);
		refreshFavorites();
		deleteBtn.disabled = true;
		favoriteBtn.disabled = false;
	}


	// details-3 display:
	// - park desc
	document.querySelector("#details-3").innerHTML = `
	<p>${feature.properties.description}</p>
	`;
};

const loadFavoritesFromStorage = () => {
	// get favorites from local storage
	let favs = storage.getFeaturesId();
	console.log(favs);
	for (let f of favs){
	  favoriteIds.push(f);
	}
};

const setupUI = () => {
	// NYS Zoom 5.2
	document.querySelector("#btn1").onclick = () =>{
		map.setZoomLevel(5.2);
		map.setPitchAndBearing(0,0);
		map.flyTo(lnglatNYS);
	};
	
	// NYS isometric view
	document.querySelector("#btn2").onclick = () => {
		map.setZoomLevel(5.5);
		map.setPitchAndBearing(45,0);
		map.flyTo(lnglatNYS);
	};

	// World zoom 0
	document.querySelector("#btn3").onclick = () => {
		map.setZoomLevel(3);
		map.setPitchAndBearing(0,0);
		map.flyTo(lnglatUSA);
	};

	refreshFavorites();
};

const init = () => {
	map.initMap(lnglatNYS);
	ajax.downloadFile("data/parks.geojson", (str) => {
		geojson = JSON.parse(str);
		console.log(geojson);
		map.addMarkersToMap(geojson, showFeatureDetails);
		loadFavoritesFromStorage();
		setupUI();
	});	

};

init();