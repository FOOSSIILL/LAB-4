class Card extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:`open`});
    }

    connectedCallback(): void {
        this.render();
    }

    render(): void {
        if(!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `<section>
        <h4>titulo</h4>
        </section>`;
    }
}

customElements.define("my-card", Card);
export default Card;