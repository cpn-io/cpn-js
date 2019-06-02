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

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.cpntools.accesscpn.engine.highlevel.HighLevelSimulator.Bindings;
import org.cpntools.accesscpn.engine.highlevel.instance.Binding;
import org.cpntools.accesscpn.engine.protocol.Packet;
import org.cpntools.accesscpn.model.Arc;
import org.cpntools.accesscpn.model.HLArcType;
import org.cpntools.accesscpn.model.HLDeclaration;
import org.cpntools.accesscpn.model.Instance;
import org.cpntools.accesscpn.model.Node;
import org.cpntools.accesscpn.model.Page;
import org.cpntools.accesscpn.model.ParameterAssignment;
import org.cpntools.accesscpn.model.Place;
import org.cpntools.accesscpn.model.PlaceNode;
import org.cpntools.accesscpn.model.RefPlace;
import org.cpntools.accesscpn.model.TimeType;
import org.cpntools.accesscpn.model.Transition;
import org.cpntools.accesscpn.model.TransitionNode;
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
import org.cpntools.accesscpn.model.cpntypes.CPNUnion;
import org.cpntools.accesscpn.model.cpntypes.CPNUnit;
import org.cpntools.accesscpn.model.cpntypes.NameTypePair;
import org.cpntools.accesscpn.model.cpntypes.util.CpntypesSwitch;
import org.cpntools.accesscpn.model.declaration.DeclarationStructure;
import org.cpntools.accesscpn.model.declaration.GlobalReferenceDeclaration;
import org.cpntools.accesscpn.model.declaration.MLDeclaration;
import org.cpntools.accesscpn.model.declaration.TypeDeclaration;
import org.cpntools.accesscpn.model.declaration.UseDeclaration;
import org.cpntools.accesscpn.model.declaration.VariableDeclaration;
import org.cpntools.accesscpn.model.declaration.util.DeclarationSwitch;
import org.cpntools.accesscpn.model.monitors.Monitor;
import org.eclipse.emf.ecore.EObject;

/**
 * @author mw
 */
public class PacketGenerator {
	/**
	 * 
	 */
	public static final PacketGenerator instance = new PacketGenerator();

	private PacketGenerator() {
		// Hide constructor
	}

	/**
	 * @param decl
	 *            decl to check
	 * @return packet for checking decl
	 */
	public Packet constructCheckDeclaration(final HLDeclaration decl) {
		final DeclarationStructure structure = decl.getStructure();
		final Packet p = new Packet(300);
		p.addInteger(1);
		p.addString(decl.getId()); // id

		return new DeclarationSwitch<Packet>() {
			@Override
			public Packet caseGlobalReferenceDeclaration(final GlobalReferenceDeclaration globref) {
				return constructGlobalReferenceDeclaration(p, globref);
			}

			@Override
			public Packet caseMLDeclaration(final MLDeclaration mldecl) {
				return constructMLDeclaration(p, mldecl);
			}

			@Override
			public Packet caseTypeDeclaration(final TypeDeclaration typeDeclaration) {
				return constructTypeDeclaration(p, typeDeclaration);
			}

			@Override
			public Packet caseUseDeclaration(final UseDeclaration use) {
				return constructUseDeclaration(p, use);
			}

			@Override
			public Packet caseVariableDeclaration(final VariableDeclaration var) {
				return constructVariableDeclaration(p, var);
			}

		}.doSwitch((EObject) structure);
	}

	/**
	 * @param page
	 *            page to check
	 * @param prime
	 *            whether the page is prime
	 * @return package to check page
	 */
	public Packet constructCheckPage(final Page page, final boolean prime) {
		final Packet p = new Packet(400);
		p.addInteger(2);

		p.addString(page.getId());
		p.addString(Util.mlEscape(page.getName().getText()));
		constructIsPrime(p, prime);
		constructIsIncludedInSim(p);
		constructCheckedPlaces(p);
		constructCheckedTransitions(p);

		// Here we ignore unchecked instance fusion places
		constructUncheckedPlacesAndCount(p, page.readyPlaces(), page.readyPortPlaces());

		// Here we ignore unchecked page fusion places
		constructUncheckedGlobalFusionPlacesAndCount(p, page.readyFusionGroups());

		constructUncheckedSubstitutionTransitionsAndCount(p, page.readyInstances());

		constructUncheckedTransitionsAndCount(p, page.readyTransitions());

		return p;
	}

