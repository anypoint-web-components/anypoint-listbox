import { html } from 'lit-html';
import { ArcDemoPage } from '@advanced-rest-client/arc-demo-helper/ArcDemoPage.js';
import '@advanced-rest-client/arc-demo-helper/arc-demo-helper.js';
import '@anypoint-web-components/anypoint-item/anypoint-item.js';
import '../anypoint-listbox.js';

class ComponentDemo extends ArcDemoPage {
  constructor() {
    super();
    this._componentName = 'anypoint-listbox';
    this._mdHandler = this._mdHandler.bind(this);
    this.fruits = ['Apple', 'Apricot', 'Avocado',
      'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry',
      'Boysenberry', 'Cantaloupe', 'Currant', 'Cherry', 'Cherimoya',
      'Cloudberry', 'Coconut', 'Cranberry', 'Damson', 'Date', 'Dragonfruit',
      'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Goji berry', 'Gooseberry',
      'Grape', 'Grapefruit', 'Guava', 'Huckleberry', 'Jabuticaba', 'Jackfruit',
      'Jambul', 'Jujube', 'Juniper berry', 'Kiwi fruit', 'Kumquat', 'Lemon',
      'Lime', 'Loquat', 'Lychee', 'Mango', 'Marion berry', 'Melon', 'Miracle fruit',
      'Mulberry', 'Nectarine', 'Olive', 'Orange'
    ];
  }

  _mdHandler(e) {
    if (e.target.checked) {
      document.body.classList.add('material');
    } else {
      document.body.classList.remove('material');
    }
  }


  _headerControlsTemplate() {
    return html`<div class="settings-action-item">
      <paper-toggle-button @checked-changed="${this._darkThemeHandler}">Toggle dark theme</paper-toggle-button>
    </div>
    <div class="settings-action-item">
      <paper-toggle-button @checked-changed="${this._mdHandler}">Toggle material design</paper-toggle-button>
    </div>
    <div class="settings-action-item">
      <paper-toggle-button @checked-changed="${this._narrowHandler}">Toggle narrow attribute</paper-toggle-button>
    </div>
    <div class="settings-action-item">
      <paper-toggle-button checked @checked-changed="${this._stylesHandler}">Toggle styles</paper-toggle-button>
    </div>`;
  }

  contentTemplate() {
    return html`
      <div class="card">
        <h2>Default state</h2>
        <arc-demo-helper>
          <template>
            <anypoint-listbox>
              <anypoint-item>API project 1</anypoint-item>
              <anypoint-item>API project 2</anypoint-item>
              <anypoint-item>API project 3</anypoint-item>
              <anypoint-item>API project 4</anypoint-item>
            </anypoint-listbox>
          </template>
        </arc-demo-helper>
      </div>

      <div class="card">
        <h2>Select item with <code>selected</code> property</h2>
        <arc-demo-helper>
          <template>
            <anypoint-listbox selected="1">
              <anypoint-item>API project 1</anypoint-item>
              <anypoint-item>API project 2</anypoint-item>
              <anypoint-item>API project 3</anypoint-item>
              <anypoint-item>API project 4</anypoint-item>
            </anypoint-listbox>
          </template>
        </arc-demo-helper>
      </div>

      <div class="card">
        <h2>Select multiple items with <code>multi</code> property</h2>
        <arc-demo-helper>
          <template>
            <anypoint-listbox multi>
              <anypoint-item>API project 1</anypoint-item>
              <anypoint-item>API project 2</anypoint-item>
              <anypoint-item>API project 3</anypoint-item>
              <anypoint-item>API project 4</anypoint-item>
            </anypoint-listbox>
          </template>
        </arc-demo-helper>
      </div>

      <div class="card">
        <h2>Use <code>selectable</code> to specify which elements can be selected</h2>
        <arc-demo-helper>
          <template>
            <anypoint-listbox selectable=".allowed">
              <anypoint-item class="allowed">API project 1</anypoint-item>
              <anypoint-item class="allowed">API project 2</anypoint-item>
              <hr>
              <anypoint-item class="allowed">API project 3</anypoint-item>
              <anypoint-item class="allowed">API project 4</anypoint-item>
            </anypoint-listbox>
          </template>
        </arc-demo-helper>
      </div>

      <div class="card">
        <h2>
          Use <code>attrforselected</code> to select items by attribute value, rather than index.
        </h2>
        <arc-demo-helper>
          <template>
            <anypoint-listbox attrforselected="data-project-id" selected="p2">
              <anypoint-item data-project-id="p1">API project 1</anypoint-item>
              <anypoint-item data-project-id="p2">API project 2</anypoint-item>
              <anypoint-item data-project-id="p3">API project 3</anypoint-item>
              <anypoint-item data-project-id="p4">API project 4</anypoint-item>
            </anypoint-listbox>
          </template>
        </arc-demo-helper>
      </div>

      <div class="card">
        <h3>Auto focuses while typeing a name</h3>
        <anypoint-listbox class="scrolled">
          ${this.fruits.map((item) => html`<anypoint-item role="option">${item}</anypoint-item>`)}
        </anypoint-listbox>
      </div>
    `;
  }
}
const instance = new ComponentDemo();
instance.render();
window.demo = instance;
