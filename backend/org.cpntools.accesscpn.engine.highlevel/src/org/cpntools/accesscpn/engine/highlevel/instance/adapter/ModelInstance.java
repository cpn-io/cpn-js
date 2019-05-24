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
package org.cpntools.accesscpn.engine.highlevel.instance.adapter;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.cpntools.accesscpn.engine.highlevel.instance.Instance;
import org.cpntools.accesscpn.engine.highlevel.instance.InstanceFactory;
import org.cpntools.accesscpn.model.Arc;
import org.cpntools.accesscpn.model.HLArcType;
import org.cpntools.accesscpn.model.Node;
import org.cpntools.accesscpn.model.Page;
import org.cpntools.accesscpn.model.ParameterAssignment;
import org.cpntools.accesscpn.model.Place;
import org.cpntools.accesscpn.model.PlaceNode;
import org.cpntools.accesscpn.model.RefPlace;
import org.eclipse.emf.common.notify.Notification;

/**
 * @author mwesterg
 */
public class ModelInstance extends PetriNetDataAdapter {
	/**
	 * @author mwesterg
	 */
	public static final class ArcInfo {

		private final Map<PlaceNode, List<Node>> inputs;
		private final Map<PlaceNode, List<Node>> outputs;
		private final Map<PlaceNode, List<Node>> tests;

		/**
		 * @param inputs
		 * @param outputs
		 * @param tests
		 */
		public ArcInfo(final Map<PlaceNode, List<Node>> inputs, final Map<PlaceNode, List<Node>> outputs,
		        final Map<PlaceNode, List<Node>> tests) {
			this.inputs = Collections.unmodifiableMap(inputs);
			this.outputs = Collections.unmodifiableMap(outputs);
			this.tests = Collections.unmodifiableMap(tests);
		}

		/**
		 * @return the inputs
		 */
		public Map<PlaceNode, List<Node>> getInputs() {
			return inputs;
		}

		/**
		 * @return the outputs
		 */
		public Map<PlaceNode, List<Node>> getOutputs() {
			return outputs;
		}

		/**
		 * @return the tests
		 */
		public Map<PlaceNode, List<Node>> getTests() {
			return tests;
		}

	}

	private final boolean trace = false;

	private Map<String, Page> pages = null;

	private Map<Page, List<org.cpntools.accesscpn.model.Instance>> instanceHierarchy = null;

	private List<Page> topPages = null;

	private Map<Page, List<org.cpntools.accesscpn.model.Instance>> subpageMap = null;

	private Map<Instance<Page>, Integer> instanceNumbers = null;

	private Map<Page, List<Instance<Page>>> instances = null;

	private Map<Instance<Page>, Instance<Page>> pageInstances = null;
	private Map<Instance<Page>, List<Instance<Page>>> subPages = null;

	private final Map<Node, List<? extends Instance<Node>>> allInstances = new HashMap<Node, List<? extends Instance<Node>>>();

	private final Map<Page, ArcInfo> arcInfos = new HashMap<Page, ArcInfo>();

	/**
	 * @param page
	 * @return
	 */
	public synchronized Collection<Instance<Page>> getAllInstances(final Page page) {
		if (getPetriNet() == null) { return null; }
		if (page == null) { return null; }
		return getInstances().get(page);
	}

	public synchronized Collection<Instance<Page>> getAllSubpages(final Instance<Page> page) {
		if (getPetriNet() == null) { return null; }
		if (page == null) { return null; }
		if (subPages == null) {
			subPages = new HashMap<Instance<Page>, List<Instance<Page>>>();
		}
		List<Instance<Page>> result = subPages.get(page);
		if (result == null) {
			result = new ArrayList<Instance<Page>>();
			for (final org.cpntools.accesscpn.model.Instance i : page.getNode().instance()) {
				final Page subpage = getModelData().getPage(i.getSubPageID());
				for (final Instance<Page> pi : getAllInstances(subpage)) {
					if (pi.getTransitionPath().getNode().equals(i)) {
						result.add(pi);
					}
				}
			}
			subPages.put(page, result);
		}
		return result;
	}

