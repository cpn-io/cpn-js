/************************************************************************/
/* Access/CPN                                                           */
/* Copyright 2010-2011 AIS Group, Eindhoven University of Technology    */
/*                                                                      */
/* This library is free software; you can redistribute it and/or        */
/* modify it under the terms of the GNU Lesser General Public           */
/* License as published by the Free Software Foundation; either         */
/* version 2.1 of the License, or (at your option) any later version.   */
/*                                                                      */
/* This library is distributed in the hope that it will be useful,      */
/* but WITHOUT ANY WARRANTY; without even the implied warranty of       */
/* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU    */
/* Lesser General Public License for more details.                      */
/*                                                                      */
/* You should have received a copy of the GNU Lesser General Public     */
/* License along with this library; if not, write to the Free Software  */
/* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,           */
/* MA  02110-1301  USA                                                  */
/************************************************************************/
/**
 * <copyright> </copyright> $Id$
 */
package org.cpntools.accesscpn.engine.highlevel.instance.impl;

import org.cpntools.accesscpn.engine.highlevel.instance.*;
import java.util.List;

import org.cpntools.accesscpn.engine.highlevel.instance.Binding;
import org.cpntools.accesscpn.engine.highlevel.instance.Instance;
import org.cpntools.accesscpn.engine.highlevel.instance.InstanceFactory;
import org.cpntools.accesscpn.engine.highlevel.instance.Marking;
import org.cpntools.accesscpn.engine.highlevel.instance.MultisetEntry;
import org.cpntools.accesscpn.engine.highlevel.instance.State;
import org.cpntools.accesscpn.engine.highlevel.instance.ValueAssignment;
import org.cpntools.accesscpn.model.PlaceNode;
import org.cpntools.accesscpn.model.Transition;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EDataType;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.impl.EFactoryImpl;
import org.eclipse.emf.ecore.plugin.EcorePlugin;


/**
 * <!-- begin-user-doc --> An implementation of the model <b>Factory</b>. <!-- end-user-doc -->
 * @generated
 */
public class InstanceFactoryImpl extends EFactoryImpl implements InstanceFactory {
	/**
	 * The singleton instance of the factory.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public static final InstanceFactoryImpl eINSTANCE = init();

	/**
	 * Creates the default factory implementation.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public static InstanceFactoryImpl init() {
		try {
			InstanceFactoryImpl theInstanceFactory = (InstanceFactoryImpl)EPackage.Registry.INSTANCE.getEFactory("http:///org/cpntools/accesscpn/engine/highlevel/instance.ecore"); 
			if (theInstanceFactory != null) {
				return theInstanceFactory;
			}
		}
		catch (Exception exception) {
			EcorePlugin.INSTANCE.log(exception);
		}
		return new InstanceFactoryImpl();
	}

	/**
	 * Creates an instance of the factory.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public InstanceFactoryImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public EObject create(EClass eClass) {
		switch (eClass.getClassifierID()) {
			case InstancePackageImpl.BINDING: return (EObject)createBinding();
			case InstancePackageImpl.INSTANCE: return (EObject)createInstance();
			case InstancePackageImpl.MARKING: return (EObject)createMarking();
			case InstancePackageImpl.MULTISET_ENTRY: return (EObject)createMultisetEntry();
			case InstancePackageImpl.STATE: return (EObject)createState();
			case InstancePackageImpl.VALUE_ASSIGNMENT: return (EObject)createValueAssignment();
			default:
				throw new IllegalArgumentException("The class '" + eClass.getName() + "' is not a valid classifier");
		}
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public <T> Instance<T> createInstance() {
		InstanceImpl<T> instance = new InstanceImpl<T>();
		return instance;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public Marking createMarking() {
		MarkingImpl marking = new MarkingImpl();
		return marking;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public State createState() {
		StateImpl state = new StateImpl();
		return state;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public MultisetEntry createMultisetEntry() {
		MultisetEntryImpl multisetEntry = new MultisetEntryImpl();
		return multisetEntry;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public Binding createBinding() {
		BindingImpl binding = new BindingImpl();
		return binding;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public ValueAssignment createValueAssignment() {
		ValueAssignmentImpl valueAssignment = new ValueAssignmentImpl();
		return valueAssignment;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public InstancePackageImpl getInstancePackage() {
		return (InstancePackageImpl)getEPackage();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @deprecated
	 * @generated
	 */
	@Deprecated
	public static InstancePackageImpl getPackage() {
		return InstancePackageImpl.eINSTANCE;
	}

