/************************************************************************/
/* Access/CPN */
/* Copyright 2010-2011 AIS Group, Eindhoven University of Technology */
/*                                                                      */
/* This library is free software; you can redistribute it and/or */
/* modify it under the terms of the GNU Lesser General Public */
/* License as published by the Free Software Foundation; either */
/* version 2.1 of the License, or (at your option) any later version. */
/*                                                                      */
/* This library is distributed in the hope that it will be useful, */
/* but WITHOUT ANY WARRANTY; without even the implied warranty of */
/* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU */
/* Lesser General Public License for more details. */
/*                                                                      */
/* You should have received a copy of the GNU Lesser General Public */
/* License along with this library; if not, write to the Free Software */
/* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, */
/* MA 02110-1301 USA */
/************************************************************************/
package org.cpntools.accesscpn.model.exporter;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.naming.OperationNotSupportedException;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.cpntools.accesscpn.engine.highlevel.instance.InstanceFactory;
import org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelData;
import org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelDataAdapterFactory;
import org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelInstance;
import org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelInstanceAdapterFactory;
import org.cpntools.accesscpn.model.Annotation;
import org.cpntools.accesscpn.model.Arc;
import org.cpntools.accesscpn.model.FusionGroup;
import org.cpntools.accesscpn.model.HLArcType;
import org.cpntools.accesscpn.model.HLDeclaration;
import org.cpntools.accesscpn.model.HasName;
import org.cpntools.accesscpn.model.Instance;
import org.cpntools.accesscpn.model.ModelFactory;
import org.cpntools.accesscpn.model.Name;
import org.cpntools.accesscpn.model.Node;
import org.cpntools.accesscpn.model.Object;
import org.cpntools.accesscpn.model.Page;
import org.cpntools.accesscpn.model.ParameterAssignment;
import org.cpntools.accesscpn.model.PetriNet;
import org.cpntools.accesscpn.model.Place;
import org.cpntools.accesscpn.model.PlaceNode;
import org.cpntools.accesscpn.model.RefPlace;
import org.cpntools.accesscpn.model.RefTrans;
import org.cpntools.accesscpn.model.TimeType;
import org.cpntools.accesscpn.model.Transition;
import org.cpntools.accesscpn.model.auxgraphics.AuxGraphics;
import org.cpntools.accesscpn.model.auxgraphics.Text;
import org.cpntools.accesscpn.model.cpntypes.CPNAlias;
import org.cpntools.accesscpn.model.cpntypes.CPNBool;
import org.cpntools.accesscpn.model.cpntypes.CPNEnum;
import org.cpntools.accesscpn.model.cpntypes.CPNIndex;
import org.cpntools.accesscpn.model.cpntypes.CPNInt;
import org.cpntools.accesscpn.model.cpntypes.CPNIntInf;
import org.cpntools.accesscpn.model.cpntypes.CPNList;
import org.cpntools.accesscpn.model.cpntypes.CPNProduct;
import org.cpntools.accesscpn.model.cpntypes.CPNReal;
import org.cpntools.accesscpn.model.cpntypes.CPNRecord;
import org.cpntools.accesscpn.model.cpntypes.CPNString;
import org.cpntools.accesscpn.model.cpntypes.CPNSubset;
import org.cpntools.accesscpn.model.cpntypes.CPNTime;
import org.cpntools.accesscpn.model.cpntypes.CPNType;
import org.cpntools.accesscpn.model.cpntypes.CPNUnion;
import org.cpntools.accesscpn.model.cpntypes.CPNUnit;
import org.cpntools.accesscpn.model.cpntypes.NameTypePair;
import org.cpntools.accesscpn.model.declaration.DeclarationStructure;
import org.cpntools.accesscpn.model.declaration.GlobalReferenceDeclaration;
import org.cpntools.accesscpn.model.declaration.MLDeclaration;
import org.cpntools.accesscpn.model.declaration.TypeDeclaration;
import org.cpntools.accesscpn.model.declaration.UseDeclaration;
import org.cpntools.accesscpn.model.declaration.VariableDeclaration;
import org.cpntools.accesscpn.model.graphics.Coordinate;
import org.cpntools.accesscpn.model.graphics.Fill;
import org.cpntools.accesscpn.model.graphics.GraphicsFactory;
import org.cpntools.accesscpn.model.graphics.Line;
import org.cpntools.accesscpn.model.graphics.NodeGraphics;
import org.cpntools.accesscpn.model.importer.DOMParser;
import org.cpntools.accesscpn.model.importer.DeclarationParser;
import org.cpntools.accesscpn.model.monitors.Monitor;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

/**
 * @author michael
 */
public class DOMGenerator {
	private static final String subPageInfo = "subpageinfo";
	private static final String subst = "subst";

	/**
	 * @param petriNet
	 * @return
	 * @throws ParserConfigurationException
	 * @throws OperationNotSupportedException
	 */
	public static Document export(final PetriNet petriNet) throws ParserConfigurationException,
	        OperationNotSupportedException {
		final ModelData modelData = (ModelData) ModelDataAdapterFactory.getInstance().adapt(petriNet, ModelData.class);
		final DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
		documentBuilderFactory.setNamespaceAware(false);
		final DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();
		final Document document = documentBuilder.newDocument();
		final Element rootTreeNode = document.createElement(DOMParser.workspaceElementsNode);
		document.appendChild(rootTreeNode);
		final Element generatorNode = document.createElement(DOMParser.generatorNode);
		generatorNode.setAttribute("tool", "Access/CPN");
		generatorNode.setAttribute("version", "1.0.0");
		generatorNode.setAttribute("format", "6");
		rootTreeNode.appendChild(generatorNode);
		final Element cpnet = document.createElement(DOMParser.cpnetNode);
		rootTreeNode.appendChild(cpnet);
		exportDeclarations(document, cpnet, petriNet);
		exportPages(document, cpnet, petriNet, modelData);
		exportFusionGroups(document, cpnet, petriNet);
		final Map<org.cpntools.accesscpn.engine.highlevel.instance.Instance<Page>, String> instances = exportInstances(
		        document, cpnet, petriNet);
		exportMonitors(document, cpnet, petriNet, instances);
		exportOptions(document, cpnet, petriNet);
		return document;
	}

