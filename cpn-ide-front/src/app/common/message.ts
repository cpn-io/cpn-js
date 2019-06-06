export class Message {
  public static PROJECT_LOAD = 'project.load';
  public static PAGE_OPEN = 'page.open';

  static SHAPE_SELECT = 'shape.select';
  static SHAPE_HOVER = 'shape.hover';
  static SHAPE_OUT = 'shape.out';

  static MODEL_UPDATE = 'model.update';
  static MODEL_CHANGED = 'model.changed';
  static MODEL_RELOAD = 'model.reload';
  static MODEL_SAVE_BACKUP = 'model.save.backup';

  static XML_UPDATE = 'xml.update';
  static PROPERTY_UPDATE = 'property.update';
  static DELETE_PAGE = 'delete.page;';
  static CHANGE_NAME_PAGE = 'change.name';
  static UPDATE_GLOBBOX = 'update.globbox';
  static UPDATE_TREE_PAGES = 'update.tree.pages';
  static SUBPAGE_CREATE = 'subpage.create';
  static SUBPAGE_TRANS_CREATE = 'subpage.trans.create';
  static OPEN_DECLARATION_BLOCK = 'open.declaration.block';
  static CHANGE_EXPLORER_TREE = 'change.explorer.tree';
  static SELECT_DECLARATION_NODE = 'select.declaration.node';
  static SELECT_TREE_NODE = 'select.tree.node';
  static DECLARATION_CHANGED = 'declaration.changed';

  static MODEL_EDITOR_FULLSCREEN = 'model.editor.fullscreen';

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
  static MODEL_STEP = 'model.step';
  static DELETE_TREE_NODE = 'model.tree.node';
  id: string;
  data: object;
}
