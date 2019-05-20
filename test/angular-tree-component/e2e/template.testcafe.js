import { Selector } from 'testcafe';
import { TreeDriver } from './helpers/tree.driver';

['#tree1', '#tree2', '#tree3'].forEach((treeId) => {
  fixture `Templates ${treeId}`
    .page `http://localhost:4200/#/templates`
    .beforeEach( async t => {
      t.ctx.tree = new TreeDriver('#tree1');
      t.ctx.tree = new TreeDriver(treeId);
    });

  test('should show the tree', async t => {
    await t.expect(t.ctx.tree.isPresent()).ok();
  });

  test('should have 2 nodes', async t => {
    await t.expect(t.ctx.tree.getNodes().count).eql(2);
  });

  test('should use the template and pass it a node var', async t => {
    const root1Title = t.ctx.tree.selector.find('.root1Class').withText('root1');

    await t.expect(root1Title.exists).ok();
  });

  test('should use the template and pass it an index var', async t => {
    const root1Index = t.ctx.tree.selector.find('.root1ClassIndex').withText('0');

    await t.expect(root1Index.exists).ok();
  });
});
fixture `Templates loading component`
  .page `http://localhost:4200/#/templates`
  .beforeEach(async t => {
    t.ctx.tree = new TreeDriver('#tree1');
    t.ctx.root2 = t.ctx.tree.getNodeByIndex(1);
  });

test('should show the loading template', async t => {
  await t.ctx.root2.clickExpander(t);
  const loadingComponent = t.ctx.tree.selector.find('.root2ClassLoading').withText('Loading root2...');

  await t.expect(loadingComponent.exists).ok();
});
