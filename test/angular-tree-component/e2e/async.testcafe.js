import { Selector } from 'testcafe';
import { TreeDriver } from './helpers/tree.driver';

fixture `Async`
  .page `http://localhost:4200/#/async`
  .beforeEach( async t => {
    t.ctx.tree = new TreeDriver('tree-root');
    t.ctx.root2 = t.ctx.tree.getNode('root2');
  });

test('should show the tree', async t => {
  await t.expect(t.ctx.tree.isPresent()).ok();
});

test('should have 3 nodes', async t => {
  await t.expect(t.ctx.tree.getNodes().count).eql(3);
});

test('should not show loading before expanding', async t => {
  await t.expect(t.ctx.root2.getLoading().exists).notOk();
});

// TODO: find out why fails on saucelabs
test.skip('should show loading', async t => {
  await t.ctx.root2.clickExpander(t)
    .expect(t.ctx.root2.getLoading().exists).ok();
});

test('should show children and then loading disappears', async t => {
  await t.ctx.root2.clickExpander(t)
    .expect(t.ctx.root2.getNode('child1').isPresent()).ok()
    .expect(t.ctx.root2.getLoading().exists).notOk();
});

test('should show not show loading the second time we expand the node', async t => {
  await t.ctx.root2.clickExpander(t)
    .expect(t.ctx.root2.getNode('child1').isPresent()).ok();

  await t.ctx.root2.clickExpander(t);
  await t.ctx.root2.clickExpander(t)
    .expect(t.ctx.root2.getLoading().exists).notOk();
});