	/**
	 * @param id
	 *            id of fusion group
	 * @return packet to generate instances for fusion group
	 */
	public Packet constructGenerateInstanceForFusionGroup(final String id) {
		return constructGenerateInstanceForPlace(id);
	}

	/**
	 * @param id
	 *            id of place
	 * @return packet to generate instances for place
	 */
	public Packet constructGenerateInstanceForPlace(final String id) {
		final Packet p = new Packet(500);
		p.addInteger(3);
		p.addBoolean(false); // create instance form scratch
		p.addInteger(1); // # places
		p.addInteger(0); // # refs ?
		p.addInteger(0); // # transitions
		p.addString(id);
		return p;
	}

	/**
	 * @param id
	 *            id of transition
	 * @return packet to generate instances of transition
	 */
	public Packet constructGenerateInstanceForTransition(final String id) {
		final Packet p = new Packet(500);
		p.addInteger(3);
		p.addBoolean(false); // create instance form scratch
		p.addInteger(0); // # places
		p.addInteger(0); // # refs ?
		p.addInteger(1); // # transitions
		p.addString(id);
		return p;
	}

	/**
	 * @return packet to generate all instances
	 */
	public Packet constructGenerateInstances() {
		final Packet p = new Packet(500);
		p.addInteger(1);
		return p;
	}

	/**
	 * @return packet to initialise scheduler
	 */
	public Packet constructInitialiseSimulationScheduler() {
		final Packet p = new Packet(500);
		p.addInteger(5);
		return p;
	}

	/**
	 * @return a packet
	 */
	public Packet constructInitialize(final TimeType timeType) {
		final Packet p = new Packet(100);
		String time = "IntInf";
		if (timeType == TimeType.REAL) {
			time = "Real";
		}
		p.addString(time.toLowerCase());
		p.addString(time + ".fromInt 0"); //$NON-NLS-1$
		p.addString("accesscpndump.sml"); //$NON-NLS-1$
		return p;
	}

	/**
	 * @return packet to initialise syntax check
	 */
	public Packet constructInitializeSyntaxCheck() {
		final Packet p = new Packet(400);
		p.addInteger(1);
		return p;
	}

	/**
	 * @param resetRan
	 *            parameter
	 * @param resetRef
	 *            parameter
	 * @param randomSeed
	 *            parameter
	 * @return packet to set simulation options with given parameters
	 */
	public Packet constructSetInitializationSimulationOptions(final boolean resetRan, final boolean resetRef,
	        final int randomSeed) {
		final Packet p = new Packet(200);
		p.addInteger(11);
		p.addBoolean(resetRan);
		p.addBoolean(resetRef);
		p.addString(Integer.toString(randomSeed));
		return p;
	}

	/**
	 * @param pausebefore
	 *            parameter
	 * @param pauseafter
	 *            parameter
	 * @param pauseshow
	 *            parameter
	 * @param reporttrans
	 *            parameter
	 * @param reportbinds
	 *            parameter
	 * @param showmarking
	 *            parameter
	 * @param showenabling
	 *            parameter
	 * @param untilstep
	 *            parameter
	 * @param addstep
	 *            parameter
	 * @param untiltime
	 *            parameter
	 * @param addtime
	 *            parameter
	 * @param pausecont
	 *            parameter
	 * @param reportfunc
	 *            parameter
	 * @param globalFairness
	 * @param fairBE
	 * @return packet to set simulation options to given parameters
	 */
	public Packet constructSetSimulationOptions(final boolean pausebefore, final boolean pauseafter,
	        final boolean pauseshow, final boolean reporttrans, final boolean reportbinds, final boolean showmarking,
	        final boolean showenabling, final String untilstep, final String addstep, final String untiltime,
	        final String addtime, final String pausecont, final String reportfunc, final boolean fairBE,
	        final boolean globalFairness) {
		final Packet p = new Packet(200);
		p.addInteger(10);
		p.addBoolean(pausebefore);
		p.addBoolean(pauseafter);
		p.addBoolean(pauseshow);
		p.addBoolean(reporttrans);
		p.addBoolean(reportbinds);
		p.addBoolean(showmarking);
		p.addBoolean(showenabling);
		p.addString(untilstep);
		p.addString(addstep);
		p.addString(untiltime);
		p.addString(addtime);
		p.addString(pausecont);
		p.addString(reportfunc);
		p.addBoolean(fairBE);
		p.addBoolean(globalFairness);
		return p;
	}

	private void constructCheckedPlaces(final Packet p) {
		p.addInteger(0); // Checked places
	}