	private static Map<org.cpntools.accesscpn.engine.highlevel.instance.Instance<Page>, String> exportInstances(
	        final Document document, final Element cpnet, final PetriNet petriNet) {
		final Map<org.cpntools.accesscpn.engine.highlevel.instance.Instance<Page>, String> result = new HashMap<org.cpntools.accesscpn.engine.highlevel.instance.Instance<Page>, String>();
		final Map<Instance, Character> chars = new HashMap<Instance, Character>();
		final Element instances = document.createElement("instances");
		cpnet.appendChild(instances);
		final ModelInstance modelInstance = (ModelInstance) ModelInstanceAdapterFactory.getInstance().adapt(petriNet,
		        ModelInstance.class);
		for (final Page page : modelInstance.getTopPages()) {
			for (final org.cpntools.accesscpn.engine.highlevel.instance.Instance<Page> pi : modelInstance
			        .getAllInstances(page)) {
				final Element instance = document.createElement("instance");
				instance.setAttribute("page", page.getId());
				instance.setAttribute("id", page.getId() + "itop");
				instances.appendChild(instance);
				result.put(pi, page.getId() + "itop");
				for (final org.cpntools.accesscpn.engine.highlevel.instance.Instance<Page> spi : modelInstance
				        .getAllSubpages(pi)) {
					processChildren(document, instance, spi, chars, result, modelInstance);
				}
			}
		}
		return result;
	}

	private static void processChildren(final Document document, final Element parent,
	        final org.cpntools.accesscpn.engine.highlevel.instance.Instance<Page> spi,
	        final Map<Instance, Character> chars,
	        final Map<org.cpntools.accesscpn.engine.highlevel.instance.Instance<Page>, String> result,
	        final ModelInstance modelInstance) {
		final Element instance = document.createElement("instance");
		final Instance inst = spi.getTransitionPath().getNode();
		instance.setAttribute("trans", inst.getId());
		Character c = chars.get(inst);
		if (c == null) {
			c = 'a';
		}
		instance.setAttribute("id", inst.getId() + "i" + c);
		parent.appendChild(instance);
		result.put(spi, inst.getId() + "i" + c);
		chars.put(inst, c++);
		for (final org.cpntools.accesscpn.engine.highlevel.instance.Instance<Page> sspi : modelInstance
		        .getAllSubpages(spi)) {
			processChildren(document, instance, sspi, chars, result, modelInstance);
		}
	}

	private static void exportMonitors(final Document document, final Element cpnet, final PetriNet petriNet,
	        final Map<org.cpntools.accesscpn.engine.highlevel.instance.Instance<Page>, String> instances) {
		final Element monitors = document.createElement("monitorblock");
		monitors.setAttribute("name", "Monitors");
		cpnet.appendChild(monitors);
		final ModelInstance modelInstance = (ModelInstance) ModelInstanceAdapterFactory.getInstance().adapt(petriNet,
		        ModelInstance.class);
		for (final Monitor m : petriNet.getMonitors()) {
			exportMonitor(document, monitors, m, instances, modelInstance);
		}

	}

	@SuppressWarnings("unchecked")
	private static void exportMonitor(final Document document, final Element monitors, final Monitor m,
	        final Map<org.cpntools.accesscpn.engine.highlevel.instance.Instance<Page>, String> instances,
	        final ModelInstance modelInstance) {
		final Element monitor = document.createElement("monitor");
		monitor.setAttribute("id", m.getId());
		monitor.setAttribute("name", m.getName().getText());
		monitor.setAttribute("type", "" + m.getKind().getValue());
		monitor.setAttribute("disabled", "" + m.isDisabled());
		monitors.appendChild(monitor);
		for (final java.lang.Object n : m.getNodes()) {
			final org.cpntools.accesscpn.engine.highlevel.instance.Instance<Node> i = (org.cpntools.accesscpn.engine.highlevel.instance.Instance<Node>) n;
			final Element node = document.createElement("node");
			node.setAttribute("idref", i.getNode().getId());
			// TODO: here is something wrong as we cannot export an imported monitor
			if (i.getTransitionPath() != null) {
				final String subPageID = i.getTransitionPath().getNode().getSubPageID();
				final Page page = modelInstance.getModelData().getPage(subPageID);
				final org.cpntools.accesscpn.engine.highlevel.instance.Instance<Page> pageInstance = InstanceFactory.INSTANCE
				        .createInstance(page, i.getTransitionPath());
				node.setAttribute("pageinstanceidref", instances.get(pageInstance));
			} else {
				// TODO: this is a hack just to make it work
				final String id = i.getNode().getPage().getId() + "itop";
				node.setAttribute("pageinstanceidref", id);
			}
			monitor.appendChild(node);
		}
		// TODO: this does not work for write in file
		// TODO: for write in file and data collector the ordering is different
		if (m.getKind().getValue() == 4) {
			exportDeclaration(document, m, monitor, m.getInit(), "Init", "a");
		}
		exportDeclaration(document, m, monitor, m.getPredicate(), "Predicate", "c");
		exportDeclaration(document, m, monitor, m.getObserver(), "Observer", "d");
		if (m.getKind().getValue() != 4) {
			exportDeclaration(document, m, monitor, m.getInit(), "Init function", "a");
		}
		exportDeclaration(document, m, monitor, m.getStop(), "Stop", "b");
		exportDeclaration(document, m, monitor, m.getAction(), "Action", "e");
		exportOption(document, monitor, m.isDisabled(), "Disabled");
		exportOption(document, monitor, m.isTimed(), "Timed");
		exportOption(document, monitor, m.isLogging(), "Logging");
		if (m.getKind().getValue() == 4) {
			exportOption(document, monitor, m.getExtension(), "File extension");
		}
	}

	private static void exportOption(final Document document, final Element monitor, final boolean value,
	        final String name) {
		final Element option = document.createElement("option");
		option.setAttribute("name", name);
		option.setAttribute("value", "" + value);
		monitor.appendChild(option);
	}

