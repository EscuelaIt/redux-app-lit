import { LitElement, html, css } from 'lit';
import { DileForm } from '@dile/ui/mixins/form';

export class RaRegister extends DileForm(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
      <dile-card title="Registro de usuarios">
        <dile-input
          name="name"
          label="Nombre"
        ></dile-input>
        <dile-input
          name="email"
          label="Email"
        ></dile-input>
        <dile-password
          id="password"
          name="password"
          label="Clave"
        ></dile-password>
        <dile-input
          name="cp"
          label="CP"
        ></dile-input>
        <p>
          <dile-button @click=${this.register}>Crear una cuenta</dile-button>
        </p>
      </dile-card>
    `;
  }

  register() {
    const data = this.getData();
    console.log(data);
  }
}
customElements.define('ra-register', RaRegister);
