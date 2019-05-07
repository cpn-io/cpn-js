import inherits from 'inherits';

import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';

import {
  CPN_PLACE,
  CPN_TRANSITION,
  CPN_LABEL,
  CPN_CONNECTION,
  CPN_TOKEN_LABEL,
  CPN_MARKING_LABEL,
  is,
  isCpn
} from '../../util/ModelUtil';

export default function CpnRules(eventBus) {
  RuleProvider.call(this, eventBus);
}

CpnRules.$inject = ['eventBus'];

inherits(CpnRules, RuleProvider);

CpnRules.prototype.init = function () {

  const self = this;

  this.addRule('shape.create', function (context) {
    // console.log('RULE shape.create, context = ', context);
    return canCreate(context.target, context.shape);
  });

  this.addRule('shape.resize', function (context) {
    // console.log('RULE shape.resize, context = ', context);

    if (context.shape && context.newBounds &&
      (is(context.shape, CPN_PLACE) || is(context.shape, CPN_TRANSITION))) {
      // console.log('RULE shape.resize, shape = ', context.shape);
      // console.log('RULE shape.resize, shape = ', JSON.stringify(context.shape));
      // console.log('RULE shape.resize, newBounds = ', JSON.stringify(context.newBounds));

      context.newBounds.x = context.shape.x - (context.newBounds.width - context.shape.width) / 2;
      context.newBounds.y = context.shape.y - (context.newBounds.height - context.shape.height) / 2;
    }

    return canResize(context.shape);
  });

  this.addRule('connection.create', function (context) {
    console.log('RULE connection.create, context = ', context);
    return self.canConnect(context.source, context.target);
  });

  this.addRule('elements.move', function (context) {
    console.log('RULE elements.move, context = ', context);
    var shapes = context.shapes,
      target = context.target;
    return canAttach(target, shapes[0]);
  });
};

function canAttach(target, shape) {
  return is(shape, CPN_LABEL) || !isCpn(target);
}

function canCreate(target, shape) {
  return !isCpn(target);
}

CpnRules.prototype.canConnect = function(source, target) {
  return (
    is(source, CPN_PLACE) && is(target, CPN_TRANSITION) ||
    is(target, CPN_PLACE) && is(source, CPN_TRANSITION));
}

function canResize(shape) {
  return (
    isCpn(shape) &&
    !is(shape, CPN_CONNECTION) &&
    !is(shape, CPN_LABEL) &&
    !is(shape, CPN_TOKEN_LABEL) &&
    !is(shape, CPN_MARKING_LABEL)
  );
}