	private void constructCheckedTransitions(final Packet p) {
		p.addInteger(0); // Checked transitions
	}

	private void constructIsIncludedInSim(final Packet p) {
		p.addBoolean(true); // isIncludedInSim
	}

	private void constructIsPrime(final Packet p, final boolean prime) {
		if (prime) {
			p.addInteger(1);
		} else {
			p.addInteger(0);
		}
	}

	private void constructUncheckedGlobalFusionPlacesAndCount(final Packet p, final Iterable<RefPlace> refplaceIterable) {
		int count = 0;
		for (final RefPlace refplace : refplaceIterable) {
			final RefPlace refPlace = refplace;
			p.addString(refPlace.getId());
			p.addString(refPlace.getRef().getId());
			p.addString(Util.mlEscape(refPlace.getName().getText()));
			p.addString(refPlace.getSort().getText());
			p.addString(Util.emptyOrNull(refPlace.getInitialMarking().getText()));

			count++;
		}
		p.addInteger(count);
	}

	private void constructUncheckedPlacesAndCount(final Packet p, final Iterable<Place> placeIterable,
	        final Iterable<RefPlace> portPlaceIterable) {
		int count = 0;
		for (final Place place : placeIterable) {
			p.addString(place.getId());
			try {
				p.addString(Util.mlEscape(place.getName().getText()));
			} catch (final NullPointerException e) {
				throw new RuntimeException("Place with id " + place.getId()
				        + " does not have a name.  Make sure all places have a unique name.");
			}
			p.addString(place.getSort().getText());
			p.addString(Util.emptyOrNull(place.getInitialMarking().getText()));

			count++;
		}

		for (final RefPlace refPlace : portPlaceIterable) {
			p.addString(refPlace.getId());
			try {
				p.addString(Util.mlEscape(refPlace.getName().getText()));
			} catch (final NullPointerException e) {
				throw new RuntimeException("Place with id " + refPlace.getId()
				        + " does not have a name.  Make sure all places have a unique name.");
			}
			p.addString(refPlace.getSort().getText());
			p.addString(Util.emptyOrNull(refPlace.getInitialMarking().getText()));

			count++;
		}

		p.addInteger(count);
	}

	private void constructUncheckedSubstitutionTransitionsAndCount(final Packet p,
	        final Iterable<Instance> instanceIterable) {
		int count = 0;

		for (@SuppressWarnings("unused")
		final Instance inst : instanceIterable) {
			count++;
		}
		p.addInteger(count);

		for (final Instance inst : instanceIterable) {
			p.addString(inst.getId());
			try {
				p.addString(Util.mlEscape(inst.getName().getText()));
			} catch (final NullPointerException e) {
				throw new RuntimeException("Transition with id " + inst.getId()
				        + " does not have a name.  Make sure all transitions have a unique name.");
			}

			p.addString(inst.getSubPageID());
			int paCount = 0;
			for (final ParameterAssignment pa : inst.getParameterAssignment()) {
				p.addString(pa.getValue()); // Port
				p.addString(pa.getParameter()); // Socket
				paCount++;
			}
			p.addInteger(paCount);
		}
	}

