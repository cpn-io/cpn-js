import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import Diagram from 'diagram-js';

import CpnDiagramModule from '../../lib/cpn-js/core';


@Component({
  selector: 'app-cpn-editor',
  templateUrl: './cpn-editor.component.html',
  styleUrls: ['./cpn-editor.component.scss']
})
export class CpnEditorComponent implements OnInit {

  @ViewChild('container') containerElementRef: ElementRef;

  diagram: Diagram;

  /**
   * Constructor
   */
  constructor() {
  }

  ngOnInit() {
    this.diagram = new Diagram({
      canvas: {
        container: this.containerElementRef.nativeElement
      },
      modules: [
        CpnDiagramModule,
      ]
    });

// get instances from diagram
    const diagram = this.diagram;
    const defaultRenderer = diagram.get('defaultRenderer');
    const styles = diagram.get('styles');

// override default stroke color
    defaultRenderer.CONNECTION_STYLE = styles.style(['no-fill'], {strokeWidth: 2, stroke: '#333'});
    defaultRenderer.SHAPE_STYLE = styles.style({fill: 'white', stroke: '#000', strokeWidth: 2});

    this.createTestDiagram1();

    this.updateConnections();
    // this.subscribeEvents();
  }

  createTestDiagram1() {
    console.log('createTestDiagram1()');

    const diagram = this.diagram;
    const canvas = diagram.get('canvas');
    const elementFactory = diagram.get('elementFactory');
    const selection = diagram.get('selection');
    const modeling = diagram.get('modeling');

// add root
    const root = elementFactory.createRoot();

    canvas.setRootElement(root);

// add shapes
    const shape1 = elementFactory.createShape({
      x: 150,
      y: 100,
      width: 100,
      height: 80,
      type: 'cpn:Place',
      name: 'P1'
    });
    canvas.addShape(shape1, root);

    // create P1 labels
    const label1 = elementFactory.createLabel({
      labelTarget: shape1,
      type: 'cpn:Label',
      name: 'initmark',
      text: 'initmark',
      x: shape1.x + shape1.width,
      y: shape1.y + shape1.height,
      width: 100,
      height: 20,
    });
    canvas.addShape(label1, shape1);



    const shape2 = elementFactory.createShape({
      x: 290,
      y: 220,
      width: 100,
      height: 80,
      type: 'cpn:Transition',
      name: 'T1'
    });

    canvas.addShape(shape2, root);


    const connection1 = elementFactory.createConnection({
      waypoints: [
        this.getShapeCenter(shape1),
        this.getShapeCenter(shape2)
      ],
      source: shape1,
      target: shape2,
      type: 'cpn:Connection',
    });

    canvas.addConnection(connection1, root);


    const shape3 = elementFactory.createShape({
      x: 450,
      y: 80,
      width: 100,
      height: 80,
      type: 'cpn:Place',
      name: 'P2'
    });

    canvas.addShape(shape3, root);

    selection.select(shape3);

    this.updateConnections();
    // modeling.layoutConnection(connection1);
  }

  getShapeCenter(shape) {
    return {x: shape.x + shape.width / 2, y: shape.y + shape.height / 2};
  }

  subscribeEvents() {
    const eventBus = this.diagram.get('eventBus');

    // eventBus.on('element.mouseup', (event) => {
    //   console.log('event = ', event);
    //   this.updateConnections();
    // });
    //
    // eventBus.on('shape.move', (event) => {
    //   console.log('event = ', event);
    //   this.updateConnections();
    // });
  }

  updateConnections() {
    const elementRegistry = this.diagram.get('elementRegistry');
    const commandStack = this.diagram.get('commandStack');

    const connections = elementRegistry.filter((e) => {
      return e.waypoints;
    });
    connections.forEach((connection) => {
      commandStack.execute('connection.layout', {
        connection,
        hints: {}
      });
    });
  }


}
