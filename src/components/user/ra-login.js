import { LitElement, html, css } from 'lit';
import { DileForm } from '@dile/ui/mixins/form';
import '@dile/ui/components/checkbox/checkbox.js';

export class RaLogin extends DileForm(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
    <dile-card title="Inicio de sesión">
      <dile-input
        id="email"
        name="email"
        label="Email"
      ></dile-input>
      <dile-password
        id="password"
        name="password"
        label="Clave"
      ></dile-password>
      <p>
        <dile-button @click=${this.login}>Iniciar sesión</dile-button>
      </p>
    </dile-card>
    `;
  }

  login() {
    const data = this.getData();
    console.log(data);
  }
}
customElements.define('ra-login', RaLogin);