	private void constructUncheckedTransitionsAndCount(final Packet p, final Iterable<Transition> transitionIterable) {
		int count = 0;
		for (@SuppressWarnings("unused")
		final Transition transition : transitionIterable) {
			count++;
		}
		p.addInteger(count);

		for (final Transition transition : transitionIterable) {
			p.addString(transition.getId());
			try {
				p.addString(Util.mlEscape(transition.getName().getText()));
			} catch (final NullPointerException e) {
				throw new RuntimeException("Transition with id " + transition.getId()
				        + " does not have a name.  Make sure all transitions have a unique name.");
			}
			p.addString(Util.emptyOrNull(transition.getCondition().getText()));
			p.addString(Util.emptyOrNull(transition.getTime().getText()));
			p.addString(Util.emptyOrNull(transition.getCode().getText()));
			p.addString(""); // Channel - not supported
			p.addString(Util.emptyOrNull(transition.getPriority().getText()));
			p.addBoolean(true); // Controllable

			final ArrayList<Arc> inOutArcs = new ArrayList<Arc>();
			final ArrayList<Arc> inhibitorArcs = new ArrayList<Arc>();
			final ArrayList<Arc> resetArcs = new ArrayList<Arc>();
			int countInputArcs = 0;

			for (final Arc arc : transition.getTargetArc()) {
				if (arc.getKind() == HLArcType.NORMAL) {
					// The arc is only an input arc
					p.addString(arc.getId());
					p.addString(arc.getOtherEnd(transition).getId());
					p.addString(arc.getHlinscription().getText());

					countInputArcs++;
				} else if (arc.getKind() == HLArcType.TEST) {
					// The arc is an input/output arc
					inOutArcs.add(arc);
				} else if (arc.getKind() == HLArcType.INHIBITOR) {
					// The arc is an input/output arc
					inhibitorArcs.add(arc);
				} else if (arc.getKind() == HLArcType.RESET) {
					// The arc is an input/output arc
					resetArcs.add(arc);
				} else {
					assert false;
				}
			}
			p.addInteger(countInputArcs);

			int countOutputArcs = 0;
			for (final Arc arc : transition.getSourceArc()) {
				if (arc.getKind() == HLArcType.NORMAL) {
					// The arc is only an output arc
					p.addString(arc.getId());
					p.addString(arc.getOtherEnd(transition).getId());
					p.addString(arc.getHlinscription().getText());

					countOutputArcs++;
				} else if (arc.getKind() == HLArcType.TEST) {
					// The arc is an input/output arc
					inOutArcs.add(arc);
				} else if (arc.getKind() == HLArcType.INHIBITOR) {
					// The arc is an input/output arc
					inhibitorArcs.add(arc);
				} else if (arc.getKind() == HLArcType.RESET) {
					// The arc is an input/output arc
					resetArcs.add(arc);
				}
			}
			p.addInteger(countOutputArcs);

			for (final Arc arc : inOutArcs) {
				p.addString(arc.getId());
				p.addString(arc.getOtherEnd(transition).getId());
				p.addString(arc.getHlinscription().getText());
			}
			p.addInteger(inOutArcs.size());
			for (final Arc arc : inhibitorArcs) {
				p.addString(arc.getId());
				p.addString(arc.getOtherEnd(transition).getId());
				p.addString("");
			}
			p.addInteger(inhibitorArcs.size());
			for (final Arc arc : resetArcs) {
				p.addString(arc.getId());
				p.addString(arc.getOtherEnd(transition).getId());
				p.addString("");
			}
			p.addInteger(resetArcs.size());
		}
	}

	protected Packet constructCPNAlias(final Packet p, final CPNAlias cpnalias) {
		p.addInteger(15);
		p.addString(cpnalias.getSort());
		return p;
	}

	protected Packet constructCPNBool(final Packet p, final CPNBool cpnbool) {
		p.addInteger(2);
		p.addString(Util.emptyOrNull(cpnbool.getFalseValue())); // low
		p.addString(Util.emptyOrNull(cpnbool.getTrueValue())); // high
		return p;
	}

	protected Packet constructCPNEnum(final Packet p, final CPNEnum cpnenum) {
		p.addInteger(6);
		p.addInteger(cpnenum.getValues().size());
		for (final String value : cpnenum.getValues()) {
			p.addString(value); // enums
		}
		return p;
	}

	protected Packet constructCPNIndex(final Packet p, final CPNIndex cpnindex) {
		p.addInteger(7);
		p.addString(cpnindex.getName()); // idx
		p.addString(cpnindex.getLow()); // low
		p.addString(cpnindex.getHigh()); // high
		return p;
	}

	protected Packet constructCPNInt(final Packet p, final CPNInt cpnint) {
		p.addInteger(3);
		p.addString(Util.emptyOrNull(cpnint.getLow())); // low
		p.addString(Util.emptyOrNull(cpnint.getHigh())); // high
		return p;
	}

	protected Packet constructCPNReal(final Packet p, final CPNReal cpnint) {
		p.addInteger(4);
		p.addString(Util.emptyOrNull(cpnint.getLow())); // low
		p.addString(Util.emptyOrNull(cpnint.getHigh())); // high
		return p;
	}

	protected Packet constructCPNTime(final Packet p, final CPNTime cpnint) {
		p.addInteger(14);
		return p;
	}

	protected Packet constructCPNIntInf(final Packet p, final CPNIntInf cpnint) {
		p.addInteger(24);
		p.addString(Util.emptyOrNull(cpnint.getLow())); // low
		p.addString(Util.emptyOrNull(cpnint.getHigh())); // high
		return p;
	}

