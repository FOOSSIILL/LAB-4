import { CardBookedEvents } from "./components/card/Card.js";
import "./components/index.js";
import data from "./data.js";
class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.selections = "";
        this.attachShadow({ mode: `open` });
    }
    handleCardClick(event) {
        const cardName = event.detail.titulo;
        if (this.selections.includes(cardName)) {
            this.selections = this.selections.replace(cardName, "");
        }
        else {
            this.selections += cardName;
        }
        this.mount();
    }
    connectedCallback() {
        this.mount();
    }
    mount() {
        this.render();
        this.addListeners();
    }
    addListeners() {
        var _a;
        const cards = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('my-card');
        cards === null || cards === void 0 ? void 0 : cards.forEach(card => card.addEventListener(CardBookedEvents.reservado, (event) => this.handleCardClick(event)));
    }
    render() {
        if (!this.shadowRoot)
            return;
        data.forEach(element => {
            this.shadowRoot.innerHTML += `
        <h3>reservados: ${this.selections}</h3>
        <my-card titulo = "${element.tittle}" description = "${element.description}" img = "${element.img}" imghearder = "${element.imgheader}" fecha = "${element.fecha}"></my-card>
        `;
        });
    }
}
customElements.define("app-container", AppContainer);