	private static void exportOption(final Document document, final Element monitor, final String value,
	        final String name) {
		final Element option = document.createElement("option");
		option.setAttribute("name", name);
		option.setAttribute("value", "" + value);
		monitor.appendChild(option);
	}

	private static void exportDeclaration(final Document document, final Monitor m, final Element monitor,
	        final MLDeclaration decl, final String name, final String id) {
		if (decl != null) {
			final Element declaration = document.createElement("declaration");
			declaration.setAttribute("name", name);
			monitor.appendChild(declaration);
			final Element ml = document.createElement("ml");
			ml.setAttribute("id", m.getId() + id);
			declaration.appendChild(ml);
			ml.setTextContent(decl.getCode());
		}
	}

	private static void exportOptions(final Document document, final Element cpnet, final PetriNet petriNet) {
		final Element options = document.createElement("options");
		cpnet.appendChild(options);
		final Element option = document.createElement("option");
		option.setAttribute("name", "realtimestamp");
		options.appendChild(option);
		final Element value = document.createElement("value");
		option.appendChild(value);
		final Element bool = document.createElement("boolean");
		bool.setTextContent("" + (petriNet.getTimeType() == TimeType.REAL));
		value.appendChild(bool);
		
	}

	/**
	 * @param petriNet
	 * @param output
	 * @return
	 * @throws TransformerException
	 * @throws ParserConfigurationException
	 * @throws OperationNotSupportedException
	 */
	public static Document export(final PetriNet petriNet, final OutputStream output) throws TransformerException,
	        ParserConfigurationException, OperationNotSupportedException {
		final Document result = export(petriNet);
		final PrintWriter out = new PrintWriter(output);
		final TransformerFactory transformerFactory = TransformerFactory.newInstance();
		final Transformer transformer = transformerFactory.newTransformer();
		transformer.setOutputProperty(OutputKeys.ENCODING, "iso-8859-1");
		transformer.setOutputProperty(OutputKeys.INDENT, "yes");

		final StreamResult streamResult = new StreamResult(out);

		transformer.transform(new DOMSource(result), streamResult);
		out.flush();
		return result;
	}

	/**
	 * @param petriNet
	 * @param fileName
	 * @return
	 * @throws FileNotFoundException
	 * @throws TransformerException
	 * @throws ParserConfigurationException
	 * @throws OperationNotSupportedException
	 */
	public static Document export(final PetriNet petriNet, final String fileName) throws FileNotFoundException,
	        TransformerException, ParserConfigurationException, OperationNotSupportedException {
		return export(petriNet, new FileOutputStream(fileName, false));
	}

	static class Position {
		private final int a;
		private final int b;

		Position(final int a, final int b) {
			this.a = a;
			this.b = b;
		}

		public Position(final double x, final double y) {
			a = (int) x;
			b = (int) y;
		}

		public int getB() {
			return b;
		}

		public int getA() {
			return a;
		}
	}

	private static void exportArc(final Document document, final Element pageNode, final Arc a,
	        final Map<org.cpntools.accesscpn.model.Object, Position> positions) {
		final Element arc = document.createElement(DOMParser.arcNode);
		arc.setAttribute("id", a.getId());
		if (a.getKind() == HLArcType.TEST) {
			arc.setAttribute("orientation", "BOTHDIR");
		} else if (a.getSource() == a.getPlaceNode()) {
			arc.setAttribute("orientation", "PtoT");
		} else {
			arc.setAttribute("orientation", "TtoP");
		}
		arc.setAttribute("order", "1");
		pageNode.appendChild(arc);
		final Element transend = document.createElement(DOMParser.transendNode);
		transend.setAttribute("idref", a.getOtherEnd(a.getPlaceNode()).getId());
		arc.appendChild(transend);
		final Element placeend = document.createElement(DOMParser.placeendNode);
		placeend.setAttribute("idref", a.getPlaceNode().getId());
		arc.appendChild(placeend);
		final Position source = positions.get(a.getSource());
		final Position destination = positions.get(a.getTarget());

		final Element lineattr = document.createElement("lineattr");
		try {
			final Line line = a.getArcGraphics().getLine();
			lineattr.setAttribute("colour", line.getColor());
			lineattr.setAttribute("thick", "" + Math.round(line.getWidth()));
		} catch (final Exception ex){
			lineattr.setAttribute("colour", "Black");
			lineattr.setAttribute("thick", "1");
		}
		lineattr.setAttribute("type", "Solid");
		arc.appendChild(lineattr);

		try {
			int i = 1;
			for (final Coordinate c : a.getArcGraphics().getPosition()) {
				final Element bendpoint = document.createElement("bendpoint");
				bendpoint.setAttribute("serial", "" + i++);
				final Element posattr = document.createElement("posattr");
				bendpoint.appendChild(posattr);
				posattr.setAttribute("x", "" + c.getX());
				posattr.setAttribute("y", "" + c.getY());
				arc.appendChild(bendpoint);
			}
		} catch (final Exception ex) {

		}

		Coordinate position;
		try {
			position = a.getHlinscription().getAnnotationGraphics().getOffset();
		} catch (final Exception ex) {
			position = GraphicsFactory.INSTANCE.createCoordinate();
			position.setX((source.getA() + destination.getA()) / 2.0);
			position.setY((source.getB() + destination.getB()) / 2.0);
		}

		exportLabel(document, arc, a.getHlinscription(), DOMParser.annotNode, a.getId() + "a", position.getX(),
		        position.getY());
	}

	private static void exportCPNType(final Document document, final Element color, final CPNAlias type) {
		final Element alias = document.createElement(DeclarationParser.aliasNode);
		color.appendChild(alias);
		final Element id = document.createElement(DeclarationParser.idNode);
		id.setTextContent(type.getSort());
		alias.appendChild(id);
	}

	private static void exportCPNType(final Document document, final Element color, final CPNBool type)
	        throws OperationNotSupportedException {
		final Element bool = document.createElement(DeclarationParser.boolNode);
		color.appendChild(bool);
		if (type.getTrueValue() != null || type.getFalseValue() != null) throw new OperationNotSupportedException();
	}