	protected Packet constructCPNList(final Packet p, final CPNList cpnlist) {
		p.addInteger(8);
		p.addString(cpnlist.getSort()); // cs
		p.addString(Util.emptyOrNull(cpnlist.getLow())); // min
		p.addString(Util.emptyOrNull(cpnlist.getHigh())); // max
		return p;
	}

	protected Packet constructCPNProduct(final Packet p, final CPNProduct cpnproduct) {
		p.addInteger(9);
		p.addInteger(cpnproduct.getTypes().size());
		for (final String type : cpnproduct.getTypes()) {
			p.addString(type); // comps
		}
		return p;
	}

	protected Packet constructCPNRecord(final Packet p, final CPNRecord cpnrecord) {
		p.addInteger(10);
		p.addInteger(cpnrecord.getValues().size());
		for (final NameTypePair pair : cpnrecord.getValues()) {
			p.addString(pair.getName()); // comps
			p.addString(pair.getSort());
		}
		return p;
	}

	protected Packet constructCPNString(final Packet p, final CPNString cpnstring) {
		p.addInteger(5);
		p.addString(Util.emptyOrNull(cpnstring.getRangeLow())); // low
		p.addString(Util.emptyOrNull(cpnstring.getRangeHigh())); // high
		p.addString(Util.emptyOrNull(cpnstring.getLengthLow())); // min
		p.addString(Util.emptyOrNull(cpnstring.getLengthHigh())); // max
		return p;
	}

	protected Packet constructCPNSubset(final Packet p, final CPNSubset cpnsubset) {
		if (cpnsubset.getBy() != null && !cpnsubset.getBy().equals("")) { // function
			// subset
			p.addInteger(12);
			p.addString(cpnsubset.getSort()); // cs
			p.addString(cpnsubset.getBy()); // subset
		} else if (cpnsubset.getWith() != null && !cpnsubset.getWith().equals("")) { // list
			// subset
			p.addInteger(13);
			p.addString(cpnsubset.getSort()); // cs
			p.addInteger(1); // #subset-elems, only one since we send the
			// whole list
			String list = cpnsubset.getWith();
			list = list.replaceAll("\\[", "");
			list = list.replaceAll("\\]", "");
			p.addString(list); // subset-elem1
		}

		return p;
	}

	protected Packet constructCPNUnion(final Packet p, final CPNUnion cpnunion) {
		p.addInteger(11);
		p.addInteger(cpnunion.getValues().size());
		for (final NameTypePair pair : cpnunion.getValues()) {
			p.addString(pair.getName()); // comps
			p.addString(Util.emptyOrNull(pair.getSort()));
		}
		return p;
	}

	protected Packet constructCPNUnit(final Packet p, final CPNUnit cpnunit) {
		p.addInteger(1);
		if (cpnunit.getId() == null) {
			p.addString(""); // str
		} else {
			p.addString(cpnunit.getId());
		}
		return p;
	}

	protected Packet constructExecute(final String id, final int instance2) {
		final Packet p = new Packet(500);
		p.addInteger(12);
		p.addString(id);
		p.addInteger(instance2);
		return p;
	}

	protected Packet constructGetTimeAndStep() {
		final Packet p = new Packet(500);
		p.addInteger(2);
		return p;
	}

	protected Packet constructGlobalReferenceDeclaration(final Packet p, final GlobalReferenceDeclaration globref) {
		p.addInteger(16);
		p.addString(globref.getName()); // name
		p.addString(globref.getValue()); // exp
		return p;
	}

	protected Packet constructIsEnabled(final String id, final int instance2) {
		final Packet p = new Packet(500);
		p.addInteger(13);
		p.addString(id);
		p.addInteger(instance2);
		return p;
	}

	protected Packet constructIsEnabled(
	        final Collection<? extends org.cpntools.accesscpn.engine.highlevel.instance.Instance<? extends Transition>> tis) {
		final Packet p = new Packet(500);
		p.addInteger(35);
		addNodes(p, tis);
		return p;
	}

	protected Packet constructGetMarking(
	        final Collection<? extends org.cpntools.accesscpn.engine.highlevel.instance.Instance<? extends PlaceNode>> pis) {
		final Packet p = new Packet(500);
		p.addInteger(31);
		addNodes(p, pis);
		return p;
	}

	private void addNodes(final Packet p,
	        final Collection<? extends org.cpntools.accesscpn.engine.highlevel.instance.Instance<? extends Node>> nis) {
		p.addInteger(nis.size());
		for (final org.cpntools.accesscpn.engine.highlevel.instance.Instance<? extends Node> ni : nis) {
			p.addInteger(ni.getInstanceNumber());
			p.addString(ni.getNode().getId());
		}
	}

