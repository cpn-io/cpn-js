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
package org.cpntools.accesscpn.model;

/**
 * @author mwesterg
 */
public class ModelPrinter {
	protected final StringBuilder sb;

	/**
	 * 
	 */
	public ModelPrinter() {
		sb = new StringBuilder();
	}

	/**
	 * @param petriNet
	 * @return
	 */
	public static String printModel(final PetriNet petriNet) {
		return new ModelPrinter().print(petriNet);
	}

	protected void print(final Label l) {
		if (l != null && l.asString() != null) {
			sb.append(l.asString().replaceAll("\n", " "));
		} else {
			sb.append("<null>");
		}
	}

	protected void printNameAndId(final HasName elm) {
		print(elm.getName());
		if (elm instanceof HasId) {
			final HasId e = (HasId) elm;
			sb.append(" (");
			sb.append(e.getId());
			sb.append(")");
		}
	}

	protected void printLine() {
		sb.append('\n');
	}

	private String print(final PetriNet petriNet) {
		sb.append("PetriNet: ");
		printNameAndId(petriNet);
		printLine();

		for (final HLDeclaration declaration : petriNet.declaration()) {
			print(declaration);
		}

		for (final Page p : petriNet.getPage()) {
			print(p);
		}

		for (final FusionGroup f : petriNet.getFusionGroups()) {
			print(f);
		}
		return sb.toString();
	}

	private void print(final HLDeclaration declaration) {
		sb.append("  - Declaration: ");
		print((Label) declaration);
		printLine();
	}

	private void print(final FusionGroup f) {
		// TODO Auto-generated method stub

	}

	private void print(final Page p) {
		sb.append("  - Page: ");
		printNameAndId(p);
		printLine();

		for (final RefPlace place : p.portPlace()) {
			printPort(place);
		}
		for (final RefPlace place : p.fusionGroup()) {
			printFusion(place);
		}
		for (final Place place : p.place()) {
			print(place);
		}

		for (final Instance transition : p.instance()) {
			print(transition);
		}
		for (final Transition transition : p.transition()) {
			print(transition);
		}

		for (final Arc arc : p.getArc()) {
			print(arc);
		}
	}

	private void print(final Arc arc) {
		sb.append("      - Arc: ");
		printNameAndId(arc.getSource());
		if (arc.getKind() == HLArcType.TEST) {
			sb.append(" <--> ");
		} else {
			sb.append(" ---> ");
		}
		printNameAndId(arc.getTarget());
		printLine();

		sb.append("          - Expression: ");
		print(arc.getHlinscription());
		printLine();
	}

	private void print(final Transition transition) {
		sb.append("      - Transition: ");
		print((Node) transition);

		sb.append("          - Guard: ");
		print(transition.getCondition());
		printLine();
		sb.append("          - Time: ");
		print(transition.getTime());
		printLine();
		sb.append("          - Code: ");
		print(transition.getCode());
		printLine();
		sb.append("          - Priority: ");
		print(transition.getPriority());
		printLine();

	}

	private void print(final Instance transition) {
		sb.append("      - Instance: ");
		print((Node) transition);
		sb.append("          - Subpage: ");
		sb.append(transition.getSubPageID());
		printLine();

		for (final ParameterAssignment assignment : transition.getParameterAssignment()) {
			sb.append("          - Assignment: ");
			sb.append(assignment.getValue());
			sb.append(" -> ");
			sb.append(assignment.getParameter());
			printLine();
		}
	}

	private void print(final Place place) {
		sb.append("      - Place: ");
		printPlaceContents(place);
	}

	private void printFusion(final RefPlace place) {
		sb.append("      - Fusion: ");
		printPlaceContents(place);

		sb.append("          - Membership: ");
		printNameAndId(place.getRef());
		printLine();
	}

	private void printPort(final RefPlace place) {
		sb.append("      - Port: ");
		printPlaceContents(place);
	}

	protected void print(final Node node) {
		printNameAndId(node);
		printLine();
	}

	@SuppressWarnings("cast")
	private void printPlaceContents(final PlaceNode place) {
		print((Node) place);
		sb.append("          - Type: ");
		print(place.getSort());
		printLine();
		sb.append("          - Initmark: ");
		print(place.getInitialMarking());
		printLine();
	}
}