	/**
	 * @param node
	 * @param instanceNumber
	 * @param <T>
	 * @return
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.InstanceFactory#createInstance(org.cpntools.accesscpn.model.Node,
	 *      int)
	 */
	@Override
    public <T> Instance<T> createInstance(final T node, final int instanceNumber) {
		return new InstanceImpl<T>(node, instanceNumber);
	}

	/**
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.InstanceFactory#createMarking(java.lang.String)
	 */
	@Override
    public Marking createMarking(final String marking) {
		return new MarkingImpl(-1, marking);
	}

	/**
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.InstanceFactory#createMarking(int,
	 *      java.lang.String)
	 */
	@Override
    public Marking createMarking(final int tokens, final String marking) {
		return new MarkingImpl(tokens, marking);
	}

	/**
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.InstanceFactory#createState(java.util.List)
	 */
	@Override
    public State createState(final List<Marking> markings) {
		final StateImpl state = new StateImpl(markings);
		return state;
	}

	/**
	 * @param <T>
	 * @param node
	 * @param transitionList
	 * @return
	 */
	@Override
    public <T> Instance<T> createInstance(final T node,
			final Instance<org.cpntools.accesscpn.model.Instance> transitionList) {
		return new InstanceImpl<T>(node, transitionList);
	}

	/**
	 * @param <T>
	 * @param node
	 * @param instanceNumber
	 * @param transitionList
	 * @return
	 */
	@Override
    public <T> Instance<T> createInstance(final T node, final int instanceNumber,
			final Instance<org.cpntools.accesscpn.model.Instance> transitionList) {
		return new InstanceImpl<T>(node, instanceNumber, transitionList);
	}

	/**
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.InstanceFactory#createMarking(org.cpntools.accesscpn.engine.highlevel.instance.Instance,
	 *      java.util.List)
	 */
	@Override
    public Marking createMarking(final Instance<PlaceNode> placeInstance,
			final List<MultisetEntry> marking) {
		return new MarkingImpl(placeInstance, marking);
	}

	/**
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.InstanceFactory#createMarking(org.cpntools.accesscpn.engine.highlevel.instance.Instance,
	 *      java.util.List)
	 */
	@Override
    public Marking createMarking(final Instance<PlaceNode> placeInstance) {
		return new MarkingImpl(placeInstance);
	}

	/**
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.InstanceFactory#createMultisetEntry(int,
	 *      java.lang.String)
	 */
	@Override
    public MultisetEntry createMultisetEntry(final int coefficient, final String value) {
		return new MultisetEntryImpl(coefficient, value);
	}

	/**
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.InstanceFactory#createBinding(org.cpntools.accesscpn.engine.highlevel.instance.Instance,
	 *      java.util.List)
	 */
	@Override
    @SuppressWarnings("unchecked")
	public Binding createBinding(final Instance<? extends Transition> transition,
			final List<ValueAssignment> assignements) {
		return new BindingImpl((Instance<Transition>) transition, assignements);
	}

	/**
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.InstanceFactory#createValueAssignment(java.lang.String,
	 *      java.lang.String)
	 */
	@Override
    public ValueAssignment createValueAssignment(final String name, final String value) {
		return new ValueAssignmentImpl(name, value);
	}

} // InstanceFactoryImpl
