// #1 - Component with 2 attributes
const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<header class="hero is-info">
  <div class="hero-body">
    <h1 class="title">???</h1>
    <h2 class="subtitle">???</h2>
    <button class="button is-success" id="btn-hello">Hello</button>
    <button class="button is-warning" id="btn-goodbye">Goodbye</button>
  </div>
</header>
`;

class AppHeader extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.greeting = "Hello!";
    this.farewell = "Goodbye!";
  }

  static get observedAttributes(){
    return ["data-title","data-subtitle"];
  }

  attributeChangedCallback(name, oldValue, newValue){
    this.render();
  }

  connectedCallback(){
    const defaultCallback = () => console.log(`this._callback is not defined for ${this.tagName}`);
    this.callback = this.callback || defaultCallback;

    this.shadowRoot.querySelector('#btn-hello').onclick = () => {
      this.callback(`${this.greeting}`);
    }

    this.shadowRoot.querySelector('#btn-goodbye').onclick = () => {
      this.callback(`${this.farewell} and the secret number is ${this.specialNumber}`);
    }
    
    
    // I. GET BUTTON CLICKING WORKING - SEE HTML FILE FOR REQUIREMENTS
    this.render();
  }

  disconnectedCallback(){
    // II. CLEAN UP - SET THE BUTTON .ONCLICK HANDLERS TO NULL
    this.shadowRoot.querySelector('#btn-hello').onclick = null;
    this.shadowRoot.querySelector('#btn-goodbye').onclick = null;
  }

  render(){
    this.shadowRoot.querySelector(".title").innerHTML = this.dataset.title || "No title provided";
    this.shadowRoot.querySelector(".subtitle").innerHTML = this.dataset.subtitle || "No subtitle provided";
  }
} 

customElements.define('app-header', AppHeader);