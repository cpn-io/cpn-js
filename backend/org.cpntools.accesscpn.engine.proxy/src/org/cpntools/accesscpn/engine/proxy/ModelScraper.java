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
package org.cpntools.accesscpn.engine.proxy;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.cpntools.accesscpn.engine.highlevel.HighLevelSimulator;
import org.cpntools.accesscpn.engine.highlevel.PacketInspector;
import org.cpntools.accesscpn.engine.highlevel.checker.Checker;
import org.cpntools.accesscpn.engine.highlevel.checker.ErrorInitializingSMLInterface;
import org.cpntools.accesscpn.engine.protocol.Packet;
import org.cpntools.accesscpn.model.Arc;
import org.cpntools.accesscpn.model.Code;
import org.cpntools.accesscpn.model.Condition;
import org.cpntools.accesscpn.model.FusionGroup;
import org.cpntools.accesscpn.model.HLAnnotation;
import org.cpntools.accesscpn.model.HLArcType;
import org.cpntools.accesscpn.model.HLDeclaration;
import org.cpntools.accesscpn.model.HLMarking;
import org.cpntools.accesscpn.model.HasName;
import org.cpntools.accesscpn.model.Instance;
import org.cpntools.accesscpn.model.ModelFactory;
import org.cpntools.accesscpn.model.Name;
import org.cpntools.accesscpn.model.Page;
import org.cpntools.accesscpn.model.ParameterAssignment;
import org.cpntools.accesscpn.model.PetriNet;
import org.cpntools.accesscpn.model.Place;
import org.cpntools.accesscpn.model.PlaceNode;
import org.cpntools.accesscpn.model.Priority;
import org.cpntools.accesscpn.model.RefPlace;
import org.cpntools.accesscpn.model.Sort;
import org.cpntools.accesscpn.model.Time;
import org.cpntools.accesscpn.model.Transition;
import org.cpntools.accesscpn.model.cpntypes.CPNAlias;
import org.cpntools.accesscpn.model.cpntypes.CPNBool;
import org.cpntools.accesscpn.model.cpntypes.CPNEnum;
import org.cpntools.accesscpn.model.cpntypes.CPNIndex;
import org.cpntools.accesscpn.model.cpntypes.CPNInt;
import org.cpntools.accesscpn.model.cpntypes.CPNList;
import org.cpntools.accesscpn.model.cpntypes.CPNProduct;
import org.cpntools.accesscpn.model.cpntypes.CPNRecord;
import org.cpntools.accesscpn.model.cpntypes.CPNString;
import org.cpntools.accesscpn.model.cpntypes.CPNSubset;
import org.cpntools.accesscpn.model.cpntypes.CPNType;
import org.cpntools.accesscpn.model.cpntypes.CPNUnion;
import org.cpntools.accesscpn.model.cpntypes.CPNUnit;
import org.cpntools.accesscpn.model.cpntypes.CpntypesFactory;
import org.cpntools.accesscpn.model.declaration.DeclarationFactory;
import org.cpntools.accesscpn.model.declaration.DeclarationStructure;
import org.cpntools.accesscpn.model.declaration.GlobalReferenceDeclaration;
import org.cpntools.accesscpn.model.declaration.MLDeclaration;
import org.cpntools.accesscpn.model.declaration.TypeDeclaration;
import org.cpntools.accesscpn.model.declaration.UseDeclaration;
import org.cpntools.accesscpn.model.declaration.VariableDeclaration;
import org.eclipse.emf.ecore.EObject;

/**
 * @author michael
 */
public class ModelScraper extends PacketInspector {
	private final PetriNet petriNet;
	Map<String, Page> pages;
	Map<String, FusionGroup> fusionGroups;
	Map<String, Set<String>> portPlaces;

	boolean fullyLoaded = false;
	private Exception e;

	/**
	 * @param simulator
	 */
	public ModelScraper(final HighLevelSimulator simulator) {
		super(simulator);
		petriNet = ModelFactory.INSTANCE.createPetriNet();
		pages = new HashMap<String, Page>();
		fusionGroups = new HashMap<String, FusionGroup>();
		portPlaces = new HashMap<String, Set<String>>();
		attach();
	}

	@Override
	protected void handleSimulatePacket(final Packet packet) {
		packet.reset();
		packet.getInteger();
		final int subcommand = packet.getInteger();
		if (subcommand == 5) {
			new Thread() {
				@Override
				public void run() {
					((EObject) petriNet).eAdapters().add(simulator);
					try {
						final Checker checker = new Checker(petriNet, null, simulator);
						checker.generateSerializers();
						checker.instantiateSMLInterface();
					} catch (final ErrorInitializingSMLInterface e) {
						// e.getException().printStackTrace();
						// ModelScraper.this.e = e;
					} catch (final Exception e) {
						ModelScraper.this.e = e;
					}
					fullyLoaded = true;
				}
			}.start();
		}
	}

