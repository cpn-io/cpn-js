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

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.SortedSet;
import java.util.TreeSet;

import org.cpntools.accesscpn.engine.highlevel.instance.Binding;
import org.cpntools.accesscpn.engine.highlevel.instance.Instance;
import org.cpntools.accesscpn.engine.highlevel.instance.ValueAssignment;
import org.cpntools.accesscpn.model.Transition;
import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.common.notify.NotificationChain;
import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.InternalEObject;
import org.eclipse.emf.ecore.impl.ENotificationImpl;
import org.eclipse.emf.ecore.impl.EObjectImpl;
import org.eclipse.emf.ecore.util.EObjectContainmentEList;
import org.eclipse.emf.ecore.util.InternalEList;


/**
 * <!-- begin-user-doc --> An implementation of the model object '<em><b>Binding</b></em>'. <!--
 * end-user-doc -->
 * <p>
 * The following features are implemented:
 * <ul>
 *   <li>{@link org.cpntools.accesscpn.engine.highlevel.instance.impl.BindingImpl#getTransitionInstance <em>Transition Instance</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.engine.highlevel.instance.impl.BindingImpl#getAllAssignments <em>All Assignments</em>}</li>
 * </ul>
 * </p>
 *
 * @generated
 */
public class BindingImpl extends EObjectImpl implements Binding {
	/**
	 * The cached value of the '{@link #getTransitionInstance() <em>Transition Instance</em>}' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see #getTransitionInstance()
	 * @generated
	 * @ordered
	 */
	protected Instance<Transition> transitionInstance;

	/**
	 * The cached value of the '{@link #getAllAssignments() <em>All Assignments</em>}' containment reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see #getAllAssignments()
	 * @generated
	 * @ordered
	 */
	protected EList<ValueAssignment> allAssignments;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	protected BindingImpl() {
		super();
	}

	protected BindingImpl(final Instance<Transition> transition,
			final List<ValueAssignment> allAssignments) {
		super();
		transitionInstance = transition;
		getAllAssignments().addAll(allAssignments);
		recalculateValueMap();
	}

	private void recalculateValueMap() {
		valueMap = new HashMap<String, ValueAssignment>();
		for (final ValueAssignment assignment : getAllAssignments()) {
			valueMap.put(assignment.getName(), assignment);
		}
	}

	Map<String, ValueAssignment> valueMap;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return InstancePackageImpl.Literals.BINDING;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    @SuppressWarnings("unchecked")
	public Instance<Transition> getTransitionInstance() {
		if (transitionInstance != null && ((EObject)transitionInstance).eIsProxy()) {
			InternalEObject oldTransitionInstance = (InternalEObject)transitionInstance;
			transitionInstance = (Instance<Transition>)eResolveProxy(oldTransitionInstance);
			if (transitionInstance != oldTransitionInstance) {
				if (eNotificationRequired())
					eNotify(new ENotificationImpl(this, Notification.RESOLVE, InstancePackageImpl.BINDING__TRANSITION_INSTANCE, oldTransitionInstance, transitionInstance));
			}
		}
		return transitionInstance;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public Instance<Transition> basicGetTransitionInstance() {
		return transitionInstance;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setTransitionInstance(Instance<Transition> newTransitionInstance) {
		Instance<Transition> oldTransitionInstance = transitionInstance;
		transitionInstance = newTransitionInstance;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, InstancePackageImpl.BINDING__TRANSITION_INSTANCE, oldTransitionInstance, transitionInstance));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public List<ValueAssignment> getAllAssignments() {
		if (allAssignments == null) {
			allAssignments = new EObjectContainmentEList<ValueAssignment>(ValueAssignment.class, this, InstancePackageImpl.BINDING__ALL_ASSIGNMENTS);
		}
		return allAssignments;
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		if (valueMap == null) {
			recalculateValueMap();
		}
		return super.hashCode();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public NotificationChain eInverseRemove(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
			case InstancePackageImpl.BINDING__ALL_ASSIGNMENTS:
				return ((InternalEList<?>)getAllAssignments()).basicRemove(otherEnd, msgs);
		}
		return super.eInverseRemove(otherEnd, featureID, msgs);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Object eGet(int featureID, boolean resolve, boolean coreType) {
		switch (featureID) {
			case InstancePackageImpl.BINDING__TRANSITION_INSTANCE:
				if (resolve) return getTransitionInstance();
				return basicGetTransitionInstance();
			case InstancePackageImpl.BINDING__ALL_ASSIGNMENTS:
				return getAllAssignments();
		}
		return super.eGet(featureID, resolve, coreType);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@SuppressWarnings("unchecked")
	@Override
	public void eSet(int featureID, Object newValue) {
		switch (featureID) {
			case InstancePackageImpl.BINDING__TRANSITION_INSTANCE:
				setTransitionInstance((Instance<Transition>)newValue);
				return;
			case InstancePackageImpl.BINDING__ALL_ASSIGNMENTS:
				getAllAssignments().clear();
				getAllAssignments().addAll((Collection<? extends ValueAssignment>)newValue);
				return;
		}
		super.eSet(featureID, newValue);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void eUnset(int featureID) {
		switch (featureID) {
			case InstancePackageImpl.BINDING__TRANSITION_INSTANCE:
				setTransitionInstance((Instance<Transition>)null);
				return;
			case InstancePackageImpl.BINDING__ALL_ASSIGNMENTS:
				getAllAssignments().clear();
				return;
		}
		super.eUnset(featureID);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public boolean eIsSet(int featureID) {
		switch (featureID) {
			case InstancePackageImpl.BINDING__TRANSITION_INSTANCE:
				return transitionInstance != null;
			case InstancePackageImpl.BINDING__ALL_ASSIGNMENTS:
				return allAssignments != null && !allAssignments.isEmpty();
		}
		return super.eIsSet(featureID);
	}

	/**
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.Binding#getValueAssignment(java.lang.String)
	 */
	@Override
    public ValueAssignment getValueAssignment(final String name) {
		if (valueMap != null) return valueMap.get(name);
		return null;
	}

	/**
	 * @see org.eclipse.emf.ecore.impl.BasicEObjectImpl#toString()
	 */
	@Override
	public String toString() {
		final StringBuilder sb = new StringBuilder();
		if (transitionInstance != null) {
			sb.append(transitionInstance);
		}
		if (!getAllAssignments().isEmpty()) {
			sb.append("{ ");
			final SortedSet<String> values = new TreeSet<String>();
			for (final ValueAssignment valueAssignment : getAllAssignments()) {
				values.add(valueAssignment.toString());
			}
			boolean first = true;
			for (final String valueAssignment : values) {
				if (first) {
					first = false;
				} else {
					sb.append(", ");
				}
				sb.append(valueAssignment);
			}
			sb.append(" }");
		}
		return sb.toString();
	}
} // BindingImpl
