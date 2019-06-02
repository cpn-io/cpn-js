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
package org.cpntools.accesscpn.engine.highlevel.instance.impl;

import org.cpntools.accesscpn.engine.highlevel.checker.LocalChecker;
import org.cpntools.accesscpn.engine.highlevel.instance.Instance;
import org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelInstance;
import org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelInstanceAdapterFactory;
import org.cpntools.accesscpn.model.Node;
import org.cpntools.accesscpn.model.Page;
import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.InternalEObject;
import org.eclipse.emf.ecore.impl.ENotificationImpl;
import org.eclipse.emf.ecore.impl.EObjectImpl;

/**
 * <!-- begin-user-doc --> An implementation of the model object '<em><b>Instance</b></em>'. <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * <ul>
 *   <li>{@link org.cpntools.accesscpn.engine.highlevel.instance.impl.InstanceImpl#getNode <em>Node</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.engine.highlevel.instance.impl.InstanceImpl#getTransitionPath <em>Transition Path</em>}</li>
 * </ul>
 * </p>
 *
 * @generated
 */
public class InstanceImpl<T> extends EObjectImpl implements Instance<T> {
	/**
	 * The cached value of the '{@link #getNode() <em>Node</em>}' reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @see #getNode()
	 * @generated
	 * @ordered
	 */
	protected T node;

	/**
	 * The cached value of the '{@link #getTransitionPath() <em>Transition Path</em>}' reference.
	 * <!-- begin-user-doc
	 * --> <!-- end-user-doc -->
	 * @see #getTransitionPath()
	 * @generated
	 * @ordered
	 */
	protected Instance<org.cpntools.accesscpn.model.Instance> transitionPath;

	int instanceNumber;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	protected InstanceImpl() {
		super();
	}

	protected InstanceImpl(final T node, final int instanceNumber) {
		this(node, instanceNumber, null);
	}

	/**
	 * @param node
	 * @param transitionList
	 */
	public InstanceImpl(final T node, final Instance<org.cpntools.accesscpn.model.Instance> transitionList) {
		this(node, -1, transitionList);
	}

	/**
	 * @param node
	 * @param instanceNumber
	 * @param transitionList
	 */
	public InstanceImpl(final T node, final int instanceNumber,
	        final Instance<org.cpntools.accesscpn.model.Instance> transitionList) {
		super();
		this.node = node;
		this.instanceNumber = instanceNumber;
		setTransitionPath(transitionList);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return InstancePackageImpl.Literals.INSTANCE;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	@SuppressWarnings("unchecked")
	public T getNode() {
		if (node != null && ((EObject)node).eIsProxy()) {
			InternalEObject oldNode = (InternalEObject)node;
			node = (T)eResolveProxy(oldNode);
			if (node != oldNode) {
				if (eNotificationRequired())
					eNotify(new ENotificationImpl(this, Notification.RESOLVE, InstancePackageImpl.INSTANCE__NODE, oldNode, node));
			}
		}
		return node;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public T basicGetNode() {
		return node;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void setNode(T newNode) {
		T oldNode = node;
		node = newNode;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, InstancePackageImpl.INSTANCE__NODE, oldNode, node));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	@SuppressWarnings("unchecked")
	public Instance<org.cpntools.accesscpn.model.Instance> getTransitionPath() {
		if (transitionPath != null && ((EObject)transitionPath).eIsProxy()) {
			InternalEObject oldTransitionPath = (InternalEObject)transitionPath;
			transitionPath = (Instance<org.cpntools.accesscpn.model.Instance>)eResolveProxy(oldTransitionPath);
			if (transitionPath != oldTransitionPath) {
				if (eNotificationRequired())
					eNotify(new ENotificationImpl(this, Notification.RESOLVE, InstancePackageImpl.INSTANCE__TRANSITION_PATH, oldTransitionPath, transitionPath));
			}
		}
		return transitionPath;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public Instance<org.cpntools.accesscpn.model.Instance> basicGetTransitionPath() {
		return transitionPath;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void setTransitionPath(Instance<org.cpntools.accesscpn.model.Instance> newTransitionPath) {
		Instance<org.cpntools.accesscpn.model.Instance> oldTransitionPath = transitionPath;
		transitionPath = newTransitionPath;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, InstancePackageImpl.INSTANCE__TRANSITION_PATH, oldTransitionPath, transitionPath));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Object eGet(int featureID, boolean resolve, boolean coreType) {
		switch (featureID) {
			case InstancePackageImpl.INSTANCE__NODE:
				if (resolve) return getNode();
				return basicGetNode();
			case InstancePackageImpl.INSTANCE__TRANSITION_PATH:
				if (resolve) return getTransitionPath();
				return basicGetTransitionPath();
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
			case InstancePackageImpl.INSTANCE__NODE:
				setNode((T)newValue);
				return;
			case InstancePackageImpl.INSTANCE__TRANSITION_PATH:
				setTransitionPath((Instance<org.cpntools.accesscpn.model.Instance>)newValue);
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
			case InstancePackageImpl.INSTANCE__NODE:
				setNode((T)null);
				return;
			case InstancePackageImpl.INSTANCE__TRANSITION_PATH:
				setTransitionPath((Instance<org.cpntools.accesscpn.model.Instance>)null);
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
			case InstancePackageImpl.INSTANCE__NODE:
				return node != null;
			case InstancePackageImpl.INSTANCE__TRANSITION_PATH:
				return transitionPath != null;
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
		if (eIsProxy()) { return super.toString(); }

		final StringBuilder sb = new StringBuilder();
		if (getTransitionPath() == null) {
			if (node instanceof Node) {
				sb.append(LocalChecker.getName(((Node) node).getPage()));
				sb.append('.');
			}
		} else {
			sb.append(getTransitionPath());
			sb.append('.');
		}
		if (node instanceof Node) {
			sb.append(LocalChecker.getName(((Node) node)));
		} else if (node instanceof Page) {
			sb.append(LocalChecker.getName(((Page) node)));
		}

		return sb.toString();
	}

	/**
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.Instance#getInstanceNumber()
	 */
	@Override
	public int getInstanceNumber() {
		if (instanceNumber <= 0 && getNode() != null) {
			if (getNode() instanceof Page) {
				final Page p = (Page) getNode();
				final ModelInstance modeInstance = (ModelInstance) ModelInstanceAdapterFactory.getInstance().adapt(
				        p.getPetriNet(), ModelInstance.class);
				return modeInstance.getInstanceNumbers().get(this);
			}
			if (getNode() instanceof Node) {
				final Node n = (Node) getNode();
				final ModelInstance modeInstance = (ModelInstance) ModelInstanceAdapterFactory.getInstance().adapt(
				        n.getPage().getPetriNet(), ModelInstance.class);
				final Instance<Page> parentInstance = modeInstance.getParentInstance((Instance<?>) this);
				return modeInstance.getInstanceNumbers().get(parentInstance);
			}
		}
		return instanceNumber;
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		int code = 23;
		if (getNode() != null) {
			code += getNode().hashCode();
		}
		if (getTransitionPath() != null) {
			code += getTransitionPath().hashCode();
		}
		return code;
	}

	/**
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(final Object other) {
		if (other == this) { return true; }
		if (other == null || !(other instanceof Instance<?>)) { return false; }
		final Instance<?> o = (Instance<?>) other;
		if (getNode() == null) { return o.getNode() == null; }
		if (!getNode().equals(o.getNode())) { return false; }
		if (getTransitionPath() == null) { return o.getTransitionPath() == null; }
		return getTransitionPath().equals(o.getTransitionPath());
	}
} // InstanceImpl