	private static void exportCPNType(final Document document, final Element color, final CPNEnum type) {
		final Element enumNode = document.createElement(DeclarationParser.enumNode);
		color.appendChild(enumNode);
		for (final String value : type.getValues()) {
			final Element id = document.createElement(DeclarationParser.idNode);
			id.setTextContent(value);
			enumNode.appendChild(id);
		}
	}

	private static void exportCPNType(final Document document, final Element color, final CPNIndex type) {
		final Element index = document.createElement(DeclarationParser.indexNode);
		final Element id = document.createElement(DeclarationParser.idNode);
		id.setTextContent(type.getName());
		index.appendChild(id);
		final Element low = document.createElement(DeclarationParser.mlNode);
		low.setTextContent(type.getLow());
		index.appendChild(low);
		final Element high = document.createElement(DeclarationParser.mlNode);
		high.setTextContent(type.getHigh());
		index.appendChild(high);
		color.appendChild(index);
	}

	private static void exportCPNType(final Document document, final Element color, final CPNInt type)
	        throws OperationNotSupportedException {
		final Element intNode = document.createElement(DeclarationParser.intNode);
		color.appendChild(intNode);
		if (type.getHigh() != null && type.getLow() != null) {
			final Element withNode = document.createElement(DeclarationParser.withNode);
			
			final Element lowNode = document.createElement(DeclarationParser.mlNode);
			lowNode.setTextContent(type.getLow());
			withNode.appendChild(lowNode);
			final Element highNode = document.createElement(DeclarationParser.mlNode);
			highNode.setTextContent(type.getHigh());
			withNode.appendChild(highNode);
			
			intNode.appendChild(withNode);
			
		} else if (type.getHigh() != null || type.getLow() != null) {
			throw new OperationNotSupportedException();
		}
	}
	
	private static void exportCPNType(final Document document, final Element color, final CPNIntInf type)
	        throws OperationNotSupportedException {
		final Element intinfNode = document.createElement(DeclarationParser.intinfNode);
		color.appendChild(intinfNode);
		if (type.getHigh() != null || type.getLow() != null) throw new OperationNotSupportedException();
	}

	private static void exportCPNType(final Document document, final Element color, final CPNList type) {
		final Element listNode = document.createElement(DeclarationParser.listNode);
		final Element id = document.createElement(DeclarationParser.idNode);
		id.setTextContent(type.getSort());
		listNode.appendChild(id);
		// TODO: add lower and upper bounds
		color.appendChild(listNode);
	}

	private static void exportCPNType(final Document document, final Element color, final CPNProduct type) {
		final Element productNode = document.createElement(DeclarationParser.productNode);
		for (final String t : type.getTypes()) {
			final Element id = document.createElement(DeclarationParser.idNode);
			id.setTextContent(t);
			productNode.appendChild(id);
		}
		color.appendChild(productNode);
	}

	private static void exportCPNType(final Document document, final Element color, final CPNReal type)
	        throws OperationNotSupportedException {
		final Element realNode = document.createElement(DeclarationParser.realNode);
		color.appendChild(realNode);
	}

	private static void exportCPNType(final Document document, final Element color, final CPNRecord type) {
		final Element recordNode = document.createElement(DeclarationParser.recordNode);
		for (final NameTypePair t : type.getValues()) {
			final Element field = document.createElement(DeclarationParser.recordfieldNode);
			final Element idName = document.createElement(DeclarationParser.idNode);
			idName.setTextContent(t.getName());
			final Element sortName = document.createElement(DeclarationParser.idNode);
			sortName.setTextContent(t.getSort());

			field.appendChild(idName);
			field.appendChild(sortName);
			recordNode.appendChild(field);
		}
		color.appendChild(recordNode);
	}

	private static void exportCPNType(final Document document, final Element color, final CPNString type)
	        throws OperationNotSupportedException {
		final Element string = document.createElement(DeclarationParser.stringNode);
		color.appendChild(string);
		if (type.getLengthHigh() != null || type.getLengthLow() != null || type.getRangeHigh() != null
		        || type.getRangeLow() != null) throw new OperationNotSupportedException();
	}

	private static void exportCPNType(final Document document, final Element color, final CPNSubset type)
	        throws OperationNotSupportedException {
		final Element element = document.createElement(DeclarationParser.subsetNode);
		color.appendChild(element);
		final Element id = document.createElement(DeclarationParser.idNode);
		id.setTextContent(type.getSort());
		element.appendChild(id);
		if (type.getBy() != null) {
			final Element by = document.createElement("by");
			element.appendChild(by);
			final Element ml = document.createElement(DeclarationParser.mlNode);
			ml.setTextContent(type.getBy());
			by.appendChild(ml);
		} else
			throw new OperationNotSupportedException();
	}
	
	private static void exportCPNType(final Document document, final Element color, final CPNTime type)
	        throws OperationNotSupportedException {
		final Element timeNode = document.createElement(DeclarationParser.timeNode);
		color.appendChild(timeNode);
	}

	private static void exportCPNType(final Document document, final Element color, final CPNType type)
	        throws OperationNotSupportedException {
		if (type.getTimed()) {
			final Element timed = document.createElement(DeclarationParser.timedNode);
			color.appendChild(timed);
		}
		if (!type.getDeclares().isEmpty()) throw new OperationNotSupportedException();
		if (type instanceof CPNAlias) {
			exportCPNType(document, color, (CPNAlias) type);
		} else if (type instanceof CPNBool) {
			exportCPNType(document, color, (CPNBool) type);
		} else if (type instanceof CPNEnum) {
			exportCPNType(document, color, (CPNEnum) type);
		} else if (type instanceof CPNIndex) {
			exportCPNType(document, color, (CPNIndex) type);
		} else if (type instanceof CPNInt) {
			exportCPNType(document, color, (CPNInt) type);
		} else if (type instanceof CPNIntInf) {
			exportCPNType(document, color, (CPNIntInf) type);
		} else if (type instanceof CPNList) {
			exportCPNType(document, color, (CPNList) type);
		} else if (type instanceof CPNProduct) {
			exportCPNType(document, color, (CPNProduct) type);
		} else if (type instanceof CPNReal) {
			exportCPNType(document, color, (CPNReal) type);
		} else if (type instanceof CPNRecord) {
			exportCPNType(document, color, (CPNRecord) type);
		} else if (type instanceof CPNString) {
			exportCPNType(document, color, (CPNString) type);
		} else if (type instanceof CPNSubset) {
			exportCPNType(document, color, (CPNSubset) type);
		} else if (type instanceof CPNTime) {
			exportCPNType(document, color, (CPNTime) type);
		} else if (type instanceof CPNUnion) {
			exportCPNType(document, color, (CPNUnion) type);
		} else if (type instanceof CPNUnit) {
			exportCPNType(document, color, (CPNUnit) type);
		}

	}

