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

package org.cpntools.accesscpn.model.util;

import java.util.LinkedList;
import java.util.List;

import org.cpntools.accesscpn.model.Arc;
import org.cpntools.accesscpn.model.FusionGroup;
import org.cpntools.accesscpn.model.HLAnnotation;
import org.cpntools.accesscpn.model.HLDeclaration;
import org.cpntools.accesscpn.model.Instance;
import org.cpntools.accesscpn.model.ModelFactory;
import org.cpntools.accesscpn.model.Name;
import org.cpntools.accesscpn.model.Node;
import org.cpntools.accesscpn.model.Page;
import org.cpntools.accesscpn.model.ParameterAssignment;
import org.cpntools.accesscpn.model.PetriNet;
import org.cpntools.accesscpn.model.Place;
import org.cpntools.accesscpn.model.RefPlace;
import org.cpntools.accesscpn.model.Transition;
import org.cpntools.accesscpn.model.cpntypes.CPNInt;
import org.cpntools.accesscpn.model.cpntypes.CPNList;
import org.cpntools.accesscpn.model.cpntypes.CPNProduct;
import org.cpntools.accesscpn.model.cpntypes.CPNRecord;
import org.cpntools.accesscpn.model.cpntypes.CPNType;
import org.cpntools.accesscpn.model.cpntypes.CpntypesFactory;
import org.cpntools.accesscpn.model.declaration.DeclarationFactory;
import org.cpntools.accesscpn.model.declaration.MLDeclaration;
import org.cpntools.accesscpn.model.declaration.TypeDeclaration;
import org.cpntools.accesscpn.model.declaration.VariableDeclaration;

/**
 * Utility class to construct a {@link PetriNet} using more natural primitives.
 * 
 * @author dfahland
 */
public class BuildCPNUtil {

	private int id_generator;

	/**
	 * 
	 */
	public ModelFactory mf;
	/**
	 * 
	 */
	public CpntypesFactory cf;
	/**
	 * 
	 */
	public DeclarationFactory df;

	/**
	 * Create standard util using standard {@link ModelFactory}, {@link CpntypesFactory} and {@link DeclarationFactory}.
	 */
	public BuildCPNUtil() {
		this(ModelFactory.INSTANCE, CpntypesFactory.INSTANCE, DeclarationFactory.INSTANCE);
	}

	/**
	 * Create a customized util using customized factories.
	 * 
	 * @param mf
	 * @param cf
	 * @param df
	 */
	public BuildCPNUtil(final ModelFactory mf, final CpntypesFactory cf, final DeclarationFactory df) {
		this.mf = mf;
		this.cf = cf;
		this.df = df;

		fusionGroups = new LinkedList<FusionGroup>();
	}

	private String getNextID() {
		return "id" + id_generator++;
	}

	/**
	 * @return a new Petri net
	 */
	public PetriNet createPetriNet() {
		return mf.createPetriNet();
	}

	/**
	 * Add a new page to the Petri net
	 * 
	 * @param net
	 * @param name
	 * @return
	 */
	public Page addPage(final PetriNet net, final String name) {
		final Page page = mf.createPage();
		final Name pageName = mf.createName();
		pageName.setText(name);
		page.setName(pageName);
		page.setId(getNextID());
		page.setPetriNet(net);

		return page;
	}

	/**
	 * Add a new hierarchical transition to the parentpage that links to the existing page.
	 * 
	 * @param page
	 * @param parentPage
	 * @param name
	 * @return
	 */
	public Instance createSubPageTransition(final Page page, final Page parentPage, final String name) {
		final Instance t = mf.createInstance();
		t.setId(getNextID());
		t.setSubPageID(page.getId());
		t.setPage(parentPage);
		t.setName(mf.createName());
		t.getName().setText(name);

		return t;
	}

	/**
	 * Add a new place to the page.
	 * 
	 * @param page
	 * @param name
	 * @param type
	 * @return
	 */
	public Place addPlace(final Page page, final String name, final String type) {
		return addPlace(page, name, type, "");
	}

