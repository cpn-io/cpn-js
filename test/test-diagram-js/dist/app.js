(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ExampleContextPadProvider;
/**
 * A example context pad provider.
 */
function ExampleContextPadProvider(connect, contextPad, modeling) {
  this._connect = connect;
  this._modeling = modeling;

  contextPad.registerProvider(this);
}

ExampleContextPadProvider.$inject = ['connect', 'contextPad', 'modeling'];

ExampleContextPadProvider.prototype.getContextPadEntries = function (element) {
  var connect = this._connect,
      modeling = this._modeling;

  function removeElement() {
    modeling.removeElements([element]);
  }

  function startConnect(event, element, autoActivate) {
    connect.start(event, element, autoActivate);
  }

  return {
    'delete': {
      group: 'edit',
      className: 'context-pad-icon-remove',
      title: 'Remove',
      action: {
        click: removeElement,
        dragstart: removeElement
      }
    },
    'connect': {
      group: 'edit',
      className: 'context-pad-icon-connect',
      title: 'Connect',
      action: {
        click: startConnect,
        dragstart: startConnect
      }
    }
  };
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ExamplePaletteProvider;
/**
 * A example palette provider.
 */
function ExamplePaletteProvider(create, elementFactory, lassoTool, palette) {
  this._create = create;
  this._elementFactory = elementFactory;
  this._lassoTool = lassoTool;
  this._palette = palette;

  palette.registerProvider(this);
}

ExamplePaletteProvider.$inject = ['create', 'elementFactory', 'lassoTool', 'palette'];

ExamplePaletteProvider.prototype.getPaletteEntries = function () {
  var create = this._create,
      elementFactory = this._elementFactory,
      lassoTool = this._lassoTool;

  return {
    'lasso-tool': {
      group: 'tools',
      className: 'palette-icon-lasso-tool',
      title: 'Activate Lasso Tool',
      action: {
        click: function click(event) {
          lassoTool.activateSelection(event);
        }
      }
    },
    'tool-separator': {
      group: 'tools',
      separator: true
    },
    'create-shape': {
      group: 'create',
      className: 'palette-icon-create-shape',
      title: 'Create Shape',
      action: {
        click: function click() {
          var shape = elementFactory.createShape({
            width: 100,
            height: 80
          });

          create.start(event, shape);
        }
      }
    }
  };
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ExampleRuleProvider;

var _inherits = require('inherits');

var _inherits2 = _interopRequireDefault(_inherits);

var _RuleProvider = require('diagram-js/lib/features/rules/RuleProvider');

var _RuleProvider2 = _interopRequireDefault(_RuleProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ExampleRuleProvider(eventBus) {
  _RuleProvider2.default.call(this, eventBus);
}

ExampleRuleProvider.$inject = ['eventBus'];

(0, _inherits2.default)(ExampleRuleProvider, _RuleProvider2.default);

ExampleRuleProvider.prototype.init = function () {
  this.addRule('shape.create', function (context) {
    var target = context.target,
        shape = context.shape;

    return target.parent === shape.target;
  });

  this.addRule('connection.create', function (context) {
    var source = context.source,
        target = context.target;

    return source.parent === target.parent;
  });
};

},{"diagram-js/lib/features/rules/RuleProvider":72,"inherits":107}],4:[function(require,module,exports){
'use strict';

var _diagramJs = require('diagram-js');

var _diagramJs2 = _interopRequireDefault(_diagramJs);

var _selection = require('diagram-js/lib/features/selection');

var _selection2 = _interopRequireDefault(_selection);

var _zoomscroll = require('diagram-js/lib/navigation/zoomscroll');

var _zoomscroll2 = _interopRequireDefault(_zoomscroll);

var _movecanvas = require('diagram-js/lib/navigation/movecanvas');

var _movecanvas2 = _interopRequireDefault(_movecanvas);

var _modeling = require('diagram-js/lib/features/modeling');

var _modeling2 = _interopRequireDefault(_modeling);

var _move = require('diagram-js/lib/features/move');

var _move2 = _interopRequireDefault(_move);

var _outline = require('diagram-js/lib/features/outline');

var _outline2 = _interopRequireDefault(_outline);

var _lassoTool = require('diagram-js/lib/features/lasso-tool');

var _lassoTool2 = _interopRequireDefault(_lassoTool);

var _palette = require('diagram-js/lib/features/palette');

var _palette2 = _interopRequireDefault(_palette);

var _create = require('diagram-js/lib/features/create');

var _create2 = _interopRequireDefault(_create);

var _contextPad = require('diagram-js/lib/features/context-pad');

var _contextPad2 = _interopRequireDefault(_contextPad);

var _connect = require('diagram-js/lib/features/connect');

var _connect2 = _interopRequireDefault(_connect);

var _rules = require('diagram-js/lib/features/rules');

var _rules2 = _interopRequireDefault(_rules);

var _ExampleContextPadProvider = require('./ExampleContextPadProvider');

var _ExampleContextPadProvider2 = _interopRequireDefault(_ExampleContextPadProvider);

var _ExamplePaletteProvider = require('./ExamplePaletteProvider');

var _ExamplePaletteProvider2 = _interopRequireDefault(_ExamplePaletteProvider);

var _ExampleRuleProvider = require('./ExampleRuleProvider');

var _ExampleRuleProvider2 = _interopRequireDefault(_ExampleRuleProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// connect elements
// create elements
// lasso tool for element selection
// move shapes
// scroll canvas
// select elements
var ExampleModule = {
  __init__: ['exampleContextPadProvider', 'examplePaletteProvider', 'exampleRuleProvider'],
  exampleContextPadProvider: ['type', _ExampleContextPadProvider2.default],
  examplePaletteProvider: ['type', _ExamplePaletteProvider2.default],
  exampleRuleProvider: ['type', _ExampleRuleProvider2.default]
}; // rules

// context pad for elements,
// palette
// show element outlines
// basic modeling (create/move/remove shapes/connections)
// zoom canvas


var container = document.querySelector('#container');

var diagram = new _diagramJs2.default({
  canvas: {
    container: container
  },
  modules: [_selection2.default, _zoomscroll2.default, _movecanvas2.default, _modeling2.default, _move2.default, _outline2.default, _lassoTool2.default, _palette2.default, _create2.default, _contextPad2.default, _connect2.default, _rules2.default, ExampleModule]
});

// get instances from diagram
var canvas = diagram.get('canvas'),
    defaultRenderer = diagram.get('defaultRenderer'),
    elementFactory = diagram.get('elementFactory'),
    styles = diagram.get('styles'),
    selection = diagram.get('selection');

// override default stroke color
defaultRenderer.CONNECTION_STYLE = styles.style(['no-fill'], { strokeWidth: 5, stroke: '#000' });
defaultRenderer.SHAPE_STYLE = styles.style({ fill: 'white', stroke: '#000', strokeWidth: 2 });

// add root
var root = elementFactory.createRoot();

canvas.setRootElement(root);

// add shapes
var shape1 = elementFactory.createShape({
  x: 150,
  y: 100,
  width: 100,
  height: 80
});

canvas.addShape(shape1, root);

var shape2 = elementFactory.createShape({
  x: 290,
  y: 220,
  width: 100,
  height: 80
});

canvas.addShape(shape2, root);

var connection1 = elementFactory.createConnection({
  waypoints: [{ x: 250, y: 180 }, { x: 290, y: 220 }]
});

canvas.addConnection(connection1, root);

var shape3 = elementFactory.createShape({
  x: 450,
  y: 80,
  width: 100,
  height: 80
});

canvas.addShape(shape3, root);

selection.select(shape3);

},{"./ExampleContextPadProvider":1,"./ExamplePaletteProvider":2,"./ExampleRuleProvider":3,"diagram-js":5,"diagram-js/lib/features/connect":23,"diagram-js/lib/features/context-pad":25,"diagram-js/lib/features/create":27,"diagram-js/lib/features/lasso-tool":34,"diagram-js/lib/features/modeling":60,"diagram-js/lib/features/move":63,"diagram-js/lib/features/outline":65,"diagram-js/lib/features/palette":69,"diagram-js/lib/features/rules":74,"diagram-js/lib/features/selection":78,"diagram-js/lib/navigation/movecanvas":86,"diagram-js/lib/navigation/zoomscroll":89}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Diagram = require('./lib/Diagram');

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Diagram).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./lib/Diagram":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Diagram;

var _didi = require('didi');

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Bootstrap an injector from a list of modules, instantiating a number of default components
 *
 * @ignore
 * @param {Array<didi.Module>} bootstrapModules
 *
 * @return {didi.Injector} a injector to use to access the components
 */
function bootstrap(bootstrapModules) {

  var modules = [],
      components = [];

  function hasModule(m) {
    return modules.indexOf(m) >= 0;
  }

  function addModule(m) {
    modules.push(m);
  }

  function visit(m) {
    if (hasModule(m)) {
      return;
    }

    (m.__depends__ || []).forEach(visit);

    if (hasModule(m)) {
      return;
    }

    addModule(m);

    (m.__init__ || []).forEach(function (c) {
      components.push(c);
    });
  }

  bootstrapModules.forEach(visit);

  var injector = new _didi.Injector(modules);

  components.forEach(function (c) {

    try {
      // eagerly resolve component (fn or string)
      injector[typeof c === 'string' ? 'get' : 'invoke'](c);
    } catch (e) {
      console.error('Failed to instantiate component');
      console.error(e.stack);

      throw e;
    }
  });

  return injector;
}

/**
 * Creates an injector from passed options.
 *
 * @ignore
 * @param  {Object} options
 * @return {didi.Injector}
 */
function createInjector(options) {

  options = options || {};

  var configModule = {
    'config': ['value', options]
  };

  var modules = [configModule, _core2.default].concat(options.modules || []);

  return bootstrap(modules);
}

/**
 * The main diagram-js entry point that bootstraps the diagram with the given
 * configuration.
 *
 * To register extensions with the diagram, pass them as Array<didi.Module> to the constructor.
 *
 * @class djs.Diagram
 * @memberOf djs
 * @constructor
 *
 * @example
 *
 * <caption>Creating a plug-in that logs whenever a shape is added to the canvas.</caption>
 *
 * // plug-in implemenentation
 * function MyLoggingPlugin(eventBus) {
 *   eventBus.on('shape.added', function(event) {
 *     console.log('shape ', event.shape, ' was added to the diagram');
 *   });
 * }
 *
 * // export as module
 * export default {
 *   __init__: [ 'myLoggingPlugin' ],
 *     myLoggingPlugin: [ 'type', MyLoggingPlugin ]
 * };
 *
 *
 * // instantiate the diagram with the new plug-in
 *
 * import MyLoggingModule from 'path-to-my-logging-plugin';
 *
 * var diagram = new Diagram({
 *   modules: [
 *     MyLoggingModule
 *   ]
 * });
 *
 * diagram.invoke([ 'canvas', function(canvas) {
 *   // add shape to drawing canvas
 *   canvas.addShape({ x: 10, y: 10 });
 * });
 *
 * // 'shape ... was added to the diagram' logged to console
 *
 * @param {Object} options
 * @param {Array<didi.Module>} [options.modules] external modules to instantiate with the diagram
 * @param {didi.Injector} [injector] an (optional) injector to bootstrap the diagram with
 */
function Diagram(options, injector) {

  // create injector unless explicitly specified
  this.injector = injector = injector || createInjector(options);

  // API

  /**
   * Resolves a diagram service
   *
   * @method Diagram#get
   *
   * @param {String} name the name of the diagram service to be retrieved
   * @param {Boolean} [strict=true] if false, resolve missing services to null
   */
  this.get = injector.get;

  /**
   * Executes a function into which diagram services are injected
   *
   * @method Diagram#invoke
   *
   * @param {Function|Object[]} fn the function to resolve
   * @param {Object} locals a number of locals to use to resolve certain dependencies
   */
  this.invoke = injector.invoke;

  // init

  // indicate via event


  /**
   * An event indicating that all plug-ins are loaded.
   *
   * Use this event to fire other events to interested plug-ins
   *
   * @memberOf Diagram
   *
   * @event diagram.init
   *
   * @example
   *
   * eventBus.on('diagram.init', function() {
   *   eventBus.fire('my-custom-event', { foo: 'BAR' });
   * });
   *
   * @type {Object}
   */
  this.get('eventBus').fire('diagram.init');
}

/**
 * Destroys the diagram
 *
 * @method  Diagram#destroy
 */
Diagram.prototype.destroy = function () {
  this.get('eventBus').fire('diagram.destroy');
};

/**
 * Clear the diagram, removing all contents.
 */
Diagram.prototype.clear = function () {
  this.get('eventBus').fire('diagram.clear');
};

},{"./core":15,"didi":106}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CommandInterceptor;

var _minDash = require('min-dash');

var DEFAULT_PRIORITY = 1000;

/**
 * A utility that can be used to plug-in into the command execution for
 * extension and/or validation.
 *
 * @param {EventBus} eventBus
 *
 * @example
 *
 * import inherits from 'inherits';
 *
 * import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';
 *
 * function CommandLogger(eventBus) {
 *   CommandInterceptor.call(this, eventBus);
 *
 *   this.preExecute(function(event) {
 *     console.log('command pre-execute', event);
 *   });
 * }
 *
 * inherits(CommandLogger, CommandInterceptor);
 *
 */
function CommandInterceptor(eventBus) {
  this._eventBus = eventBus;
}

CommandInterceptor.$inject = ['eventBus'];

function unwrapEvent(fn, that) {
  return function (event) {
    return fn.call(that || null, event.context, event.command, event);
  };
}

/**
 * Register an interceptor for a command execution
 *
 * @param {String|Array<String>} [events] list of commands to register on
 * @param {String} [hook] command hook, i.e. preExecute, executed to listen on
 * @param {Number} [priority] the priority on which to hook into the execution
 * @param {Function} handlerFn interceptor to be invoked with (event)
 * @param {Boolean} unwrap if true, unwrap the event and pass (context, command, event) to the
 *                          listener instead
 * @param {Object} [that] Pass context (`this`) to the handler function
 */
CommandInterceptor.prototype.on = function (events, hook, priority, handlerFn, unwrap, that) {

  if ((0, _minDash.isFunction)(hook) || (0, _minDash.isNumber)(hook)) {
    that = unwrap;
    unwrap = handlerFn;
    handlerFn = priority;
    priority = hook;
    hook = null;
  }

  if ((0, _minDash.isFunction)(priority)) {
    that = unwrap;
    unwrap = handlerFn;
    handlerFn = priority;
    priority = DEFAULT_PRIORITY;
  }

  if ((0, _minDash.isObject)(unwrap)) {
    that = unwrap;
    unwrap = false;
  }

  if (!(0, _minDash.isFunction)(handlerFn)) {
    throw new Error('handlerFn must be a function');
  }

  if (!(0, _minDash.isArray)(events)) {
    events = [events];
  }

  var eventBus = this._eventBus;

  (0, _minDash.forEach)(events, function (event) {
    // concat commandStack(.event)?(.hook)?
    var fullEvent = ['commandStack', event, hook].filter(function (e) {
      return e;
    }).join('.');

    eventBus.on(fullEvent, priority, unwrap ? unwrapEvent(handlerFn, that) : handlerFn, that);
  });
};

var hooks = ['canExecute', 'preExecute', 'preExecuted', 'execute', 'executed', 'postExecute', 'postExecuted', 'revert', 'reverted'];

/*
 * Install hook shortcuts
 *
 * This will generate the CommandInterceptor#(preExecute|...|reverted) methods
 * which will in term forward to CommandInterceptor#on.
 */
(0, _minDash.forEach)(hooks, function (hook) {

  /**
   * {canExecute|preExecute|preExecuted|execute|executed|postExecute|postExecuted|revert|reverted}
   *
   * A named hook for plugging into the command execution
   *
   * @param {String|Array<String>} [events] list of commands to register on
   * @param {Number} [priority] the priority on which to hook into the execution
   * @param {Function} handlerFn interceptor to be invoked with (event)
   * @param {Boolean} [unwrap=false] if true, unwrap the event and pass (context, command, event) to the
   *                          listener instead
   * @param {Object} [that] Pass context (`this`) to the handler function
   */
  CommandInterceptor.prototype[hook] = function (events, priority, handlerFn, unwrap, that) {

    if ((0, _minDash.isFunction)(events) || (0, _minDash.isNumber)(events)) {
      that = unwrap;
      unwrap = handlerFn;
      handlerFn = priority;
      priority = events;
      events = null;
    }

    this.on(events, hook, priority, handlerFn, unwrap, that);
  };
});

},{"min-dash":108}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CommandStack;

var _minDash = require('min-dash');

/**
 * A service that offers un- and redoable execution of commands.
 *
 * The command stack is responsible for executing modeling actions
 * in a un- and redoable manner. To do this it delegates the actual
 * command execution to {@link CommandHandler}s.
 *
 * Command handlers provide {@link CommandHandler#execute(ctx)} and
 * {@link CommandHandler#revert(ctx)} methods to un- and redo a command
 * identified by a command context.
 *
 *
 * ## Life-Cycle events
 *
 * In the process the command stack fires a number of life-cycle events
 * that other components to participate in the command execution.
 *
 *    * preExecute
 *    * preExecuted
 *    * execute
 *    * executed
 *    * postExecute
 *    * postExecuted
 *    * revert
 *    * reverted
 *
 * A special event is used for validating, whether a command can be
 * performed prior to its execution.
 *
 *    * canExecute
 *
 * Each of the events is fired as `commandStack.{eventName}` and
 * `commandStack.{commandName}.{eventName}`, respectively. This gives
 * components fine grained control on where to hook into.
 *
 * The event object fired transports `command`, the name of the
 * command and `context`, the command context.
 *
 *
 * ## Creating Command Handlers
 *
 * Command handlers should provide the {@link CommandHandler#execute(ctx)}
 * and {@link CommandHandler#revert(ctx)} methods to implement
 * redoing and undoing of a command.
 *
 * A command handler _must_ ensure undo is performed properly in order
 * not to break the undo chain. It must also return the shapes that
 * got changed during the `execute` and `revert` operations.
 *
 * Command handlers may execute other modeling operations (and thus
 * commands) in their `preExecute` and `postExecute` phases. The command
 * stack will properly group all commands together into a logical unit
 * that may be re- and undone atomically.
 *
 * Command handlers must not execute other commands from within their
 * core implementation (`execute`, `revert`).
 *
 *
 * ## Change Tracking
 *
 * During the execution of the CommandStack it will keep track of all
 * elements that have been touched during the command's execution.
 *
 * At the end of the CommandStack execution it will notify interested
 * components via an 'elements.changed' event with all the dirty
 * elements.
 *
 * The event can be picked up by components that are interested in the fact
 * that elements have been changed. One use case for this is updating
 * their graphical representation after moving / resizing or deletion.
 *
 * @see CommandHandler
 *
 * @param {EventBus} eventBus
 * @param {Injector} injector
 */
function CommandStack(eventBus, injector) {

  /**
   * A map of all registered command handlers.
   *
   * @type {Object}
   */
  this._handlerMap = {};

  /**
   * A stack containing all re/undoable actions on the diagram
   *
   * @type {Array<Object>}
   */
  this._stack = [];

  /**
   * The current index on the stack
   *
   * @type {Number}
   */
  this._stackIdx = -1;

  /**
   * Current active commandStack execution
   *
   * @type {Object}
   */
  this._currentExecution = {
    actions: [],
    dirty: []
  };

  this._injector = injector;
  this._eventBus = eventBus;

  this._uid = 1;

  eventBus.on(['diagram.destroy', 'diagram.clear'], function () {
    this.clear(false);
  }, this);
}

CommandStack.$inject = ['eventBus', 'injector'];

/**
 * Execute a command
 *
 * @param {String} command the command to execute
 * @param {Object} context the environment to execute the command in
 */
CommandStack.prototype.execute = function (command, context) {
  if (!command) {
    throw new Error('command required');
  }

  var action = { command: command, context: context };

  this._pushAction(action);
  this._internalExecute(action);
  this._popAction(action);
};

/**
 * Ask whether a given command can be executed.
 *
 * Implementors may hook into the mechanism on two ways:
 *
 *   * in event listeners:
 *
 *     Users may prevent the execution via an event listener.
 *     It must prevent the default action for `commandStack.(<command>.)canExecute` events.
 *
 *   * in command handlers:
 *
 *     If the method {@link CommandHandler#canExecute} is implemented in a handler
 *     it will be called to figure out whether the execution is allowed.
 *
 * @param  {String} command the command to execute
 * @param  {Object} context the environment to execute the command in
 *
 * @return {Boolean} true if the command can be executed
 */
CommandStack.prototype.canExecute = function (command, context) {

  var action = { command: command, context: context };

  var handler = this._getHandler(command);

  var result = this._fire(command, 'canExecute', action);

  // handler#canExecute will only be called if no listener
  // decided on a result already
  if (result === undefined) {
    if (!handler) {
      return false;
    }

    if (handler.canExecute) {
      result = handler.canExecute(context);
    }
  }

  return result;
};

/**
 * Clear the command stack, erasing all undo / redo history
 */
CommandStack.prototype.clear = function (emit) {
  this._stack.length = 0;
  this._stackIdx = -1;

  if (emit !== false) {
    this._fire('changed');
  }
};

/**
 * Undo last command(s)
 */
CommandStack.prototype.undo = function () {
  var action = this._getUndoAction(),
      next;

  if (action) {
    this._pushAction(action);

    while (action) {
      this._internalUndo(action);
      next = this._getUndoAction();

      if (!next || next.id !== action.id) {
        break;
      }

      action = next;
    }

    this._popAction();
  }
};

/**
 * Redo last command(s)
 */
CommandStack.prototype.redo = function () {
  var action = this._getRedoAction(),
      next;

  if (action) {
    this._pushAction(action);

    while (action) {
      this._internalExecute(action, true);
      next = this._getRedoAction();

      if (!next || next.id !== action.id) {
        break;
      }

      action = next;
    }

    this._popAction();
  }
};

/**
 * Register a handler instance with the command stack
 *
 * @param {String} command
 * @param {CommandHandler} handler
 */
CommandStack.prototype.register = function (command, handler) {
  this._setHandler(command, handler);
};

/**
 * Register a handler type with the command stack
 * by instantiating it and injecting its dependencies.
 *
 * @param {String} command
 * @param {Function} a constructor for a {@link CommandHandler}
 */
CommandStack.prototype.registerHandler = function (command, handlerCls) {

  if (!command || !handlerCls) {
    throw new Error('command and handlerCls must be defined');
  }

  var handler = this._injector.instantiate(handlerCls);
  this.register(command, handler);
};

CommandStack.prototype.canUndo = function () {
  return !!this._getUndoAction();
};

CommandStack.prototype.canRedo = function () {
  return !!this._getRedoAction();
};

// stack access  //////////////////////

CommandStack.prototype._getRedoAction = function () {
  return this._stack[this._stackIdx + 1];
};

CommandStack.prototype._getUndoAction = function () {
  return this._stack[this._stackIdx];
};

// internal functionality //////////////////////

CommandStack.prototype._internalUndo = function (action) {
  var self = this;

  var command = action.command,
      context = action.context;

  var handler = this._getHandler(command);

  // guard against illegal nested command stack invocations
  this._atomicDo(function () {
    self._fire(command, 'revert', action);

    if (handler.revert) {
      self._markDirty(handler.revert(context));
    }

    self._revertedAction(action);

    self._fire(command, 'reverted', action);
  });
};

CommandStack.prototype._fire = function (command, qualifier, event) {
  if (arguments.length < 3) {
    event = qualifier;
    qualifier = null;
  }

  var names = qualifier ? [command + '.' + qualifier, qualifier] : [command],
      i,
      name,
      result;

  event = this._eventBus.createEvent(event);

  for (i = 0; name = names[i]; i++) {
    result = this._eventBus.fire('commandStack.' + name, event);

    if (event.cancelBubble) {
      break;
    }
  }

  return result;
};

CommandStack.prototype._createId = function () {
  return this._uid++;
};

CommandStack.prototype._atomicDo = function (fn) {

  var execution = this._currentExecution;

  execution.atomic = true;

  try {
    fn();
  } finally {
    execution.atomic = false;
  }
};

CommandStack.prototype._internalExecute = function (action, redo) {
  var self = this;

  var command = action.command,
      context = action.context;

  var handler = this._getHandler(command);

  if (!handler) {
    throw new Error('no command handler registered for <' + command + '>');
  }

  this._pushAction(action);

  if (!redo) {
    this._fire(command, 'preExecute', action);

    if (handler.preExecute) {
      handler.preExecute(context);
    }

    this._fire(command, 'preExecuted', action);
  }

  // guard against illegal nested command stack invocations
  this._atomicDo(function () {

    self._fire(command, 'execute', action);

    if (handler.execute) {
      // actual execute + mark return results as dirty
      self._markDirty(handler.execute(context));
    }

    // log to stack
    self._executedAction(action, redo);

    self._fire(command, 'executed', action);
  });

  if (!redo) {
    this._fire(command, 'postExecute', action);

    if (handler.postExecute) {
      handler.postExecute(context);
    }

    this._fire(command, 'postExecuted', action);
  }

  this._popAction(action);
};

CommandStack.prototype._pushAction = function (action) {

  var execution = this._currentExecution,
      actions = execution.actions;

  var baseAction = actions[0];

  if (execution.atomic) {
    throw new Error('illegal invocation in <execute> or <revert> phase (action: ' + action.command + ')');
  }

  if (!action.id) {
    action.id = baseAction && baseAction.id || this._createId();
  }

  actions.push(action);
};

CommandStack.prototype._popAction = function () {
  var execution = this._currentExecution,
      actions = execution.actions,
      dirty = execution.dirty;

  actions.pop();

  if (!actions.length) {
    this._eventBus.fire('elements.changed', { elements: (0, _minDash.uniqueBy)('id', dirty) });

    dirty.length = 0;

    this._fire('changed');
  }
};

CommandStack.prototype._markDirty = function (elements) {
  var execution = this._currentExecution;

  if (!elements) {
    return;
  }

  elements = (0, _minDash.isArray)(elements) ? elements : [elements];

  execution.dirty = execution.dirty.concat(elements);
};

CommandStack.prototype._executedAction = function (action, redo) {
  var stackIdx = ++this._stackIdx;

  if (!redo) {
    this._stack.splice(stackIdx, this._stack.length, action);
  }
};

CommandStack.prototype._revertedAction = function (action) {
  this._stackIdx--;
};

CommandStack.prototype._getHandler = function (command) {
  return this._handlerMap[command];
};

CommandStack.prototype._setHandler = function (command, handler) {
  if (!command || !handler) {
    throw new Error('command and handler required');
  }

  if (this._handlerMap[command]) {
    throw new Error('overriding handler for command <' + command + '>');
  }

  this._handlerMap[command] = handler;
};

},{"min-dash":108}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CommandStack = require('./CommandStack');

var _CommandStack2 = _interopRequireDefault(_CommandStack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  commandStack: ['type', _CommandStack2.default]
};

},{"./CommandStack":8}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = Canvas;

var _minDash = require('min-dash');

var _Collections = require('../util/Collections');

var _Elements = require('../util/Elements');

var _tinySvg = require('tiny-svg');

function round(number, resolution) {
  return Math.round(number * resolution) / resolution;
}

function ensurePx(number) {
  return (0, _minDash.isNumber)(number) ? number + 'px' : number;
}

/**
 * Creates a HTML container element for a SVG element with
 * the given configuration
 *
 * @param  {Object} options
 * @return {HTMLElement} the container element
 */
function createContainer(options) {

  options = (0, _minDash.assign)({}, { width: '100%', height: '100%' }, options);

  var container = options.container || document.body;

  // create a <div> around the svg element with the respective size
  // this way we can always get the correct container size
  // (this is impossible for <svg> elements at the moment)
  var parent = document.createElement('div');
  parent.setAttribute('class', 'djs-container');

  (0, _minDash.assign)(parent.style, {
    position: 'relative',
    overflow: 'hidden',
    width: ensurePx(options.width),
    height: ensurePx(options.height)
  });

  container.appendChild(parent);

  return parent;
}

function createGroup(parent, cls, childIndex) {
  var group = (0, _tinySvg.create)('g');
  (0, _tinySvg.classes)(group).add(cls);

  var index = childIndex !== undefined ? childIndex : parent.childNodes.length - 1;

  // must ensure second argument is node or _null_
  // cf. https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
  parent.insertBefore(group, parent.childNodes[index] || null);

  return group;
}

var BASE_LAYER = 'base';

var REQUIRED_MODEL_ATTRS = {
  shape: ['x', 'y', 'width', 'height'],
  connection: ['waypoints']
};

/**
 * The main drawing canvas.
 *
 * @class
 * @constructor
 *
 * @emits Canvas#canvas.init
 *
 * @param {Object} config
 * @param {EventBus} eventBus
 * @param {GraphicsFactory} graphicsFactory
 * @param {ElementRegistry} elementRegistry
 */
function Canvas(config, eventBus, graphicsFactory, elementRegistry) {

  this._eventBus = eventBus;
  this._elementRegistry = elementRegistry;
  this._graphicsFactory = graphicsFactory;

  this._init(config || {});
}

Canvas.$inject = ['config.canvas', 'eventBus', 'graphicsFactory', 'elementRegistry'];

Canvas.prototype._init = function (config) {

  var eventBus = this._eventBus;

  // Creates a <svg> element that is wrapped into a <div>.
  // This way we are always able to correctly figure out the size of the svg element
  // by querying the parent node.
  //
  // (It is not possible to get the size of a svg element cross browser @ 2014-04-01)
  //
  // <div class="djs-container" style="width: {desired-width}, height: {desired-height}">
  //   <svg width="100%" height="100%">
  //    ...
  //   </svg>
  // </div>

  // html container
  var container = this._container = createContainer(config);

  var svg = this._svg = (0, _tinySvg.create)('svg');
  (0, _tinySvg.attr)(svg, { width: '100%', height: '100%' });

  (0, _tinySvg.append)(container, svg);

  var viewport = this._viewport = createGroup(svg, 'viewport');

  this._layers = {};

  // debounce canvas.viewbox.changed events
  // for smoother diagram interaction
  if (config.deferUpdate !== false) {
    this._viewboxChanged = (0, _minDash.debounce)((0, _minDash.bind)(this._viewboxChanged, this), 300);
  }

  eventBus.on('diagram.init', function () {

    /**
     * An event indicating that the canvas is ready to be drawn on.
     *
     * @memberOf Canvas
     *
     * @event canvas.init
     *
     * @type {Object}
     * @property {SVGElement} svg the created svg element
     * @property {SVGElement} viewport the direct parent of diagram elements and shapes
     */
    eventBus.fire('canvas.init', {
      svg: svg,
      viewport: viewport
    });
  }, this);

  // reset viewbox on shape changes to
  // recompute the viewbox
  eventBus.on(['shape.added', 'connection.added', 'shape.removed', 'connection.removed', 'elements.changed'], function () {
    delete this._cachedViewbox;
  }, this);

  eventBus.on('diagram.destroy', 500, this._destroy, this);
  eventBus.on('diagram.clear', 500, this._clear, this);
};

Canvas.prototype._destroy = function (emit) {
  this._eventBus.fire('canvas.destroy', {
    svg: this._svg,
    viewport: this._viewport
  });

  var parent = this._container.parentNode;

  if (parent) {
    parent.removeChild(this._container);
  }

  delete this._svg;
  delete this._container;
  delete this._layers;
  delete this._rootElement;
  delete this._viewport;
};

Canvas.prototype._clear = function () {

  var self = this;

  var allElements = this._elementRegistry.getAll();

  // remove all elements
  allElements.forEach(function (element) {
    var type = (0, _Elements.getType)(element);

    if (type === 'root') {
      self.setRootElement(null, true);
    } else {
      self._removeElement(element, type);
    }
  });

  // force recomputation of view box
  delete this._cachedViewbox;
};

/**
 * Returns the default layer on which
 * all elements are drawn.
 *
 * @returns {SVGElement}
 */
Canvas.prototype.getDefaultLayer = function () {
  return this.getLayer(BASE_LAYER, 0);
};

/**
 * Returns a layer that is used to draw elements
 * or annotations on it.
 *
 * Non-existing layers retrieved through this method
 * will be created. During creation, the optional index
 * may be used to create layers below or above existing layers.
 * A layer with a certain index is always created above all
 * existing layers with the same index.
 *
 * @param {String} name
 * @param {Number} index
 *
 * @returns {SVGElement}
 */
Canvas.prototype.getLayer = function (name, index) {

  if (!name) {
    throw new Error('must specify a name');
  }

  var layer = this._layers[name];

  if (!layer) {
    layer = this._layers[name] = this._createLayer(name, index);
  }

  // throw an error if layer creation / retrival is
  // requested on different index
  if (typeof index !== 'undefined' && layer.index !== index) {
    throw new Error('layer <' + name + '> already created at index <' + index + '>');
  }

  return layer.group;
};

/**
 * Creates a given layer and returns it.
 *
 * @param {String} name
 * @param {Number} [index=0]
 *
 * @return {Object} layer descriptor with { index, group: SVGGroup }
 */
Canvas.prototype._createLayer = function (name, index) {

  if (!index) {
    index = 0;
  }

  var childIndex = (0, _minDash.reduce)(this._layers, function (childIndex, layer) {
    if (index >= layer.index) {
      childIndex++;
    }

    return childIndex;
  }, 0);

  return {
    group: createGroup(this._viewport, 'layer-' + name, childIndex),
    index: index
  };
};

/**
 * Returns the html element that encloses the
 * drawing canvas.
 *
 * @return {DOMNode}
 */
Canvas.prototype.getContainer = function () {
  return this._container;
};

// markers //////////////////////

Canvas.prototype._updateMarker = function (element, marker, add) {
  var container;

  if (!element.id) {
    element = this._elementRegistry.get(element);
  }

  // we need to access all
  container = this._elementRegistry._elements[element.id];

  if (!container) {
    return;
  }

  (0, _minDash.forEach)([container.gfx, container.secondaryGfx], function (gfx) {
    if (gfx) {
      // invoke either addClass or removeClass based on mode
      if (add) {
        (0, _tinySvg.classes)(gfx).add(marker);
      } else {
        (0, _tinySvg.classes)(gfx).remove(marker);
      }
    }
  });

  /**
   * An event indicating that a marker has been updated for an element
   *
   * @event element.marker.update
   * @type {Object}
   * @property {djs.model.Element} element the shape
   * @property {Object} gfx the graphical representation of the shape
   * @property {String} marker
   * @property {Boolean} add true if the marker was added, false if it got removed
   */
  this._eventBus.fire('element.marker.update', { element: element, gfx: container.gfx, marker: marker, add: !!add });
};

/**
 * Adds a marker to an element (basically a css class).
 *
 * Fires the element.marker.update event, making it possible to
 * integrate extension into the marker life-cycle, too.
 *
 * @example
 * canvas.addMarker('foo', 'some-marker');
 *
 * var fooGfx = canvas.getGraphics('foo');
 *
 * fooGfx; // <g class="... some-marker"> ... </g>
 *
 * @param {String|djs.model.Base} element
 * @param {String} marker
 */
Canvas.prototype.addMarker = function (element, marker) {
  this._updateMarker(element, marker, true);
};

/**
 * Remove a marker from an element.
 *
 * Fires the element.marker.update event, making it possible to
 * integrate extension into the marker life-cycle, too.
 *
 * @param  {String|djs.model.Base} element
 * @param  {String} marker
 */
Canvas.prototype.removeMarker = function (element, marker) {
  this._updateMarker(element, marker, false);
};

/**
 * Check the existence of a marker on element.
 *
 * @param  {String|djs.model.Base} element
 * @param  {String} marker
 */
Canvas.prototype.hasMarker = function (element, marker) {
  if (!element.id) {
    element = this._elementRegistry.get(element);
  }

  var gfx = this.getGraphics(element);

  return (0, _tinySvg.classes)(gfx).has(marker);
};

/**
 * Toggles a marker on an element.
 *
 * Fires the element.marker.update event, making it possible to
 * integrate extension into the marker life-cycle, too.
 *
 * @param  {String|djs.model.Base} element
 * @param  {String} marker
 */
Canvas.prototype.toggleMarker = function (element, marker) {
  if (this.hasMarker(element, marker)) {
    this.removeMarker(element, marker);
  } else {
    this.addMarker(element, marker);
  }
};

Canvas.prototype.getRootElement = function () {
  if (!this._rootElement) {
    this.setRootElement({ id: '__implicitroot', children: [] });
  }

  return this._rootElement;
};

// root element handling //////////////////////

/**
 * Sets a given element as the new root element for the canvas
 * and returns the new root element.
 *
 * @param {Object|djs.model.Root} element
 * @param {Boolean} [override] whether to override the current root element, if any
 *
 * @return {Object|djs.model.Root} new root element
 */
Canvas.prototype.setRootElement = function (element, override) {

  if (element) {
    this._ensureValid('root', element);
  }

  var currentRoot = this._rootElement,
      elementRegistry = this._elementRegistry,
      eventBus = this._eventBus;

  if (currentRoot) {
    if (!override) {
      throw new Error('rootElement already set, need to specify override');
    }

    // simulate element remove event sequence
    eventBus.fire('root.remove', { element: currentRoot });
    eventBus.fire('root.removed', { element: currentRoot });

    elementRegistry.remove(currentRoot);
  }

  if (element) {
    var gfx = this.getDefaultLayer();

    // resemble element add event sequence
    eventBus.fire('root.add', { element: element });

    elementRegistry.add(element, gfx, this._svg);

    eventBus.fire('root.added', { element: element, gfx: gfx });
  }

  this._rootElement = element;

  return element;
};

// add functionality //////////////////////

Canvas.prototype._ensureValid = function (type, element) {
  if (!element.id) {
    throw new Error('element must have an id');
  }

  if (this._elementRegistry.get(element.id)) {
    throw new Error('element with id ' + element.id + ' already exists');
  }

  var requiredAttrs = REQUIRED_MODEL_ATTRS[type];

  var valid = (0, _minDash.every)(requiredAttrs, function (attr) {
    return typeof element[attr] !== 'undefined';
  });

  if (!valid) {
    throw new Error('must supply { ' + requiredAttrs.join(', ') + ' } with ' + type);
  }
};

Canvas.prototype._setParent = function (element, parent, parentIndex) {
  (0, _Collections.add)(parent.children, element, parentIndex);
  element.parent = parent;
};

/**
 * Adds an element to the canvas.
 *
 * This wires the parent <-> child relationship between the element and
 * a explicitly specified parent or an implicit root element.
 *
 * During add it emits the events
 *
 *  * <{type}.add> (element, parent)
 *  * <{type}.added> (element, gfx)
 *
 * Extensions may hook into these events to perform their magic.
 *
 * @param {String} type
 * @param {Object|djs.model.Base} element
 * @param {Object|djs.model.Base} [parent]
 * @param {Number} [parentIndex]
 *
 * @return {Object|djs.model.Base} the added element
 */
Canvas.prototype._addElement = function (type, element, parent, parentIndex) {

  parent = parent || this.getRootElement();

  var eventBus = this._eventBus,
      graphicsFactory = this._graphicsFactory;

  this._ensureValid(type, element);

  eventBus.fire(type + '.add', { element: element, parent: parent });

  this._setParent(element, parent, parentIndex);

  // create graphics
  var gfx = graphicsFactory.create(type, element, parentIndex);

  this._elementRegistry.add(element, gfx);

  // update its visual
  graphicsFactory.update(type, element, gfx);

  eventBus.fire(type + '.added', { element: element, gfx: gfx });

  return element;
};

/**
 * Adds a shape to the canvas
 *
 * @param {Object|djs.model.Shape} shape to add to the diagram
 * @param {djs.model.Base} [parent]
 * @param {Number} [parentIndex]
 *
 * @return {djs.model.Shape} the added shape
 */
Canvas.prototype.addShape = function (shape, parent, parentIndex) {
  return this._addElement('shape', shape, parent, parentIndex);
};

/**
 * Adds a connection to the canvas
 *
 * @param {Object|djs.model.Connection} connection to add to the diagram
 * @param {djs.model.Base} [parent]
 * @param {Number} [parentIndex]
 *
 * @return {djs.model.Connection} the added connection
 */
Canvas.prototype.addConnection = function (connection, parent, parentIndex) {
  return this._addElement('connection', connection, parent, parentIndex);
};

/**
 * Internal remove element
 */
Canvas.prototype._removeElement = function (element, type) {

  var elementRegistry = this._elementRegistry,
      graphicsFactory = this._graphicsFactory,
      eventBus = this._eventBus;

  element = elementRegistry.get(element.id || element);

  if (!element) {
    // element was removed already
    return;
  }

  eventBus.fire(type + '.remove', { element: element });

  graphicsFactory.remove(element);

  // unset parent <-> child relationship
  (0, _Collections.remove)(element.parent && element.parent.children, element);
  element.parent = null;

  eventBus.fire(type + '.removed', { element: element });

  elementRegistry.remove(element);

  return element;
};

/**
 * Removes a shape from the canvas
 *
 * @param {String|djs.model.Shape} shape or shape id to be removed
 *
 * @return {djs.model.Shape} the removed shape
 */
Canvas.prototype.removeShape = function (shape) {

  /**
   * An event indicating that a shape is about to be removed from the canvas.
   *
   * @memberOf Canvas
   *
   * @event shape.remove
   * @type {Object}
   * @property {djs.model.Shape} element the shape descriptor
   * @property {Object} gfx the graphical representation of the shape
   */

  /**
   * An event indicating that a shape has been removed from the canvas.
   *
   * @memberOf Canvas
   *
   * @event shape.removed
   * @type {Object}
   * @property {djs.model.Shape} element the shape descriptor
   * @property {Object} gfx the graphical representation of the shape
   */
  return this._removeElement(shape, 'shape');
};

/**
 * Removes a connection from the canvas
 *
 * @param {String|djs.model.Connection} connection or connection id to be removed
 *
 * @return {djs.model.Connection} the removed connection
 */
Canvas.prototype.removeConnection = function (connection) {

  /**
   * An event indicating that a connection is about to be removed from the canvas.
   *
   * @memberOf Canvas
   *
   * @event connection.remove
   * @type {Object}
   * @property {djs.model.Connection} element the connection descriptor
   * @property {Object} gfx the graphical representation of the connection
   */

  /**
   * An event indicating that a connection has been removed from the canvas.
   *
   * @memberOf Canvas
   *
   * @event connection.removed
   * @type {Object}
   * @property {djs.model.Connection} element the connection descriptor
   * @property {Object} gfx the graphical representation of the connection
   */
  return this._removeElement(connection, 'connection');
};

/**
 * Return the graphical object underlaying a certain diagram element
 *
 * @param {String|djs.model.Base} element descriptor of the element
 * @param {Boolean} [secondary=false] whether to return the secondary connected element
 *
 * @return {SVGElement}
 */
Canvas.prototype.getGraphics = function (element, secondary) {
  return this._elementRegistry.getGraphics(element, secondary);
};

/**
 * Perform a viewbox update via a given change function.
 *
 * @param {Function} changeFn
 */
Canvas.prototype._changeViewbox = function (changeFn) {

  // notify others of the upcoming viewbox change
  this._eventBus.fire('canvas.viewbox.changing');

  // perform actual change
  changeFn.apply(this);

  // reset the cached viewbox so that
  // a new get operation on viewbox or zoom
  // triggers a viewbox re-computation
  this._cachedViewbox = null;

  // notify others of the change; this step
  // may or may not be debounced
  this._viewboxChanged();
};

Canvas.prototype._viewboxChanged = function () {
  this._eventBus.fire('canvas.viewbox.changed', { viewbox: this.viewbox() });
};

/**
 * Gets or sets the view box of the canvas, i.e. the
 * area that is currently displayed.
 *
 * The getter may return a cached viewbox (if it is currently
 * changing). To force a recomputation, pass `false` as the first argument.
 *
 * @example
 *
 * canvas.viewbox({ x: 100, y: 100, width: 500, height: 500 })
 *
 * // sets the visible area of the diagram to (100|100) -> (600|100)
 * // and and scales it according to the diagram width
 *
 * var viewbox = canvas.viewbox(); // pass `false` to force recomputing the box.
 *
 * console.log(viewbox);
 * // {
 * //   inner: Dimensions,
 * //   outer: Dimensions,
 * //   scale,
 * //   x, y,
 * //   width, height
 * // }
 *
 * // if the current diagram is zoomed and scrolled, you may reset it to the
 * // default zoom via this method, too:
 *
 * var zoomedAndScrolledViewbox = canvas.viewbox();
 *
 * canvas.viewbox({
 *   x: 0,
 *   y: 0,
 *   width: zoomedAndScrolledViewbox.outer.width,
 *   height: zoomedAndScrolledViewbox.outer.height
 * });
 *
 * @param  {Object} [box] the new view box to set
 * @param  {Number} box.x the top left X coordinate of the canvas visible in view box
 * @param  {Number} box.y the top left Y coordinate of the canvas visible in view box
 * @param  {Number} box.width the visible width
 * @param  {Number} box.height
 *
 * @return {Object} the current view box
 */
Canvas.prototype.viewbox = function (box) {

  if (box === undefined && this._cachedViewbox) {
    return this._cachedViewbox;
  }

  var viewport = this._viewport,
      innerBox,
      outerBox = this.getSize(),
      matrix,
      transform,
      scale,
      x,
      y;

  if (!box) {
    // compute the inner box based on the
    // diagrams default layer. This allows us to exclude
    // external components, such as overlays
    innerBox = this.getDefaultLayer().getBBox();

    transform = (0, _tinySvg.transform)(viewport);
    matrix = transform ? transform.matrix : (0, _tinySvg.createMatrix)();
    scale = round(matrix.a, 1000);

    x = round(-matrix.e || 0, 1000);
    y = round(-matrix.f || 0, 1000);

    box = this._cachedViewbox = {
      x: x ? x / scale : 0,
      y: y ? y / scale : 0,
      width: outerBox.width / scale,
      height: outerBox.height / scale,
      scale: scale,
      inner: {
        width: innerBox.width,
        height: innerBox.height,
        x: innerBox.x,
        y: innerBox.y
      },
      outer: outerBox
    };

    return box;
  } else {

    this._changeViewbox(function () {
      scale = Math.min(outerBox.width / box.width, outerBox.height / box.height);

      var matrix = this._svg.createSVGMatrix().scale(scale).translate(-box.x, -box.y);

      (0, _tinySvg.transform)(viewport, matrix);
    });
  }

  return box;
};

/**
 * Gets or sets the scroll of the canvas.
 *
 * @param {Object} [delta] the new scroll to apply.
 *
 * @param {Number} [delta.dx]
 * @param {Number} [delta.dy]
 */
Canvas.prototype.scroll = function (delta) {

  var node = this._viewport;
  var matrix = node.getCTM();

  if (delta) {
    this._changeViewbox(function () {
      delta = (0, _minDash.assign)({ dx: 0, dy: 0 }, delta || {});

      matrix = this._svg.createSVGMatrix().translate(delta.dx, delta.dy).multiply(matrix);

      setCTM(node, matrix);
    });
  }

  return { x: matrix.e, y: matrix.f };
};

/**
 * Gets or sets the current zoom of the canvas, optionally zooming
 * to the specified position.
 *
 * The getter may return a cached zoom level. Call it with `false` as
 * the first argument to force recomputation of the current level.
 *
 * @param {String|Number} [newScale] the new zoom level, either a number, i.e. 0.9,
 *                                   or `fit-viewport` to adjust the size to fit the current viewport
 * @param {String|Point} [center] the reference point { x: .., y: ..} to zoom to, 'auto' to zoom into mid or null
 *
 * @return {Number} the current scale
 */
Canvas.prototype.zoom = function (newScale, center) {

  if (!newScale) {
    return this.viewbox(newScale).scale;
  }

  if (newScale === 'fit-viewport') {
    return this._fitViewport(center);
  }

  var outer, matrix;

  this._changeViewbox(function () {

    if ((typeof center === 'undefined' ? 'undefined' : _typeof(center)) !== 'object') {
      outer = this.viewbox().outer;

      center = {
        x: outer.width / 2,
        y: outer.height / 2
      };
    }

    matrix = this._setZoom(newScale, center);
  });

  return round(matrix.a, 1000);
};

function setCTM(node, m) {
  var mstr = 'matrix(' + m.a + ',' + m.b + ',' + m.c + ',' + m.d + ',' + m.e + ',' + m.f + ')';
  node.setAttribute('transform', mstr);
}

Canvas.prototype._fitViewport = function (center) {

  var vbox = this.viewbox(),
      outer = vbox.outer,
      inner = vbox.inner,
      newScale,
      newViewbox;

  // display the complete diagram without zooming in.
  // instead of relying on internal zoom, we perform a
  // hard reset on the canvas viewbox to realize this
  //
  // if diagram does not need to be zoomed in, we focus it around
  // the diagram origin instead

  if (inner.x >= 0 && inner.y >= 0 && inner.x + inner.width <= outer.width && inner.y + inner.height <= outer.height && !center) {

    newViewbox = {
      x: 0,
      y: 0,
      width: Math.max(inner.width + inner.x, outer.width),
      height: Math.max(inner.height + inner.y, outer.height)
    };
  } else {

    newScale = Math.min(1, outer.width / inner.width, outer.height / inner.height);
    newViewbox = {
      x: inner.x + (center ? inner.width / 2 - outer.width / newScale / 2 : 0),
      y: inner.y + (center ? inner.height / 2 - outer.height / newScale / 2 : 0),
      width: outer.width / newScale,
      height: outer.height / newScale
    };
  }

  this.viewbox(newViewbox);

  return this.viewbox(false).scale;
};

Canvas.prototype._setZoom = function (scale, center) {

  var svg = this._svg,
      viewport = this._viewport;

  var matrix = svg.createSVGMatrix();
  var point = svg.createSVGPoint();

  var centerPoint, originalPoint, currentMatrix, scaleMatrix, newMatrix;

  currentMatrix = viewport.getCTM();

  var currentScale = currentMatrix.a;

  if (center) {
    centerPoint = (0, _minDash.assign)(point, center);

    // revert applied viewport transformations
    originalPoint = centerPoint.matrixTransform(currentMatrix.inverse());

    // create scale matrix
    scaleMatrix = matrix.translate(originalPoint.x, originalPoint.y).scale(1 / currentScale * scale).translate(-originalPoint.x, -originalPoint.y);

    newMatrix = currentMatrix.multiply(scaleMatrix);
  } else {
    newMatrix = matrix.scale(scale);
  }

  setCTM(this._viewport, newMatrix);

  return newMatrix;
};

/**
 * Returns the size of the canvas
 *
 * @return {Dimensions}
 */
Canvas.prototype.getSize = function () {
  return {
    width: this._container.clientWidth,
    height: this._container.clientHeight
  };
};

/**
 * Return the absolute bounding box for the given element
 *
 * The absolute bounding box may be used to display overlays in the
 * callers (browser) coordinate system rather than the zoomed in/out
 * canvas coordinates.
 *
 * @param  {ElementDescriptor} element
 * @return {Bounds} the absolute bounding box
 */
Canvas.prototype.getAbsoluteBBox = function (element) {
  var vbox = this.viewbox();
  var bbox;

  // connection
  // use svg bbox
  if (element.waypoints) {
    var gfx = this.getGraphics(element);

    bbox = gfx.getBBox();
  }
  // shapes
  // use data
  else {
      bbox = element;
    }

  var x = bbox.x * vbox.scale - vbox.x * vbox.scale;
  var y = bbox.y * vbox.scale - vbox.y * vbox.scale;

  var width = bbox.width * vbox.scale;
  var height = bbox.height * vbox.scale;

  return {
    x: x,
    y: y,
    width: width,
    height: height
  };
};

/**
 * Fires an event in order other modules can react to the
 * canvas resizing
 */
Canvas.prototype.resized = function () {

  // force recomputation of view box
  delete this._cachedViewbox;

  this._eventBus.fire('canvas.resized');
};

},{"../util/Collections":92,"../util/Elements":94,"min-dash":108,"tiny-svg":114}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ElementFactory;

var _model = require('../model');

var _minDash = require('min-dash');

/**
 * A factory for diagram-js shapes
 */
function ElementFactory() {
  this._uid = 12;
}

ElementFactory.prototype.createRoot = function (attrs) {
  return this.create('root', attrs);
};

ElementFactory.prototype.createLabel = function (attrs) {
  return this.create('label', attrs);
};

ElementFactory.prototype.createShape = function (attrs) {
  return this.create('shape', attrs);
};

ElementFactory.prototype.createConnection = function (attrs) {
  return this.create('connection', attrs);
};

/**
 * Create a model element with the given type and
 * a number of pre-set attributes.
 *
 * @param  {String} type
 * @param  {Object} attrs
 * @return {djs.model.Base} the newly created model instance
 */
ElementFactory.prototype.create = function (type, attrs) {

  attrs = (0, _minDash.assign)({}, attrs || {});

  if (!attrs.id) {
    attrs.id = type + '_' + this._uid++;
  }

  return (0, _model.create)(type, attrs);
};

},{"../model":84,"min-dash":108}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ElementRegistry;

var _tinySvg = require('tiny-svg');

var ELEMENT_ID = 'data-element-id';

/**
 * @class
 *
 * A registry that keeps track of all shapes in the diagram.
 */
function ElementRegistry(eventBus) {
  this._elements = {};

  this._eventBus = eventBus;
}

ElementRegistry.$inject = ['eventBus'];

/**
 * Register a pair of (element, gfx, (secondaryGfx)).
 *
 * @param {djs.model.Base} element
 * @param {SVGElement} gfx
 * @param {SVGElement} [secondaryGfx] optional other element to register, too
 */
ElementRegistry.prototype.add = function (element, gfx, secondaryGfx) {

  var id = element.id;

  this._validateId(id);

  // associate dom node with element
  (0, _tinySvg.attr)(gfx, ELEMENT_ID, id);

  if (secondaryGfx) {
    (0, _tinySvg.attr)(secondaryGfx, ELEMENT_ID, id);
  }

  this._elements[id] = { element: element, gfx: gfx, secondaryGfx: secondaryGfx };
};

/**
 * Removes an element from the registry.
 *
 * @param {djs.model.Base} element
 */
ElementRegistry.prototype.remove = function (element) {
  var elements = this._elements,
      id = element.id || element,
      container = id && elements[id];

  if (container) {

    // unset element id on gfx
    (0, _tinySvg.attr)(container.gfx, ELEMENT_ID, '');

    if (container.secondaryGfx) {
      (0, _tinySvg.attr)(container.secondaryGfx, ELEMENT_ID, '');
    }

    delete elements[id];
  }
};

/**
 * Update the id of an element
 *
 * @param {djs.model.Base} element
 * @param {String} newId
 */
ElementRegistry.prototype.updateId = function (element, newId) {

  this._validateId(newId);

  if (typeof element === 'string') {
    element = this.get(element);
  }

  this._eventBus.fire('element.updateId', {
    element: element,
    newId: newId
  });

  var gfx = this.getGraphics(element),
      secondaryGfx = this.getGraphics(element, true);

  this.remove(element);

  element.id = newId;

  this.add(element, gfx, secondaryGfx);
};

/**
 * Return the model element for a given id or graphics.
 *
 * @example
 *
 * elementRegistry.get('SomeElementId_1');
 * elementRegistry.get(gfx);
 *
 *
 * @param {String|SVGElement} filter for selecting the element
 *
 * @return {djs.model.Base}
 */
ElementRegistry.prototype.get = function (filter) {
  var id;

  if (typeof filter === 'string') {
    id = filter;
  } else {
    id = filter && (0, _tinySvg.attr)(filter, ELEMENT_ID);
  }

  var container = this._elements[id];
  return container && container.element;
};

/**
 * Return all elements that match a given filter function.
 *
 * @param {Function} fn
 *
 * @return {Array<djs.model.Base>}
 */
ElementRegistry.prototype.filter = function (fn) {

  var filtered = [];

  this.forEach(function (element, gfx) {
    if (fn(element, gfx)) {
      filtered.push(element);
    }
  });

  return filtered;
};

/**
 * Return all rendered model elements.
 *
 * @return {Array<djs.model.Base>}
 */
ElementRegistry.prototype.getAll = function () {
  return this.filter(function (e) {
    return e;
  });
};

/**
 * Iterate over all diagram elements.
 *
 * @param {Function} fn
 */
ElementRegistry.prototype.forEach = function (fn) {

  var map = this._elements;

  Object.keys(map).forEach(function (id) {
    var container = map[id],
        element = container.element,
        gfx = container.gfx;

    return fn(element, gfx);
  });
};

/**
 * Return the graphical representation of an element or its id.
 *
 * @example
 * elementRegistry.getGraphics('SomeElementId_1');
 * elementRegistry.getGraphics(rootElement); // <g ...>
 *
 * elementRegistry.getGraphics(rootElement, true); // <svg ...>
 *
 *
 * @param {String|djs.model.Base} filter
 * @param {Boolean} [secondary=false] whether to return the secondary connected element
 *
 * @return {SVGElement}
 */
ElementRegistry.prototype.getGraphics = function (filter, secondary) {
  var id = filter.id || filter;

  var container = this._elements[id];
  return container && (secondary ? container.secondaryGfx : container.gfx);
};

/**
 * Validate the suitability of the given id and signals a problem
 * with an exception.
 *
 * @param {String} id
 *
 * @throws {Error} if id is empty or already assigned
 */
ElementRegistry.prototype._validateId = function (id) {
  if (!id) {
    throw new Error('element must have an id');
  }

  if (this._elements[id]) {
    throw new Error('element with id ' + id + ' already added');
  }
};

},{"tiny-svg":114}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = EventBus;

var _minDash = require('min-dash');

var FN_REF = '__fn';

var DEFAULT_PRIORITY = 1000;

var slice = Array.prototype.slice;

/**
 * A general purpose event bus.
 *
 * This component is used to communicate across a diagram instance.
 * Other parts of a diagram can use it to listen to and broadcast events.
 *
 *
 * ## Registering for Events
 *
 * The event bus provides the {@link EventBus#on} and {@link EventBus#once}
 * methods to register for events. {@link EventBus#off} can be used to
 * remove event registrations. Listeners receive an instance of {@link Event}
 * as the first argument. It allows them to hook into the event execution.
 *
 * ```javascript
 *
 * // listen for event
 * eventBus.on('foo', function(event) {
 *
 *   // access event type
 *   event.type; // 'foo'
 *
 *   // stop propagation to other listeners
 *   event.stopPropagation();
 *
 *   // prevent event default
 *   event.preventDefault();
 * });
 *
 * // listen for event with custom payload
 * eventBus.on('bar', function(event, payload) {
 *   console.log(payload);
 * });
 *
 * // listen for event returning value
 * eventBus.on('foobar', function(event) {
 *
 *   // stop event propagation + prevent default
 *   return false;
 *
 *   // stop event propagation + return custom result
 *   return {
 *     complex: 'listening result'
 *   };
 * });
 *
 *
 * // listen with custom priority (default=1000, higher is better)
 * eventBus.on('priorityfoo', 1500, function(event) {
 *   console.log('invoked first!');
 * });
 *
 *
 * // listen for event and pass the context (`this`)
 * eventBus.on('foobar', function(event) {
 *   this.foo();
 * }, this);
 * ```
 *
 *
 * ## Emitting Events
 *
 * Events can be emitted via the event bus using {@link EventBus#fire}.
 *
 * ```javascript
 *
 * // false indicates that the default action
 * // was prevented by listeners
 * if (eventBus.fire('foo') === false) {
 *   console.log('default has been prevented!');
 * };
 *
 *
 * // custom args + return value listener
 * eventBus.on('sum', function(event, a, b) {
 *   return a + b;
 * });
 *
 * // you can pass custom arguments + retrieve result values.
 * var sum = eventBus.fire('sum', 1, 2);
 * console.log(sum); // 3
 * ```
 */
function EventBus() {
  this._listeners = {};

  // cleanup on destroy on lowest priority to allow
  // message passing until the bitter end
  this.on('diagram.destroy', 1, this._destroy, this);
}

/**
 * Register an event listener for events with the given name.
 *
 * The callback will be invoked with `event, ...additionalArguments`
 * that have been passed to {@link EventBus#fire}.
 *
 * Returning false from a listener will prevent the events default action
 * (if any is specified). To stop an event from being processed further in
 * other listeners execute {@link Event#stopPropagation}.
 *
 * Returning anything but `undefined` from a listener will stop the listener propagation.
 *
 * @param {String|Array<String>} events
 * @param {Number} [priority=1000] the priority in which this listener is called, larger is higher
 * @param {Function} callback
 * @param {Object} [that] Pass context (`this`) to the callback
 */
EventBus.prototype.on = function (events, priority, callback, that) {

  events = (0, _minDash.isArray)(events) ? events : [events];

  if ((0, _minDash.isFunction)(priority)) {
    that = callback;
    callback = priority;
    priority = DEFAULT_PRIORITY;
  }

  if (!(0, _minDash.isNumber)(priority)) {
    throw new Error('priority must be a number');
  }

  var actualCallback = callback;

  if (that) {
    actualCallback = (0, _minDash.bind)(callback, that);

    // make sure we remember and are able to remove
    // bound callbacks via {@link #off} using the original
    // callback
    actualCallback[FN_REF] = callback[FN_REF] || callback;
  }

  var self = this;

  events.forEach(function (e) {
    self._addListener(e, {
      priority: priority,
      callback: actualCallback,
      next: null
    });
  });
};

/**
 * Register an event listener that is executed only once.
 *
 * @param {String} event the event name to register for
 * @param {Function} callback the callback to execute
 * @param {Object} [that] Pass context (`this`) to the callback
 */
EventBus.prototype.once = function (event, priority, callback, that) {
  var self = this;

  if ((0, _minDash.isFunction)(priority)) {
    that = callback;
    callback = priority;
    priority = DEFAULT_PRIORITY;
  }

  if (!(0, _minDash.isNumber)(priority)) {
    throw new Error('priority must be a number');
  }

  function wrappedCallback() {
    var result = callback.apply(that, arguments);

    self.off(event, wrappedCallback);

    return result;
  }

  // make sure we remember and are able to remove
  // bound callbacks via {@link #off} using the original
  // callback
  wrappedCallback[FN_REF] = callback;

  this.on(event, priority, wrappedCallback);
};

/**
 * Removes event listeners by event and callback.
 *
 * If no callback is given, all listeners for a given event name are being removed.
 *
 * @param {String|Array<String>} events
 * @param {Function} [callback]
 */
EventBus.prototype.off = function (events, callback) {

  events = (0, _minDash.isArray)(events) ? events : [events];

  var self = this;

  events.forEach(function (event) {
    self._removeListener(event, callback);
  });
};

/**
 * Create an EventBus event.
 *
 * @param {Object} data
 *
 * @return {Object} event, recognized by the eventBus
 */
EventBus.prototype.createEvent = function (data) {
  var event = new InternalEvent();

  event.init(data);

  return event;
};

/**
 * Fires a named event.
 *
 * @example
 *
 * // fire event by name
 * events.fire('foo');
 *
 * // fire event object with nested type
 * var event = { type: 'foo' };
 * events.fire(event);
 *
 * // fire event with explicit type
 * var event = { x: 10, y: 20 };
 * events.fire('element.moved', event);
 *
 * // pass additional arguments to the event
 * events.on('foo', function(event, bar) {
 *   alert(bar);
 * });
 *
 * events.fire({ type: 'foo' }, 'I am bar!');
 *
 * @param {String} [name] the optional event name
 * @param {Object} [event] the event object
 * @param {...Object} additional arguments to be passed to the callback functions
 *
 * @return {Boolean} the events return value, if specified or false if the
 *                   default action was prevented by listeners
 */
EventBus.prototype.fire = function (type, data) {

  var event, firstListener, returnValue, args;

  args = slice.call(arguments);

  if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object') {
    event = type;
    type = event.type;
  }

  if (!type) {
    throw new Error('no event type specified');
  }

  firstListener = this._listeners[type];

  if (!firstListener) {
    return;
  }

  // we make sure we fire instances of our home made
  // events here. We wrap them only once, though
  if (data instanceof InternalEvent) {
    // we are fine, we alread have an event
    event = data;
  } else {
    event = this.createEvent(data);
  }

  // ensure we pass the event as the first parameter
  args[0] = event;

  // original event type (in case we delegate)
  var originalType = event.type;

  // update event type before delegation
  if (type !== originalType) {
    event.type = type;
  }

  try {
    returnValue = this._invokeListeners(event, args, firstListener);
  } finally {
    // reset event type after delegation
    if (type !== originalType) {
      event.type = originalType;
    }
  }

  // set the return value to false if the event default
  // got prevented and no other return value exists
  if (returnValue === undefined && event.defaultPrevented) {
    returnValue = false;
  }

  return returnValue;
};

EventBus.prototype.handleError = function (error) {
  return this.fire('error', { error: error }) === false;
};

EventBus.prototype._destroy = function () {
  this._listeners = {};
};

EventBus.prototype._invokeListeners = function (event, args, listener) {

  var returnValue;

  while (listener) {

    // handle stopped propagation
    if (event.cancelBubble) {
      break;
    }

    returnValue = this._invokeListener(event, args, listener);

    listener = listener.next;
  }

  return returnValue;
};

EventBus.prototype._invokeListener = function (event, args, listener) {

  var returnValue;

  try {
    // returning false prevents the default action
    returnValue = invokeFunction(listener.callback, args);

    // stop propagation on return value
    if (returnValue !== undefined) {
      event.returnValue = returnValue;
      event.stopPropagation();
    }

    // prevent default on return false
    if (returnValue === false) {
      event.preventDefault();
    }
  } catch (e) {
    if (!this.handleError(e)) {
      console.error('unhandled error in event listener');
      console.error(e.stack);

      throw e;
    }
  }

  return returnValue;
};

/*
 * Add new listener with a certain priority to the list
 * of listeners (for the given event).
 *
 * The semantics of listener registration / listener execution are
 * first register, first serve: New listeners will always be inserted
 * after existing listeners with the same priority.
 *
 * Example: Inserting two listeners with priority 1000 and 1300
 *
 *    * before: [ 1500, 1500, 1000, 1000 ]
 *    * after: [ 1500, 1500, (new=1300), 1000, 1000, (new=1000) ]
 *
 * @param {String} event
 * @param {Object} listener { priority, callback }
 */
EventBus.prototype._addListener = function (event, newListener) {

  var listener = this._getListeners(event),
      previousListener;

  // no prior listeners
  if (!listener) {
    this._setListeners(event, newListener);

    return;
  }

  // ensure we order listeners by priority from
  // 0 (high) to n > 0 (low)
  while (listener) {

    if (listener.priority < newListener.priority) {

      newListener.next = listener;

      if (previousListener) {
        previousListener.next = newListener;
      } else {
        this._setListeners(event, newListener);
      }

      return;
    }

    previousListener = listener;
    listener = listener.next;
  }

  // add new listener to back
  previousListener.next = newListener;
};

EventBus.prototype._getListeners = function (name) {
  return this._listeners[name];
};

EventBus.prototype._setListeners = function (name, listener) {
  this._listeners[name] = listener;
};

EventBus.prototype._removeListener = function (event, callback) {

  var listener = this._getListeners(event),
      nextListener,
      previousListener,
      listenerCallback;

  if (!callback) {
    // clear listeners
    this._setListeners(event, null);

    return;
  }

  while (listener) {

    nextListener = listener.next;

    listenerCallback = listener.callback;

    if (listenerCallback === callback || listenerCallback[FN_REF] === callback) {
      if (previousListener) {
        previousListener.next = nextListener;
      } else {
        // new first listener
        this._setListeners(event, nextListener);
      }
    }

    previousListener = listener;
    listener = nextListener;
  }
};

/**
 * A event that is emitted via the event bus.
 */
function InternalEvent() {}

InternalEvent.prototype.stopPropagation = function () {
  this.cancelBubble = true;
};

InternalEvent.prototype.preventDefault = function () {
  this.defaultPrevented = true;
};

InternalEvent.prototype.init = function (data) {
  (0, _minDash.assign)(this, data || {});
};

/**
 * Invoke function. Be fast...
 *
 * @param {Function} fn
 * @param {Array<Object>} args
 *
 * @return {Any}
 */
function invokeFunction(fn, args) {
  return fn.apply(null, args);
}

},{"min-dash":108}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GraphicsFactory;

var _minDash = require('min-dash');

var _GraphicsUtil = require('../util/GraphicsUtil');

var _SvgTransformUtil = require('../util/SvgTransformUtil');

var _minDom = require('min-dom');

var _tinySvg = require('tiny-svg');

/**
 * A factory that creates graphical elements
 *
 * @param {EventBus} eventBus
 * @param {ElementRegistry} elementRegistry
 */
function GraphicsFactory(eventBus, elementRegistry) {
  this._eventBus = eventBus;
  this._elementRegistry = elementRegistry;
}

GraphicsFactory.$inject = ['eventBus', 'elementRegistry'];

GraphicsFactory.prototype._getChildren = function (element) {

  var gfx = this._elementRegistry.getGraphics(element);

  var childrenGfx;

  // root element
  if (!element.parent) {
    childrenGfx = gfx;
  } else {
    childrenGfx = (0, _GraphicsUtil.getChildren)(gfx);
    if (!childrenGfx) {
      childrenGfx = (0, _tinySvg.create)('g');
      (0, _tinySvg.classes)(childrenGfx).add('djs-children');

      (0, _tinySvg.append)(gfx.parentNode, childrenGfx);
    }
  }

  return childrenGfx;
};

/**
 * Clears the graphical representation of the element and returns the
 * cleared visual (the <g class="djs-visual" /> element).
 */
GraphicsFactory.prototype._clear = function (gfx) {
  var visual = (0, _GraphicsUtil.getVisual)(gfx);

  (0, _minDom.clear)(visual);

  return visual;
};

/**
 * Creates a gfx container for shapes and connections
 *
 * The layout is as follows:
 *
 * <g class="djs-group">
 *
 *   <!-- the gfx -->
 *   <g class="djs-element djs-(shape|connection)">
 *     <g class="djs-visual">
 *       <!-- the renderer draws in here -->
 *     </g>
 *
 *     <!-- extensions (overlays, click box, ...) goes here
 *   </g>
 *
 *   <!-- the gfx child nodes -->
 *   <g class="djs-children"></g>
 * </g>
 *
 * @param {Object} parent
 * @param {String} type the type of the element, i.e. shape | connection
 * @param {Number} [parentIndex] position to create container in parent
 */
GraphicsFactory.prototype._createContainer = function (type, childrenGfx, parentIndex) {
  var outerGfx = (0, _tinySvg.create)('g');
  (0, _tinySvg.classes)(outerGfx).add('djs-group');

  // insert node at position
  if (typeof parentIndex !== 'undefined') {
    prependTo(outerGfx, childrenGfx, childrenGfx.childNodes[parentIndex]);
  } else {
    (0, _tinySvg.append)(childrenGfx, outerGfx);
  }

  var gfx = (0, _tinySvg.create)('g');
  (0, _tinySvg.classes)(gfx).add('djs-element');
  (0, _tinySvg.classes)(gfx).add('djs-' + type);

  (0, _tinySvg.append)(outerGfx, gfx);

  // create visual
  var visual = (0, _tinySvg.create)('g');
  (0, _tinySvg.classes)(visual).add('djs-visual');

  (0, _tinySvg.append)(gfx, visual);

  return gfx;
};

GraphicsFactory.prototype.create = function (type, element, parentIndex) {
  var childrenGfx = this._getChildren(element.parent);
  return this._createContainer(type, childrenGfx, parentIndex);
};

GraphicsFactory.prototype.updateContainments = function (elements) {

  var self = this,
      elementRegistry = this._elementRegistry,
      parents;

  parents = (0, _minDash.reduce)(elements, function (map, e) {

    if (e.parent) {
      map[e.parent.id] = e.parent;
    }

    return map;
  }, {});

  // update all parents of changed and reorganized their children
  // in the correct order (as indicated in our model)
  (0, _minDash.forEach)(parents, function (parent) {

    var children = parent.children;

    if (!children) {
      return;
    }

    var childGfx = self._getChildren(parent);

    (0, _minDash.forEach)(children.slice().reverse(), function (c) {
      var gfx = elementRegistry.getGraphics(c);

      prependTo(gfx.parentNode, childGfx);
    });
  });
};

GraphicsFactory.prototype.drawShape = function (visual, element) {
  var eventBus = this._eventBus;

  return eventBus.fire('render.shape', { gfx: visual, element: element });
};

GraphicsFactory.prototype.getShapePath = function (element) {
  var eventBus = this._eventBus;

  return eventBus.fire('render.getShapePath', element);
};

GraphicsFactory.prototype.drawConnection = function (visual, element) {
  var eventBus = this._eventBus;

  return eventBus.fire('render.connection', { gfx: visual, element: element });
};

GraphicsFactory.prototype.getConnectionPath = function (waypoints) {
  var eventBus = this._eventBus;

  return eventBus.fire('render.getConnectionPath', waypoints);
};

GraphicsFactory.prototype.update = function (type, element, gfx) {
  // Do not update root element
  if (!element.parent) {
    return;
  }

  var visual = this._clear(gfx);

  // redraw
  if (type === 'shape') {
    this.drawShape(visual, element);

    // update positioning
    (0, _SvgTransformUtil.translate)(gfx, element.x, element.y);
  } else if (type === 'connection') {
    this.drawConnection(visual, element);
  } else {
    throw new Error('unknown type: ' + type);
  }

  if (element.hidden) {
    (0, _tinySvg.attr)(gfx, 'display', 'none');
  } else {
    (0, _tinySvg.attr)(gfx, 'display', 'block');
  }
};

GraphicsFactory.prototype.remove = function (element) {
  var gfx = this._elementRegistry.getGraphics(element);

  // remove
  (0, _tinySvg.remove)(gfx.parentNode);
};

// helpers //////////////////////

function prependTo(newNode, parentNode, siblingNode) {
  parentNode.insertBefore(newNode, siblingNode || parentNode.firstChild);
}

},{"../util/GraphicsUtil":97,"../util/SvgTransformUtil":105,"min-dash":108,"min-dom":109,"tiny-svg":114}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draw = require('../draw');

var _draw2 = _interopRequireDefault(_draw);

var _Canvas = require('./Canvas');

var _Canvas2 = _interopRequireDefault(_Canvas);

var _ElementRegistry = require('./ElementRegistry');

var _ElementRegistry2 = _interopRequireDefault(_ElementRegistry);

var _ElementFactory = require('./ElementFactory');

var _ElementFactory2 = _interopRequireDefault(_ElementFactory);

var _EventBus = require('./EventBus');

var _EventBus2 = _interopRequireDefault(_EventBus);

var _GraphicsFactory = require('./GraphicsFactory');

var _GraphicsFactory2 = _interopRequireDefault(_GraphicsFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  __depends__: [_draw2.default],
  __init__: ['canvas'],
  canvas: ['type', _Canvas2.default],
  elementRegistry: ['type', _ElementRegistry2.default],
  elementFactory: ['type', _ElementFactory2.default],
  eventBus: ['type', _EventBus2.default],
  graphicsFactory: ['type', _GraphicsFactory2.default]
};

},{"../draw":19,"./Canvas":10,"./ElementFactory":11,"./ElementRegistry":12,"./EventBus":13,"./GraphicsFactory":14}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BaseRenderer;
var DEFAULT_RENDER_PRIORITY = 1000;

/**
 * The base implementation of shape and connection renderers.
 *
 * @param {EventBus} eventBus
 * @param {Number} [renderPriority=1000]
 */
function BaseRenderer(eventBus, renderPriority) {
  var self = this;

  renderPriority = renderPriority || DEFAULT_RENDER_PRIORITY;

  eventBus.on(['render.shape', 'render.connection'], renderPriority, function (evt, context) {
    var type = evt.type,
        element = context.element,
        visuals = context.gfx;

    if (self.canRender(element)) {
      if (type === 'render.shape') {
        return self.drawShape(visuals, element);
      } else {
        return self.drawConnection(visuals, element);
      }
    }
  });

  eventBus.on(['render.getShapePath', 'render.getConnectionPath'], renderPriority, function (evt, element) {
    if (self.canRender(element)) {
      if (evt.type === 'render.getShapePath') {
        return self.getShapePath(element);
      } else {
        return self.getConnectionPath(element);
      }
    }
  });
}

/**
 * Should check whether *this* renderer can render
 * the element/connection.
 *
 * @param {element} element
 *
 * @returns {Boolean}
 */
BaseRenderer.prototype.canRender = function () {};

/**
 * Provides the shape's snap svg element to be drawn on the `canvas`.
 *
 * @param {djs.Graphics} visuals
 * @param {Shape} shape
 *
 * @returns {Snap.svg} [returns a Snap.svg paper element ]
 */
BaseRenderer.prototype.drawShape = function () {};

/**
 * Provides the shape's snap svg element to be drawn on the `canvas`.
 *
 * @param {djs.Graphics} visuals
 * @param {Connection} connection
 *
 * @returns {Snap.svg} [returns a Snap.svg paper element ]
 */
BaseRenderer.prototype.drawConnection = function () {};

/**
 * Gets the SVG path of a shape that represents it's visual bounds.
 *
 * @param {Shape} shape
 *
 * @return {string} svg path
 */
BaseRenderer.prototype.getShapePath = function () {};

/**
 * Gets the SVG path of a connection that represents it's visual bounds.
 *
 * @param {Connection} connection
 *
 * @return {string} svg path
 */
BaseRenderer.prototype.getConnectionPath = function () {};

},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DefaultRenderer;

var _inherits = require('inherits');

var _inherits2 = _interopRequireDefault(_inherits);

var _BaseRenderer = require('./BaseRenderer');

var _BaseRenderer2 = _interopRequireDefault(_BaseRenderer);

var _RenderUtil = require('../util/RenderUtil');

var _tinySvg = require('tiny-svg');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// apply default renderer with lowest possible priority
// so that it only kicks in if noone else could render
var DEFAULT_RENDER_PRIORITY = 1;

/**
 * The default renderer used for shapes and connections.
 *
 * @param {EventBus} eventBus
 * @param {Styles} styles
 */
function DefaultRenderer(eventBus, styles) {
  //
  _BaseRenderer2.default.call(this, eventBus, DEFAULT_RENDER_PRIORITY);

  this.CONNECTION_STYLE = styles.style(['no-fill'], { strokeWidth: 5, stroke: 'fuchsia' });
  this.SHAPE_STYLE = styles.style({ fill: 'white', stroke: 'fuchsia', strokeWidth: 2 });
}

(0, _inherits2.default)(DefaultRenderer, _BaseRenderer2.default);

DefaultRenderer.prototype.canRender = function () {
  return true;
};

DefaultRenderer.prototype.drawShape = function drawShape(visuals, element) {

  var rect = (0, _tinySvg.create)('rect');
  (0, _tinySvg.attr)(rect, {
    x: 0,
    y: 0,
    width: element.width || 0,
    height: element.height || 0
  });
  (0, _tinySvg.attr)(rect, this.SHAPE_STYLE);

  (0, _tinySvg.append)(visuals, rect);

  return rect;
};

DefaultRenderer.prototype.drawConnection = function drawConnection(visuals, connection) {

  var line = (0, _RenderUtil.createLine)(connection.waypoints, this.CONNECTION_STYLE);
  (0, _tinySvg.append)(visuals, line);

  return line;
};

DefaultRenderer.prototype.getShapePath = function getShapePath(shape) {

  var x = shape.x,
      y = shape.y,
      width = shape.width,
      height = shape.height;

  var shapePath = [['M', x, y], ['l', width, 0], ['l', 0, height], ['l', -width, 0], ['z']];

  return (0, _RenderUtil.componentsToPath)(shapePath);
};

DefaultRenderer.prototype.getConnectionPath = function getConnectionPath(connection) {
  var waypoints = connection.waypoints;

  var idx,
      point,
      connectionPath = [];

  for (idx = 0; point = waypoints[idx]; idx++) {

    // take invisible docking into account
    // when creating the path
    point = point.original || point;

    connectionPath.push([idx === 0 ? 'M' : 'L', point.x, point.y]);
  }

  return (0, _RenderUtil.componentsToPath)(connectionPath);
};

DefaultRenderer.$inject = ['eventBus', 'styles'];

},{"../util/RenderUtil":104,"./BaseRenderer":16,"inherits":107,"tiny-svg":114}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Styles;

var _minDash = require('min-dash');

/**
 * A component that manages shape styles
 */
function Styles() {

  var defaultTraits = {

    'no-fill': {
      fill: 'none'
    },
    'no-border': {
      strokeOpacity: 0.0
    },
    'no-events': {
      pointerEvents: 'none'
    }
  };

  var self = this;

  /**
   * Builds a style definition from a className, a list of traits and an object of additional attributes.
   *
   * @param  {String} className
   * @param  {Array<String>} traits
   * @param  {Object} additionalAttrs
   *
   * @return {Object} the style defintion
   */
  this.cls = function (className, traits, additionalAttrs) {
    var attrs = this.style(traits, additionalAttrs);

    return (0, _minDash.assign)(attrs, { 'class': className });
  };

  /**
   * Builds a style definition from a list of traits and an object of additional attributes.
   *
   * @param  {Array<String>} traits
   * @param  {Object} additionalAttrs
   *
   * @return {Object} the style defintion
   */
  this.style = function (traits, additionalAttrs) {

    if (!(0, _minDash.isArray)(traits) && !additionalAttrs) {
      additionalAttrs = traits;
      traits = [];
    }

    var attrs = (0, _minDash.reduce)(traits, function (attrs, t) {
      return (0, _minDash.assign)(attrs, defaultTraits[t] || {});
    }, {});

    return additionalAttrs ? (0, _minDash.assign)(attrs, additionalAttrs) : attrs;
  };

  this.computeStyle = function (custom, traits, defaultStyles) {
    if (!(0, _minDash.isArray)(traits)) {
      defaultStyles = traits;
      traits = [];
    }

    return self.style(traits || [], (0, _minDash.assign)({}, defaultStyles, custom || {}));
  };
}

},{"min-dash":108}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DefaultRenderer = require('./DefaultRenderer');

var _DefaultRenderer2 = _interopRequireDefault(_DefaultRenderer);

var _Styles = require('./Styles');

var _Styles2 = _interopRequireDefault(_Styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  __init__: ['defaultRenderer'],
  defaultRenderer: ['type', _DefaultRenderer2.default],
  styles: ['type', _Styles2.default]
};

},{"./DefaultRenderer":17,"./Styles":18}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ChangeSupport;

var _Elements = require('../../util/Elements');

/**
 * Adds change support to the diagram, including
 *
 * <ul>
 *   <li>redrawing shapes and connections on change</li>
 * </ul>
 *
 * @param {EventBus} eventBus
 * @param {Canvas} canvas
 * @param {ElementRegistry} elementRegistry
 * @param {GraphicsFactory} graphicsFactory
 */
function ChangeSupport(eventBus, canvas, elementRegistry, graphicsFactory) {

  // redraw shapes / connections on change

  eventBus.on('element.changed', function (event) {

    var element = event.element;

    // element might have been deleted and replaced by new element with same ID
    // thus check for parent of element except for root element
    if (element.parent || element === canvas.getRootElement()) {
      event.gfx = elementRegistry.getGraphics(element);
    }

    // shape + gfx may have been deleted
    if (!event.gfx) {
      return;
    }

    eventBus.fire((0, _Elements.getType)(element) + '.changed', event);
  });

  eventBus.on('elements.changed', function (event) {

    var elements = event.elements;

    elements.forEach(function (e) {
      eventBus.fire('element.changed', { element: e });
    });

    graphicsFactory.updateContainments(elements);
  });

  eventBus.on('shape.changed', function (event) {
    graphicsFactory.update('shape', event.element, event.gfx);
  });

  eventBus.on('connection.changed', function (event) {
    graphicsFactory.update('connection', event.element, event.gfx);
  });
}

ChangeSupport.$inject = ['eventBus', 'canvas', 'elementRegistry', 'graphicsFactory'];

},{"../../util/Elements":94}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ChangeSupport = require('./ChangeSupport');

var _ChangeSupport2 = _interopRequireDefault(_ChangeSupport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  __init__: ['changeSupport'],
  changeSupport: ['type', _ChangeSupport2.default]
};

},{"./ChangeSupport":20}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = Connect;

var _LayoutUtil = require('../../layout/LayoutUtil');

var _tinySvg = require('tiny-svg');

var MARKER_OK = 'connect-ok',
    MARKER_NOT_OK = 'connect-not-ok';

function Connect(eventBus, dragging, modeling, rules, canvas, graphicsFactory) {

  // TODO(nre): separate UI and events

  // rules

  function canConnect(source, target) {
    return rules.allowed('connection.create', {
      source: source,
      target: target
    });
  }

  // layouting

  function crop(start, end, source, target) {

    var sourcePath = graphicsFactory.getShapePath(source),
        targetPath = target && graphicsFactory.getShapePath(target),
        connectionPath = graphicsFactory.getConnectionPath({ waypoints: [start, end] });

    start = (0, _LayoutUtil.getElementLineIntersection)(sourcePath, connectionPath, true) || start;
    end = target && (0, _LayoutUtil.getElementLineIntersection)(targetPath, connectionPath, false) || end;

    return [start, end];
  }

  // event handlers

  eventBus.on('connect.move', function (event) {

    var context = event.context,
        source = context.source,
        target = context.target,
        visual = context.visual,
        sourcePosition = context.sourcePosition,
        endPosition,
        waypoints;

    // update connection visuals during drag

    endPosition = {
      x: event.x,
      y: event.y
    };

    waypoints = crop(sourcePosition, endPosition, source, target);

    (0, _tinySvg.attr)(visual, { 'points': [waypoints[0].x, waypoints[0].y, waypoints[1].x, waypoints[1].y] });
  });

  eventBus.on('connect.hover', function (event) {
    var context = event.context,
        source = context.source,
        hover = event.hover,
        canExecute;

    canExecute = context.canExecute = canConnect(source, hover);

    // simply ignore hover
    if (canExecute === null) {
      return;
    }

    context.target = hover;

    canvas.addMarker(hover, canExecute ? MARKER_OK : MARKER_NOT_OK);
  });

  eventBus.on(['connect.out', 'connect.cleanup'], function (event) {
    var context = event.context;

    if (context.target) {
      canvas.removeMarker(context.target, context.canExecute ? MARKER_OK : MARKER_NOT_OK);
    }

    context.target = null;
    context.canExecute = false;
  });

  eventBus.on('connect.cleanup', function (event) {
    var context = event.context;

    if (context.visual) {
      (0, _tinySvg.remove)(context.visual);
    }
  });

  eventBus.on('connect.start', function (event) {
    var context = event.context,
        visual;

    visual = (0, _tinySvg.create)('polyline');
    (0, _tinySvg.attr)(visual, {
      'stroke': '#333',
      'strokeDasharray': [1],
      'strokeWidth': 2,
      'pointer-events': 'none'
    });

    (0, _tinySvg.append)(canvas.getDefaultLayer(), visual);

    context.visual = visual;
  });

  eventBus.on('connect.end', function (event) {

    var context = event.context,
        source = context.source,
        sourcePosition = context.sourcePosition,
        target = context.target,
        targetPosition = {
      x: event.x,
      y: event.y
    },
        canExecute = context.canExecute || canConnect(source, target);

    if (!canExecute) {
      return false;
    }

    var attrs = null,
        hints = {
      connectionStart: sourcePosition,
      connectionEnd: targetPosition
    };

    if ((typeof canExecute === 'undefined' ? 'undefined' : _typeof(canExecute)) === 'object') {
      attrs = canExecute;
    }

    modeling.connect(source, target, attrs, hints);
  });

  // API

  /**
   * Start connect operation.
   *
   * @param {DOMEvent} event
   * @param {djs.model.Base} source
   * @param {Point} [sourcePosition]
   * @param {Boolean} [autoActivate=false]
   */
  this.start = function (event, source, sourcePosition, autoActivate) {

    if ((typeof sourcePosition === 'undefined' ? 'undefined' : _typeof(sourcePosition)) !== 'object') {
      autoActivate = sourcePosition;
      sourcePosition = (0, _LayoutUtil.getMid)(source);
    }

    dragging.init(event, 'connect', {
      autoActivate: autoActivate,
      data: {
        shape: source,
        context: {
          source: source,
          sourcePosition: sourcePosition
        }
      }
    });
  };
}

Connect.$inject = ['eventBus', 'dragging', 'modeling', 'rules', 'canvas', 'graphicsFactory'];

},{"../../layout/LayoutUtil":83,"tiny-svg":114}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _selection = require('../selection');

var _selection2 = _interopRequireDefault(_selection);

var _rules = require('../rules');

var _rules2 = _interopRequireDefault(_rules);

var _dragging = require('../dragging');

var _dragging2 = _interopRequireDefault(_dragging);

var _Connect = require('./Connect');

var _Connect2 = _interopRequireDefault(_Connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  __depends__: [_selection2.default, _rules2.default, _dragging2.default],
  connect: ['type', _Connect2.default]
};

},{"../dragging":30,"../rules":74,"../selection":78,"./Connect":22}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ContextPad;

var _minDash = require('min-dash');

var _minDom = require('min-dom');

var entrySelector = '.entry';

/**
 * A context pad that displays element specific, contextual actions next
 * to a diagram element.
 *
 * @param {Object} config
 * @param {Boolean|Object} [config.scale={ min: 1.0, max: 1.5 }]
 * @param {Number} [config.scale.min]
 * @param {Number} [config.scale.max]
 * @param {EventBus} eventBus
 * @param {Overlays} overlays
 */
function ContextPad(config, eventBus, overlays) {

  this._providers = [];

  this._eventBus = eventBus;
  this._overlays = overlays;

  var scale = (0, _minDash.isDefined)(config && config.scale) ? config.scale : {
    min: 1,
    max: 1.5
  };

  this._overlaysConfig = {
    position: {
      right: -9,
      top: -6
    },
    scale: scale
  };

  this._current = null;

  this._init();
}

ContextPad.$inject = ['config.contextPad', 'eventBus', 'overlays'];

/**
 * Registers events needed for interaction with other components
 */
ContextPad.prototype._init = function () {

  var eventBus = this._eventBus;

  var self = this;

  eventBus.on('selection.changed', function (e) {

    var selection = e.newSelection;

    if (selection.length === 1) {
      self.open(selection[0]);
    } else {
      self.close();
    }
  });

  eventBus.on('elements.delete', function (event) {
    var elements = event.elements;

    (0, _minDash.forEach)(elements, function (e) {
      if (self.isOpen(e)) {
        self.close();
      }
    });
  });

  eventBus.on('element.changed', function (event) {
    var element = event.element,
        current = self._current;

    // force reopen if element for which we are currently opened changed
    if (current && current.element === element) {
      self.open(element, true);
    }
  });
};

/**
 * Register a provider with the context pad
 *
 * @param  {ContextPadProvider} provider
 */
ContextPad.prototype.registerProvider = function (provider) {
  this._providers.push(provider);
};

/**
 * Returns the context pad entries for a given element
 *
 * @param {djs.element.Base} element
 *
 * @return {Array<ContextPadEntryDescriptor>} list of entries
 */
ContextPad.prototype.getEntries = function (element) {
  var entries = {};

  // loop through all providers and their entries.
  // group entries by id so that overriding an entry is possible
  (0, _minDash.forEach)(this._providers, function (provider) {
    var e = provider.getContextPadEntries(element);

    (0, _minDash.forEach)(e, function (entry, id) {
      entries[id] = entry;
    });
  });

  return entries;
};

/**
 * Trigger an action available on the opened context pad
 *
 * @param  {String} action
 * @param  {Event} event
 * @param  {Boolean} [autoActivate=false]
 */
ContextPad.prototype.trigger = function (action, event, autoActivate) {

  var element = this._current.element,
      entries = this._current.entries,
      entry,
      handler,
      originalEvent,
      button = event.delegateTarget || event.target;

  if (!button) {
    return event.preventDefault();
  }

  entry = entries[(0, _minDom.attr)(button, 'data-action')];
  handler = entry.action;

  originalEvent = event.originalEvent || event;

  // simple action (via callback function)
  if ((0, _minDash.isFunction)(handler)) {
    if (action === 'click') {
      return handler(originalEvent, element, autoActivate);
    }
  } else {
    if (handler[action]) {
      return handler[action](originalEvent, element, autoActivate);
    }
  }

  // silence other actions
  event.preventDefault();
};

/**
 * Open the context pad for the given element
 *
 * @param {djs.model.Base} element
 * @param {Boolean} force if true, force reopening the context pad
 */
ContextPad.prototype.open = function (element, force) {
  if (!force && this.isOpen(element)) {
    return;
  }

  this.close();
  this._updateAndOpen(element);
};

ContextPad.prototype._updateAndOpen = function (element) {

  var entries = this.getEntries(element),
      pad = this.getPad(element),
      html = pad.html;

  (0, _minDash.forEach)(entries, function (entry, id) {
    var grouping = entry.group || 'default',
        control = (0, _minDom.domify)(entry.html || '<div class="entry" draggable="true"></div>'),
        container;

    (0, _minDom.attr)(control, 'data-action', id);

    container = (0, _minDom.query)('[data-group=' + grouping + ']', html);
    if (!container) {
      container = (0, _minDom.domify)('<div class="group" data-group="' + grouping + '"></div>');
      html.appendChild(container);
    }

    container.appendChild(control);

    if (entry.className) {
      addClasses(control, entry.className);
    }

    if (entry.title) {
      (0, _minDom.attr)(control, 'title', entry.title);
    }

    if (entry.imageUrl) {
      control.appendChild((0, _minDom.domify)('<img src="' + entry.imageUrl + '">'));
    }
  });

  (0, _minDom.classes)(html).add('open');

  this._current = {
    element: element,
    pad: pad,
    entries: entries
  };

  this._eventBus.fire('contextPad.open', { current: this._current });
};

ContextPad.prototype.getPad = function (element) {
  if (this.isOpen()) {
    return this._current.pad;
  }

  var self = this;

  var overlays = this._overlays;

  var html = (0, _minDom.domify)('<div class="djs-context-pad"></div>');

  var overlaysConfig = (0, _minDash.assign)({
    html: html
  }, this._overlaysConfig);

  _minDom.delegate.bind(html, entrySelector, 'click', function (event) {
    self.trigger('click', event);
  });

  _minDom.delegate.bind(html, entrySelector, 'dragstart', function (event) {
    self.trigger('dragstart', event);
  });

  // stop propagation of mouse events
  _minDom.event.bind(html, 'mousedown', function (event) {
    event.stopPropagation();
  });

  this._overlayId = overlays.add(element, 'context-pad', overlaysConfig);

  var pad = overlays.get(this._overlayId);

  this._eventBus.fire('contextPad.create', { element: element, pad: pad });

  return pad;
};

/**
 * Close the context pad
 */
ContextPad.prototype.close = function () {
  if (!this.isOpen()) {
    return;
  }

  this._overlays.remove(this._overlayId);

  this._overlayId = null;

  this._eventBus.fire('contextPad.close', { current: this._current });

  this._current = null;
};

/**
 * Check if pad is open. If element is given, will check
 * if pad is opened with given element.
 *
 * @param {Element} element
 * @return {Boolean}
 */
ContextPad.prototype.isOpen = function (element) {
  return !!this._current && (!element ? true : this._current.element === element);
};

// helpers //////////////////////

function addClasses(element, classNames) {

  var classes = (0, _minDom.classes)(element);

  var actualClassNames = (0, _minDash.isArray)(classNames) ? classNames : classNames.split(/\s+/g);
  actualClassNames.forEach(function (cls) {
    classes.add(cls);
  });
}

},{"min-dash":108,"min-dom":109}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _interactionEvents = require('../interaction-events');

var _interactionEvents2 = _interopRequireDefault(_interactionEvents);

var _overlays = require('../overlays');

var _overlays2 = _interopRequireDefault(_overlays);

var _ContextPad = require('./ContextPad');

var _ContextPad2 = _interopRequireDefault(_ContextPad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  __depends__: [_interactionEvents2.default, _overlays2.default],
  contextPad: ['type', _ContextPad2.default]
};

},{"../interaction-events":32,"../overlays":67,"./ContextPad":24}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Create;

var _tinySvg = require('tiny-svg');

var _SvgTransformUtil = require('../../util/SvgTransformUtil');

var LOW_PRIORITY = 750;

var MARKER_OK = 'drop-ok',
    MARKER_NOT_OK = 'drop-not-ok',
    MARKER_ATTACH = 'attach-ok',
    MARKER_NEW_PARENT = 'new-parent';

/**
 * Adds the ability to create new shapes via drag and drop.
 *
 * Create must be activated via {@link Create#start}. From that
 * point on, create will invoke `shape.create` and `shape.attach`
 * rules to query whether or not creation or attachment on a certain
 * position is allowed.
 *
 * If create or attach is allowed and a source is given, Create it
 * will invoke `connection.create` rules to query whether a connection
 * can be drawn between source and new shape. During rule evaluation
 * the target is not attached yet, however
 *
 *   hints = { targetParent, targetAttach }
 *
 * are passed to the evaluating rules.
 *
 *
 * ## Rule Return Values
 *
 * Return values interpreted from  `shape.create`:
 *
 *   * `true`: create is allowed
 *   * `false`: create is disallowed
 *   * `null`: create is not allowed but should be ignored visually
 *
 * Return values interpreted from `shape.attach`:
 *
 *   * `true`: attach is allowed
 *   * `Any`: attach is allowed with the constraints
 *   * `false`: attach is disallowed
 *
 * Return values interpreted from `connection.create`:
 *
 *   * `true`: connection can be created
 *   * `Any`: connection with the given attributes can be created
 *   * `false`: connection can't be created
 *
 *
 * @param {EventBus} eventBus
 * @param {Dragging} dragging
 * @param {Rules} rules
 * @param {Modeling} modeling
 * @param {Canvas} canvas
 * @param {Styles} styles
 * @param {GraphicsFactory} graphicsFactory
 */
function Create(eventBus, dragging, rules, modeling, canvas, styles, graphicsFactory) {

  // rules

  function canCreate(shape, target, source, position) {

    if (!target) {
      return false;
    }

    var ctx = {
      source: source,
      shape: shape,
      target: target,
      position: position
    };

    var create, attach, connect;

    attach = rules.allowed('shape.attach', ctx);

    if (!attach) {
      create = rules.allowed('shape.create', ctx);
    }

    if (create || attach) {

      connect = source && rules.allowed('connection.create', {
        source: source,
        target: shape,
        hints: {
          targetParent: target,
          targetAttach: attach
        }
      });
    }

    if (create || attach) {
      return {
        attach: attach,
        connect: connect
      };
    }

    return false;
  }

  /** set drop marker on an element */
  function setMarker(element, marker) {

    [MARKER_ATTACH, MARKER_OK, MARKER_NOT_OK, MARKER_NEW_PARENT].forEach(function (m) {

      if (m === marker) {
        canvas.addMarker(element, m);
      } else {
        canvas.removeMarker(element, m);
      }
    });
  }

  // visual helpers

  function createVisual(shape) {
    var group, preview, visual;

    group = (0, _tinySvg.create)('g');
    (0, _tinySvg.attr)(group, styles.cls('djs-drag-group', ['no-events']));

    (0, _tinySvg.append)(canvas.getDefaultLayer(), group);

    preview = (0, _tinySvg.create)('g');
    (0, _tinySvg.classes)(preview).add('djs-dragger');

    (0, _tinySvg.append)(group, preview);

    (0, _SvgTransformUtil.translate)(preview, shape.width / -2, shape.height / -2);

    var visualGroup = (0, _tinySvg.create)('g');
    (0, _tinySvg.classes)(visualGroup).add('djs-visual');

    (0, _tinySvg.append)(preview, visualGroup);

    visual = visualGroup;

    // hijack renderer to draw preview
    graphicsFactory.drawShape(visual, shape);

    return group;
  }

  // event handlers

  eventBus.on('create.move', function (event) {

    var context = event.context,
        hover = event.hover,
        shape = context.shape,
        source = context.source,
        canExecute;

    var position = {
      x: event.x,
      y: event.y
    };

    canExecute = context.canExecute = hover && canCreate(shape, hover, source, position);

    // ignore hover visually if canExecute is null
    if (hover && canExecute !== null) {
      context.target = hover;

      if (canExecute && canExecute.attach) {
        setMarker(hover, MARKER_ATTACH);
      } else {
        setMarker(hover, canExecute ? MARKER_NEW_PARENT : MARKER_NOT_OK);
      }
    }
  });

  eventBus.on('create.move', LOW_PRIORITY, function (event) {

    var context = event.context,
        shape = context.shape,
        visual = context.visual;

    // lazy init drag visual once we received the first real
    // drag move event (this allows us to get the proper canvas local coordinates)
    if (!visual) {
      visual = context.visual = createVisual(shape);
    }

    (0, _SvgTransformUtil.translate)(visual, event.x, event.y);
  });

  eventBus.on(['create.end', 'create.out', 'create.cleanup'], function (event) {
    var context = event.context,
        target = context.target;

    if (target) {
      setMarker(target, null);
    }
  });

  eventBus.on('create.end', function (event) {
    var context = event.context,
        source = context.source,
        shape = context.shape,
        target = context.target,
        canExecute = context.canExecute,
        attach = canExecute && canExecute.attach,
        connect = canExecute && canExecute.connect,
        position = {
      x: event.x,
      y: event.y
    };

    if (!canExecute) {
      return false;
    }

    if (connect) {
      // invoke append if connect is set via rules
      shape = modeling.appendShape(source, shape, position, target, {
        attach: attach,
        connection: connect === true ? {} : connect
      });
    } else {
      // invoke create, if connect is not set
      shape = modeling.createShape(shape, position, target, {
        attach: attach
      });
    }

    // make sure we provide the actual attached
    // shape with the context so that selection and
    // other components can use it right after the create
    // operation ends
    context.shape = shape;
  });

  eventBus.on('create.cleanup', function (event) {
    var context = event.context;

    if (context.visual) {
      (0, _tinySvg.remove)(context.visual);
    }
  });

  // API

  this.start = function (event, shape, source) {

    dragging.init(event, 'create', {
      cursor: 'grabbing',
      autoActivate: true,
      data: {
        shape: shape,
        context: {
          shape: shape,
          source: source
        }
      }
    });
  };
}

Create.$inject = ['eventBus', 'dragging', 'rules', 'modeling', 'canvas', 'styles', 'graphicsFactory'];

},{"../../util/SvgTransformUtil":105,"tiny-svg":114}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dragging = require('../dragging');

var _dragging2 = _interopRequireDefault(_dragging);

var _selection = require('../selection');

var _selection2 = _interopRequireDefault(_selection);

var _rules = require('../rules');

var _rules2 = _interopRequireDefault(_rules);

var _Create = require('./Create');

var _Create2 = _interopRequireDefault(_Create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  __depends__: [_dragging2.default, _selection2.default, _rules2.default],
  create: ['type', _Create2.default]
};

},{"../dragging":30,"../rules":74,"../selection":78,"./Create":26}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Dragging;

var _minDash = require('min-dash');

var _minDom = require('min-dom');

var _Event = require('../../util/Event');

var _Cursor = require('../../util/Cursor');

var _ClickTrap = require('../../util/ClickTrap');

var _PositionUtil = require('../../util/PositionUtil');

/* global TouchEvent */

var round = Math.round;

var DRAG_ACTIVE_CLS = 'djs-drag-active';

function preventDefault(event) {
  event.preventDefault();
}

function isTouchEvent(event) {
  // check for TouchEvent being available first
  // (i.e. not available on desktop Firefox)
  return typeof TouchEvent !== 'undefined' && event instanceof TouchEvent;
}

function getLength(point) {
  return Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2));
}

/**
 * A helper that fires canvas localized drag events and realizes
 * the general "drag-and-drop" look and feel.
 *
 * Calling {@link Dragging#activate} activates dragging on a canvas.
 *
 * It provides the following:
 *
 *   * emits life cycle events, namespaced with a prefix assigned
 *     during dragging activation
 *   * sets and restores the cursor
 *   * sets and restores the selection
 *   * ensures there can be only one drag operation active at a time
 *
 * Dragging may be canceled manually by calling {@link Dragging#cancel}
 * or by pressing ESC.
 *
 *
 * ## Life-cycle events
 *
 * Dragging can be in three different states, off, initialized
 * and active.
 *
 * (1) off: no dragging operation is in progress
 * (2) initialized: a new drag operation got initialized but not yet
 *                  started (i.e. because of no initial move)
 * (3) started: dragging is in progress
 *
 * Eventually dragging will be off again after a drag operation has
 * been ended or canceled via user click or ESC key press.
 *
 * To indicate transitions between these states dragging emits generic
 * life-cycle events with the `drag.` prefix _and_ events namespaced
 * to a prefix choosen by a user during drag initialization.
 *
 * The following events are emitted (appropriately prefixed) via
 * the {@link EventBus}.
 *
 * * `init`
 * * `start`
 * * `move`
 * * `end`
 * * `ended` (dragging already in off state)
 * * `cancel` (only if previously started)
 * * `canceled` (dragging already in off state, only if previously started)
 * * `cleanup`
 *
 *
 * @example
 *
 * function MyDragComponent(eventBus, dragging) {
 *
 *   eventBus.on('mydrag.start', function(event) {
 *     console.log('yes, we start dragging');
 *   });
 *
 *   eventBus.on('mydrag.move', function(event) {
 *     console.log('canvas local coordinates', event.x, event.y, event.dx, event.dy);
 *
 *     // local drag data is passed with the event
 *     event.context.foo; // "BAR"
 *
 *     // the original mouse event, too
 *     event.originalEvent; // MouseEvent(...)
 *   });
 *
 *   eventBus.on('element.click', function(event) {
 *     dragging.init(event, 'mydrag', {
 *       cursor: 'grabbing',
 *       data: {
 *         context: {
 *           foo: "BAR"
 *         }
 *       }
 *     });
 *   });
 * }
 */
function Dragging(eventBus, canvas, selection) {

  var defaultOptions = {
    threshold: 5,
    trapClick: true
  };

  // the currently active drag operation
  // dragging is active as soon as this context exists.
  //
  // it is visually _active_ only when a context.active flag is set to true.
  var context;

  /* convert a global event into local coordinates */
  function toLocalPoint(globalPosition) {

    var viewbox = canvas.viewbox();

    var clientRect = canvas._container.getBoundingClientRect();

    return {
      x: viewbox.x + (globalPosition.x - clientRect.left) / viewbox.scale,
      y: viewbox.y + (globalPosition.y - clientRect.top) / viewbox.scale
    };
  }

  // helpers

  function fire(type, dragContext) {
    dragContext = dragContext || context;

    var event = eventBus.createEvent((0, _minDash.assign)({}, dragContext.payload, dragContext.data, { isTouch: dragContext.isTouch }));

    // default integration
    if (eventBus.fire('drag.' + type, event) === false) {
      return false;
    }

    return eventBus.fire(dragContext.prefix + '.' + type, event);
  }

  // event listeners

  function move(event, activate) {
    var payload = context.payload,
        displacement = context.displacement;

    var globalStart = context.globalStart,
        globalCurrent = (0, _Event.toPoint)(event),
        globalDelta = (0, _PositionUtil.delta)(globalCurrent, globalStart);

    var localStart = context.localStart,
        localCurrent = toLocalPoint(globalCurrent),
        localDelta = (0, _PositionUtil.delta)(localCurrent, localStart);

    // activate context explicitly or once threshold is reached
    if (!context.active && (activate || getLength(globalDelta) > context.threshold)) {

      // fire start event with original
      // starting coordinates

      (0, _minDash.assign)(payload, {
        x: round(localStart.x + displacement.x),
        y: round(localStart.y + displacement.y),
        dx: 0,
        dy: 0
      }, { originalEvent: event });

      if (false === fire('start')) {
        return cancel();
      }

      context.active = true;

      // unset selection and remember old selection
      // the previous (old) selection will always passed
      // with the event via the event.previousSelection property
      if (!context.keepSelection) {
        payload.previousSelection = selection.get();
        selection.select(null);
      }

      // allow custom cursor
      if (context.cursor) {
        (0, _Cursor.set)(context.cursor);
      }

      // indicate dragging via marker on root element
      canvas.addMarker(canvas.getRootElement(), DRAG_ACTIVE_CLS);
    }

    (0, _Event.stopPropagation)(event);

    if (context.active) {

      // update payload with actual coordinates
      (0, _minDash.assign)(payload, {
        x: round(localCurrent.x + displacement.x),
        y: round(localCurrent.y + displacement.y),
        dx: round(localDelta.x),
        dy: round(localDelta.y)
      }, { originalEvent: event });

      // emit move event
      fire('move');
    }
  }

  function end(event) {
    var previousContext,
        returnValue = true;

    if (context.active) {

      if (event) {
        context.payload.originalEvent = event;

        // suppress original event (click, ...)
        // because we just ended a drag operation
        (0, _Event.stopPropagation)(event);
      }

      // implementations may stop restoring the
      // original state (selections, ...) by preventing the
      // end events default action
      returnValue = fire('end');
    }

    if (returnValue === false) {
      fire('rejected');
    }

    previousContext = cleanup(returnValue !== true);

    // last event to be fired when all drag operations are done
    // at this point in time no drag operation is in progress anymore
    fire('ended', previousContext);
  }

  // cancel active drag operation if the user presses
  // the ESC key on the keyboard

  function checkCancel(event) {

    if (event.which === 27) {
      preventDefault(event);

      cancel();
    }
  }

  // prevent ghost click that might occur after a finished
  // drag and drop session

  function trapClickAndEnd(event) {

    var untrap;

    // trap the click in case we are part of an active
    // drag operation. This will effectively prevent
    // the ghost click that cannot be canceled otherwise.
    if (context.active) {

      untrap = (0, _ClickTrap.install)(eventBus);

      // remove trap after minimal delay
      setTimeout(untrap, 400);

      // prevent default action (click)
      preventDefault(event);
    }

    end(event);
  }

  function trapTouch(event) {
    move(event);
  }

  // update the drag events hover (djs.model.Base) and hoverGfx (Snap<SVGElement>)
  // properties during hover and out and fire {prefix}.hover and {prefix}.out properties
  // respectively

  function hover(event) {
    var payload = context.payload;

    payload.hoverGfx = event.gfx;
    payload.hover = event.element;

    fire('hover');
  }

  function out(event) {
    fire('out');

    var payload = context.payload;

    payload.hoverGfx = null;
    payload.hover = null;
  }

  // life-cycle methods

  function cancel(restore) {
    var previousContext;

    if (!context) {
      return;
    }

    var wasActive = context.active;

    if (wasActive) {
      fire('cancel');
    }

    previousContext = cleanup(restore);

    if (wasActive) {
      // last event to be fired when all drag operations are done
      // at this point in time no drag operation is in progress anymore
      fire('canceled', previousContext);
    }
  }

  function cleanup(restore) {
    var previousContext, endDrag;

    fire('cleanup');

    // reset cursor
    (0, _Cursor.unset)();

    if (context.trapClick) {
      endDrag = trapClickAndEnd;
    } else {
      endDrag = end;
    }

    // reset dom listeners
    _minDom.event.unbind(document, 'mousemove', move);

    _minDom.event.unbind(document, 'dragstart', preventDefault);
    _minDom.event.unbind(document, 'selectstart', preventDefault);

    _minDom.event.unbind(document, 'mousedown', endDrag, true);
    _minDom.event.unbind(document, 'mouseup', endDrag, true);

    _minDom.event.unbind(document, 'keyup', checkCancel);

    _minDom.event.unbind(document, 'touchstart', trapTouch, true);
    _minDom.event.unbind(document, 'touchcancel', cancel, true);
    _minDom.event.unbind(document, 'touchmove', move, true);
    _minDom.event.unbind(document, 'touchend', end, true);

    eventBus.off('element.hover', hover);
    eventBus.off('element.out', out);

    // remove drag marker on root element
    canvas.removeMarker(canvas.getRootElement(), DRAG_ACTIVE_CLS);

    // restore selection, unless it has changed
    var previousSelection = context.payload.previousSelection;

    if (restore !== false && previousSelection && !selection.get().length) {
      selection.select(previousSelection);
    }

    previousContext = context;

    context = null;

    return previousContext;
  }

  /**
   * Initialize a drag operation.
   *
   * If `localPosition` is given, drag events will be emitted
   * relative to it.
   *
   * @param {MouseEvent|TouchEvent} [event]
   * @param {Point} [localPosition] actual diagram local position this drag operation should start at
   * @param {String} prefix
   * @param {Object} [options]
   */
  function init(event, relativeTo, prefix, options) {

    // only one drag operation may be active, at a time
    if (context) {
      cancel(false);
    }

    if (typeof relativeTo === 'string') {
      options = prefix;
      prefix = relativeTo;
      relativeTo = null;
    }

    options = (0, _minDash.assign)({}, defaultOptions, options || {});

    var data = options.data || {},
        originalEvent,
        globalStart,
        localStart,
        endDrag,
        isTouch;

    if (options.trapClick) {
      endDrag = trapClickAndEnd;
    } else {
      endDrag = end;
    }

    if (event) {
      originalEvent = (0, _Event.getOriginal)(event) || event;
      globalStart = (0, _Event.toPoint)(event);

      (0, _Event.stopPropagation)(event);

      // prevent default browser dragging behavior
      if (originalEvent.type === 'dragstart') {
        preventDefault(originalEvent);
      }
    } else {
      originalEvent = null;
      globalStart = { x: 0, y: 0 };
    }

    localStart = toLocalPoint(globalStart);

    if (!relativeTo) {
      relativeTo = localStart;
    }

    isTouch = isTouchEvent(originalEvent);

    context = (0, _minDash.assign)({
      prefix: prefix,
      data: data,
      payload: {},
      globalStart: globalStart,
      displacement: (0, _PositionUtil.delta)(relativeTo, localStart),
      localStart: localStart,
      isTouch: isTouch
    }, options);

    // skip dom registration if trigger
    // is set to manual (during testing)
    if (!options.manual) {

      // add dom listeners

      if (isTouch) {
        _minDom.event.bind(document, 'touchstart', trapTouch, true);
        _minDom.event.bind(document, 'touchcancel', cancel, true);
        _minDom.event.bind(document, 'touchmove', move, true);
        _minDom.event.bind(document, 'touchend', end, true);
      } else {
        // assume we use the mouse to interact per default
        _minDom.event.bind(document, 'mousemove', move);

        // prevent default browser drag and text selection behavior
        _minDom.event.bind(document, 'dragstart', preventDefault);
        _minDom.event.bind(document, 'selectstart', preventDefault);

        _minDom.event.bind(document, 'mousedown', endDrag, true);
        _minDom.event.bind(document, 'mouseup', endDrag, true);
      }

      _minDom.event.bind(document, 'keyup', checkCancel);

      eventBus.on('element.hover', hover);
      eventBus.on('element.out', out);
    }

    fire('init');

    if (options.autoActivate) {
      move(event, true);
    }
  }

  // cancel on diagram destruction
  eventBus.on('diagram.destroy', cancel);

  // API

  this.init = init;
  this.move = move;
  this.hover = hover;
  this.out = out;
  this.end = end;

  this.cancel = cancel;

  // for introspection

  this.context = function () {
    return context;
  };

  this.setOptions = function (options) {
    (0, _minDash.assign)(defaultOptions, options);
  };
}

Dragging.$inject = ['eventBus', 'canvas', 'selection'];

},{"../../util/ClickTrap":91,"../../util/Cursor":93,"../../util/Event":95,"../../util/PositionUtil":102,"min-dash":108,"min-dom":109}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HoverFix;

var _minDom = require('min-dom');

var _Event = require('../../util/Event');

function getGfx(target) {
  var node = (0, _minDom.closest)(target, 'svg, .djs-element', true);
  return node;
}

/**
 * Browsers may swallow the hover event if users are to
 * fast with the mouse.
 *
 * @see http://stackoverflow.com/questions/7448468/why-cant-i-reliably-capture-a-mouseout-event
 *
 * The fix implemented in this component ensure that we
 * have a hover state after a successive drag.move event.
 *
 * @param {EventBus} eventBus
 * @param {Dragging} dragging
 * @param {ElementRegistry} elementRegistry
 */
function HoverFix(eventBus, dragging, elementRegistry) {

  var self = this;

  // we wait for a specific sequence of events before
  // emitting a fake drag.hover event.
  //
  // Event Sequence:
  //
  // drag.start
  // drag.move
  // drag.move >> ensure we are hovering
  //
  eventBus.on('drag.start', function (event) {

    eventBus.once('drag.move', function () {

      eventBus.once('drag.move', function (event) {

        self.ensureHover(event);
      });
    });
  });

  /**
   * Make sure we are god damn hovering!
   *
   * @param {Event} dragging event
   */
  this.ensureHover = function (event) {

    if (event.hover) {
      return;
    }

    var originalEvent = event.originalEvent,
        position,
        target,
        element,
        gfx;

    if (!(originalEvent instanceof MouseEvent)) {
      return;
    }

    position = (0, _Event.toPoint)(originalEvent);

    // damn expensive operation, ouch!
    target = document.elementFromPoint(position.x, position.y);

    gfx = getGfx(target);

    if (gfx) {
      element = elementRegistry.get(gfx);

      dragging.hover({ element: element, gfx: gfx });
    }
  };
}

HoverFix.$inject = ['eventBus', 'dragging', 'elementRegistry'];

},{"../../util/Event":95,"min-dom":109}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _selection = require('../selection');

var _selection2 = _interopRequireDefault(_selection);

var _Dragging = require('./Dragging');

var _Dragging2 = _interopRequireDefault(_Dragging);

var _HoverFix = require('./HoverFix');

var _HoverFix2 = _interopRequireDefault(_HoverFix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  __init__: ['hoverFix'],
  __depends__: [_selection2.default],
  dragging: ['type', _Dragging2.default],
  hoverFix: ['type', _HoverFix2.default]
};

},{"../selection":78,"./Dragging":28,"./HoverFix":29}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = InteractionEvents;

var _minDash = require('min-dash');

var _minDom = require('min-dom');

var _Mouse = require('../../util/Mouse');

var _tinySvg = require('tiny-svg');

var _RenderUtil = require('../../util/RenderUtil');

function allowAll(e) {
  return true;
}

var LOW_PRIORITY = 500;

/**
 * A plugin that provides interaction events for diagram elements.
 *
 * It emits the following events:
 *
 *   * element.hover
 *   * element.out
 *   * element.click
 *   * element.dblclick
 *   * element.mousedown
 *   * element.contextmenu
 *
 * Each event is a tuple { element, gfx, originalEvent }.
 *
 * Canceling the event via Event#preventDefault()
 * prevents the original DOM operation.
 *
 * @param {EventBus} eventBus
 */
function InteractionEvents(eventBus, elementRegistry, styles) {

  var HIT_STYLE = styles.cls('djs-hit', ['no-fill', 'no-border'], {
    stroke: 'white',
    strokeWidth: 15
  });

  /**
   * Fire an interaction event.
   *
   * @param {String} type local event name, e.g. element.click.
   * @param {DOMEvent} event native event
   * @param {djs.model.Base} [element] the diagram element to emit the event on;
   *                                   defaults to the event target
   */
  function fire(type, event, element) {

    if (isIgnored(type, event)) {
      return;
    }

    var target, gfx, returnValue;

    if (!element) {
      target = event.delegateTarget || event.target;

      if (target) {
        gfx = target;
        element = elementRegistry.get(gfx);
      }
    } else {
      gfx = elementRegistry.getGraphics(element);
    }

    if (!gfx || !element) {
      return;
    }

    returnValue = eventBus.fire(type, {
      element: element,
      gfx: gfx,
      originalEvent: event
    });

    if (returnValue === false) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  // TODO(nikku): document this
  var handlers = {};

  function mouseHandler(localEventName) {
    return handlers[localEventName];
  }

  function isIgnored(localEventName, event) {

    var filter = ignoredFilters[localEventName] || _Mouse.isPrimaryButton;

    // only react on left mouse button interactions
    // except for interaction events that are enabled
    // for secundary mouse button
    return !filter(event);
  }

  var bindings = {
    mouseover: 'element.hover',
    mouseout: 'element.out',
    click: 'element.click',
    dblclick: 'element.dblclick',
    mousedown: 'element.mousedown',
    mouseup: 'element.mouseup',
    contextmenu: 'element.contextmenu'
  };

  var ignoredFilters = {
    'element.contextmenu': allowAll
  };

  // manual event trigger

  /**
   * Trigger an interaction event (based on a native dom event)
   * on the target shape or connection.
   *
   * @param {String} eventName the name of the triggered DOM event
   * @param {MouseEvent} event
   * @param {djs.model.Base} targetElement
   */
  function triggerMouseEvent(eventName, event, targetElement) {

    // i.e. element.mousedown...
    var localEventName = bindings[eventName];

    if (!localEventName) {
      throw new Error('unmapped DOM event name <' + eventName + '>');
    }

    return fire(localEventName, event, targetElement);
  }

  var elementSelector = 'svg, .djs-element';

  // event registration

  function registerEvent(node, event, localEvent, ignoredFilter) {

    var handler = handlers[localEvent] = function (event) {
      fire(localEvent, event);
    };

    if (ignoredFilter) {
      ignoredFilters[localEvent] = ignoredFilter;
    }

    handler.$delegate = _minDom.delegate.bind(node, elementSelector, event, handler);
  }

  function unregisterEvent(node, event, localEvent) {

    var handler = mouseHandler(localEvent);

    if (!handler) {
      return;
    }

    _minDom.delegate.unbind(node, event, handler.$delegate);
  }

  function registerEvents(svg) {
    (0, _minDash.forEach)(bindings, function (val, key) {
      registerEvent(svg, key, val);
    });
  }

  function unregisterEvents(svg) {
    (0, _minDash.forEach)(bindings, function (val, key) {
      unregisterEvent(svg, key, val);
    });
  }

  eventBus.on('canvas.destroy', function (event) {
    unregisterEvents(event.svg);
  });

  eventBus.on('canvas.init', function (event) {
    registerEvents(event.svg);
  });

  eventBus.on(['shape.added', 'connection.added'], function (event) {
    var element = event.element,
        gfx = event.gfx,
        hit;

    if (element.waypoints) {
      hit = (0, _RenderUtil.createLine)(element.waypoints);
    } else {
      hit = (0, _tinySvg.create)('rect');
      (0, _tinySvg.attr)(hit, {
        x: 0,
        y: 0,
        width: element.width,
        height: element.height
      });
    }

    (0, _tinySvg.attr)(hit, HIT_STYLE);

    (0, _tinySvg.append)(gfx, hit);
  });

  // Update djs-hit on change.
  // A low priortity is necessary, because djs-hit of labels has to be updated
  // after the label bounds have been updated in the renderer.
  eventBus.on('shape.changed', LOW_PRIORITY, function (event) {

    var element = event.element,
        gfx = event.gfx,
        hit = (0, _minDom.query)('.djs-hit', gfx);

    (0, _tinySvg.attr)(hit, {
      width: element.width,
      height: element.height
    });
  });

  eventBus.on('connection.changed', function (event) {

    var element = event.element,
        gfx = event.gfx,
        hit = (0, _minDom.query)('.djs-hit', gfx);

    (0, _RenderUtil.updateLine)(hit, element.waypoints);
  });

  // API

  this.fire = fire;

  this.triggerMouseEvent = triggerMouseEvent;

  this.mouseHandler = mouseHandler;

  this.registerEvent = registerEvent;
  this.unregisterEvent = unregisterEvent;
}

InteractionEvents.$inject = ['eventBus', 'elementRegistry', 'styles'];

/**
 * An event indicating that the mouse hovered over an element
 *
 * @event element.hover
 *
 * @type {Object}
 * @property {djs.model.Base} element
 * @property {SVGElement} gfx
 * @property {Event} originalEvent
 */

/**
 * An event indicating that the mouse has left an element
 *
 * @event element.out
 *
 * @type {Object}
 * @property {djs.model.Base} element
 * @property {SVGElement} gfx
 * @property {Event} originalEvent
 */

/**
 * An event indicating that the mouse has clicked an element
 *
 * @event element.click
 *
 * @type {Object}
 * @property {djs.model.Base} element
 * @property {SVGElement} gfx
 * @property {Event} originalEvent
 */

/**
 * An event indicating that the mouse has double clicked an element
 *
 * @event element.dblclick
 *
 * @type {Object}
 * @property {djs.model.Base} element
 * @property {SVGElement} gfx
 * @property {Event} originalEvent
 */

/**
 * An event indicating that the mouse has gone down on an element.
 *
 * @event element.mousedown
 *
 * @type {Object}
 * @property {djs.model.Base} element
 * @property {SVGElement} gfx
 * @property {Event} originalEvent
 */

/**
 * An event indicating that the mouse has gone up on an element.
 *
 * @event element.mouseup
 *
 * @type {Object}
 * @property {djs.model.Base} element
 * @property {SVGElement} gfx
 * @property {Event} originalEvent
 */

/**
 * An event indicating that the context menu action is triggered
 * via mouse or touch controls.
 *
 * @event element.contextmenu
 *
 * @type {Object}
 * @property {djs.model.Base} element
 * @property {SVGElement} gfx
 * @property {Event} originalEvent
 */

},{"../../util/Mouse":100,"../../util/RenderUtil":104,"min-dash":108,"min-dom":109,"tiny-svg":114}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _InteractionEvents = require('./InteractionEvents');

var _InteractionEvents2 = _interopRequireDefault(_InteractionEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  __init__: ['interactionEvents'],
  interactionEvents: ['type', _InteractionEvents2.default]
};

},{"./InteractionEvents":31}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LassoTool;

var _minDash = require('min-dash');

var _Elements = require('../../util/Elements');

var _Mouse = require('../../util/Mouse');

var _tinySvg = require('tiny-svg');

var LASSO_TOOL_CURSOR = 'crosshair';

function LassoTool(eventBus, canvas, dragging, elementRegistry, selection, toolManager) {

  this._selection = selection;
  this._dragging = dragging;

  var self = this;

  // lasso visuals implementation

  /**
  * A helper that realizes the selection box visual
  */
  var visuals = {

    create: function create(context) {
      var container = canvas.getDefaultLayer(),
          frame;

      frame = context.frame = (0, _tinySvg.create)('rect');
      (0, _tinySvg.attr)(frame, {
        class: 'djs-lasso-overlay',
        width: 1,
        height: 1,
        x: 0,
        y: 0
      });

      (0, _tinySvg.append)(container, frame);
    },

    update: function update(context) {
      var frame = context.frame,
          bbox = context.bbox;

      (0, _tinySvg.attr)(frame, {
        x: bbox.x,
        y: bbox.y,
        width: bbox.width,
        height: bbox.height
      });
    },

    remove: function remove(context) {

      if (context.frame) {
        (0, _tinySvg.remove)(context.frame);
      }
    }
  };

  toolManager.registerTool('lasso', {
    tool: 'lasso.selection',
    dragging: 'lasso'
  });

  eventBus.on('lasso.selection.end', function (event) {
    var target = event.originalEvent.target;

    // only reactive on diagram click
    // on some occasions, event.hover is not set and we have to check if the target is an svg
    if (!event.hover && !(target instanceof SVGElement)) {
      return;
    }

    eventBus.once('lasso.selection.ended', function () {
      self.activateLasso(event.originalEvent, true);
    });
  });

  // lasso interaction implementation

  eventBus.on('lasso.end', function (event) {

    var bbox = toBBox(event);

    var elements = elementRegistry.filter(function (element) {
      return element;
    });

    self.select(elements, bbox);
  });

  eventBus.on('lasso.start', function (event) {

    var context = event.context;

    context.bbox = toBBox(event);
    visuals.create(context);
  });

  eventBus.on('lasso.move', function (event) {

    var context = event.context;

    context.bbox = toBBox(event);
    visuals.update(context);
  });

  eventBus.on('lasso.cleanup', function (event) {

    var context = event.context;

    visuals.remove(context);
  });

  // event integration

  eventBus.on('element.mousedown', 1500, function (event) {

    if ((0, _Mouse.hasSecondaryModifier)(event)) {
      self.activateLasso(event.originalEvent);

      // we've handled the event
      return true;
    }
  });
}

LassoTool.$inject = ['eventBus', 'canvas', 'dragging', 'elementRegistry', 'selection', 'toolManager'];

LassoTool.prototype.activateLasso = function (event, autoActivate) {

  this._dragging.init(event, 'lasso', {
    autoActivate: autoActivate,
    cursor: LASSO_TOOL_CURSOR,
    data: {
      context: {}
    }
  });
};

LassoTool.prototype.activateSelection = function (event) {

  this._dragging.init(event, 'lasso.selection', {
    trapClick: false,
    cursor: LASSO_TOOL_CURSOR,
    data: {
      context: {}
    }
  });
};

LassoTool.prototype.select = function (elements, bbox) {
  var selectedElements = (0, _Elements.getEnclosedElements)(elements, bbox);

  this._selection.select((0, _minDash.values)(selectedElements));
};

LassoTool.prototype.toggle = function () {
  if (this.isActive()) {
    this._dragging.cancel();
  } else {
    this.activateSelection();
  }
};

LassoTool.prototype.isActive = function () {
  var context = this._dragging.context();

  return context && /^lasso/.test(context.prefix);
};

function toBBox(event) {

  var start = {

    x: event.x - event.dx,
    y: event.y - event.dy
  };

  var end = {
    x: event.x,
    y: event.y
  };

  var bbox;

  if (start.x <= end.x && start.y < end.y || start.x < end.x && start.y <= end.y) {

    bbox = {
      x: start.x,
      y: start.y,
      width: end.x - start.x,
      height: end.y - start.y
    };
  } else if (start.x >= end.x && start.y < end.y || start.x > end.x && start.y <= end.y) {

    bbox = {
      x: end.x,
      y: start.y,
      width: start.x - end.x,
      height: end.y - start.y
    };
  } else if (start.x <= end.x && start.y > end.y || start.x < end.x && start.y >= end.y) {

    bbox = {
      x: start.x,
      y: end.y,
      width: end.x - start.x,
      height: start.y - end.y
    };
  } else if (start.x >= end.x && start.y > end.y || start.x > end.x && start.y >= end.y) {

    bbox = {
      x: end.x,
      y: end.y,
      width: start.x - end.x,
      height: start.y - end.y
    };
  } else {

    bbox = {
      x: end.x,
      y: end.y,
      width: 0,
      height: 0
    };
  }
  return bbox;
}

},{"../../util/Elements":94,"../../util/Mouse":100,"min-dash":108,"tiny-svg":114}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toolManager = require('../tool-manager');

var _toolManager2 = _interopRequireDefault(_toolManager);

var _LassoTool = require('./LassoTool');

var _LassoTool2 = _interopRequireDefault(_LassoTool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  __depends__: [_toolManager2.default],
  __init__: ['lassoTool'],
  lassoTool: ['type', _LassoTool2.default]
};

},{"../tool-manager":81,"./LassoTool":33}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = Modeling;

var _minDash = require('min-dash');

var _model = require('../../model');

var _AppendShapeHandler = require('./cmd/AppendShapeHandler');

var _AppendShapeHandler2 = _interopRequireDefault(_AppendShapeHandler);

var _CreateShapeHandler = require('./cmd/CreateShapeHandler');

var _CreateShapeHandler2 = _interopRequireDefault(_CreateShapeHandler);

var _DeleteShapeHandler = require('./cmd/DeleteShapeHandler');

var _DeleteShapeHandler2 = _interopRequireDefault(_DeleteShapeHandler);

var _MoveShapeHandler = require('./cmd/MoveShapeHandler');

var _MoveShapeHandler2 = _interopRequireDefault(_MoveShapeHandler);

var _ResizeShapeHandler = require('./cmd/ResizeShapeHandler');

var _ResizeShapeHandler2 = _interopRequireDefault(_ResizeShapeHandler);

var _ReplaceShapeHandler = require('./cmd/ReplaceShapeHandler');

var _ReplaceShapeHandler2 = _interopRequireDefault(_ReplaceShapeHandler);

var _ToggleShapeCollapseHandler = require('./cmd/ToggleShapeCollapseHandler');

var _ToggleShapeCollapseHandler2 = _interopRequireDefault(_ToggleShapeCollapseHandler);

var _SpaceToolHandler = require('./cmd/SpaceToolHandler');

var _SpaceToolHandler2 = _interopRequireDefault(_SpaceToolHandler);

var _CreateLabelHandler = require('./cmd/CreateLabelHandler');

var _CreateLabelHandler2 = _interopRequireDefault(_CreateLabelHandler);

var _CreateConnectionHandler = require('./cmd/CreateConnectionHandler');

var _CreateConnectionHandler2 = _interopRequireDefault(_CreateConnectionHandler);

var _DeleteConnectionHandler = require('./cmd/DeleteConnectionHandler');

var _DeleteConnectionHandler2 = _interopRequireDefault(_DeleteConnectionHandler);

var _MoveConnectionHandler = require('./cmd/MoveConnectionHandler');

var _MoveConnectionHandler2 = _interopRequireDefault(_MoveConnectionHandler);

var _LayoutConnectionHandler = require('./cmd/LayoutConnectionHandler');

var _LayoutConnectionHandler2 = _interopRequireDefault(_LayoutConnectionHandler);

var _UpdateWaypointsHandler = require('./cmd/UpdateWaypointsHandler');

var _UpdateWaypointsHandler2 = _interopRequireDefault(_UpdateWaypointsHandler);

var _ReconnectConnectionHandler = require('./cmd/ReconnectConnectionHandler');

var _ReconnectConnectionHandler2 = _interopRequireDefault(_ReconnectConnectionHandler);

var _MoveElementsHandler = require('./cmd/MoveElementsHandler');

var _MoveElementsHandler2 = _interopRequireDefault(_MoveElementsHandler);

var _DeleteElementsHandler = require('./cmd/DeleteElementsHandler');

var _DeleteElementsHandler2 = _interopRequireDefault(_DeleteElementsHandler);

var _DistributeElementsHandler = require('./cmd/DistributeElementsHandler');

var _DistributeElementsHandler2 = _interopRequireDefault(_DistributeElementsHandler);

var _AlignElementsHandler = require('./cmd/AlignElementsHandler');

var _AlignElementsHandler2 = _interopRequireDefault(_AlignElementsHandler);

var _UpdateAttachmentHandler = require('./cmd/UpdateAttachmentHandler');

var _UpdateAttachmentHandler2 = _interopRequireDefault(_UpdateAttachmentHandler);

var _PasteHandler = require('./cmd/PasteHandler');

var _PasteHandler2 = _interopRequireDefault(_PasteHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The basic modeling entry point.
 *
 * @param {EventBus} eventBus
 * @param {ElementFactory} elementFactory
 * @param {CommandStack} commandStack
 */
function Modeling(eventBus, elementFactory, commandStack) {
  this._eventBus = eventBus;
  this._elementFactory = elementFactory;
  this._commandStack = commandStack;

  var self = this;

  eventBus.on('diagram.init', function () {
    // register modeling handlers
    self.registerHandlers(commandStack);
  });
}

Modeling.$inject = ['eventBus', 'elementFactory', 'commandStack'];

Modeling.prototype.getHandlers = function () {
  return {
    'shape.append': _AppendShapeHandler2.default,
    'shape.create': _CreateShapeHandler2.default,
    'shape.delete': _DeleteShapeHandler2.default,
    'shape.move': _MoveShapeHandler2.default,
    'shape.resize': _ResizeShapeHandler2.default,
    'shape.replace': _ReplaceShapeHandler2.default,
    'shape.toggleCollapse': _ToggleShapeCollapseHandler2.default,

    'spaceTool': _SpaceToolHandler2.default,

    'label.create': _CreateLabelHandler2.default,

    'connection.create': _CreateConnectionHandler2.default,
    'connection.delete': _DeleteConnectionHandler2.default,
    'connection.move': _MoveConnectionHandler2.default,
    'connection.layout': _LayoutConnectionHandler2.default,

    'connection.updateWaypoints': _UpdateWaypointsHandler2.default,

    'connection.reconnectStart': _ReconnectConnectionHandler2.default,
    'connection.reconnectEnd': _ReconnectConnectionHandler2.default,

    'elements.move': _MoveElementsHandler2.default,
    'elements.delete': _DeleteElementsHandler2.default,

    'elements.distribute': _DistributeElementsHandler2.default,
    'elements.align': _AlignElementsHandler2.default,

    'element.updateAttachment': _UpdateAttachmentHandler2.default,

    'elements.paste': _PasteHandler2.default
  };
};

/**
 * Register handlers with the command stack
 *
 * @param {CommandStack} commandStack
 */
Modeling.prototype.registerHandlers = function (commandStack) {
  (0, _minDash.forEach)(this.getHandlers(), function (handler, id) {
    commandStack.registerHandler(id, handler);
  });
};

// modeling helpers //////////////////////

Modeling.prototype.moveShape = function (shape, delta, newParent, newParentIndex, hints) {

  if ((typeof newParentIndex === 'undefined' ? 'undefined' : _typeof(newParentIndex)) === 'object') {
    hints = newParentIndex;
    newParentIndex = null;
  }

  var context = {
    shape: shape,
    delta: delta,
    newParent: newParent,
    newParentIndex: newParentIndex,
    hints: hints || {}
  };

  this._commandStack.execute('shape.move', context);
};

/**
 * Update the attachment of the given shape.
 *
 * @param {djs.mode.Base} shape
 * @param {djs.model.Base} [newHost]
 */
Modeling.prototype.updateAttachment = function (shape, newHost) {
  var context = {
    shape: shape,
    newHost: newHost
  };

  this._commandStack.execute('element.updateAttachment', context);
};

/**
 * Move a number of shapes to a new target, either setting it as
 * the new parent or attaching it.
 *
 * @param {Array<djs.mode.Base>} shapes
 * @param {Point} delta
 * @param {djs.model.Base} [target]
 * @param {Object} [hints]
 * @param {Boolean} [hints.attach=false]
 */
Modeling.prototype.moveElements = function (shapes, delta, target, hints) {

  hints = hints || {};

  var attach = hints.attach;

  var newParent = target,
      newHost;

  if (attach === true) {
    newHost = target;
    newParent = target.parent;
  } else if (attach === false) {
    newHost = null;
  }

  var context = {
    shapes: shapes,
    delta: delta,
    newParent: newParent,
    newHost: newHost,
    hints: hints
  };

  this._commandStack.execute('elements.move', context);
};

Modeling.prototype.moveConnection = function (connection, delta, newParent, newParentIndex, hints) {

  if ((typeof newParentIndex === 'undefined' ? 'undefined' : _typeof(newParentIndex)) === 'object') {
    hints = newParentIndex;
    newParentIndex = undefined;
  }

  var context = {
    connection: connection,
    delta: delta,
    newParent: newParent,
    newParentIndex: newParentIndex,
    hints: hints || {}
  };

  this._commandStack.execute('connection.move', context);
};

Modeling.prototype.layoutConnection = function (connection, hints) {
  var context = {
    connection: connection,
    hints: hints || {}
  };

  this._commandStack.execute('connection.layout', context);
};

/**
 * Create connection.
 *
 * @param {djs.model.Base} source
 * @param {djs.model.Base} target
 * @param {Number} [targetIndex]
 * @param {Object|djs.model.Connection} connection
 * @param {djs.model.Base} parent
 * @param {Object} hints
 *
 * @return {djs.model.Connection} the created connection.
 */
Modeling.prototype.createConnection = function (source, target, parentIndex, connection, parent, hints) {

  if ((typeof parentIndex === 'undefined' ? 'undefined' : _typeof(parentIndex)) === 'object') {
    hints = parent;
    parent = connection;
    connection = parentIndex;
    parentIndex = undefined;
  }

  connection = this._create('connection', connection);

  var context = {
    source: source,
    target: target,
    parent: parent,
    parentIndex: parentIndex,
    connection: connection,
    hints: hints
  };

  this._commandStack.execute('connection.create', context);

  return context.connection;
};

/**
 * Create a shape at the specified position.
 *
 * @param {djs.model.Shape|Object} shape
 * @param {Point} position
 * @param {djs.model.Shape|djs.model.Root} target
 * @param {Number} [parentIndex] position in parents children list
 * @param {Object} [hints]
 * @param {Boolean} [hints.attach] whether to attach to target or become a child
 *
 * @return {djs.model.Shape} the created shape
 */
Modeling.prototype.createShape = function (shape, position, target, parentIndex, hints) {

  if (typeof parentIndex !== 'number') {
    hints = parentIndex;
    parentIndex = undefined;
  }

  hints = hints || {};

  var attach = hints.attach,
      parent,
      host;

  shape = this._create('shape', shape);

  if (attach) {
    parent = target.parent;
    host = target;
  } else {
    parent = target;
  }

  var context = {
    position: position,
    shape: shape,
    parent: parent,
    parentIndex: parentIndex,
    host: host,
    hints: hints
  };

  this._commandStack.execute('shape.create', context);

  return context.shape;
};

Modeling.prototype.createLabel = function (labelTarget, position, label, parent) {

  label = this._create('label', label);

  var context = {
    labelTarget: labelTarget,
    position: position,
    parent: parent || labelTarget.parent,
    shape: label
  };

  this._commandStack.execute('label.create', context);

  return context.shape;
};

/**
 * Append shape to given source, drawing a connection
 * between source and the newly created shape.
 *
 * @param {djs.model.Shape} source
 * @param {djs.model.Shape|Object} shape
 * @param {Point} position
 * @param {djs.model.Shape} target
 * @param {Object} [hints]
 * @param {Boolean} [hints.attach]
 * @param {djs.model.Connection|Object} [hints.connection]
 * @param {djs.model.Base} [hints.connectionParent]
 *
 * @return {djs.model.Shape} the newly created shape
 */
Modeling.prototype.appendShape = function (source, shape, position, target, hints) {

  hints = hints || {};

  shape = this._create('shape', shape);

  var context = {
    source: source,
    position: position,
    target: target,
    shape: shape,
    connection: hints.connection,
    connectionParent: hints.connectionParent,
    attach: hints.attach
  };

  this._commandStack.execute('shape.append', context);

  return context.shape;
};

Modeling.prototype.removeElements = function (elements) {
  var context = {
    elements: elements
  };

  this._commandStack.execute('elements.delete', context);
};

Modeling.prototype.distributeElements = function (groups, axis, dimension) {
  var context = {
    groups: groups,
    axis: axis,
    dimension: dimension
  };

  this._commandStack.execute('elements.distribute', context);
};

Modeling.prototype.removeShape = function (shape, hints) {
  var context = {
    shape: shape,
    hints: hints || {}
  };

  this._commandStack.execute('shape.delete', context);
};

Modeling.prototype.removeConnection = function (connection, hints) {
  var context = {
    connection: connection,
    hints: hints || {}
  };

  this._commandStack.execute('connection.delete', context);
};

Modeling.prototype.replaceShape = function (oldShape, newShape, hints) {
  var context = {
    oldShape: oldShape,
    newData: newShape,
    hints: hints || {}
  };

  this._commandStack.execute('shape.replace', context);

  return context.newShape;
};

Modeling.prototype.pasteElements = function (tree, topParent, position) {
  var context = {
    tree: tree,
    topParent: topParent,
    position: position
  };

  this._commandStack.execute('elements.paste', context);
};

Modeling.prototype.alignElements = function (elements, alignment) {
  var context = {
    elements: elements,
    alignment: alignment
  };

  this._commandStack.execute('elements.align', context);
};

Modeling.prototype.resizeShape = function (shape, newBounds, minBounds) {
  var context = {
    shape: shape,
    newBounds: newBounds,
    minBounds: minBounds
  };

  this._commandStack.execute('shape.resize', context);
};

Modeling.prototype.createSpace = function (movingShapes, resizingShapes, delta, direction) {
  var context = {
    movingShapes: movingShapes,
    resizingShapes: resizingShapes,
    delta: delta,
    direction: direction
  };

  this._commandStack.execute('spaceTool', context);
};

Modeling.prototype.updateWaypoints = function (connection, newWaypoints, hints) {
  var context = {
    connection: connection,
    newWaypoints: newWaypoints,
    hints: hints || {}
  };

  this._commandStack.execute('connection.updateWaypoints', context);
};

Modeling.prototype.reconnectStart = function (connection, newSource, dockingOrPoints) {
  var context = {
    connection: connection,
    newSource: newSource,
    dockingOrPoints: dockingOrPoints
  };

  this._commandStack.execute('connection.reconnectStart', context);
};

Modeling.prototype.reconnectEnd = function (connection, newTarget, dockingOrPoints) {
  var context = {
    connection: connection,
    newTarget: newTarget,
    dockingOrPoints: dockingOrPoints
  };

  this._commandStack.execute('connection.reconnectEnd', context);
};

Modeling.prototype.connect = function (source, target, attrs, hints) {
  return this.createConnection(source, target, attrs || {}, source.parent, hints);
};

Modeling.prototype._create = function (type, attrs) {
  if (attrs instanceof _model.Base) {
    return attrs;
  } else {
    return this._elementFactory.create(type, attrs);
  }
};

Modeling.prototype.toggleCollapse = function (shape, hints) {
  var context = {
    shape: shape,
    hints: hints || {}
  };

  this._commandStack.execute('shape.toggleCollapse', context);
};

},{"../../model":84,"./cmd/AlignElementsHandler":36,"./cmd/AppendShapeHandler":37,"./cmd/CreateConnectionHandler":38,"./cmd/CreateLabelHandler":39,"./cmd/CreateShapeHandler":40,"./cmd/DeleteConnectionHandler":41,"./cmd/DeleteElementsHandler":42,"./cmd/DeleteShapeHandler":43,"./cmd/DistributeElementsHandler":44,"./cmd/LayoutConnectionHandler":45,"./cmd/MoveConnectionHandler":46,"./cmd/MoveElementsHandler":47,"./cmd/MoveShapeHandler":48,"./cmd/PasteHandler":49,"./cmd/ReconnectConnectionHandler":50,"./cmd/ReplaceShapeHandler":51,"./cmd/ResizeShapeHandler":52,"./cmd/SpaceToolHandler":53,"./cmd/ToggleShapeCollapseHandler":54,"./cmd/UpdateAttachmentHandler":55,"./cmd/UpdateWaypointsHandler":56,"min-dash":108}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AlignElements;

var _minDash = require('min-dash');

/**
 * A handler that align elements in a certain way.
 *
 */
function AlignElements(modeling, canvas) {
  this._modeling = modeling;
  this._canvas = canvas;
}

AlignElements.$inject = ['modeling', 'canvas'];

AlignElements.prototype.preExecute = function (context) {
  var modeling = this._modeling;

  var elements = context.elements,
      alignment = context.alignment;

  (0, _minDash.forEach)(elements, function (element) {
    var delta = {
      x: 0,
      y: 0
    };

    if (alignment.left) {
      delta.x = alignment.left - element.x;
    } else if (alignment.right) {
      delta.x = alignment.right - element.width - element.x;
    } else if (alignment.center) {
      delta.x = alignment.center - Math.round(element.width / 2) - element.x;
    } else if (alignment.top) {
      delta.y = alignment.top - element.y;
    } else if (alignment.bottom) {
      delta.y = alignment.bottom - element.height - element.y;
    } else if (alignment.middle) {
      delta.y = alignment.middle - Math.round(element.height / 2) - element.y;
    }

    modeling.moveElements([element], delta, element.parent);
  });
};

AlignElements.prototype.postExecute = function (context) {};

},{"min-dash":108}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AppendShapeHandler;

var _minDash = require('min-dash');

/**
 * A handler that implements reversible appending of shapes
 * to a source shape.
 *
 * @param {canvas} Canvas
 * @param {elementFactory} ElementFactory
 * @param {modeling} Modeling
 */
function AppendShapeHandler(modeling) {
  this._modeling = modeling;
}

AppendShapeHandler.$inject = ['modeling'];

// api //////////////////////


/**
 * Creates a new shape
 *
 * @param {Object} context
 * @param {ElementDescriptor} context.shape the new shape
 * @param {ElementDescriptor} context.source the source object
 * @param {ElementDescriptor} context.parent the parent object
 * @param {Point} context.position position of the new element
 */
AppendShapeHandler.prototype.preExecute = function (context) {

  var source = context.source;

  if (!source) {
    throw new Error('source required');
  }

  var target = context.target || source.parent,
      shape = context.shape;

  shape = context.shape = this._modeling.createShape(shape, context.position, target, { attach: context.attach });

  context.shape = shape;
};

AppendShapeHandler.prototype.postExecute = function (context) {
  var parent = context.connectionParent || context.shape.parent;

  if (!existsConnection(context.source, context.shape)) {

    // create connection
    this._modeling.connect(context.source, context.shape, context.connection, parent);
  }
};

function existsConnection(source, target) {
  return (0, _minDash.some)(source.outgoing, function (c) {
    return c.target === target;
  });
}

},{"min-dash":108}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CreateConnectionHandler;
function CreateConnectionHandler(canvas, layouter) {
  this._canvas = canvas;
  this._layouter = layouter;
}

CreateConnectionHandler.$inject = ['canvas', 'layouter'];

// api //////////////////////


/**
 * Appends a shape to a target shape
 *
 * @param {Object} context
 * @param {djs.element.Base} context.source the source object
 * @param {djs.element.Base} context.target the parent object
 * @param {Point} context.position position of the new element
 */
CreateConnectionHandler.prototype.execute = function (context) {

  var connection = context.connection,
      source = context.source,
      target = context.target,
      parent = context.parent,
      parentIndex = context.parentIndex,
      hints = context.hints;

  if (!source || !target) {
    throw new Error('source and target required');
  }

  if (!parent) {
    throw new Error('parent required');
  }

  connection.source = source;
  connection.target = target;

  if (!connection.waypoints) {
    connection.waypoints = this._layouter.layoutConnection(connection, hints);
  }

  // add connection
  this._canvas.addConnection(connection, parent, parentIndex);

  return connection;
};

CreateConnectionHandler.prototype.revert = function (context) {
  var connection = context.connection;

  this._canvas.removeConnection(connection);

  connection.source = null;
  connection.target = null;
};

},{}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CreateLabelHandler;

var _inherits = require('inherits');

var _inherits2 = _interopRequireDefault(_inherits);

var _CreateShapeHandler = require('./CreateShapeHandler');

var _CreateShapeHandler2 = _interopRequireDefault(_CreateShapeHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A handler that attaches a label to a given target shape.
 *
 * @param {Canvas} canvas
 */
function CreateLabelHandler(canvas) {
  _CreateShapeHandler2.default.call(this, canvas);
}

(0, _inherits2.default)(CreateLabelHandler, _CreateShapeHandler2.default);

CreateLabelHandler.$inject = ['canvas'];

// api //////////////////////


var originalExecute = _CreateShapeHandler2.default.prototype.execute;

/**
 * Appends a label to a target shape.
 *
 * @method CreateLabelHandler#execute
 *
 * @param {Object} context
 * @param {ElementDescriptor} context.target the element the label is attached to
 * @param {ElementDescriptor} context.parent the parent object
 * @param {Point} context.position position of the new element
 */
CreateLabelHandler.prototype.execute = function (context) {

  var label = context.shape;

  ensureValidDimensions(label);

  label.labelTarget = context.labelTarget;

  return originalExecute.call(this, context);
};

var originalRevert = _CreateShapeHandler2.default.prototype.revert;

/**
 * Undo append by removing the shape
 */
CreateLabelHandler.prototype.revert = function (context) {
  context.shape.labelTarget = null;

  return originalRevert.call(this, context);
};

// helpers //////////////////////

function ensureValidDimensions(label) {
  // make sure a label has valid { width, height } dimensions
  ['width', 'height'].forEach(function (prop) {
    if (typeof label[prop] === 'undefined') {
      label[prop] = 0;
    }
  });
}

},{"./CreateShapeHandler":40,"inherits":107}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CreateShapeHandler;

var _minDash = require('min-dash');

var round = Math.round;

/**
 * A handler that implements reversible addition of shapes.
 *
 * @param {canvas} Canvas
 */
function CreateShapeHandler(canvas) {
  this._canvas = canvas;
}

CreateShapeHandler.$inject = ['canvas'];

// api //////////////////////


/**
 * Appends a shape to a target shape
 *
 * @param {Object} context
 * @param {djs.model.Base} context.parent the parent object
 * @param {Point} context.position position of the new element
 */
CreateShapeHandler.prototype.execute = function (context) {

  var shape = context.shape,
      positionOrBounds = context.position,
      parent = context.parent,
      parentIndex = context.parentIndex;

  if (!parent) {
    throw new Error('parent required');
  }

  if (!positionOrBounds) {
    throw new Error('position required');
  }

  // (1) add at event center position _or_ at given bounds
  if (positionOrBounds.width !== undefined) {
    (0, _minDash.assign)(shape, positionOrBounds);
  } else {
    (0, _minDash.assign)(shape, {
      x: positionOrBounds.x - round(shape.width / 2),
      y: positionOrBounds.y - round(shape.height / 2)
    });
  }

  // (2) add to canvas
  this._canvas.addShape(shape, parent, parentIndex);

  return shape;
};

/**
 * Undo append by removing the shape
 */
CreateShapeHandler.prototype.revert = function (context) {

  // (3) remove form canvas
  this._canvas.removeShape(context.shape);
};

},{"min-dash":108}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DeleteConnectionHandler;

var _Collections = require('../../../util/Collections');

/**
 * A handler that implements reversible deletion of Connections.
 */
function DeleteConnectionHandler(canvas, modeling) {
  this._canvas = canvas;
  this._modeling = modeling;
}

DeleteConnectionHandler.$inject = ['canvas', 'modeling'];

DeleteConnectionHandler.prototype.execute = function (context) {

  var connection = context.connection,
      parent = connection.parent;

  context.parent = parent;

  // remember containment
  context.parentIndex = (0, _Collections.indexOf)(parent.children, connection);

  context.source = connection.source;
  context.target = connection.target;

  this._canvas.removeConnection(connection);

  connection.source = null;
  connection.target = null;

  return connection;
};

/**
 * Command revert implementation.
 */
DeleteConnectionHandler.prototype.revert = function (context) {

  var connection = context.connection,
      parent = context.parent,
      parentIndex = context.parentIndex;

  connection.source = context.source;
  connection.target = context.target;

  // restore containment
  (0, _Collections.add)(parent.children, connection, parentIndex);

  this._canvas.addConnection(connection, parent);

  return connection;
};

},{"../../../util/Collections":92}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DeleteElementsHandler;

var _minDash = require('min-dash');

function DeleteElementsHandler(modeling, elementRegistry) {
  this._modeling = modeling;
  this._elementRegistry = elementRegistry;
}

DeleteElementsHandler.$inject = ['modeling', 'elementRegistry'];

DeleteElementsHandler.prototype.postExecute = function (context) {

  var modeling = this._modeling,
      elementRegistry = this._elementRegistry,
      elements = context.elements;

  (0, _minDash.forEach)(elements, function (element) {

    // element may have been removed with previous
    // remove operations already (e.g. in case of nesting)
    if (!elementRegistry.get(element.id)) {
      return;
    }

    if (element.waypoints) {
      modeling.removeConnection(element);
    } else {
      modeling.removeShape(element);
    }
  });
};

},{"min-dash":108}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DeleteShapeHandler;

var _Collections = require('../../../util/Collections');

var _Removal = require('../../../util/Removal');

/**
 * A handler that implements reversible deletion of shapes.
 *
 */
function DeleteShapeHandler(canvas, modeling) {
  this._canvas = canvas;
  this._modeling = modeling;
}

DeleteShapeHandler.$inject = ['canvas', 'modeling'];

/**
 * - Remove connections
 * - Remove all direct children
 */
DeleteShapeHandler.prototype.preExecute = function (context) {

  var modeling = this._modeling;

  var shape = context.shape;

  // remove connections
  (0, _Removal.saveClear)(shape.incoming, function (connection) {
    // To make sure that the connection isn't removed twice
    // For example if a container is removed
    modeling.removeConnection(connection, { nested: true });
  });

  (0, _Removal.saveClear)(shape.outgoing, function (connection) {
    modeling.removeConnection(connection, { nested: true });
  });

  // remove child shapes and connections
  (0, _Removal.saveClear)(shape.children, function (child) {
    if (isConnection(child)) {
      modeling.removeConnection(child, { nested: true });
    } else {
      modeling.removeShape(child, { nested: true });
    }
  });
};

/**
 * Remove shape and remember the parent
 */
DeleteShapeHandler.prototype.execute = function (context) {
  var canvas = this._canvas;

  var shape = context.shape,
      oldParent = shape.parent;

  context.oldParent = oldParent;

  // remove containment
  context.oldParentIndex = (0, _Collections.indexOf)(oldParent.children, shape);

  // remove shape
  canvas.removeShape(shape);

  return shape;
};

/**
 * Command revert implementation
 */
DeleteShapeHandler.prototype.revert = function (context) {

  var canvas = this._canvas;

  var shape = context.shape,
      oldParent = context.oldParent,
      oldParentIndex = context.oldParentIndex;

  // restore containment
  (0, _Collections.add)(oldParent.children, shape, oldParentIndex);

  canvas.addShape(shape, oldParent);

  return shape;
};

function isConnection(element) {
  return element.waypoints;
}

},{"../../../util/Collections":92,"../../../util/Removal":103}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DistributeElements;

var _minDash = require('min-dash');

/**
 * A handler that distributes elements evenly.
 */
function DistributeElements(modeling) {
  this._modeling = modeling;
}

DistributeElements.$inject = ['modeling'];

var OFF_AXIS = {
  x: 'y',
  y: 'x'
};

DistributeElements.prototype.preExecute = function (context) {
  var modeling = this._modeling;

  var groups = context.groups,
      axis = context.axis,
      dimension = context.dimension;

  function updateRange(group, element) {
    group.range.min = Math.min(element[axis], group.range.min);
    group.range.max = Math.max(element[axis] + element[dimension], group.range.max);
  }

  function center(element) {
    return element[axis] + element[dimension] / 2;
  }

  function lastIdx(arr) {
    return arr.length - 1;
  }

  function rangeDiff(range) {
    return range.max - range.min;
  }

  function centerElement(refCenter, element) {
    var delta = { y: 0 };

    delta[axis] = refCenter - center(element);

    if (delta[axis]) {

      delta[OFF_AXIS[axis]] = 0;

      modeling.moveElements([element], delta, element.parent);
    }
  }

  var firstGroup = groups[0],
      lastGroupIdx = lastIdx(groups),
      lastGroup = groups[lastGroupIdx];

  var margin,
      spaceInBetween,
      groupsSize = 0; // the size of each range

  (0, _minDash.forEach)(groups, function (group, idx) {
    var sortedElements, refElem, refCenter;

    if (group.elements.length < 2) {
      if (idx && idx !== groups.length - 1) {
        updateRange(group, group.elements[0]);

        groupsSize += rangeDiff(group.range);
      }
      return;
    }

    sortedElements = (0, _minDash.sortBy)(group.elements, axis);

    refElem = sortedElements[0];

    if (idx === lastGroupIdx) {
      refElem = sortedElements[lastIdx(sortedElements)];
    }

    refCenter = center(refElem);

    // wanna update the ranges after the shapes have been centered
    group.range = null;

    (0, _minDash.forEach)(sortedElements, function (element) {

      centerElement(refCenter, element);

      if (group.range === null) {
        group.range = {
          min: element[axis],
          max: element[axis] + element[dimension]
        };

        return;
      }

      // update group's range after centering the range elements
      updateRange(group, element);
    });

    if (idx && idx !== groups.length - 1) {
      groupsSize += rangeDiff(group.range);
    }
  });

  spaceInBetween = Math.abs(lastGroup.range.min - firstGroup.range.max);

  margin = Math.round((spaceInBetween - groupsSize) / (groups.length - 1));

  if (margin < groups.length - 1) {
    return;
  }

  (0, _minDash.forEach)(groups, function (group, groupIdx) {
    var delta = {},
        prevGroup;

    if (group === firstGroup || group === lastGroup) {
      return;
    }

    prevGroup = groups[groupIdx - 1];

    group.range.max = 0;

    (0, _minDash.forEach)(group.elements, function (element, idx) {
      delta[OFF_AXIS[axis]] = 0;
      delta[axis] = prevGroup.range.max - element[axis] + margin;

      if (group.range.min !== element[axis]) {
        delta[axis] += element[axis] - group.range.min;
      }

      if (delta[axis]) {
        modeling.moveElements([element], delta, element.parent);
      }

      group.range.max = Math.max(element[axis] + element[dimension], idx ? group.range.max : 0);
    });
  });
};

DistributeElements.prototype.postExecute = function (context) {};

},{"min-dash":108}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LayoutConnectionHandler;

var _minDash = require('min-dash');

/**
 * A handler that implements reversible moving of shapes.
 */
function LayoutConnectionHandler(layouter, canvas) {
  this._layouter = layouter;
  this._canvas = canvas;
}

LayoutConnectionHandler.$inject = ['layouter', 'canvas'];

LayoutConnectionHandler.prototype.execute = function (context) {

  var connection = context.connection;

  var oldWaypoints = connection.waypoints;

  (0, _minDash.assign)(context, {
    oldWaypoints: oldWaypoints
  });

  connection.waypoints = this._layouter.layoutConnection(connection, context.hints);

  return connection;
};

LayoutConnectionHandler.prototype.revert = function (context) {

  var connection = context.connection;

  connection.waypoints = context.oldWaypoints;

  return connection;
};

},{"min-dash":108}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MoveConnectionHandler;

var _minDash = require('min-dash');

var _Collections = require('../../../util/Collections');

/**
 * A handler that implements reversible moving of connections.
 *
 * The handler differs from the layout connection handler in a sense
 * that it preserves the connection layout.
 */
function MoveConnectionHandler() {}

MoveConnectionHandler.prototype.execute = function (context) {

  var connection = context.connection,
      delta = context.delta;

  var newParent = context.newParent || connection.parent,
      newParentIndex = context.newParentIndex,
      oldParent = connection.parent;

  // save old parent in context
  context.oldParent = oldParent;
  context.oldParentIndex = (0, _Collections.remove)(oldParent.children, connection);

  // add to new parent at position
  (0, _Collections.add)(newParent.children, connection, newParentIndex);

  // update parent
  connection.parent = newParent;

  // update waypoint positions
  (0, _minDash.forEach)(connection.waypoints, function (p) {
    p.x += delta.x;
    p.y += delta.y;

    if (p.original) {
      p.original.x += delta.x;
      p.original.y += delta.y;
    }
  });

  return connection;
};

MoveConnectionHandler.prototype.revert = function (context) {

  var connection = context.connection,
      newParent = connection.parent,
      oldParent = context.oldParent,
      oldParentIndex = context.oldParentIndex,
      delta = context.delta;

  // remove from newParent
  (0, _Collections.remove)(newParent.children, connection);

  // restore previous location in old parent
  (0, _Collections.add)(oldParent.children, connection, oldParentIndex);

  // restore parent
  connection.parent = oldParent;

  // revert to old waypoint positions
  (0, _minDash.forEach)(connection.waypoints, function (p) {
    p.x -= delta.x;
    p.y -= delta.y;

    if (p.original) {
      p.original.x -= delta.x;
      p.original.y -= delta.y;
    }
  });

  return connection;
};

},{"../../../util/Collections":92,"min-dash":108}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MoveElementsHandler;

var _MoveHelper = require('./helper/MoveHelper');

var _MoveHelper2 = _interopRequireDefault(_MoveHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A handler that implements reversible moving of shapes.
 */
function MoveElementsHandler(modeling) {
  this._helper = new _MoveHelper2.default(modeling);
}

MoveElementsHandler.$inject = ['modeling'];

MoveElementsHandler.prototype.preExecute = function (context) {
  context.closure = this._helper.getClosure(context.shapes);
};

MoveElementsHandler.prototype.postExecute = function (context) {

  var hints = context.hints,
      primaryShape;

  if (hints && hints.primaryShape) {
    primaryShape = hints.primaryShape;
    hints.oldParent = primaryShape.parent;
  }

  this._helper.moveClosure(context.closure, context.delta, context.newParent, context.newHost, primaryShape);
};

},{"./helper/MoveHelper":59}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MoveShapeHandler;

var _minDash = require('min-dash');

var _MoveHelper = require('./helper/MoveHelper');

var _MoveHelper2 = _interopRequireDefault(_MoveHelper);

var _Collections = require('../../../util/Collections');

var _AnchorsHelper = require('./helper/AnchorsHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A handler that implements reversible moving of shapes.
 */
function MoveShapeHandler(modeling) {
  this._modeling = modeling;

  this._helper = new _MoveHelper2.default(modeling);
}

MoveShapeHandler.$inject = ['modeling'];

MoveShapeHandler.prototype.execute = function (context) {

  var shape = context.shape,
      delta = context.delta,
      newParent = context.newParent || shape.parent,
      newParentIndex = context.newParentIndex,
      oldParent = shape.parent;

  context.oldBounds = (0, _minDash.pick)(shape, ['x', 'y', 'width', 'height']);

  // save old parent in context
  context.oldParent = oldParent;
  context.oldParentIndex = (0, _Collections.remove)(oldParent.children, shape);

  // add to new parent at position
  (0, _Collections.add)(newParent.children, shape, newParentIndex);

  // update shape parent + position
  (0, _minDash.assign)(shape, {
    parent: newParent,
    x: shape.x + delta.x,
    y: shape.y + delta.y
  });

  return shape;
};

MoveShapeHandler.prototype.postExecute = function (context) {

  var shape = context.shape,
      delta = context.delta,
      hints = context.hints;

  var modeling = this._modeling;

  if (hints.layout !== false) {

    (0, _minDash.forEach)(shape.incoming, function (c) {
      modeling.layoutConnection(c, {
        connectionEnd: (0, _AnchorsHelper.getMovedTargetAnchor)(c, shape, delta)
      });
    });

    (0, _minDash.forEach)(shape.outgoing, function (c) {
      modeling.layoutConnection(c, {
        connectionStart: (0, _AnchorsHelper.getMovedSourceAnchor)(c, shape, delta)
      });
    });
  }

  if (hints.recurse !== false) {
    this.moveChildren(context);
  }
};

MoveShapeHandler.prototype.revert = function (context) {

  var shape = context.shape,
      oldParent = context.oldParent,
      oldParentIndex = context.oldParentIndex,
      delta = context.delta;

  // restore previous location in old parent
  (0, _Collections.add)(oldParent.children, shape, oldParentIndex);

  // revert to old position and parent
  (0, _minDash.assign)(shape, {
    parent: oldParent,
    x: shape.x - delta.x,
    y: shape.y - delta.y
  });

  return shape;
};

MoveShapeHandler.prototype.moveChildren = function (context) {

  var delta = context.delta,
      shape = context.shape;

  this._helper.moveRecursive(shape.children, delta, null);
};

MoveShapeHandler.prototype.getNewParent = function (context) {
  return context.newParent || context.shape.parent;
};

},{"../../../util/Collections":92,"./helper/AnchorsHelper":57,"./helper/MoveHelper":59,"min-dash":108}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PasteHandler;

var _minDash = require('min-dash');

function removeProperties(element, properties) {
  (0, _minDash.forEach)(properties, function (prop) {
    if (element[prop]) {
      delete element[prop];
    }
  });
}

/**
 * A handler that implements pasting of elements onto the diagram.
 *
 * @param {eventBus} EventBus
 * @param {canvas} Canvas
 * @param {selection} Selection
 * @param {elementFactory} ElementFactory
 * @param {modeling} Modeling
 * @param {rules} Rules
 */
function PasteHandler(eventBus, canvas, selection, elementFactory, modeling, rules) {

  this._eventBus = eventBus;
  this._canvas = canvas;
  this._selection = selection;
  this._elementFactory = elementFactory;
  this._modeling = modeling;
  this._rules = rules;
}

PasteHandler.$inject = ['eventBus', 'canvas', 'selection', 'elementFactory', 'modeling', 'rules'];

// api //////////////////////

/**
 * Creates a new shape
 *
 * @param {Object} context
 * @param {Object} context.tree the new shape
 * @param {Element} context.topParent the paste target
 */
PasteHandler.prototype.preExecute = function (context) {
  var eventBus = this._eventBus,
      self = this;

  var tree = context.tree,
      topParent = context.topParent,
      position = context.position;

  tree.createdElements = {};

  tree.labels = [];

  (0, _minDash.forEach)(tree, function (elements, depthStr) {
    var depth = parseInt(depthStr, 10);

    if (isNaN(depth)) {
      return;
    }

    // set the parent on the top level elements
    if (!depth) {
      elements = (0, _minDash.map)(elements, function (descriptor) {
        descriptor.parent = topParent;

        return descriptor;
      });
    }

    // Order by priority for element creation
    elements = (0, _minDash.sortBy)(elements, 'priority');

    (0, _minDash.forEach)(elements, function (descriptor) {
      var id = descriptor.id,
          parent = descriptor.parent,
          hints = {},
          newPosition;

      var element = (0, _minDash.assign)({}, descriptor);

      if (depth) {
        element.parent = self._getCreatedElement(parent, tree);
      }

      // this happens when shapes have not been created due to rules
      if (!parent) {
        return;
      }

      eventBus.fire('element.paste', {
        createdElements: tree.createdElements,
        descriptor: element
      });

      // in case the parent changed during 'element.paste'
      parent = element.parent;

      if (element.waypoints) {
        element = self._createConnection(element, parent, position, tree);

        if (element) {
          tree.createdElements[id] = {
            element: element,
            descriptor: descriptor
          };
        }

        return;
      }

      // supply not-root information as hint
      if (element.parent !== topParent) {
        hints.root = false;
      }

      // set host
      if (element.host) {
        hints.attach = true;

        parent = self._getCreatedElement(element.host, tree);
      }

      // handle labels
      if (element.labelTarget) {
        return tree.labels.push(element);
      }

      newPosition = {
        x: Math.round(position.x + element.delta.x + element.width / 2),
        y: Math.round(position.y + element.delta.y + element.height / 2)
      };

      removeProperties(element, ['id', 'parent', 'delta', 'host', 'priority']);

      element = self._createShape(element, parent, newPosition, hints);

      if (element) {
        tree.createdElements[id] = {
          element: element,
          descriptor: descriptor
        };
      }
    });
  });
};

// move label's to their relative position
PasteHandler.prototype.postExecute = function (context) {
  var modeling = this._modeling,
      selection = this._selection,
      self = this;

  var tree = context.tree,
      labels = tree.labels,
      topLevelElements = [];

  (0, _minDash.forEach)(labels, function (labelDescriptor) {
    var labelTarget = self._getCreatedElement(labelDescriptor.labelTarget, tree),
        labels,
        labelTargetPos,
        newPosition;

    if (!labelTarget) {
      return;
    }

    labels = labelTarget.labels;

    if (!labels || !labels.length) {
      return;
    }

    labelTargetPos = {
      x: labelTarget.x,
      y: labelTarget.y
    };

    if (labelTarget.waypoints) {
      labelTargetPos = labelTarget.waypoints[0];
    }

    (0, _minDash.forEach)(labels, function (label) {
      newPosition = {
        x: Math.round(labelTargetPos.x - label.x + labelDescriptor.delta.x),
        y: Math.round(labelTargetPos.y - label.y + labelDescriptor.delta.y)
      };

      modeling.moveShape(label, newPosition, labelTarget.parent);
    });
  });

  (0, _minDash.forEach)(tree[0], function (descriptor) {
    var id = descriptor.id,
        toplevel = tree.createdElements[id];

    if (toplevel) {
      topLevelElements.push(toplevel.element);
    }
  });

  selection.select(topLevelElements);
};

PasteHandler.prototype._createConnection = function (element, parent, parentCenter, tree) {
  var modeling = this._modeling,
      rules = this._rules;

  var connection, source, target, canPaste;

  element.waypoints = (0, _minDash.map)(element.waypoints, function (waypoint, idx) {
    return {
      x: Math.round(parentCenter.x + element.delta[idx].x),
      y: Math.round(parentCenter.y + element.delta[idx].y)
    };
  });

  source = this._getCreatedElement(element.source, tree);
  target = this._getCreatedElement(element.target, tree);

  if (!source || !target) {
    return null;
  }

  canPaste = rules.allowed('element.paste', {
    source: source,
    target: target
  });

  if (!canPaste) {
    return null;
  }

  removeProperties(element, ['id', 'parent', 'delta', 'source', 'target', 'width', 'height', 'priority']);

  connection = modeling.createConnection(source, target, element, parent);

  return connection;
};

PasteHandler.prototype._createShape = function (element, parent, position, isAttach, hints) {
  var modeling = this._modeling,
      elementFactory = this._elementFactory,
      rules = this._rules;

  var canPaste = rules.allowed('element.paste', {
    element: element,
    position: position,
    parent: parent
  });

  if (!canPaste) {
    return null;
  }

  var shape = elementFactory.createShape(element);

  modeling.createShape(shape, position, parent, isAttach, hints);

  return shape;
};

PasteHandler.prototype._getCreatedElement = function (id, tree) {
  return tree.createdElements[id] && tree.createdElements[id].element;
};

},{"min-dash":108}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ReconnectConnectionHandler;

var _minDash = require('min-dash');

/**
 * Reconnect connection handler
 */
function ReconnectConnectionHandler(modeling) {
  this._modeling = modeling;
}

ReconnectConnectionHandler.$inject = ['modeling'];

ReconnectConnectionHandler.prototype.execute = function (context) {

  var newSource = context.newSource,
      newTarget = context.newTarget,
      connection = context.connection,
      dockingOrPoints = context.dockingOrPoints;

  if (!newSource && !newTarget) {
    throw new Error('newSource or newTarget are required');
  }

  if (newSource && newTarget) {
    throw new Error('must specify either newSource or newTarget');
  }

  if ((0, _minDash.isArray)(dockingOrPoints)) {
    context.oldWaypoints = connection.waypoints;
    connection.waypoints = dockingOrPoints;
  }

  if (newSource) {
    context.oldSource = connection.source;
    connection.source = newSource;
  }

  if (newTarget) {
    context.oldTarget = connection.target;
    connection.target = newTarget;
  }

  return connection;
};

ReconnectConnectionHandler.prototype.postExecute = function (context) {
  var connection = context.connection,
      dockingOrPoints = context.dockingOrPoints,
      newSource = context.newSource,
      movedEnd = newSource ? 'connectionStart' : 'connectionEnd',
      newWaypoint,
      hints = {};

  if ((0, _minDash.isArray)(dockingOrPoints)) {
    newWaypoint = newSource ? dockingOrPoints[0] : dockingOrPoints[dockingOrPoints.length - 1];
  } else {
    newWaypoint = dockingOrPoints;
  }

  hints[movedEnd] = getDocking(newWaypoint);

  this._modeling.layoutConnection(connection, hints);
};

ReconnectConnectionHandler.prototype.revert = function (context) {

  var oldSource = context.oldSource,
      oldTarget = context.oldTarget,
      oldWaypoints = context.oldWaypoints,
      connection = context.connection;

  if (oldSource) {
    connection.source = oldSource;
  }

  if (oldTarget) {
    connection.target = oldTarget;
  }

  if (oldWaypoints) {
    connection.waypoints = oldWaypoints;
  }

  return connection;
};

// helper ///////////////

function getDocking(point) {
  return point.original || point;
}

},{"min-dash":108}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ReplaceShapeHandler;

var _minDash = require('min-dash');

/**
 * A handler that implements reversible replacing of shapes.
 * Internally the old shape will be removed and the new shape will be added.
 *
 *
 * @class
 * @constructor
 *
 * @param {canvas} Canvas
 */
function ReplaceShapeHandler(modeling, rules) {
  this._modeling = modeling;
  this._rules = rules;
}

ReplaceShapeHandler.$inject = ['modeling', 'rules'];

// api //////////////////////


/**
 * Replaces a shape with an replacement Element.
 *
 * The newData object should contain type, x, y.
 *
 * If possible also the incoming/outgoing connection
 * will be restored.
 *
 * @param {Object} context
 */
ReplaceShapeHandler.prototype.preExecute = function (context) {

  var self = this,
      modeling = this._modeling,
      rules = this._rules;

  var oldShape = context.oldShape,
      newData = context.newData,
      hints = context.hints,
      newShape;

  function canReconnect(type, source, target, connection) {
    return rules.allowed(type, {
      source: source,
      target: target,
      connection: connection
    });
  }

  // (1) place a new shape at the given position

  var position = {
    x: newData.x,
    y: newData.y
  };

  newShape = context.newShape = context.newShape || self.createShape(newData, position, oldShape.parent, hints);

  // (2) update the host

  if (oldShape.host) {
    modeling.updateAttachment(newShape, oldShape.host);
  }

  // (3) adopt all children from the old shape

  var children;

  if (hints.moveChildren !== false) {
    children = oldShape.children.slice();

    modeling.moveElements(children, { x: 0, y: 0 }, newShape);
  }

  // (4) reconnect connections to the new shape (where allowed)

  var incoming = oldShape.incoming.slice(),
      outgoing = oldShape.outgoing.slice();

  (0, _minDash.forEach)(incoming, function (connection) {
    var waypoints = connection.waypoints,
        docking = waypoints[waypoints.length - 1],
        source = connection.source,
        allowed = canReconnect('connection.reconnectEnd', source, newShape, connection);

    if (allowed) {
      self.reconnectEnd(connection, newShape, docking);
    }
  });

  (0, _minDash.forEach)(outgoing, function (connection) {
    var waypoints = connection.waypoints,
        docking = waypoints[0],
        target = connection.target,
        allowed = canReconnect('connection.reconnectStart', newShape, target, connection);

    if (allowed) {
      self.reconnectStart(connection, newShape, docking);
    }
  });
};

ReplaceShapeHandler.prototype.postExecute = function (context) {
  var modeling = this._modeling;

  var oldShape = context.oldShape,
      newShape = context.newShape;

  // if an element gets resized on replace, layout the connection again
  (0, _minDash.forEach)(newShape.incoming, function (c) {
    modeling.layoutConnection(c, { endChanged: true });
  });

  (0, _minDash.forEach)(newShape.outgoing, function (c) {
    modeling.layoutConnection(c, { startChanged: true });
  });

  modeling.removeShape(oldShape);
};

ReplaceShapeHandler.prototype.execute = function (context) {};

ReplaceShapeHandler.prototype.revert = function (context) {};

ReplaceShapeHandler.prototype.createShape = function (shape, position, target, hints) {
  var modeling = this._modeling;
  return modeling.createShape(shape, position, target, hints);
};

ReplaceShapeHandler.prototype.reconnectStart = function (connection, newSource, dockingPoint) {
  var modeling = this._modeling;
  modeling.reconnectStart(connection, newSource, dockingPoint);
};

ReplaceShapeHandler.prototype.reconnectEnd = function (connection, newTarget, dockingPoint) {
  var modeling = this._modeling;
  modeling.reconnectEnd(connection, newTarget, dockingPoint);
};

},{"min-dash":108}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ResizeShapeHandler;

var _minDash = require('min-dash');

var _AnchorsHelper = require('./helper/AnchorsHelper');

/**
 * A handler that implements reversible resizing of shapes.
 *
 * @param {Modeling} modeling
 */
function ResizeShapeHandler(modeling) {
  this._modeling = modeling;
}

ResizeShapeHandler.$inject = ['modeling'];

/**
 * {
 *   shape: {....}
 *   newBounds: {
 *     width:  20,
 *     height: 40,
 *     x:       5,
 *     y:      10
 *   }
 *
 * }
 */
ResizeShapeHandler.prototype.execute = function (context) {
  var shape = context.shape,
      newBounds = context.newBounds,
      minBounds = context.minBounds;

  if (newBounds.x === undefined || newBounds.y === undefined || newBounds.width === undefined || newBounds.height === undefined) {
    throw new Error('newBounds must have {x, y, width, height} properties');
  }

  if (minBounds && (newBounds.width < minBounds.width || newBounds.height < minBounds.height)) {
    throw new Error('width and height cannot be less than minimum height and width');
  } else if (!minBounds && newBounds.width < 10 || newBounds.height < 10) {
    throw new Error('width and height cannot be less than 10px');
  }

  // save old bbox in context
  context.oldBounds = {
    width: shape.width,
    height: shape.height,
    x: shape.x,
    y: shape.y
  };

  // update shape
  (0, _minDash.assign)(shape, {
    width: newBounds.width,
    height: newBounds.height,
    x: newBounds.x,
    y: newBounds.y
  });

  return shape;
};

ResizeShapeHandler.prototype.postExecute = function (context) {

  var shape = context.shape,
      oldBounds = context.oldBounds;

  var modeling = this._modeling;

  (0, _minDash.forEach)(shape.incoming, function (c) {
    modeling.layoutConnection(c, {
      connectionEnd: (0, _AnchorsHelper.getResizedTargetAnchor)(c, shape, oldBounds)
    });
  });

  (0, _minDash.forEach)(shape.outgoing, function (c) {
    modeling.layoutConnection(c, {
      connectionStart: (0, _AnchorsHelper.getResizedSourceAnchor)(c, shape, oldBounds)
    });
  });
};

ResizeShapeHandler.prototype.revert = function (context) {

  var shape = context.shape,
      oldBounds = context.oldBounds;

  // restore previous bbox
  (0, _minDash.assign)(shape, {
    width: oldBounds.width,
    height: oldBounds.height,
    x: oldBounds.x,
    y: oldBounds.y
  });

  return shape;
};

},{"./helper/AnchorsHelper":57,"min-dash":108}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SpaceToolHandler;

var _minDash = require('min-dash');

var _SpaceUtil = require('../../space-tool/SpaceUtil');

/**
 * A handler that implements reversible creating and removing of space.
 *
 * It executes in two phases:
 *
 *  (1) resize all affected resizeShapes
 *  (2) move all affected moveElements
 */
function SpaceToolHandler(modeling) {
  this._modeling = modeling;
}

SpaceToolHandler.$inject = ['modeling'];

SpaceToolHandler.prototype.preExecute = function (context) {

  // resize
  var modeling = this._modeling,
      resizingShapes = context.resizingShapes,
      delta = context.delta,
      direction = context.direction;

  (0, _minDash.forEach)(resizingShapes, function (shape) {
    var newBounds = (0, _SpaceUtil.resizeBounds)(shape, direction, delta);

    modeling.resizeShape(shape, newBounds);
  });
};

SpaceToolHandler.prototype.postExecute = function (context) {
  // move
  var modeling = this._modeling,
      movingShapes = context.movingShapes,
      delta = context.delta;

  modeling.moveElements(movingShapes, delta, undefined, { autoResize: false, attach: false });
};

SpaceToolHandler.prototype.execute = function (context) {};
SpaceToolHandler.prototype.revert = function (context) {};

},{"../../space-tool/SpaceUtil":79,"min-dash":108}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ToggleShapeCollapseHandler;
/**
 * A handler that toggles the collapsed state of an element
 * and the visibility of all its children.
 *
 * @param {Modeling} modeling
 */
function ToggleShapeCollapseHandler(modeling) {
  this._modeling = modeling;
}

ToggleShapeCollapseHandler.$inject = ['modeling'];

ToggleShapeCollapseHandler.prototype.execute = function (context) {

  var shape = context.shape,
      children = shape.children;

  // remember previous visibility of children
  context.oldChildrenVisibility = getElementsVisibility(children);

  // toggle state
  shape.collapsed = !shape.collapsed;

  // hide/show children
  setHidden(children, shape.collapsed);

  return [shape].concat(children);
};

ToggleShapeCollapseHandler.prototype.revert = function (context) {

  var shape = context.shape,
      oldChildrenVisibility = context.oldChildrenVisibility;

  var children = shape.children;

  // set old visability of children
  restoreVisibility(children, oldChildrenVisibility);

  // retoggle state
  shape.collapsed = !shape.collapsed;

  return [shape].concat(children);
};

// helpers //////////////////////

/**
 * Return a map { elementId -> hiddenState}.
 *
 * @param {Array<djs.model.Shape>} elements
 *
 * @return {Object}
 */
function getElementsVisibility(elements) {

  var result = {};

  elements.forEach(function (e) {
    result[e.id] = e.hidden;
  });

  return result;
}

function setHidden(elements, newHidden) {
  elements.forEach(function (element) {
    element.hidden = newHidden;
  });
}

function restoreVisibility(elements, lastState) {
  elements.forEach(function (e) {
    e.hidden = lastState[e.id];
  });
}

},{}],55:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UpdateAttachmentHandler;

var _Collections = require('../../../util/Collections');

/**
 * A handler that implements reversible attaching/detaching of shapes.
 */
function UpdateAttachmentHandler(modeling) {
  this._modeling = modeling;
}

UpdateAttachmentHandler.$inject = ['modeling'];

UpdateAttachmentHandler.prototype.execute = function (context) {
  var shape = context.shape,
      newHost = context.newHost,
      oldHost = shape.host;

  // (0) detach from old host
  context.oldHost = oldHost;
  context.attacherIdx = removeAttacher(oldHost, shape);

  // (1) attach to new host
  addAttacher(newHost, shape);

  // (2) update host
  shape.host = newHost;

  return shape;
};

UpdateAttachmentHandler.prototype.revert = function (context) {
  var shape = context.shape,
      newHost = context.newHost,
      oldHost = context.oldHost,
      attacherIdx = context.attacherIdx;

  // (2) update host
  shape.host = oldHost;

  // (1) attach to new host
  removeAttacher(newHost, shape);

  // (0) detach from old host
  addAttacher(oldHost, shape, attacherIdx);

  return shape;
};

function removeAttacher(host, attacher) {
  // remove attacher from host
  return (0, _Collections.remove)(host && host.attachers, attacher);
}

function addAttacher(host, attacher, idx) {

  if (!host) {
    return;
  }

  var attachers = host.attachers;

  if (!attachers) {
    host.attachers = attachers = [];
  }

  (0, _Collections.add)(attachers, attacher, idx);
}

},{"../../../util/Collections":92}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UpdateWaypointsHandler;
function UpdateWaypointsHandler() {}

UpdateWaypointsHandler.prototype.execute = function (context) {

  var connection = context.connection,
      newWaypoints = context.newWaypoints;

  context.oldWaypoints = connection.waypoints;

  connection.waypoints = newWaypoints;

  return connection;
};

UpdateWaypointsHandler.prototype.revert = function (context) {

  var connection = context.connection,
      oldWaypoints = context.oldWaypoints;

  connection.waypoints = oldWaypoints;

  return connection;
};

},{}],57:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getResizedSourceAnchor = getResizedSourceAnchor;
exports.getResizedTargetAnchor = getResizedTargetAnchor;
exports.getMovedSourceAnchor = getMovedSourceAnchor;
exports.getMovedTargetAnchor = getMovedTargetAnchor;

var _AttachUtil = require('../../../../util/AttachUtil');

function getResizedSourceAnchor(connection, shape, oldBounds) {

  var waypoints = safeGetWaypoints(connection),
      oldAnchor = waypoints[0];

  return (0, _AttachUtil.getNewAttachPoint)(oldAnchor.original || oldAnchor, oldBounds, shape);
}

function getResizedTargetAnchor(connection, shape, oldBounds) {

  var waypoints = safeGetWaypoints(connection),
      oldAnchor = waypoints[waypoints.length - 1];

  return (0, _AttachUtil.getNewAttachPoint)(oldAnchor.original || oldAnchor, oldBounds, shape);
}

function getMovedSourceAnchor(connection, source, moveDelta) {
  return getResizedSourceAnchor(connection, source, substractPosition(source, moveDelta));
}

function getMovedTargetAnchor(connection, target, moveDelta) {
  return getResizedTargetAnchor(connection, target, substractPosition(target, moveDelta));
}

// helpers //////////////////////

function substractPosition(bounds, delta) {
  return {
    x: bounds.x - delta.x,
    y: bounds.y - delta.y,
    width: bounds.width,
    height: bounds.height
  };
}

/**
 * Return waypoints of given connection; throw if non exists (should not happen!!).
 *
 * @param {Connection} connection
 *
 * @return {Array<Point>}
 */
function safeGetWaypoints(connection) {

  var waypoints = connection.waypoints;

  if (!waypoints.length) {
    throw new Error('connection#' + connection.id + ': no waypoints');
  }

  return waypoints;
}

},{"../../../../util/AttachUtil":90}],58:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MoveClosure;

var _minDash = require('min-dash');

var _Elements = require('../../../../util/Elements');

function MoveClosure() {

  this.allShapes = {};
  this.allConnections = {};

  this.enclosedElements = {};
  this.enclosedConnections = {};

  this.topLevel = {};
}

MoveClosure.prototype.add = function (element, isTopLevel) {
  return this.addAll([element], isTopLevel);
};

MoveClosure.prototype.addAll = function (elements, isTopLevel) {

  var newClosure = (0, _Elements.getClosure)(elements, !!isTopLevel, this);

  (0, _minDash.assign)(this, newClosure);

  return this;
};

},{"../../../../util/Elements":94,"min-dash":108}],59:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MoveHelper;

var _minDash = require('min-dash');

var _AnchorsHelper = require('./AnchorsHelper');

var _MoveClosure = require('./MoveClosure');

var _MoveClosure2 = _interopRequireDefault(_MoveClosure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A helper that is able to carry out serialized move
 * operations on multiple elements.
 *
 * @param {Modeling} modeling
 */
function MoveHelper(modeling) {
  this._modeling = modeling;
}

/**
 * Move the specified elements and all children by the given delta.
 *
 * This moves all enclosed connections, too and layouts all affected
 * external connections.
 *
 * @param  {Array<djs.model.Base>} elements
 * @param  {Point} delta
 * @param  {djs.model.Base} newParent applied to the first level of shapes
 *
 * @return {Array<djs.model.Base>} list of touched elements
 */
MoveHelper.prototype.moveRecursive = function (elements, delta, newParent) {
  if (!elements) {
    return [];
  } else {
    return this.moveClosure(this.getClosure(elements), delta, newParent);
  }
};

/**
 * Move the given closure of elmements.
 *
 * @param {Object} closure
 * @param {Point} delta
 * @param {djs.model.Base} [newParent]
 * @param {djs.model.Base} [newHost]
 */
MoveHelper.prototype.moveClosure = function (closure, delta, newParent, newHost, primaryShape) {
  var modeling = this._modeling;

  var allShapes = closure.allShapes,
      allConnections = closure.allConnections,
      enclosedConnections = closure.enclosedConnections,
      topLevel = closure.topLevel,
      keepParent = false;

  if (primaryShape && primaryShape.parent === newParent) {
    keepParent = true;
  }

  // move all shapes
  (0, _minDash.forEach)(allShapes, function (shape) {

    // move the element according to the given delta
    modeling.moveShape(shape, delta, topLevel[shape.id] && !keepParent && newParent, {
      recurse: false,
      layout: false
    });
  });

  // move all child connections / layout external connections
  (0, _minDash.forEach)(allConnections, function (c) {

    var sourceMoved = !!allShapes[c.source.id],
        targetMoved = !!allShapes[c.target.id];

    if (enclosedConnections[c.id] && sourceMoved && targetMoved) {
      modeling.moveConnection(c, delta, topLevel[c.id] && !keepParent && newParent);
    } else {
      modeling.layoutConnection(c, {
        connectionStart: sourceMoved && (0, _AnchorsHelper.getMovedSourceAnchor)(c, c.source, delta),
        connectionEnd: targetMoved && (0, _AnchorsHelper.getMovedTargetAnchor)(c, c.target, delta)
      });
    }
  });
};

/**
 * Returns the closure for the selected elements
 *
 * @param  {Array<djs.model.Base>} elements
 * @return {MoveClosure} closure
 */
MoveHelper.prototype.getClosure = function (elements) {
  return new _MoveClosure2.default().addAll(elements, true);
};

},{"./AnchorsHelper":57,"./MoveClosure":58,"min-dash":108}],60:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _command = require('../../command');

var _command2 = _interopRequireDefault(_command);

var _changeSupport = require('../change-support');

var _changeSupport2 = _interopRequireDefault(_changeSupport);

var _selection = require('../selection');

var _selection2 = _interopRequireDefault(_selection);

var _rules = require('../rules');

var _rules2 = _interopRequireDefault(_rules);

var _Modeling = require('./Modeling');

var _Modeling2 = _interopRequireDefault(_Modeling);

var _BaseLayouter = require('../../layout/BaseLayouter');

var _BaseLayouter2 = _interopRequireDefault(_BaseLayouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  __depends__: [_command2.default, _changeSupport2.default, _selection2.default, _rules2.default],
  __init__: ['modeling'],
  modeling: ['type', _Modeling2.default],
  layouter: ['type', _BaseLayouter2.default]
};

},{"../../command":9,"../../layout/BaseLayouter":82,"../change-support":21,"../rules":74,"../selection":78,"./Modeling":35}],61:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MoveEvents;

var _minDash = require('min-dash');

var _Event = require('../../util/Event');

var LOW_PRIORITY = 500,
    MEDIUM_PRIORITY = 1250,
    HIGH_PRIORITY = 1500;

var round = Math.round;

function mid(element) {
  return {
    x: element.x + round(element.width / 2),
    y: element.y + round(element.height / 2)
  };
}

/**
 * A plugin that makes shapes draggable / droppable.
 *
 * @param {EventBus} eventBus
 * @param {Dragging} dragging
 * @param {Modeling} modeling
 * @param {Selection} selection
 * @param {Rules} rules
 */
function MoveEvents(eventBus, dragging, modeling, selection, rules) {

  // rules

  function canMove(shapes, delta, position, target) {

    return rules.allowed('elements.move', {
      shapes: shapes,
      delta: delta,
      position: position,
      target: target
    });
  }

  // move events

  // assign a high priority to this handler to setup the environment
  // others may hook up later, e.g. at default priority and modify
  // the move environment.
  //
  // This sets up the context with
  //
  // * shape: the primary shape being moved
  // * shapes: a list of shapes to be moved
  // * validatedShapes: a list of shapes that are being checked
  //                    against the rules before and during move
  //
  eventBus.on('shape.move.start', HIGH_PRIORITY, function (event) {

    var context = event.context,
        shape = event.shape,
        shapes = selection.get().slice();

    // move only single shape if the dragged element
    // is not part of the current selection
    if (shapes.indexOf(shape) === -1) {
      shapes = [shape];
    }

    // ensure we remove nested elements in the collection
    // and add attachers for a proper dragger
    shapes = removeNested(shapes);

    // attach shapes to drag context
    (0, _minDash.assign)(context, {
      shapes: shapes,
      validatedShapes: shapes,
      shape: shape
    });
  });

  // assign a high priority to this handler to setup the environment
  // others may hook up later, e.g. at default priority and modify
  // the move environment
  //
  eventBus.on('shape.move.start', MEDIUM_PRIORITY, function (event) {

    var context = event.context,
        validatedShapes = context.validatedShapes,
        canExecute;

    canExecute = context.canExecute = canMove(validatedShapes);

    // check if we can move the elements
    if (!canExecute) {
      return false;
    }
  });

  // assign a low priority to this handler
  // to let others modify the move event before we update
  // the context
  //
  eventBus.on('shape.move.move', LOW_PRIORITY, function (event) {

    var context = event.context,
        validatedShapes = context.validatedShapes,
        hover = event.hover,
        delta = { x: event.dx, y: event.dy },
        position = { x: event.x, y: event.y },
        canExecute;

    // check if we can move the elements
    canExecute = canMove(validatedShapes, delta, position, hover);

    context.delta = delta;
    context.canExecute = canExecute;

    // simply ignore move over
    if (canExecute === null) {
      context.target = null;

      return;
    }

    context.target = hover;
  });

  eventBus.on('shape.move.end', function (event) {

    var context = event.context;

    var delta = context.delta,
        canExecute = context.canExecute,
        isAttach = canExecute === 'attach',
        shapes = context.shapes;

    if (!canExecute) {
      return false;
    }

    // ensure we have actual pixel values deltas
    // (important when zoom level was > 1 during move)
    delta.x = round(delta.x);
    delta.y = round(delta.y);

    modeling.moveElements(shapes, delta, context.target, {
      primaryShape: context.shape,
      attach: isAttach
    });
  });

  // move activation

  eventBus.on('element.mousedown', function (event) {

    var originalEvent = (0, _Event.getOriginal)(event);

    if (!originalEvent) {
      throw new Error('must supply DOM mousedown event');
    }

    return start(originalEvent, event.element);
  });

  function start(event, element, activate) {

    // do not move connections or the root element
    if (element.waypoints || !element.parent) {
      return;
    }

    var referencePoint = mid(element);

    dragging.init(event, referencePoint, 'shape.move', {
      cursor: 'grabbing',
      autoActivate: activate,
      data: {
        shape: element,
        context: {}
      }
    });

    // we've handled the event
    return true;
  }

  // API

  this.start = start;
}

MoveEvents.$inject = ['eventBus', 'dragging', 'modeling', 'selection', 'rules'];

/**
 * Return a filtered list of elements that do not contain
 * those nested into others.
 *
 * @param  {Array<djs.model.Base>} elements
 *
 * @return {Array<djs.model.Base>} filtered
 */
function removeNested(elements) {

  var ids = (0, _minDash.groupBy)(elements, 'id');

  return (0, _minDash.filter)(elements, function (element) {
    while (element = element.parent) {

      // parent in selection
      if (ids[element.id]) {
        return false;
      }
    }

    return true;
  });
}

},{"../../util/Event":95,"min-dash":108}],62:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MovePreview;

var _minDash = require('min-dash');

var _Elements = require('../../util/Elements');

var _tinySvg = require('tiny-svg');

var _SvgTransformUtil = require('../../util/SvgTransformUtil');

var LOW_PRIORITY = 499;

var MARKER_DRAGGING = 'djs-dragging',
    MARKER_OK = 'drop-ok',
    MARKER_NOT_OK = 'drop-not-ok',
    MARKER_NEW_PARENT = 'new-parent',
    MARKER_ATTACH = 'attach-ok';

/**
 * Provides previews for moving shapes when moving.
 *
 * @param {EventBus} eventBus
 * @param {ElementRegistry} elementRegistry
 * @param {Canvas} canvas
 * @param {Styles} styles
 */
function MovePreview(eventBus, elementRegistry, canvas, styles, previewSupport) {

  function getVisualDragShapes(shapes) {
    var elements = getAllDraggedElements(shapes);

    var filteredElements = removeEdges(elements);

    return filteredElements;
  }

  function getAllDraggedElements(shapes) {
    var allShapes = (0, _Elements.selfAndAllChildren)(shapes, true);

    var allConnections = (0, _minDash.map)(allShapes, function (shape) {
      return (shape.incoming || []).concat(shape.outgoing || []);
    });

    return (0, _minDash.flatten)(allShapes.concat(allConnections));
  }

  /**
   * Sets drop marker on an element.
   */
  function setMarker(element, marker) {

    [MARKER_ATTACH, MARKER_OK, MARKER_NOT_OK, MARKER_NEW_PARENT].forEach(function (m) {

      if (m === marker) {
        canvas.addMarker(element, m);
      } else {
        canvas.removeMarker(element, m);
      }
    });
  }

  /**
   * Make an element draggable.
   *
   * @param {Object} context
   * @param {djs.model.Base} element
   * @param {Boolean} addMarker
   */
  function makeDraggable(context, element, addMarker) {

    previewSupport.addDragger(element, context.dragGroup);

    if (addMarker) {
      canvas.addMarker(element, MARKER_DRAGGING);
    }

    if (context.allDraggedElements) {
      context.allDraggedElements.push(element);
    } else {
      context.allDraggedElements = [element];
    }
  }

  // assign a low priority to this handler
  // to let others modify the move context before
  // we draw things
  eventBus.on('shape.move.start', LOW_PRIORITY, function (event) {

    var context = event.context,
        dragShapes = context.shapes,
        allDraggedElements = context.allDraggedElements;

    var visuallyDraggedShapes = getVisualDragShapes(dragShapes);

    if (!context.dragGroup) {
      var dragGroup = (0, _tinySvg.create)('g');
      (0, _tinySvg.attr)(dragGroup, styles.cls('djs-drag-group', ['no-events']));

      var defaultLayer = canvas.getDefaultLayer();

      (0, _tinySvg.append)(defaultLayer, dragGroup);

      context.dragGroup = dragGroup;
    }

    // add previews
    visuallyDraggedShapes.forEach(function (shape) {
      previewSupport.addDragger(shape, context.dragGroup);
    });

    // cache all dragged elements / gfx
    // so that we can quickly undo their state changes later
    if (!allDraggedElements) {
      allDraggedElements = getAllDraggedElements(dragShapes);
    } else {
      allDraggedElements = (0, _minDash.flatten)([allDraggedElements, getAllDraggedElements(dragShapes)]);
    }

    // add dragging marker
    (0, _minDash.forEach)(allDraggedElements, function (e) {
      canvas.addMarker(e, MARKER_DRAGGING);
    });

    context.allDraggedElements = allDraggedElements;

    // determine, if any of the dragged elements have different parents
    context.differentParents = haveDifferentParents(dragShapes);
  });

  // update previews
  eventBus.on('shape.move.move', LOW_PRIORITY, function (event) {

    var context = event.context,
        dragGroup = context.dragGroup,
        target = context.target,
        parent = context.shape.parent,
        canExecute = context.canExecute;

    if (target) {
      if (canExecute === 'attach') {
        setMarker(target, MARKER_ATTACH);
      } else if (context.canExecute && target && target.id !== parent.id) {
        setMarker(target, MARKER_NEW_PARENT);
      } else {
        setMarker(target, context.canExecute ? MARKER_OK : MARKER_NOT_OK);
      }
    }

    (0, _SvgTransformUtil.translate)(dragGroup, event.dx, event.dy);
  });

  eventBus.on(['shape.move.out', 'shape.move.cleanup'], function (event) {
    var context = event.context,
        target = context.target;

    if (target) {
      setMarker(target, null);
    }
  });

  // remove previews
  eventBus.on('shape.move.cleanup', function (event) {

    var context = event.context,
        allDraggedElements = context.allDraggedElements,
        dragGroup = context.dragGroup;

    // remove dragging marker
    (0, _minDash.forEach)(allDraggedElements, function (e) {
      canvas.removeMarker(e, MARKER_DRAGGING);
    });

    if (dragGroup) {
      (0, _tinySvg.clear)(dragGroup);
    }
  });

  // API //////////////////////

  /**
   * Make an element draggable.
   *
   * @param {Object} context
   * @param {djs.model.Base} element
   * @param {Boolean} addMarker
   */
  this.makeDraggable = makeDraggable;
}

MovePreview.$inject = ['eventBus', 'elementRegistry', 'canvas', 'styles', 'previewSupport'];

// helpers //////////////////////

/**
 * returns elements minus all connections
 * where source or target is not elements
 */
function removeEdges(elements) {

  var filteredElements = (0, _minDash.filter)(elements, function (element) {

    if (!isConnection(element)) {
      return true;
    } else {

      return (0, _minDash.find)(elements, (0, _minDash.matchPattern)({ id: element.source.id })) && (0, _minDash.find)(elements, (0, _minDash.matchPattern)({ id: element.target.id }));
    }
  });

  return filteredElements;
}

function haveDifferentParents(elements) {
  return (0, _minDash.size)((0, _minDash.groupBy)(elements, function (e) {
    return e.parent && e.parent.id;
  })) !== 1;
}

/**
 * Checks if an element is a connection.
 */
function isConnection(element) {
  return element.waypoints;
}

},{"../../util/Elements":94,"../../util/SvgTransformUtil":105,"min-dash":108,"tiny-svg":114}],63:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _interactionEvents = require('../interaction-events');

var _interactionEvents2 = _interopRequireDefault(_interactionEvents);

var _selection = require('../selection');

var _selection2 = _interopRequireDefault(_selection);

var _outline = require('../outline');

var _outline2 = _interopRequireDefault(_outline);

var _rules = require('../rules');

var _rules2 = _interopRequireDefault(_rules);

var _dragging = require('../dragging');

var _dragging2 = _interopRequireDefault(_dragging);

var _previewSupport = require('../preview-support');

var _previewSupport2 = _interopRequireDefault(_previewSupport);

var _Move = require('./Move');

var _Move2 = _interopRequireDefault(_Move);

var _MovePreview = require('./MovePreview');

var _MovePreview2 = _interopRequireDefault(_MovePreview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  __depends__: [_interactionEvents2.default, _selection2.default, _outline2.default, _rules2.default, _dragging2.default, _previewSupport2.default],
  __init__: ['move', 'movePreview'],
  move: ['type', _Move2.default],
  movePreview: ['type', _MovePreview2.default]
};

},{"../dragging":30,"../interaction-events":32,"../outline":65,"../preview-support":71,"../rules":74,"../selection":78,"./Move":61,"./MovePreview":62}],64:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Outline;

var _Elements = require('../../util/Elements');

var _tinySvg = require('tiny-svg');

var _minDom = require('min-dom');

var _minDash = require('min-dash');

var LOW_PRIORITY = 500;

/**
 * @class
 *
 * A plugin that adds an outline to shapes and connections that may be activated and styled
 * via CSS classes.
 *
 * @param {EventBus} eventBus
 * @param {Styles} styles
 * @param {ElementRegistry} elementRegistry
 */
function Outline(eventBus, styles, elementRegistry) {

  this.offset = 6;

  var OUTLINE_STYLE = styles.cls('djs-outline', ['no-fill']);

  var self = this;

  function createOutline(gfx, bounds) {
    var outline = (0, _tinySvg.create)('rect');

    (0, _tinySvg.attr)(outline, (0, _minDash.assign)({
      x: 10,
      y: 10,
      width: 100,
      height: 100
    }, OUTLINE_STYLE));

    (0, _tinySvg.append)(gfx, outline);

    return outline;
  }

  // A low priortity is necessary, because outlines of labels have to be updated
  // after the label bounds have been updated in the renderer.
  eventBus.on(['shape.added', 'shape.changed'], LOW_PRIORITY, function (event) {
    var element = event.element,
        gfx = event.gfx;

    var outline = (0, _minDom.query)('.djs-outline', gfx);

    if (!outline) {
      outline = createOutline(gfx, element);
    }

    self.updateShapeOutline(outline, element);
  });

  eventBus.on(['connection.added', 'connection.changed'], function (event) {
    var element = event.element,
        gfx = event.gfx;

    var outline = (0, _minDom.query)('.djs-outline', gfx);

    if (!outline) {
      outline = createOutline(gfx, element);
    }

    self.updateConnectionOutline(outline, element);
  });
}

/**
 * Updates the outline of a shape respecting the dimension of the
 * element and an outline offset.
 *
 * @param  {SVGElement} outline
 * @param  {djs.model.Base} element
 */
Outline.prototype.updateShapeOutline = function (outline, element) {

  (0, _tinySvg.attr)(outline, {
    x: -this.offset,
    y: -this.offset,
    width: element.width + this.offset * 2,
    height: element.height + this.offset * 2
  });
};

/**
 * Updates the outline of a connection respecting the bounding box of
 * the connection and an outline offset.
 *
 * @param  {SVGElement} outline
 * @param  {djs.model.Base} element
 */
Outline.prototype.updateConnectionOutline = function (outline, connection) {

  var bbox = (0, _Elements.getBBox)(connection);

  (0, _tinySvg.attr)(outline, {
    x: bbox.x - this.offset,
    y: bbox.y - this.offset,
    width: bbox.width + this.offset * 2,
    height: bbox.height + this.offset * 2
  });
};

Outline.$inject = ['eventBus', 'styles', 'elementRegistry'];

},{"../../util/Elements":94,"min-dash":108,"min-dom":109,"tiny-svg":114}],65:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Outline = require('./Outline');

var _Outline2 = _interopRequireDefault(_Outline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  __init__: ['outline'],
  outline: ['type', _Outline2.default]
};

},{"./Outline":64}],66:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Overlays;

var _minDash = require('min-dash');

var _minDom = require('min-dom');

var _Elements = require('../../util/Elements');

var _IdGenerator = require('../../util/IdGenerator');

var _IdGenerator2 = _interopRequireDefault(_IdGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// document wide unique overlay ids
var ids = new _IdGenerator2.default('ov');

var LOW_PRIORITY = 500;

/**
 * A service that allows users to attach overlays to diagram elements.
 *
 * The overlay service will take care of overlay positioning during updates.
 *
 * @example
 *
 * // add a pink badge on the top left of the shape
 * overlays.add(someShape, {
 *   position: {
 *     top: -5,
 *     left: -5
 *   },
 *   html: '<div style="width: 10px; background: fuchsia; color: white;">0</div>'
 * });
 *
 * // or add via shape id
 *
 * overlays.add('some-element-id', {
 *   position: {
 *     top: -5,
 *     left: -5
 *   }
 *   html: '<div style="width: 10px; background: fuchsia; color: white;">0</div>'
 * });
 *
 * // or add with optional type
 *
 * overlays.add(someShape, 'badge', {
 *   position: {
 *     top: -5,
 *     left: -5
 *   }
 *   html: '<div style="width: 10px; background: fuchsia; color: white;">0</div>'
 * });
 *
 *
 * // remove an overlay
 *
 * var id = overlays.add(...);
 * overlays.remove(id);
 *
 *
 * You may configure overlay defaults during tool by providing a `config` module
 * with `overlays.defaults` as an entry:
 *
 * {
 *   overlays: {
 *     defaults: {
 *       show: {
 *         minZoom: 0.7,
 *         maxZoom: 5.0
 *       },
 *       scale: {
 *         min: 1
 *       }
 *     }
 * }
 *
 * @param {Object} config
 * @param {EventBus} eventBus
 * @param {Canvas} canvas
 * @param {ElementRegistry} elementRegistry
 */
function Overlays(config, eventBus, canvas, elementRegistry) {

  this._eventBus = eventBus;
  this._canvas = canvas;
  this._elementRegistry = elementRegistry;

  this._ids = ids;

  this._overlayDefaults = (0, _minDash.assign)({
    // no show constraints
    show: null,

    // always scale
    scale: true
  }, config && config.defaults);

  /**
   * Mapping overlayId -> overlay
   */
  this._overlays = {};

  /**
   * Mapping elementId -> overlay container
   */
  this._overlayContainers = [];

  // root html element for all overlays
  this._overlayRoot = createRoot(canvas.getContainer());

  this._init();
}

Overlays.$inject = ['config.overlays', 'eventBus', 'canvas', 'elementRegistry'];

/**
 * Returns the overlay with the specified id or a list of overlays
 * for an element with a given type.
 *
 * @example
 *
 * // return the single overlay with the given id
 * overlays.get('some-id');
 *
 * // return all overlays for the shape
 * overlays.get({ element: someShape });
 *
 * // return all overlays on shape with type 'badge'
 * overlays.get({ element: someShape, type: 'badge' });
 *
 * // shape can also be specified as id
 * overlays.get({ element: 'element-id', type: 'badge' });
 *
 *
 * @param {Object} search
 * @param {String} [search.id]
 * @param {String|djs.model.Base} [search.element]
 * @param {String} [search.type]
 *
 * @return {Object|Array<Object>} the overlay(s)
 */
Overlays.prototype.get = function (search) {

  if ((0, _minDash.isString)(search)) {
    search = { id: search };
  }

  if ((0, _minDash.isString)(search.element)) {
    search.element = this._elementRegistry.get(search.element);
  }

  if (search.element) {
    var container = this._getOverlayContainer(search.element, true);

    // return a list of overlays when searching by element (+type)
    if (container) {
      return search.type ? (0, _minDash.filter)(container.overlays, (0, _minDash.matchPattern)({ type: search.type })) : container.overlays.slice();
    } else {
      return [];
    }
  } else if (search.type) {
    return (0, _minDash.filter)(this._overlays, (0, _minDash.matchPattern)({ type: search.type }));
  } else {
    // return single element when searching by id
    return search.id ? this._overlays[search.id] : null;
  }
};

/**
 * Adds a HTML overlay to an element.
 *
 * @param {String|djs.model.Base}   element   attach overlay to this shape
 * @param {String}                  [type]    optional type to assign to the overlay
 * @param {Object}                  overlay   the overlay configuration
 *
 * @param {String|DOMElement}       overlay.html                 html element to use as an overlay
 * @param {Object}                  [overlay.show]               show configuration
 * @param {Number}                  [overlay.show.minZoom]       minimal zoom level to show the overlay
 * @param {Number}                  [overlay.show.maxZoom]       maximum zoom level to show the overlay
 * @param {Object}                  overlay.position             where to attach the overlay
 * @param {Number}                  [overlay.position.left]      relative to element bbox left attachment
 * @param {Number}                  [overlay.position.top]       relative to element bbox top attachment
 * @param {Number}                  [overlay.position.bottom]    relative to element bbox bottom attachment
 * @param {Number}                  [overlay.position.right]     relative to element bbox right attachment
 * @param {Boolean|Object}          [overlay.scale=true]         false to preserve the same size regardless of
 *                                                               diagram zoom
 * @param {Number}                  [overlay.scale.min]
 * @param {Number}                  [overlay.scale.max]
 *
 * @return {String}                 id that may be used to reference the overlay for update or removal
 */
Overlays.prototype.add = function (element, type, overlay) {

  if ((0, _minDash.isObject)(type)) {
    overlay = type;
    type = null;
  }

  if (!element.id) {
    element = this._elementRegistry.get(element);
  }

  if (!overlay.position) {
    throw new Error('must specifiy overlay position');
  }

  if (!overlay.html) {
    throw new Error('must specifiy overlay html');
  }

  if (!element) {
    throw new Error('invalid element specified');
  }

  var id = this._ids.next();

  overlay = (0, _minDash.assign)({}, this._overlayDefaults, overlay, {
    id: id,
    type: type,
    element: element,
    html: overlay.html
  });

  this._addOverlay(overlay);

  return id;
};

/**
 * Remove an overlay with the given id or all overlays matching the given filter.
 *
 * @see Overlays#get for filter options.
 *
 * @param {String} [id]
 * @param {Object} [filter]
 */
Overlays.prototype.remove = function (filter) {

  var overlays = this.get(filter) || [];

  if (!(0, _minDash.isArray)(overlays)) {
    overlays = [overlays];
  }

  var self = this;

  (0, _minDash.forEach)(overlays, function (overlay) {

    var container = self._getOverlayContainer(overlay.element, true);

    if (overlay) {
      (0, _minDom.remove)(overlay.html);
      (0, _minDom.remove)(overlay.htmlContainer);

      delete overlay.htmlContainer;
      delete overlay.element;

      delete self._overlays[overlay.id];
    }

    if (container) {
      var idx = container.overlays.indexOf(overlay);
      if (idx !== -1) {
        container.overlays.splice(idx, 1);
      }
    }
  });
};

Overlays.prototype.show = function () {
  setVisible(this._overlayRoot);
};

Overlays.prototype.hide = function () {
  setVisible(this._overlayRoot, false);
};

Overlays.prototype.clear = function () {
  this._overlays = {};

  this._overlayContainers = [];

  (0, _minDom.clear)(this._overlayRoot);
};

Overlays.prototype._updateOverlayContainer = function (container) {
  var element = container.element,
      html = container.html;

  // update container left,top according to the elements x,y coordinates
  // this ensures we can attach child elements relative to this container

  var x = element.x,
      y = element.y;

  if (element.waypoints) {
    var bbox = (0, _Elements.getBBox)(element);
    x = bbox.x;
    y = bbox.y;
  }

  setPosition(html, x, y);

  (0, _minDom.attr)(container.html, 'data-container-id', element.id);
};

Overlays.prototype._updateOverlay = function (overlay) {

  var position = overlay.position,
      htmlContainer = overlay.htmlContainer,
      element = overlay.element;

  // update overlay html relative to shape because
  // it is already positioned on the element

  // update relative
  var left = position.left,
      top = position.top;

  if (position.right !== undefined) {

    var width;

    if (element.waypoints) {
      width = (0, _Elements.getBBox)(element).width;
    } else {
      width = element.width;
    }

    left = position.right * -1 + width;
  }

  if (position.bottom !== undefined) {

    var height;

    if (element.waypoints) {
      height = (0, _Elements.getBBox)(element).height;
    } else {
      height = element.height;
    }

    top = position.bottom * -1 + height;
  }

  setPosition(htmlContainer, left || 0, top || 0);
};

Overlays.prototype._createOverlayContainer = function (element) {
  var html = (0, _minDom.domify)('<div class="djs-overlays" style="position: absolute" />');

  this._overlayRoot.appendChild(html);

  var container = {
    html: html,
    element: element,
    overlays: []
  };

  this._updateOverlayContainer(container);

  this._overlayContainers.push(container);

  return container;
};

Overlays.prototype._updateRoot = function (viewbox) {
  var scale = viewbox.scale || 1;

  var matrix = 'matrix(' + [scale, 0, 0, scale, -1 * viewbox.x * scale, -1 * viewbox.y * scale].join(',') + ')';

  setTransform(this._overlayRoot, matrix);
};

Overlays.prototype._getOverlayContainer = function (element, raw) {
  var container = (0, _minDash.find)(this._overlayContainers, function (c) {
    return c.element === element;
  });

  if (!container && !raw) {
    return this._createOverlayContainer(element);
  }

  return container;
};

Overlays.prototype._addOverlay = function (overlay) {

  var id = overlay.id,
      element = overlay.element,
      html = overlay.html,
      htmlContainer,
      overlayContainer;

  // unwrap jquery (for those who need it)
  if (html.get && html.constructor.prototype.jquery) {
    html = html.get(0);
  }

  // create proper html elements from
  // overlay HTML strings
  if ((0, _minDash.isString)(html)) {
    html = (0, _minDom.domify)(html);
  }

  overlayContainer = this._getOverlayContainer(element);

  htmlContainer = (0, _minDom.domify)('<div class="djs-overlay" data-overlay-id="' + id + '" style="position: absolute">');

  htmlContainer.appendChild(html);

  if (overlay.type) {
    (0, _minDom.classes)(htmlContainer).add('djs-overlay-' + overlay.type);
  }

  overlay.htmlContainer = htmlContainer;

  overlayContainer.overlays.push(overlay);
  overlayContainer.html.appendChild(htmlContainer);

  this._overlays[id] = overlay;

  this._updateOverlay(overlay);
  this._updateOverlayVisibilty(overlay, this._canvas.viewbox());
};

Overlays.prototype._updateOverlayVisibilty = function (overlay, viewbox) {
  var show = overlay.show,
      minZoom = show && show.minZoom,
      maxZoom = show && show.maxZoom,
      htmlContainer = overlay.htmlContainer,
      visible = true;

  if (show) {
    if ((0, _minDash.isDefined)(minZoom) && minZoom > viewbox.scale || (0, _minDash.isDefined)(maxZoom) && maxZoom < viewbox.scale) {
      visible = false;
    }

    setVisible(htmlContainer, visible);
  }

  this._updateOverlayScale(overlay, viewbox);
};

Overlays.prototype._updateOverlayScale = function (overlay, viewbox) {
  var shouldScale = overlay.scale,
      minScale,
      maxScale,
      htmlContainer = overlay.htmlContainer;

  var scale,
      transform = '';

  if (shouldScale !== true) {

    if (shouldScale === false) {
      minScale = 1;
      maxScale = 1;
    } else {
      minScale = shouldScale.min;
      maxScale = shouldScale.max;
    }

    if ((0, _minDash.isDefined)(minScale) && viewbox.scale < minScale) {
      scale = (1 / viewbox.scale || 1) * minScale;
    }

    if ((0, _minDash.isDefined)(maxScale) && viewbox.scale > maxScale) {
      scale = (1 / viewbox.scale || 1) * maxScale;
    }
  }

  if ((0, _minDash.isDefined)(scale)) {
    transform = 'scale(' + scale + ',' + scale + ')';
  }

  setTransform(htmlContainer, transform);
};

Overlays.prototype._updateOverlaysVisibilty = function (viewbox) {

  var self = this;

  (0, _minDash.forEach)(this._overlays, function (overlay) {
    self._updateOverlayVisibilty(overlay, viewbox);
  });
};

Overlays.prototype._init = function () {

  var eventBus = this._eventBus;

  var self = this;

  // scroll/zoom integration

  function updateViewbox(viewbox) {
    self._updateRoot(viewbox);
    self._updateOverlaysVisibilty(viewbox);

    self.show();
  }

  eventBus.on('canvas.viewbox.changing', function (event) {
    self.hide();
  });

  eventBus.on('canvas.viewbox.changed', function (event) {
    updateViewbox(event.viewbox);
  });

  // remove integration

  eventBus.on(['shape.remove', 'connection.remove'], function (e) {
    var element = e.element;
    var overlays = self.get({ element: element });

    (0, _minDash.forEach)(overlays, function (o) {
      self.remove(o.id);
    });

    var container = self._getOverlayContainer(element);

    if (container) {
      (0, _minDom.remove)(container.html);
      var i = self._overlayContainers.indexOf(container);
      if (i !== -1) {
        self._overlayContainers.splice(i, 1);
      }
    }
  });

  // move integration

  eventBus.on('element.changed', LOW_PRIORITY, function (e) {
    var element = e.element;

    var container = self._getOverlayContainer(element, true);

    if (container) {
      (0, _minDash.forEach)(container.overlays, function (overlay) {
        self._updateOverlay(overlay);
      });

      self._updateOverlayContainer(container);
    }
  });

  // marker integration, simply add them on the overlays as classes, too.

  eventBus.on('element.marker.update', function (e) {
    var container = self._getOverlayContainer(e.element, true);
    if (container) {
      (0, _minDom.classes)(container.html)[e.add ? 'add' : 'remove'](e.marker);
    }
  });

  // clear overlays with diagram

  eventBus.on('diagram.clear', this.clear, this);
};

// helpers /////////////////////////////

function createRoot(parentNode) {
  var root = (0, _minDom.domify)('<div class="djs-overlay-container" style="position: absolute; width: 0; height: 0;" />');

  parentNode.insertBefore(root, parentNode.firstChild);

  return root;
}

function setPosition(el, x, y) {
  (0, _minDash.assign)(el.style, { left: x + 'px', top: y + 'px' });
}

function setVisible(el, visible) {
  el.style.display = visible === false ? 'none' : '';
}

function setTransform(el, transform) {

  el.style['transform-origin'] = 'top left';

  ['', '-ms-', '-webkit-'].forEach(function (prefix) {
    el.style[prefix + 'transform'] = transform;
  });
}

},{"../../util/Elements":94,"../../util/IdGenerator":98,"min-dash":108,"min-dom":109}],67:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Overlays = require('./Overlays');

var _Overlays2 = _interopRequireDefault(_Overlays);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  __init__: ['overlays'],
  overlays: ['type', _Overlays2.default]
};

},{"./Overlays":66}],68:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Palette;

var _minDash = require('min-dash');

var _minDom = require('min-dom');

var TOGGLE_SELECTOR = '.djs-palette-toggle',
    ENTRY_SELECTOR = '.entry',
    ELEMENT_SELECTOR = TOGGLE_SELECTOR + ', ' + ENTRY_SELECTOR;

var PALETTE_OPEN_CLS = 'open',
    PALETTE_TWO_COLUMN_CLS = 'two-column';

/**
 * A palette containing modeling elements.
 */
function Palette(eventBus, canvas) {

  this._eventBus = eventBus;
  this._canvas = canvas;

  this._providers = [];

  var self = this;

  eventBus.on('tool-manager.update', function (event) {
    var tool = event.tool;

    self.updateToolHighlight(tool);
  });

  eventBus.on('i18n.changed', function () {
    self._update();
  });

  eventBus.on('diagram.init', function () {

    self._diagramInitialized = true;

    // initialize + update once diagram is ready
    if (self._providers.length) {
      self._init();

      self._update();
    }
  });
}

Palette.$inject = ['eventBus', 'canvas'];

/**
 * Register a provider with the palette
 *
 * @param  {PaletteProvider} provider
 */
Palette.prototype.registerProvider = function (provider) {
  this._providers.push(provider);

  // postpone init / update until diagram is initialized
  if (!this._diagramInitialized) {
    return;
  }

  if (!this._container) {
    this._init();
  }

  this._update();
};

/**
 * Returns the palette entries for a given element
 *
 * @return {Array<PaletteEntryDescriptor>} list of entries
 */
Palette.prototype.getEntries = function () {

  var entries = {};

  // loop through all providers and their entries.
  // group entries by id so that overriding an entry is possible
  (0, _minDash.forEach)(this._providers, function (provider) {
    var e = provider.getPaletteEntries();

    (0, _minDash.forEach)(e, function (entry, id) {
      entries[id] = entry;
    });
  });

  return entries;
};

/**
 * Initialize
 */
Palette.prototype._init = function () {
  var canvas = this._canvas,
      eventBus = this._eventBus;

  var parent = canvas.getContainer(),
      container = this._container = (0, _minDom.domify)(Palette.HTML_MARKUP),
      self = this;

  parent.appendChild(container);

  _minDom.delegate.bind(container, ELEMENT_SELECTOR, 'click', function (event) {

    var target = event.delegateTarget;

    if ((0, _minDom.matches)(target, TOGGLE_SELECTOR)) {
      return self.toggle();
    }

    self.trigger('click', event);
  });

  // prevent drag propagation
  _minDom.event.bind(container, 'mousedown', function (event) {
    event.stopPropagation();
  });

  // prevent drag propagation
  _minDom.delegate.bind(container, ENTRY_SELECTOR, 'dragstart', function (event) {
    self.trigger('dragstart', event);
  });

  eventBus.on('canvas.resized', this._layoutChanged, this);

  eventBus.fire('palette.create', {
    container: container
  });
};

/**
 * Update palette state.
 *
 * @param  {Object} [state] { open, twoColumn }
 */
Palette.prototype._toggleState = function (state) {

  state = state || {};

  var parent = this._getParentContainer(),
      container = this._container;

  var eventBus = this._eventBus;

  var twoColumn;

  var cls = (0, _minDom.classes)(container);

  if ('twoColumn' in state) {
    twoColumn = state.twoColumn;
  } else {
    twoColumn = this._needsCollapse(parent.clientHeight, this._entries || {});
  }

  // always update two column
  cls.toggle(PALETTE_TWO_COLUMN_CLS, twoColumn);

  if ('open' in state) {
    cls.toggle(PALETTE_OPEN_CLS, state.open);
  }

  eventBus.fire('palette.changed', {
    twoColumn: twoColumn,
    open: this.isOpen()
  });
};

Palette.prototype._update = function () {

  var entriesContainer = (0, _minDom.query)('.djs-palette-entries', this._container),
      entries = this._entries = this.getEntries();

  (0, _minDom.clear)(entriesContainer);

  (0, _minDash.forEach)(entries, function (entry, id) {

    var grouping = entry.group || 'default';

    var container = (0, _minDom.query)('[data-group=' + grouping + ']', entriesContainer);
    if (!container) {
      container = (0, _minDom.domify)('<div class="group" data-group="' + grouping + '"></div>');
      entriesContainer.appendChild(container);
    }

    var html = entry.html || (entry.separator ? '<hr class="separator" />' : '<div class="entry" draggable="true"></div>');

    var control = (0, _minDom.domify)(html);
    container.appendChild(control);

    if (!entry.separator) {
      (0, _minDom.attr)(control, 'data-action', id);

      if (entry.title) {
        (0, _minDom.attr)(control, 'title', entry.title);
      }

      if (entry.className) {
        addClasses(control, entry.className);
      }

      if (entry.imageUrl) {
        control.appendChild((0, _minDom.domify)('<img src="' + entry.imageUrl + '">'));
      }
    }
  });

  // open after update
  this.open();
};

/**
 * Trigger an action available on the palette
 *
 * @param  {String} action
 * @param  {Event} event
 */
Palette.prototype.trigger = function (action, event, autoActivate) {
  var entries = this._entries,
      entry,
      handler,
      originalEvent,
      button = event.delegateTarget || event.target;

  if (!button) {
    return event.preventDefault();
  }

  entry = entries[(0, _minDom.attr)(button, 'data-action')];

  // when user clicks on the palette and not on an action
  if (!entry) {
    return;
  }

  handler = entry.action;

  originalEvent = event.originalEvent || event;

  // simple action (via callback function)
  if ((0, _minDash.isFunction)(handler)) {
    if (action === 'click') {
      handler(originalEvent, autoActivate);
    }
  } else {
    if (handler[action]) {
      handler[action](originalEvent, autoActivate);
    }
  }

  // silence other actions
  event.preventDefault();
};

Palette.prototype._layoutChanged = function () {
  this._toggleState({});
};

/**
 * Do we need to collapse to two columns?
 *
 * @param {Number} availableHeight
 * @param {Object} entries
 *
 * @return {Boolean}
 */
Palette.prototype._needsCollapse = function (availableHeight, entries) {

  // top margin + bottom toggle + bottom margin
  // implementors must override this method if they
  // change the palette styles
  var margin = 20 + 10 + 20;

  var entriesHeight = Object.keys(entries).length * 46;

  return availableHeight < entriesHeight + margin;
};

/**
 * Close the palette
 */
Palette.prototype.close = function () {

  this._toggleState({
    open: false,
    twoColumn: false
  });
};

/**
 * Open the palette
 */
Palette.prototype.open = function () {
  this._toggleState({ open: true });
};

Palette.prototype.toggle = function (open) {
  if (this.isOpen()) {
    this.close();
  } else {
    this.open();
  }
};

Palette.prototype.isActiveTool = function (tool) {
  return tool && this._activeTool === tool;
};

Palette.prototype.updateToolHighlight = function (name) {
  var entriesContainer, toolsContainer;

  if (!this._toolsContainer) {
    entriesContainer = (0, _minDom.query)('.djs-palette-entries', this._container);

    this._toolsContainer = (0, _minDom.query)('[data-group=tools]', entriesContainer);
  }

  toolsContainer = this._toolsContainer;

  (0, _minDash.forEach)(toolsContainer.children, function (tool) {
    var actionName = tool.getAttribute('data-action');

    if (!actionName) {
      return;
    }

    var toolClasses = (0, _minDom.classes)(tool);

    actionName = actionName.replace('-tool', '');

    if (toolClasses.contains('entry') && actionName === name) {
      toolClasses.add('highlighted-entry');
    } else {
      toolClasses.remove('highlighted-entry');
    }
  });
};

/**
 * Return true if the palette is opened.
 *
 * @example
 *
 * palette.open();
 *
 * if (palette.isOpen()) {
 *   // yes, we are open
 * }
 *
 * @return {boolean} true if palette is opened
 */
Palette.prototype.isOpen = function () {
  return (0, _minDom.classes)(this._container).has(PALETTE_OPEN_CLS);
};

/**
 * Get container the palette lives in.
 *
 * @return {Element}
 */
Palette.prototype._getParentContainer = function () {
  return this._canvas.getContainer();
};

/* markup definition */

Palette.HTML_MARKUP = '<div class="djs-palette">' + '<div class="djs-palette-entries"></div>' + '<div class="djs-palette-toggle"></div>' + '</div>';

// helpers //////////////////////

function addClasses(element, classNames) {

  var classes = (0, _minDom.classes)(element);

  var actualClassNames = (0, _minDash.isArray)(classNames) ? classNames : classNames.split(/\s+/g);
  actualClassNames.forEach(function (cls) {
    classes.add(cls);
  });
}

},{"min-dash":108,"min-dom":109}],69:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Palette = require('./Palette');

var _Palette2 = _interopRequireDefault(_Palette);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  __init__: ['palette'],
  palette: ['type', _Palette2.default]
};

},{"./Palette":68}],70:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PreviewSupport;

var _minDash = require('min-dash');

var _tinySvg = require('tiny-svg');

/**
 * Adds support for previews of moving/resizing elements.
 */
function PreviewSupport(elementRegistry, canvas, styles) {
  this._elementRegistry = elementRegistry;
  this._canvas = canvas;
  this._styles = styles;
}

PreviewSupport.$inject = ['elementRegistry', 'canvas', 'styles'];

/**
 * Returns graphics of an element.
 *
 * @param {djs.model.Base} element
 *
 * @return {SVGElement}
 */
PreviewSupport.prototype.getGfx = function (element) {
  return this._elementRegistry.getGraphics(element);
};

/**
 * Adds a move preview of a given shape to a given svg group.
 *
 * @param {djs.model.Base} element
 * @param {SVGElement} group
 *
 * @return {SVGElement} dragger
 */
PreviewSupport.prototype.addDragger = function (shape, group) {
  var gfx = this.getGfx(shape);

  // clone is not included in tsvg for some reason
  var dragger = (0, _tinySvg.clone)(gfx);
  var bbox = gfx.getBoundingClientRect();

  // remove markers from connections
  if (isConnection(shape)) {
    removeMarkers(dragger);
  }

  (0, _tinySvg.attr)(dragger, this._styles.cls('djs-dragger', [], {
    x: bbox.top,
    y: bbox.left
  }));

  (0, _tinySvg.append)(group, dragger);

  return dragger;
};

/**
 * Adds a resize preview of a given shape to a given svg group.
 *
 * @param {djs.model.Base} element
 * @param {SVGElement} group
 *
 * @return {SVGElement} frame
 */
PreviewSupport.prototype.addFrame = function (shape, group) {

  var frame = (0, _tinySvg.create)('rect', {
    class: 'djs-resize-overlay',
    width: shape.width,
    height: shape.height,
    x: shape.x,
    y: shape.y
  });

  (0, _tinySvg.append)(group, frame);

  return frame;
};

// helpers //////////////////////

/**
 * Removes all svg marker references from an SVG.
 *
 * @param {SVGElement} gfx
 */
function removeMarkers(gfx) {

  if (gfx.children) {

    (0, _minDash.forEach)(gfx.children, function (child) {

      // recursion
      removeMarkers(child);
    });
  }

  gfx.style.markerStart = '';
  gfx.style.markerEnd = '';
}

/**
 * Checks if an element is a connection.
 */
function isConnection(element) {
  return element.waypoints;
}

},{"min-dash":108,"tiny-svg":114}],71:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PreviewSupport = require('./PreviewSupport');

var _PreviewSupport2 = _interopRequireDefault(_PreviewSupport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  __init__: ['previewSupport'],
  previewSupport: ['type', _PreviewSupport2.default]
};

},{"./PreviewSupport":70}],72:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = RuleProvider;

var _inherits = require('inherits');

var _inherits2 = _interopRequireDefault(_inherits);

var _CommandInterceptor = require('../../command/CommandInterceptor');

var _CommandInterceptor2 = _interopRequireDefault(_CommandInterceptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A basic provider that may be extended to implement modeling rules.
 *
 * Extensions should implement the init method to actually add their custom
 * modeling checks. Checks may be added via the #addRule(action, fn) method.
 *
 * @param {EventBus} eventBus
 */
function RuleProvider(eventBus) {
  _CommandInterceptor2.default.call(this, eventBus);

  this.init();
}

RuleProvider.$inject = ['eventBus'];

(0, _inherits2.default)(RuleProvider, _CommandInterceptor2.default);

/**
 * Adds a modeling rule for the given action, implemented through
 * a callback function.
 *
 * The function will receive the modeling specific action context
 * to perform its check. It must return `false` to disallow the
 * action from happening or `true` to allow the action.
 *
 * A rule provider may pass over the evaluation to lower priority
 * rules by returning return nothing (or <code>undefined</code>).
 *
 * @example
 *
 * ResizableRules.prototype.init = function() {
 *
 *   \/**
 *    * Return `true`, `false` or nothing to denote
 *    * _allowed_, _not allowed_ and _continue evaluating_.
 *    *\/
 *   this.addRule('shape.resize', function(context) {
 *
 *     var shape = context.shape;
 *
 *     if (!context.newBounds) {
 *       // check general resizability
 *       if (!shape.resizable) {
 *         return false;
 *       }
 *
 *       // not returning anything (read: undefined)
 *       // will continue the evaluation of other rules
 *       // (with lower priority)
 *       return;
 *     } else {
 *       // element must have minimum size of 10*10 points
 *       return context.newBounds.width > 10 && context.newBounds.height > 10;
 *     }
 *   });
 * };
 *
 * @param {String|Array<String>} actions the identifier for the modeling action to check
 * @param {Number} [priority] the priority at which this rule is being applied
 * @param {Function} fn the callback function that performs the actual check
 */
RuleProvider.prototype.addRule = function (actions, priority, fn) {

  var self = this;

  if (typeof actions === 'string') {
    actions = [actions];
  }

  actions.forEach(function (action) {

    self.canExecute(action, priority, function (context, action, event) {
      return fn(context);
    }, true);
  });
};

/**
 * Implement this method to add new rules during provider initialization.
 */
RuleProvider.prototype.init = function () {};

},{"../../command/CommandInterceptor":7,"inherits":107}],73:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Rules;
/**
 * A service that provides rules for certain diagram actions.
 *
 * The default implementation will hook into the {@link CommandStack}
 * to perform the actual rule evaluation. Make sure to provide the
 * `commandStack` service with this module if you plan to use it.
 *
 * Together with this implementation you may use the {@link RuleProvider}
 * to implement your own rule checkers.
 *
 * This module is ment to be easily replaced, thus the tiny foot print.
 *
 * @param {Injector} injector
 */
function Rules(injector) {
  this._commandStack = injector.get('commandStack', false);
}

Rules.$inject = ['injector'];

/**
 * Returns whether or not a given modeling action can be executed
 * in the specified context.
 *
 * This implementation will respond with allow unless anyone
 * objects.
 *
 * @param {String} action the action to be checked
 * @param {Object} [context] the context to check the action in
 *
 * @return {Boolean} returns true, false or null depending on whether the
 *                   operation is allowed, not allowed or should be ignored.
 */
Rules.prototype.allowed = function (action, context) {
  var allowed = true;

  var commandStack = this._commandStack;

  if (commandStack) {
    allowed = commandStack.canExecute(action, context);
  }

  // map undefined to true, i.e. no rules
  return allowed === undefined ? true : allowed;
};

},{}],74:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Rules = require('./Rules');

var _Rules2 = _interopRequireDefault(_Rules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  __init__: ['rules'],
  rules: ['type', _Rules2.default]
};

},{"./Rules":73}],75:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Selection;

var _minDash = require('min-dash');

/**
 * A service that offers the current selection in a diagram.
 * Offers the api to control the selection, too.
 *
 * @class
 *
 * @param {EventBus} eventBus the event bus
 */
function Selection(eventBus) {

  this._eventBus = eventBus;

  this._selectedElements = [];

  var self = this;

  eventBus.on(['shape.remove', 'connection.remove'], function (e) {
    var element = e.element;
    self.deselect(element);
  });

  eventBus.on(['diagram.clear'], function (e) {
    self.select(null);
  });
}

Selection.$inject = ['eventBus'];

Selection.prototype.deselect = function (element) {
  var selectedElements = this._selectedElements;

  var idx = selectedElements.indexOf(element);

  if (idx !== -1) {
    var oldSelection = selectedElements.slice();

    selectedElements.splice(idx, 1);

    this._eventBus.fire('selection.changed', { oldSelection: oldSelection, newSelection: selectedElements });
  }
};

Selection.prototype.get = function () {
  return this._selectedElements;
};

Selection.prototype.isSelected = function (element) {
  return this._selectedElements.indexOf(element) !== -1;
};

/**
 * This method selects one or more elements on the diagram.
 *
 * By passing an additional add parameter you can decide whether or not the element(s)
 * should be added to the already existing selection or not.
 *
 * @method Selection#select
 *
 * @param  {Object|Object[]} elements element or array of elements to be selected
 * @param  {boolean} [add] whether the element(s) should be appended to the current selection, defaults to false
 */
Selection.prototype.select = function (elements, add) {
  var selectedElements = this._selectedElements,
      oldSelection = selectedElements.slice();

  if (!(0, _minDash.isArray)(elements)) {
    elements = elements ? [elements] : [];
  }

  // selection may be cleared by passing an empty array or null
  // to the method
  if (add) {
    (0, _minDash.forEach)(elements, function (element) {
      if (selectedElements.indexOf(element) !== -1) {
        // already selected
        return;
      } else {
        selectedElements.push(element);
      }
    });
  } else {
    this._selectedElements = selectedElements = elements.slice();
  }

  this._eventBus.fire('selection.changed', { oldSelection: oldSelection, newSelection: selectedElements });
};

},{"min-dash":108}],76:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SelectionBehavior;

var _Mouse = require('../../util/Mouse');

var _minDash = require('min-dash');

function SelectionBehavior(eventBus, selection, canvas, elementRegistry) {

  eventBus.on('create.end', 500, function (e) {

    // select the created shape after a
    // successful create operation
    if (e.context.canExecute) {
      selection.select(e.context.shape);
    }
  });

  eventBus.on('connect.end', 500, function (e) {

    // select the connect end target
    // after a connect operation
    if (e.context.canExecute && e.context.target) {
      selection.select(e.context.target);
    }
  });

  eventBus.on('shape.move.end', 500, function (e) {
    var previousSelection = e.previousSelection || [];

    var shape = elementRegistry.get(e.context.shape.id);

    // make sure at least the main moved element is being
    // selected after a move operation
    var inSelection = (0, _minDash.find)(previousSelection, function (selectedShape) {
      return shape.id === selectedShape.id;
    });

    if (!inSelection) {
      selection.select(shape);
    }
  });

  // Shift + click selection
  eventBus.on('element.click', function (event) {

    var element = event.element;

    // do not select the root element
    // or connections
    if (element === canvas.getRootElement()) {
      element = null;
    }

    var isSelected = selection.isSelected(element),
        isMultiSelect = selection.get().length > 1;

    // mouse-event: SELECTION_KEY
    var add = (0, _Mouse.hasPrimaryModifier)(event);

    // select OR deselect element in multi selection
    if (isSelected && isMultiSelect) {
      if (add) {
        return selection.deselect(element);
      } else {
        return selection.select(element);
      }
    } else if (!isSelected) {
      selection.select(element, add);
    } else {
      selection.deselect(element);
    }
  });
}

SelectionBehavior.$inject = ['eventBus', 'selection', 'canvas', 'elementRegistry'];

},{"../../util/Mouse":100,"min-dash":108}],77:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SelectionVisuals;

var _minDash = require('min-dash');

var MARKER_HOVER = 'hover',
    MARKER_SELECTED = 'selected';

/**
 * A plugin that adds a visible selection UI to shapes and connections
 * by appending the <code>hover</code> and <code>selected</code> classes to them.
 *
 * @class
 *
 * Makes elements selectable, too.
 *
 * @param {EventBus} events
 * @param {SelectionService} selection
 * @param {Canvas} canvas
 */
function SelectionVisuals(events, canvas, selection, styles) {

  this._multiSelectionBox = null;

  function addMarker(e, cls) {
    canvas.addMarker(e, cls);
  }

  function removeMarker(e, cls) {
    canvas.removeMarker(e, cls);
  }

  events.on('element.hover', function (event) {
    addMarker(event.element, MARKER_HOVER);
  });

  events.on('element.out', function (event) {
    removeMarker(event.element, MARKER_HOVER);
  });

  events.on('selection.changed', function (event) {

    function deselect(s) {
      removeMarker(s, MARKER_SELECTED);
    }

    function select(s) {
      addMarker(s, MARKER_SELECTED);
    }

    var oldSelection = event.oldSelection,
        newSelection = event.newSelection;

    (0, _minDash.forEach)(oldSelection, function (e) {
      if (newSelection.indexOf(e) === -1) {
        deselect(e);
      }
    });

    (0, _minDash.forEach)(newSelection, function (e) {
      if (oldSelection.indexOf(e) === -1) {
        select(e);
      }
    });
  });
}

SelectionVisuals.$inject = ['eventBus', 'canvas', 'selection', 'styles'];

},{"min-dash":108}],78:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _interactionEvents = require('../interaction-events');

var _interactionEvents2 = _interopRequireDefault(_interactionEvents);

var _outline = require('../outline');

var _outline2 = _interopRequireDefault(_outline);

var _Selection = require('./Selection');

var _Selection2 = _interopRequireDefault(_Selection);

var _SelectionVisuals = require('./SelectionVisuals');

var _SelectionVisuals2 = _interopRequireDefault(_SelectionVisuals);

var _SelectionBehavior = require('./SelectionBehavior');

var _SelectionBehavior2 = _interopRequireDefault(_SelectionBehavior);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  __init__: ['selectionVisuals', 'selectionBehavior'],
  __depends__: [_interactionEvents2.default, _outline2.default],
  selection: ['type', _Selection2.default],
  selectionVisuals: ['type', _SelectionVisuals2.default],
  selectionBehavior: ['type', _SelectionBehavior2.default]
};

},{"../interaction-events":32,"../outline":65,"./Selection":75,"./SelectionBehavior":76,"./SelectionVisuals":77}],79:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDirection = getDirection;
exports.resizeBounds = resizeBounds;
/**
 * Get Resize direction given axis + offset
 *
 * @param {String} axis (x|y)
 * @param {Number} offset
 *
 * @return {String} (e|w|n|s)
 */
function getDirection(axis, offset) {

  if (axis === 'x') {
    if (offset > 0) {
      return 'e';
    }

    if (offset < 0) {
      return 'w';
    }
  }

  if (axis === 'y') {
    if (offset > 0) {
      return 's';
    }

    if (offset < 0) {
      return 'n';
    }
  }

  return null;
}

/**
 * Resize the given bounds by the specified delta from a given anchor point.
 *
 * @param {Bounds} bounds the bounding box that should be resized
 * @param {String} direction in which the element is resized (n, s, e, w)
 * @param {Point} delta of the resize operation
 *
 * @return {Bounds} resized bounding box
 */
function resizeBounds(bounds, direction, delta) {

  var dx = delta.x,
      dy = delta.y;

  switch (direction) {

    case 'n':
      return {
        x: bounds.x,
        y: bounds.y + dy,
        width: bounds.width,
        height: bounds.height - dy
      };

    case 's':
      return {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height + dy
      };

    case 'w':
      return {
        x: bounds.x + dx,
        y: bounds.y,
        width: bounds.width - dx,
        height: bounds.height
      };

    case 'e':
      return {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width + dx,
        height: bounds.height
      };

    default:
      throw new Error('unrecognized direction: ' + direction);
  }
}

},{}],80:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ToolManager;

var _minDash = require('min-dash');

var _minDom = require('min-dom');

var LOW_PRIORITY = 250;

/**
 * The tool manager acts as middle-man between the available tool's and the Palette,
 * it takes care of making sure that the correct active state is set.
 *
 * @param  {Object}    eventBus
 * @param  {Object}    dragging
 */
function ToolManager(eventBus, dragging) {
  this._eventBus = eventBus;
  this._dragging = dragging;

  this._tools = [];
  this._active = null;
}

ToolManager.$inject = ['eventBus', 'dragging'];

ToolManager.prototype.registerTool = function (name, events) {
  var tools = this._tools;

  if (!events) {
    throw new Error('A tool has to be registered with it\'s "events"');
  }

  tools.push(name);

  this.bindEvents(name, events);
};

ToolManager.prototype.isActive = function (tool) {
  return tool && this._active === tool;
};

ToolManager.prototype.length = function (tool) {
  return this._tools.length;
};

ToolManager.prototype.setActive = function (tool) {
  var eventBus = this._eventBus;

  if (this._active !== tool) {
    this._active = tool;

    eventBus.fire('tool-manager.update', { tool: tool });
  }
};

ToolManager.prototype.bindEvents = function (name, events) {
  var eventBus = this._eventBus,
      dragging = this._dragging;

  var eventsToRegister = [];

  eventBus.on(events.tool + '.init', function (event) {
    var context = event.context;

    // Active tools that want to reactivate themselves must do this explicitly
    if (!context.reactivate && this.isActive(name)) {
      this.setActive(null);

      dragging.cancel();
      return;
    }

    this.setActive(name);
  }, this);

  // Todo[ricardo]: add test cases
  (0, _minDash.forEach)(events, function (event) {
    eventsToRegister.push(event + '.ended');
    eventsToRegister.push(event + '.canceled');
  });

  eventBus.on(eventsToRegister, LOW_PRIORITY, function (event) {
    var originalEvent = event.originalEvent;

    // We defer the de-activation of the tool to the .activate phase,
    // so we're able to check if we want to toggle off the current
    // active tool or switch to a new one
    if (!this._active) {
      return;
    }

    if (originalEvent && (0, _minDom.closest)(originalEvent.target, '.group[data-group="tools"]')) {
      return;
    }

    this.setActive(null);
  }, this);
};

},{"min-dash":108,"min-dom":109}],81:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dragging = require('../dragging');

var _dragging2 = _interopRequireDefault(_dragging);

var _ToolManager = require('./ToolManager');

var _ToolManager2 = _interopRequireDefault(_ToolManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  __depends__: [_dragging2.default],
  __init__: ['toolManager'],
  toolManager: ['type', _ToolManager2.default]
};

},{"../dragging":30,"./ToolManager":80}],82:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BaseLayouter;

var _LayoutUtil = require('./LayoutUtil');

/**
 * A base connection layouter implementation
 * that layouts the connection by directly connecting
 * mid(source) + mid(target).
 */
function BaseLayouter() {}

/**
 * Return the new layouted waypoints for the given connection.
 *
 * The connection passed is still unchanged; you may figure out about
 * the new connection start / end via the layout hints provided.
 *
 * @param {djs.model.Connection} connection
 * @param {Object} [hints]
 * @param {Point} [hints.connectionStart]
 * @param {Point} [hints.connectionEnd]
 *
 * @return {Array<Point>} the layouted connection waypoints
 */
BaseLayouter.prototype.layoutConnection = function (connection, hints) {

  hints = hints || {};

  return [hints.connectionStart || (0, _LayoutUtil.getMid)(connection.source), hints.connectionEnd || (0, _LayoutUtil.getMid)(connection.target)];
};

},{"./LayoutUtil":83}],83:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roundBounds = roundBounds;
exports.roundPoint = roundPoint;
exports.asTRBL = asTRBL;
exports.asBounds = asBounds;
exports.getMid = getMid;
exports.getOrientation = getOrientation;
exports.getElementLineIntersection = getElementLineIntersection;
exports.getIntersections = getIntersections;

var _minDash = require('min-dash');

var _Geometry = require('../util/Geometry');

var _pathIntersection = require('path-intersection');

var _pathIntersection2 = _interopRequireDefault(_pathIntersection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function roundBounds(bounds) {
  return {
    x: Math.round(bounds.x),
    y: Math.round(bounds.y),
    width: Math.round(bounds.width),
    height: Math.round(bounds.height)
  };
}

function roundPoint(point) {

  return {
    x: Math.round(point.x),
    y: Math.round(point.y)
  };
}

/**
 * Convert the given bounds to a { top, left, bottom, right } descriptor.
 *
 * @param {Bounds|Point} bounds
 *
 * @return {Object}
 */
function asTRBL(bounds) {
  return {
    top: bounds.y,
    right: bounds.x + (bounds.width || 0),
    bottom: bounds.y + (bounds.height || 0),
    left: bounds.x
  };
}

/**
 * Convert a { top, left, bottom, right } to an objects bounds.
 *
 * @param {Object} trbl
 *
 * @return {Bounds}
 */
function asBounds(trbl) {
  return {
    x: trbl.left,
    y: trbl.top,
    width: trbl.right - trbl.left,
    height: trbl.bottom - trbl.top
  };
}

/**
 * Get the mid of the given bounds or point.
 *
 * @param {Bounds|Point} bounds
 *
 * @return {Point}
 */
function getMid(bounds) {
  return roundPoint({
    x: bounds.x + (bounds.width || 0) / 2,
    y: bounds.y + (bounds.height || 0) / 2
  });
}

// orientation utils //////////////////////

/**
 * Get orientation of the given rectangle with respect to
 * the reference rectangle.
 *
 * A padding (positive or negative) may be passed to influence
 * horizontal / vertical orientation and intersection.
 *
 * @param {Bounds} rect
 * @param {Bounds} reference
 * @param {Point|Number} padding
 *
 * @return {String} the orientation; one of top, top-left, left, ..., bottom, right or intersect.
 */
function getOrientation(rect, reference, padding) {

  padding = padding || 0;

  // make sure we can use an object, too
  // for individual { x, y } padding
  if (!(0, _minDash.isObject)(padding)) {
    padding = { x: padding, y: padding };
  }

  var rectOrientation = asTRBL(rect),
      referenceOrientation = asTRBL(reference);

  var top = rectOrientation.bottom + padding.y <= referenceOrientation.top,
      right = rectOrientation.left - padding.x >= referenceOrientation.right,
      bottom = rectOrientation.top - padding.y >= referenceOrientation.bottom,
      left = rectOrientation.right + padding.x <= referenceOrientation.left;

  var vertical = top ? 'top' : bottom ? 'bottom' : null,
      horizontal = left ? 'left' : right ? 'right' : null;

  if (horizontal && vertical) {
    return vertical + '-' + horizontal;
  } else {
    return horizontal || vertical || 'intersect';
  }
}

// intersection utils //////////////////////

/**
 * Get intersection between an element and a line path.
 *
 * @param {PathDef} elementPath
 * @param {PathDef} linePath
 * @param {Boolean} cropStart crop from start or end
 *
 * @return {Point}
 */
function getElementLineIntersection(elementPath, linePath, cropStart) {

  var intersections = getIntersections(elementPath, linePath);

  // recognize intersections
  // only one -> choose
  // two close together -> choose first
  // two or more distinct -> pull out appropriate one
  // none -> ok (fallback to point itself)
  if (intersections.length === 1) {
    return roundPoint(intersections[0]);
  } else if (intersections.length === 2 && (0, _Geometry.pointDistance)(intersections[0], intersections[1]) < 1) {
    return roundPoint(intersections[0]);
  } else if (intersections.length > 1) {

    // sort by intersections based on connection segment +
    // distance from start
    intersections = (0, _minDash.sortBy)(intersections, function (i) {
      var distance = Math.floor(i.t2 * 100) || 1;

      distance = 100 - distance;

      distance = (distance < 10 ? '0' : '') + distance;

      // create a sort string that makes sure we sort
      // line segment ASC + line segment position DESC (for cropStart)
      // line segment ASC + line segment position ASC (for cropEnd)
      return i.segment2 + '#' + distance;
    });

    return roundPoint(intersections[cropStart ? 0 : intersections.length - 1]);
  }

  return null;
}

function getIntersections(a, b) {
  return (0, _pathIntersection2.default)(a, b);
}

},{"../util/Geometry":96,"min-dash":108,"path-intersection":113}],84:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Base = Base;
exports.Shape = Shape;
exports.Root = Root;
exports.Label = Label;
exports.Connection = Connection;
exports.create = create;

var _minDash = require('min-dash');

var _inherits = require('inherits');

var _inherits2 = _interopRequireDefault(_inherits);

var _objectRefs = require('object-refs');

var _objectRefs2 = _interopRequireDefault(_objectRefs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parentRefs = new _objectRefs2.default({ name: 'children', enumerable: true, collection: true }, { name: 'parent' }),
    labelRefs = new _objectRefs2.default({ name: 'labels', enumerable: true, collection: true }, { name: 'labelTarget' }),
    attacherRefs = new _objectRefs2.default({ name: 'attachers', collection: true }, { name: 'host' }),
    outgoingRefs = new _objectRefs2.default({ name: 'outgoing', collection: true }, { name: 'source' }),
    incomingRefs = new _objectRefs2.default({ name: 'incoming', collection: true }, { name: 'target' });

/**
 * @namespace djs.model
 */

/**
 * @memberOf djs.model
 */

/**
 * The basic graphical representation
 *
 * @class
 *
 * @abstract
 */
function Base() {

  /**
   * The object that backs up the shape
   *
   * @name Base#businessObject
   * @type Object
   */
  Object.defineProperty(this, 'businessObject', {
    writable: true
  });

  /**
   * Single label support, will mapped to multi label array
   *
   * @name Base#label
   * @type Object
   */
  Object.defineProperty(this, 'label', {
    get: function get() {
      return this.labels[0];
    },
    set: function set(newLabel) {

      var label = this.label,
          labels = this.labels;

      if (!newLabel && label) {
        labels.remove(label);
      } else {
        labels.add(newLabel, 0);
      }
    }
  });

  /**
   * The parent shape
   *
   * @name Base#parent
   * @type Shape
   */
  parentRefs.bind(this, 'parent');

  /**
   * The list of labels
   *
   * @name Base#labels
   * @type Label
   */
  labelRefs.bind(this, 'labels');

  /**
   * The list of outgoing connections
   *
   * @name Base#outgoing
   * @type Array<Connection>
   */
  outgoingRefs.bind(this, 'outgoing');

  /**
   * The list of incoming connections
   *
   * @name Base#incoming
   * @type Array<Connection>
   */
  incomingRefs.bind(this, 'incoming');
}

/**
 * A graphical object
 *
 * @class
 * @constructor
 *
 * @extends Base
 */
function Shape() {
  Base.call(this);

  /**
   * The list of children
   *
   * @name Shape#children
   * @type Array<Base>
   */
  parentRefs.bind(this, 'children');

  /**
   * @name Shape#host
   * @type Shape
   */
  attacherRefs.bind(this, 'host');

  /**
   * @name Shape#attachers
   * @type Shape
   */
  attacherRefs.bind(this, 'attachers');
}

(0, _inherits2.default)(Shape, Base);

/**
 * A root graphical object
 *
 * @class
 * @constructor
 *
 * @extends Shape
 */
function Root() {
  Shape.call(this);
}

(0, _inherits2.default)(Root, Shape);

/**
 * A label for an element
 *
 * @class
 * @constructor
 *
 * @extends Shape
 */
function Label() {
  Shape.call(this);

  /**
   * The labeled element
   *
   * @name Label#labelTarget
   * @type Base
   */
  labelRefs.bind(this, 'labelTarget');
}

(0, _inherits2.default)(Label, Shape);

/**
 * A connection between two elements
 *
 * @class
 * @constructor
 *
 * @extends Base
 */
function Connection() {
  Base.call(this);

  /**
   * The element this connection originates from
   *
   * @name Connection#source
   * @type Base
   */
  outgoingRefs.bind(this, 'source');

  /**
   * The element this connection points to
   *
   * @name Connection#target
   * @type Base
   */
  incomingRefs.bind(this, 'target');
}

(0, _inherits2.default)(Connection, Base);

var types = {
  connection: Connection,
  shape: Shape,
  label: Label,
  root: Root
};

/**
 * Creates a new model element of the specified type
 *
 * @method create
 *
 * @example
 *
 * var shape1 = Model.create('shape', { x: 10, y: 10, width: 100, height: 100 });
 * var shape2 = Model.create('shape', { x: 210, y: 210, width: 100, height: 100 });
 *
 * var connection = Model.create('connection', { waypoints: [ { x: 110, y: 55 }, {x: 210, y: 55 } ] });
 *
 * @param  {String} type lower-cased model name
 * @param  {Object} attrs attributes to initialize the new model instance with
 *
 * @return {Base} the new model instance
 */
function create(type, attrs) {
  var Type = types[type];
  if (!Type) {
    throw new Error('unknown type: <' + type + '>');
  }
  return (0, _minDash.assign)(new Type(), attrs);
}

},{"inherits":107,"min-dash":108,"object-refs":110}],85:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MoveCanvas;

var _Cursor = require('../../util/Cursor');

var _ClickTrap = require('../../util/ClickTrap');

var _PositionUtil = require('../../util/PositionUtil');

var _minDom = require('min-dom');

var _Event = require('../../util/Event');

var THRESHOLD = 15;

/**
 * Move the canvas via mouse.
 *
 * @param {EventBus} eventBus
 * @param {Canvas} canvas
 */
function MoveCanvas(eventBus, canvas) {

  var context;

  // listen for move on element mouse down;
  // allow others to hook into the event before us though
  // (dragging / element moving will do this)
  eventBus.on('element.mousedown', 500, function (e) {
    return handleStart(e.originalEvent);
  });

  function handleMove(event) {

    var start = context.start,
        position = (0, _Event.toPoint)(event),
        delta = (0, _PositionUtil.delta)(position, start);

    if (!context.dragging && length(delta) > THRESHOLD) {
      context.dragging = true;

      (0, _ClickTrap.install)(eventBus);

      (0, _Cursor.set)('grab');
    }

    if (context.dragging) {

      var lastPosition = context.last || context.start;

      delta = (0, _PositionUtil.delta)(position, lastPosition);

      canvas.scroll({
        dx: delta.x,
        dy: delta.y
      });

      context.last = position;
    }

    // prevent select
    event.preventDefault();
  }

  function handleEnd(event) {
    _minDom.event.unbind(document, 'mousemove', handleMove);
    _minDom.event.unbind(document, 'mouseup', handleEnd);

    context = null;

    (0, _Cursor.unset)();
  }

  function handleStart(event) {
    // event is already handled by '.djs-draggable'
    if ((0, _minDom.closest)(event.target, '.djs-draggable')) {
      return;
    }

    // reject non-left left mouse button or modifier key
    if (event.button || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    context = {
      start: (0, _Event.toPoint)(event)
    };

    _minDom.event.bind(document, 'mousemove', handleMove);
    _minDom.event.bind(document, 'mouseup', handleEnd);

    // we've handled the event
    return true;
  }
}

MoveCanvas.$inject = ['eventBus', 'canvas'];

// helpers ///////

function length(point) {
  return Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2));
}

},{"../../util/ClickTrap":91,"../../util/Cursor":93,"../../util/Event":95,"../../util/PositionUtil":102,"min-dom":109}],86:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MoveCanvas = require('./MoveCanvas');

var _MoveCanvas2 = _interopRequireDefault(_MoveCanvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  __init__: ['moveCanvas'],
  moveCanvas: ['type', _MoveCanvas2.default]
};

},{"./MoveCanvas":85}],87:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ZoomScroll;

var _minDom = require('min-dom');

var _ZoomUtil = require('./ZoomUtil');

var _Math = require('../../util/Math');

var _minDash = require('min-dash');

var sign = Math.sign || function (n) {
  return n >= 0 ? 1 : -1;
};

var RANGE = { min: 0.2, max: 4 },
    NUM_STEPS = 10;

var DELTA_THRESHOLD = 0.1;

var DEFAULT_SCALE = 0.75;

/**
 * An implementation of zooming and scrolling within the
 * {@link Canvas} via the mouse wheel.
 *
 * Mouse wheel zooming / scrolling may be disabled using
 * the {@link toggle(enabled)} method.
 *
 * @param {Object} [config]
 * @param {Boolean} [config.enabled=true] default enabled state
 * @param {Number} [config.scale=.75] scroll sensivity
 * @param {EventBus} eventBus
 * @param {Canvas} canvas
 */
function ZoomScroll(config, eventBus, canvas) {

  config = config || {};

  this._enabled = false;

  this._canvas = canvas;
  this._container = canvas._container;

  this._handleWheel = (0, _minDash.bind)(this._handleWheel, this);

  this._totalDelta = 0;
  this._scale = config.scale || DEFAULT_SCALE;

  var self = this;

  eventBus.on('canvas.init', function (e) {
    self._init(config.enabled !== false);
  });
}

ZoomScroll.$inject = ['config.zoomScroll', 'eventBus', 'canvas'];

ZoomScroll.prototype.scroll = function scroll(delta) {
  this._canvas.scroll(delta);
};

ZoomScroll.prototype.reset = function reset() {
  this._canvas.zoom('fit-viewport');
};

/**
 * Zoom depending on delta.
 *
 * @param {number} delta - Zoom delta.
 * @param {Object} position - Zoom position.
 */
ZoomScroll.prototype.zoom = function zoom(delta, position) {

  // zoom with half the step size of stepZoom
  var stepSize = (0, _ZoomUtil.getStepSize)(RANGE, NUM_STEPS * 2);

  // add until threshold reached
  this._totalDelta += delta;

  if (Math.abs(this._totalDelta) > DELTA_THRESHOLD) {
    this._zoom(delta, position, stepSize);

    // reset
    this._totalDelta = 0;
  }
};

ZoomScroll.prototype._handleWheel = function handleWheel(event) {
  // event is already handled by '.djs-scrollable'
  if ((0, _minDom.closest)(event.target, '.djs-scrollable', true)) {
    return;
  }

  var element = this._container;

  event.preventDefault();

  // pinch to zoom is mapped to wheel + ctrlKey = true
  // in modern browsers (!)

  var isZoom = event.ctrlKey;

  var isHorizontalScroll = event.shiftKey;

  var factor = -1 * this._scale,
      delta;

  if (isZoom) {
    factor *= event.deltaMode === 0 ? 0.020 : 0.32;
  } else {
    factor *= event.deltaMode === 0 ? 1.0 : 16.0;
  }

  if (isZoom) {
    var elementRect = element.getBoundingClientRect();

    var offset = {
      x: event.clientX - elementRect.left,
      y: event.clientY - elementRect.top
    };

    delta = Math.sqrt(Math.pow(event.deltaY, 2) + Math.pow(event.deltaX, 2)) * sign(event.deltaY) * factor;

    // zoom in relative to diagram {x,y} coordinates
    this.zoom(delta, offset);
  } else {

    if (isHorizontalScroll) {
      delta = {
        dx: factor * event.deltaY,
        dy: 0
      };
    } else {
      delta = {
        dx: factor * event.deltaX,
        dy: factor * event.deltaY
      };
    }

    this.scroll(delta);
  }
};

/**
 * Zoom with fixed step size.
 *
 * @param {number} delta - Zoom delta (1 for zooming in, -1 for out).
 * @param {Object} position - Zoom position.
 */
ZoomScroll.prototype.stepZoom = function stepZoom(delta, position) {

  var stepSize = (0, _ZoomUtil.getStepSize)(RANGE, NUM_STEPS);

  this._zoom(delta, position, stepSize);
};

/**
 * Zoom in/out given a step size.
 *
 * @param {number} delta - Zoom delta. Can be positive or negative.
 * @param {Object} position - Zoom position.
 * @param {number} stepSize - Step size.
 */
ZoomScroll.prototype._zoom = function (delta, position, stepSize) {
  var canvas = this._canvas;

  var direction = delta > 0 ? 1 : -1;

  var currentLinearZoomLevel = (0, _Math.log10)(canvas.zoom());

  // snap to a proximate zoom step
  var newLinearZoomLevel = Math.round(currentLinearZoomLevel / stepSize) * stepSize;

  // increase or decrease one zoom step in the given direction
  newLinearZoomLevel += stepSize * direction;

  // calculate the absolute logarithmic zoom level based on the linear zoom level
  // (e.g. 2 for an absolute x2 zoom)
  var newLogZoomLevel = Math.pow(10, newLinearZoomLevel);

  canvas.zoom((0, _ZoomUtil.cap)(RANGE, newLogZoomLevel), position);
};

/**
 * Toggle the zoom scroll ability via mouse wheel.
 *
 * @param  {Boolean} [newEnabled] new enabled state
 */
ZoomScroll.prototype.toggle = function toggle(newEnabled) {

  var element = this._container;
  var handleWheel = this._handleWheel;

  var oldEnabled = this._enabled;

  if (typeof newEnabled === 'undefined') {
    newEnabled = !oldEnabled;
  }

  // only react on actual changes
  if (oldEnabled !== newEnabled) {

    // add or remove wheel listener based on
    // changed enabled state
    _minDom.event[newEnabled ? 'bind' : 'unbind'](element, 'wheel', handleWheel, false);
  }

  this._enabled = newEnabled;

  return newEnabled;
};

ZoomScroll.prototype._init = function (newEnabled) {
  this.toggle(newEnabled);
};

},{"../../util/Math":99,"./ZoomUtil":88,"min-dash":108,"min-dom":109}],88:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStepSize = getStepSize;
exports.cap = cap;

var _Math = require('../../util/Math');

/**
 * Get step size for given range and number of steps.
 *
 * @param {Object} range - Range.
 * @param {number} range.min - Range minimum.
 * @param {number} range.max - Range maximum.
 */
function getStepSize(range, steps) {

  var minLinearRange = (0, _Math.log10)(range.min),
      maxLinearRange = (0, _Math.log10)(range.max);

  var absoluteLinearRange = Math.abs(minLinearRange) + Math.abs(maxLinearRange);

  return absoluteLinearRange / steps;
}

function cap(range, scale) {
  return Math.max(range.min, Math.min(range.max, scale));
}

},{"../../util/Math":99}],89:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ZoomScroll = require('./ZoomScroll');

var _ZoomScroll2 = _interopRequireDefault(_ZoomScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  __init__: ['zoomScroll'],
  zoomScroll: ['type', _ZoomScroll2.default]
};

},{"./ZoomScroll":87}],90:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNewAttachPoint = getNewAttachPoint;
exports.getNewAttachShapeDelta = getNewAttachShapeDelta;

var _LayoutUtil = require('../layout/LayoutUtil');

var _PositionUtil = require('./PositionUtil');

/**
 * Calculates the absolute point relative to the new element's position
 *
 * @param {point} point [absolute]
 * @param {bounds} oldBounds
 * @param {bounds} newBounds
 *
 * @return {point} point [absolute]
 */
function getNewAttachPoint(point, oldBounds, newBounds) {
  var oldCenter = (0, _PositionUtil.center)(oldBounds),
      newCenter = (0, _PositionUtil.center)(newBounds),
      oldDelta = (0, _PositionUtil.delta)(point, oldCenter);

  var newDelta = {
    x: oldDelta.x * (newBounds.width / oldBounds.width),
    y: oldDelta.y * (newBounds.height / oldBounds.height)
  };

  return (0, _LayoutUtil.roundPoint)({
    x: newCenter.x + newDelta.x,
    y: newCenter.y + newDelta.y
  });
}

/**
 * Calculates the shape's delta relative to a new position
 * of a certain element's bounds
 *
 * @param {djs.model.Shape} point [absolute]
 * @param {bounds} oldBounds
 * @param {bounds} newBounds
 *
 * @return {delta} delta
 */
function getNewAttachShapeDelta(shape, oldBounds, newBounds) {
  var shapeCenter = (0, _PositionUtil.center)(shape),
      oldCenter = (0, _PositionUtil.center)(oldBounds),
      newCenter = (0, _PositionUtil.center)(newBounds),
      shapeDelta = (0, _PositionUtil.delta)(shape, shapeCenter),
      oldCenterDelta = (0, _PositionUtil.delta)(shapeCenter, oldCenter);

  var newCenterDelta = {
    x: oldCenterDelta.x * (newBounds.width / oldBounds.width),
    y: oldCenterDelta.y * (newBounds.height / oldBounds.height)
  };

  var newShapeCenter = {
    x: newCenter.x + newCenterDelta.x,
    y: newCenter.y + newCenterDelta.y
  };

  return (0, _LayoutUtil.roundPoint)({
    x: newShapeCenter.x + shapeDelta.x - shape.x,
    y: newShapeCenter.y + shapeDelta.y - shape.y
  });
}

},{"../layout/LayoutUtil":83,"./PositionUtil":102}],91:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = install;
var TRAP_PRIORITY = 5000;

/**
 * Installs a click trap that prevents a ghost click following a dragging operation.
 *
 * @return {Function} a function to immediately remove the installed trap.
 */
function install(eventBus, eventName) {

  eventName = eventName || 'element.click';

  function trap() {
    return false;
  }

  eventBus.once(eventName, TRAP_PRIORITY, trap);

  return function () {
    eventBus.off(eventName, trap);
  };
}

},{}],92:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = remove;
exports.add = add;
exports.indexOf = indexOf;
/**
 * Failsafe remove an element from a collection
 *
 * @param  {Array<Object>} [collection]
 * @param  {Object} [element]
 *
 * @return {Number} the previous index of the element
 */
function remove(collection, element) {

  if (!collection || !element) {
    return -1;
  }

  var idx = collection.indexOf(element);

  if (idx !== -1) {
    collection.splice(idx, 1);
  }

  return idx;
}

/**
 * Fail save add an element to the given connection, ensuring
 * it does not yet exist.
 *
 * @param {Array<Object>} collection
 * @param {Object} element
 * @param {Number} idx
 */
function add(collection, element, idx) {

  if (!collection || !element) {
    return;
  }

  if (typeof idx !== 'number') {
    idx = -1;
  }

  var currentIdx = collection.indexOf(element);

  if (currentIdx !== -1) {

    if (currentIdx === idx) {
      // nothing to do, position has not changed
      return;
    } else {

      if (idx !== -1) {
        // remove from current position
        collection.splice(currentIdx, 1);
      } else {
        // already exists in collection
        return;
      }
    }
  }

  if (idx !== -1) {
    // insert at specified position
    collection.splice(idx, 0, element);
  } else {
    // push to end
    collection.push(element);
  }
}

/**
 * Fail save get the index of an element in a collection.
 *
 * @param {Array<Object>} collection
 * @param {Object} element
 *
 * @return {Number} the index or -1 if collection or element do
 *                  not exist or the element is not contained.
 */
function indexOf(collection, element) {

  if (!collection || !element) {
    return -1;
  }

  return collection.indexOf(element);
}

},{}],93:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = set;
exports.unset = unset;
exports.has = has;

var _minDom = require('min-dom');

var CURSOR_CLS_PATTERN = /^djs-cursor-.*$/;

function set(mode) {
  var classes = (0, _minDom.classes)(document.body);

  classes.removeMatching(CURSOR_CLS_PATTERN);

  if (mode) {
    classes.add('djs-cursor-' + mode);
  }
}

function unset() {
  set(null);
}

function has(mode) {
  var classes = (0, _minDom.classes)(document.body);

  return classes.has('djs-cursor-' + mode);
}

},{"min-dom":109}],94:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.eachElement = eachElement;
exports.selfAndChildren = selfAndChildren;
exports.selfAndDirectChildren = selfAndDirectChildren;
exports.selfAndAllChildren = selfAndAllChildren;
exports.getClosure = getClosure;
exports.getBBox = getBBox;
exports.getEnclosedElements = getEnclosedElements;
exports.getType = getType;

var _minDash = require('min-dash');

/**
 * Adds an element to a collection and returns true if the
 * element was added.
 *
 * @param {Array<Object>} elements
 * @param {Object} e
 * @param {Boolean} unique
 */
function add(elements, e, unique) {
  var canAdd = !unique || elements.indexOf(e) === -1;

  if (canAdd) {
    elements.push(e);
  }

  return canAdd;
}

/**
 * Iterate over each element in a collection, calling the iterator function `fn`
 * with (element, index, recursionDepth).
 *
 * Recurse into all elements that are returned by `fn`.
 *
 * @param  {Object|Array<Object>} elements
 * @param  {Function} fn iterator function called with (element, index, recursionDepth)
 * @param  {Number} [depth] maximum recursion depth
 */
function eachElement(elements, fn, depth) {

  depth = depth || 0;

  if (!(0, _minDash.isArray)(elements)) {
    elements = [elements];
  }

  (0, _minDash.forEach)(elements, function (s, i) {
    var filter = fn(s, i, depth);

    if ((0, _minDash.isArray)(filter) && filter.length) {
      eachElement(filter, fn, depth + 1);
    }
  });
}

/**
 * Collects self + child elements up to a given depth from a list of elements.
 *
 * @param  {djs.model.Base|Array<djs.model.Base>} elements the elements to select the children from
 * @param  {Boolean} unique whether to return a unique result set (no duplicates)
 * @param  {Number} maxDepth the depth to search through or -1 for infinite
 *
 * @return {Array<djs.model.Base>} found elements
 */
function selfAndChildren(elements, unique, maxDepth) {
  var result = [],
      processedChildren = [];

  eachElement(elements, function (element, i, depth) {
    add(result, element, unique);

    var children = element.children;

    // max traversal depth not reached yet
    if (maxDepth === -1 || depth < maxDepth) {

      // children exist && children not yet processed
      if (children && add(processedChildren, children, unique)) {
        return children;
      }
    }
  });

  return result;
}

/**
 * Return self + direct children for a number of elements
 *
 * @param  {Array<djs.model.Base>} elements to query
 * @param  {Boolean} allowDuplicates to allow duplicates in the result set
 *
 * @return {Array<djs.model.Base>} the collected elements
 */
function selfAndDirectChildren(elements, allowDuplicates) {
  return selfAndChildren(elements, !allowDuplicates, 1);
}

/**
 * Return self + ALL children for a number of elements
 *
 * @param  {Array<djs.model.Base>} elements to query
 * @param  {Boolean} allowDuplicates to allow duplicates in the result set
 *
 * @return {Array<djs.model.Base>} the collected elements
 */
function selfAndAllChildren(elements, allowDuplicates) {
  return selfAndChildren(elements, !allowDuplicates, -1);
}

/**
 * Gets the the closure for all selected elements,
 * their enclosed children and connections.
 *
 * @param {Array<djs.model.Base>} elements
 * @param {Boolean} [isTopLevel=true]
 * @param {Object} [existingClosure]
 *
 * @return {Object} newClosure
 */
function getClosure(elements, isTopLevel, closure) {

  if ((0, _minDash.isUndefined)(isTopLevel)) {
    isTopLevel = true;
  }

  if ((0, _minDash.isObject)(isTopLevel)) {
    closure = isTopLevel;
    isTopLevel = true;
  }

  closure = closure || {};

  var allShapes = copyObject(closure.allShapes),
      allConnections = copyObject(closure.allConnections),
      enclosedElements = copyObject(closure.enclosedElements),
      enclosedConnections = copyObject(closure.enclosedConnections);

  var topLevel = copyObject(closure.topLevel, isTopLevel && (0, _minDash.groupBy)(elements, function (e) {
    return e.id;
  }));

  function handleConnection(c) {
    if (topLevel[c.source.id] && topLevel[c.target.id]) {
      topLevel[c.id] = [c];
    }

    // not enclosed as a child, but maybe logically
    // (connecting two moved elements?)
    if (allShapes[c.source.id] && allShapes[c.target.id]) {
      enclosedConnections[c.id] = enclosedElements[c.id] = c;
    }

    allConnections[c.id] = c;
  }

  function handleElement(element) {

    enclosedElements[element.id] = element;

    if (element.waypoints) {
      // remember connection
      enclosedConnections[element.id] = allConnections[element.id] = element;
    } else {
      // remember shape
      allShapes[element.id] = element;

      // remember all connections
      (0, _minDash.forEach)(element.incoming, handleConnection);

      (0, _minDash.forEach)(element.outgoing, handleConnection);

      // recurse into children
      return element.children;
    }
  }

  eachElement(elements, handleElement);

  return {
    allShapes: allShapes,
    allConnections: allConnections,
    topLevel: topLevel,
    enclosedConnections: enclosedConnections,
    enclosedElements: enclosedElements
  };
}

/**
 * Returns the surrounding bbox for all elements in
 * the array or the element primitive.
 *
 * @param {Array<djs.model.Shape>|djs.model.Shape} elements
 * @param {Boolean} stopRecursion
 */
function getBBox(elements, stopRecursion) {

  stopRecursion = !!stopRecursion;
  if (!(0, _minDash.isArray)(elements)) {
    elements = [elements];
  }

  var minX, minY, maxX, maxY;

  (0, _minDash.forEach)(elements, function (element) {

    // If element is a connection the bbox must be computed first
    var bbox = element;
    if (element.waypoints && !stopRecursion) {
      bbox = getBBox(element.waypoints, true);
    }

    var x = bbox.x,
        y = bbox.y,
        height = bbox.height || 0,
        width = bbox.width || 0;

    if (x < minX || minX === undefined) {
      minX = x;
    }
    if (y < minY || minY === undefined) {
      minY = y;
    }

    if (x + width > maxX || maxX === undefined) {
      maxX = x + width;
    }
    if (y + height > maxY || maxY === undefined) {
      maxY = y + height;
    }
  });

  return {
    x: minX,
    y: minY,
    height: maxY - minY,
    width: maxX - minX
  };
}

/**
 * Returns all elements that are enclosed from the bounding box.
 *
 *   * If bbox.(width|height) is not specified the method returns
 *     all elements with element.x/y > bbox.x/y
 *   * If only bbox.x or bbox.y is specified, method return all elements with
 *     e.x > bbox.x or e.y > bbox.y
 *
 * @param {Array<djs.model.Shape>} elements List of Elements to search through
 * @param {djs.model.Shape} bbox the enclosing bbox.
 *
 * @return {Array<djs.model.Shape>} enclosed elements
 */
function getEnclosedElements(elements, bbox) {

  var filteredElements = {};

  (0, _minDash.forEach)(elements, function (element) {

    var e = element;

    if (e.waypoints) {
      e = getBBox(e);
    }

    if (!(0, _minDash.isNumber)(bbox.y) && e.x > bbox.x) {
      filteredElements[element.id] = element;
    }
    if (!(0, _minDash.isNumber)(bbox.x) && e.y > bbox.y) {
      filteredElements[element.id] = element;
    }
    if (e.x > bbox.x && e.y > bbox.y) {
      if ((0, _minDash.isNumber)(bbox.width) && (0, _minDash.isNumber)(bbox.height) && e.width + e.x < bbox.width + bbox.x && e.height + e.y < bbox.height + bbox.y) {

        filteredElements[element.id] = element;
      } else if (!(0, _minDash.isNumber)(bbox.width) || !(0, _minDash.isNumber)(bbox.height)) {
        filteredElements[element.id] = element;
      }
    }
  });

  return filteredElements;
}

function getType(element) {

  if ('waypoints' in element) {
    return 'connection';
  }

  if ('x' in element) {
    return 'shape';
  }

  return 'root';
}

// helpers ///////////////////////////////

function copyObject(src1, src2) {
  return (0, _minDash.assign)({}, src1 || {}, src2 || {});
}

},{"min-dash":108}],95:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOriginal = getOriginal;
exports.stopPropagation = stopPropagation;
exports.toPoint = toPoint;
function __stopPropagation(event) {
  if (!event || typeof event.stopPropagation !== 'function') {
    return;
  }

  event.stopPropagation();
}

function getOriginal(event) {
  return event.originalEvent || event.srcEvent;
}

function stopPropagation(event, immediate) {
  __stopPropagation(event, immediate);
  __stopPropagation(getOriginal(event), immediate);
}

function toPoint(event) {

  if (event.pointers && event.pointers.length) {
    event = event.pointers[0];
  }

  if (event.touches && event.touches.length) {
    event = event.touches[0];
  }

  return event ? {
    x: event.clientX,
    y: event.clientY
  } : null;
}

},{}],96:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pointDistance = pointDistance;
exports.pointsOnLine = pointsOnLine;
exports.pointsAligned = pointsAligned;
exports.pointInRect = pointInRect;
exports.getMidPoint = getMidPoint;
/**
 * Computes the distance between two points
 *
 * @param  {Point}  p
 * @param  {Point}  q
 *
 * @return {Number}  distance
 */
function pointDistance(a, b) {
  if (!a || !b) {
    return -1;
  }

  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

/**
 * Returns true if the point r is on the line between p and q
 *
 * @param  {Point}  p
 * @param  {Point}  q
 * @param  {Point}  r
 * @param  {Number} [accuracy=5] accuracy for points on line check (lower is better)
 *
 * @return {Boolean}
 */
function pointsOnLine(p, q, r, accuracy) {

  if (typeof accuracy === 'undefined') {
    accuracy = 5;
  }

  if (!p || !q || !r) {
    return false;
  }

  var val = (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x),
      dist = pointDistance(p, q);

  // @see http://stackoverflow.com/a/907491/412190
  return Math.abs(val / dist) <= accuracy;
}

var ALIGNED_THRESHOLD = 2;

/**
 * Returns whether two points are in a horizontal or vertical line.
 *
 * @param {Point} a
 * @param {Point} b
 *
 * @return {String|Boolean} returns false if the points are not
 *                          aligned or 'h|v' if they are aligned
 *                          horizontally / vertically.
 */
function pointsAligned(a, b) {
  if (Math.abs(a.x - b.x) <= ALIGNED_THRESHOLD) {
    return 'h';
  }

  if (Math.abs(a.y - b.y) <= ALIGNED_THRESHOLD) {
    return 'v';
  }

  return false;
}

/**
 * Returns true if the point p is inside the rectangle rect
 *
 * @param  {Point}  p
 * @param  {Rect}   rect
 * @param  {Number} tolerance
 *
 * @return {Boolean}
 */
function pointInRect(p, rect, tolerance) {
  tolerance = tolerance || 0;

  return p.x > rect.x - tolerance && p.y > rect.y - tolerance && p.x < rect.x + rect.width + tolerance && p.y < rect.y + rect.height + tolerance;
}

/**
 * Returns a point in the middle of points p and q
 *
 * @param  {Point}  p
 * @param  {Point}  q
 *
 * @return {Point} middle point
 */
function getMidPoint(p, q) {
  return {
    x: Math.round(p.x + (q.x - p.x) / 2.0),
    y: Math.round(p.y + (q.y - p.y) / 2.0)
  };
}

},{}],97:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVisual = getVisual;
exports.getChildren = getChildren;

var _minDom = require('min-dom');

/**
 * SVGs for elements are generated by the {@link GraphicsFactory}.
 *
 * This utility gives quick access to the important semantic
 * parts of an element.
 */

/**
 * Returns the visual part of a diagram element
 *
 * @param {Snap<SVGElement>} gfx
 *
 * @return {Snap<SVGElement>}
 */
function getVisual(gfx) {
  return (0, _minDom.query)('.djs-visual', gfx);
}

/**
 * Returns the children for a given diagram element.
 *
 * @param {Snap<SVGElement>} gfx
 * @return {Snap<SVGElement>}
 */
function getChildren(gfx) {
  return gfx.parentNode.childNodes[1];
}

},{"min-dom":109}],98:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IdGenerator;
/**
 * Util that provides unique IDs.
 *
 * @class djs.util.IdGenerator
 * @constructor
 * @memberOf djs.util
 *
 * The ids can be customized via a given prefix and contain a random value to avoid collisions.
 *
 * @param {String} prefix a prefix to prepend to generated ids (for better readability)
 */
function IdGenerator(prefix) {

  this._counter = 0;
  this._prefix = (prefix ? prefix + '-' : '') + Math.floor(Math.random() * 1000000000) + '-';
}

/**
 * Returns a next unique ID.
 *
 * @method djs.util.IdGenerator#next
 *
 * @returns {String} the id
 */
IdGenerator.prototype.next = function () {
  return this._prefix + ++this._counter;
};

},{}],99:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log10 = log10;

var _PositionUtil = require('./PositionUtil');

Object.defineProperty(exports, 'substract', {
  enumerable: true,
  get: function get() {
    return _PositionUtil.delta;
  }
});
/**
 * Get the logarithm of x with base 10
 * @param  {Integer} value
 */
function log10(x) {
  return Math.log(x) / Math.log(10);
}

},{"./PositionUtil":102}],100:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMac = undefined;

var _Platform = require('./Platform');

Object.defineProperty(exports, 'isMac', {
  enumerable: true,
  get: function get() {
    return _Platform.isMac;
  }
});
exports.isPrimaryButton = isPrimaryButton;
exports.hasPrimaryModifier = hasPrimaryModifier;
exports.hasSecondaryModifier = hasSecondaryModifier;

var _Event = require('./Event');

function isPrimaryButton(event) {
  // button === 0 -> left áka primary mouse button
  return !((0, _Event.getOriginal)(event) || event).button;
}

function hasPrimaryModifier(event) {
  var originalEvent = (0, _Event.getOriginal)(event) || event;

  if (!isPrimaryButton(event)) {
    return false;
  }

  // Use alt as primary modifier key for mac OS
  if ((0, _Platform.isMac)()) {
    return originalEvent.metaKey;
  } else {
    return originalEvent.ctrlKey;
  }
}

function hasSecondaryModifier(event) {
  var originalEvent = (0, _Event.getOriginal)(event) || event;

  return isPrimaryButton(event) && originalEvent.shiftKey;
}

},{"./Event":95,"./Platform":101}],101:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMac = isMac;
function isMac() {
  return (/mac/i.test(navigator.platform)
  );
}

},{}],102:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.center = center;
exports.delta = delta;
function center(bounds) {
  return {
    x: bounds.x + bounds.width / 2,
    y: bounds.y + bounds.height / 2
  };
}

function delta(a, b) {
  return {
    x: a.x - b.x,
    y: a.y - b.y
  };
}

},{}],103:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveClear = saveClear;
/**
 * Remove from the beginning of a collection until it is empty.
 *
 * This is a null-safe operation that ensures elements
 * are being removed from the given collection until the
 * collection is empty.
 *
 * The implementation deals with the fact that a remove operation
 * may touch, i.e. remove multiple elements in the collection
 * at a time.
 *
 * @param {Array<Object>} [collection]
 * @param {Function} removeFn
 *
 * @return {Array<Object>} the cleared collection
 */
function saveClear(collection, removeFn) {

  if (typeof removeFn !== 'function') {
    throw new Error('removeFn iterator must be a function');
  }

  if (!collection) {
    return;
  }

  var e;

  while (e = collection[0]) {
    removeFn(e);
  }

  return collection;
}

},{}],104:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.componentsToPath = componentsToPath;
exports.toSVGPoints = toSVGPoints;
exports.createLine = createLine;
exports.updateLine = updateLine;

var _tinySvg = require('tiny-svg');

function componentsToPath(elements) {
  return elements.join(',').replace(/,?([A-z]),?/g, '$1');
}

function toSVGPoints(points) {
  var result = '';

  for (var i = 0, p; p = points[i]; i++) {
    result += p.x + ',' + p.y + ' ';
  }

  return result;
}

function createLine(points, attrs) {

  var line = (0, _tinySvg.create)('polyline');
  (0, _tinySvg.attr)(line, { points: toSVGPoints(points) });

  if (attrs) {
    (0, _tinySvg.attr)(line, attrs);
  }

  return line;
}

function updateLine(gfx, points) {
  (0, _tinySvg.attr)(gfx, { points: toSVGPoints(points) });

  return gfx;
}

},{"tiny-svg":114}],105:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transform = transform;
exports.translate = translate;
exports.rotate = rotate;
exports.scale = scale;

var _tinySvg = require('tiny-svg');

/**
 * @param {<SVGElement>} element
 * @param {Number} x
 * @param {Number} y
 * @param {Number} angle
 * @param {Number} amount
 */
function transform(gfx, x, y, angle, amount) {
  var translate = (0, _tinySvg.createTransform)();
  translate.setTranslate(x, y);

  var rotate = (0, _tinySvg.createTransform)();
  rotate.setRotate(angle, 0, 0);

  var scale = (0, _tinySvg.createTransform)();
  scale.setScale(amount || 1, amount || 1);

  (0, _tinySvg.transform)(gfx, [translate, rotate, scale]);
}

/**
 * @param {SVGElement} element
 * @param {Number} x
 * @param {Number} y
 */
function translate(gfx, x, y) {
  var translate = (0, _tinySvg.createTransform)();
  translate.setTranslate(x, y);

  (0, _tinySvg.transform)(gfx, translate);
}

/**
 * @param {SVGElement} element
 * @param {Number} angle
 */
function rotate(gfx, angle) {
  var rotate = (0, _tinySvg.createTransform)();
  rotate.setRotate(angle, 0, 0);

  (0, _tinySvg.transform)(gfx, rotate);
}

/**
 * @param {SVGElement} element
 * @param {Number} amount
 */
function scale(gfx, amount) {
  var scale = (0, _tinySvg.createTransform)();
  scale.setScale(amount, amount);

  (0, _tinySvg.transform)(gfx, scale);
}

},{"tiny-svg":114}],106:[function(require,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, '__esModule', { value: true });

var CLASS_PATTERN = /^class /;

function isClass(fn) {
  return CLASS_PATTERN.test(fn.toString());
}

function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

function annotate() {
  var args = Array.prototype.slice.call(arguments);

  if (args.length === 1 && isArray(args[0])) {
    args = args[0];
  }

  var fn = args.pop();

  fn.$inject = args;

  return fn;
}

// Current limitations:
// - can't put into "function arg" comments
// function /* (no parenthesis like this) */ (){}
// function abc( /* xx (no parenthesis like this) */ a, b) {}
//
// Just put the comment before function or inside:
// /* (((this is fine))) */ function(a, b) {}
// function abc(a) { /* (((this is fine))) */}
//
// - can't reliably auto-annotate constructor; we'll match the
// first constructor(...) pattern found which may be the one
// of a nested class, too.

var CONSTRUCTOR_ARGS = /constructor\s*[^(]*\(\s*([^)]*)\)/m;
var FN_ARGS = /^function\s*[^(]*\(\s*([^)]*)\)/m;
var FN_ARG = /\/\*([^*]*)\*\//m;

function parse(fn) {

  if (typeof fn !== 'function') {
    throw new Error('Cannot annotate "' + fn + '". Expected a function!');
  }

  var match = fn.toString().match(isClass(fn) ? CONSTRUCTOR_ARGS : FN_ARGS);

  // may parse class without constructor
  if (!match) {
    return [];
  }

  return match[1] && match[1].split(',').map(function (arg) {
    match = arg.match(FN_ARG);
    return match ? match[1].trim() : arg.trim();
  }) || [];
}

function Module() {
  var providers = [];

  this.factory = function (name, factory) {
    providers.push([name, 'factory', factory]);
    return this;
  };

  this.value = function (name, value) {
    providers.push([name, 'value', value]);
    return this;
  };

  this.type = function (name, type) {
    providers.push([name, 'type', type]);
    return this;
  };

  this.forEach = function (iterator) {
    providers.forEach(iterator);
  };
}

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
};

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

function Injector(modules, parent) {
  parent = parent || {
    get: function get(name, strict) {
      currentlyResolving.push(name);

      if (strict === false) {
        return null;
      } else {
        throw error('No provider for "' + name + '"!');
      }
    }
  };

  var currentlyResolving = [];
  var providers = this._providers = Object.create(parent._providers || null);
  var instances = this._instances = Object.create(null);

  var self = instances.injector = this;

  var error = function error(msg) {
    var stack = currentlyResolving.join(' -> ');
    currentlyResolving.length = 0;
    return new Error(stack ? msg + ' (Resolving: ' + stack + ')' : msg);
  };

  /**
   * Return a named service.
   *
   * @param {String} name
   * @param {Boolean} [strict=true] if false, resolve missing services to null
   *
   * @return {Object}
   */
  var get = function get(name, strict) {
    if (!providers[name] && name.indexOf('.') !== -1) {
      var parts = name.split('.');
      var pivot = get(parts.shift());

      while (parts.length) {
        pivot = pivot[parts.shift()];
      }

      return pivot;
    }

    if (hasProp(instances, name)) {
      return instances[name];
    }

    if (hasProp(providers, name)) {
      if (currentlyResolving.indexOf(name) !== -1) {
        currentlyResolving.push(name);
        throw error('Cannot resolve circular dependency!');
      }

      currentlyResolving.push(name);
      instances[name] = providers[name][0](providers[name][1]);
      currentlyResolving.pop();

      return instances[name];
    }

    return parent.get(name, strict);
  };

  var fnDef = function fnDef(fn) {
    var locals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (typeof fn !== 'function') {
      if (isArray(fn)) {
        fn = annotate(fn.slice());
      } else {
        throw new Error('Cannot invoke "' + fn + '". Expected a function!');
      }
    }

    var inject = fn.$inject || parse(fn);
    var dependencies = inject.map(function (dep) {
      if (hasProp(locals, dep)) {
        return locals[dep];
      } else {
        return get(dep);
      }
    });

    return {
      fn: fn,
      dependencies: dependencies
    };
  };

  var instantiate = function instantiate(Type) {
    var _fnDef = fnDef(Type),
        dependencies = _fnDef.dependencies,
        fn = _fnDef.fn;

    return new (Function.prototype.bind.apply(fn, [null].concat(_toConsumableArray(dependencies))))();
  };

  var invoke = function invoke(func, context, locals) {
    var _fnDef2 = fnDef(func, locals),
        dependencies = _fnDef2.dependencies,
        fn = _fnDef2.fn;

    return fn.call.apply(fn, [context].concat(_toConsumableArray(dependencies)));
  };

  var createPrivateInjectorFactory = function createPrivateInjectorFactory(privateChildInjector) {
    return annotate(function (key) {
      return privateChildInjector.get(key);
    });
  };

  var createChild = function createChild(modules, forceNewInstances) {
    if (forceNewInstances && forceNewInstances.length) {
      var fromParentModule = Object.create(null);
      var matchedScopes = Object.create(null);

      var privateInjectorsCache = [];
      var privateChildInjectors = [];
      var privateChildFactories = [];

      var provider;
      var cacheIdx;
      var privateChildInjector;
      var privateChildInjectorFactory;
      for (var name in providers) {
        provider = providers[name];

        if (forceNewInstances.indexOf(name) !== -1) {
          if (provider[2] === 'private') {
            cacheIdx = privateInjectorsCache.indexOf(provider[3]);
            if (cacheIdx === -1) {
              privateChildInjector = provider[3].createChild([], forceNewInstances);
              privateChildInjectorFactory = createPrivateInjectorFactory(privateChildInjector);
              privateInjectorsCache.push(provider[3]);
              privateChildInjectors.push(privateChildInjector);
              privateChildFactories.push(privateChildInjectorFactory);
              fromParentModule[name] = [privateChildInjectorFactory, name, 'private', privateChildInjector];
            } else {
              fromParentModule[name] = [privateChildFactories[cacheIdx], name, 'private', privateChildInjectors[cacheIdx]];
            }
          } else {
            fromParentModule[name] = [provider[2], provider[1]];
          }
          matchedScopes[name] = true;
        }

        if ((provider[2] === 'factory' || provider[2] === 'type') && provider[1].$scope) {
          /* jshint -W083 */
          forceNewInstances.forEach(function (scope) {
            if (provider[1].$scope.indexOf(scope) !== -1) {
              fromParentModule[name] = [provider[2], provider[1]];
              matchedScopes[scope] = true;
            }
          });
        }
      }

      forceNewInstances.forEach(function (scope) {
        if (!matchedScopes[scope]) {
          throw new Error('No provider for "' + scope + '". Cannot use provider from the parent!');
        }
      });

      modules.unshift(fromParentModule);
    }

    return new Injector(modules, self);
  };

  var factoryMap = {
    factory: invoke,
    type: instantiate,
    value: function value(_value) {
      return _value;
    }
  };

  modules.forEach(function (module) {

    function arrayUnwrap(type, value) {
      if (type !== 'value' && isArray(value)) {
        value = annotate(value.slice());
      }

      return value;
    }

    // TODO(vojta): handle wrong inputs (modules)
    if (module instanceof Module) {
      module.forEach(function (provider) {
        var name = provider[0];
        var type = provider[1];
        var value = provider[2];

        providers[name] = [factoryMap[type], arrayUnwrap(type, value), type];
      });
    } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object') {
      if (module.__exports__) {
        var clonedModule = Object.keys(module).reduce(function (m, key) {
          if (key.substring(0, 2) !== '__') {
            m[key] = module[key];
          }
          return m;
        }, Object.create(null));

        var privateInjector = new Injector((module.__modules__ || []).concat([clonedModule]), self);
        var getFromPrivateInjector = annotate(function (key) {
          return privateInjector.get(key);
        });
        module.__exports__.forEach(function (key) {
          providers[key] = [getFromPrivateInjector, key, 'private', privateInjector];
        });
      } else {
        Object.keys(module).forEach(function (name) {
          if (module[name][2] === 'private') {
            providers[name] = module[name];
            return;
          }

          var type = module[name][0];
          var value = module[name][1];

          providers[name] = [factoryMap[type], arrayUnwrap(type, value), type];
        });
      }
    }
  });

  // public API
  this.get = get;
  this.invoke = invoke;
  this.instantiate = instantiate;
  this.createChild = createChild;
}

// helpers /////////////////

function hasProp(obj, prop) {
  return Object.hasOwnProperty.call(obj, prop);
}

exports.annotate = annotate;
exports.Module = Module;
exports.Injector = Injector;

},{}],107:[function(require,module,exports){
'use strict';

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function TempCtor() {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}

},{}],108:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Flatten array, one level deep.
 *
 * @param {Array<?>} arr
 *
 * @return {Array<?>}
 */
function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}

var nativeToString = Object.prototype.toString;
var nativeHasOwnProperty = Object.prototype.hasOwnProperty;

function isUndefined(obj) {
  return obj === undefined;
}

function isDefined(obj) {
  return obj !== undefined;
}

function isNil(obj) {
  return obj == null;
}

function isArray(obj) {
  return nativeToString.call(obj) === '[object Array]';
}

function isObject(obj) {
  return nativeToString.call(obj) === '[object Object]';
}

function isNumber(obj) {
  return nativeToString.call(obj) === '[object Number]';
}

function isFunction(obj) {
  return nativeToString.call(obj) === '[object Function]';
}

function isString(obj) {
  return nativeToString.call(obj) === '[object String]';
}

/**
 * Ensure collection is an array.
 *
 * @param {Object} obj
 */
function ensureArray(obj) {

  if (isArray(obj)) {
    return;
  }

  throw new Error('must supply array');
}

/**
 * Return true, if target owns a property with the given key.
 *
 * @param {Object} target
 * @param {String} key
 *
 * @return {Boolean}
 */
function has(target, key) {
  return nativeHasOwnProperty.call(target, key);
}

/**
 * Find element in collection.
 *
 * @param  {Array|Object} collection
 * @param  {Function|Object} matcher
 *
 * @return {Object}
 */
function find(collection, matcher) {

  matcher = toMatcher(matcher);

  var match;

  forEach(collection, function (val, key) {
    if (matcher(val, key)) {
      match = val;

      return false;
    }
  });

  return match;
}

/**
 * Find element index in collection.
 *
 * @param  {Array|Object} collection
 * @param  {Function} matcher
 *
 * @return {Object}
 */
function findIndex(collection, matcher) {

  matcher = toMatcher(matcher);

  var idx = isArray(collection) ? -1 : undefined;

  forEach(collection, function (val, key) {
    if (matcher(val, key)) {
      idx = key;

      return false;
    }
  });

  return idx;
}

/**
 * Find element in collection.
 *
 * @param  {Array|Object} collection
 * @param  {Function} matcher
 *
 * @return {Array} result
 */
function filter(collection, matcher) {

  var result = [];

  forEach(collection, function (val, key) {
    if (matcher(val, key)) {
      result.push(val);
    }
  });

  return result;
}

/**
 * Iterate over collection; returning something
 * (non-undefined) will stop iteration.
 *
 * @param  {Array|Object} collection
 * @param  {Function} iterator
 *
 * @return {Object} return result that stopped the iteration
 */
function forEach(collection, iterator) {

  if (isUndefined(collection)) {
    return;
  }

  var convertKey = isArray(collection) ? toNum : identity;

  for (var key in collection) {

    if (has(collection, key)) {
      var val = collection[key];

      var result = iterator(val, convertKey(key));

      if (result === false) {
        return;
      }
    }
  }
}

/**
 * Return collection without element.
 *
 * @param  {Array} arr
 * @param  {Function} matcher
 *
 * @return {Array}
 */
function without(arr, matcher) {

  if (isUndefined(arr)) {
    return [];
  }

  ensureArray(arr);

  matcher = toMatcher(matcher);

  return arr.filter(function (el, idx) {
    return !matcher(el, idx);
  });
}

/**
 * Reduce collection, returning a single result.
 *
 * @param  {Object|Array} collection
 * @param  {Function} iterator
 * @param  {Any} result
 *
 * @return {Any} result returned from last iterator
 */
function reduce(collection, iterator, result) {

  forEach(collection, function (value, idx) {
    result = iterator(result, value, idx);
  });

  return result;
}

/**
 * Return true if every element in the collection
 * matches the criteria.
 *
 * @param  {Object|Array} collection
 * @param  {Function} matcher
 *
 * @return {Boolean}
 */
function every(collection, matcher) {

  return reduce(collection, function (matches, val, key) {
    return matches && matcher(val, key);
  }, true);
}

/**
 * Return true if some elements in the collection
 * match the criteria.
 *
 * @param  {Object|Array} collection
 * @param  {Function} matcher
 *
 * @return {Boolean}
 */
function some(collection, matcher) {

  return !!find(collection, matcher);
}

/**
 * Transform a collection into another collection
 * by piping each member through the given fn.
 *
 * @param  {Object|Array}   collection
 * @param  {Function} fn
 *
 * @return {Array} transformed collection
 */
function map(collection, fn) {

  var result = [];

  forEach(collection, function (val, key) {
    result.push(fn(val, key));
  });

  return result;
}

/**
 * Get the collections keys.
 *
 * @param  {Object|Array} collection
 *
 * @return {Array}
 */
function keys(collection) {
  return collection && Object.keys(collection) || [];
}

/**
 * Shorthand for `keys(o).length`.
 *
 * @param  {Object|Array} collection
 *
 * @return {Number}
 */
function size(collection) {
  return keys(collection).length;
}

/**
 * Get the values in the collection.
 *
 * @param  {Object|Array} collection
 *
 * @return {Array}
 */
function values(collection) {
  return map(collection, function (val) {
    return val;
  });
}

/**
 * Group collection members by attribute.
 *
 * @param  {Object|Array} collection
 * @param  {Function} extractor
 *
 * @return {Object} map with { attrValue => [ a, b, c ] }
 */
function groupBy(collection, extractor) {
  var grouped = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  extractor = toExtractor(extractor);

  forEach(collection, function (val) {
    var discriminator = extractor(val) || '_';

    var group = grouped[discriminator];

    if (!group) {
      group = grouped[discriminator] = [];
    }

    group.push(val);
  });

  return grouped;
}

function uniqueBy(extractor) {

  extractor = toExtractor(extractor);

  var grouped = {};

  for (var _len = arguments.length, collections = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    collections[_key - 1] = arguments[_key];
  }

  forEach(collections, function (c) {
    return groupBy(c, extractor, grouped);
  });

  var result = map(grouped, function (val, key) {
    return val[0];
  });

  return result;
}

var unionBy = uniqueBy;

/**
 * Sort collection by criteria.
 *
 * @param  {Object|Array} collection
 * @param  {String|Function} extractor
 *
 * @return {Array}
 */
function sortBy(collection, extractor) {

  extractor = toExtractor(extractor);

  var sorted = [];

  forEach(collection, function (value, key) {
    var disc = extractor(value, key);

    var entry = {
      d: disc,
      v: value
    };

    for (var idx = 0; idx < sorted.length; idx++) {
      var d = sorted[idx].d;

      if (disc < d) {
        sorted.splice(idx, 0, entry);
        return;
      }
    }

    // not inserted, append (!)
    sorted.push(entry);
  });

  return map(sorted, function (e) {
    return e.v;
  });
}

/**
 * Create an object pattern matcher.
 *
 * @example
 *
 * const matcher = matchPattern({ id: 1 });
 *
 * var element = find(elements, matcher);
 *
 * @param  {Object} pattern
 *
 * @return {Function} matcherFn
 */
function matchPattern(pattern) {

  return function (el) {

    return every(pattern, function (val, key) {
      return el[key] === val;
    });
  };
}

function toExtractor(extractor) {
  return isFunction(extractor) ? extractor : function (e) {
    return e[extractor];
  };
}

function toMatcher(matcher) {
  return isFunction(matcher) ? matcher : function (e) {
    return e === matcher;
  };
}

function identity(arg) {
  return arg;
}

function toNum(arg) {
  return Number(arg);
}

/**
 * Debounce fn, calling it only once if
 * the given time elapsed between calls.
 *
 * @param  {Function} fn
 * @param  {Number} timeout
 *
 * @return {Function} debounced function
 */
function debounce(fn, timeout) {

  var timer;

  var lastArgs;
  var lastThis;

  var lastNow;

  function fire() {

    var now = Date.now();

    var scheduledDiff = lastNow + timeout - now;

    if (scheduledDiff > 0) {
      return schedule(scheduledDiff);
    }

    fn.apply(lastThis, lastArgs);

    timer = lastNow = lastArgs = lastThis = undefined;
  }

  function schedule(timeout) {
    timer = setTimeout(fire, timeout);
  }

  return function () {

    lastNow = Date.now();

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    lastArgs = args;
    lastThis = this;

    // ensure an execution is scheduled
    if (!timer) {
      schedule(timeout);
    }
  };
}

/**
 * Throttle fn, calling at most once
 * in the given interval.
 *
 * @param  {Function} fn
 * @param  {Number} interval
 *
 * @return {Function} throttled function
 */
function throttle(fn, interval) {

  var throttling = false;

  return function () {

    if (throttling) {
      return;
    }

    fn.apply(undefined, arguments);
    throttling = true;

    setTimeout(function () {
      throttling = false;
    }, interval);
  };
}

/**
 * Bind function against target <this>.
 *
 * @param  {Function} fn
 * @param  {Object}   target
 *
 * @return {Function} bound function
 */
function bind(fn, target) {
  return fn.bind(target);
}

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

/**
 * Convenience wrapper for `Object.assign`.
 *
 * @param {Object} target
 * @param {...Object} others
 *
 * @return {Object} the target
 */
function assign(target) {
  for (var _len = arguments.length, others = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    others[_key - 1] = arguments[_key];
  }

  return _extends.apply(undefined, [target].concat(others));
}

/**
 * Pick given properties from the target object.
 *
 * @param {Object} target
 * @param {Array} properties
 *
 * @return {Object} target
 */
function pick(target, properties) {

  var result = {};

  var obj = Object(target);

  forEach(properties, function (prop) {

    if (prop in obj) {
      result[prop] = target[prop];
    }
  });

  return result;
}

/**
 * Pick all target properties, excluding the given ones.
 *
 * @param {Object} target
 * @param {Array} properties
 *
 * @return {Object} target
 */
function omit(target, properties) {

  var result = {};

  var obj = Object(target);

  forEach(obj, function (prop, key) {

    if (properties.indexOf(key) === -1) {
      result[key] = prop;
    }
  });

  return result;
}

/**
 * Recursively merge `...sources` into given target.
 *
 * Does support merging objects; does not support merging arrays.
 *
 * @param {Object} target
 * @param {...Object} sources
 *
 * @return {Object} the target
 */
function merge(target) {
  for (var _len2 = arguments.length, sources = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    sources[_key2 - 1] = arguments[_key2];
  }

  if (!sources.length) {
    return target;
  }

  forEach(sources, function (source) {

    // skip non-obj sources, i.e. null
    if (!source || !isObject(source)) {
      return;
    }

    forEach(source, function (sourceVal, key) {

      var targetVal = target[key];

      if (isObject(sourceVal)) {

        if (!isObject(targetVal)) {
          // override target[key] with object
          targetVal = {};
        }

        target[key] = merge(targetVal, sourceVal);
      } else {
        target[key] = sourceVal;
      }
    });
  });

  return target;
}

exports.flatten = flatten;
exports.find = find;
exports.findIndex = findIndex;
exports.filter = filter;
exports.forEach = forEach;
exports.without = without;
exports.reduce = reduce;
exports.every = every;
exports.some = some;
exports.map = map;
exports.keys = keys;
exports.size = size;
exports.values = values;
exports.groupBy = groupBy;
exports.uniqueBy = uniqueBy;
exports.unionBy = unionBy;
exports.sortBy = sortBy;
exports.matchPattern = matchPattern;
exports.debounce = debounce;
exports.throttle = throttle;
exports.bind = bind;
exports.isUndefined = isUndefined;
exports.isDefined = isDefined;
exports.isNil = isNil;
exports.isArray = isArray;
exports.isObject = isObject;
exports.isNumber = isNumber;
exports.isFunction = isFunction;
exports.isString = isString;
exports.ensureArray = ensureArray;
exports.has = has;
exports.assign = assign;
exports.pick = pick;
exports.omit = omit;
exports.merge = merge;

},{}],109:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Set attribute `name` to `val`, or get attr `name`.
 *
 * @param {Element} el
 * @param {String} name
 * @param {String} [val]
 * @api public
 */
function attr(el, name, val) {
  // get
  if (arguments.length == 2) {
    return el.getAttribute(name);
  }

  // remove
  if (val === null) {
    return el.removeAttribute(name);
  }

  // set
  el.setAttribute(name, val);

  return el;
}

var indexOf = [].indexOf;

var indexof = function indexof(arr, obj) {
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/**
 * Taken from https://github.com/component/classes
 *
 * Without the component bits.
 */

/**
 * Whitespace regexp.
 */

var re = /\s+/;

/**
 * toString reference.
 */

var toString = Object.prototype.toString;

/**
 * Wrap `el` in a `ClassList`.
 *
 * @param {Element} el
 * @return {ClassList}
 * @api public
 */

function classes(el) {
  return new ClassList(el);
}

/**
 * Initialize a new ClassList for `el`.
 *
 * @param {Element} el
 * @api private
 */

function ClassList(el) {
  if (!el || !el.nodeType) {
    throw new Error('A DOM element reference is required');
  }
  this.el = el;
  this.list = el.classList;
}

/**
 * Add class `name` if not already present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.add = function (name) {
  // classList
  if (this.list) {
    this.list.add(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = indexof(arr, name);
  if (!~i) arr.push(name);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove class `name` when present, or
 * pass a regular expression to remove
 * any which match.
 *
 * @param {String|RegExp} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.remove = function (name) {
  if ('[object RegExp]' == toString.call(name)) {
    return this.removeMatching(name);
  }

  // classList
  if (this.list) {
    this.list.remove(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = indexof(arr, name);
  if (~i) arr.splice(i, 1);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove all classes matching `re`.
 *
 * @param {RegExp} re
 * @return {ClassList}
 * @api private
 */

ClassList.prototype.removeMatching = function (re) {
  var arr = this.array();
  for (var i = 0; i < arr.length; i++) {
    if (re.test(arr[i])) {
      this.remove(arr[i]);
    }
  }
  return this;
};

/**
 * Toggle class `name`, can force state via `force`.
 *
 * For browsers that support classList, but do not support `force` yet,
 * the mistake will be detected and corrected.
 *
 * @param {String} name
 * @param {Boolean} force
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.toggle = function (name, force) {
  // classList
  if (this.list) {
    if ('undefined' !== typeof force) {
      if (force !== this.list.toggle(name, force)) {
        this.list.toggle(name); // toggle again to correct
      }
    } else {
      this.list.toggle(name);
    }
    return this;
  }

  // fallback
  if ('undefined' !== typeof force) {
    if (!force) {
      this.remove(name);
    } else {
      this.add(name);
    }
  } else {
    if (this.has(name)) {
      this.remove(name);
    } else {
      this.add(name);
    }
  }

  return this;
};

/**
 * Return an array of classes.
 *
 * @return {Array}
 * @api public
 */

ClassList.prototype.array = function () {
  var className = this.el.getAttribute('class') || '';
  var str = className.replace(/^\s+|\s+$/g, '');
  var arr = str.split(re);
  if ('' === arr[0]) arr.shift();
  return arr;
};

/**
 * Check if class `name` is present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.has = ClassList.prototype.contains = function (name) {
  return this.list ? this.list.contains(name) : !!~indexof(this.array(), name);
};

/**
 * Remove all children from the given element.
 */
function clear(el) {

  var c;

  while (el.childNodes.length) {
    c = el.childNodes[0];
    el.removeChild(c);
  }

  return el;
}

/**
 * Element prototype.
 */

var proto = Element.prototype;

/**
 * Vendor function.
 */

var vendor = proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;

/**
 * Expose `match()`.
 */

var matchesSelector = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var nodes = el.parentNode.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; ++i) {
    if (nodes[i] == el) return true;
  }
  return false;
}

var closest = function closest(element, selector, checkYoSelf) {
  var parent = checkYoSelf ? element : element.parentNode;

  while (parent && parent !== document) {
    if (matchesSelector(parent, selector)) return parent;
    parent = parent.parentNode;
  }
};

var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '';

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

var bind_1 = function bind_1(el, type, fn, capture) {
  el[bind](prefix + type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

var unbind_1 = function unbind_1(el, type, fn, capture) {
  el[unbind](prefix + type, fn, capture || false);
  return fn;
};

var componentEvent = {
  bind: bind_1,
  unbind: unbind_1
};

/**
 * Module dependencies.
 */

/**
 * Delegate event `type` to `selector`
 * and invoke `fn(e)`. A callback function
 * is returned which may be passed to `.unbind()`.
 *
 * @param {Element} el
 * @param {String} selector
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

// Some events don't bubble, so we want to bind to the capture phase instead
// when delegating.
var forceCaptureEvents = ['focus', 'blur'];

var bind$1 = function bind$1(el, selector, type, fn, capture) {
  if (forceCaptureEvents.indexOf(type) !== -1) capture = true;

  return componentEvent.bind(el, type, function (e) {
    var target = e.target || e.srcElement;
    e.delegateTarget = closest(target, selector, true, el);
    if (e.delegateTarget) fn.call(el, e);
  }, capture);
};

/**
 * Unbind event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

var unbind$1 = function unbind$1(el, type, fn, capture) {
  if (forceCaptureEvents.indexOf(type) !== -1) capture = true;

  componentEvent.unbind(el, type, fn, capture);
};

var delegateEvents = {
  bind: bind$1,
  unbind: unbind$1
};

/**
 * Expose `parse`.
 */

var domify = parse;

/**
 * Tests for browser support.
 */

var innerHTMLBug = false;
var bugTestDiv;
if (typeof document !== 'undefined') {
  bugTestDiv = document.createElement('div');
  // Setup
  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
  // Make sure that link elements get serialized correctly by innerHTML
  // This requires a wrapper element in IE
  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
  bugTestDiv = undefined;
}

/**
 * Wrap map from jquery.
 */

var map = {
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  // for script/link/style tags to work in IE6-8, you have to wrap
  // in a div with a non-whitespace character in front, ha!
  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
};

map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];

map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];

map.polyline = map.ellipse = map.polygon = map.circle = map.text = map.line = map.path = map.rect = map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">', '</svg>'];

/**
 * Parse `html` and return a DOM Node instance, which could be a TextNode,
 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
 * instance, depending on the contents of the `html` string.
 *
 * @param {String} html - HTML string to "domify"
 * @param {Document} doc - The `document` instance to create the Node for
 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
 * @api private
 */

function parse(html, doc) {
  if ('string' != typeof html) throw new TypeError('String expected');

  // default to the global `document` object
  if (!doc) doc = document;

  // tag name
  var m = /<([\w:]+)/.exec(html);
  if (!m) return doc.createTextNode(html);

  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

  var tag = m[1];

  // body support
  if (tag == 'body') {
    var el = doc.createElement('html');
    el.innerHTML = html;
    return el.removeChild(el.lastChild);
  }

  // wrap map
  var wrap = map[tag] || map._default;
  var depth = wrap[0];
  var prefix = wrap[1];
  var suffix = wrap[2];
  var el = doc.createElement('div');
  el.innerHTML = prefix + html + suffix;
  while (depth--) {
    el = el.lastChild;
  } // one element
  if (el.firstChild == el.lastChild) {
    return el.removeChild(el.firstChild);
  }

  // several elements
  var fragment = doc.createDocumentFragment();
  while (el.firstChild) {
    fragment.appendChild(el.removeChild(el.firstChild));
  }

  return fragment;
}

var proto$1 = typeof Element !== 'undefined' ? Element.prototype : {};
var vendor$1 = proto$1.matches || proto$1.matchesSelector || proto$1.webkitMatchesSelector || proto$1.mozMatchesSelector || proto$1.msMatchesSelector || proto$1.oMatchesSelector;

var matchesSelector$1 = match$1;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match$1(el, selector) {
  if (!el || el.nodeType !== 1) return false;
  if (vendor$1) return vendor$1.call(el, selector);
  var nodes = el.parentNode.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] == el) return true;
  }
  return false;
}

function query(selector, el) {
  el = el || document;

  return el.querySelector(selector);
}

function all(selector, el) {
  el = el || document;

  return el.querySelectorAll(selector);
}

function remove(el) {
  el.parentNode && el.parentNode.removeChild(el);
}

exports.attr = attr;
exports.classes = classes;
exports.clear = clear;
exports.closest = closest;
exports.delegate = delegateEvents;
exports.domify = domify;
exports.event = componentEvent;
exports.matches = matchesSelector$1;
exports.query = query;
exports.queryAll = all;
exports.remove = remove;

},{}],110:[function(require,module,exports){
'use strict';

module.exports = require('./lib/refs');

module.exports.Collection = require('./lib/collection');

},{"./lib/collection":111,"./lib/refs":112}],111:[function(require,module,exports){
'use strict';

/**
 * An empty collection stub. Use {@link RefsCollection.extend} to extend a
 * collection with ref semantics.
 *
 * @class RefsCollection
 */

/**
 * Extends a collection with {@link Refs} aware methods
 *
 * @memberof RefsCollection
 * @static
 *
 * @param  {Array<Object>} collection
 * @param  {Refs} refs instance
 * @param  {Object} property represented by the collection
 * @param  {Object} target object the collection is attached to
 *
 * @return {RefsCollection<Object>} the extended array
 */

function extend(collection, refs, property, target) {

  var inverseProperty = property.inverse;

  /**
   * Removes the given element from the array and returns it.
   *
   * @method RefsCollection#remove
   *
   * @param {Object} element the element to remove
   */
  Object.defineProperty(collection, 'remove', {
    value: function value(element) {
      var idx = this.indexOf(element);
      if (idx !== -1) {
        this.splice(idx, 1);

        // unset inverse
        refs.unset(element, inverseProperty, target);
      }

      return element;
    }
  });

  /**
   * Returns true if the collection contains the given element
   *
   * @method RefsCollection#contains
   *
   * @param {Object} element the element to check for
   */
  Object.defineProperty(collection, 'contains', {
    value: function value(element) {
      return this.indexOf(element) !== -1;
    }
  });

  /**
   * Adds an element to the array, unless it exists already (set semantics).
   *
   * @method RefsCollection#add
   *
   * @param {Object} element the element to add
   * @param {Number} optional index to add element to
   *                 (possibly moving other elements around)
   */
  Object.defineProperty(collection, 'add', {
    value: function value(element, idx) {

      var currentIdx = this.indexOf(element);

      if (typeof idx === 'undefined') {

        if (currentIdx !== -1) {
          // element already in collection (!)
          return;
        }

        // add to end of array, as no idx is specified
        idx = this.length;
      }

      // handle already in collection
      if (currentIdx !== -1) {

        // remove element from currentIdx
        this.splice(currentIdx, 1);
      }

      // add element at idx
      this.splice(idx, 0, element);

      if (currentIdx === -1) {
        // set inverse, unless element was
        // in collection already
        refs.set(element, inverseProperty, target);
      }
    }
  });

  // a simple marker, identifying this element
  // as being a refs collection
  Object.defineProperty(collection, '__refs_collection', {
    value: true
  });

  return collection;
}

function isExtended(collection) {
  return collection.__refs_collection === true;
}

module.exports.extend = extend;

module.exports.isExtended = isExtended;

},{}],112:[function(require,module,exports){
'use strict';

var Collection = require('./collection');

function hasOwnProperty(e, property) {
  return Object.prototype.hasOwnProperty.call(e, property.name || property);
}

function defineCollectionProperty(ref, property, target) {

  var collection = Collection.extend(target[property.name] || [], ref, property, target);

  Object.defineProperty(target, property.name, {
    enumerable: property.enumerable,
    value: collection
  });

  if (collection.length) {

    collection.forEach(function (o) {
      ref.set(o, property.inverse, target);
    });
  }
}

function defineProperty(ref, property, target) {

  var inverseProperty = property.inverse;

  var _value = target[property.name];

  Object.defineProperty(target, property.name, {
    configurable: property.configurable,
    enumerable: property.enumerable,

    get: function get() {
      return _value;
    },

    set: function set(value) {

      // return if we already performed all changes
      if (value === _value) {
        return;
      }

      var old = _value;

      // temporary set null
      _value = null;

      if (old) {
        ref.unset(old, inverseProperty, target);
      }

      // set new value
      _value = value;

      // set inverse value
      ref.set(_value, inverseProperty, target);
    }
  });
}

/**
 * Creates a new references object defining two inversly related
 * attribute descriptors a and b.
 *
 * <p>
 *   When bound to an object using {@link Refs#bind} the references
 *   get activated and ensure that add and remove operations are applied
 *   reversely, too.
 * </p>
 *
 * <p>
 *   For attributes represented as collections {@link Refs} provides the
 *   {@link RefsCollection#add}, {@link RefsCollection#remove} and {@link RefsCollection#contains} extensions
 *   that must be used to properly hook into the inverse change mechanism.
 * </p>
 *
 * @class Refs
 *
 * @classdesc A bi-directional reference between two attributes.
 *
 * @param {Refs.AttributeDescriptor} a property descriptor
 * @param {Refs.AttributeDescriptor} b property descriptor
 *
 * @example
 *
 * var refs = Refs({ name: 'wheels', collection: true, enumerable: true }, { name: 'car' });
 *
 * var car = { name: 'toyota' };
 * var wheels = [{ pos: 'front-left' }, { pos: 'front-right' }];
 *
 * refs.bind(car, 'wheels');
 *
 * car.wheels // []
 * car.wheels.add(wheels[0]);
 * car.wheels.add(wheels[1]);
 *
 * car.wheels // [{ pos: 'front-left' }, { pos: 'front-right' }]
 *
 * wheels[0].car // { name: 'toyota' };
 * car.wheels.remove(wheels[0]);
 *
 * wheels[0].car // undefined
 */
function Refs(a, b) {

  if (!(this instanceof Refs)) {
    return new Refs(a, b);
  }

  // link
  a.inverse = b;
  b.inverse = a;

  this.props = {};
  this.props[a.name] = a;
  this.props[b.name] = b;
}

/**
 * Binds one side of a bi-directional reference to a
 * target object.
 *
 * @memberOf Refs
 *
 * @param  {Object} target
 * @param  {String} property
 */
Refs.prototype.bind = function (target, property) {
  if (typeof property === 'string') {
    if (!this.props[property]) {
      throw new Error('no property <' + property + '> in ref');
    }
    property = this.props[property];
  }

  if (property.collection) {
    defineCollectionProperty(this, property, target);
  } else {
    defineProperty(this, property, target);
  }
};

Refs.prototype.ensureRefsCollection = function (target, property) {

  var collection = target[property.name];

  if (!Collection.isExtended(collection)) {
    defineCollectionProperty(this, property, target);
  }

  return collection;
};

Refs.prototype.ensureBound = function (target, property) {
  if (!hasOwnProperty(target, property)) {
    this.bind(target, property);
  }
};

Refs.prototype.unset = function (target, property, value) {

  if (target) {
    this.ensureBound(target, property);

    if (property.collection) {
      this.ensureRefsCollection(target, property).remove(value);
    } else {
      target[property.name] = undefined;
    }
  }
};

Refs.prototype.set = function (target, property, value) {

  if (target) {
    this.ensureBound(target, property);

    if (property.collection) {
      this.ensureRefsCollection(target, property).add(value);
    } else {
      target[property.name] = value;
    }
  }
};

module.exports = Refs;

/**
 * An attribute descriptor to be used specify an attribute in a {@link Refs} instance
 *
 * @typedef {Object} Refs.AttributeDescriptor
 * @property {String} name
 * @property {boolean} [collection=false]
 * @property {boolean} [enumerable=false]
 */

},{"./collection":111}],113:[function(require,module,exports){
'use strict';

/**
 * This file contains portions that got extraced from Snap.svg (licensed Apache-2.0).
 *
 * @see https://github.com/adobe-webplatform/Snap.svg/blob/master/src/path.js
 */

/* eslint no-fallthrough: "off" */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var has = 'hasOwnProperty',
    p2s = /,?([a-z]),?/gi,
    toFloat = parseFloat,
    math = Math,
    PI = math.PI,
    mmin = math.min,
    mmax = math.max,
    pow = math.pow,
    abs = math.abs,
    pathCommand = /([a-z])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?[\s]*,?[\s]*)+)/ig,
    pathValues = /(-?\d*\.?\d*(?:e[-+]?\\d+)?)[\s]*,?[\s]*/ig;

function is(o, type) {
  type = String.prototype.toLowerCase.call(type);

  if (type == 'finite') {
    return isFinite(o);
  }

  if (type == 'array' && (o instanceof Array || Array.isArray && Array.isArray(o))) {
    return true;
  }

  return type == 'null' && o === null || type == (typeof o === 'undefined' ? 'undefined' : _typeof(o)) && o !== null || type == 'object' && o === Object(o) || Object.prototype.toString.call(o).slice(8, -1).toLowerCase() == type;
}

function clone(obj) {

  if (typeof obj == 'function' || Object(obj) !== obj) {
    return obj;
  }

  var res = new obj.constructor();

  for (var key in obj) {
    if (obj[has](key)) {
      res[key] = clone(obj[key]);
    }
  }return res;
}

function repush(array, item) {
  for (var i = 0, ii = array.length; i < ii; i++) {
    if (array[i] === item) {
      return array.push(array.splice(i, 1)[0]);
    }
  }
}

function cacher(f, scope, postprocessor) {

  function newf() {

    var arg = Array.prototype.slice.call(arguments, 0),
        args = arg.join('\u2400'),
        cache = newf.cache = newf.cache || {},
        count = newf.count = newf.count || [];

    if (cache[has](args)) {
      repush(count, args);
      return postprocessor ? postprocessor(cache[args]) : cache[args];
    }

    count.length >= 1e3 && delete cache[count.shift()];
    count.push(args);
    cache[args] = f.apply(scope, arg);

    return postprocessor ? postprocessor(cache[args]) : cache[args];
  }
  return newf;
}

function parsePathString(pathString) {

  if (!pathString) {
    return null;
  }

  var pth = paths(pathString);

  if (pth.arr) {
    return clone(pth.arr);
  }

  var paramCounts = { a: 7, c: 6, o: 2, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, u: 3, z: 0 },
      data = [];

  if (is(pathString, 'array') && is(pathString[0], 'array')) {
    // rough assumption
    data = clone(pathString);
  }

  if (!data.length) {

    String(pathString).replace(pathCommand, function (a, b, c) {
      var params = [],
          name = b.toLowerCase();

      c.replace(pathValues, function (a, b) {
        b && params.push(+b);
      });

      if (name == 'm' && params.length > 2) {
        data.push([b].concat(params.splice(0, 2)));
        name = 'l';
        b = b == 'm' ? 'l' : 'L';
      }

      if (name == 'o' && params.length == 1) {
        data.push([b, params[0]]);
      }

      if (name == 'r') {
        data.push([b].concat(params));
      } else while (params.length >= paramCounts[name]) {
        data.push([b].concat(params.splice(0, paramCounts[name])));
        if (!paramCounts[name]) {
          break;
        }
      }
    });
  }

  data.toString = paths.toString;
  pth.arr = clone(data);

  return data;
}

function paths(ps) {
  var p = paths.ps = paths.ps || {};

  if (p[ps]) {
    p[ps].sleep = 100;
  } else {
    p[ps] = {
      sleep: 100
    };
  }

  setTimeout(function () {
    for (var key in p) {
      if (p[has](key) && key != ps) {
        p[key].sleep--;
        !p[key].sleep && delete p[key];
      }
    }
  });

  return p[ps];
}

function box(x, y, width, height) {
  if (x == null) {
    x = y = width = height = 0;
  }

  if (y == null) {
    y = x.y;
    width = x.width;
    height = x.height;
    x = x.x;
  }

  return {
    x: x,
    y: y,
    width: width,
    w: width,
    height: height,
    h: height,
    x2: x + width,
    y2: y + height,
    cx: x + width / 2,
    cy: y + height / 2,
    r1: math.min(width, height) / 2,
    r2: math.max(width, height) / 2,
    r0: math.sqrt(width * width + height * height) / 2,
    path: rectPath(x, y, width, height),
    vb: [x, y, width, height].join(' ')
  };
}

function pathToString() {
  return this.join(',').replace(p2s, '$1');
}

function pathClone(pathArray) {
  var res = clone(pathArray);
  res.toString = pathToString;
  return res;
}

function findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
  var t1 = 1 - t,
      t13 = pow(t1, 3),
      t12 = pow(t1, 2),
      t2 = t * t,
      t3 = t2 * t,
      x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x,
      y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y,
      mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x),
      my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y),
      nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x),
      ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y),
      ax = t1 * p1x + t * c1x,
      ay = t1 * p1y + t * c1y,
      cx = t1 * c2x + t * p2x,
      cy = t1 * c2y + t * p2y,
      alpha = 90 - math.atan2(mx - nx, my - ny) * 180 / PI;

  return {
    x: x,
    y: y,
    m: { x: mx, y: my },
    n: { x: nx, y: ny },
    start: { x: ax, y: ay },
    end: { x: cx, y: cy },
    alpha: alpha
  };
}

function bezierBBox(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {

  if (!is(p1x, 'array')) {
    p1x = [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y];
  }

  var bbox = curveBBox.apply(null, p1x);

  return box(bbox.min.x, bbox.min.y, bbox.max.x - bbox.min.x, bbox.max.y - bbox.min.y);
}

function isPointInsideBBox(bbox, x, y) {
  return x >= bbox.x && x <= bbox.x + bbox.width && y >= bbox.y && y <= bbox.y + bbox.height;
}

function isBBoxIntersect(bbox1, bbox2) {
  bbox1 = box(bbox1);
  bbox2 = box(bbox2);
  return isPointInsideBBox(bbox2, bbox1.x, bbox1.y) || isPointInsideBBox(bbox2, bbox1.x2, bbox1.y) || isPointInsideBBox(bbox2, bbox1.x, bbox1.y2) || isPointInsideBBox(bbox2, bbox1.x2, bbox1.y2) || isPointInsideBBox(bbox1, bbox2.x, bbox2.y) || isPointInsideBBox(bbox1, bbox2.x2, bbox2.y) || isPointInsideBBox(bbox1, bbox2.x, bbox2.y2) || isPointInsideBBox(bbox1, bbox2.x2, bbox2.y2) || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x) && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y);
}

function base3(t, p1, p2, p3, p4) {
  var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4,
      t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
  return t * t2 - 3 * p1 + 3 * p2;
}

function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {

  if (z == null) {
    z = 1;
  }

  z = z > 1 ? 1 : z < 0 ? 0 : z;

  var z2 = z / 2,
      n = 12,
      Tvalues = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816],
      Cvalues = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472],
      sum = 0;

  for (var i = 0; i < n; i++) {
    var ct = z2 * Tvalues[i] + z2,
        xbase = base3(ct, x1, x2, x3, x4),
        ybase = base3(ct, y1, y2, y3, y4),
        comb = xbase * xbase + ybase * ybase;

    sum += Cvalues[i] * math.sqrt(comb);
  }

  return z2 * sum;
}

function intersectLines(x1, y1, x2, y2, x3, y3, x4, y4) {

  if (mmax(x1, x2) < mmin(x3, x4) || mmin(x1, x2) > mmax(x3, x4) || mmax(y1, y2) < mmin(y3, y4) || mmin(y1, y2) > mmax(y3, y4)) {
    return;
  }

  var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4),
      ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4),
      denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

  if (!denominator) {
    return;
  }

  var px = nx / denominator,
      py = ny / denominator,
      px2 = +px.toFixed(2),
      py2 = +py.toFixed(2);

  if (px2 < +mmin(x1, x2).toFixed(2) || px2 > +mmax(x1, x2).toFixed(2) || px2 < +mmin(x3, x4).toFixed(2) || px2 > +mmax(x3, x4).toFixed(2) || py2 < +mmin(y1, y2).toFixed(2) || py2 > +mmax(y1, y2).toFixed(2) || py2 < +mmin(y3, y4).toFixed(2) || py2 > +mmax(y3, y4).toFixed(2)) {
    return;
  }

  return { x: px, y: py };
}

function findBezierIntersections(bez1, bez2, justCount) {
  var bbox1 = bezierBBox(bez1),
      bbox2 = bezierBBox(bez2);

  if (!isBBoxIntersect(bbox1, bbox2)) {
    return justCount ? 0 : [];
  }

  var l1 = bezlen.apply(0, bez1),
      l2 = bezlen.apply(0, bez2),
      n1 = ~~(l1 / 5),
      n2 = ~~(l2 / 5),
      dots1 = [],
      dots2 = [],
      xy = {},
      res = justCount ? 0 : [];

  for (var i = 0; i < n1 + 1; i++) {
    var p = findDotsAtSegment.apply(0, bez1.concat(i / n1));
    dots1.push({ x: p.x, y: p.y, t: i / n1 });
  }

  for (i = 0; i < n2 + 1; i++) {
    p = findDotsAtSegment.apply(0, bez2.concat(i / n2));
    dots2.push({ x: p.x, y: p.y, t: i / n2 });
  }

  for (i = 0; i < n1; i++) {

    for (var j = 0; j < n2; j++) {
      var di = dots1[i],
          di1 = dots1[i + 1],
          dj = dots2[j],
          dj1 = dots2[j + 1],
          ci = abs(di1.x - di.x) < .01 ? 'y' : 'x',
          cj = abs(dj1.x - dj.x) < .01 ? 'y' : 'x',
          is = intersectLines(di.x, di.y, di1.x, di1.y, dj.x, dj.y, dj1.x, dj1.y);

      if (is) {

        if (xy[is.x.toFixed(0)] == is.y.toFixed(0)) {
          continue;
        }

        xy[is.x.toFixed(0)] = is.y.toFixed(0);

        var t1 = di.t + abs((is[ci] - di[ci]) / (di1[ci] - di[ci])) * (di1.t - di.t),
            t2 = dj.t + abs((is[cj] - dj[cj]) / (dj1[cj] - dj[cj])) * (dj1.t - dj.t);

        if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {

          if (justCount) {
            res++;
          } else {
            res.push({
              x: is.x,
              y: is.y,
              t1: t1,
              t2: t2
            });
          }
        }
      }
    }
  }

  return res;
}

/**
 * Find or counts the intersections between two SVG paths.
 *
 * Returns a number in counting mode and a list of intersections otherwise.
 *
 * A single intersection entry contains the intersection coordinates (x, y)
 * as well as additional information regarding the intersecting segments
 * on each path (segment1, segment2) and the relative location of the
 * intersection on these segments (t1, t2).
 *
 * The path may be an SVG path string or a list of path components
 * such as `[ [ 'M', 0, 10 ], [ 'L', 20, 0 ] ]`.
 *
 * @example
 *
 * var intersections = findPathIntersections(
 *   'M0,0L100,100',
 *   [ [ 'M', 0, 100 ], [ 'L', 100, 0 ] ]
 * );
 *
 * // intersections = [
 * //   { x: 50, y: 50, segment1: 1, segment2: 1, t1: 0.5, t2: 0.5 }
 * //
 *
 * @param {String|Array<PathDef>} path1
 * @param {String|Array<PathDef>} path2
 * @param {Boolean} [justCount=false]
 *
 * @return {Array<Intersection>|Number}
 */
function findPathIntersections(path1, path2, justCount) {
  path1 = pathToCurve(path1);
  path2 = pathToCurve(path2);

  var x1,
      y1,
      x2,
      y2,
      x1m,
      y1m,
      x2m,
      y2m,
      bez1,
      bez2,
      res = justCount ? 0 : [];

  for (var i = 0, ii = path1.length; i < ii; i++) {
    var pi = path1[i];

    if (pi[0] == 'M') {
      x1 = x1m = pi[1];
      y1 = y1m = pi[2];
    } else {

      if (pi[0] == 'C') {
        bez1 = [x1, y1].concat(pi.slice(1));
        x1 = bez1[6];
        y1 = bez1[7];
      } else {
        bez1 = [x1, y1, x1, y1, x1m, y1m, x1m, y1m];
        x1 = x1m;
        y1 = y1m;
      }

      for (var j = 0, jj = path2.length; j < jj; j++) {
        var pj = path2[j];

        if (pj[0] == 'M') {
          x2 = x2m = pj[1];
          y2 = y2m = pj[2];
        } else {

          if (pj[0] == 'C') {
            bez2 = [x2, y2].concat(pj.slice(1));
            x2 = bez2[6];
            y2 = bez2[7];
          } else {
            bez2 = [x2, y2, x2, y2, x2m, y2m, x2m, y2m];
            x2 = x2m;
            y2 = y2m;
          }

          var intr = findBezierIntersections(bez1, bez2, justCount);

          if (justCount) {
            res += intr;
          } else {

            for (var k = 0, kk = intr.length; k < kk; k++) {
              intr[k].segment1 = i;
              intr[k].segment2 = j;
              intr[k].bez1 = bez1;
              intr[k].bez2 = bez2;
            }

            res = res.concat(intr);
          }
        }
      }
    }
  }

  return res;
}

function rectPath(x, y, w, h, r) {
  if (r) {
    return [['M', +x + +r, y], ['l', w - r * 2, 0], ['a', r, r, 0, 0, 1, r, r], ['l', 0, h - r * 2], ['a', r, r, 0, 0, 1, -r, r], ['l', r * 2 - w, 0], ['a', r, r, 0, 0, 1, -r, -r], ['l', 0, r * 2 - h], ['a', r, r, 0, 0, 1, r, -r], ['z']];
  }

  var res = [['M', x, y], ['l', w, 0], ['l', 0, h], ['l', -w, 0], ['z']];
  res.toString = pathToString;

  return res;
}

function ellipsePath(x, y, rx, ry, a) {
  if (a == null && ry == null) {
    ry = rx;
  }

  x = +x;
  y = +y;
  rx = +rx;
  ry = +ry;

  if (a != null) {
    var rad = Math.PI / 180,
        x1 = x + rx * Math.cos(-ry * rad),
        x2 = x + rx * Math.cos(-a * rad),
        y1 = y + rx * Math.sin(-ry * rad),
        y2 = y + rx * Math.sin(-a * rad),
        res = [['M', x1, y1], ['A', rx, rx, 0, +(a - ry > 180), 0, x2, y2]];
  } else {
    res = [['M', x, y], ['m', 0, -ry], ['a', rx, ry, 0, 1, 1, 0, 2 * ry], ['a', rx, ry, 0, 1, 1, 0, -2 * ry], ['z']];
  }

  res.toString = pathToString;

  return res;
}

function pathToAbsolute(pathArray) {
  var pth = paths(pathArray);

  if (pth.abs) {
    return pathClone(pth.abs);
  }

  if (!is(pathArray, 'array') || !is(pathArray && pathArray[0], 'array')) {
    // rough assumption
    pathArray = parsePathString(pathArray);
  }

  if (!pathArray || !pathArray.length) {
    return [['M', 0, 0]];
  }

  var res = [],
      x = 0,
      y = 0,
      mx = 0,
      my = 0,
      start = 0,
      pa0;

  if (pathArray[0][0] == 'M') {
    x = +pathArray[0][1];
    y = +pathArray[0][2];
    mx = x;
    my = y;
    start++;
    res[0] = ['M', x, y];
  }

  var crz = pathArray.length == 3 && pathArray[0][0] == 'M' && pathArray[1][0].toUpperCase() == 'R' && pathArray[2][0].toUpperCase() == 'Z';

  for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
    res.push(r = []);
    pa = pathArray[i];
    pa0 = pa[0];

    if (pa0 != pa0.toUpperCase()) {
      r[0] = pa0.toUpperCase();

      switch (r[0]) {
        case 'A':
          r[1] = pa[1];
          r[2] = pa[2];
          r[3] = pa[3];
          r[4] = pa[4];
          r[5] = pa[5];
          r[6] = +pa[6] + x;
          r[7] = +pa[7] + y;
          break;
        case 'V':
          r[1] = +pa[1] + y;
          break;
        case 'H':
          r[1] = +pa[1] + x;
          break;
        case 'R':
          var dots = [x, y].concat(pa.slice(1));

          for (var j = 2, jj = dots.length; j < jj; j++) {
            dots[j] = +dots[j] + x;
            dots[++j] = +dots[j] + y;
          }

          res.pop();
          res = res.concat(catmulRomToBezier(dots, crz));
          break;
        case 'O':
          res.pop();
          dots = ellipsePath(x, y, pa[1], pa[2]);
          dots.push(dots[0]);
          res = res.concat(dots);
          break;
        case 'U':
          res.pop();
          res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
          r = ['U'].concat(res[res.length - 1].slice(-2));
          break;
        case 'M':
          mx = +pa[1] + x;
          my = +pa[2] + y;
        default:

          for (j = 1, jj = pa.length; j < jj; j++) {
            r[j] = +pa[j] + (j % 2 ? x : y);
          }
      }
    } else if (pa0 == 'R') {
      dots = [x, y].concat(pa.slice(1));
      res.pop();
      res = res.concat(catmulRomToBezier(dots, crz));
      r = ['R'].concat(pa.slice(-2));
    } else if (pa0 == 'O') {
      res.pop();
      dots = ellipsePath(x, y, pa[1], pa[2]);
      dots.push(dots[0]);
      res = res.concat(dots);
    } else if (pa0 == 'U') {
      res.pop();
      res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
      r = ['U'].concat(res[res.length - 1].slice(-2));
    } else {

      for (var k = 0, kk = pa.length; k < kk; k++) {
        r[k] = pa[k];
      }
    }
    pa0 = pa0.toUpperCase();

    if (pa0 != 'O') {
      switch (r[0]) {
        case 'Z':
          x = +mx;
          y = +my;
          break;
        case 'H':
          x = r[1];
          break;
        case 'V':
          y = r[1];
          break;
        case 'M':
          mx = r[r.length - 2];
          my = r[r.length - 1];
        default:
          x = r[r.length - 2];
          y = r[r.length - 1];
      }
    }
  }

  res.toString = pathToString;
  pth.abs = pathClone(res);

  return res;
}

function lineToCurve(x1, y1, x2, y2) {
  return [x1, y1, x2, y2, x2, y2];
}

function qubicToCurve(x1, y1, ax, ay, x2, y2) {
  var _13 = 1 / 3,
      _23 = 2 / 3;

  return [_13 * x1 + _23 * ax, _13 * y1 + _23 * ay, _13 * x2 + _23 * ax, _13 * y2 + _23 * ay, x2, y2];
}

function arcToCurve(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {

  // for more information of where this math came from visit:
  // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
  var _120 = PI * 120 / 180,
      rad = PI / 180 * (+angle || 0),
      res = [],
      xy,
      rotate = cacher(function (x, y, rad) {
    var X = x * math.cos(rad) - y * math.sin(rad),
        Y = x * math.sin(rad) + y * math.cos(rad);

    return { x: X, y: Y };
  });

  if (!recursive) {
    xy = rotate(x1, y1, -rad);
    x1 = xy.x;
    y1 = xy.y;
    xy = rotate(x2, y2, -rad);
    x2 = xy.x;
    y2 = xy.y;

    var x = (x1 - x2) / 2,
        y = (y1 - y2) / 2;

    var h = x * x / (rx * rx) + y * y / (ry * ry);

    if (h > 1) {
      h = math.sqrt(h);
      rx = h * rx;
      ry = h * ry;
    }

    var rx2 = rx * rx,
        ry2 = ry * ry,
        k = (large_arc_flag == sweep_flag ? -1 : 1) * math.sqrt(abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
        cx = k * rx * y / ry + (x1 + x2) / 2,
        cy = k * -ry * x / rx + (y1 + y2) / 2,
        f1 = math.asin(((y1 - cy) / ry).toFixed(9)),
        f2 = math.asin(((y2 - cy) / ry).toFixed(9));

    f1 = x1 < cx ? PI - f1 : f1;
    f2 = x2 < cx ? PI - f2 : f2;
    f1 < 0 && (f1 = PI * 2 + f1);
    f2 < 0 && (f2 = PI * 2 + f2);

    if (sweep_flag && f1 > f2) {
      f1 = f1 - PI * 2;
    }
    if (!sweep_flag && f2 > f1) {
      f2 = f2 - PI * 2;
    }
  } else {
    f1 = recursive[0];
    f2 = recursive[1];
    cx = recursive[2];
    cy = recursive[3];
  }

  var df = f2 - f1;

  if (abs(df) > _120) {
    var f2old = f2,
        x2old = x2,
        y2old = y2;

    f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
    x2 = cx + rx * math.cos(f2);
    y2 = cy + ry * math.sin(f2);
    res = arcToCurve(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
  }

  df = f2 - f1;

  var c1 = math.cos(f1),
      s1 = math.sin(f1),
      c2 = math.cos(f2),
      s2 = math.sin(f2),
      t = math.tan(df / 4),
      hx = 4 / 3 * rx * t,
      hy = 4 / 3 * ry * t,
      m1 = [x1, y1],
      m2 = [x1 + hx * s1, y1 - hy * c1],
      m3 = [x2 + hx * s2, y2 - hy * c2],
      m4 = [x2, y2];

  m2[0] = 2 * m1[0] - m2[0];
  m2[1] = 2 * m1[1] - m2[1];

  if (recursive) {
    return [m2, m3, m4].concat(res);
  } else {
    res = [m2, m3, m4].concat(res).join().split(',');
    var newres = [];

    for (var i = 0, ii = res.length; i < ii; i++) {
      newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
    }

    return newres;
  }
}

// http://schepers.cc/getting-to-the-point
function catmulRomToBezier(crp, z) {
  var d = [];

  for (var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
    var p = [{ x: +crp[i - 2], y: +crp[i - 1] }, { x: +crp[i], y: +crp[i + 1] }, { x: +crp[i + 2], y: +crp[i + 3] }, { x: +crp[i + 4], y: +crp[i + 5] }];

    if (z) {

      if (!i) {
        p[0] = { x: +crp[iLen - 2], y: +crp[iLen - 1] };
      } else if (iLen - 4 == i) {
        p[3] = { x: +crp[0], y: +crp[1] };
      } else if (iLen - 2 == i) {
        p[2] = { x: +crp[0], y: +crp[1] };
        p[3] = { x: +crp[2], y: +crp[3] };
      }
    } else {

      if (iLen - 4 == i) {
        p[3] = p[2];
      } else if (!i) {
        p[0] = { x: +crp[i], y: +crp[i + 1] };
      }
    }

    d.push(['C', (-p[0].x + 6 * p[1].x + p[2].x) / 6, (-p[0].y + 6 * p[1].y + p[2].y) / 6, (p[1].x + 6 * p[2].x - p[3].x) / 6, (p[1].y + 6 * p[2].y - p[3].y) / 6, p[2].x, p[2].y]);
  }

  return d;
}

// Returns bounding box of cubic bezier curve.
// Source: http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
// Original version: NISHIO Hirokazu
// Modifications: https://github.com/timo22345
function curveBBox(x0, y0, x1, y1, x2, y2, x3, y3) {
  var tvalues = [],
      bounds = [[], []],
      a,
      b,
      c,
      t,
      t1,
      t2,
      b2ac,
      sqrtb2ac;

  for (var i = 0; i < 2; ++i) {

    if (i == 0) {
      b = 6 * x0 - 12 * x1 + 6 * x2;
      a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
      c = 3 * x1 - 3 * x0;
    } else {
      b = 6 * y0 - 12 * y1 + 6 * y2;
      a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
      c = 3 * y1 - 3 * y0;
    }

    if (abs(a) < 1e-12) {

      if (abs(b) < 1e-12) {
        continue;
      }

      t = -c / b;

      if (0 < t && t < 1) {
        tvalues.push(t);
      }

      continue;
    }

    b2ac = b * b - 4 * c * a;
    sqrtb2ac = math.sqrt(b2ac);

    if (b2ac < 0) {
      continue;
    }

    t1 = (-b + sqrtb2ac) / (2 * a);

    if (0 < t1 && t1 < 1) {
      tvalues.push(t1);
    }

    t2 = (-b - sqrtb2ac) / (2 * a);

    if (0 < t2 && t2 < 1) {
      tvalues.push(t2);
    }
  }

  var j = tvalues.length,
      jlen = j,
      mt;

  while (j--) {
    t = tvalues[j];
    mt = 1 - t;
    bounds[0][j] = mt * mt * mt * x0 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x3;
    bounds[1][j] = mt * mt * mt * y0 + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y3;
  }

  bounds[0][jlen] = x0;
  bounds[1][jlen] = y0;
  bounds[0][jlen + 1] = x3;
  bounds[1][jlen + 1] = y3;
  bounds[0].length = bounds[1].length = jlen + 2;

  return {
    min: { x: mmin.apply(0, bounds[0]), y: mmin.apply(0, bounds[1]) },
    max: { x: mmax.apply(0, bounds[0]), y: mmax.apply(0, bounds[1]) }
  };
}

function pathToCurve(path, path2) {
  var pth = !path2 && paths(path);

  if (!path2 && pth.curve) {
    return pathClone(pth.curve);
  }

  var p = pathToAbsolute(path),
      p2 = path2 && pathToAbsolute(path2),
      attrs = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
      attrs2 = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
      processPath = function processPath(path, d, pcom) {
    var nx, ny;

    if (!path) {
      return ['C', d.x, d.y, d.x, d.y, d.x, d.y];
    }

    !(path[0] in { T: 1, Q: 1 }) && (d.qx = d.qy = null);

    switch (path[0]) {
      case 'M':
        d.X = path[1];
        d.Y = path[2];
        break;
      case 'A':
        path = ['C'].concat(arcToCurve.apply(0, [d.x, d.y].concat(path.slice(1))));
        break;
      case 'S':
        if (pcom == 'C' || pcom == 'S') {
          // In 'S' case we have to take into account, if the previous command is C/S.
          nx = d.x * 2 - d.bx;
          // And reflect the previous
          ny = d.y * 2 - d.by;
          // command's control point relative to the current point.
        } else {
          // or some else or nothing
          nx = d.x;
          ny = d.y;
        }
        path = ['C', nx, ny].concat(path.slice(1));
        break;
      case 'T':
        if (pcom == 'Q' || pcom == 'T') {
          // In 'T' case we have to take into account, if the previous command is Q/T.
          d.qx = d.x * 2 - d.qx;
          // And make a reflection similar
          d.qy = d.y * 2 - d.qy;
          // to case 'S'.
        } else {
          // or something else or nothing
          d.qx = d.x;
          d.qy = d.y;
        }
        path = ['C'].concat(qubicToCurve(d.x, d.y, d.qx, d.qy, path[1], path[2]));
        break;
      case 'Q':
        d.qx = path[1];
        d.qy = path[2];
        path = ['C'].concat(qubicToCurve(d.x, d.y, path[1], path[2], path[3], path[4]));
        break;
      case 'L':
        path = ['C'].concat(lineToCurve(d.x, d.y, path[1], path[2]));
        break;
      case 'H':
        path = ['C'].concat(lineToCurve(d.x, d.y, path[1], d.y));
        break;
      case 'V':
        path = ['C'].concat(lineToCurve(d.x, d.y, d.x, path[1]));
        break;
      case 'Z':
        path = ['C'].concat(lineToCurve(d.x, d.y, d.X, d.Y));
        break;
    }

    return path;
  },
      fixArc = function fixArc(pp, i) {

    if (pp[i].length > 7) {
      pp[i].shift();
      var pi = pp[i];

      while (pi.length) {
        pcoms1[i] = 'A'; // if created multiple C:s, their original seg is saved
        p2 && (pcoms2[i] = 'A'); // the same as above
        pp.splice(i++, 0, ['C'].concat(pi.splice(0, 6)));
      }

      pp.splice(i, 1);
      ii = mmax(p.length, p2 && p2.length || 0);
    }
  },
      fixM = function fixM(path1, path2, a1, a2, i) {

    if (path1 && path2 && path1[i][0] == 'M' && path2[i][0] != 'M') {
      path2.splice(i, 0, ['M', a2.x, a2.y]);
      a1.bx = 0;
      a1.by = 0;
      a1.x = path1[i][1];
      a1.y = path1[i][2];
      ii = mmax(p.length, p2 && p2.length || 0);
    }
  },
      pcoms1 = [],
      // path commands of original path p
  pcoms2 = [],
      // path commands of original path p2
  pfirst = '',
      // temporary holder for original path command
  pcom = ''; // holder for previous path command of original path

  for (var i = 0, ii = mmax(p.length, p2 && p2.length || 0); i < ii; i++) {
    p[i] && (pfirst = p[i][0]); // save current path command

    if (pfirst != 'C') // C is not saved yet, because it may be result of conversion
      {
        pcoms1[i] = pfirst; // Save current path command
        i && (pcom = pcoms1[i - 1]); // Get previous path command pcom
      }
    p[i] = processPath(p[i], attrs, pcom); // Previous path command is inputted to processPath

    if (pcoms1[i] != 'A' && pfirst == 'C') pcoms1[i] = 'C'; // A is the only command
    // which may produce multiple C:s
    // so we have to make sure that C is also C in original path

    fixArc(p, i); // fixArc adds also the right amount of A:s to pcoms1

    if (p2) {
      // the same procedures is done to p2
      p2[i] && (pfirst = p2[i][0]);

      if (pfirst != 'C') {
        pcoms2[i] = pfirst;
        i && (pcom = pcoms2[i - 1]);
      }

      p2[i] = processPath(p2[i], attrs2, pcom);

      if (pcoms2[i] != 'A' && pfirst == 'C') {
        pcoms2[i] = 'C';
      }

      fixArc(p2, i);
    }

    fixM(p, p2, attrs, attrs2, i);
    fixM(p2, p, attrs2, attrs, i);

    var seg = p[i],
        seg2 = p2 && p2[i],
        seglen = seg.length,
        seg2len = p2 && seg2.length;

    attrs.x = seg[seglen - 2];
    attrs.y = seg[seglen - 1];
    attrs.bx = toFloat(seg[seglen - 4]) || attrs.x;
    attrs.by = toFloat(seg[seglen - 3]) || attrs.y;
    attrs2.bx = p2 && (toFloat(seg2[seg2len - 4]) || attrs2.x);
    attrs2.by = p2 && (toFloat(seg2[seg2len - 3]) || attrs2.y);
    attrs2.x = p2 && seg2[seg2len - 2];
    attrs2.y = p2 && seg2[seg2len - 1];
  }

  if (!p2) {
    pth.curve = pathClone(p);
  }

  return p2 ? [p, p2] : p;
}

module.exports = findPathIntersections;

},{}],114:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function ensureImported(element, target) {

  if (element.ownerDocument !== target.ownerDocument) {
    try {
      // may fail on webkit
      return target.ownerDocument.importNode(element, true);
    } catch (e) {
      // ignore
    }
  }

  return element;
}

/**
 * appendTo utility
 */

/**
 * Append a node to a target element and return the appended node.
 *
 * @param  {SVGElement} element
 * @param  {SVGElement} target
 *
 * @return {SVGElement} the appended node
 */
function appendTo(element, target) {
  return target.appendChild(ensureImported(element, target));
}

/**
 * append utility
 */

/**
 * Append a node to an element
 *
 * @param  {SVGElement} element
 * @param  {SVGElement} node
 *
 * @return {SVGElement} the element
 */
function append(target, node) {
  appendTo(node, target);
  return target;
}

/**
 * attribute accessor utility
 */

var LENGTH_ATTR = 2;

var CSS_PROPERTIES = {
  'alignment-baseline': 1,
  'baseline-shift': 1,
  'clip': 1,
  'clip-path': 1,
  'clip-rule': 1,
  'color': 1,
  'color-interpolation': 1,
  'color-interpolation-filters': 1,
  'color-profile': 1,
  'color-rendering': 1,
  'cursor': 1,
  'direction': 1,
  'display': 1,
  'dominant-baseline': 1,
  'enable-background': 1,
  'fill': 1,
  'fill-opacity': 1,
  'fill-rule': 1,
  'filter': 1,
  'flood-color': 1,
  'flood-opacity': 1,
  'font': 1,
  'font-family': 1,
  'font-size': LENGTH_ATTR,
  'font-size-adjust': 1,
  'font-stretch': 1,
  'font-style': 1,
  'font-variant': 1,
  'font-weight': 1,
  'glyph-orientation-horizontal': 1,
  'glyph-orientation-vertical': 1,
  'image-rendering': 1,
  'kerning': 1,
  'letter-spacing': 1,
  'lighting-color': 1,
  'marker': 1,
  'marker-end': 1,
  'marker-mid': 1,
  'marker-start': 1,
  'mask': 1,
  'opacity': 1,
  'overflow': 1,
  'pointer-events': 1,
  'shape-rendering': 1,
  'stop-color': 1,
  'stop-opacity': 1,
  'stroke': 1,
  'stroke-dasharray': 1,
  'stroke-dashoffset': 1,
  'stroke-linecap': 1,
  'stroke-linejoin': 1,
  'stroke-miterlimit': 1,
  'stroke-opacity': 1,
  'stroke-width': LENGTH_ATTR,
  'text-anchor': 1,
  'text-decoration': 1,
  'text-rendering': 1,
  'unicode-bidi': 1,
  'visibility': 1,
  'word-spacing': 1,
  'writing-mode': 1
};

function getAttribute(node, name) {
  if (CSS_PROPERTIES[name]) {
    return node.style[name];
  } else {
    return node.getAttributeNS(null, name);
  }
}

function setAttribute(node, name, value) {
  var hyphenated = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

  var type = CSS_PROPERTIES[hyphenated];

  if (type) {
    // append pixel unit, unless present
    if (type === LENGTH_ATTR && typeof value === 'number') {
      value = String(value) + 'px';
    }

    node.style[hyphenated] = value;
  } else {
    node.setAttributeNS(null, name, value);
  }
}

function setAttributes(node, attrs) {

  var names = Object.keys(attrs),
      i,
      name;

  for (i = 0, name; name = names[i]; i++) {
    setAttribute(node, name, attrs[name]);
  }
}

/**
 * Gets or sets raw attributes on a node.
 *
 * @param  {SVGElement} node
 * @param  {Object} [attrs]
 * @param  {String} [name]
 * @param  {String} [value]
 *
 * @return {String}
 */
function attr(node, name, value) {
  if (typeof name === 'string') {
    if (value !== undefined) {
      setAttribute(node, name, value);
    } else {
      return getAttribute(node, name);
    }
  } else {
    setAttributes(node, name);
  }

  return node;
}

/**
 * Clear utility
 */
function index(arr, obj) {
  if (arr.indexOf) {
    return arr.indexOf(obj);
  }

  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) {
      return i;
    }
  }

  return -1;
}

var re = /\s+/;

var toString = Object.prototype.toString;

function defined(o) {
  return typeof o !== 'undefined';
}

/**
 * Wrap `el` in a `ClassList`.
 *
 * @param {Element} el
 * @return {ClassList}
 * @api public
 */

function classes(el) {
  return new ClassList(el);
}

function ClassList(el) {
  if (!el || !el.nodeType) {
    throw new Error('A DOM element reference is required');
  }
  this.el = el;
  this.list = el.classList;
}

/**
 * Add class `name` if not already present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.add = function (name) {

  // classList
  if (this.list) {
    this.list.add(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (!~i) {
    arr.push(name);
  }

  if (defined(this.el.className.baseVal)) {
    this.el.className.baseVal = arr.join(' ');
  } else {
    this.el.className = arr.join(' ');
  }

  return this;
};

/**
 * Remove class `name` when present, or
 * pass a regular expression to remove
 * any which match.
 *
 * @param {String|RegExp} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.remove = function (name) {
  if ('[object RegExp]' === toString.call(name)) {
    return this.removeMatching(name);
  }

  // classList
  if (this.list) {
    this.list.remove(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (~i) {
    arr.splice(i, 1);
  }
  this.el.className.baseVal = arr.join(' ');
  return this;
};

/**
 * Remove all classes matching `re`.
 *
 * @param {RegExp} re
 * @return {ClassList}
 * @api private
 */

ClassList.prototype.removeMatching = function (re) {
  var arr = this.array();
  for (var i = 0; i < arr.length; i++) {
    if (re.test(arr[i])) {
      this.remove(arr[i]);
    }
  }
  return this;
};

/**
 * Toggle class `name`, can force state via `force`.
 *
 * For browsers that support classList, but do not support `force` yet,
 * the mistake will be detected and corrected.
 *
 * @param {String} name
 * @param {Boolean} force
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.toggle = function (name, force) {
  // classList
  if (this.list) {
    if (defined(force)) {
      if (force !== this.list.toggle(name, force)) {
        this.list.toggle(name); // toggle again to correct
      }
    } else {
      this.list.toggle(name);
    }
    return this;
  }

  // fallback
  if (defined(force)) {
    if (!force) {
      this.remove(name);
    } else {
      this.add(name);
    }
  } else {
    if (this.has(name)) {
      this.remove(name);
    } else {
      this.add(name);
    }
  }

  return this;
};

/**
 * Return an array of classes.
 *
 * @return {Array}
 * @api public
 */

ClassList.prototype.array = function () {
  var className = this.el.getAttribute('class') || '';
  var str = className.replace(/^\s+|\s+$/g, '');
  var arr = str.split(re);
  if ('' === arr[0]) {
    arr.shift();
  }
  return arr;
};

/**
 * Check if class `name` is present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.has = ClassList.prototype.contains = function (name) {
  return this.list ? this.list.contains(name) : !!~index(this.array(), name);
};

function remove(element) {
  var parent = element.parentNode;

  if (parent) {
    parent.removeChild(element);
  }

  return element;
}

/**
 * Clear utility
 */

/**
 * Removes all children from the given element
 *
 * @param  {DOMElement} element
 * @return {DOMElement} the element (for chaining)
 */
function clear(element) {
  var child;

  while (child = element.firstChild) {
    remove(child);
  }

  return element;
}

function clone(element) {
  return element.cloneNode(true);
}

var ns = {
  svg: 'http://www.w3.org/2000/svg'
};

/**
 * DOM parsing utility
 */

var SVG_START = '<svg xmlns="' + ns.svg + '"';

function parse(svg) {

  var unwrap = false;

  // ensure we import a valid svg document
  if (svg.substring(0, 4) === '<svg') {
    if (svg.indexOf(ns.svg) === -1) {
      svg = SVG_START + svg.substring(4);
    }
  } else {
    // namespace svg
    svg = SVG_START + '>' + svg + '</svg>';
    unwrap = true;
  }

  var parsed = parseDocument(svg);

  if (!unwrap) {
    return parsed;
  }

  var fragment = document.createDocumentFragment();

  var parent = parsed.firstChild;

  while (parent.firstChild) {
    fragment.appendChild(parent.firstChild);
  }

  return fragment;
}

function parseDocument(svg) {

  var parser;

  // parse
  parser = new DOMParser();
  parser.async = false;

  return parser.parseFromString(svg, 'text/xml');
}

/**
 * Create utility for SVG elements
 */

/**
 * Create a specific type from name or SVG markup.
 *
 * @param {String} name the name or markup of the element
 * @param {Object} [attrs] attributes to set on the element
 *
 * @returns {SVGElement}
 */
function create(name, attrs) {
  var element;

  if (name.charAt(0) === '<') {
    element = parse(name).firstChild;
    element = document.importNode(element, true);
  } else {
    element = document.createElementNS(ns.svg, name);
  }

  if (attrs) {
    attr(element, attrs);
  }

  return element;
}

/**
 * Events handling utility
 */

function on(node, event, listener, useCapture) {
  node.addEventListener(event, listener, useCapture);
}

function off(node, event, listener, useCapture) {
  node.removeEventListener(event, listener, useCapture);
}

/**
 * Geometry helpers
 */

// fake node used to instantiate svg geometry elements
var node = create('svg');

function extend(object, props) {
  var i,
      k,
      keys = Object.keys(props);

  for (i = 0; k = keys[i]; i++) {
    object[k] = props[k];
  }

  return object;
}

function createPoint(x, y) {
  var point = node.createSVGPoint();

  switch (arguments.length) {
    case 0:
      return point;
    case 2:
      x = {
        x: x,
        y: y
      };
      break;
  }

  return extend(point, x);
}

/**
 * Create matrix via args.
 *
 * @example
 *
 * createMatrix({ a: 1, b: 1 });
 * createMatrix();
 * createMatrix(1, 2, 0, 0, 30, 20);
 *
 * @return {SVGMatrix}
 */
function createMatrix(a, b, c, d, e, f) {
  var matrix = node.createSVGMatrix();

  switch (arguments.length) {
    case 0:
      return matrix;
    case 1:
      return extend(matrix, a);
    case 6:
      return extend(matrix, {
        a: a,
        b: b,
        c: c,
        d: d,
        e: e,
        f: f
      });
  }
}

function createTransform(matrix) {
  if (matrix) {
    return node.createSVGTransformFromMatrix(matrix);
  } else {
    return node.createSVGTransform();
  }
}

/**
 * Serialization util
 */

var TEXT_ENTITIES = /([&<>]{1})/g;
var ATTR_ENTITIES = /([\n\r"]{1})/g;

var ENTITY_REPLACEMENT = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '\''
};

function escape(str, pattern) {

  function replaceFn(match, entity) {
    return ENTITY_REPLACEMENT[entity] || entity;
  }

  return str.replace(pattern, replaceFn);
}

function serialize(node, output) {

  var i, len, attrMap, attrNode, childNodes;

  switch (node.nodeType) {
    // TEXT
    case 3:
      // replace special XML characters
      output.push(escape(node.textContent, TEXT_ENTITIES));
      break;

    // ELEMENT
    case 1:
      output.push('<', node.tagName);

      if (node.hasAttributes()) {
        attrMap = node.attributes;
        for (i = 0, len = attrMap.length; i < len; ++i) {
          attrNode = attrMap.item(i);
          output.push(' ', attrNode.name, '="', escape(attrNode.value, ATTR_ENTITIES), '"');
        }
      }

      if (node.hasChildNodes()) {
        output.push('>');
        childNodes = node.childNodes;
        for (i = 0, len = childNodes.length; i < len; ++i) {
          serialize(childNodes.item(i), output);
        }
        output.push('</', node.tagName, '>');
      } else {
        output.push('/>');
      }
      break;

    // COMMENT
    case 8:
      output.push('<!--', escape(node.nodeValue, TEXT_ENTITIES), '-->');
      break;

    // CDATA
    case 4:
      output.push('<![CDATA[', node.nodeValue, ']]>');
      break;

    default:
      throw new Error('unable to handle node ' + node.nodeType);
  }

  return output;
}

/**
 * innerHTML like functionality for SVG elements.
 * based on innerSVG (https://code.google.com/p/innersvg)
 */

function set(element, svg) {

  var parsed = parse(svg);

  // clear element contents
  clear(element);

  if (!svg) {
    return;
  }

  if (!isFragment(parsed)) {
    // extract <svg> from parsed document
    parsed = parsed.documentElement;
  }

  var nodes = slice(parsed.childNodes);

  // import + append each node
  for (var i = 0; i < nodes.length; i++) {
    appendTo(nodes[i], element);
  }
}

function get(element) {
  var child = element.firstChild,
      output = [];

  while (child) {
    serialize(child, output);
    child = child.nextSibling;
  }

  return output.join('');
}

function isFragment(node) {
  return node.nodeName === '#document-fragment';
}

function innerSVG(element, svg) {

  if (svg !== undefined) {

    try {
      set(element, svg);
    } catch (e) {
      throw new Error('error parsing SVG: ' + e.message);
    }

    return element;
  } else {
    return get(element);
  }
}

function slice(arr) {
  return Array.prototype.slice.call(arr);
}

/**
 * Selection utilities
 */

function select(node, selector) {
  return node.querySelector(selector);
}

function selectAll(node, selector) {
  var nodes = node.querySelectorAll(selector);

  return [].map.call(nodes, function (element) {
    return element;
  });
}

/**
 * prependTo utility
 */

/**
 * Prepend a node to a target element and return the prepended node.
 *
 * @param  {SVGElement} node
 * @param  {SVGElement} target
 *
 * @return {SVGElement} the prepended node
 */
function prependTo(node, target) {
  return target.insertBefore(ensureImported(node, target), target.firstChild || null);
}

/**
 * prepend utility
 */

/**
 * Prepend a node to a target element
 *
 * @param  {SVGElement} target
 * @param  {SVGElement} node
 *
 * @return {SVGElement} the target element
 */
function prepend(target, node) {
  prependTo(node, target);
  return target;
}

/**
 * Replace utility
 */

function replace(element, replacement) {
  element.parentNode.replaceChild(ensureImported(replacement, element), element);
  return replacement;
}

/**
 * transform accessor utility
 */

function wrapMatrix(transformList, transform) {
  if (transform instanceof SVGMatrix) {
    return transformList.createSVGTransformFromMatrix(transform);
  }

  return transform;
}

function setTransforms(transformList, transforms) {
  var i, t;

  transformList.clear();

  for (i = 0; t = transforms[i]; i++) {
    transformList.appendItem(wrapMatrix(transformList, t));
  }
}

/**
 * Get or set the transforms on the given node.
 *
 * @param {SVGElement} node
 * @param  {SVGTransform|SVGMatrix|Array<SVGTransform|SVGMatrix>} [transforms]
 *
 * @return {SVGTransform} the consolidated transform
 */
function transform(node, transforms) {
  var transformList = node.transform.baseVal;

  if (transforms) {

    if (!Array.isArray(transforms)) {
      transforms = [transforms];
    }

    setTransforms(transformList, transforms);
  }

  return transformList.consolidate();
}

exports.append = append;
exports.appendTo = appendTo;
exports.attr = attr;
exports.classes = classes;
exports.clear = clear;
exports.clone = clone;
exports.create = create;
exports.innerSVG = innerSVG;
exports.prepend = prepend;
exports.prependTo = prependTo;
exports.remove = remove;
exports.replace = replace;
exports.transform = transform;
exports.on = on;
exports.off = off;
exports.createPoint = createPoint;
exports.createMatrix = createMatrix;
exports.createTransform = createTransform;
exports.select = select;
exports.selectAll = selectAll;

},{}]},{},[4,1,2,3]);
