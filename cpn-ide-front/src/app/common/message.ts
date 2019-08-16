export class Message {
  static PROJECT_LOAD = 'project.load';

  static MODEL_CHANGED = 'model.changed';
  static MODEL_CHANGED_DETAILS = 'model.changed.details';
  static MODEL_RELOAD = 'model.reload';
  static MODEL_UPDATE_DIAGRAM = 'model.update.diagram';
  static MODEL_SAVE_BACKUP = 'model.save.backup';
  static MODEL_EDITOR_FULLSCREEN = 'model.editor.fullscreen';

  static SHAPE_SELECT = 'shape.select';
  static SHAPE_HOVER = 'shape.hover';
  static SHAPE_OUT = 'shape.out';

  static PAGE_OPEN = 'page.open';
  static PAGE_DELETE = 'page.delete';
  static PAGE_CHANGE_NAME = 'page.change.name';
  static PAGE_CREATE_SUBST = 'page.create.subst';
  static PAGE_UPDATE_SUBST = 'page.update.subst';

  static MONITOR_OPEN = 'monitor.open';

  static TREE_UPDATE_PAGES = 'tree.update.pages';
  static TREE_OPEN_DECLARATION_NODE = 'tree.open.declaration.node';
  static TREE_SELECT_DECLARATION_NODE = 'tree.select.declaration.node';

  static DECLARATION_CHANGED = 'declaration.changed';

  static SERVER_INIT_NET = 'server.init.net';
  static SERVER_INIT_NET_START = 'server.init.net.start';
  static SERVER_INIT_NET_DONE = 'server.init.net.done';
  static SERVER_INIT_NET_ERROR = 'server.init.net.error';

  static SERVER_INIT_SIM = 'server.init.sim';
  static SERVER_INIT_SIM_START = 'server.init.sim.start';
  static SERVER_INIT_SIM_DONE = 'server.init.sim.done';
  static SERVER_INIT_SIM_ERROR = 'server.init.sim.error';

  static SERVER_GET_TOKEN_MARKS = 'server.get.token.mark';
  static SERVER_GET_TRANSITIONS = 'server.get.transitions';
  static SERVER_GET_BINDINGS = 'server.get.bindings';
  static SERVER_GET_SIM_STATE = 'server.get.sim.state';

  static SIMULATION_STARTED = 'simulation.started';
  static SIMULATION_STOPED = 'simulation.stoped';
  static SIMULATION_SELECT_BINDING = 'simulation.select.binding';
  static SIMULATION_UPDATE_STATE = 'simulation.update.state';

  id: string;
  data: object;
}
