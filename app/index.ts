import "./components/index.js";
class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:`open`});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if(!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
        <my-card></my-card>`;
    }
}

customElements.define("app-container", AppContainer);