import { LitElement, html, css } from 'lit';
import '@dile/ui/components/spinner/spinner-modal.js';
import { StateMixin } from '../../mixins/state-mixin';

export class RaLoading extends StateMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      loading: { type: Boolean }
    };
  }

  stateChanged(state) {
    if(state.app.loading) {
      this.loading = true;
    } else {
      this.loading = false;
    }
  }

  render() {
    return html`
      <dile-spinner-modal ?active=${this.loading}></dile-spinner-modal>
    `;
  }
}
customElements.define('ra-loading', RaLoading);
