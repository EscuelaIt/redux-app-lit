import { LitElement, html, css } from 'lit';
import '@dile/ui/components/card/card.js';
import '@dile/ui/components/nav/nav.js';
import { store } from '../redux/store';
import { stopLoading, startLoading, positiveFeedback, negativeFeedback } from '../redux/app-slice';
import './utils/ra-loading';
import './utils/ra-feedback';
import './user/ra-login';
import './user/ra-register';
import './user/ra-user-menu';

export class RaApp extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        
      }
      .title {
        font-size: 1.2rem;
        font-weight: 700;
      }
      main {
        padding: 1.5rem;
      }
      hr { 
        margin: 1rem 0;
      }
    `
  ];

  

  render() {
    return html`
      <dile-nav>
        <span slot="title" class="title">Redux-auth</span>
        <span slot="actions"><ra-user-menu></ra-user-menu></span>
      </dile-nav>
      <main>
        <ra-login></ra-login>
        <hr>
        <ra-register></ra-register>
        <p>
          <button @click=${this.toggleSpinner}>toggle</button>
          <dile-button @click=${this.showMessage}>Mostrar feedback desde app</dile-button>
          <dile-button @click=${this.showError}>Mostrar feedback negativo</dile-button>
        </p>
      </main>

      
      <ra-feedback></ra-feedback>
      <ra-loading></ra-loading>
    `;
  }

  toggleSpinner() {
    const state = store.getState();
    store.dispatch(startLoading());
    setTimeout(() => store.dispatch(stopLoading()), 2000);
  }

  showMessage() {
    store.dispatch(positiveFeedback('positivoooooo'));
  }

  showError() {
    store.dispatch(negativeFeedback('negativoooooo'));
  }
}
customElements.define('ra-app', RaApp);
