import { MyBookmark } from "./myBookmark.js";
import { Favorite } from "./favorite.js";
import * as storage from "./storage.js";
import "./myHeader.js";

// **************** variables ****************

// making the app header
const header = document.createElement("my-header");
header.dataset.title = "Web Components";
header.dataset.subtitle = "Save your links for later!";
document.body.insertBefore(header, document.body.firstElementChild);

// submit and cancel buttons
let submitButton = document.querySelector("#favorite-submit-button");
let cancelButton = document.querySelector("#favorite-cancel-button");

// favorites
let favorites = [];

// input fields
let fields = document.querySelectorAll("input");

// **************** functions ****************

// submit button function
const submitClicked = (evt) => {
  console.log("submit clicked");

  let name = document.querySelector("#favorite-text");
  let url = document.querySelector("#favorite-url");
  let comments = document.querySelector("#favorite-comments");
  let error = document.querySelector("#error-message");

  console.log(`Name: ${name.value} URL: ${url.value} Comments: ${comments.value}`)

  if (name.value.trim() == "" || url.value.trim() == "" || comments.value.trim() == ""){
     error.innerHTML = "Fill required fields!!";
  }
  else{
    error.innerHTML = "";
    let localFid = crypto.randomUUID();
    // add to favorites array
    favorites.push(new Favorite(localFid, name.value, url.value, comments.value));
    // make new bookmark
    createBookmarkComponent(localFid, name.value, url.value, comments.value);
    // update local storage
    storage.setFavorites(favorites);
  }

  // clearing form fields
  name.value = "";
  url.value = "";
  comments.value = "";

  // updating number of favorites
  updateNumFavorites();

  evt.preventDefault();
  return false;
}

// cancel button function
const clearFormFields = (evt) => {
  for (let f of fields){
    f.value = "";
  }

  let error = document.querySelector("#error-message");
  error.innerHTML = "";

  evt.preventDefault();

  return false;
}

// delete button function
const deleteFavorite = (fid) => {
  for (let f of favorites){
    if (f.fid == fid){
      // get the index of the favorite to delete
      let index = favorites.indexOf(f);

      // remove chosen favorite using splice; https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript
      favorites.splice(index, 1);
      storage.setFavorites(favorites);
    }
  }

  updateNumFavorites();

}

// bookmark creation function
const createBookmarkComponent = (fid, text, url, comments) => {
  // make a new bookmark elements
  const bookmark = document.createElement("my-bookmark");

  // set attributes
  bookmark.dataset.fid = fid;
  bookmark.dataset.text = text;
  bookmark.dataset.url = url;
  bookmark.dataset.comments = comments;

  // set up callbacks
  bookmark.callback = deleteFavorite;

  // add to bookmarks
  const newLI = document.createElement("li");
  newLI.appendChild(bookmark);
  document.querySelector("#bookmarks").appendChild(newLI);

}

// number of favorites
const updateNumFavorites = () => {
  // number of favorites
  let numFavs = favorites.length;
  let numFavDisplay = document.querySelector("#num-favorites");
  numFavDisplay.innerHTML = `Number of Favorites: ${numFavs}`;
}

// load in favorites
const loadFavoritesFromStorage = () => {
  // get favorites from local storage
  let favs = storage.getFavorites();
  for (let f of favs){
    createBookmarkComponent(f.fid, f.text, f.url, f.comments);
    favorites.push(new Favorite(f.fid, f.text, f.url, f.comments));
  }
  updateNumFavorites();
}

// **************** other stuff ****************

//load favorites
loadFavoritesFromStorage();

// calling submitClicked when submit button is called
submitButton.onclick = (e) => submitClicked(e);

// calling clearFormFields when cancel is clicked
cancelButton.onclick = (e) => clearFormFields(e);