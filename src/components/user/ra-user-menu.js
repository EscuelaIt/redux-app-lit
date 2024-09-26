import { LitElement, html, css } from 'lit';
import { StateMixin } from '../../mixins/state-mixin';
import { store } from '../../redux/store';
import { logout } from '../../redux/user-slice';

export class RaUserMenu extends StateMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
      a {
        text-decoration: none;
        color: inherit;
      }
    `
  ];

  static get properties() {
    return {
      loggedIn: { type: Boolean }
    };
  }

  stateChanged(state) {
    this.loggedIn = state.user.loggedIn;
  }

  render() {
    return html`
      ${this.loggedIn
        ? this.loggedInTemplate
        : ''
      }
    `;
  }

  get loggedInTemplate() {
    return html`
      <a href="#" @click=${this.logout}>logout</a>
    `
  }

  logout(e) {
    e.preventDefault();
    store.dispatch(logout());
  }
}
customElements.define('ra-user-menu', RaUserMenu);
