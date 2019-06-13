import { is, CPN_CONNECTION, CPN_TRANSITION } from "../../util/ModelUtil";

ChangeSupporter.$inject = [
  'eventBus',
  'modeling',
  'textRenderer',
  'elementRegistry',
  'stateProvider'
];

export default function ChangeSupporter(eventBus, modeling, textRenderer, elementRegistry, stateProvider) {
  // console.log('ChangeSupporter()');

  eventBus.on('model.update.tokens', function (event) {
    // console.log('ChangeSupporter(), model.update.tokens, event = ', event);

    if (event.data) {
      updateTokens(event.data);
    }
  });

  eventBus.on('model.check.ports', function (event) {
    // console.log('ChangeSupporter(), model.check.ports, event = ', event);

    checkPorts();
  });


  /**
   * Update tokens for places
   * @param {*} data - tokens data
   * Example:
   *    {"data":[{"id":"ID1412328424","tokens":8,"marking":"1`1++\n3`2++\n4`3"},
   *             {"id":"ID1412328454","tokens":0,"marking":"empty"}]}
   */
  function updateTokens(data) {

    const startTime = new Date().getTime();

    // console.log('ChangeSupporter(), updateTokens(), data = ', data);

    if (data && data.length > 0) {

      // Get list of id for elements with tokens
      const idList = [];
      for (var item of data) {
        //if (item.tokens > 0) {
        idList.push(item.id);
        //}
      }
      // console.log('ChangeSupporter(), updateTokens(), idList = ', idList);

      if (idList.length > 0) {

        // Get list of elements for array of id (index of array is id of elements, elementList[id] == element)
        const elementList = modeling.getElementsByCpnElementIds(idList);

        // console.log('ChangeSupporter(), updateTokens(), elementList = ', elementList, Object.keys(elementList).length);

        if (Object.keys(elementList).length > 0) {

          for (var item of data) {

            if (idList.includes(item.id)) {
              // console.log('ChangeSupporter(), updateTokens(), item = ', item);

              const element = elementList[item.id];
              // console.log('ChangeSupporter(), updateTokens(), element = ', element);

              if (element) {
                const tokenElement = modeling.getTokenLabelElement(element);
                // console.log('ChangeSupporter(), updateTokens(), tokenElement = ', tokenElement);

                const markingElement = modeling.getMarkingLabelElement(tokenElement);
                // console.log('ChangeSupporter(), updateTokens(), markingElement = ', markingElement);

                if (tokenElement && markingElement) {

                  // update token element
                  var tokens = parseInt(item.tokens);
                  if (tokens > 0) {
                    tokenElement.text = '' + tokens;
                    tokenElement.hidden = false;
                    updateElementSize(tokenElement);
                  } else {
                    tokenElement.hidden = true;
                  }

                  // update marking element
                  if (item.marking && item.marking != '' && item.marking != 'empty') {
                    markingElement.text = item.marking;
                    updateElementSize(markingElement);
                    markingElement.x = parseInt(markingElement.cpnElement._x) + Math.round(markingElement.labelTarget.x + markingElement.labelTarget.width * 3);
                    markingElement.y = parseInt(markingElement.cpnElement._y) + Math.round(markingElement.labelTarget.y);
                  } else {
                    markingElement.text = item.marking;
                    updateElementSize(markingElement);
                    tokenElement.hidden = true;
                  }

                }

                modeling.updateElement(element, true);
              }
            }
          }

        }

      }
    }

    const t = new Date().getTime() - startTime;
    console.log('END updateTokens(), time = ', t);
  }

  function updateElementSize(element) {
    // console.log('ChangeSupporter(), updateTokens(), updateElementSize(), element = ', element);

    var newBounds = textRenderer.getExternalLabelBounds(element, element.text);
    if (newBounds.width < 10)
      newBounds.width = 10;

    // console.log('ChangeSupporter(), updateTokens(), updateElementSize(), newBounds = ', newBounds);
    modeling.resizeShape(element, newBounds);
  }

  /**
   * Check ports for subst transitions
   */
  function checkPorts() {
    var elements = elementRegistry.filter(function (element) { return element; });

    const errors = {};
    for (const e of elements) {

      if (is(e, CPN_TRANSITION)) {
        if (e.cpnElement.subst) {
          var arcs = elementRegistry.filter(function (c) {
            return is(c, CPN_CONNECTION)
              && e.cpnElement._id === c.cpnElement.transend._idref
              && !e.cpnElement.subst._portsock.includes(c.cpnElement.placeend._idref);
          });
          for (const a of arcs) {
              errors[a.cpnElement._id] = 'Port not defined!';
          }
        }

      }

      // if (is(e, CPN_CONNECTION)) {
      //   errors[e.cpnElement._id] = 'Port not defined!';
      // }
    }
    stateProvider.setErrorState(errors, true);

    // modeling.updateConnections();
  }


}

