import { fixture, assert, nextFrame } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../anypoint-listbox.js';

describe('AnypointListbox', () => {
  async function basicFixture() {
    return await fixture(`<anypoint-listbox aria-label="Select one of the options">
      <div role="option">Item 1</div>
      <div role="option">Item 2</div>
      <div role="option">Item 3</div>
      <div role="option">Item 4</div>
    </anypoint-listbox>`);
  }

  async function selectedFixture() {
    return await fixture(`<anypoint-listbox aria-label="Select one of the options" selected="1">
      <div role="option">Item 1</div>
      <div role="option">Item 2</div>
      <div role="option">Item 3</div>
      <div role="option">Item 4</div>
    </anypoint-listbox>`);
  }

  async function roleFixture() {
    return await fixture(`<anypoint-listbox role="menu"></anypoint-listbox>`);
  }

  async function legacyFixture() {
    return await fixture(`<anypoint-listbox legacy>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
    </anypoint-listbox>`);
  }
  // This test to be run first as this element sets a global variable
  // (in scope of the element) and increases value each time this function is used.
  describe('_ensureNodeId()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('adds id to a node if missing', () => {
      const node = document.createElement('span');
      element._ensureNodeId(node);
      assert.equal(node.id, 'anypointlistbox-1');
    });

    it('increments id counter', () => {
      const node = document.createElement('span');
      element._ensureNodeId(node);
      assert.equal(node.id, 'anypointlistbox-2');
    });

    it('respects existing id', () => {
      const node = document.createElement('span');
      node.id = 'my-id';
      element._ensureNodeId(node);
      assert.equal(node.id, 'my-id');
    });
  });

  describe('Basics', () => {
    it('has selection class name when selected', async () => {
      const element = await basicFixture();
      element.select(1);
      const node = element.selectedItem;
      assert.ok(node, 'has selected node');
      assert.isTrue(node.classList.contains('selected'), 'has selected class');
    });

    it('has default aria-activedescendant', async () => {
      const element = await basicFixture();
      assert.equal(element.getAttribute('aria-activedescendant'), '');
    });
  });

  describe('_initSeelction()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('calls _setActiveDescendant() when has selection', () => {
      element.selected = 1;
      const spy = sinon.spy(element, '_setActiveDescendant');
      element._initSeelction();
      const node = element.querySelectorAll('div')[1];
      assert.equal(spy.args[0][0], node);
    });

    it('ignores call to _setActiveDescendant() when no selection', () => {
      const spy = sinon.spy(element, '_setActiveDescendant');
      element._initSeelction();
      assert.isFalse(spy.called);
    });
  });

  describe('_setActiveDescendant()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('sets id on passed node', () => {
      const node = document.createElement('span');
      element._setActiveDescendant(node);
      assert.include(node.id, 'anypointlistbox-');
    });

    it('sets aria-activedescendant to nodes id', () => {
      const node = document.createElement('span');
      node.id = 'test';
      element._setActiveDescendant(node);
      assert.equal(element.getAttribute('aria-activedescendant'), 'test');
    });
  });

  describe('legacy state', () => {
    it('sets legacy attribute on children', async () => {
      const element = await legacyFixture();
      const nodes = element.querySelectorAll('div');
      for (let i = 0; i < nodes.length; i++) {
        assert.isTrue(nodes[i].hasAttribute('legacy'));
      }
    });

    it('removes legacy attribute from the children', async () => {
      const element = await legacyFixture();
      element.legacy = false;
      const nodes = element.querySelectorAll('div');
      for (let i = 0; i < nodes.length; i++) {
        assert.isFalse(nodes[i].hasAttribute('legacy'));
      }
    });

    it('ignores adding legacy on children at the init time', async () => {
      const element = await basicFixture();
      const nodes = element.querySelectorAll('div');
      for (let i = 0; i < nodes.length; i++) {
        assert.isFalse(nodes[i].hasAttribute('legacy'));
      }
    });
  });

  describe('a11y', () => {
    it('has default role', async () => {
      const element = await basicFixture();
      assert.equal(element.getAttribute('role'), 'listbox');
    });

    it('respects existing role', async () => {
      const element = await roleFixture();
      assert.equal(element.getAttribute('role'), 'menu');
    });

    it('is accessible when default state', async () => {
      const element = await basicFixture();
      await assert.isAccessible(element);
    });

    it('is accessible when selected', async () => {
      const element = await basicFixture();
      element.select(1);
      await nextFrame();
      await assert.isAccessible(element);
    });

    it('is accessible when pre selected', async () => {
      const element = await selectedFixture();
      await assert.isAccessible(element);
    });

    it('sets aria-activedescendant when selecting an item', async () => {
      const element = await basicFixture();
      element.select(2);
      const node = element.selectedItem;
      const des = element.getAttribute('aria-activedescendant');
      assert.notEmpty(des, 'aria-activedescendant is set');
      assert.equal(des, node.id);
    });

    it('removes aria-activedescendant when nothing selected', async () => {
      const element = await basicFixture();
      element.select(2);
      await nextFrame();
      element.selected = -1;
      const des = element.getAttribute('aria-activedescendant');
      assert.equal(des, '');
    });

    it('has aria-activedescendant when pre selected', async () => {
      const element = await selectedFixture();
      const node = element.selectedItem;
      const des = element.getAttribute('aria-activedescendant');
      assert.notEmpty(des, 'aria-activedescendant is set');
      assert.equal(des, node.id);
    });
  });
});
