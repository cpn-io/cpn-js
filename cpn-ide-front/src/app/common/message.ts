export class Message {
  public static PROJECT_FILE_OPEN = 'project.file.open';
  public static PROJECT_LOAD = 'project.load';
  public static PAGE_OPEN = 'page.open';

  static SHAPE_SELECT = 'shape.select';
  static SHAPE_HOVER = 'shape.hover';
  static SHAPE_OUT = 'shape.out';

  static SML_VERIFY = 'sml.verify';
  static SML_TO_EDITOR = 'sml.to.editor';
  static MODEL_UPDATE = 'model.update';
  static XML_UPDATE = 'xml.update';
  static PROPERTY_UPDATE = 'property.update';
  static DELETE_PAGE = 'delete.page;';
  static CHANGE_NAME_PAGE = 'change.name';
  static UPDATE_GLOBBOX = 'update.globbox';
  static MODEL_ERROR = 'model.error';
  static UPDATE_TREE = 'update.tree';
  static UPDATE_TREE_PAGES = 'update.tree.pages';
  static SUBPAGE_CREATE = 'subpage.create';
  static OPEN_DECLARATION_BLOCK = 'open.declaration.block';
  static CHANGE_EXPLORER_TREE = 'change.explorer.tree';
  static SELECT_TREE_NODE = 'select.tree.node';

  static MODEL_EDITOR_FULLSCREEN = 'model.editor.fullscreen';

  static SERVER_INIT_NET_START = 'server.init.net.start';
  static SERVER_INIT_NET_DONE = 'server.init.net.done';
  static SERVER_INIT_NET_ERROR = 'server.init.net.error';

  static SERVER_INIT_SIM_START = 'server.init.sim.start';
  static SERVER_INIT_SIM_DONE = 'server.init.sim.done';
  static SERVER_INIT_SIM_ERROR = 'server.init.sim.error';

  static SERVER_GET_TOKEN_MARKS = 'server.get.token.mark';
  static SERVER_GET_TRANSITIONS = 'server.get.transitions';

  id: string;
  data: object;
}
