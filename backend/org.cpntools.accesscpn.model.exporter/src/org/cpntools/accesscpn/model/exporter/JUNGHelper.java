package org.cpntools.accesscpn.model.exporter;

import java.awt.Dimension;
import java.awt.geom.Point2D;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.collections15.Transformer;
import org.cpntools.accesscpn.model.Arc;
import org.cpntools.accesscpn.model.HLArcType;
import org.cpntools.accesscpn.model.Instance;
import org.cpntools.accesscpn.model.Node;
import org.cpntools.accesscpn.model.Page;
import org.cpntools.accesscpn.model.ParameterAssignment;
import org.cpntools.accesscpn.model.exporter.DOMGenerator.Position;

import edu.uci.ics.jung.algorithms.layout.Layout;
import edu.uci.ics.jung.algorithms.layout.SpringLayout;
import edu.uci.ics.jung.algorithms.util.IterativeContext;
import edu.uci.ics.jung.graph.DirectedGraph;
import edu.uci.ics.jung.graph.DirectedSparseMultigraph;

public class JUNGHelper {

	public static Map<org.cpntools.accesscpn.model.Object, Position> createGraph(final Page p) {
		final DirectedGraph<Node, Object> graph = new DirectedSparseMultigraph<Node, Object>();
		final Map<String, Node> nodes = new HashMap<String, Node>();
		for (final org.cpntools.accesscpn.model.Object o : p.getObject()) {
			if (o instanceof Node) {
				final Node n = (Node) o;
				nodes.put(n.getId(), n);
				graph.addVertex(n);
			}
		}

		for (final Arc a : p.getArc()) {
			graph.addEdge(a.getId(), a.getSource(), a.getTarget());
			if (a.getKind() == HLArcType.TEST) {
				graph.addEdge("reverse" + a.getId(), a.getTarget(), a.getSource());
			}
		}
		for (final Instance i : p.instance()) {
			for (final ParameterAssignment pa : i.getParameterAssignment()) {
				graph.addEdge(i.getId() + "->" + pa.getParameter(), nodes.get(pa.getParameter()), i);
				graph.addEdge(i.getId() + "<-" + pa.getParameter(), i, nodes.get(pa.getParameter()));
			}
		}

		final Layout<Node, Object> layout = new SpringLayout<Node, Object>(graph, new Transformer<Object, Integer>() {
			@Override
			public Integer transform(final Object arg0) {
				return 150;
			}
		});
		layout.initialize();
		layout.setSize(new Dimension(1000, 800));
		if (layout instanceof IterativeContext) {
			final IterativeContext c = (IterativeContext) layout;
			int i = 0;
			while (!c.done() && i++ < 2500) {
				c.step();
			}
		}
		final Map<org.cpntools.accesscpn.model.Object, Position> positions = new HashMap<org.cpntools.accesscpn.model.Object, DOMGenerator.Position>();
		for (final org.cpntools.accesscpn.model.Object o : p.getObject()) {
			if (o instanceof Node) {
				final Point2D point2d = layout.transform((Node) o);
				positions.put(o, new Position(point2d.getX(), point2d.getY()));
			}
		}
		return positions;
	}

}
