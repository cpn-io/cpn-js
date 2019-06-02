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
import java.util.SortedSet;
import java.util.TreeSet;

import org.cpntools.accesscpn.engine.highlevel.instance.Instance;
import org.cpntools.accesscpn.engine.highlevel.instance.Marking;
import org.cpntools.accesscpn.engine.highlevel.instance.State;
import org.cpntools.accesscpn.model.PlaceNode;
import org.eclipse.emf.common.notify.NotificationChain;
import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.InternalEObject;
import org.eclipse.emf.ecore.impl.EObjectImpl;
import org.eclipse.emf.ecore.util.EObjectContainmentEList;
import org.eclipse.emf.ecore.util.InternalEList;


/**
 * <!-- begin-user-doc --> An implementation of the model object '<em><b>State</b></em>'. <!--
 * end-user-doc -->
 * <p>
 * The following features are implemented:
 * <ul>
 *   <li>{@link org.cpntools.accesscpn.engine.highlevel.instance.impl.StateImpl#getAllMarkings <em>All Markings</em>}</li>
 * </ul>
 * </p>
 *
 * @generated
 */
public class StateImpl extends EObjectImpl implements State {
	/**
	 * The cached value of the '{@link #getAllMarkings() <em>All Markings</em>}' containment reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see #getAllMarkings()
	 * @generated
	 * @ordered
	 */
	protected EList<Marking> allMarkings;
	private HashMap<Instance<? extends PlaceNode>, Marking> markingMap;
	private int code;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	protected StateImpl() {
		super();
	}

	protected StateImpl(final List<Marking> allMarkings) {
		super();
		getAllMarkings().addAll(allMarkings);
		recalculateMarkingMap();
	}

	private void recalculateMarkingMap() {
		markingMap = new HashMap<Instance<? extends PlaceNode>, Marking>();
		for (final Marking marking : getAllMarkings()) {
			markingMap.put(marking.getPlaceInstance(), marking);
		}
	}

	/**
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.State#getMarking(org.cpntools.accesscpn.engine.highlevel.instance.Instance)
	 */
	@Override
    public Marking getMarking(final Instance<? extends PlaceNode> instance) {
		if (markingMap == null) return null;
		return markingMap.get(instance);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return InstancePackageImpl.Literals.STATE;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public List<Marking> getAllMarkings() {
		if (allMarkings == null) {
			allMarkings = new EObjectContainmentEList<Marking>(Marking.class, this, InstancePackageImpl.STATE__ALL_MARKINGS);
		}
		return allMarkings;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public NotificationChain eInverseRemove(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
			case InstancePackageImpl.STATE__ALL_MARKINGS:
				return ((InternalEList<?>)getAllMarkings()).basicRemove(otherEnd, msgs);
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
			case InstancePackageImpl.STATE__ALL_MARKINGS:
				return getAllMarkings();
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
			case InstancePackageImpl.STATE__ALL_MARKINGS:
				getAllMarkings().clear();
				getAllMarkings().addAll((Collection<? extends Marking>)newValue);
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
			case InstancePackageImpl.STATE__ALL_MARKINGS:
				getAllMarkings().clear();
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
			case InstancePackageImpl.STATE__ALL_MARKINGS:
				return allMarkings != null && !allMarkings.isEmpty();
		}
		return super.eIsSet(featureID);
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		if (code != 0) return 17;
		this.code = 17;
		for (Marking m: getAllMarkings()) {
			code = code * 13 + m.hashCode();
		}

		return 17;
	}

	/**
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(final Object other) {
		if (other == this) return true;
		if (other == null || !(other instanceof StateImpl)) return false;
		final StateImpl o = (StateImpl) other;
		if (markingMap == null) {
			recalculateMarkingMap();
		}
		if (getAllMarkings().size() != o.getAllMarkings().size()) return false;
		for (Marking m: o.getAllMarkings()) {
			Marking marking = markingMap.get(m.getPlaceInstance());
			if (marking == null) return false;
			if (!marking.equals(m)) return false;
		}
		return true;
	}

	/**
	 * @see org.eclipse.emf.ecore.impl.BasicEObjectImpl#toString()
	 */
	@Override
	public String toString() {
		final StringBuilder sb = new StringBuilder();
		final SortedSet<String> markings = new TreeSet<String>();

		for (final Marking marking : getAllMarkings()) {
			if (marking.getTokenCount() > 0) {
				markings.add(marking.toString());
			}
		}

		boolean first = true;
		for (final String marking : markings) {
			if (first) {
				first = false;
			} else {
				sb.append('\n');
			}
			sb.append(marking);
		}
		return sb.toString();
	}
} // StateImpl
