import inherits from 'inherits';

import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';

import {is} from '../../util/ModelUtil';

export default function CpnRules(eventBus) {
  RuleProvider.call(this, eventBus);
}

CpnRules.$inject = ['eventBus'];

inherits(CpnRules, RuleProvider);

CpnRules.prototype.init = function () {

  this.addRule('shape.create', function (context) {
    console.log('RULE shape.create, context = ', context);
    return canCreate(context.target, context.shape);
  });

  this.addRule('shape.resize', function (context) {
    console.log('RULE shape.resize, context = ', context);

    if (context.shape && context.newBounds && is(context.shape, 'cpn:Place')) {
      console.log('RULE shape.resize, shape = ', context.shape);
      console.log('RULE shape.resize, shape = ', JSON.stringify(context.shape));
      console.log('RULE shape.resize, newBounds = ', JSON.stringify(context.newBounds));

      context.newBounds.x = context.shape.x - (context.newBounds.width - context.shape.width) / 2;
      context.newBounds.y = context.shape.y - (context.newBounds.height - context.shape.height) / 2;
      // context.shape.width += context.delta.x * 2;
      // context.shape.height += context.delta.y * 2;
    }

    return canResize(context.shape);
  });


  this.addRule('connection.create', function (context) {
    console.log('RULE connection.create, context = ', context);
    return canConnect(context.source, context.target);
  });

  this.addRule('shape.create', function (context) {
    console.log('RULE shape.create, context = ', context);
    return false;
  });

  this.addRule('shape.replace', function (context) {
    console.log('RULE shape.replace, context = ', context);
    return false;
  });

  // this.addRule('shape.attach', function (context) {
  //   console.log('RULE shape.attach, context = ', context)
  //   return false;
  // });

  // this.addRule('shape.autoResize', function (context) {
  //   console.log('RULE shape.autoResize, context = ', context)
  //   return false;
  // });


  // this.addRule('element.paste', function (context) {
  //   console.log('RULE element.paste, context = ', context)
  //   return false;
  // });

  // this.addRule('element.move', function (context) {
  //   console.log('RULE element.move, context = ', context)
  //   return false;
  // });
  //
  this.addRule('elements.move', function (context) {
    console.log('RULE elements.move, context = ', context);

    var shapes = context.shapes,
      target = context.target;
    //
    // if (shapes.length === 1 && shapes[0].id === 'attacher' && target) {
    //
    //   if (target.id === 'host' || target.id === 'host2') {
    //     return 'attach';
    //   } else if (target.id === 'parent') {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
    //
    // if (shapes.length === 1 && shapes[0].id === 'attacher2') {
    //   return false;
    // }

    return canAttach(target, shapes[0]);
  });
};

function canAttach(target, shape) {
  return is(shape, 'cpn:Label') || (target && target.constructor.name === 'Root');
  // return (target && target.constructor.name === 'Root');
}

function canCreate(target, shape) {
  return (target && target.constructor.name === 'Root');
}

function canConnect(source, target) {
  return (source.constructor.name === 'Shape' && target.constructor.name === 'Shape');
}

function canResize(shape) {
  return (is(shape, 'cpn:Place') ||
    is(shape, 'cpn:Transition') ||
    is(shape, 'cpn:Label'));
}