	private static void exportCPNType(final Document document, final Element color, final CPNUnion type)
	        throws OperationNotSupportedException {
		throw new OperationNotSupportedException();
	}

	private static void exportCPNType(final Document document, final Element color, final CPNUnit type)
	        throws OperationNotSupportedException {
		final Element unit = document.createElement(DeclarationParser.unitNode);
		color.appendChild(unit);
		if (type.getId() != null) throw new OperationNotSupportedException();
	}

	private static void exportDeclaration(final Document document, final Element globbox, final Element types,
	        final Element variables, final Element functions, final Element parameters,
	        final DeclarationStructure structure, final HLDeclaration decl) throws OperationNotSupportedException {
		if (structure instanceof GlobalReferenceDeclaration) {
			exportDeclaration(document, parameters, (GlobalReferenceDeclaration) structure, decl);
		} else if (structure instanceof MLDeclaration) {
			exportDeclaration(document, functions, (MLDeclaration) structure, decl);
		} else if (structure instanceof TypeDeclaration) {
			exportDeclaration(document, types, (TypeDeclaration) structure, decl);
		} else if (structure instanceof UseDeclaration) {
			exportDeclaration(document, functions, (UseDeclaration) structure, decl);
		} else if (structure instanceof VariableDeclaration) {
			exportDeclaration(document, variables, (VariableDeclaration) structure, decl);
		}
	}

	private static void exportDeclaration(final Document document, final Element globbox,
	        final GlobalReferenceDeclaration structure, final HLDeclaration decl) throws OperationNotSupportedException {
		final Element globref = document.createElement(DeclarationParser.globrefNode);
		globref.setAttribute("id", decl.getId());
		globbox.appendChild(globref);
		final Element id = document.createElement(DeclarationParser.idNode);
		id.setTextContent(structure.getName());
		globref.appendChild(id);
		final Element ml = document.createElement(DeclarationParser.mlNode);
		ml.setTextContent(structure.getValue());
		globref.appendChild(ml);
	}

	private static void exportDeclaration(final Document document, final Element globbox,
	        final MLDeclaration structure, final HLDeclaration decl) {
		final Element ml = document.createElement(DeclarationParser.mlNode);
		ml.setAttribute("id", decl.getId());
		globbox.appendChild(ml);
		ml.setTextContent(structure.getCode());
	}

	private static void exportDeclaration(final Document document, final Element globbox,
	        final TypeDeclaration structure, final HLDeclaration decl) throws OperationNotSupportedException {
		final Element color = document.createElement(DeclarationParser.colorNode);
		color.setAttribute("id", decl.getId());
		globbox.appendChild(color);
		final Element id = document.createElement(DeclarationParser.idNode);
		id.setTextContent(structure.getTypeName());
		color.appendChild(id);
		exportCPNType(document, color, structure.getSort());
	}

	private static void exportDeclaration(final Document document, final Element globbox,
	        final UseDeclaration structure, final HLDeclaration decl) throws OperationNotSupportedException {
		throw new OperationNotSupportedException();
	}

	private static void exportDeclaration(final Document document, final Element globbox,
	        final VariableDeclaration structure, final HLDeclaration decl) {
		final Element var = document.createElement(DeclarationParser.varNode);
		var.setAttribute("id", decl.getId());
		globbox.appendChild(var);
		final Element type = document.createElement(DeclarationParser.typeNode);
		var.appendChild(type);
		final Element id = document.createElement(DeclarationParser.idNode);
		id.setTextContent(structure.getTypeName());
		type.appendChild(id);
		for (final String name : structure.getVariables()) {
			final Element varId = document.createElement(DeclarationParser.idNode);
			varId.setTextContent(name);
			var.appendChild(varId);
		}
	}

	static int id = 0;

	private static void exportDeclarations(final Document document, final Element rootTreeNode, final PetriNet petriNet)
	        throws OperationNotSupportedException {
		final Element globbox = document.createElement(DOMParser.globboxNode);
		rootTreeNode.appendChild(globbox);
		final Element parameters = createBlock(document, globbox, "Parameters");
		final Element types = createBlock(document, globbox, "Types");
		final Element variables = createBlock(document, globbox, "Variables");
		final Element functions = createBlock(document, globbox, "Functions");
		for (final HLDeclaration decl : petriNet.declaration()) {
			exportDeclaration(document, globbox, types, variables, functions, parameters, decl.getStructure(), decl);
		}
	}

	private static Element createBlock(final Document document, final Element globbox, final String name) {
		final Element block = document.createElement("block");
		block.setAttribute("id", "idblock" + DOMGenerator.id++);
		final Element id = document.createElement("id");
		id.setTextContent(name);
		block.appendChild(id);
		globbox.appendChild(block);
		return block;
	}

