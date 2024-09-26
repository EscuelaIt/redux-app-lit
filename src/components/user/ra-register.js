import { LitElement, html, css } from 'lit';
import { DileForm } from '@dile/ui/mixins/form';
import { store } from '../../redux/store';
import { signUp } from '../../redux/user-slice';
import { StateMixin } from '../../mixins/state-mixin';

export class RaRegister extends StateMixin(DileForm(LitElement)) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  stateChanged(state) {
    if(state.user.registerValidationErrors) {
      this.clearErrors();
      this.showErrors(state.user.registerValidationErrors)
    }
  }

  render() {
    return html`
      <dile-card title="Registro de usuarios">
        <dile-input
          hideErrorOnInput
          name="name"
          label="Nombre"
          value="Miguel"
        ></dile-input>
        <dile-input
          hideErrorOnInput
          name="email"
          label="Email"
          value="m1@example.com"
        ></dile-input>
        <dile-password
          hideErrorOnInput
          id="password"
          name="password"
          label="Clave"
          value="1234"
        ></dile-password>
        <p>
          <dile-button @click=${this.register}>Crear una cuenta</dile-button>
        </p>
      </dile-card>
    `;
  }

  register() {
    const data = this.getData();
    store.dispatch(signUp(data));
  }
}
customElements.define('ra-register', RaRegister);