	/**
	 * @param <T>
	 * @param node
	 * @return all instances of node T
	 */
	@SuppressWarnings("unchecked")
	public synchronized <T extends Node> Collection<? extends Instance<T>> getAllInstances(final T node) {
		if (getPetriNet() == null) { return null; }
		if (node == null) { return null; }
		List<? extends Instance<T>> list = (List<? extends Instance<T>>) allInstances.get(node);
		if (list != null) { return list; }
		list = new ArrayList<>();
		allInstances.put(node, (List<? extends Instance<Node>>) list);
        List<Instance<T>> list2 = (List<Instance<T>>) list;
        for (final Instance<Page> pageInstance : getAllInstances(node.getPage())) {
			Instance<T> elem  = InstanceFactory.INSTANCE.createInstance(node, pageInstance.getTransitionPath());
			list2.add(elem);
		}
		return list;
	}

	/**
	 * @param page
	 * @return
	 */
	public synchronized ArcInfo getArcInfo(final Page page) {
		if (getPetriNet() == null) { return null; }
		if (arcInfos.containsKey(page)) { return arcInfos.get(page); }
		final Map<PlaceNode, List<Node>> inputs = new HashMap<PlaceNode, List<Node>>();
		final Map<PlaceNode, List<Node>> outputs = new HashMap<PlaceNode, List<Node>>();
		final Map<PlaceNode, List<Node>> tests = new HashMap<PlaceNode, List<Node>>();

		for (final Place p : page.place()) {
			countArcs(inputs, outputs, tests, p);
		}
		for (final RefPlace p : page.fusionGroup()) {
			countArcs(inputs, outputs, tests, p);
		}
		for (final RefPlace p : page.portPlace()) {
			countArcs(inputs, outputs, tests, p);
		}
		for (final org.cpntools.accesscpn.model.Instance instance : page.instance()) {
			final Page subPage = getPages().get(instance.getSubPageID());
			final ArcInfo subArcInfo = getArcInfo(subPage);

			for (final ParameterAssignment pa : instance.getParameterAssignment()) {
				final PlaceNode socket = getModelData().getPlace(pa.getParameter());
				final PlaceNode port = getModelData().getPlace(pa.getValue());
				assert port.getPage() == subPage;
				// Place which is both port and socket fails here
				inputs.put(port, subArcInfo.getInputs().get(port));
				outputs.put(port, subArcInfo.getOutputs().get(port));
				tests.put(port, subArcInfo.getTests().get(port));

				if (empty(subArcInfo.getInputs().get(port)) && empty(subArcInfo.getTests().get(port))) {
					append(outputs, socket, instance);
				} else if (empty(subArcInfo.getOutputs().get(port)) && empty(subArcInfo.getTests().get(port))) {
					append(inputs, socket, instance);
				} else {
					append(tests, socket, instance);
				}
			}
		}

		final ArcInfo arcInfo = new ArcInfo(inputs, outputs, tests);
		arcInfos.put(page, arcInfo);
		return arcInfo;
	}

	ModelData modelData = null;

	/**
	 * @return
	 */
	public synchronized ModelData getModelData() {
		if (modelData == null) {
			modelData = (ModelData) ModelDataAdapterFactory.getInstance().adapt(getPetriNet(), ModelData.class);
		}
		return modelData;
	}

	/**
	 * @return
	 */
	public synchronized Map<Instance<Page>, Integer> getInstanceNumbers() {
		if (getPetriNet() == null) { return null; }
		if (instanceNumbers != null) { return instanceNumbers; }
		getTopPages();
		instanceNumbers = new HashMap<Instance<Page>, Integer>();
		final Map<Page, Integer> counters = new HashMap<Page, Integer>();
		for (final Page page : topPages) {
			processPage(instanceNumbers, counters, page, null);
		}
		return instanceNumbers;
	}

