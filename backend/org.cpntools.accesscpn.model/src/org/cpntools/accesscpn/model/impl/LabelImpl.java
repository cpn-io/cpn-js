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

import java.util.Collection;
import java.util.List;

import org.cpntools.accesscpn.model.HasLabel;
import org.cpntools.accesscpn.model.Label;
import org.cpntools.accesscpn.model.ToolInfo;
import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.common.notify.NotificationChain;
import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.InternalEObject;
import org.eclipse.emf.ecore.impl.ENotificationImpl;
import org.eclipse.emf.ecore.impl.EObjectImpl;
import org.eclipse.emf.ecore.util.EObjectContainmentWithInverseEList;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.ecore.util.InternalEList;


/**
 * <!-- begin-user-doc --> An implementation of the model object '<em><b>Label</b></em>'. <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * <ul>
 *   <li>{@link org.cpntools.accesscpn.model.impl.LabelImpl#getToolinfo <em>Toolinfo</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.impl.LabelImpl#getParent <em>Parent</em>}</li>
 * </ul>
 * </p>
 *
 * @generated
 */
public abstract class LabelImpl extends EObjectImpl implements Label {
	/**
	 * The cached value of the '{@link #getToolinfo() <em>Toolinfo</em>}' containment reference list. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see #getToolinfo()
	 * @generated
	 * @ordered
	 */
	protected EList<ToolInfo> toolinfo;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	protected LabelImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return ModelPackageImpl.Literals.LABEL;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public List<ToolInfo> getToolinfo() {
		if (toolinfo == null) {
			toolinfo = new EObjectContainmentWithInverseEList<ToolInfo>(ToolInfo.class, this, ModelPackageImpl.LABEL__TOOLINFO, ModelPackageImpl.TOOL_INFO__PARENT);
		}
		return toolinfo;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public HasLabel getParent() {
		if (eContainerFeatureID() != ModelPackageImpl.LABEL__PARENT) return null;
		return (HasLabel)eContainer();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public NotificationChain basicSetParent(HasLabel newParent, NotificationChain msgs) {
		msgs = eBasicSetContainer((InternalEObject)newParent, ModelPackageImpl.LABEL__PARENT, msgs);
		return msgs;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setParent(HasLabel newParent) {
		if (newParent != eInternalContainer() || (eContainerFeatureID() != ModelPackageImpl.LABEL__PARENT && newParent != null)) {
			if (EcoreUtil.isAncestor(this, (EObject)newParent))
				throw new IllegalArgumentException("Recursive containment not allowed for " + toString());
			NotificationChain msgs = null;
			if (eInternalContainer() != null)
				msgs = eBasicRemoveFromContainer(msgs);
			if (newParent != null)
				msgs = ((InternalEObject)newParent).eInverseAdd(this, ModelPackageImpl.HAS_LABEL__LABEL, HasLabel.class, msgs);
			msgs = basicSetParent(newParent, msgs);
			if (msgs != null) msgs.dispatch();
		}
		else if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.LABEL__PARENT, newParent, newParent));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @generated NOT
	 */
	@Override
    public abstract String asString();

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@SuppressWarnings("unchecked")
	@Override
	public NotificationChain eInverseAdd(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
			case ModelPackageImpl.LABEL__TOOLINFO:
				return ((InternalEList<InternalEObject>)(InternalEList<?>)getToolinfo()).basicAdd(otherEnd, msgs);
			case ModelPackageImpl.LABEL__PARENT:
				if (eInternalContainer() != null)
					msgs = eBasicRemoveFromContainer(msgs);
				return basicSetParent((HasLabel)otherEnd, msgs);
		}
		return super.eInverseAdd(otherEnd, featureID, msgs);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public NotificationChain eInverseRemove(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
			case ModelPackageImpl.LABEL__TOOLINFO:
				return ((InternalEList<?>)getToolinfo()).basicRemove(otherEnd, msgs);
			case ModelPackageImpl.LABEL__PARENT:
				return basicSetParent(null, msgs);
		}
		return super.eInverseRemove(otherEnd, featureID, msgs);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public NotificationChain eBasicRemoveFromContainerFeature(NotificationChain msgs) {
		switch (eContainerFeatureID()) {
			case ModelPackageImpl.LABEL__PARENT:
				return eInternalContainer().eInverseRemove(this, ModelPackageImpl.HAS_LABEL__LABEL, HasLabel.class, msgs);
		}
		return super.eBasicRemoveFromContainerFeature(msgs);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Object eGet(int featureID, boolean resolve, boolean coreType) {
		switch (featureID) {
			case ModelPackageImpl.LABEL__TOOLINFO:
				return getToolinfo();
			case ModelPackageImpl.LABEL__PARENT:
				return getParent();
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
			case ModelPackageImpl.LABEL__TOOLINFO:
				getToolinfo().clear();
				getToolinfo().addAll((Collection<? extends ToolInfo>)newValue);
				return;
			case ModelPackageImpl.LABEL__PARENT:
				setParent((HasLabel)newValue);
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
			case ModelPackageImpl.LABEL__TOOLINFO:
				getToolinfo().clear();
				return;
			case ModelPackageImpl.LABEL__PARENT:
				setParent((HasLabel)null);
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
			case ModelPackageImpl.LABEL__TOOLINFO:
				return toolinfo != null && !toolinfo.isEmpty();
			case ModelPackageImpl.LABEL__PARENT:
				return getParent() != null;
		}
		return super.eIsSet(featureID);
	}
} // LabelImpl