	@Override
	@SuppressWarnings("unused")
	protected void handleSyntaxPacket(final Packet packet) throws Exception {
		packet.reset();
		packet.getInteger();
		final int subcommand = packet.getInteger();
		if (subcommand == 2) {
			packet.getBoolean(); // isIncludedInSim
			final Page page = ModelFactory.INSTANCE.createPage();
			petriNet.getPage().add(page);
			page.setId(packet.getString());
			setName(page, packet.getString());
			packet.getInteger(); // prime multiplicity

			if (pages.containsKey(page.getId())) { throw new Exception(
			        "Right now the scraper cannot handle incremental updates. Please don't change the model."); }

			for (int i = packet.getInteger(); i > 0; i--) { // checked places
				packet.getString();
				throw new Exception(
				        "Right now the scraper cannot handle incremental updates. Please don't change the model.");
			}
			for (int i = packet.getInteger(); i > 0; i--) { // checked trans
				packet.getString();
				throw new Exception(
				        "Right now the scraper cannot handle incremental updates. Please don't change the model.");
			}

			final Map<String, PlaceNode> places = new HashMap<String, PlaceNode>();
			for (int i = packet.getInteger(); i > 0; i--) { // unchecked places (+ inst fusion)
				final PlaceNode p;
				final String id = packet.getString();
				if (shouldBePort(page.getId(), id)) {
					p = ModelFactory.INSTANCE.createRefPlace();
				} else {
					p = ModelFactory.INSTANCE.createPlace();
				}
				p.setId(id);
				setName(p, packet.getString());
				final Sort type = ModelFactory.INSTANCE.createSort();
				type.setText(packet.getString());
				p.setSort(type);
				final HLMarking initmark = ModelFactory.INSTANCE.createHLMarking();
				initmark.setText(packet.getString());
				p.setInitialMarking(initmark);
				p.setPage(page);
				places.put(p.getId(), p);
			}

			for (int i = packet.getInteger(); i > 0; i--) { // unchecked (page fusion +) global
				// fusion
				final RefPlace p = ModelFactory.INSTANCE.createRefPlace();
				p.setId(packet.getString());
				final String fusionId = packet.getString();
				FusionGroup fusionGroup = fusionGroups.get(fusionId);
				if (fusionGroup == null) {
					fusionGroup = ModelFactory.INSTANCE.createFusionGroup();
					fusionGroup.setId(fusionId);
					fusionGroup.setPetriNet(petriNet);
					fusionGroups.put(fusionId, fusionGroup);
				}
				p.setRef(fusionGroup);
				setName(p, packet.getString());
				final Sort type = ModelFactory.INSTANCE.createSort();
				type.setText(packet.getString());
				p.setSort(type);
				final HLMarking initmark = ModelFactory.INSTANCE.createHLMarking();
				initmark.setText(packet.getString());
				p.setInitialMarking(initmark);
				p.setPage(page);
				places.put(p.getId(), p);
			}

			for (int i = packet.getInteger(); i > 0; i--) { // unchecked subst trans
				final Instance inst = ModelFactory.INSTANCE.createInstance();
				inst.setId(packet.getString());
				setName(inst, packet.getString());
				inst.setSubPageID(packet.getString());
				for (int j = packet.getInteger(); j > 0; j--) { // # assignments
					final ParameterAssignment param = ModelFactory.INSTANCE.createParameterAssignment();
					param.setValue(packet.getString());
					param.setParameter(packet.getString());
					param.setInstance(inst);
					makePortPlace(inst.getSubPageID(), param.getValue());
				}
				inst.setPage(page);
			}

			for (int i = packet.getInteger(); i > 0; i--) { // unchecked transitions
				final Transition t = ModelFactory.INSTANCE.createTransition();
				t.setId(packet.getString());
				setName(t, packet.getString());

				final Condition guard = ModelFactory.INSTANCE.createCondition();
				guard.setText(packet.getString());
				t.setCondition(guard);

				final Time time = ModelFactory.INSTANCE.createTime();
				time.setText(packet.getString());
				t.setTime(time);

				final Code code = ModelFactory.INSTANCE.createCode();
				code.setText(packet.getString());
				t.setCode(code);

				t.setPage(page);

				packet.getString(); // channel

				final Priority priority = ModelFactory.INSTANCE.createPriority();
				priority.setText(packet.getString());
				t.setPriority(priority);

				packet.getBoolean(); // controllable

				for (int j = packet.getInteger(); j > 0; j--) { // # input arcs (PtoT)
					final Arc arc = ModelFactory.INSTANCE.createArc();
					arc.setId(packet.getString());
					arc.setSource(places.get(packet.getString()));
					arc.setTarget(t);
					final HLAnnotation expr = ModelFactory.INSTANCE.createHLAnnotation();
					expr.setText(packet.getString());
					arc.setHlinscription(expr);
					arc.setKind(HLArcType.NORMAL);
					arc.setPage(page);
				}
				for (int j = packet.getInteger(); j > 0; j--) { // # output arcs (TtoP)
					final Arc arc = ModelFactory.INSTANCE.createArc();
					arc.setId(packet.getString());
					arc.setTarget(places.get(packet.getString()));
					arc.setSource(t);
					final HLAnnotation expr = ModelFactory.INSTANCE.createHLAnnotation();
					expr.setText(packet.getString());
					arc.setHlinscription(expr);
					arc.setKind(HLArcType.NORMAL);
					arc.setPage(page);
				}
				for (int j = packet.getInteger(); j > 0; j--) { // # double arcs
					final Arc arc = ModelFactory.INSTANCE.createArc();
					arc.setId(packet.getString());
					arc.setSource(places.get(packet.getString()));
					arc.setTarget(t);
					final HLAnnotation expr = ModelFactory.INSTANCE.createHLAnnotation();
					expr.setText(packet.getString());
					arc.setHlinscription(expr);
					arc.setKind(HLArcType.TEST);
					arc.setPage(page);
				}
			}
			pages.put(page.getId(), page);
		}
	}

