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

import org.cpntools.accesscpn.engine.highlevel.instance.MultisetEntry;
import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.impl.ENotificationImpl;
import org.eclipse.emf.ecore.impl.EObjectImpl;


/**
 * <!-- begin-user-doc --> An implementation of the model object '<em><b>Multiset Entry</b></em>'.
 * <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * <ul>
 *   <li>{@link org.cpntools.accesscpn.engine.highlevel.instance.impl.MultisetEntryImpl#getCoefficient <em>Coefficient</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.engine.highlevel.instance.impl.MultisetEntryImpl#getValueAsString <em>Value As String</em>}</li>
 * </ul>
 * </p>
 *
 * @generated
 */
public class MultisetEntryImpl extends EObjectImpl implements MultisetEntry {
	/**
	 * The default value of the '{@link #getCoefficient() <em>Coefficient</em>}' attribute. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see #getCoefficient()
	 * @generated
	 * @ordered
	 */
	protected static final int COEFFICIENT_EDEFAULT = 0;

	/**
	 * The cached value of the '{@link #getCoefficient() <em>Coefficient</em>}' attribute. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see #getCoefficient()
	 * @generated
	 * @ordered
	 */
	protected int coefficient = COEFFICIENT_EDEFAULT;

	/**
	 * The default value of the '{@link #getValueAsString() <em>Value As String</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see #getValueAsString()
	 * @generated
	 * @ordered
	 */
	protected static final String VALUE_AS_STRING_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getValueAsString() <em>Value As String</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see #getValueAsString()
	 * @generated
	 * @ordered
	 */
	protected String valueAsString = VALUE_AS_STRING_EDEFAULT;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	protected MultisetEntryImpl() {
		super();
	}

	/**
	 * @param coefficient
	 * @param value
	 */
	public MultisetEntryImpl(final int coefficient, final String value) {
		this.coefficient = coefficient;
		valueAsString = value;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return InstancePackageImpl.Literals.MULTISET_ENTRY;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public int getCoefficient() {
		return coefficient;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setCoefficient(int newCoefficient) {
		int oldCoefficient = coefficient;
		coefficient = newCoefficient;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, InstancePackageImpl.MULTISET_ENTRY__COEFFICIENT, oldCoefficient, coefficient));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public String getValueAsString() {
		return valueAsString;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setValueAsString(String newValueAsString) {
		String oldValueAsString = valueAsString;
		valueAsString = newValueAsString;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, InstancePackageImpl.MULTISET_ENTRY__VALUE_AS_STRING, oldValueAsString, valueAsString));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Object eGet(int featureID, boolean resolve, boolean coreType) {
		switch (featureID) {
			case InstancePackageImpl.MULTISET_ENTRY__COEFFICIENT:
				return getCoefficient();
			case InstancePackageImpl.MULTISET_ENTRY__VALUE_AS_STRING:
				return getValueAsString();
		}
		return super.eGet(featureID, resolve, coreType);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void eSet(int featureID, Object newValue) {
		switch (featureID) {
			case InstancePackageImpl.MULTISET_ENTRY__COEFFICIENT:
				setCoefficient((Integer)newValue);
				return;
			case InstancePackageImpl.MULTISET_ENTRY__VALUE_AS_STRING:
				setValueAsString((String)newValue);
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
			case InstancePackageImpl.MULTISET_ENTRY__COEFFICIENT:
				setCoefficient(COEFFICIENT_EDEFAULT);
				return;
			case InstancePackageImpl.MULTISET_ENTRY__VALUE_AS_STRING:
				setValueAsString(VALUE_AS_STRING_EDEFAULT);
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
			case InstancePackageImpl.MULTISET_ENTRY__COEFFICIENT:
				return coefficient != COEFFICIENT_EDEFAULT;
			case InstancePackageImpl.MULTISET_ENTRY__VALUE_AS_STRING:
				return VALUE_AS_STRING_EDEFAULT == null ? valueAsString != null : !VALUE_AS_STRING_EDEFAULT.equals(valueAsString);
		}
		return super.eIsSet(featureID);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @generated NOT
	 */
	@Override
	public String toString() {
		if (eIsProxy()) return super.toString();

		final StringBuilder sb = new StringBuilder();
		sb.append(coefficient);
		sb.append("`");
		sb.append(valueAsString);
		return sb.toString();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		int code = getCoefficient() * 17;
		code += getValueAsString().hashCode() * 5;
		return code;
	}

	/**
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(final Object other) {
		if (other == null || !(other instanceof MultisetEntry)) return false;
		if (other == this) return true;
		final MultisetEntry o = (MultisetEntry) other;
		return o.getCoefficient() == getCoefficient()
				&& getValueAsString().equals(o.getValueAsString());
	}
} // MultisetEntryImpl
