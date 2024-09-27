import { LitElement, html, css } from 'lit';
import { StateMixin } from '../../mixins/state-mixin';

export class RaAuthenticated extends StateMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
      .loading {
        display: flex;
        width: 100%;
        height: 120px;
        align-items: center;
        justify-content: center;
      }
    `
  ];

  static get properties() {
    return {
      loggedIn: { type: Boolean },
      initialized: { type: Boolean },
    };
  }

  stateChanged(state) {
    this.loggedIn = state.user.loggedIn;
    this.initialized = state.user.initialized;
  }

  render() {
    return html`
      ${this.initialized
        ? this.initializedTemplate
        : this.loadingTemplate
      }
    `
  }

  get initializedTemplate() {
    return html`
      ${this.loggedIn
        ? html`<slot></slot>`
        : ''
      }
    `
  }

  get loadingTemplate() {
    return html`<div class="loading"><dile-spinner active></dile-spinner></div>`
  }
}
customElements.define('ra-authenticated', RaAuthenticated);
