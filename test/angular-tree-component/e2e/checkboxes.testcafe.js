import { Selector } from 'testcafe';
import { TreeDriver } from './helpers/tree.driver';

fixture `Checkboxes`
  .page `http://localhost:4200/#/checkboxes`

  .beforeEach( async t => {
    t.ctx.tree = new TreeDriver('#tree1');
    t.ctx.tree3 = new TreeDriver('#tree3');
    t.ctx.root1 = t.ctx.tree.getNode('root1');
    t.ctx.root2 = t.ctx.tree.getNode('root2');
    t.ctx.asyncroot = t.ctx.tree.getNode('asyncroot');
    t.ctx.asyncroot3 = t.ctx.tree3.getNode('asyncroot');
    await t.ctx.root2.clickExpander(t);
    t.ctx.child2 = t.ctx.tree.getNode('child2');
    await t.ctx.child2.clickExpander(t);
    t.ctx.grandchild2 = t.ctx.tree.getNode('grandchild2');

    t.ctx.root32 = t.ctx.tree3.getNode('root2');
    await t.ctx.root32.clickExpander(t);
    t.ctx.child32 = t.ctx.tree3.getNode('child2');
    await t.ctx.child32.clickExpander(t);
    t.ctx.grandchild32 = t.ctx.tree3.getNode('grandchild2');
  });

test('should show the tree', async t => {
  await t.expect(t.ctx.tree.isPresent()).ok();
});

test('should show checkboxes', async t => {
  await t.expect(t.ctx.root1.getCheckbox().exists).ok()
    .expect(t.ctx.child2.getCheckbox().exists).ok()
    .expect(t.ctx.grandchild2.getCheckbox().exists).ok();
});

test('should not be checked', async t => {
  await t.expect(t.ctx.root1.checked).notOk()
    .expect(t.ctx.child2.checked).notOk()
    .expect(t.ctx.grandchild2.checked).notOk();
});

test('should not be indeterminate', async t => {
  await t.expect(t.ctx.root1.isIndeterminate()).eql(false)
    .expect(t.ctx.child2.isIndeterminate()).eql(false)
    .expect(t.ctx.grandchild2.isIndeterminate()).eql(false);
});

test('should check leaf and make ancestors indeterminate', async t => {
  await t.ctx.grandchild2.clickCheckbox(t);
  await t.expect(t.ctx.root2.isChecked()).eql(true)
    .expect(t.ctx.child2.isChecked()).eql(true)
    .expect(t.ctx.grandchild2.isChecked()).eql(true)
    .expect(t.ctx.root2.isIndeterminate()).eql(true)
    .expect(t.ctx.child2.isIndeterminate()).eql(true)
    .expect(t.ctx.grandchild2.isIndeterminate()).eql(false);
});

test('should check all descendants when selecting root2', async t => {
  await t.ctx.root2.clickCheckbox(t);
  await t.expect(t.ctx.root2.isChecked()).eql(true)
    .expect(t.ctx.child2.isChecked()).eql(true)
    .expect(t.ctx.grandchild2.isChecked()).eql(true)
    .expect(t.ctx.root2.isIndeterminate()).eql(false)
    .expect(t.ctx.child2.isIndeterminate()).eql(false)
    .expect(t.ctx.grandchild2.isIndeterminate()).eql(false);
});

test('should make ancestor indeterminate when unchecking desendant', async t => {
  await t.ctx.root2.clickCheckbox(t);
  await t.ctx.grandchild2.clickCheckbox(t);
  await t.expect(t.ctx.root2.isChecked()).eql(true)
    .expect(t.ctx.child2.isChecked()).eql(true)
    .expect(t.ctx.grandchild2.isChecked()).notOk()
    .expect(t.ctx.root2.isIndeterminate()).eql(true)
    .expect(t.ctx.child2.isIndeterminate()).eql(true)
    .expect(t.ctx.grandchild2.isIndeterminate()).eql(false);
});

test('should disable tri-state if useTriState is false', async t => {
  await t.ctx.root32.clickCheckbox(t);
  await t.ctx.grandchild32.clickCheckbox(t);
  await t.expect(t.ctx.root32.isChecked()).eql(true)
    .expect(t.ctx.child32.isChecked()).notOk()
    .expect(t.ctx.grandchild32.isChecked()).eql(true)
    .expect(t.ctx.root32.isIndeterminate()).eql(false)
    .expect(t.ctx.child32.isIndeterminate()).eql(false)
    .expect(t.ctx.grandchild32.isIndeterminate()).eql(false);
});

test('should reflect selected parent state in async children', async t => {
  await t.ctx.asyncroot.clickCheckbox(t);
  await t.ctx.asyncroot.clickExpander(t)
    .expect(t.ctx.asyncroot.getNode('child1').isChecked()).eql(true);
});

test('should not select child of async root if it is not selected', async t => {
  await t.ctx.asyncroot.clickExpander(t)
    .expect(t.ctx.asyncroot.getNode('child1').isChecked()).eql(false);
});

test('should not select child of async root if it is not using triState', async t => {
  await t.ctx.asyncroot3.clickCheckbox(t);
  await t.ctx.asyncroot3.clickExpander(t)
    .expect(t.ctx.asyncroot3.getNode('child1').isChecked()).eql(false);
});