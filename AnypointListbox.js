import { html, css, LitElement } from 'lit-element';
import { AnypointMenuMixin } from '@anypoint-web-components/anypoint-menu-mixin/anypoint-menu-mixin.js';

export class AnypointListbox extends AnypointMenuMixin(LitElement) {
  static get styles() {
    return css`
    :host {
      display: block;
      padding: var(--anypoint-listbox-padding, 0);
      background-color: var(--anypoint-listbox-background-color, var(--primary-background-color));
      color: var(--anypoint-listbox-color, var(--primary-text-color));
    }

    :host ::slotted(.selected) {
      font-weight: 700;
    }
    `;
  }

  render() {
    return html`<slot></slot>`;
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listbox');
    }
    /* istanbul ignore else */
    if (super.connectedCallback) {
      super.connectedCallback();
    }
  }
}