	/**
	 * Add a new place to the page.
	 * 
	 * @param page
	 * @param name
	 * @param type
	 * @param initialMarking
	 * @return
	 */
	public Place addPlace(final Page page, final String name, final String type, final String initialMarking) {
		final Place p = mf.createPlace();
		p.setId(getNextID());
		p.setName(mf.createName());
		p.getName().setText(name);
		p.setSort(mf.createSort());
		p.getSort().setText(type);

		p.setInitialMarking(mf.createHLMarking());
		p.getInitialMarking().setText(initialMarking);

		p.setPage(page);

		return p;
	}

	/**
	 * Add a new reference place to the page that is fused with the topLevelPlace.
	 * 
	 * @param page
	 * @param name
	 * @param type
	 * @param initialMarking
	 * @param topLevelPlace
	 * @param parentTransition
	 *            the hierachical transition that contains the page to which the reference place is added (see
	 *            {@link #createSubPageTransition(Page, Page, String)}
	 * @return
	 */
	public RefPlace addReferencePlace(final Page page, final String name, final String type,
	        final String initialMarking, final Place topLevelPlace, final Instance parentTransition) {
		final RefPlace p = mf.createRefPlace();
		p.setId(getNextID());
		p.setName(mf.createName());
		p.getName().setText(name);
		p.setSort(mf.createSort());
		p.getSort().setText(type);

		p.setInitialMarking(mf.createHLMarking());
		p.getInitialMarking().setText(initialMarking);

		p.setPage(page);

		p.setRef(topLevelPlace);

		final ParameterAssignment pa = mf.createParameterAssignment();
		pa.setParameter(topLevelPlace.getId());
		pa.setValue(p.getId());
		pa.setInstance(parentTransition);

		parentTransition.getParameterAssignment().add(pa);

		return p;
	}

	private final List<FusionGroup> fusionGroups;

	/**
	 * Create a new fusion place in the specified fusion group. If the group does not exist yet, it will automatically
	 * be created. If it exists, the fusion place is assigned to it.
	 * 
	 * @param page
	 * @param name
	 * @param type
	 * @param initialMarking
	 * @param fusionGroupName
	 * @return
	 */
	public RefPlace addFusionPlace(final Page page, final String name, final String type, final String initialMarking,
	        final String fusionGroupName) {
		final RefPlace p = mf.createRefPlace();
		p.setId(getNextID());
		p.setName(mf.createName());
		p.getName().setText(name);
		p.setSort(mf.createSort());
		p.getSort().setText(type);

		p.setInitialMarking(mf.createHLMarking());
		p.getInitialMarking().setText(initialMarking);

		p.setPage(page);

		FusionGroup group = null;
		for (final FusionGroup g : fusionGroups) {
			if (g.getName().getText().equals(fusionGroupName)) {
				group = g;
				break;
			}
		}
		if (group == null) {
			group = mf.createFusionGroup();
			group.setId(getNextID());
			group.setName(mf.createName());
			group.getName().setText(fusionGroupName);
			group.setPetriNet(page.getPetriNet());
			fusionGroups.add(group);
		}

		p.setRef(group);

		return p;
	}

	/**
	 * Add a new transition to the page.
	 * 
	 * @param page
	 * @param name
	 * @param guard
	 * @return
	 */
	public Transition addTransition(final Page page, final String name, final String guard) {
		final Transition t = mf.createTransition();
		t.setId(getNextID());
		t.setPage(page);
		t.setName(mf.createName());
		t.getName().setText(name);
		t.setTime(mf.createTime());
		t.setCode(mf.createCode());
		t.setPriority(mf.createPriority());

		t.setCondition(mf.createCondition());
		t.getCondition().setText(guard);

		return t;
	}

	/**
	 * Add a new transition to the page.
	 * 
	 * @param page
	 * @param name
	 * @return
	 */
	public Transition addTransition(final Page page, final String name) {
		return addTransition(page, name, "");
	}

	/**
	 * Add a new arc to the page.
	 * 
	 * @param page
	 * @param src
	 * @param tgt
	 * @param annotation
	 * @return
	 */
	public Arc addArc(final Page page, final Node src, final Node tgt, final String annotation) {
		final Arc a = mf.createArc();
		a.setSource(src);
		a.setTarget(tgt);
		a.setPage(page);
		a.setId(getNextID());

		final HLAnnotation a_inscr = mf.createHLAnnotation();
		a_inscr.setText(annotation);
		a.setHlinscription(a_inscr);

		return a;
	}

