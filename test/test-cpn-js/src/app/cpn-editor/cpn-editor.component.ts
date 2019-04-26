import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import Diagram from 'diagram-js';

import CpnDiagramModule from '../cpn-js/core';


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
    // this.createTestDiagram2();

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
      height: 80
    });

    canvas.addShape(shape1, root);

    const shape2 = elementFactory.createShape({
      x: 290,
      y: 220,
      width: 100,
      height: 80
    });

    canvas.addShape(shape2, root);


    const connection1 = elementFactory.createConnection({
      waypoints: [
        this.getShapeCenter(shape1),
        this.getShapeCenter(shape2)
      ],
      source: shape1,
      target: shape2
    });

    canvas.addConnection(connection1, root);


    const shape3 = elementFactory.createShape({
      x: 450,
      y: 80,
      width: 100,
      height: 80
    });

    canvas.addShape(shape3, root);

    selection.select(shape3);

    this.updateConnections();
    // modeling.layoutConnection(connection1);
  }

  getShapeCenter(shape) {
    return {x: shape.x + shape.width / 2, y: shape.y + shape.height / 2};
  }


  createTestDiagram2() {
    console.log('createTestDiagram2()');

    const diagram = this.diagram;
    const canvas = diagram.get('canvas');
    const elementFactory = diagram.get('elementFactory');

    let rootShape, parentShape, childShape, childShape2, label, connection;

    rootShape = elementFactory.createRoot({
      id: 'root'
    });

    canvas.setRootElement(rootShape);

    parentShape = elementFactory.createShape({
      id: 'parent',
      x: 100, y: 100, width: 300, height: 300
    });

    canvas.addShape(parentShape, rootShape);

    childShape = elementFactory.createShape({
      id: 'child',
      x: 110, y: 110, width: 100, height: 100
    });

    canvas.addShape(childShape, parentShape);

    childShape2 = elementFactory.createShape({
      id: 'child2',
      x: 200, y: 110, width: 100, height: 100
    });

    canvas.addShape(childShape2, parentShape);

    label = elementFactory.createLabel({
      id: 'label1',
      x: 250, y: 110, width: 40, height: 40,
      hidden: true
    });

    canvas.addShape(label, parentShape);

    connection = elementFactory.createConnection({
      id: 'connection',
      waypoints: [{x: 150, y: 150}, {x: 150, y: 200}, {x: 350, y: 150}],
      source: childShape,
      target: childShape2
    });

    canvas.addConnection(connection, parentShape);

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
