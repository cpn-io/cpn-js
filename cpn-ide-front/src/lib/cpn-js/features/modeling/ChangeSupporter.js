
ChangeSupporter.$inject = [
  'eventBus',
  'modeling',
  'textRenderer'
];

export default function ChangeSupporter(eventBus, modeling, textRenderer) {
  console.log('ChangeSupporter()');

  eventBus.on('model.update.tokens', function (event) {
    console.log('ChangeSupporter(), model.update.tokens, event = ', event);

    if (event.data)
      updateTokens(event.data);
  });


  function updateTokens(data) {
    // 0:
    // id: "ID1412328424"
    // marking: "1`1++↵3`2++↵4`3"
    // tokens: "8"
    // __proto__: Object
    // 1:
    // id: "ID1412328454"
    // marking: "empty"
    // tokens: "0"

    if (data && data.length > 0) {
      for (var item of data) {
        console.log('ChangeSupporter(), updateTokens(), item = ', item);

        if (item.id) {

          const element = modeling.getElementByCpnElementId(item.id);
          console.log('ChangeSupporter(), updateTokens(), element = ', element);

          if (element) {
            const tokenElement = modeling.getTokenLabelElement(element);
            console.log('ChangeSupporter(), updateTokens(), tokenElement = ', tokenElement);

            const markingElement = modeling.getMarkingLabelElement(tokenElement);
            console.log('ChangeSupporter(), updateTokens(), markingElement = ', markingElement);

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

            modeling.updateElement(element);
          }
        }
      }
    }
  }

  function updateElementSize(element) {
    console.log('ChangeSupporter(), updateTokens(), updateElementSize(), element = ', element);
    var newBounds = textRenderer.getExternalLabelBounds(element, element.text);
    if (newBounds.width < 10)
      newBounds.width = 10;
    console.log('ChangeSupporter(), updateTokens(), updateElementSize(), newBounds = ', newBounds);
    modeling.resizeShape(element, newBounds);
  }

}

