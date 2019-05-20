const { browser, element, by, $ } = require('protractor');
const { TreeDriver } = require('./helpers/tree.driver');

fixture `Drag and Drop`
  .page `http://localhost:4200/#/drag`
  .beforeEach( async t => {    
    t.ctx.tree = new TreeDriver('tree-root');
    t.ctx.root1 = t.ctx.tree.getNode('root1');
    t.ctx.child1 = t.ctx.root1.getNode('child1');
    t.ctx.root2 = t.ctx.tree.getNode('root2');
    t.ctx.child21 = t.ctx.root2.getNode('child2.1');
  });

test('should show the tree', async t => {
  await t.expect(t.ctx.tree.isPresent()).ok();
});

test('should have expected children', async t => {
  await t.expect(t.ctx.root1.getNodes().count).eql(2)
    .expect(t.ctx.root2.getNodes().count).eql(2)
    .expect(t.ctx.child21.getNodes().count).eql(0);
});

test('should allow to drag leaf', async t => {
  await t.ctx.child1.dragToNode(t, t.ctx.child21);
  await t.ctx.child21.clickExpander(t)
    .expect(t.ctx.root1.getNodes().count).eql(1)
    .expect(t.ctx.child21.getNodes().count).eql(1);
});

// TODO: find out why fails on saucelabs
test.skip('should allow to drag to drop slot', async t => {
  await t.ctx.child1.dragToDropSlot(t, t.ctx.child21)
    .expect(t.ctx.root1.getNodes().count).eql(1)
    .expect(t.ctx.root2.getNodes().count).eql(3);
});
