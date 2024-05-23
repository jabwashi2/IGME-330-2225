class MyFooter extends HTMLElement {
    constructor() {
      super();
  
      const template = `
      <style>
      .footer {
        background-color: #fafafa;
        padding: 3rem 1.5rem
    rem
     6rem;
    }
    
    .has-text-centered {
        text-align: center!important;
    }
    .p-1 {
        padding: 0.25rem!important;
    }
    .has-background-info {
        background-color: #3e8ed0!important;
    }
    .has-text-light {
        color: #f5f5f5!important;
    }
    *, ::after, ::before {
        box-sizing: inherit;
    }
    user agent stylesheet
    div {
        display: block;
    }
    body {
        color: #4a4a4a;
        font-size: 1em;
        font-weight: 400;
        line-height: 1.5;
    }
    body, button, input, optgroup, select, textarea {
        font-family: BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
    }
    :host, :root {
        --fa-style-family-classic: "Font Awesome 6 Free";
        --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
    }
    :host, :root {
        --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
    }
    :host, :root {
        --fa-style-family-brands: "Font Awesome 6 Brands";
        --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
    }
    html {
        background-color: #fff;
        font-size: 16px;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        min-width: 300px;
        overflow-x: hidden;
        overflow-y: scroll;
        text-rendering: optimizeLegibility;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        text-size-adjust: 100%;
    }
    *, ::after, ::before {
        box-sizing: inherit;
    }
    *, ::after, ::before {
        box-sizing: inherit;
    }
</style>
        
      <div class="footer has-background-info has-text-centered has-text-light p-1"> <slot name="credits">© 2023 Ace</slot></div>
   
      `;

  
      const shadow = this.attachShadow({ mode: "open" });
      shadow.innerHTML = template;
    }
  }
  customElements.define("my-footer", MyFooter);
  export { MyFooter }; 