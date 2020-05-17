import { LitElement, CSSResult, TemplateResult } from 'lit-element';
import { MenuMixin } from '@anypoint-web-components/anypoint-menu-mixin';

/**
 * Ensures the node to have an ID.
 * It is later used with aria attributes.
 */
export declare function ensureNodeId(node: HTMLElement): void;

export declare class AnypointListbox {
  styles: CSSResult;
  /**
   * Enables compatibility with Anypoint components.
   */
  compatibility: boolean;
  render(): TemplateResult;
  constructor();
  connectedCallback(): void;
  disconnectedCallback(): void;
  firstUpdated(): void;
  _initSeelction(): void;
  _selectHandler(e: CustomEvent): void;
  _setActiveDescendant(node: HTMLElement): void;
  _deselectHandler(): void;
  _updateChildrenCompatibility(compatibility: boolean): void;
}

export interface AnypointListbox extends MenuMixin, LitElement {

}
