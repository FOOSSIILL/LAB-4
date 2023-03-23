enum CardAttributes {
    titulo = 'titulo',
    description = 'description',
}

 export enum CardBookedEvents {
    reservado = 'reservado'
}

export type CardReservadoEvent = CustomEvent<{titulo: string}>

class Card extends HTMLElement {
    titulo = "";
    description = "";
    booked = false;
    
    static get observedAttributes(): CardAttributes[] {
        return Object.keys(CardAttributes) as CardAttributes[];
    }

    attributeChangedCallback(prop: CardAttributes, _: string, newValue: string): void {
        this[prop] = newValue;
    }
    
    constructor() {
        super();
        this.attachShadow({mode:`open`});
        this.handleClick = this.handleClick.bind(this);
    }

    connectedCallback(): void {
        this.mount();
    }

    mount(): void {
        this.render();
        this.addListeners(); 
    }
    
    handleClick(): void {
        this.booked = true;
        const event: CustomEvent = new CustomEvent(CardBookedEvents.reservado, {
            detail: {
                titulo: this.titulo
            },
            composed: true
        });
        this.dispatchEvent(event);
        this.mount();
    }
    
    addListeners(): void {
        const btn = this.shadowRoot?.querySelector("button");
        btn?.addEventListener("click", this.handleClick);
    }
   
    render(): void {
        if(!this.shadowRoot) return;
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