export class Message {
  static PROJECT_LOAD = 'project.load';
  static PROJECT_SAVED = 'project.saved';

  static MODEL_CHANGED = 'model.changed';
  static MODEL_CHANGED_DETAILS = 'model.changed.details';
  static MODEL_RELOAD = 'model.reload';
  static MODEL_UPDATE_DIAGRAM = 'model.update.diagram';
  static MODEL_SAVE_BACKUP = 'model.save.backup';
  static MODEL_EDITOR_FULLSCREEN = 'model.editor.fullscreen';

  static SHAPE_SELECT = 'shape.select';
  static SHAPE_HOVER = 'shape.hover';
  static SHAPE_OUT = 'shape.out';
  static SHAPE_HIGHLIGHT = 'shape.highlight';
  static SHAPE_RUN_SCRIPT = 'shape.run.script';

  static PAGE_TAB_OPEN = 'page.tab.open';
  static PAGE_TAB_CLOSE = 'page.tab.close';
  static PAGE_CHANGE_NAME = 'page.change.name';
  static PAGE_CREATE_SUBST = 'page.create.subst';
  static PAGE_UPDATE_SUBST = 'page.update.subst';

  static TREE_UPDATE_PAGES = 'tree.update.pages';
  static TREE_OPEN_DECLARATION_NODE = 'tree.open.declaration.node';
  static TREE_SELECT_DECLARATION_NODE = 'tree.select.declaration.node';
  static TREE_SELECT_DECLARATION_NODE_NEW = 'tree.select.declaration.node.new';
  static TREE_SELECT_MONITOR = 'tree.select.monitor';

  static DECLARATION_CHANGED = 'declaration.changed';
  static SETTING_CHANGED = 'setting.changed';

  static SERVER_INIT_NET = 'server.init.net';
  static SERVER_INIT_NET_START = 'server.init.net.start';
  static SERVER_INIT_NET_DONE = 'server.init.net.done';
  static SERVER_INIT_NET_ERROR = 'server.init.net.error';

  static SERVER_INIT_SIM = 'server.init.sim';
  static SERVER_INIT_SIM_START = 'server.init.sim.start';
  static SERVER_INIT_SIM_DONE = 'server.init.sim.done';

  static SERVER_GET_BINDINGS = 'server.get.bindings';
  static SERVER_GET_SIM_STATE = 'server.get.sim.state';

  static SERVER_ERROR = 'server.error';

  static SIMULATION_STARTED = 'simulation.started';
  static SIMULATION_STOPED = 'simulation.stoped';
  static SIMULATION_SELECT_BINDING = 'simulation.select.binding';
  static SIMULATION_STEP_DONE = 'simulation.step.done';
  static SIMULATION_UPDATE_STATE = 'simulation.update.state';

  static MONITOR_OPEN = 'monitor.open';
  static MONITOR_CREATED = 'monitor.created';
  static MONITOR_CHANGED = 'monitor.changed';
  static MONITOR_DELETED = 'monitor.deleted';
  static MONITOR_SET_AVAILABLE_NODES = 'monitor.set.available.nodes';
  static MONITOR_CLICK_DELETE = 'monitor.click.delete';

  static MAIN_MENU_NEW_PROJECT = 'main.menu.new.project';
  static MAIN_MENU_OPEN_PROJECT = 'main.menu.open.project';
  static MAIN_MENU_SAVE_PROJECT = 'main.menu.save.project';

  id: string;
  data: object;
}