	private static Element exportLabel(final Document document, final Element place, final Annotation label,
	        final String typenode, final String id, final double x, final double y) {
		final Element node = document.createElement(typenode);
		node.setAttribute("id", id);
		place.appendChild(node);
		final Element posattr = document.createElement("posattr");
		try {
			final Coordinate offset = label.getAnnotationGraphics().getOffset();
			final Coordinate position = ((Node) label.getParent()).getNodeGraphics().getPosition();
			posattr.setAttribute("x", "" + (offset.getX() + position.getX()));
			posattr.setAttribute("y", "" + (offset.getY() + position.getY()));
		} catch (final Exception ex) {
			posattr.setAttribute("x", "" + x);
			posattr.setAttribute("y", "" + y);
		}
		node.appendChild(posattr);
		final Element fillattr = document.createElement("fillattr");
		try {
			final Fill fill = label.getAnnotationGraphics().getFill();
			fillattr.setAttribute("colour", fill.getColor());
		} catch (final Exception ex) {
			fillattr.setAttribute("colour", "White");
		}
		fillattr.setAttribute("pattern", "Solid");
		fillattr.setAttribute("filled", "false");
		node.appendChild(fillattr);
		final Element lineattr = document.createElement("lineattr");
		try {
			final Line line = label.getAnnotationGraphics().getLine();
			lineattr.setAttribute("colour", line.getColor());
			lineattr.setAttribute("thick", "" + Math.round(line.getWidth()));

		} catch (final Exception ex) {
			lineattr.setAttribute("colour", "Black");
			lineattr.setAttribute("thick", "0");
		}
		lineattr.setAttribute("type", "Solid");
		node.appendChild(lineattr);
		final Element textattr = document.createElement("textattr");
		try {
			final Line line = label.getAnnotationGraphics().getLine();
			textattr.setAttribute("colour", line.getColor());
		} catch (final Exception ex) {
			textattr.setAttribute("colour", "Black");
		}
		textattr.setAttribute("bold", "false");
		node.appendChild(textattr);
		final Element text = document.createElement(DOMParser.textNode);
		text.setTextContent(label == null || label.getText() == null ? "" : label.getText());
		node.appendChild(text);
		return node;
	}

	private static void exportObject(final Document document, final Element pageNode,
	        final org.cpntools.accesscpn.model.Object o,
	        final Map<org.cpntools.accesscpn.model.Object, Position> positions, final ModelData modelData)
	        throws OperationNotSupportedException {

		if (o instanceof Instance) {
			exportObject(document, pageNode, (Instance) o, positions, modelData);
			// } else if (o instanceof FusionGroup) {
			// exportObject(document, pageNode, (FusionGroup) o, positions);
		} else if (o instanceof Place) {
			exportObject(document, pageNode, (Place) o, positions);
		} else if (o instanceof RefPlace) {
			exportObject(document, pageNode, (RefPlace) o, positions);
		} else if (o instanceof Transition) {
			exportObject(document, pageNode, (Transition) o, positions);
		} else if (o instanceof RefTrans) {
			exportObject(document, pageNode, (RefTrans) o, positions);
		} else if (o instanceof AuxGraphics) {
			exportAux(document, pageNode, (AuxGraphics) o, positions);
		} else
			throw new OperationNotSupportedException();
	}

	private static void exportAux(final Document document, final Element pageNode, final AuxGraphics o,
	        final Map<Object, Position> positions) {
		if (o instanceof Text) {
			exportAux(document, pageNode, (Text) o, positions);
		}
	}

	private static void exportAux(final Document document, final Element pageNode, final Text o,
	        final Map<Object, Position> positions) {
		final Element aux = document.createElement("Aux");
		aux.setAttribute("id", o.getId());
		final Element text = document.createElement("text");
		text.setTextContent(o.getText());
		exportGraphics(document, o, positions, aux);
		final Element label = document.createElement("label");
		aux.appendChild(label);
		aux.appendChild(text); // THIS MUST BE LAST
		pageNode.appendChild(aux);
	}

	private static void exportObject(final Document document, final Element rootNode, final FusionGroup o)
	        throws OperationNotSupportedException {

		final Element fusionGroup = document.createElement(DOMParser.fusionNode);
		fusionGroup.setAttribute("id", o.getId());
		fusionGroup.setAttribute("name", o.getName().getText());

		for (final RefPlace p : o.getReferences()) {
			final Element fusionElement = document.createElement("fusion_elm");
			fusionElement.setAttribute("idref", p.getId());
			fusionGroup.appendChild(fusionElement);
		}

		rootNode.appendChild(fusionGroup);
	}

	private static void exportObject(final Document document, final Element pageNode, final Instance o,
	        final Map<org.cpntools.accesscpn.model.Object, Position> positions, final ModelData modelData) {

		final Element trans = document.createElement(DOMParser.transNode);
		trans.setAttribute("id", o.getId());
		pageNode.appendChild(trans);

		final Element box = document.createElement("box");
		exportSize(o, box);
		trans.appendChild(box);

		final Coordinate position = exportGraphics(document, o, positions, trans);
		exportText(document, trans, o);

		final Name empty = ModelFactory.INSTANCE.createName();
		empty.setText("");
		exportLabel(document, trans, empty, DOMParser.condNode, o.getId() + "a", position.getX() - 36,
		        position.getY() - 24);
		exportLabel(document, trans, empty, DOMParser.timeNode, o.getId() + "b", position.getX() + 36,
		        position.getY() + 24);
		exportLabel(document, trans, empty, DOMParser.codeNode, o.getId() + "c", position.getX() + 36, position.getY());

		final Element subst = document.createElement(DOMParser.substNode);
		subst.setAttribute("subpage", o.getSubPageID());
		final StringBuilder sb = new StringBuilder();
		int i = 0;
		for (final ParameterAssignment pa : o.getParameterAssignment()) {

			final String refPlaceID = pa.getValue();
			RefPlace r = null;
			for (final Page pg : o.getPage().getPetriNet().getPage()) {
				if (pg.getId().equals(o.getSubPageID())) {
					for (final org.cpntools.accesscpn.model.Object other : pg.getObject()) {
						if (other.getId().equals(refPlaceID)) {
							r = (RefPlace) other;
						}
					}
				}
			}

			final boolean p_to_t = r != null ? !r.getSourceArc().isEmpty() : true;
			final boolean t_to_p = r != null ? !r.getTargetArc().isEmpty() : true;

//			final Element arc = document.createElement(DOMParser.arcNode);
//			arc.setAttribute("id", o.getId() + "arc" + i++);
//
//			String orientation;
//			if (p_to_t && !t_to_p) {
//				orientation = "PtoT";
//			} else if (!p_to_t && t_to_p) {
//				orientation = "TtoP";
//			} else {
//				orientation = "BOTHDIR";
//			}
//
//			arc.setAttribute("orientation", orientation);
//			arc.setAttribute("order", "1");
//			pageNode.appendChild(arc);
//			final Element transend = document.createElement(DOMParser.transendNode);
//			transend.setAttribute("idref", o.getId());
//			arc.appendChild(transend);
//			final Element placeend = document.createElement(DOMParser.placeendNode);
//			placeend.setAttribute("idref", pa.getParameter());
//			arc.appendChild(placeend);
//			exportLabel(document, arc, empty, DOMParser.annotNode, o.getId() + "arc" + i++, 0, 0);

			sb.append('(');
			sb.append(pa.getValue());
			sb.append(',');
			sb.append(pa.getParameter());
			sb.append(')');
		}
		subst.setAttribute("portsock", sb.toString());

		empty.setText(modelData.getPage(o.getSubPageID()).getName().getText());
		final Element subpageinfo = exportLabel(document, subst, empty, DOMParser.subpageinfoNode, o.getId() + "e",
		        position.getX() - 36, position.getY() - 24);
		subpageinfo.setAttribute("name", empty.getText());

		trans.appendChild(subst);
	}

