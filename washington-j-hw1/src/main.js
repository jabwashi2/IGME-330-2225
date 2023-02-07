import {getRandom} from "/src/utils.js";

let words1 = [];
let words2 = [];
let words3 = [];

const loadJSONBabble = () => {

    const url = "data/babble-data.json";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();


    xhr.onload = (e) => {
      console.log(`In onload - HTTP Status Code = ${e.target.status}`);
      const text = e.target.responseText;
      console.log(`Success - the file length is ${text. length}`);

      let babbles = JSON.parse(text);
      words1 = babbles.words1;
      words2 = babbles.words2;
      words3 = babbles.words3;
      getWords(1);


    };

    xhr.onerror = (e) =>
      console.log(`In onerror - HTTP Status Code = ${e.target.status}`);


}

const getWords = (num) => {
    let output = document.querySelector("#output");
    let bigList = document.createElement("ul");

    output.innerHTML = "";

    // generating babbles
    for (let i = 0; i < num; i++){

        let li = document.createElement("li");
        li.innerText = `${words1[getRandom(words1.length)]}, ${words2[getRandom(words2.length)]}, ${words3[getRandom(words3.length)]}`;
        bigList.appendChild(li);
    }

    output.appendChild(bigList);

}

const init = () => {
    const button = document.querySelector("#my-button");
    const button2 = document.querySelector("#bigger-button");

    button.addEventListener("click", ()=>{getWords(1)});
    button2.addEventListener("click", ()=>{getWords(5)});
}

window.addEventListener("load", loadJSONBabble);
window.addEventListener("load", init);