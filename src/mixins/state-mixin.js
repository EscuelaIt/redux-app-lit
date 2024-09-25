import { store } from '../redux/store';

export const StateMixin = (superclass) => class extends superclass {

  connectedCallback() {
    super.connectedCallback();
    this._storeUnsubscribe = store.subscribe(() => {
      const state = this.getState();
      this.stateChanged(state);
    });
    const state = this.getState();
    this.stateChanged(state);
  }

  disconnectedCallback() {
    this._storeUnsubscribe();
    super.disconnectedCallback();
  }

  stateChanged(state) {
    // sobreescribir...
  }

  getState() {
    return store.getState();
  }
}