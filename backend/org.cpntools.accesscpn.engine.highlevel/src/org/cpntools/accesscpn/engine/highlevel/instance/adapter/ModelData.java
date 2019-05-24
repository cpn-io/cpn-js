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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.cpntools.accesscpn.engine.highlevel.instance.Instance;
import org.cpntools.accesscpn.model.HLDeclaration;
import org.cpntools.accesscpn.model.Node;
import org.cpntools.accesscpn.model.Page;
import org.cpntools.accesscpn.model.Place;
import org.cpntools.accesscpn.model.PlaceNode;
import org.cpntools.accesscpn.model.RefPlace;
import org.cpntools.accesscpn.model.Sort;
import org.cpntools.accesscpn.model.Transition;
import org.cpntools.accesscpn.model.cpntypes.CPNAlias;
import org.cpntools.accesscpn.model.cpntypes.CPNSubset;
import org.cpntools.accesscpn.model.cpntypes.CPNType;
import org.cpntools.accesscpn.model.declaration.DeclarationStructure;
import org.cpntools.accesscpn.model.declaration.TypeDeclaration;
import org.cpntools.accesscpn.model.declaration.VariableDeclaration;
import org.eclipse.emf.common.notify.Notification;

/**
 * @author mwesterg
 */
public class ModelData extends PetriNetDataAdapter {
	/**
	 * @see org.eclipse.emf.ecore.util.EContentAdapter#notifyChanged(org.eclipse.emf.common.notify.Notification)
	 */
	@Override
	public synchronized void notifyChanged(final Notification notification) {
		super.notifyChanged(notification);
		allPlaceNodes = null;
		allNonPorts = null;
		allPlaces = null;
		allTransitions = null;
		allPlaceNodeInstances = null;
		allNonPortInstances = null;
		allPlaceInstances = null;
		allTransitionInstances = null;
		allPageInstances = null;
		allTypes = null;
		timedPlaces = null;
		variableTypes = null;
		pages = null;
	}

	private List<PlaceNode> allPlaceNodes = null;
	private Map<String, PlaceNode> places = null;
	private Map<String, Transition> transitions = null;
	private Map<String, org.cpntools.accesscpn.model.Instance> instances = null;

	/**
	 * @param id
	 * @return
	 */
	public synchronized PlaceNode getPlace(final String id) {
		if (getPetriNet() == null) { return null; }
		if (places != null) { return places.get(id); }
		places = new HashMap<String, PlaceNode>();
		for (final Page p : getPetriNet().getPage()) {
			for (final Place place : p.place()) {
				places.put(place.getId(), place);
			}
			for (final PlaceNode placeNode : p.fusionGroup()) {
				places.put(placeNode.getId(), placeNode);
			}
			for (final PlaceNode placeNode : p.portPlace()) {
				places.put(placeNode.getId(), placeNode);
			}
		}
		return places.get(id);
	}

	/**
	 * @param id
	 * @return
	 */
	public synchronized Transition getTransition(final String id) {
		if (getPetriNet() == null) { return null; }
		if (transitions != null) { return transitions.get(id); }
		transitions = new HashMap<String, Transition>();
		for (final Page p : getPetriNet().getPage()) {
			for (final Transition transition : p.transition()) {
				transitions.put(transition.getId(), transition);
			}
		}
		return transitions.get(id);
	}

	/**
	 * @param id
	 * @return
	 */
	public synchronized org.cpntools.accesscpn.model.Instance getInstance(final String id) {
		if (getPetriNet() == null) { return null; }
		if (instances != null) { return instances.get(id); }
		instances = new HashMap<String, org.cpntools.accesscpn.model.Instance>();
		for (final Page p : getPetriNet().getPage()) {
			for (final org.cpntools.accesscpn.model.Instance instance : p.instance()) {
				instances.put(instance.getId(), instance);
			}
		}
		return instances.get(id);
	}

	/**
	 * @return all places, including port and fusion places
	 */
	public synchronized List<PlaceNode> getAllPlaceNodes() {
		if (getPetriNet() == null) { return null; }
		if (allPlaceNodes != null) { return allPlaceNodes; }
		allPlaceNodes = new ArrayList<PlaceNode>();
		for (final Page page : getPetriNet().getPage()) {
			for (final Place p : page.place()) {
				allPlaceNodes.add(p);
			}
			for (final RefPlace p : page.fusionGroup()) {
				allPlaceNodes.add(p);
			}
			for (final RefPlace p : page.portPlace()) {
				allPlaceNodes.add(p);
			}
		}
		return allPlaceNodes;
	}

	private List<PlaceNode> allNonPorts = null;