	/**
	 * Declare the standard colors UNIT, INT, BOOL, STRING in the net.
	 * 
	 * @param net
	 */
	public void declareStandardColors(final PetriNet net) {
		declareColorSet(net, "UNIT", cf.createCPNUnit());
		declareColorSet(net, "INT", cf.createCPNInt());
		declareColorSet(net, "BOOL", cf.createCPNBool());
		declareColorSet(net, "STRING", cf.createCPNString());
	}

	/**
	 * Declare a color set in the net.
	 * 
	 * @param net
	 * @param name
	 *            of the color set
	 * @param decl
	 *            type declaration of the color set, use this function to declare basic types, e.g. {@link CPNInt}.
	 */
	public void declareColorSet(final PetriNet net, final String name, final CPNType decl) {
		final HLDeclaration hldecl = mf.createHLDeclaration();

		final TypeDeclaration type = df.createTypeDeclaration();
		type.setTypeName(name);
		type.setSort(decl);

		hldecl.setStructure(type);
		hldecl.setId(getNextID());
		net.getLabel().add(hldecl);
	}

	/**
	 * Declare a product color set, <code>colset NAME = record t1 * ... tn;</code>
	 * 
	 * @param net
	 * @param name
	 *            of the color set
	 * @param types
	 *            array of types of the product, given in the order of the product
	 */
	public void declareColorSet_product(final PetriNet net, final String name, final String[] types) {
		final CPNProduct type_TUPLE_t = cf.createCPNProduct();
		for (final String type : types) {
			type_TUPLE_t.addSort(type);
		}
		declareColorSet(net, name, type_TUPLE_t);
	}

	/**
	 * Declare a record color set, <code>colset NAME = record name1 : type1 * ... * nameN : typeN;</code>
	 * 
	 * @param net
	 * @param name
	 *            of the color set
	 * @param structure
	 *            array of types of the record organized as follows: <code>structure[0] = name1, structure[1] = type1,
	 *            structure[2] = name2, structure[3] = type2, ...,
	 *            structure[2*N-2] = nameN, structure[2*N-1] = type</code>
	 */
	public void declareColorSet_record(final PetriNet net, final String name, final String[] structure) {
		final CPNRecord type_RECORD_t = cf.createCPNRecord();
		for (int i = 0; i < structure.length; i += 2) {
			type_RECORD_t.addValue(structure[i], structure[i + 1]);
		}
		declareColorSet(net, name, type_RECORD_t);
	}

	/**
	 * Declare a list color set, <code>colset NAME = list elementType;</code>
	 * 
	 * @param net
	 * @param name
	 *            of the color set
	 * @param elementType
	 *            type of the list elements
	 */
	public void declareColorSet_list(final PetriNet net, final String name, final String elementType) {
		final CPNList type_LIST_t = cf.createCPNList();
		type_LIST_t.setSort(elementType);
		declareColorSet(net, name, type_LIST_t);
	}

	/**
	 * Declare a variable with the given name of the given color set type.
	 * 
	 * @param net
	 * @param name
	 * @param type
	 */
	public void declareVariable(final PetriNet net, final String name, final String type) {
		final HLDeclaration hldecl = mf.createHLDeclaration();

		final VariableDeclaration var = df.createVariableDeclaration();
		var.setTypeName(type);
		var.addVariable(name);
		hldecl.setId(getNextID());
		hldecl.setStructure(var);
		net.getLabel().add(hldecl);
	}

	/**
	 * Declare an ML function.
	 * 
	 * @param net
	 * @param fun_declaration
	 */
	public void declareMLFunction(final PetriNet net, final String fun_declaration) {
		final HLDeclaration hldecl = mf.createHLDeclaration();

		final MLDeclaration ml_decl = df.createMLDeclaration();
		ml_decl.setCode(fun_declaration);
		hldecl.setStructure(ml_decl);
		hldecl.setId(getNextID());
		net.getLabel().add(hldecl);
	}
}
