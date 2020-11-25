import { LitElement, CSSResult, TemplateResult } from 'lit-element';
import { MenuMixin } from '@anypoint-web-components/anypoint-menu-mixin';
import { MultiSelectableMixin } from '@anypoint-web-components/anypoint-selector/src/MultiSelectableMixin';
import { SelectableMixin } from '@anypoint-web-components/anypoint-selector/src/SelectableMixin';
/**
 * Ensures the node to have an ID.
 * It is later used with aria attributes.
 */
export declare function ensureNodeId(node: HTMLElement): void;

export declare class AnypointListbox extends MenuMixin(SelectableMixin(MultiSelectableMixin(LitElement))) {
  styles: CSSResult;
  /**
   * Enables compatibility with Anypoint components.
   * @attribute
   */
  compatibility: boolean;
  /**
   * Enables compatibility with Anypoint components.
   * @deprecated Use `compatibility` instead.
   */
  legacy: boolean;
  render(): TemplateResult;
  constructor();
  connectedCallback(): void;
  disconnectedCallback(): void;
  firstUpdated(): void;
  _initSelection(): void;
  _selectHandler(e: CustomEvent): void;
  _setActiveDescendant(node: HTMLElement): void;
  _deselectHandler(): void;
  _updateChildrenCompatibility(compatibility: boolean): void;
}

// export interface AnypointListbox extends MenuMixin, SelectableMixin, MultiSelectableMixin, LitElement {
//   onselect: EventListener;
// }
