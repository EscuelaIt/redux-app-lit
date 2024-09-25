import { LitElement, html, css } from 'lit';
import '@dile/ui/components/toast/toast';
import { StateMixin } from '../../mixins/state-mixin';

export class RaFeedback extends StateMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      time: { type: Number },
      incomingMsg: { type: Object },
    }
  }

  constructor() {
    super();
    this.time = 5000;
  }

  stateChanged(state) {
    if(state.app.feedback) {
      this.incomingMsg = state.app.feedback;
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('incomingMsg')) {
      this.changeIncomingMsg(this.incomingMsg);
    }
  }

  changeIncomingMsg(feedbackMsg) {
    if (feedbackMsg && feedbackMsg.msg && feedbackMsg.status) {
      this.toastElement.open(feedbackMsg.msg, feedbackMsg.status);
    }
  }

  render() {
    return html`
      <dile-toast id="myToast" duration="${this.time}"></dile-toast>
    `;
  }

  get toastElement() {
    return this.shadowRoot.getElementById('myToast');
  }

}
customElements.define('ra-feedback', RaFeedback);