	/**
	 * @return map mapping pages to (0-based) lists of instances; index in lists are instance numbers
	 */
	public Map<Page, List<Instance<Page>>> getInstances() {
		if (getPetriNet() == null) { return null; }
		if (instances != null) { return instances; }
		instanceNumbers = getInstanceNumbers();
		instances = new HashMap<Page, List<Instance<Page>>>();
		for (final Map.Entry<Instance<Page>, Integer> entry : instanceNumbers.entrySet()) {
			List<Instance<Page>> instanceList = instances.get(entry.getKey().getNode());
			if (instanceList == null) {
				instanceList = new ArrayList<Instance<Page>>();
				instances.put(entry.getKey().getNode(), instanceList);
			}
			final int number = entry.getValue();
			while (instanceList.size() < number) {
				instanceList.add(null);
			}
			instanceList.set(number - 1, entry.getKey());
		}
		return instances;
	}

	/**
	 * @param <T>
	 * @param instance
	 * @return the instance that is parent of this instance of a page or node
	 */
	public synchronized <T> Instance<Page> getParentInstance(final Instance<T> instance) {
		if (getPetriNet() == null) { return null; }
		if (instance.getNode() == null) { return null; }
		final Instance<org.cpntools.accesscpn.model.Instance> transitionPath = instance.getTransitionPath();
		if (instance.getNode() instanceof Page) {
			if (transitionPath == null) { return null; }
			return getPageInstances().get(
			        InstanceFactory.INSTANCE.createInstance(transitionPath.getNode().getPage(),
			                transitionPath.getTransitionPath()));
		}
		if (instance.getNode() instanceof Node) {
			final Node n = (Node) instance.getNode();
			return getPageInstances().get(InstanceFactory.INSTANCE.createInstance(n.getPage(), transitionPath));
		}
		return null;
	}

	/**
	 * @return
	 */
	public synchronized List<Page> getTopPages() {
		if (getPetriNet() == null) { return null; }
		if (topPages != null) { return topPages; }
		getInstanceHierarchy();
		topPages = new ArrayList<Page>();
		for (final Page page : getPetriNet().getPage()) {
			if (!instanceHierarchy.containsKey(page)) {
				topPages.add(page);
			}
		}
		if (trace) {
			System.out.println("topPages: " + topPages);
		}
		return topPages;
	}

	/**
	 * @see org.eclipse.emf.ecore.util.EContentAdapter#notifyChanged(org.eclipse.emf.common.notify.Notification)
	 */
	@Override
	public synchronized void notifyChanged(final Notification msg) {
		super.notifyChanged(msg);
		// FIXME: We should not reset the world for every change; e.g., the instance hierarchy
		// only changes when we create pages or instances (subst. transitions).
		pages = null;
		instanceHierarchy = null;
		topPages = null;
		subpageMap = null;
		instanceNumbers = null;
		instances = null;
		pageInstances = null;
		allInstances.clear();
		arcInfos.clear();
		//System.out.println("notifyChanged(" + msg + ")");
	}

	/**
	 * @deprecated moved to ModelData
	 * @param id
	 * @return
	 */
	@Deprecated
	public PlaceNode getPlace(final String id) {
		return getModelData().getPlace(id);
	}

	/**
	 * @return map mapping subpages to list of all corresponding instances (subst trans)
	 */
	protected synchronized Map<Page, List<org.cpntools.accesscpn.model.Instance>> getInstanceHierarchy() {
		if (getPetriNet() == null) { return null; }
		if (instanceHierarchy != null) { return instanceHierarchy; }
		instanceHierarchy = new HashMap<Page, List<org.cpntools.accesscpn.model.Instance>>();
		pages = getPages();
		for (final Page page : getPetriNet().getPage()) {
			for (final org.cpntools.accesscpn.model.Instance instance : page.instance()) {
				@SuppressWarnings("hiding")
				List<org.cpntools.accesscpn.model.Instance> instances = instanceHierarchy.get(pages.get(instance
				        .getSubPageID()));
				if (instances == null) {
					instances = new ArrayList<org.cpntools.accesscpn.model.Instance>();
					instanceHierarchy.put(pages.get(instance.getSubPageID()), instances);
				}
				instances.add(instance);
			}
		}
		if (trace) {
			System.out.println("instanceHierarchy: " + instanceHierarchy);
		}
		return instanceHierarchy;
	}

