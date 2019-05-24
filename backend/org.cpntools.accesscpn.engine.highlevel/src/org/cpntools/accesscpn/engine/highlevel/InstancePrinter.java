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
package org.cpntools.accesscpn.engine.highlevel;

import java.util.List;

import org.cpntools.accesscpn.engine.highlevel.instance.Instance;
import org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelInstance;
import org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelInstanceAdapterFactory;
import org.cpntools.accesscpn.model.ModelPrinter;
import org.cpntools.accesscpn.model.Node;
import org.cpntools.accesscpn.model.Page;
import org.cpntools.accesscpn.model.PetriNet;
import org.cpntools.accesscpn.model.declaration.MLDeclaration;
import org.cpntools.accesscpn.model.monitors.Monitor;

/**
 * @author mwesterg
 */
public class InstancePrinter extends ModelPrinter {
	/**
	 * @param petriNet
	 * @return
	 */
	public static String printModel(final PetriNet petriNet) {
		return new InstancePrinter().print(petriNet);
	}

	/**
	 * @param petriNet
	 * @return
	 */
	public static String printMonitors(final PetriNet petriNet) {
		return new InstancePrinter().print(petriNet.getMonitors());
	}

	private String print(final List<Monitor> monitors) {
		sb.append("Monitors:");
		printLine();
		for (final Monitor monitor : monitors) {
			print(monitor);
		}
		return sb.toString();
	}

	private void printMonitor(final String string, final MLDeclaration declaration) {
		if (declaration != null) {
			sb.append("    - ");
			sb.append(string);
			sb.append(" - ");
			sb.append(declaration.getCode().replaceAll("[\\n\\r]+", " "));
			printLine();
		}
	}

	private void print(final Monitor monitor) {
		sb.append("  - Monitor: ");
		printNameAndId(monitor);
		sb.append(" [type = ");
		sb.append(monitor.getKind());
		if (monitor.isDisabled()) {
			sb.append(", disabled");
		}
		if (monitor.isLogging()) {
			sb.append(", logging");
		}
		if (monitor.isTimed()) {
			sb.append(", timed");
		}
		if (monitor.isEmpty()) {
			sb.append(", empty");
		}
		if (monitor.isEnabled()) {
			sb.append(", enabled");
		}
		if (monitor.getExtension() != null) {
			sb.append(", extension=`");
			sb.append(monitor.getExtension());
			sb.append("'");
		}
		sb.append(']');
		printLine();

		for (final java.lang.Object o : monitor.getNodes()) {
			sb.append("    - Node: ");
			if (o instanceof Instance<?>) {
				@SuppressWarnings("unchecked")
				final Instance<Node> i = (Instance<Node>) o;
				sb.append(i.getInstanceNumber());
				sb.append(": ");
				print(i.getNode());
			} else {
				sb.append("<unknown type> (");
				sb.append(o);
				sb.append(")");
				printLine();
			}
		}

		printMonitor("Init", monitor.getInit());
		printMonitor("Predicate", monitor.getPredicate());
		printMonitor("Observation", monitor.getObserver());
		printMonitor("Action", monitor.getAction());
		printMonitor("Stop", monitor.getStop());
	}

	private String print(final PetriNet petriNet) {
		for (final Page p : petriNet.getPage()) {
			print(p);
		}
		return sb.toString();
	}

	private void print(final Page p) {
		sb.append("Page ");
		sb.append(p.getName().getText());
		sb.append("\n");

		final ModelInstance modelInstance = (ModelInstance) ModelInstanceAdapterFactory.getInstance().adapt(
		        p.getPetriNet(), ModelInstance.class);
		for (final Instance<Page> instance : modelInstance.getAllInstances(p)) {
			sb.append("  - ");
			if (instance != null) {
				sb.append(instance);
				sb.append(" - ");
				sb.append(instance.getInstanceNumber());
			} else {
				sb.append("Top - 1");
			}
			sb.append("\n");
		}
	}

}
