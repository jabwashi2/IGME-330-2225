import { MyBookmark } from "./myBookmark.js";
import { Favorite } from "./favorite.js";

// **************** variables ****************

// submit and cancel buttons
let submitButton = document.querySelector("#favorite-submit-button");
let cancelButton = document.querySelector("#favorite-cancel-button");
let fields = document.querySelectorAll("input");

// favorites
let favorites = [];
favorites.push(new Favorite(crypto.randomUUID(), "RIT", "https://www.rit.edu", "A private university located new Rochester, NY"));

// input fields
let fields = document.querySelectorAll("input");

console.log(favorites);


// **************** functions ****************
// submit button function
const submitClicked = (evt) => {
  // got clicked!
  console.log("submitClicked");

  // grab input from the 3 form fields x
  // print out an error messge if anything is missing
  // if all 3 values are present:
    // make a new Favorite()
    // add to favorites array
    // make new bookmark component

  for (f of fields){
    if (f == null){
      console.log("info missing!!");
    }
  }  

  evt.preventDefault();
  return false;
}

const clearFormFields = (evt) => {
  for (let f of fields){
    f.value = "";
  }

  evt.preventDefault();

  return false;
}

const createBookmarkComponent = (fid, text, url, comments) => {
  // make a new bookmark elements
  const bookmark = document.createElement("my-bookmark");

  // set attributes
  bookmark.dataset.fid = fid;
  bookmark.dataset.text = text;
  bookmark.dataset.url = url;
  bookmark.dataset.comments = comments;

  // add to bookmarks
  const newLI = document.createElement("li");
  newLI.appendChild(bookmark);
  document.querySelector("#bookmarks").appendChild(newLI);

}

const loadFavoritesFromStorage = () => {
  for (let f of favorites){
    createBookmarkComponent(f.fid, f.text, f.url, f.comments);
  }
}

// **************** other stuff ****************
//load favorites
loadFavoritesFromStorage();

// calling submitClicked when submit button is called
submitButton.onclick = (e) => submitClicked(e);

// calling clearFormFields when cancel is clicked
cancelButton.onclick = (e) => clearFormFields(e);

loadFavoritesFromStorage();

/*
const bookmarks = [
    {
      text: "Bing",
      url: "https://www.bing.com",
      comments: "Bing is a web search engine owned and operated by Microsoft."
    },
    {
      text: "Google",
      url: "https://www.google.com",
      comments: "Google Search is a search engine provided and operated by Google."
    },
    {
      text: "DuckDuckGo",
      url: "https://duckduckgo.com/",
      comments: "DuckDuckGo (DDG) is an internet search engine that emphasizes protecting searchers' privacy."
    }
];

window.onload = () => {

    for (let b of bookmarks){
        // make the element
        const bookmark = document.createElement("my-bookmark");

        // populate the element using the array values
        bookmark.dataset.text = b.text;
        bookmark.dataset.url = b.url;
        bookmark.dataset.comments = b.comments;

        // add to list
        const newLI = document.createElement("li");
        newLI.appendChild(bookmark);
        document.querySelector("#bookmarks").appendChild(newLI);
    }

    // // Create a MyBookmark and add it to the list
    // const bing = document.createElement("my-bookmark");

    // // ANOTHER way to set custom attributes, the .dataset property
    // // note that these 2 lines of code will also trigger attributeChangedCallback()
    // bing.dataset.text = "Bing";
    // bing.dataset.url = "https://www.bing.com/";

    // const newLI = document.createElement("li");
    // newLI.appendChild(bing);
    // document.querySelector("#bookmarks").appendChild(newLI);
};
*/