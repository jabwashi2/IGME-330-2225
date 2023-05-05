// make template component
const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
<div class="footer has-background-info has-text-centered has-text-light p-1">???</div>
`;

class MyFooter extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes(){
        return ["data-footer"];
    }

    attributeChangedCallback(name, oldValue, newValue){
        this.render();
    }

    connectedCallback(){
        this.render();
    }

    render(){
        this.shadowRoot.querySelector(".footer").innerHTML = this.dataset.footer || "No footer provided";
    }
}

customElements.define('my-footer', MyFooter);