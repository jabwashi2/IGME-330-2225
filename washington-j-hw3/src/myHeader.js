// make template component
const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
<header class="hero is-small is-primary is-bold p-2">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">???</h1>
        <h2 class="subtitle">???</h2>
      </div>
    </div>
</header>
`;

class MyHeader extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes(){
        return ["data-title","data-subtitle"];
    }

    attributeChangedCallback(name, oldValue, newValue){
        this.render();
    }

    connectedCallback(){
        this.render();
    }

    render(){
        this.shadowRoot.querySelector(".title").innerHTML = this.dataset.title || "No title provided";
        this.shadowRoot.querySelector(".subtitle").innerHTML = this.dataset.subtitle || "No subtitle provided";
    }
}

customElements.define('my-header', MyHeader);