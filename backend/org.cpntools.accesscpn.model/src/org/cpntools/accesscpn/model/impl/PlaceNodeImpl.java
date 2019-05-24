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
package org.cpntools.accesscpn.model.impl;

import org.cpntools.accesscpn.model.HLMarking;
import org.cpntools.accesscpn.model.HLPlaceAddin;
import org.cpntools.accesscpn.model.PlaceNode;
import org.cpntools.accesscpn.model.Sort;
import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.InternalEObject;
import org.eclipse.emf.ecore.impl.ENotificationImpl;


/**
 * <!-- begin-user-doc --> An implementation of the model object '<em><b>Place Node</b></em>'. <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * <ul>
 *   <li>{@link org.cpntools.accesscpn.model.impl.PlaceNodeImpl#getSort <em>Sort</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.impl.PlaceNodeImpl#getInitialMarking <em>Initial Marking</em>}</li>
 * </ul>
 * </p>
 *
 * @generated
 */
public abstract class PlaceNodeImpl extends NodeImpl implements PlaceNode {
	/**
	 * The cached value of the '{@link #getSort() <em>Sort</em>}' reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getSort()
	 * @generated
	 * @ordered
	 */
	protected Sort sort;

	/**
	 * The cached value of the '{@link #getInitialMarking() <em>Initial Marking</em>}' reference.
	 * <!-- begin-user-doc
	 * --> <!-- end-user-doc -->
	 * @see #getInitialMarking()
	 * @generated
	 * @ordered
	 */
	protected HLMarking initialMarking;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	protected PlaceNodeImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return ModelPackageImpl.Literals.PLACE_NODE;
	}


	/**
	 * @see org.cpntools.accesscpn.model.HLPlaceAddin#setSort(org.cpntools.accesscpn.model.Sort)
	 */
	@Override
    public void setSort(final Sort newType) {
		if (sort != null) {
			sort.setParent(null);
		}
		setSortGen(newType);
		if (newType != null) {
			newType.setParent(this);
		}
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public void setSortGen(Sort newSort) {
		Sort oldSort = sort;
		sort = newSort;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.PLACE_NODE__SORT, oldSort, sort));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public HLMarking getInitialMarking() {
		if (initialMarking != null && ((EObject)initialMarking).eIsProxy()) {
			InternalEObject oldInitialMarking = (InternalEObject)initialMarking;
			initialMarking = (HLMarking)eResolveProxy(oldInitialMarking);
			if (initialMarking != oldInitialMarking) {
				if (eNotificationRequired())
					eNotify(new ENotificationImpl(this, Notification.RESOLVE, ModelPackageImpl.PLACE_NODE__INITIAL_MARKING, oldInitialMarking, initialMarking));
			}
		}
		return initialMarking;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public HLMarking basicGetInitialMarking() {
		return initialMarking;
	}

	/**
	 * @see org.cpntools.accesscpn.model.HLPlaceAddin#setInitialMarking(org.cpntools.accesscpn.model.HLMarking)
	 */
	@Override
    public void setInitialMarking(final HLMarking newInitialMarking) {
		if (initialMarking != null) {
			initialMarking.setParent(null);
		}
		setInitialMarkingGen(newInitialMarking);
		if (newInitialMarking != null) {
			newInitialMarking.setParent(this);
		}
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public void setInitialMarkingGen(HLMarking newInitialMarking) {
		HLMarking oldInitialMarking = initialMarking;
		initialMarking = newInitialMarking;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.PLACE_NODE__INITIAL_MARKING, oldInitialMarking, initialMarking));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public Sort getSort() {
		if (sort != null && ((EObject)sort).eIsProxy()) {
			InternalEObject oldSort = (InternalEObject)sort;
			sort = (Sort)eResolveProxy(oldSort);
			if (sort != oldSort) {
				if (eNotificationRequired())
					eNotify(new ENotificationImpl(this, Notification.RESOLVE, ModelPackageImpl.PLACE_NODE__SORT, oldSort, sort));
			}
		}
		return sort;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public Sort basicGetSort() {
		return sort;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Object eGet(int featureID, boolean resolve, boolean coreType) {
		switch (featureID) {
			case ModelPackageImpl.PLACE_NODE__SORT:
				if (resolve) return getSort();
				return basicGetSort();
			case ModelPackageImpl.PLACE_NODE__INITIAL_MARKING:
				if (resolve) return getInitialMarking();
				return basicGetInitialMarking();
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
			case ModelPackageImpl.PLACE_NODE__SORT:
				setSort((Sort)newValue);
				return;
			case ModelPackageImpl.PLACE_NODE__INITIAL_MARKING:
				setInitialMarking((HLMarking)newValue);
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
			case ModelPackageImpl.PLACE_NODE__SORT:
				setSort((Sort)null);
				return;
			case ModelPackageImpl.PLACE_NODE__INITIAL_MARKING:
				setInitialMarking((HLMarking)null);
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
			case ModelPackageImpl.PLACE_NODE__SORT:
				return sort != null;
			case ModelPackageImpl.PLACE_NODE__INITIAL_MARKING:
				return initialMarking != null;
		}
		return super.eIsSet(featureID);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public int eBaseStructuralFeatureID(int derivedFeatureID, Class<?> baseClass) {
		if (baseClass == HLPlaceAddin.class) {
			switch (derivedFeatureID) {
				case ModelPackageImpl.PLACE_NODE__SORT: return ModelPackageImpl.HL_PLACE_ADDIN__SORT;
				case ModelPackageImpl.PLACE_NODE__INITIAL_MARKING: return ModelPackageImpl.HL_PLACE_ADDIN__INITIAL_MARKING;
				default: return -1;
			}
		}
		return super.eBaseStructuralFeatureID(derivedFeatureID, baseClass);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public int eDerivedStructuralFeatureID(int baseFeatureID, Class<?> baseClass) {
		if (baseClass == HLPlaceAddin.class) {
			switch (baseFeatureID) {
				case ModelPackageImpl.HL_PLACE_ADDIN__SORT: return ModelPackageImpl.PLACE_NODE__SORT;
				case ModelPackageImpl.HL_PLACE_ADDIN__INITIAL_MARKING: return ModelPackageImpl.PLACE_NODE__INITIAL_MARKING;
				default: return -1;
			}
		}
		return super.eDerivedStructuralFeatureID(baseFeatureID, baseClass);
	}

	/**
	 * @see org.cpntools.accesscpn.model.HLAnnotationAddin#isReady(boolean)
	 */
	@Override
	public boolean isReady() {
		try {
			return super.isReady() && getSort().isReady(false) && getInitialMarking().isReady(true);
		} catch (final NullPointerException e) {
			return false;
		}
	}
} // PlaceNodeImpl
