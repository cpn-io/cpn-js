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

import org.cpntools.accesscpn.model.cpntypes.CPNSubset;
import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.impl.ENotificationImpl;


/**
 * <!-- begin-user-doc --> An implementation of the model object '<em><b>CPN Subset</b></em>'. <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * <ul>
 *   <li>{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNSubsetImpl#getSort <em>Sort</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNSubsetImpl#getBy <em>By</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNSubsetImpl#getWith <em>With</em>}</li>
 * </ul>
 * </p>
 *
 * @generated
 */
public class CPNSubsetImpl extends CPNTypeImpl implements CPNSubset {
	/**
	 * The default value of the '{@link #getSort() <em>Sort</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getSort()
	 * @generated
	 * @ordered
	 */
	protected static final String SORT_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getSort() <em>Sort</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getSort()
	 * @generated
	 * @ordered
	 */
	protected String sort = SORT_EDEFAULT;

	/**
	 * The default value of the '{@link #getBy() <em>By</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see #getBy()
	 * @generated
	 * @ordered
	 */
	protected static final String BY_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getBy() <em>By</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see #getBy()
	 * @generated
	 * @ordered
	 */
	protected String by = BY_EDEFAULT;

	/**
	 * The default value of the '{@link #getWith() <em>With</em>}' attribute. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @see #getWith()
	 * @generated
	 * @ordered
	 */
	protected static final String WITH_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getWith() <em>With</em>}' attribute. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @see #getWith()
	 * @generated
	 * @ordered
	 */
	protected String with = WITH_EDEFAULT;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	protected CPNSubsetImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return CpntypesPackageImpl.Literals.CPN_SUBSET;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public String getBy() {
		return by;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setBy(String newBy) {
		String oldBy = by;
		by = newBy;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, CpntypesPackageImpl.CPN_SUBSET__BY, oldBy, by));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public String getWith() {
		return with;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setWith(String newWith) {
		String oldWith = with;
		with = newWith;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, CpntypesPackageImpl.CPN_SUBSET__WITH, oldWith, with));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public String getSort() {
		return sort;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setSort(String newSort) {
		String oldSort = sort;
		sort = newSort;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, CpntypesPackageImpl.CPN_SUBSET__SORT, oldSort, sort));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Object eGet(int featureID, boolean resolve, boolean coreType) {
		switch (featureID) {
			case CpntypesPackageImpl.CPN_SUBSET__SORT:
				return getSort();
			case CpntypesPackageImpl.CPN_SUBSET__BY:
				return getBy();
			case CpntypesPackageImpl.CPN_SUBSET__WITH:
				return getWith();
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
			case CpntypesPackageImpl.CPN_SUBSET__SORT:
				setSort((String)newValue);
				return;
			case CpntypesPackageImpl.CPN_SUBSET__BY:
				setBy((String)newValue);
				return;
			case CpntypesPackageImpl.CPN_SUBSET__WITH:
				setWith((String)newValue);
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
			case CpntypesPackageImpl.CPN_SUBSET__SORT:
				setSort(SORT_EDEFAULT);
				return;
			case CpntypesPackageImpl.CPN_SUBSET__BY:
				setBy(BY_EDEFAULT);
				return;
			case CpntypesPackageImpl.CPN_SUBSET__WITH:
				setWith(WITH_EDEFAULT);
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
			case CpntypesPackageImpl.CPN_SUBSET__SORT:
				return SORT_EDEFAULT == null ? sort != null : !SORT_EDEFAULT.equals(sort);
			case CpntypesPackageImpl.CPN_SUBSET__BY:
				return BY_EDEFAULT == null ? by != null : !BY_EDEFAULT.equals(by);
			case CpntypesPackageImpl.CPN_SUBSET__WITH:
				return WITH_EDEFAULT == null ? with != null : !WITH_EDEFAULT.equals(with);
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
		result.append(" (sort: ");
		result.append(sort);
		result.append(", by: ");
		result.append(by);
		result.append(", with: ");
		result.append(with);
		result.append(')');
		return result.toString();
	}

	/**
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNType#asString()
	 */
	@Override
    public String asString() {
		String appendString = "";
		if (getBy() != null) {
			appendString = " by " + getBy();
		} else if (getWith() != null) {
			appendString = " with " + getWith();
		}
		return "subset " + getSort() + postFixAsString() + appendString;
	}

} // CPNSubsetImpl