	protected Packet constructMLDeclaration(final Packet p, final MLDeclaration mldecl) {
		p.addInteger(18);
		p.addString(mldecl.getCode()); // exp
		return p;
	}

	protected Packet constructSaveSimulationReport(final String absolutePath) {
		final Packet p = new Packet(500);
		p.addInteger(41);
		p.addString(absolutePath);
		return p;
	}

	protected Packet constructTypeDeclaration(final Packet p, final TypeDeclaration typeDeclaration) {
		final Packet q = new CpntypesSwitch<Packet>() {
			@Override
			public Packet caseCPNAlias(final CPNAlias cpnalias) {
				return constructCPNAlias(p, cpnalias);
			}

			@Override
			public Packet caseCPNBool(final CPNBool cpnbool) {
				return constructCPNBool(p, cpnbool);
			}

			@Override
			public Packet caseCPNEnum(final CPNEnum cpnenum) {
				return constructCPNEnum(p, cpnenum);
			}

			@Override
			public Packet caseCPNIndex(final CPNIndex cpnindex) {
				return constructCPNIndex(p, cpnindex);
			}

			@Override
			public Packet caseCPNInt(final CPNInt cpnint) {
				return constructCPNInt(p, cpnint);
			}

			@Override
			public Packet caseCPNList(final CPNList cpnlist) {
				return constructCPNList(p, cpnlist);
			}

			@Override
			public Packet caseCPNProduct(final CPNProduct cpnproduct) {
				return constructCPNProduct(p, cpnproduct);
			}

			@Override
			public Packet caseCPNRecord(final CPNRecord cpnrecord) {
				return constructCPNRecord(p, cpnrecord);
			}

			@Override
			public Packet caseCPNString(final CPNString cpnstring) {
				return constructCPNString(p, cpnstring);
			}

			@Override
			public Packet caseCPNSubset(final CPNSubset cpnsubset) {
				return constructCPNSubset(p, cpnsubset);
			}

			@Override
			public Packet caseCPNReal(final CPNReal cpnsubset) {
				return constructCPNReal(p, cpnsubset);
			}

			@Override
			public Packet caseCPNTime(final CPNTime cpnsubset) {
				return constructCPNTime(p, cpnsubset);
			}

			@Override
			public Packet caseCPNIntInf(final CPNIntInf cpnsubset) {
				return constructCPNIntInf(p, cpnsubset);
			}

			@Override
			public Packet caseCPNUnion(final CPNUnion cpnunion) {
				return constructCPNUnion(p, cpnunion);
			}

			@Override
			public Packet caseCPNUnit(final CPNUnit cpnunit) {
				return constructCPNUnit(p, cpnunit);
			}

		}.doSwitch((EObject) typeDeclaration.getSort());

		if (q == null) {
			return p;
		} else {
			q.addBoolean(typeDeclaration.getSort().getTimed()); // is-timed
			q.addString(typeDeclaration.getTypeName()); // name
			q.addInteger(0); // #vars
			q.addInteger(0); // #ms-vars
			q.addInteger(0); // #aliases
			q.addInteger(typeDeclaration.getSort().getDeclares().size()); // #declares
			for (final String declare : typeDeclaration.getSort().getDeclares()) {
				q.addString(declare); // declares
			}

			return q;
		}
	}

	protected Packet constructUseDeclaration(final Packet p, final UseDeclaration use) {
		p.addInteger(17);
		p.addString(use.getFileName());
		return p;
	}

	protected Packet constructVariableDeclaration(final Packet p, final VariableDeclaration var) {
		p.addInteger(20);
		p.addString(var.getTypeName()); // name
		p.addInteger(var.getVariables().size()); // n
		for (final String variable : var.getVariables()) {
			p.addString(variable); // vars
		}
		return p;
	}

	protected Packet constructResetSimulationReport() {
		final Packet p = new Packet(500);
		p.addInteger(42);
		return p;
	}

	protected Packet constructCheckMarking(final String type, final String marking) {
		final Packet p = new Packet(400);
		p.addInteger(3);
		p.addString(marking);
		p.addString(type);
		return p;
	}

	protected Packet constructSetMarking(final String id, final int instanceNumber, final boolean initial) {
		final Packet p = new Packet(500);
		p.addInteger(22);
		p.addBoolean(initial);
		p.addInteger(1); // # nodes, hardwired to 1
		p.addInteger(instanceNumber);
		p.addString(id);
		return p;
	}

