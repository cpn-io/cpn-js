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
 * <copyright>
 * </copyright>
 *
 * $Id$
 */
package org.cpntools.accesscpn.model.impl;

import org.cpntools.accesscpn.model.FusionGroup;
import org.cpntools.accesscpn.model.PetriNet;
import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.common.notify.NotificationChain;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.InternalEObject;
import org.eclipse.emf.ecore.impl.ENotificationImpl;


/**
 * <!-- begin-user-doc -->
 * An implementation of the model object '<em><b>Fusion Group</b></em>'.
 * <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * <ul>
 *   <li>{@link org.cpntools.accesscpn.model.impl.FusionGroupImpl#getPetriNet <em>Petri Net</em>}</li>
 * </ul>
 * </p>
 *
 * @generated
 */
public class FusionGroupImpl extends PlaceImpl implements FusionGroup {
	/**
	 * The cached value of the '{@link #getPetriNet() <em>Petri Net</em>}' reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getPetriNet()
	 * @generated
	 * @ordered
	 */
	protected PetriNet petriNet;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	protected FusionGroupImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return ModelPackageImpl.Literals.FUSION_GROUP;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public PetriNet getPetriNet() {
		if (petriNet != null && ((EObject)petriNet).eIsProxy()) {
			InternalEObject oldPetriNet = (InternalEObject)petriNet;
			petriNet = (PetriNet)eResolveProxy(oldPetriNet);
			if (petriNet != oldPetriNet) {
				if (eNotificationRequired())
					eNotify(new ENotificationImpl(this, Notification.RESOLVE, ModelPackageImpl.FUSION_GROUP__PETRI_NET, oldPetriNet, petriNet));
			}
		}
		return petriNet;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public PetriNet basicGetPetriNet() {
		return petriNet;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public NotificationChain basicSetPetriNet(PetriNet newPetriNet, NotificationChain msgs) {
		PetriNet oldPetriNet = petriNet;
		petriNet = newPetriNet;
		if (eNotificationRequired()) {
			ENotificationImpl notification = new ENotificationImpl(this, Notification.SET, ModelPackageImpl.FUSION_GROUP__PETRI_NET, oldPetriNet, newPetriNet);
			if (msgs == null) msgs = notification; else msgs.add(notification);
		}
		return msgs;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setPetriNet(PetriNet newPetriNet) {
		if (newPetriNet != petriNet) {
			NotificationChain msgs = null;
			if (petriNet != null)
				msgs = ((InternalEObject)petriNet).eInverseRemove(this, ModelPackageImpl.PETRI_NET__FUSION_GROUPS, PetriNet.class, msgs);
			if (newPetriNet != null)
				msgs = ((InternalEObject)newPetriNet).eInverseAdd(this, ModelPackageImpl.PETRI_NET__FUSION_GROUPS, PetriNet.class, msgs);
			msgs = basicSetPetriNet(newPetriNet, msgs);
			if (msgs != null) msgs.dispatch();
		}
		else if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.FUSION_GROUP__PETRI_NET, newPetriNet, newPetriNet));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public NotificationChain eInverseAdd(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
			case ModelPackageImpl.FUSION_GROUP__PETRI_NET:
				if (petriNet != null)
					msgs = ((InternalEObject)petriNet).eInverseRemove(this, ModelPackageImpl.PETRI_NET__FUSION_GROUPS, PetriNet.class, msgs);
				return basicSetPetriNet((PetriNet)otherEnd, msgs);
		}
		return super.eInverseAdd(otherEnd, featureID, msgs);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public NotificationChain eInverseRemove(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
			case ModelPackageImpl.FUSION_GROUP__PETRI_NET:
				return basicSetPetriNet(null, msgs);
		}
		return super.eInverseRemove(otherEnd, featureID, msgs);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Object eGet(int featureID, boolean resolve, boolean coreType) {
		switch (featureID) {
			case ModelPackageImpl.FUSION_GROUP__PETRI_NET:
				if (resolve) return getPetriNet();
				return basicGetPetriNet();
		}
		return super.eGet(featureID, resolve, coreType);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void eSet(int featureID, Object newValue) {
		switch (featureID) {
			case ModelPackageImpl.FUSION_GROUP__PETRI_NET:
				setPetriNet((PetriNet)newValue);
				return;
		}
		super.eSet(featureID, newValue);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void eUnset(int featureID) {
		switch (featureID) {
			case ModelPackageImpl.FUSION_GROUP__PETRI_NET:
				setPetriNet((PetriNet)null);
				return;
		}
		super.eUnset(featureID);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public boolean eIsSet(int featureID) {
		switch (featureID) {
			case ModelPackageImpl.FUSION_GROUP__PETRI_NET:
				return petriNet != null;
		}
		return super.eIsSet(featureID);
	}

} //FusionGroupImpl
