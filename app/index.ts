import { CardBookedEvents, CardReservadoEvent } from "./components/card/Card.js";
import "./components/index.js";
import data from "./data.js";

class AppContainer extends HTMLElement {
    selections = "";
    
    constructor() {
        super();
        this.attachShadow({mode:`open`});
    }

    handleCardClick(event: CardReservadoEvent): void {
       const cardName = event.detail.titulo; 
       if(this.selections.includes(cardName)) {
            this.selections = this.selections.replace(cardName, "");
       } else {
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
        const cards = this.shadowRoot?.querySelectorAll('my-card');
        cards?.forEach(card => card.addEventListener(CardBookedEvents.reservado, (event: Event) => this.handleCardClick(event as CustomEvent)));
    }
    
    render() {
        if(!this.shadowRoot) return;

        data.forEach(element => {
            this.shadowRoot.innerHTML += `
        <h3>reservados: ${this.selections}</h3>
        <my-card titulo = "${element.tittle}" description = "${element.description}" img = "${element.img}" imghearder = "${element.imgheader}" fecha = "${element.fecha}"></my-card>
        `;
        });
        
    }
}

customElements.define("app-container", AppContainer);