	/**
	 * @return all places and fusion places
	 */
	public synchronized List<PlaceNode> getAllNonPortNodes() {
		if (getPetriNet() == null) { return null; }
		if (allNonPorts != null) { return allNonPorts; }
		allNonPorts = new ArrayList<PlaceNode>();
		for (final Page page : getPetriNet().getPage()) {
			for (final Place p : page.place()) {
				allNonPorts.add(p);
			}
			for (final RefPlace p : page.fusionGroup()) {
				allNonPorts.add(p);
			}
		}
		return allNonPorts;
	}

	private List<Place> allPlaces = null;

	/**
	 * @return all places
	 */
	public synchronized List<Place> getAllPlaces() {
		if (getPetriNet() == null) { return null; }
		if (allPlaces != null) { return allPlaces; }
		allPlaces = new ArrayList<Place>();
		for (final Page page : getPetriNet().getPage()) {
			for (final Place p : page.place()) {
				allPlaces.add(p);
			}
		}
		return allPlaces;
	}

	private List<Transition> allTransitions = null;

	/**
	 * @return all transitions, excluding instances/subst trans
	 */
	public synchronized List<Transition> getAllTransitions() {
		if (getPetriNet() == null) { return null; }
		if (allTransitions != null) { return allTransitions; }
		allTransitions = new ArrayList<Transition>();
		for (final Page page : getPetriNet().getPage()) {
			for (final Transition t : page.transition()) {
				allTransitions.add(t);
			}
		}
		return allTransitions;
	}

	private List<Instance<PlaceNode>> allPlaceNodeInstances = null;

	/**
	 * @return all instances of all places (including port and fusion)
	 */
	public synchronized List<Instance<PlaceNode>> getAllPlaceNodeInstances() {
		if (getPetriNet() == null) { return null; }
		if (allPlaceNodeInstances != null) { return allPlaceNodeInstances; }
		allPlaceNodeInstances = new ArrayList<Instance<PlaceNode>>();
		final ModelInstance modelInstance = (ModelInstance) ModelInstanceAdapterFactory.getInstance().adapt(
		        getPetriNet(), ModelInstance.class);
		for (final PlaceNode place : getAllPlaceNodes()) {
			allPlaceNodeInstances.addAll(modelInstance.getAllInstances(place));
		}
		return allPlaceNodeInstances;
	}

	private List<Instance<PlaceNode>> allNonPortInstances = null;

	/**
	 * @return all instances of all places (including port ad fusion)
	 */
	public synchronized List<Instance<PlaceNode>> getAllNonPortNodeInstances() {
		if (getPetriNet() == null) { return null; }
		if (allNonPortInstances != null) { return allNonPortInstances; }
		allNonPortInstances = new ArrayList<Instance<PlaceNode>>();
		final ModelInstance modelInstance = (ModelInstance) ModelInstanceAdapterFactory.getInstance().adapt(
		        getPetriNet(), ModelInstance.class);
		for (final PlaceNode place : getAllNonPortNodes()) {
			allNonPortInstances.addAll(modelInstance.getAllInstances(place));
		}
		return allNonPortInstances;
	}

	private List<Instance<Place>> allPlaceInstances = null;

	/**
	 * @return all instances of all places (including port ad fusion)
	 */
	public synchronized List<Instance<Place>> getAllPlaceInstances() {
		if (getPetriNet() == null) { return null; }
		if (allPlaceInstances != null) { return allPlaceInstances; }
		allPlaceInstances = new ArrayList<Instance<Place>>();
		final ModelInstance modelInstance = (ModelInstance) ModelInstanceAdapterFactory.getInstance().adapt(
		        getPetriNet(), ModelInstance.class);
		for (final Place place : getAllPlaces()) {
			allPlaceInstances.addAll(modelInstance.getAllInstances(place));
		}
		return allPlaceInstances;
	}

	private List<Instance<Transition>> allTransitionInstances = null;

	/**
	 * @return all instances of all transitions (excluding instances/subst)
	 */
	public synchronized List<Instance<Transition>> getAllTransitionInstances() {
		if (getPetriNet() == null) { return null; }
		if (allTransitionInstances != null) { return allTransitionInstances; }
		allTransitionInstances = new ArrayList<Instance<Transition>>();
		final ModelInstance modelInstance = (ModelInstance) ModelInstanceAdapterFactory.getInstance().adapt(
		        getPetriNet(), ModelInstance.class);
		for (final Transition transition : getAllTransitions()) {
			allTransitionInstances.addAll(modelInstance.getAllInstances(transition));
		}
		return allTransitionInstances;
	}

	private List<Instance<Page>> allPageInstances = null;

	/**
	 * @return all instances of all transitions (excluding instances/subst)
	 */
	public synchronized List<Instance<Page>> getAllPageInstances() {
		if (getPetriNet() == null) { return null; }
		if (allPageInstances != null) { return allPageInstances; }
		allPageInstances = new ArrayList<Instance<Page>>();
		final ModelInstance modelInstance = (ModelInstance) ModelInstanceAdapterFactory.getInstance().adapt(
		        getPetriNet(), ModelInstance.class);
		for (final Page page : getPetriNet().getPage()) {
			allPageInstances.addAll(modelInstance.getAllInstances(page));
		}
		return allPageInstances;
	}

