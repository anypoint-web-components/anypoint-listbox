import { fixture, assert, nextFrame } from '@open-wc/testing';

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

  async function roleFixture() {
    return await fixture(`<anypoint-listbox role="menu"></anypoint-listbox>`);
  }

  it('has selection class name when selected', async () => {
    const element = await basicFixture();
    element.select(1);
    const node = element.selectedItem;
    assert.ok(node, 'has selected node');
    assert.isTrue(node.classList.contains('selected'), 'has selected class');
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
  });
});