	private static void exportSize(final Node o, final Element box) {
		try {
			final Coordinate dimension = o.getNodeGraphics().getDimension();
			box.setAttribute("w", "" + dimension.getX());
			box.setAttribute("h", "" + dimension.getY());
		} catch (final Exception ex) {
			box.setAttribute("w", "60.0");
			box.setAttribute("h", "40.0");
		}
	}

	private static void exportObject(final Document document, final Element pageNode, final Place o,
	        final Map<Object, Position> positions) {
		final Element element = document.createElement(DOMParser.placeNode);
		exportPlaceNode(document, pageNode, o, element, positions);
	}

	private static <T extends PlaceNode> Coordinate exportPlaceNode(final Document document, final Element pageNode,
	        final T o, final Element place, final Map<Object, Position> positions) {
		place.setAttribute("id", o.getId());
		pageNode.appendChild(place);

		// Assign a random/hard-coded size
		final Element ellipse = document.createElement("ellipse");
		exportSize(o, ellipse);
		place.appendChild(ellipse);

		final Coordinate position = exportGraphics(document, o, positions, place);

		exportText(document, place, o);
		exportLabel(document, place, o.getSort(), DOMParser.typeNode, o.getId() + "a", position.getX() + 36,
		        position.getY() - 24);
		exportLabel(document, place, o.getInitialMarking(), DOMParser.initmarkNode, o.getId() + "b",
		        position.getX() + 36, position.getY() + 24);
		return position;
	}

	private static Coordinate exportGraphics(final Document document, final Object o,
	        final Map<org.cpntools.accesscpn.model.Object, Position> positions, final Element place) {
		final Element posattr = document.createElement("posattr");
		place.appendChild(posattr);
		Coordinate position;
		NodeGraphics g = null;
		try {
			if (o instanceof Node) {
				g = ((Node) o).getNodeGraphics();
			} else if (o instanceof AuxGraphics) {
				g = ((AuxGraphics) o).getNodeGraphics();
			}
			position = g.getPosition();
			posattr.setAttribute("x", "" + position.getX());
			posattr.setAttribute("y", "" + position.getY());
		} catch (final Exception ex) {
			final int x = positions.get(o).getA();
			final int y = positions.get(o).getB();
			posattr.setAttribute("x", "" + x);
			posattr.setAttribute("y", "" + y);
			position = GraphicsFactory.INSTANCE.createCoordinate();
			position.setX(x);
			position.setY(y);
		}

		final Element fillattr = document.createElement("fillattr");
		place.appendChild(fillattr);
		try {
			final Fill fill = g.getFill();
			fillattr.setAttribute("colour", fill.getColor());
		} catch (final Exception ex) {
			fillattr.setAttribute("colour", "White");
		}
		fillattr.setAttribute("pattern", "filled");
		fillattr.setAttribute("filled", "false");

		final Element lineattr = document.createElement("lineattr");
		final Element textattr = document.createElement("textattr");
		place.appendChild(lineattr);
		place.appendChild(textattr);
		try {
			final Line line = g.getLine();
			lineattr.setAttribute("colour", line.getColor());
			lineattr.setAttribute("thick", "" + Math.round(line.getWidth()));
			textattr.setAttribute("colour", line.getColor());
		} catch (final Exception ex) {
			lineattr.setAttribute("colour", "Black");
			textattr.setAttribute("colour", "Black");
			lineattr.setAttribute("thick", "1");
		}
		lineattr.setAttribute("pattern", "Solid");
		textattr.setAttribute("bold", "false");

		return position;
	}

