import { html, css, LitElement } from 'lit-element';
import { AnypointMenuMixin } from '@anypoint-web-components/anypoint-menu-mixin/anypoint-menu-mixin.js';

let globalId = 1;

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

  constructor() {
    super();
    this.useAriaSelected = true;
    this._selectHandler = this._selectHandler.bind(this);
    this._deselectHandler = this._deselectHandler.bind(this);
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listbox');
    }
    this.setAttribute('aria-activedescendant', '');
    /* istanbul ignore else */
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    this.addEventListener('select', this._selectHandler);
    this.addEventListener('deselect', this._deselectHandler);

    this._initSeelction();
  }

  disconnectedCallback() {
    /* istanbul ignore else */
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
    this.removeEventListener('select', this._selectHandler);
    this.removeEventListener('deselect', this._deselectHandler);
  }
  /**
   * Initializes `aria-activedescendant` when element is attached to the DOM.
   */
  _initSeelction() {
    if (this.selectedItem) {
      this._setActiveDescendant(this.selectedItem);
    }
  }
  /**
   * Sets `aria-activedescendant` value to selected element's id.
   * @param {CustomEvent} e
   */
  _selectHandler(e) {
    const { item } = e.detail;
    this._setActiveDescendant(item);
  }
  /**
   * Sets `aria-activedescendant` value to node's id.
   * @param {Element} node
   */
  _setActiveDescendant(node) {
    this._ensureNodeId(node);
    this.setAttribute('aria-activedescendant', node.id);
  }
  /**
   * Removes `aria-activedescendant` from the element when item is
   * deselected.
   */
  _deselectHandler() {
    this.setAttribute('aria-activedescendant', '');
  }
  /**
   * Ensures the node to have an ID.
   * It is later used with aria attributes.
   * @param {Element} node
   */
  _ensureNodeId(node) {
    if (!node.id) {
      node.id = 'anypointlistbox-' + globalId;
      globalId++;
    }
  }
}
