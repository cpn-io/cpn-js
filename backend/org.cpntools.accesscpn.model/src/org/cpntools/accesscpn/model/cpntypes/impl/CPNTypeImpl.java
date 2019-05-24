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

import java.util.Collection;
import java.util.List;

import org.cpntools.accesscpn.model.cpntypes.CPNType;
import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.impl.ENotificationImpl;
import org.eclipse.emf.ecore.impl.EObjectImpl;
import org.eclipse.emf.ecore.util.EDataTypeUniqueEList;


/**
 * <!-- begin-user-doc --> An implementation of the model object '<em><b>CPN Type</b></em>'. <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * <ul>
 *   <li>{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNTypeImpl#getTimed <em>Timed</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNTypeImpl#getDeclares <em>Declares</em>}</li>
 * </ul>
 * </p>
 *
 * @generated
 */
public abstract class CPNTypeImpl extends EObjectImpl implements CPNType {
	/**
	 * The default value of the '{@link #getTimed() <em>Timed</em>}' attribute. <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * 
	 * @see #getTimed()
	 * @generated NOT
	 * @ordered
	 */
	protected static final Boolean TIMED_EDEFAULT = Boolean.FALSE;

	/**
	 * The cached value of the '{@link #getTimed() <em>Timed</em>}' attribute. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @see #getTimed()
	 * @generated
	 * @ordered
	 */
	protected Boolean timed = TIMED_EDEFAULT;
	/**
	 * The cached value of the '{@link #getDeclares() <em>Declares</em>}' attribute list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #getDeclares()
	 * @generated
	 * @ordered
	 */
	protected EList<String> declares;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	protected CPNTypeImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return CpntypesPackageImpl.Literals.CPN_TYPE;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public List<String> getDeclares() {
		if (declares == null) {
			declares = new EDataTypeUniqueEList<String>(String.class, this, CpntypesPackageImpl.CPN_TYPE__DECLARES);
		}
		return declares;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public Boolean getTimed() {
		return timed;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setTimed(Boolean newTimed) {
		Boolean oldTimed = timed;
		timed = newTimed;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, CpntypesPackageImpl.CPN_TYPE__TIMED, oldTimed, timed));
	}

	/**
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNType#addDeclare(java.lang.String)
	 */
	@Override
    public void addDeclare(final String declare) {
		getDeclares().add(declare);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Object eGet(int featureID, boolean resolve, boolean coreType) {
		switch (featureID) {
			case CpntypesPackageImpl.CPN_TYPE__TIMED:
				return getTimed();
			case CpntypesPackageImpl.CPN_TYPE__DECLARES:
				return getDeclares();
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
			case CpntypesPackageImpl.CPN_TYPE__TIMED:
				setTimed((Boolean)newValue);
				return;
			case CpntypesPackageImpl.CPN_TYPE__DECLARES:
				getDeclares().clear();
				getDeclares().addAll((Collection<? extends String>)newValue);
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
			case CpntypesPackageImpl.CPN_TYPE__TIMED:
				setTimed(TIMED_EDEFAULT);
				return;
			case CpntypesPackageImpl.CPN_TYPE__DECLARES:
				getDeclares().clear();
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
			case CpntypesPackageImpl.CPN_TYPE__TIMED:
				return TIMED_EDEFAULT == null ? timed != null : !TIMED_EDEFAULT.equals(timed);
			case CpntypesPackageImpl.CPN_TYPE__DECLARES:
				return declares != null && !declares.isEmpty();
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
		result.append(" (timed: ");
		result.append(timed);
		result.append(", declares: ");
		result.append(declares);
		result.append(')');
		return result.toString();
	}

	protected String postFixAsString() {
		final StringBuilder sb = new StringBuilder();
		if (getTimed()) {
			sb.append(" timed");
		}
		final boolean kludge = false;
		for (final String declare : getDeclares()) {
			if (kludge) {
				sb.append(", ");
			} else {
				sb.append(" declare ");
			}
			sb.append(declare);
		}
		return sb.toString();
	}

} // CPNTypeImpl
