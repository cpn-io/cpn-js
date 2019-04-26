import inherits from 'inherits';

import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';

export default function CpnRules(eventBus) {
  RuleProvider.call(this, eventBus);
}

CpnRules.$inject = ['eventBus'];

inherits(CpnRules, RuleProvider);

CpnRules.prototype.init = function () {

  this.addRule('shape.create', function (context) {
    console.log('RULE shape.create, context = ', context)
    return canCreate(context.target, context.shape);
  });

  this.addRule('shape.resize', function (context) {
    console.log('RULE shape.resize, context = ', context)
    return canResize(context.shape);
  });


  this.addRule('connection.create', function (context) {
    console.log('RULE connection.create, context = ', context)
    return canConnect(context.source, context.target);
  });

};

function canCreate(target, shape) {
  return (target && target.constructor.name === 'Root');
}

function canConnect(source, target) {
  return (source.constructor.name === 'Shape' && target.constructor.name === 'Shape');
}

function canResize(shape) {
  return (shape.constructor.name !== 'Connection');
}