	private Map<String, CPNType> allTypes = null;

	/**
	 * @param name
	 * @return
	 */
	public synchronized CPNType getType(final String name) {
		if (getPetriNet() == null) { return null; }
		if (allTypes != null) { return allTypes.get(name); }
		allTypes = new HashMap<String, CPNType>();
		for (final HLDeclaration declaration : getPetriNet().declaration()) {
			final DeclarationStructure structure = declaration.getStructure();
			if (structure != null && structure instanceof TypeDeclaration) {
				final TypeDeclaration typeDeclaration = (TypeDeclaration) structure;
				allTypes.put(typeDeclaration.getTypeName(), typeDeclaration.getSort());
			}
		}
		return allTypes.get(name);
	}

	private Map<PlaceNode, Boolean> timedPlaces = null;

	/**
	 * @param p
	 * @return
	 */
	public synchronized CPNType getType(final PlaceNode p) {
		if (getPetriNet() == null) { return null; }
		final Sort type = p.getSort();
		if (type == null) { return null; }
		final String typeText = type.getText();
		return getType(typeText);
	}

	/**
	 * @param pi
	 * @return
	 */
	public CPNType getType(final Instance<? extends PlaceNode> pi) {
		return getType(pi.getNode());
	}

	/**
	 * @param type
	 * @return
	 */
	public CPNType getRealType(final String type) {
		return getRealType(getType(type));
	}

	/**
	 * @param type
	 * @return
	 */
	public CPNType getRealType(final CPNType type) {
		return getRealType(type, true);
	}

	/**
	 * @param type
	 * @param traverseSubset
	 * @return
	 */
	public CPNType getRealType(final CPNType type, final boolean traverseSubset) {
		if (type instanceof CPNAlias) {
			final CPNAlias alias = (CPNAlias) type;
			return getRealType(getType(alias.getSort()), traverseSubset);
		}
		if (traverseSubset && type instanceof CPNSubset) {
			final CPNSubset subset = (CPNSubset) type;
			return getRealType(subset.getSort());
		}
		return type;
	}

	/**
	 * @param place
	 * @return
	 */
	public synchronized boolean isTimed(final PlaceNode place) {
		if (getPetriNet() == null) { return false; }
		if (timedPlaces == null) {
			timedPlaces = new HashMap<PlaceNode, Boolean>();
		}
		Boolean timed = timedPlaces.get(place);
		if (timed == null) {
			final CPNType cpnType = getType(place);
			if (cpnType == null) { return false; }
			timed = cpnType.getTimed();
			timedPlaces.put(place, timed);
		}
		return timed;

	}

	private Map<String, String> variableTypes = null;

	/**
	 * @param name
	 * @return
	 */
	public synchronized String getVariableTypeName(final String name) {
		if (getPetriNet() == null) { return null; }
		if (variableTypes != null) { return variableTypes.get(name); }
		variableTypes = new HashMap<String, String>();
		for (final HLDeclaration declaration : getPetriNet().declaration()) {
			final DeclarationStructure structure = declaration.getStructure();
			if (structure != null && structure instanceof VariableDeclaration) {
				final VariableDeclaration variableDeclaration = (VariableDeclaration) structure;
				for (final String variable : variableDeclaration.getVariables()) {
					variableTypes.put(variable, variableDeclaration.getTypeName());
				}
			}

		}
		return variableTypes.get(name);
	}

	/**
	 * @param name
	 * @return
	 */
	public synchronized CPNType getVariableType(final String name) {
		return getType(getVariableTypeName(name));
	}

	/**
	 * @param instance
	 * @return
	 */
	public boolean isTimed(final Instance<? extends PlaceNode> instance) {
		return isTimed(instance.getNode());
	}

	private Map<String, Page> pages = null;

	/**
	 * @param id
	 * @return
	 */
	public synchronized Page getPage(final String id) {
		if (getPetriNet() == null) { return null; }
		if (pages != null) { return pages.get(id); }
		pages = new HashMap<String, Page>();
		for (final Page p : getPetriNet().getPage()) {
			pages.put(p.getId(), p);
		}
		return pages.get(id);
	}

	/**
	 * @param id
	 * @return
	 */
	public Node getNode(final String id) {
		final PlaceNode place = getPlace(id);
		if (place != null) { return place; }
		final org.cpntools.accesscpn.model.Instance instance = getInstance(id);
		if (instance != null) { return instance; }
		final Transition transition = getTransition(id);
		if (transition != null) { return transition; }
		return null;
	}
}