	private Set<String> getPortPlaces(final String page) {
		Set<String> result = portPlaces.get(page);
		if (result == null) {
			result = new HashSet<String>();
			portPlaces.put(page, result);
		}
		return result;
	}

	private boolean shouldBePort(final String pageId, final String placeId) {
		return getPortPlaces(pageId).contains(placeId);
	}

	private void makePortPlace(final String pageId, final String placeId) {
		if (shouldBePort(pageId, placeId)) { return; }
		getPortPlaces(pageId).add(placeId);

		final Page page = pages.get(pageId);
		if (page == null) { return; }

		Place place = null;
		for (final Place p : page.place()) {
			if (placeId.equals(p.getId())) {
				place = p;
				break;
			}
		}
		if (place == null) { return; }

		final RefPlace refPlace = ModelFactory.INSTANCE.createRefPlace();
		refPlace.setId(place.getId());
		refPlace.setSort(place.getSort());
		refPlace.setInitialMarking(place.getInitialMarking());
		refPlace.setName(place.getName());
		refPlace.setPage(page);
		place.setPage(null);

		final List<Arc> arcs = new ArrayList<Arc>();
		arcs.addAll(place.getSourceArc());
		for (final Arc arc : arcs) {
			arc.setSource(refPlace);
		}
		arcs.clear();
		arcs.addAll(place.getTargetArc());
		for (final Arc arc : arcs) {
			arc.setTarget(refPlace);
		}
	}

	@Override
	protected void handleDeclPacket(final Packet packet) {
		packet.reset();
		packet.getInteger();
		final int subcommand = packet.getInteger();
		if (subcommand == 1) {
			final HLDeclaration declaration = ModelFactory.INSTANCE.createHLDeclaration();
			declaration.setId(packet.getString());
			petriNet.getLabel().add(declaration);
			final int type = packet.getInteger();
			int vars, msvars, aliases, declares, extra = 0;
			switch (type) {
			case 6:
			case 9:
			case 10:
			case 11:
			case 13:
				extra = packet.getInteger();
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 7:
			case 8:
			case 12:
			case 14:
			case 15:
				vars = packet.getInteger();
				msvars = packet.getInteger();
				aliases = packet.getInteger();
				declares = packet.getInteger();
				assert vars == 0;
				assert msvars == 0;
				declaration.setStructure(createColor(type, vars, msvars, aliases, declares, extra, packet));
				break;
			case 16: {
				final GlobalReferenceDeclaration globalReferenceDeclaration = DeclarationFactory.INSTANCE
				        .createGlobalReferenceDeclaration();
				globalReferenceDeclaration.setName(packet.getString());
				globalReferenceDeclaration.setValue(packet.getString());
				declaration.setStructure(globalReferenceDeclaration);
			}

				break;
			case 17: {
				final UseDeclaration useDeclaration = DeclarationFactory.INSTANCE.createUseDeclaration();
				useDeclaration.setFileName(packet.getString());
				declaration.setStructure(useDeclaration);
			}

				break;
			case 18: {
				final MLDeclaration mlDeclaration = DeclarationFactory.INSTANCE.createMLDeclaration();
				mlDeclaration.setCode(packet.getString());
				declaration.setStructure(mlDeclaration);
			}

				break;
			case 20: {
				final VariableDeclaration variableDeclaration = DeclarationFactory.INSTANCE.createVariableDeclaration();
				variableDeclaration.setTypeName(packet.getString());
				for (int i = packet.getInteger(); i > 0; i--) {
					variableDeclaration.addVariable(packet.getString());
				}
				declaration.setStructure(variableDeclaration);
			}

				break;
			case 21:
			case 23:
			case 24:
			case 25:
			case 26:
				assert false;
				break;
			case 22: {
				assert packet.getInteger() == 1;
				declaration.setStructure(createColor(22, 0, 0, 0, 0, 0, packet));
			}

				break;
			}
		}
	}