	protected Packet constructInitialState() {
		final Packet p = new Packet(500);
		p.addInteger(21);
		return p;
	}

	protected Packet constructExecuteSteps() {
		final Packet p = new Packet(500);
		p.addInteger(11);
		return p;
	}

	protected Packet constructModelNameModelDirOutputDir(final String modelName, final String modelDir,
	        final String outputDir) {
		final Packet p = new Packet(200);
		p.addInteger(9);
		p.addString(modelName);
		p.addString(modelDir);
		p.addString(outputDir);
		return p;
	}

	protected Packet constructSetSimulatorTime(final String timeStamp) {
		final Packet p = new Packet(500);
		p.addInteger(23);
		p.addString(timeStamp);
		return p;
	}

	protected Packet createIncreaseTime() {
		final Packet p = new Packet(500);
		p.addInteger(24);
		return p;
	}

	/**
	 * @param id
	 * @param instanceNumber
	 * @return
	 */
	public Packet constructGetBindings(final String id, final int instanceNumber) {
		final Packet p = new Packet(500);
		p.addInteger(15);
		p.addInteger(instanceNumber);
		p.addString(id);
		return p;
	}

	/**
	 * @return
	 */
	public Packet constructCancelManualBinding() {
		final Packet p = new Packet(500);
		p.clearI();
		p.addBoolean(false);
		return p;
	}

	/**
	 * @param bindings
	 * @param binding
	 * @return packet or null if binding is incompatible with bindings
	 */
	public Packet constructManualBinding(final Bindings bindings, final Binding binding) {
		final List<List<String>> variables = bindings.getVariables();
		final List<List<List<String>>> values = bindings.getValues();
		final Packet p = new Packet(500);
		p.clearI();
		for (int i = 0; i < variables.size(); i++) {
			final List<String> vars = variables.get(i);
			final List<List<String>> vals = values.get(i);
			int j = 0;
			outer: for (final List<String> val : vals) {
				inner: for (int k = 0; k < vars.size(); k++) {
					if (val.get(k).equals(binding.getValueAssignment(vars.get(k)).getValue())) {
						if (k == vars.size() - 1) {
							p.addInteger(j);
							break outer;
						}
					} else {
						break inner;
					}
				}
				j++;
			}
			if (j == vals.size()) { return null; }
		}
		p.addBoolean(true);
		return p;
	}

	/**
	 * @param monitor
	 * @return
	 */
	public Packet constructMarkingSize(final Monitor monitor) {
		final Packet p = createMonitoringPacket(monitor, 20);
		p.addBoolean(monitor.isLogging());
		assert countPlaces(monitor) == 1 && countTransitions(monitor) == 0;
		addPlaces(p, monitor);
		return p;
	}

	private void addPlaces(final Packet p, final Monitor monitor) {
		for (final Object o : monitor.getNodes()) {
			@SuppressWarnings("unchecked")
			final org.cpntools.accesscpn.engine.highlevel.instance.Instance<Node> i = (org.cpntools.accesscpn.engine.highlevel.instance.Instance<Node>) o;
			if (i.getNode() instanceof PlaceNode) {
				p.addInteger(i.getInstanceNumber());
				p.addString(i.getNode().getId());
			}
		}

	}

	private void addTransitions(final Packet p, final Monitor monitor) {
		for (final Object o : monitor.getNodes()) {
			@SuppressWarnings("unchecked")
			final org.cpntools.accesscpn.engine.highlevel.instance.Instance<Node> i = (org.cpntools.accesscpn.engine.highlevel.instance.Instance<Node>) o;
			if (i.getNode() instanceof TransitionNode) {
				p.addInteger(i.getInstanceNumber());
				p.addString(i.getNode().getId());
			}
		}
	}

	private int countTransitions(final Monitor monitor) {
		int result = 0;
		for (final Object o : monitor.getNodes()) {
			@SuppressWarnings("unchecked")
			final org.cpntools.accesscpn.engine.highlevel.instance.Instance<Node> i = (org.cpntools.accesscpn.engine.highlevel.instance.Instance<Node>) o;
			if (i.getNode() instanceof TransitionNode) {
				result++;
			}
		}
		return result;
	}

	private int countPlaces(final Monitor monitor) {
		int result = 0;
		for (final Object o : monitor.getNodes()) {
			@SuppressWarnings("unchecked")
			final org.cpntools.accesscpn.engine.highlevel.instance.Instance<Node> i = (org.cpntools.accesscpn.engine.highlevel.instance.Instance<Node>) o;
			if (i.getNode() instanceof PlaceNode) {
				result++;
			}
		}
		return result;
	}

