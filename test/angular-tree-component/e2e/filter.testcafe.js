import { Selector } from 'testcafe';
import { TreeDriver } from './helpers/tree.driver';

fixture `Filter`
  .page `http://localhost:4200/#/filter`
  .beforeEach(async t => {
    t.ctx.tree = new TreeDriver('tree-root');
  });    

test('should show the tree', async t => {
  await t.expect(t.ctx.tree.isPresent()).ok();
});
test('should have 3 nodes', async t => {
  await t.expect(t.ctx.tree.getNodes().count).eql(3)
    .expect(t.ctx.tree.getNode('Europe').isPresent()).ok();
});
test('should filter root nodes', async t => {
  await t.typeText(Selector('#filter'), 'ameri');
  await t.expect(t.ctx.tree.getNodes().count).eql(2)
    .expect(t.ctx.tree.getNode('Europe').isPresent()).notOk();
});
test('should ensure all filtered nodes are visible', async t => {
  await t.typeText(Selector('#filter'), 'e');
  await t.expect(t.ctx.tree.getNodes().count).eql(9);
});
test('should not ensure all filtered nodes are visible', async t => {
  await t.typeText(Selector('#filter2'), 'e');
  await t.expect(t.ctx.tree.getNodes().count).eql(3);
});

fixture `Filter child nodes`
  .page `http://localhost:4200/#/filter`
  .beforeEach(async t => {
    await t.typeText(Selector('#filter'), 'new');
    t.ctx.tree = new TreeDriver('tree-root');
    t.ctx.usa = t.ctx.tree.getNode('North America').getNode('United States');
  });
test('should show parent of visible child', async t => {
  await t.expect(t.ctx.usa.isPresent()).ok();
});
test('should only show child matching filter', async t => {
  await t.expect(t.ctx.usa.getNodes().count).eql(1)
    .expect(t.ctx.usa.getNode('New York').isPresent()).ok()
    .expect(t.ctx.usa.getNode('California').isPresent()).notOk();
});

fixture `Clear Filter`
  .page `http://localhost:4200/#/filter`
  .beforeEach(async t => {
    t.ctx.tree = new TreeDriver('tree-root');
    await t.typeText(Selector('#filter'), 'awefawef');
  });
test('should clear filter', async t => {
  await t.expect(t.ctx.tree.getNodes().count).eql(0)
    .click(Selector('button'))
    .expect(t.ctx.tree.getNodes().count).eql(15);
});

fixture `Filter by function`
  .page `http://localhost:4200/#/filter`
  .beforeEach(async t => {
    await t.typeText(Selector('#filter3'), 'nyok');
    t.ctx.tree = new TreeDriver('tree-root');
    t.ctx.usa = t.ctx.tree.getNode('North America').getNode('United States');
  });
test('should show parent of visible child', async t => {
  await t.expect(t.ctx.usa.isPresent()).ok();
});
test('should only show child matching filter', async t => {
  await t.expect(t.ctx.usa.getNodes().count).eql(1)
    .expect(t.ctx.usa.getNode('New York').isPresent()).ok()
    .expect(t.ctx.usa.getNode('California').isPresent()).notOk();
});