	private DeclarationStructure createColor(final int code, final int vars, final int msvars, final int aliases,
	        final int declares, final int extra, final Packet packet) {
		final TypeDeclaration typeDeclaration = DeclarationFactory.INSTANCE.createTypeDeclaration();
		CPNType type = null;
		switch (code) {
		case 1: {
			final CPNUnit unit = CpntypesFactory.INSTANCE.createCPNUnit();
			unit.setId(packet.getString());
			type = unit;
		}

			break;
		case 2: {
			final CPNBool bool = CpntypesFactory.INSTANCE.createCPNBool();
			bool.setFalseValue(packet.getString());
			bool.setTrueValue(packet.getString());
			type = bool;
		}

			break;
		case 3: {
			final CPNInt integer = CpntypesFactory.INSTANCE.createCPNInt();
			integer.setLow(packet.getString());
			integer.setHigh(packet.getString());
			type = integer;
		}

			break;
		case 5: {
			final CPNString string = CpntypesFactory.INSTANCE.createCPNString();
			string.setLengthLow(packet.getString());
			string.setLengthHigh(packet.getString());
			string.setRangeLow(packet.getString());
			string.setRangeHigh(packet.getString());
			type = string;
		}

			break;
		case 6: {
			final CPNEnum with = CpntypesFactory.INSTANCE.createCPNEnum();
			for (int i = 0; i < extra; i++) {
				with.getValues().add(packet.getString());
			}
			type = with;
		}

			break;
		case 7: {
			final CPNIndex index = CpntypesFactory.INSTANCE.createCPNIndex();
			index.setName(packet.getString());
			index.setLow(packet.getString());
			index.setHigh(packet.getString());
			type = index;
		}

			break;
		case 8: {
			final CPNList list = CpntypesFactory.INSTANCE.createCPNList();
			list.setSort(packet.getString());
			list.setLow(packet.getString());
			list.setHigh(packet.getString());
			type = list;
		}

			break;
		case 9: {
			final CPNProduct product = CpntypesFactory.INSTANCE.createCPNProduct();
			for (int i = 0; i < extra; i++) {
				product.addSort(packet.getString());
			}
			type = product;
		}

			break;
		case 10: {
			final CPNRecord record = CpntypesFactory.INSTANCE.createCPNRecord();
			for (int i = 0; i < extra; i++) {
				record.addValue(packet.getString(), packet.getString());
			}
			type = record;
		}

			break;
		case 11: {
			final CPNUnion union = CpntypesFactory.INSTANCE.createCPNUnion();
			for (int i = 0; i < extra; i++) {
				union.addValue(packet.getString(), packet.getString());
			}
			type = union;
		}

			break;
		case 12: {
			final CPNSubset subset = CpntypesFactory.INSTANCE.createCPNSubset();
			subset.setSort(packet.getString());
			subset.setBy(packet.getString());
			type = subset;
		}

			break;
		case 15:
		case 22: {
			final CPNAlias alias = CpntypesFactory.INSTANCE.createCPNAlias();
			alias.setSort(packet.getString());
			type = alias;
		}
			break;
		case 4:
		case 13:
		case 14:
			assert false;
			break;
		}
		assert type != null;
		if (code < 22) {
			type.setTimed(packet.getBoolean());
		}
		typeDeclaration.setSort(type);
		typeDeclaration.setTypeName(packet.getString());
		assert vars == 0;
		assert msvars == 0;
		assert aliases == 0;
		for (int i = 0; i < aliases; i++) {
			type.addDeclare(packet.getString());
		}
		return typeDeclaration;
	}

	@Override
	protected void handleMiscPacket(final Packet packet) {
		packet.reset();
		packet.getInteger();
		final int subcommand = packet.getInteger();
		if (subcommand == 9) {
			setName(petriNet, packet.getString().replaceAll("[.]cpn$", ""));
		}
	}

	private void setName(final HasName h, final String name) {
		Name n = h.getName();
		if (n == null) {
			n = ModelFactory.INSTANCE.createName();
			h.setName(n);
		}
		n.setText(name);
	}

	/**
	 * @return
	 * @throws Exception
	 */
	public PetriNet getPetriNet() throws Exception {
		if (e != null) { throw e; }
		if (fullyLoaded) { return petriNet; }
		return null;
	}

}