	private Packet createMonitoringPacket(final Monitor monitor, final int cmd) {
		final Packet p = new Packet(450);
		p.addInteger(cmd);
		p.addString(monitor.getId());
		p.addString(monitor.getName().getText().replaceFirst("^[^\\p{Alpha}]*", "").replaceAll("[^\\p{Alnum}]", "_"));
		return p;
	}

	/**
	 * @param monitor
	 * @return
	 */
	public Packet constructListLength(final Monitor monitor) {
		final Packet p = createMonitoringPacket(monitor, 21);
		p.addBoolean(monitor.isLogging());
		assert countPlaces(monitor) == 1 && countTransitions(monitor) == 0;
		addPlaces(p, monitor);
		return p;
	}

	/**
	 * @param monitor
	 * @return
	 */
	public Packet constructCountTransition(final Monitor monitor) {
		final Packet p = createMonitoringPacket(monitor, 22);
		p.addBoolean(monitor.isLogging());
		assert countPlaces(monitor) == 0 && countTransitions(monitor) == 1;
		addTransitions(p, monitor);
		return p;
	}

	/**
	 * @param monitor
	 * @return
	 */
	public Packet constructPlaceEmpty(final Monitor monitor) {
		final Packet p = createMonitoringPacket(monitor, 40);
		p.addBoolean(monitor.isEmpty());
		assert countPlaces(monitor) == 1 && countTransitions(monitor) == 0;
		addPlaces(p, monitor);
		return p;
	}

	/**
	 * @param monitor
	 * @return
	 */
	public Packet constructTransitionEnabled(final Monitor monitor) {
		final Packet p = createMonitoringPacket(monitor, 41);
		p.addBoolean(monitor.isEnabled());
		assert countPlaces(monitor) == 0 && countTransitions(monitor) == 1;
		addTransitions(p, monitor);
		return p;
	}

	/**
	 * @param monitor
	 * @return
	 */
	public Packet constructCheckMonitor(final Monitor monitor) {
		final Packet p = createMonitoringPacket(monitor, 3);
		switch (monitor.getKind()) {
		case COUNT_TRANSITION:
		case LIST_LENGTH:
		case MARKING_SIZE:
		case PLACE_CONTENT:
		case TRANSTION_ENABLED:
			return null;
		case BREAKPOINT:
			p.addInteger(1);
			p.addString(monitor.getId() + "pred");
			p.addString(monitor.getPredicate().getCode());
			break;
		case DATA_COLLECTION:
			p.addInteger(3);
			p.addBoolean(monitor.isTimed());
			p.addBoolean(monitor.isLogging());
			p.addString(monitor.getId() + "pred");
			p.addString(monitor.getPredicate().getCode());
			p.addString(monitor.getId() + "obs");
			p.addString(monitor.getObserver().getCode());
			p.addString(monitor.getId() + "init");
			p.addString(monitor.getInit().getCode());
			p.addString(monitor.getId() + "stop");
			p.addString(monitor.getStop().getCode());
			break;
		case USER_DEFINED:
			p.addInteger(2);
			p.addString(monitor.getId() + "init");
			p.addString(monitor.getInit().getCode());
			p.addString(monitor.getId() + "pred");
			p.addString(monitor.getPredicate().getCode());
			p.addString(monitor.getId() + "obs");
			p.addString(monitor.getObserver().getCode());
			p.addString(monitor.getId() + "action");
			p.addString(monitor.getAction().getCode());
			p.addString(monitor.getId() + "stop");
			p.addString(monitor.getStop().getCode());
			break;
		case WRITE_IN_FILE:
			p.addInteger(4);
			p.addString(monitor.getExtension());
			p.addString(monitor.getId() + "init");
			p.addString(monitor.getInit().getCode());
			p.addString(monitor.getId() + "pred");
			p.addString(monitor.getPredicate().getCode());
			p.addString(monitor.getId() + "obs");
			p.addString(monitor.getObserver().getCode());
			p.addString(monitor.getId() + "stop");
			p.addString(monitor.getStop().getCode());
			break;
		}
		p.addInteger(countPlaces(monitor));
		p.addInteger(countTransitions(monitor));
		addPlaces(p, monitor);
		addTransitions(p, monitor);
		return p;
	}
}
