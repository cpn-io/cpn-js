import { Selector } from 'testcafe';
import { TreeDriver } from './helpers/tree.driver';

const testEmptyTree = (treeId) => {
  fixture `Empty`
    .page `http://localhost:4200/#/empty`
    .beforeEach( async t => {
      t.ctx.tree = new TreeDriver(treeId);
    });

  test('should show the tree', async t => {
    await t.expect(t.ctx.tree.isPresent()).ok();
  });

  test('should have 0 nodes', async t => {
    await t.expect(t.ctx.tree.getNodes().count).eql(0);
  });

  test('should load nodes into the tree', async t => {
    await t.click(Selector('button'));
    await t.expect(t.ctx.tree.getNodes().count).eql(1);
  });
};

testEmptyTree('#tree1');
testEmptyTree('#tree2');