	private static void exportObject(final Document document, final Element pageNode, final RefPlace o,
	        final Map<org.cpntools.accesscpn.model.Object, Position> positions) {

		final Element place = document.createElement(DOMParser.placeNode);
		final Coordinate pos = exportPlaceNode(document, pageNode, o, place, positions);

		// get positions
		final double x = pos.getX();
		final double y = pos.getY();

		if (o.getRef() == null) {

			final Name empty = ModelFactory.INSTANCE.createName();
			empty.setText("");
			final Element label = exportLabel(document, place, empty, DOMParser.portNode, o.getId() + "c",
			        (int) pos.getX() - 36, (int) pos.getY() - 24);

			final ModelInstance modelInstance = (ModelInstance) ModelInstanceAdapterFactory.getInstance().adapt(
			        o.getPage().getPetriNet(), ModelInstance.class);
			boolean in = false, out = false;
			for (final org.cpntools.accesscpn.engine.highlevel.instance.Instance<RefPlace> pi : modelInstance
			        .getAllInstances(o)) {
				final org.cpntools.accesscpn.engine.highlevel.instance.Instance<Instance> instance = pi
				        .getTransitionPath();
				for (final Arc a : instance.getNode().getSourceArc()) {
					for (final ParameterAssignment pa : instance.getNode().getParameterAssignment()) {
						if (pa.getValue() == o.getId() && pa.getParameter() == a.getPlaceNode().getId()) {
							out = true;
							in = a.getKind() == HLArcType.TEST;
						}
					}
				}
				for (final Arc a : instance.getNode().getTargetArc()) {
					for (final ParameterAssignment pa : instance.getNode().getParameterAssignment()) {
						if (pa.getValue() == o.getId() && pa.getParameter() == a.getPlaceNode().getId()) {
							in = true;
							out = a.getKind() == HLArcType.TEST;
						}
					}
				}

			}

			if (in && out) {
				label.setAttribute(DOMParser.typeNode, "I/O");
			} else if (in) {
				label.setAttribute(DOMParser.typeNode, "In");
			} else if (out) {
				label.setAttribute(DOMParser.typeNode, "Out");
			} else {
				label.setAttribute(DOMParser.typeNode, "I/O");
			}

		} else {
			if (o.isFusionGroup() && o.getRef() instanceof FusionGroup) {

				final Element fusionInfo = document.createElement(DOMParser.fusioninfoNode);
				fusionInfo.setAttribute("name", o.getRef().getName().getText());

				final Element posattr2 = document.createElement("posattr");
				posattr2.setAttribute("x", "" + (x - 25));
				posattr2.setAttribute("y", "" + (y - 16));
				fusionInfo.appendChild(posattr2);

				place.appendChild(fusionInfo);

			} else {

				final boolean p_to_t = o != null ? !o.getSourceArc().isEmpty() : true;
				final boolean t_to_p = o != null ? !o.getTargetArc().isEmpty() : true;

				final Element port = document.createElement(DOMParser.portNode);
				if (p_to_t && !t_to_p) {
					port.setAttribute("type", "In");
				} else if (!p_to_t && t_to_p) {
					port.setAttribute("type", "Out");
				} else {
					port.setAttribute("type", "I/O");
				}
				place.appendChild(port);

				final Element posattr2 = document.createElement("posattr");
				posattr2.setAttribute("x", "" + x);
				posattr2.setAttribute("y", "" + (y - 24));
				port.appendChild(posattr2);
			}
		}
	}

	private static void exportObject(final Document document, final Element pageNode, final RefTrans o,
	        final Map<org.cpntools.accesscpn.model.Object, Position> positions) throws OperationNotSupportedException {
		throw new OperationNotSupportedException();
	}

	private static void exportObject(final Document document, final Element pageNode, final Transition o,
	        final Map<org.cpntools.accesscpn.model.Object, Position> positions) {
		final Element trans = document.createElement(DOMParser.transNode);
		trans.setAttribute("id", o.getId());
		pageNode.appendChild(trans);

		// Assign a random/hard-coded position
		final Element box = document.createElement("box");
		exportSize(o, box);
		trans.appendChild(box);

		final Coordinate position = exportGraphics(document, o, positions, trans);

		exportText(document, trans, o);
		exportLabel(document, trans, o.getCondition(), DOMParser.condNode, o.getId() + "a", position.getX() - 36,
		        position.getY() - 24);
		exportLabel(document, trans, o.getTime(), DOMParser.timeNode, o.getId() + "b", position.getX() + 36,
		        position.getY() + 24);
		exportLabel(document, trans, o.getCode(), DOMParser.codeNode, o.getId() + "c", position.getX() + 36,
		        position.getY());
		exportLabel(document, trans, o.getPriority(), DOMParser.priorityNode, o.getId() + "d", position.getX() - 36,
		        position.getY() - 24);
	}

	private static void exportPage(final Document document, final Element rootTreeNode, final Page p,
	        final ModelData modelData) throws OperationNotSupportedException {

		final Element pageNode = document.createElement(DOMParser.pageNode);
		pageNode.setAttribute("id", p.getId());
		rootTreeNode.appendChild(pageNode);
		final Element pageAttr = document.createElement(DOMParser.pageattrNode);
		pageAttr.setAttribute("name", p.getName().getText());
		pageNode.appendChild(pageAttr);

		final Map<org.cpntools.accesscpn.model.Object, Position> positions = createGraph(p);
		for (final org.cpntools.accesscpn.model.Object o : p.getObject()) {
			exportObject(document, pageNode, o, positions, modelData);
		}
		for (final Arc a : p.getArc()) {
			exportArc(document, pageNode, a, positions);
		}
	}

	private static Map<org.cpntools.accesscpn.model.Object, Position> createGraph(final Page p) {
		try {
			return JUNGHelper.createGraph(p);
		} catch (final Throwable t) {
			if (!(t instanceof NoClassDefFoundError)) {
				t.printStackTrace();
			}

			final Map<org.cpntools.accesscpn.model.Object, Position> positions = new HashMap<org.cpntools.accesscpn.model.Object, DOMGenerator.Position>();
			// generate ad-hoc layout
			// try to layout acyclic parts, where it fails, layout randomly
			final LayoutAcylic layout = new LayoutAcylic(p);
			for (final org.cpntools.accesscpn.model.Object o : p.getObject()) {
				layout.setPosition(o, positions);
			}
			return positions;
		}
	}

	private static void exportPages(final Document document, final Element rootTreeNode, final PetriNet petriNet,
	        final ModelData modelData) throws OperationNotSupportedException {
		for (final Page p : petriNet.getPage()) {
			exportPage(document, rootTreeNode, p, modelData);
		}
	}

	private static void exportFusionGroups(final Document document, final Element rootTreeNode, final PetriNet petriNet)
	        throws OperationNotSupportedException {
		for (final FusionGroup g : petriNet.getFusionGroups()) {
			exportObject(document, rootTreeNode, g);
		}
	}

	private static void exportText(final Document document, final Element node, final HasName label) {
		final Element text = document.createElement(DOMParser.textNode);
		text.setTextContent(label.getName().getText());
		node.appendChild(text);
	}
}
