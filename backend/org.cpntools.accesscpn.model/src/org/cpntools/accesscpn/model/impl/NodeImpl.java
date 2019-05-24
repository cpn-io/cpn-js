/************************************************************************/
/* Access/CPN */
/* Copyright 2010-2011 AIS Group, Eindhoven University of Technology */
/*                                                                      */
/* This library is free software; you can redistribute it and/or */
/* modify it under the terms of the GNU Lesser General Public */
/* License as published by the Free Software Foundation; either */
/* version 2.1 of the License, or (at your option) any later version. */
/*                                                                      */
/* This library is distributed in the hope that it will be useful, */
/* but WITHOUT ANY WARRANTY; without even the implied warranty of */
/* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU */
/* Lesser General Public License for more details. */
/*                                                                      */
/* You should have received a copy of the GNU Lesser General Public */
/* License along with this library; if not, write to the Free Software */
/* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, */
/* MA 02110-1301 USA */
/************************************************************************/
/**
 * <copyright> </copyright> $Id$
 */
package org.cpntools.accesscpn.model.impl;

import java.util.Collection;
import java.util.List;

import org.cpntools.accesscpn.model.Arc;
import org.cpntools.accesscpn.model.Node;
import org.cpntools.accesscpn.model.graphics.NodeGraphics;
import org.eclipse.emf.common.notify.NotificationChain;
import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.InternalEObject;
import org.eclipse.emf.ecore.util.EObjectWithInverseResolvingEList;
import org.eclipse.emf.ecore.util.InternalEList;

/**
 * <!-- begin-user-doc --> An implementation of the model object '<em><b>Node</b></em>'. <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * <ul>
 *   <li>{@link org.cpntools.accesscpn.model.impl.NodeImpl#getSourceArc <em>Source Arc</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.impl.NodeImpl#getTargetArc <em>Target Arc</em>}</li>
 * </ul>
 * </p>
 *
 * @generated
 */
public abstract class NodeImpl extends ObjectImpl implements Node {
	/**
	 * The cached value of the '{@link #getSourceArc() <em>Source Arc</em>}' reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getSourceArc()
	 * @generated
	 * @ordered
	 */
	protected EList<Arc> sourceArc;

	/**
	 * The cached value of the '{@link #getTargetArc() <em>Target Arc</em>}' reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getTargetArc()
	 * @generated
	 * @ordered
	 */
	protected EList<Arc> targetArc;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	protected NodeImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return ModelPackageImpl.Literals.NODE;
	}

	/**
	 * @see org.cpntools.accesscpn.model.Node#getNodeGraphics()
	 */
	@Override
	public NodeGraphics getNodeGraphics() {
		return (NodeGraphics) getGraphics();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public List<Arc> getSourceArc() {
		if (sourceArc == null) {
			sourceArc = new EObjectWithInverseResolvingEList<Arc>(Arc.class, this, ModelPackageImpl.NODE__SOURCE_ARC, ModelPackageImpl.ARC__SOURCE);
		}
		return sourceArc;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public List<Arc> getTargetArc() {
		if (targetArc == null) {
			targetArc = new EObjectWithInverseResolvingEList<Arc>(Arc.class, this, ModelPackageImpl.NODE__TARGET_ARC, ModelPackageImpl.ARC__TARGET);
		}
		return targetArc;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@SuppressWarnings("unchecked")
	@Override
	public NotificationChain eInverseAdd(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
			case ModelPackageImpl.NODE__SOURCE_ARC:
				return ((InternalEList<InternalEObject>)(InternalEList<?>)getSourceArc()).basicAdd(otherEnd, msgs);
			case ModelPackageImpl.NODE__TARGET_ARC:
				return ((InternalEList<InternalEObject>)(InternalEList<?>)getTargetArc()).basicAdd(otherEnd, msgs);
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
			case ModelPackageImpl.NODE__SOURCE_ARC:
				return ((InternalEList<?>)getSourceArc()).basicRemove(otherEnd, msgs);
			case ModelPackageImpl.NODE__TARGET_ARC:
				return ((InternalEList<?>)getTargetArc()).basicRemove(otherEnd, msgs);
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
			case ModelPackageImpl.NODE__SOURCE_ARC:
				return getSourceArc();
			case ModelPackageImpl.NODE__TARGET_ARC:
				return getTargetArc();
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
			case ModelPackageImpl.NODE__SOURCE_ARC:
				getSourceArc().clear();
				getSourceArc().addAll((Collection<? extends Arc>)newValue);
				return;
			case ModelPackageImpl.NODE__TARGET_ARC:
				getTargetArc().clear();
				getTargetArc().addAll((Collection<? extends Arc>)newValue);
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
			case ModelPackageImpl.NODE__SOURCE_ARC:
				getSourceArc().clear();
				return;
			case ModelPackageImpl.NODE__TARGET_ARC:
				getTargetArc().clear();
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
			case ModelPackageImpl.NODE__SOURCE_ARC:
				return sourceArc != null && !sourceArc.isEmpty();
			case ModelPackageImpl.NODE__TARGET_ARC:
				return targetArc != null && !targetArc.isEmpty();
		}
		return super.eIsSet(featureID);
	}

	/**
	 * @see org.cpntools.accesscpn.model.HLAnnotationAddin#isReady(boolean)
	 */
	@Override
	public boolean isReady() {
		return getName().isReady(false);
	}
} // NodeImpl
