import { LitElement, html, css } from 'lit';
import { DileForm } from '@dile/ui/mixins/form';
import '@dile/ui/components/checkbox/checkbox.js';
import { initialized, signIn } from '../../redux/user-slice';
import { store } from '../../redux/store';
import { StateMixin } from '../../mixins/state-mixin';
import '@dile/ui/components/spinner/spinner.js';

export class RaLogin extends StateMixin(DileForm(LitElement)) {
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
    if(state.user.loginValidationErrors) {
      this.clearErrors();
      this.showErrors(state.user.loginValidationErrors)
    } else {
      this.clearErrors();
    }
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
        ? html`<p>Ya estás logueado</p>`
        : this.loginFormTemplate
      }
    `
  }

  get loadingTemplate() {
    return html`<div class="loading"><dile-spinner active></dile-spinner></div>`
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
