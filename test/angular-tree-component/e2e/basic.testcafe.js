import { Selector } from 'testcafe';
import { TreeDriver } from './helpers/tree.driver';

fixture `Basic`
  .page `http://localhost:4200/#/basic`
  .beforeEach( async t => {
    t.ctx.tree = new TreeDriver('tree-root');
    t.ctx.root1 = t.ctx.tree.getNode('root1');
    t.ctx.root2 = t.ctx.tree.getNode('root2');
    t.ctx.root3 = t.ctx.tree.getNode('root3');
    t.ctx.root4 = t.ctx.tree.getNode('root4');
    t.ctx.root5 = t.ctx.tree.getNode('root5');
  });

test('should show the tree', async t => {
  await t.expect(t.ctx.tree.isPresent()).eql(true);
});

test('should have 5 nodes', async t => {
  await t.expect(t.ctx.tree.getNodes().count).eql(5);
});

test('should have a node named root1', async t => {
  await t.expect(t.ctx.root1.isPresent()).eql(true);
});

test('roots with children should have an expander icon', async t => {
  await t.expect(t.ctx.root1.getExpander().exists).eql(true)
    .expect(t.ctx.root2.getExpander().exists).eql(true);
});

test('roots with children should not have an expander icon', async t => {
  await t.expect(t.ctx.root3.getExpander().exists).eql(false)
    .expect(t.ctx.root4.getExpander().exists).eql(false)
    .expect(t.ctx.root5.getExpander().exists).eql(false);
});

test('roots with children should start collapsed', async t => {
  await t.expect(t.ctx.root1.getChildren().exists).eql(false)
    .expect(t.ctx.root1.isExpanded()).eql(false);
});

test('should expand & collapse children on click expander', async t => {
  await t.ctx.root1.clickExpander(t);
  await t.expect(t.ctx.root1.getChildren().exists).eql(true)
    .expect(t.ctx.root1.isExpanded()).eql(true);
  await t.ctx.root1.clickExpander(t);
  await t.expect(t.ctx.root1.getChildren().exists).eql(false)
    .expect(t.ctx.root1.isExpanded()).eql(false);
});

test('should start inactive', async t => {
  await t.expect(t.ctx.root1.isActive()).eql(false);
});

test('should activate & deactivate nodes on click', async t => {
  await t.ctx.root1.click(t);
  await t.expect(t.ctx.root1.isActive()).eql(true)
    .expect(t.ctx.root2.isActive()).eql(false);
  await t.ctx.root2.click(t);
  await t.expect(t.ctx.root1.isActive()).eql(false)
    .expect(t.ctx.root2.isActive()).eql(true);
});

test('should start without focus', async t => {
  await t.expect(t.ctx.root1.isFocused()).eql(false);
});

test('should focus on a node on click', async t => {
  await t.ctx.root1.click(t);
  await t.expect(t.ctx.root1.isFocused()).eql(true)
    .expect(t.ctx.root2.isFocused()).eql(false);
  await t.ctx.root2.click(t);
  await t.expect(t.ctx.root1.isFocused()).eql(false)
    .expect(t.ctx.root2.isFocused()).eql(true);
});

test('should navigate with keys', async t => {
  await t.ctx.tree.keyDown(t);
  await t.expect(t.ctx.root1.isFocused()).eql(true);
  await t.ctx.tree.keyRight(t);
  await t.expect(t.ctx.root1.isExpanded()).eql(true);
  await t.ctx.tree.keyRight(t);

  const child1 = t.ctx.tree.getNode('child1');
  const child2 = t.ctx.tree.getNode('child2');

  await t.expect(child1.isFocused()).eql(true);
  await t.ctx.tree.keyRight(t);
  await t.expect(child1.isFocused()).eql(true);
  await t.ctx.tree.keyDown(t);
  await t.ctx.tree.keyDown(t);
  await t.expect(t.ctx.root2.isFocused()).eql(true);
  await t.ctx.tree.keyUp(t);
  await t.expect(child2.isFocused()).eql(true);
  await t.ctx.tree.keyLeft(t);
  await t.expect(t.ctx.root1.isFocused()).eql(true);
  await t.ctx.tree.keyLeft(t);
  await t.expect(t.ctx.root1.isExpanded()).eql(false);
  await t.ctx.tree.keyDown(t);
  await t.expect(t.ctx.root2.isFocused()).eql(true);
  await t.ctx.tree.keyUp(t);
  await t.expect(t.ctx.root1.isFocused()).eql(true);
});

test('should toggle active on space', async t => {
  await t.expect(t.ctx.root1.isActive()).eql(false);
  await t.ctx.tree.keyDown(t);
  await t.ctx.tree.keySpace(t);
  await t.expect(t.ctx.root1.isActive()).eql(true);
  await t.ctx.tree.keyDown(t);
  await t.ctx.tree.keySpace(t);
  await t.expect(t.ctx.root2.isActive()).eql(true);
  await t.ctx.tree.keySpace(t);
  await t.expect(t.ctx.root2.isActive()).eql(false);
});

test('should toggle active on enter', async t => {
  await t.expect(t.ctx.root1.isActive()).eql(false);
  await t.ctx.tree.keyDown(t);
  await t.ctx.tree.keyEnter(t);
  await t.expect(t.ctx.root1.isActive()).eql(true);
  await t.ctx.tree.keyDown(t);
  await t.ctx.tree.keyEnter(t);
  await t.expect(t.ctx.root2.isActive()).eql(true);
  await t.ctx.tree.keyEnter(t);
  await t.expect(t.ctx.root2.isActive()).eql(false);
});

test('should not show checkboxes', async t => {
  await t.expect(t.ctx.root1.getCheckbox().exists).eql(false);
});

