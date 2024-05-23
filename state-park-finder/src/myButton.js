const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer">    
<style>
    :host{
        display: inline-block;
        height: 3rem;
        line-height: 3rem;
    }
    #link{
      display: inline-block;
      width: 8rem;
    }
    #buttons{
      display: inline-block;
      vertical-align: middle;
      line-height: normal;
    }
    a{
      display: inline-block;
      vertical-align: middle;
      line-height: normal;
    }
    </style>

    <div>
      <span id="buttons">
        <button class="button is-success is-small">
          <span class="icon is-small">
            <i class="fas fa-check"></i>
          </span>
          <span>Favorite</span>
        </button>
        <button class="button is-warning is-small">
          <span>Delete</span>
          <span class="icon is-small">
            <i class="fas fa-times"></i>
          </span>
        </button>
      </span>
    </div>
    `;


class MyButton extends HTMLElement {
    // called when the component is first created, but before it is added to the DOM
    constructor(id){
      super();
      this._id = id;
      this.attachShadow({mode:"open"});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      // this.shadowRoot.querySelector(".is-warning").addEventListener("click", () => {
      //   console.log("Delete clicked");
      //   this.remove();
      // });
    }
  
    // tell the component what attributes to "watch"
    static get observedAttributes() {
      return ["data-fid","data-text", "data-url", "data-comments"];
    }
  
    // ** lifecycle events **
  
    // called when the component is inserted into the DOM
    connectedCallback(){
      this.render();
    }
  
    // this method is invoked each time one of the component's "watched" attributes changes
    attributeChangedCallback(attributeName, oldValue, newValue) {
      console.log(attributeName, oldValue, newValue);
      if(oldValue === newValue) return;
      if(attributeName == "data-text"){
        this._text = newValue;
      }
      if(attributeName == "data-url"){
        this._url = newValue;
      }
      if(attributeName == "data-comments"){
        this._comments = newValue || "No comments found";
      }
      this.render();
    }
  
    // helper method
    render(){
      this.innerHTML = `<span><a href="${this._url}" title="${this._comments}">${this._text}</a></span>`;
  
      let a = this.shadowRoot.querySelector("a");
      if(a){
        a.href = this._url;
        a.textContent= this._text;
        a.title = this._comments;
      }
    }
  }
  customElements.define('my-button', MyButton);

  export { MyButton };
