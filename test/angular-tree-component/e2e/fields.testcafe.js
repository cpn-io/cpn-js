import { Selector } from 'testcafe';
import { TreeDriver } from './helpers/tree.driver';

fixture `Fields`
  .page `http://localhost:4200/#/fields`
  .beforeEach( async t => {
    t.ctx.tree = new TreeDriver('#tree1');
  });


test('should show the tree', async t => {
  await t.expect(t.ctx.tree.isPresent()).ok();
});

test('should have 2 nodes', async t => {
  await t.expect(t.ctx.tree.getNodes().count).eql(2);
});

test('should display the custom display field', async t => {
  const root1 = t.ctx.tree.getNode('root1');

  await t.expect(root1.isPresent()).ok();
});

test('should use the nodeClass option', async t => {
  const root1Title = t.ctx.tree.selector.find('.root1Class').withText('root1');

  await t.expect(root1Title.exists).ok();
});
