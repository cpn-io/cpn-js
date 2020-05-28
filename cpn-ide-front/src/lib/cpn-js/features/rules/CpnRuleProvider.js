import inherits from "inherits";

import RuleProvider from "diagram-js/lib/features/rules/RuleProvider";

import {
  CPN_PLACE,
  CPN_TRANSITION,
  CPN_LABEL,
  CPN_CONNECTION,
  CPN_TOKEN_LABEL,
  CPN_MARKING_LABEL,
  is,
  isCpn,
  isAny,
} from "../../util/ModelUtil";

export default function CpnRuleProvider(eventBus, modeling) {
  RuleProvider.call(this, eventBus);

  this._modeling = modeling;
}

CpnRuleProvider.$inject = ["eventBus", "modeling"];

inherits(CpnRuleProvider, RuleProvider);

CpnRuleProvider.prototype.init = function () {
  const self = this;

  this.addRule("shape.create", function (context) {
    // console.log('RULE shape.create, context = ', context);
    if (!self._modeling.isEditable()) {
      return false;
    }

    return canCreate(context.target, context.shape);
  });

  this.addRule("shape.resize", function (context) {
    // console.log('RULE shape.resize, context = ', context);
    if (!self._modeling.isEditable()) {
      return false;
    }

    if (
      context.shape &&
      context.newBounds &&
      (is(context.shape, CPN_PLACE) || is(context.shape, CPN_TRANSITION))
    ) {
      // console.log('RULE shape.resize, shape = ', context.shape);
      // console.log('RULE shape.resize, shape = ', JSON.stringify(context.shape));
      // console.log('RULE shape.resize, newBounds = ', JSON.stringify(context.newBounds));

      context.newBounds.x =
        context.shape.x - (context.newBounds.width - context.shape.width) / 2;
      context.newBounds.y =
        context.shape.y - (context.newBounds.height - context.shape.height) / 2;
    }

    return canResize(context.shape);
  });

  this.addRule("connection.start", function (context) {
    // console.log('RULE connection.start, context = ', context);
    if (!self._modeling.isEditable()) {
      return false;
    }
    return self.canStartConnect(context.source);
  });

  this.addRule("connection.create", function (context) {
    // console.log('RULE connection.create, context = ', context);
    if (!self._modeling.isEditable()) {
      return false;
    }
    return self.canConnect(context.source, context.target);
  });

  this.addRule(
    [
      "connection.updateWaypoints",
      "connection.reconnectEnd",
      "connection.reconnectStart",
    ],
    function (context) {
      if (!self._modeling.isEditable()) {
        return false;
      }
      return true;
    }
  );

  this.addRule("elements.move", function (context) {
    // console.log('RULE elements.move, context = ', context);

    if (context.shapes) {
      const element = context.shapes[0];
      if (isAny(element, [CPN_TOKEN_LABEL, CPN_MARKING_LABEL])) {
        return true;
      }
    }

    if (!self._modeling.isEditable()) {
      return false;
    }

    return canAttach(context.target, context.shapes[0]);
  });

  this.addRule("element.copy", function (context) {
    console.log("RULE element.copy, context = ", context);
    return true;
  });
  this.addRule("element.paste", function (context) {
    console.log("RULE element.paste, context = ", context);
    return true;
  });
  this.addRule("elements.copy", function (context) {
    console.log("RULE elements.copy, context = ", context);
    return true;
  });
  this.addRule("elements.paste", function (context) {
    console.log("RULE elements.paste, context = ", context);
    return true;
  });
};

function canAttach(target, shape) {
  return is(shape, CPN_LABEL) || !isCpn(target);
  // return !isCpn(target);
}

function canCreate(target, shape) {
  return !isCpn(target);
}

CpnRuleProvider.prototype.canConnect = function (source, target) {
  if (!isAny(source, [CPN_PLACE, CPN_TRANSITION])) return false;
  if (!isAny(target, [CPN_PLACE, CPN_TRANSITION])) return false;

  return (
    (is(source, CPN_PLACE) && is(target, CPN_TRANSITION)) ||
    (is(target, CPN_PLACE) && is(source, CPN_TRANSITION))
  );
};

CpnRuleProvider.prototype.canStartConnect = function (source) {
  return is(source, CPN_PLACE) || is(source, CPN_TRANSITION);
};

function canResize(shape) {
  return (
    isCpn(shape) &&
    !is(shape, CPN_CONNECTION) &&
    !is(shape, CPN_LABEL) &&
    !is(shape, CPN_TOKEN_LABEL) &&
    !is(shape, CPN_MARKING_LABEL)
  );
}