	protected Map<Instance<Page>, Instance<Page>> getPageInstances() {
		if (getPetriNet() == null) { return null; }
		if (pageInstances != null) { return pageInstances; }
		instanceNumbers = getInstanceNumbers();
		pageInstances = new HashMap<Instance<Page>, Instance<Page>>();
		for (final Instance<Page> instance : instanceNumbers.keySet()) {
			pageInstances.put(instance, instance);
		}
		return pageInstances;
	}

	protected synchronized Map<String, Page> getPages() {
		if (getPetriNet() == null) { return null; }
		if (pages != null) { return pages; }
		pages = new HashMap<String, Page>();
		for (final Page page : getPetriNet().getPage()) {
			pages.put(page.getId(), page);
		}
		if (trace) {
			System.out.println("pages: " + pages);
		}
		return pages;
	}

	protected synchronized Map<Page, List<org.cpntools.accesscpn.model.Instance>> getSubpageMap() {
		if (getPetriNet() == null) { return null; }
		if (subpageMap != null) { return subpageMap; }
		getInstanceHierarchy();
		subpageMap = new HashMap<Page, List<org.cpntools.accesscpn.model.Instance>>();
		for (final Page page : getPetriNet().getPage()) {
			subpageMap.put(page, new ArrayList<org.cpntools.accesscpn.model.Instance>());
		}
		for (final Page page : getPetriNet().getPage()) {
			@SuppressWarnings("hiding")
			final List<org.cpntools.accesscpn.model.Instance> instances = instanceHierarchy.get(page);
			if (instances != null) {
				for (final org.cpntools.accesscpn.model.Instance instance : instances) {
					subpageMap.get(instance.getPage()).add(instance);
				}
			}
		}
		if (trace) {
			System.out.println("subpageMap: " + subpageMap);
		}
		return subpageMap;
	}

	private <T, U> void append(final Map<T, List<U>> map, final T key, final U value) {
		List<U> prev = map.get(key);
		if (prev == null) {
			prev = new ArrayList<U>();
			map.put(key, prev);
		}
		prev.add(value);
	}

	private void countArcs(final Map<PlaceNode, List<Node>> inputs, final Map<PlaceNode, List<Node>> outputs,
	        final Map<PlaceNode, List<Node>> tests, final PlaceNode p) {
		for (final Arc arc : p.getTargetArc()) {
			try {
				if (arc.getKind() == HLArcType.TEST) {
					append(tests, p, arc.getTransition());
				} else {
					append(inputs, p, arc.getTransition());
				}
			} catch (final IllegalStateException ex) {
				// Ignore arcs to subst trans
			}
		}
		for (final Arc arc : p.getSourceArc()) {
			try {
				if (arc.getKind() == HLArcType.TEST) {
					append(tests, p, arc.getTransition());
				} else {
					append(outputs, p, arc.getTransition());
				}
			} catch (final IllegalStateException ex) {
				// Ignore arcs to subst trans
			}
		}
	}

	private boolean empty(final List<Node> list) {
		return list == null || list.isEmpty();
	}

	private void processPage(@SuppressWarnings("hiding") final Map<Instance<Page>, Integer> instanceNumbers,
	        final Map<Page, Integer> counters, final Page page,
	        final Instance<org.cpntools.accesscpn.model.Instance> instance) {
		Integer number = counters.get(page);
		if (number == null) {
			number = Integer.valueOf(0);
		}
		number++;
		counters.put(page, number);
		final Instance<Page> pageInstance = InstanceFactory.INSTANCE.createInstance(page, instance);
		instanceNumbers.put(pageInstance, number);
		subpageMap = getSubpageMap();
		pages = getPages();
		for (final org.cpntools.accesscpn.model.Instance subpage : subpageMap.get(page)) {
			final Page s = pages.get(subpage.getSubPageID());
			final Instance<org.cpntools.accesscpn.model.Instance> subpageInstance = InstanceFactory.INSTANCE
			        .createInstance(subpage, instance);
			processPage(instanceNumbers, counters, s, subpageInstance);
		}
	}
}
