class Card extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: `open` });
    }
    connectedCallback() {
        this.render();
    }
    render() {
        if (!this.shadowRoot)
            return;
        this.shadowRoot.innerHTML = `<section>
        <h4>titulo</h4>
        </section>`;
    }
}
customElements.define("my-card", Card);
export default Card;
