import { LitElement, html, css } from 'lit';
import { DileForm } from '@dile/ui/mixins/form';
import '@dile/ui/components/checkbox/checkbox.js';
import { initialized, signIn } from '../../redux/user-slice';
import { store } from '../../redux/store';
import { StateMixin } from '../../mixins/state-mixin';
import '@dile/ui/components/spinner/spinner.js';
import './ra-guest';

export class RaLogin extends StateMixin(DileForm(LitElement)) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  stateChanged(state) {
    if(state.user.loginValidationErrors) {
      this.clearErrors();
      this.showErrors(state.user.loginValidationErrors)
    } else {
      this.clearErrors();
    }
  }

  render() {
    return html`
      <ra-guest>
        ${this.loginFormTemplate}
      </ra-guest>
    `
  }

  get loginFormTemplate() {
    return html`
      <dile-card title="Inicio de sesión">
      <dile-input
        id="email"
        name="email"
        label="Email"
        value="m1@example.com"
      ></dile-input>
      <dile-password
        id="password"
        name="password"
        label="Clave"
        value="1234"
      ></dile-password>
      <p>
        <dile-button @click=${this.login}>Iniciar sesión</dile-button>
      </p>
    </dile-card>
    `
  }
    
  login() {
    const data = this.getData();
    store.dispatch(signIn(data));
  }
}
customElements.define('ra-login', RaLogin);
