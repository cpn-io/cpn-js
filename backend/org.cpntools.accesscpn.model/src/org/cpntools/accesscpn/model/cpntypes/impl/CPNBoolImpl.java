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
package org.cpntools.accesscpn.model.cpntypes.impl;

import org.cpntools.accesscpn.model.cpntypes.CPNBool;
import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.impl.ENotificationImpl;


/**
 * <!-- begin-user-doc --> An implementation of the model object '<em><b>CPN Bool</b></em>'. <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * <ul>
 *   <li>{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNBoolImpl#getTrueValue <em>True Value</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNBoolImpl#getFalseValue <em>False Value</em>}</li>
 * </ul>
 * </p>
 *
 * @generated
 */
public class CPNBoolImpl extends CPNTypeImpl implements CPNBool {
	/**
	 * The default value of the '{@link #getTrueValue() <em>True Value</em>}' attribute.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #getTrueValue()
	 * @generated
	 * @ordered
	 */
	protected static final String TRUE_VALUE_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getTrueValue() <em>True Value</em>}' attribute.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #getTrueValue()
	 * @generated
	 * @ordered
	 */
	protected String trueValue = TRUE_VALUE_EDEFAULT;

	/**
	 * The default value of the '{@link #getFalseValue() <em>False Value</em>}' attribute.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #getFalseValue()
	 * @generated
	 * @ordered
	 */
	protected static final String FALSE_VALUE_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getFalseValue() <em>False Value</em>}' attribute.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #getFalseValue()
	 * @generated
	 * @ordered
	 */
	protected String falseValue = FALSE_VALUE_EDEFAULT;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	protected CPNBoolImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return CpntypesPackageImpl.Literals.CPN_BOOL;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public String getTrueValue() {
		return trueValue;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setTrueValue(String newTrueValue) {
		String oldTrueValue = trueValue;
		trueValue = newTrueValue;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, CpntypesPackageImpl.CPN_BOOL__TRUE_VALUE, oldTrueValue, trueValue));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public String getFalseValue() {
		return falseValue;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setFalseValue(String newFalseValue) {
		String oldFalseValue = falseValue;
		falseValue = newFalseValue;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, CpntypesPackageImpl.CPN_BOOL__FALSE_VALUE, oldFalseValue, falseValue));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Object eGet(int featureID, boolean resolve, boolean coreType) {
		switch (featureID) {
			case CpntypesPackageImpl.CPN_BOOL__TRUE_VALUE:
				return getTrueValue();
			case CpntypesPackageImpl.CPN_BOOL__FALSE_VALUE:
				return getFalseValue();
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
			case CpntypesPackageImpl.CPN_BOOL__TRUE_VALUE:
				setTrueValue((String)newValue);
				return;
			case CpntypesPackageImpl.CPN_BOOL__FALSE_VALUE:
				setFalseValue((String)newValue);
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
			case CpntypesPackageImpl.CPN_BOOL__TRUE_VALUE:
				setTrueValue(TRUE_VALUE_EDEFAULT);
				return;
			case CpntypesPackageImpl.CPN_BOOL__FALSE_VALUE:
				setFalseValue(FALSE_VALUE_EDEFAULT);
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
			case CpntypesPackageImpl.CPN_BOOL__TRUE_VALUE:
				return TRUE_VALUE_EDEFAULT == null ? trueValue != null : !TRUE_VALUE_EDEFAULT.equals(trueValue);
			case CpntypesPackageImpl.CPN_BOOL__FALSE_VALUE:
				return FALSE_VALUE_EDEFAULT == null ? falseValue != null : !FALSE_VALUE_EDEFAULT.equals(falseValue);
		}
		return super.eIsSet(featureID);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public String toString() {
		if (eIsProxy()) return super.toString();

		StringBuffer result = new StringBuffer(super.toString());
		result.append(" (trueValue: ");
		result.append(trueValue);
		result.append(", falseValue: ");
		result.append(falseValue);
		result.append(')');
		return result.toString();
	}

	/**
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNType#asString()
	 */
	@Override
    public String asString() {
		String appendString = "";
		if (getFalseValue() != null) {
			appendString = " with (" + getFalseValue() + ", " + getTrueValue() + ')';
		}
		return "bool" + postFixAsString() + appendString;
	}

} // CPNBoolImpl
