import inherits from 'inherits';

import OrderingProvider from 'diagram-js/lib/features/ordering/OrderingProvider';

import {
  is,
  isAny,
  CPN_PLACE,
  CPN_TRANSITION,
  CPN_CONNECTION,
  CPN_TOKEN_LABEL,
  CPN_MARKING_LABEL,
  CPN_LABEL
} from '../../util/ModelUtil';

import {
  findIndex,
  find
} from 'min-dash';

/**
 * A simple ordering provider that makes sure:
 *
 * (0) labels are rendered always on top
 * (1) elements are ordered by a {level} property
 */
export default function CpnOrderingProvider(eventBus, canvas, translate) {

  OrderingProvider.call(this, eventBus);

  var orders = [
    { type: CPN_PLACE, order: { level: 1 } },
    { type: CPN_TRANSITION, order: { level: 1 } },
    { type: CPN_CONNECTION, order: { level: 1 } },
    { type: CPN_LABEL, order: { level: 10 } },
    { type: CPN_TOKEN_LABEL, order: { level: 20 } },
    { type: CPN_MARKING_LABEL, order: { level: 30 } },
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

  function findActualParent(element, newParent) {

    var actualParent = newParent;

    while (actualParent) {
      actualParent = actualParent.parent;
    }

    if (!actualParent) {
      throw new Error(translate('no parent for {element} in {parent}', {
        element: element.id,
        parent: newParent.id
      }));
    }

    return actualParent;
  }

  this.getOrdering = function (element, newParent) {

    var rootOrdering = {
      parent: canvas.getRootElement(),
      index: -1
    };

    // --------------------------------------------------------

    // render labels always on top
    if (element.labelTarget) {
      return rootOrdering;
    }

    var elementOrder = getOrder(element);

    // newParent = findActualParent(element, newParent);

    var currentIndex = newParent.children.indexOf(element);

    var insertIndex = findIndex(newParent.children, function (child) {

      // do not compare with labels, they are created
      // in the wrong order (right after elements) during import and
      // mess up the positioning.
      if (!element.labelTarget && child.labelTarget) {
        return false;
      }

      return elementOrder.level < getOrder(child).level;
    });


    // if the element is already in the child list at
    // a smaller index, we need to adjust the inser index.
    // this takes into account that the element is being removed
    // before being re-inserted
    if (insertIndex !== -1) {
      if (currentIndex !== -1 && currentIndex < insertIndex) {
        insertIndex -= 1;
      }
    }

    return {
      index: insertIndex,
      parent: newParent
    };
  };
}

CpnOrderingProvider.$inject = ['eventBus', 'canvas', 'translate'];

inherits(CpnOrderingProvider, OrderingProvider);
