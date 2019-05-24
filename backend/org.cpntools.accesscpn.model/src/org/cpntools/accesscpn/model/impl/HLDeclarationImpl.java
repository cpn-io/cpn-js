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

import org.cpntools.accesscpn.model.HLDeclaration;
import org.cpntools.accesscpn.model.HasId;
import org.cpntools.accesscpn.model.declaration.DeclarationStructure;
import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.common.notify.NotificationChain;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.InternalEObject;
import org.eclipse.emf.ecore.impl.ENotificationImpl;


/**
 * <!-- begin-user-doc --> An implementation of the model object '<em><b>HL Declaration</b></em>'. <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * <ul>
 *   <li>{@link org.cpntools.accesscpn.model.impl.HLDeclarationImpl#getId <em>Id</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.impl.HLDeclarationImpl#getStructure <em>Structure</em>}</li>
 * </ul>
 * </p>
 *
 * @generated
 */
public class HLDeclarationImpl extends AnnotationImpl implements HLDeclaration {
	/**
	 * The default value of the '{@link #getId() <em>Id</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see #getId()
	 * @generated
	 * @ordered
	 */
	protected static final String ID_EDEFAULT = null;
	/**
	 * The cached value of the '{@link #getId() <em>Id</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see #getId()
	 * @generated
	 * @ordered
	 */
	protected String id = ID_EDEFAULT;
	/**
	 * The cached value of the '{@link #getStructure() <em>Structure</em>}' containment reference.
	 * <!-- begin-user-doc
	 * --> <!-- end-user-doc -->
	 * @see #getStructure()
	 * @generated
	 * @ordered
	 */
	protected DeclarationStructure structure;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	protected HLDeclarationImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return ModelPackageImpl.Literals.HL_DECLARATION;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public String getId() {
		return id;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setId(String newId) {
		String oldId = id;
		id = newId;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.HL_DECLARATION__ID, oldId, id));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public DeclarationStructure getStructure() {
		return structure;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public NotificationChain basicSetStructure(DeclarationStructure newStructure, NotificationChain msgs) {
		DeclarationStructure oldStructure = structure;
		structure = newStructure;
		if (eNotificationRequired()) {
			ENotificationImpl notification = new ENotificationImpl(this, Notification.SET, ModelPackageImpl.HL_DECLARATION__STRUCTURE, oldStructure, newStructure);
			if (msgs == null) msgs = notification; else msgs.add(notification);
		}
		return msgs;
	}

	/**
	 * @see org.cpntools.accesscpn.model.impl.AnnotationImpl#setText(java.lang.String)
	 */
	@Override
	public void setText(final String newText) {
		/*
		 * if (newText != null) throw new
		 * UnsupportedOperationException("Unable to parse declarations as text; please set the structure instead.");
		 * else setStructureGen(null); super.setText(newText);
		 */
	}

	/**
	 * @see org.cpntools.accesscpn.model.HLDeclaration#setStructure(org.cpntools.accesscpn.model.declaration.DeclarationStructure)
	 */
	@Override
    public void setStructure(final org.cpntools.accesscpn.model.declaration.DeclarationStructure newStructure) {
		setStructureGen(newStructure);
		if (newStructure != null) {
			super.setText(newStructure.asString());
		} else {
			super.setText("");
		}
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public void setStructureGen(DeclarationStructure newStructure) {
		if (newStructure != structure) {
			NotificationChain msgs = null;
			if (structure != null)
				msgs = ((InternalEObject)structure).eInverseRemove(this, EOPPOSITE_FEATURE_BASE - ModelPackageImpl.HL_DECLARATION__STRUCTURE, null, msgs);
			if (newStructure != null)
				msgs = ((InternalEObject)newStructure).eInverseAdd(this, EOPPOSITE_FEATURE_BASE - ModelPackageImpl.HL_DECLARATION__STRUCTURE, null, msgs);
			msgs = basicSetStructure(newStructure, msgs);
			if (msgs != null) msgs.dispatch();
		}
		else if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.HL_DECLARATION__STRUCTURE, newStructure, newStructure));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public NotificationChain eInverseRemove(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
			case ModelPackageImpl.HL_DECLARATION__STRUCTURE:
				return basicSetStructure(null, msgs);
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
			case ModelPackageImpl.HL_DECLARATION__ID:
				return getId();
			case ModelPackageImpl.HL_DECLARATION__STRUCTURE:
				return getStructure();
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
			case ModelPackageImpl.HL_DECLARATION__ID:
				setId((String)newValue);
				return;
			case ModelPackageImpl.HL_DECLARATION__STRUCTURE:
				setStructure((DeclarationStructure)newValue);
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
			case ModelPackageImpl.HL_DECLARATION__ID:
				setId(ID_EDEFAULT);
				return;
			case ModelPackageImpl.HL_DECLARATION__STRUCTURE:
				setStructure((DeclarationStructure)null);
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
			case ModelPackageImpl.HL_DECLARATION__ID:
				return ID_EDEFAULT == null ? id != null : !ID_EDEFAULT.equals(id);
			case ModelPackageImpl.HL_DECLARATION__STRUCTURE:
				return structure != null;
		}
		return super.eIsSet(featureID);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public int eBaseStructuralFeatureID(int derivedFeatureID, Class<?> baseClass) {
		if (baseClass == HasId.class) {
			switch (derivedFeatureID) {
				case ModelPackageImpl.HL_DECLARATION__ID: return ModelPackageImpl.HAS_ID__ID;
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
		if (baseClass == HasId.class) {
			switch (baseFeatureID) {
				case ModelPackageImpl.HAS_ID__ID: return ModelPackageImpl.HL_DECLARATION__ID;
				default: return -1;
			}
		}
		return super.eDerivedStructuralFeatureID(baseFeatureID, baseClass);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public String toString() {
		if (eIsProxy()) return super.toString();

		StringBuffer result = new StringBuffer(super.toString());
		result.append(" (id: ");
		result.append(id);
		result.append(')');
		return result.toString();
	}

} // HLDeclarationImpl
