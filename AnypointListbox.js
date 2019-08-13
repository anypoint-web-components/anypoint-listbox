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

  static get properties() {
    return {
      /**
       * Enables Anypoint legacy theme.
       */
      legacy: { type: Boolean, reflect: true }
    };
  }

  get legacy() {
    return this._legacy;
  }

  set legacy(value) {
    const old = this._legacy;
    if (old === value) {
      return;
    }
    this._legacy = value;
    this._updateChildrenLegacy(value);
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

  firstUpdated() {
    const { legacy } = this;
    if (legacy) {
      this._updateChildrenLegacy(legacy);
    }
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
  /**
   * Updates `legacy` state on children.
   * This is a convinience method to set `legacy` property on this element
   * and propagate it on children instead of setting this property on each
   * item separately.
   * @param {Boolean} legacy Current state of `legacy` property
   */
  _updateChildrenLegacy(legacy) {
    const slot = this.shadowRoot.querySelector('slot');
    if (!slot) {
      return;
    }
    const nodes = slot.assignedNodes();
    for (let i = 0, len = nodes.length; i < len; i++) {
      const node = nodes[i];
      if (node.nodeType !== Node.ELEMENT_NODE) {
        continue;
      }
      if (legacy) {
        node.setAttribute('legacy', '');
      } else {
        node.removeAttribute('legacy', '');
      }
    }
  }
}
