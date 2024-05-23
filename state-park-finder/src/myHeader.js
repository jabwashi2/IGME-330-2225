class MyHeader extends HTMLElement {
    constructor() {
      super();
  
      const template = `
      <style>
      .hero.is-info.is-bold {
        background-image: linear-gradient(141deg,#208fbc 0,#3e8ed0 71%,#4d83db 100%);
    }
    
     .hero.is-info {
        background-color: #3e8ed0;
        color: #fff;
    }
      .hero.is-primary.is-bold {
        background-image: linear-gradient(141deg,#009e6c 0,#00d1b2 71%,#00e7eb 100%);
      }
      .hero.is-primary {
        background-color: #00d1b2;
        color: #fff;
      }
      .hero {
        align-items: stretch;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .hero.is-info .title {
        color: #fff;
    }
      .hero.is-info .subtitle {
        color: rgba(255,255,255,.9);
    }
      .p-2 {
        padding: 0.5rem!important;
      }
      
      article, aside, figure, footer, header, hgroup, section {
        display: block;
      }
      *, ::after, ::before {
        box-sizing: inherit;
      }

      body {
        font-size: 1em;
        font-weight: 400;
        line-height: 1.5;
        
      }
      /* h1 css*/

      .hero.is-primary .title {
        color: #fff;
    }
    .block:not(:last-child), .box:not(:last-child), .breadcrumb:not(:last-child), .content:not(:last-child), .level:not(:last-child), .message:not(:last-child), .notification:not(:last-child), .pagination:not(:last-child), .progress:not(:last-child), .subtitle:not(:last-child), .table-container:not(:last-child), .table:not(:last-child), .tabs:not(:last-child), .title:not(:last-child) {
        margin-bottom: 1.5rem;
    }
    .title {
        color: #363636;
        font-size: 2rem;
        font-weight: 600;
        line-height: 1.125;
    }
    .subtitle, .title {
        word-break: break-word;
    }
    h1, h2, h3, h4, h5, h6 {
        font-size: 100%;
        font-weight: 400;
    }
    blockquote, body, dd, dl, dt, fieldset, figure, h1, h2, h3, h4, h5, h6, hr, html, iframe, legend, li, ol, p, pre, textarea, ul {
        margin: 0;
        padding: 0;
    }
    *, ::after, ::before {
        box-sizing: inherit;
    }
    user agent stylesheet
    h1 {
        display: block;
        font-size: 2em;
        margin-block-start: 0.67em;
        margin-block-end: 0.67em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
    }
    /*h2 style*/
    .hero.is-primary .subtitle {
      color: rgba(255,255,255,.9);
  }
  
  .title:not(.is-spaced)+.subtitle {
      margin-top: -1.25rem;
  }
  .subtitle {
      color: #4a4a4a;
      font-size: 1.25rem;
      font-weight: 400;
      line-height: 1.25;
  }
  .subtitle, .title {
      word-break: break-word;
  }
  h1, h2, h3, h4, h5, h6 {
      font-size: 100%;
      font-weight: 400;
  }
  blockquote, body, dd, dl, dt, fieldset, figure, h1, h2, h3, h4, h5, h6, hr, html, iframe, legend, li, ol, p, pre, textarea, ul {
      margin: 0;
      padding: 0;
  }
  *, ::after, ::before {
      box-sizing: inherit;
  }
  user agent stylesheet
  h2 {
      display: block;
      font-size: 1.5em;
      margin-block-start: 0.83em;
      margin-block-end: 0.83em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: bold;
  }

  /*div css*/

  .container {
    flex-grow: 1;
    margin: 0 auto;
    position: relative;
    width: auto;
}

*, ::after, ::before {
    box-sizing: inherit;
}
user agent stylesheet
div {
    display: block;
}

.hero.is-small .hero-body {
  padding: 1.5rem;
}

.hero-body {
  flex-grow: 1;
  flex-shrink: 0;
  padding: 3rem 1.5rem;
}
*, ::after, ::before {
  box-sizing: inherit;
}
user agent stylesheet
div {
  display: block;
}
      </style>

    <header class="hero is-small is-info is-bold p-2">
      <div class="hero-body">
        <div class="container">
        <h1 class="title"><slot name="title">HW-4 - NY State Park Buddy!</slot></h1>
        <h2 class="subtitle"><slot name="subtitle">Your one-stop resource for NYS parks!</slot></h2> 
        </div>
      </div>
    </header> 
    `;
      const shadow = this.attachShadow({ mode: "open" });
      shadow.innerHTML = template;
    }
  }
  customElements.define("my-header", MyHeader);
  export { MyHeader }; 