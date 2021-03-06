import { fixture, assert, nextFrame } from '@open-wc/testing';
import * as sinon from 'sinon';
import '../anypoint-listbox.js';
import { ensureNodeId } from '../src/AnypointListbox.js';

/* eslint-disable no-plusplus */

/** @typedef {import('../index').AnypointListbox} AnypointListbox */

describe('AnypointListbox', () => {
  /**
   * @returns {Promise<AnypointListbox>}
   */
  async function basicFixture() {
    return fixture(`<anypoint-listbox aria-label="Select one of the options">
      <div role="option">Item 1</div>
      <div role="option">Item 2</div>
      <div role="option">Item 3</div>
      <div role="option">Item 4</div>
    </anypoint-listbox>`);
  }

  /**
   * @returns {Promise<AnypointListbox>}
   */
  async function selectedFixture() {
    return fixture(`<anypoint-listbox aria-label="Select one of the options" selected="1">
      <div role="option">Item 1</div>
      <div role="option">Item 2</div>
      <div role="option">Item 3</div>
      <div role="option">Item 4</div>
    </anypoint-listbox>`);
  }

  /**
   * @returns {Promise<AnypointListbox>}
   */
  async function roleFixture() {
    return fixture(`<anypoint-listbox role="menu"></anypoint-listbox>`);
  }

  /**
   * @returns {Promise<AnypointListbox>}
   */
  async function compatibilityFixture() {
    return fixture(`<anypoint-listbox compatibility>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
    </anypoint-listbox>`);
  }
  // This test to be run first as this element sets a global variable
  // (in scope of the element) and increases value each time this function is used.
  describe('ensureNodeId()', () => {
    it('adds id to a node if missing', () => {
      const node = document.createElement('span');
      ensureNodeId(node);
      assert.equal(node.id, 'anypointlistbox-1');
    });

    it('increments id counter', () => {
      const node = document.createElement('span');
      ensureNodeId(node);
      assert.equal(node.id, 'anypointlistbox-2');
    });

    it('respects existing id', () => {
      const node = document.createElement('span');
      node.id = 'my-id';
      ensureNodeId(node);
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

  describe('_initSelection()', () => {
    let element = /** @type AnypointListbox */ (null);
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('calls _setActiveDescendant() when has selection', () => {
      element.selected = 1;
      const spy = sinon.spy(element, '_setActiveDescendant');
      element._initSelection();
      const node = element.querySelectorAll('div')[1];
      assert.equal(spy.args[0][0], node);
    });

    it('ignores call to _setActiveDescendant() when no selection', () => {
      const spy = sinon.spy(element, '_setActiveDescendant');
      element._initSelection();
      assert.isFalse(spy.called);
    });
  });

  describe('_setActiveDescendant()', () => {
    let element = /** @type AnypointListbox */ (null);
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

  describe('compatibility state', () => {
    it('sets compatibility attribute on children', async () => {
      const element = await compatibilityFixture();
      const nodes = element.querySelectorAll('div');
      for (let i = 0; i < nodes.length; i++) {
        assert.isTrue(nodes[i].hasAttribute('compatibility'));
      }
    });

    it('removes compatibility attribute from the children', async () => {
      const element = await compatibilityFixture();
      element.compatibility = false;
      const nodes = element.querySelectorAll('div');
      for (let i = 0; i < nodes.length; i++) {
        assert.isFalse(nodes[i].hasAttribute('compatibility'));
      }
    });

    it('ignores adding compatibility on children at the init time', async () => {
      const element = await basicFixture();
      const nodes = element.querySelectorAll('div');
      for (let i = 0; i < nodes.length; i++) {
        assert.isFalse(nodes[i].hasAttribute('compatibility'));
      }
    });

    it('sets compatibility on item when setting legacy', async () => {
      const element = await basicFixture();
      element.legacy = true;
      assert.isTrue(element.legacy, 'legacy is set');
      assert.isTrue(element.compatibility, 'compatibility is set');
    });

    it('returns compatibility value from item when getting legacy', async () => {
      const element = await basicFixture();
      element.compatibility = true;
      assert.isTrue(element.legacy, 'legacy is set');
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
      assert.ok(des, 'aria-activedescendant is set');
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
      assert.ok(des, 'aria-activedescendant is set');
      assert.equal(des, node.id);
    });
  });
});
