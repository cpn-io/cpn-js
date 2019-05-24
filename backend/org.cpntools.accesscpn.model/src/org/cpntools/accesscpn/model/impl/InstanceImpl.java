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

import java.util.Collection;
import java.util.List;

import org.cpntools.accesscpn.model.Instance;
import org.cpntools.accesscpn.model.ParameterAssignment;
import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.common.notify.NotificationChain;
import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.InternalEObject;
import org.eclipse.emf.ecore.impl.ENotificationImpl;
import org.eclipse.emf.ecore.util.EObjectContainmentWithInverseEList;
import org.eclipse.emf.ecore.util.InternalEList;


/**
 * <!-- begin-user-doc -->
 * An implementation of the model object '<em><b>Instance</b></em>'.
 * <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * <ul>
 *   <li>{@link org.cpntools.accesscpn.model.impl.InstanceImpl#getParameterAssignment <em>Parameter Assignment</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.impl.InstanceImpl#getSubPageID <em>Sub Page ID</em>}</li>
 * </ul>
 * </p>
 *
 * @generated
 */
public class InstanceImpl extends NodeImpl implements Instance {
	/**
	 * The cached value of the '{@link #getParameterAssignment() <em>Parameter Assignment</em>}' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getParameterAssignment()
	 * @generated
	 * @ordered
	 */
	protected EList<ParameterAssignment> parameterAssignment;

	/**
	 * The default value of the '{@link #getSubPageID() <em>Sub Page ID</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getSubPageID()
	 * @generated
	 * @ordered
	 */
	protected static final String SUB_PAGE_ID_EDEFAULT = null;
	/**
	 * The cached value of the '{@link #getSubPageID() <em>Sub Page ID</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getSubPageID()
	 * @generated
	 * @ordered
	 */
	protected String subPageID = SUB_PAGE_ID_EDEFAULT;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	protected InstanceImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return ModelPackageImpl.Literals.INSTANCE;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public List<ParameterAssignment> getParameterAssignment() {
		if (parameterAssignment == null) {
			parameterAssignment = new EObjectContainmentWithInverseEList<ParameterAssignment>(ParameterAssignment.class, this, ModelPackageImpl.INSTANCE__PARAMETER_ASSIGNMENT, ModelPackageImpl.PARAMETER_ASSIGNMENT__INSTANCE);
		}
		return parameterAssignment;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public String getSubPageID() {
		return subPageID;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setSubPageID(String newSubPageID) {
		String oldSubPageID = subPageID;
		subPageID = newSubPageID;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.INSTANCE__SUB_PAGE_ID, oldSubPageID, subPageID));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@SuppressWarnings("unchecked")
	@Override
	public NotificationChain eInverseAdd(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
			case ModelPackageImpl.INSTANCE__PARAMETER_ASSIGNMENT:
				return ((InternalEList<InternalEObject>)(InternalEList<?>)getParameterAssignment()).basicAdd(otherEnd, msgs);
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
			case ModelPackageImpl.INSTANCE__PARAMETER_ASSIGNMENT:
				return ((InternalEList<?>)getParameterAssignment()).basicRemove(otherEnd, msgs);
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
			case ModelPackageImpl.INSTANCE__PARAMETER_ASSIGNMENT:
				return getParameterAssignment();
			case ModelPackageImpl.INSTANCE__SUB_PAGE_ID:
				return getSubPageID();
		}
		return super.eGet(featureID, resolve, coreType);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@SuppressWarnings("unchecked")
	@Override
	public void eSet(int featureID, Object newValue) {
		switch (featureID) {
			case ModelPackageImpl.INSTANCE__PARAMETER_ASSIGNMENT:
				getParameterAssignment().clear();
				getParameterAssignment().addAll((Collection<? extends ParameterAssignment>)newValue);
				return;
			case ModelPackageImpl.INSTANCE__SUB_PAGE_ID:
				setSubPageID((String)newValue);
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
			case ModelPackageImpl.INSTANCE__PARAMETER_ASSIGNMENT:
				getParameterAssignment().clear();
				return;
			case ModelPackageImpl.INSTANCE__SUB_PAGE_ID:
				setSubPageID(SUB_PAGE_ID_EDEFAULT);
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
			case ModelPackageImpl.INSTANCE__PARAMETER_ASSIGNMENT:
				return parameterAssignment != null && !parameterAssignment.isEmpty();
			case ModelPackageImpl.INSTANCE__SUB_PAGE_ID:
				return SUB_PAGE_ID_EDEFAULT == null ? subPageID != null : !SUB_PAGE_ID_EDEFAULT.equals(subPageID);
		}
		return super.eIsSet(featureID);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public String toString() {
		if (eIsProxy()) return super.toString();

		StringBuffer result = new StringBuffer(super.toString());
		result.append(" (subPageID: ");
		result.append(subPageID);
		result.append(')');
		return result.toString();
	}

} //InstanceImpl
