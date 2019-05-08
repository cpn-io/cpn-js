import inherits from 'inherits';

import OrderingProvider from 'diagram-js/lib/features/ordering/OrderingProvider';

import {
  findIndex,
  find
} from 'min-dash';
import { is, CPN_CONNECTION, CPN_PLACE, CPN_TRANSITION, CPN_LABEL, CPN_TOKEN_LABEL, CPN_MARKING_LABEL, CPN_TEXT_ANNOTATION, isAny } from '../../util/ModelUtil';


/**
 * a simple ordering provider that makes sure:
 *
 * (0) labels are rendered always on top
 * (1) elements are ordered by a {level} property
 */
export default function CpnOrderingProvider(eventBus, canvas, translate) {

  OrderingProvider.call(this, eventBus);

  var orders = [
    { type: CPN_CONNECTION, order: { level: 6 } },
    { type: CPN_PLACE, order: { level: 7 } },
    { type: CPN_TRANSITION, order: { level: 7 } },
    { type: CPN_TEXT_ANNOTATION, order: { level: 7 } },
    { type: CPN_LABEL, order: { level: 8 } },
    { type: CPN_TOKEN_LABEL, order: { level: 9 } },
    { type: CPN_MARKING_LABEL, order: { level: 10 } },
    { type: CPN_MARKING_LABEL, order: { level: 10 } },
  ];

  function computeOrder(element) {
    // if (element.labelTarget) {
    //   return { level: 10 };
    // }
    var entry = find(orders, function (o) {
      return isAny(element, [o.type]);
    });
    return entry && entry.order || { level: 1 };
  }

  function getOrder(element) {
    var order = element.order;
    if (!order) {
      element.order = order = computeOrder(element);
    }
    return order;
  }

  this.getOrdering = function (element, newParent) {
    console.log('CpnOrderingProvider().this.getOrdering(), element, newParent = ', element, newParent);

    var rootOrdering = {
      parent: canvas.getRootElement(),
      index: -1
    };

    // render labels always on top
    // if (element.labelTarget) {
    //   return {
    //     parent: canvas.getRootElement(),
    //     index: -1
    //   };
    // }

    var elementOrder = getOrder(element);

    // if (elementOrder.containers) {
    //   newParent = findActualParent(element, newParent, elementOrder.containers);
    // }

    // // var currentIndex = newParent.children.indexOf(element);

    // var insertIndex = findIndex(newParent.children, function (child) {
    //   // do not compare with labels, they are created
    //   // in the wrong order (right after elements) during import and
    //   // mess up the positioning.
    //   if (!element.labelTarget && child.labelTarget) {
    //     return false;
    //   }

    //   return elementOrder.level < getOrder(child).level;
    // });

    const insertIndex = elementOrder.level;
    const result = {
      index: insertIndex,
      parent: newParent
    };

    console.log('CpnOrderingProvider().this.getOrdering(), result = ', result);

    return result;
  };
}

CpnOrderingProvider.$inject = ['eventBus', 'canvas', 'translate'];

inherits(CpnOrderingProvider, OrderingProvider);
