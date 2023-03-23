var CardAttributes;
(function (CardAttributes) {
    CardAttributes["titulo"] = "titulo";
    CardAttributes["description"] = "description";
})(CardAttributes || (CardAttributes = {}));
export var CardBookedEvents;
(function (CardBookedEvents) {
    CardBookedEvents["reservado"] = "reservado";
})(CardBookedEvents || (CardBookedEvents = {}));
class Card extends HTMLElement {
    static get observedAttributes() {
        return Object.keys(CardAttributes);
    }
    attributeChangedCallback(prop, _, newValue) {
        this[prop] = newValue;
    }
    constructor() {
        super();
        this.titulo = "";
        this.description = "";
        this.booked = false;
        this.attachShadow({ mode: `open` });
        this.handleClick = this.handleClick.bind(this);
    }
    connectedCallback() {
        this.mount();
    }
    mount() {
        this.render();
        this.addListeners();
    }
    handleClick() {
        this.booked = true;
        const event = new CustomEvent(CardBookedEvents.reservado, {
            detail: {
                titulo: this.titulo
            },
            composed: true
        });
        this.dispatchEvent(event);
        this.mount();
    }
    addListeners() {
        var _a;
        const btn = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("button");
        btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", this.handleClick);
    }
    render() {
        if (!this.shadowRoot)
            return;
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./styles.css">
        <section>
        <img src="https://static.posters.cz/image/hp/67254.jpg" alt="">
        <h4>${this.titulo}</h4>
        <div class="kirby">
        <img src="https://dk2dv4ezy246u.cloudfront.net/widgets/sMuS2wu6Alq5_large.jpg">
        <p>${this.description}</p>
        <button>${this.booked ? 'quitar' : 'Reservar'}</button>
        </div>
        <div class="Mario">
        <img src="https://www.destructoid.com/wp-content/uploads/2023/02/super-mario-bros-movie-super-bowl-ad-1.jpg">
        <p>${this.description}</p>
        <button>${this.booked ? 'quitar' : 'Reservar'}</button>
        </div>
        <div class="Luigi">
        <img src="https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.0/c_scale,w_400/ncom/en_US/switch/site-design-update/oled-model-promo">
        <p>${this.description}</p>
        <button>${this.booked ? 'quitar' : 'Reservar'}</button>
        </div>
        </section>`;
    }
}
customElements.define("my-card", Card);
export default Card;
