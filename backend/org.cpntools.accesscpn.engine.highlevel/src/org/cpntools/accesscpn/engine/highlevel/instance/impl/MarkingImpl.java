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

import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import org.cpntools.accesscpn.engine.highlevel.instance.Instance;
import org.cpntools.accesscpn.engine.highlevel.instance.Marking;
import org.cpntools.accesscpn.engine.highlevel.instance.MultisetEntry;
import org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelData;
import org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelDataAdapterFactory;
import org.cpntools.accesscpn.model.PlaceNode;
import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.common.notify.NotificationChain;
import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.InternalEObject;
import org.eclipse.emf.ecore.impl.ENotificationImpl;
import org.eclipse.emf.ecore.impl.EObjectImpl;
import org.eclipse.emf.ecore.util.EObjectContainmentEList;
import org.eclipse.emf.ecore.util.InternalEList;

/**
 * <!-- begin-user-doc --> An implementation of the model object '<em><b>Marking</b></em>'. <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * <ul>
 *   <li>{@link org.cpntools.accesscpn.engine.highlevel.instance.impl.MarkingImpl#getPlaceInstance <em>Place Instance</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.engine.highlevel.instance.impl.MarkingImpl#getTokenCount <em>Token Count</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.engine.highlevel.instance.impl.MarkingImpl#getMarking <em>Marking</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.engine.highlevel.instance.impl.MarkingImpl#getStructuredMarking <em>Structured Marking</em>}</li>
 * </ul>
 * </p>
 *
 * @generated
 */
public class MarkingImpl extends EObjectImpl implements Marking {
	/**
	 * The cached value of the '{@link #getPlaceInstance() <em>Place Instance</em>}' reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getPlaceInstance()
	 * @generated
	 * @ordered
	 */
	protected Instance<? extends PlaceNode> placeInstance;

	/**
	 * The default value of the '{@link #getTokenCount() <em>Token Count</em>}' attribute.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #getTokenCount()
	 * @generated
	 * @ordered
	 */
	protected static final int TOKEN_COUNT_EDEFAULT = 0;

	/**
	 * The cached value of the '{@link #getTokenCount() <em>Token Count</em>}' attribute.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #getTokenCount()
	 * @generated
	 * @ordered
	 */
	protected int tokenCount = TOKEN_COUNT_EDEFAULT;

	/**
	 * The default value of the '{@link #getMarking() <em>Marking</em>}' attribute.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #getMarking()
	 * @generated
	 * @ordered
	 */
	protected static final String MARKING_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getMarking() <em>Marking</em>}' attribute.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #getMarking()
	 * @generated
	 * @ordered
	 */
	protected String marking = MARKING_EDEFAULT;

	/**
	 * The cached value of the '{@link #getStructuredMarking() <em>Structured Marking</em>}' containment reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see #getStructuredMarking()
	 * @generated
	 * @ordered
	 */
	protected EList<MultisetEntry> structuredMarking;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	protected MarkingImpl() {
		super();
	}

	protected MarkingImpl(final int tokens, final String marking) {
		super();
		tokenCount = tokens;
		this.marking = marking;
	}

	/**
	 * @param placeInstance
	 * @param marking
	 */
	public MarkingImpl(final Instance<PlaceNode> placeInstance, final List<MultisetEntry> marking) {
		this.placeInstance = placeInstance;
		getStructuredMarking().addAll(marking);
		updateTokenCount();
		updateUnstructuredMarking();
	}

	/**
	 * @param placeInstance
	 */
	public MarkingImpl(final Instance<PlaceNode> placeInstance) {
		this.placeInstance = placeInstance;
		getStructuredMarking();
		updateTokenCount();
		updateUnstructuredMarking();
	}

	private void updateUnstructuredMarking() {
		final StringBuilder sb = new StringBuilder();
		boolean first = true;
		boolean timed = false;
		try {
			final ModelData modelData = (ModelData) ModelDataAdapterFactory.getInstance().adapt(
			        getPlaceInstance().getNode().getPage().getPetriNet(), ModelData.class);
			timed = modelData.isTimed(getPlaceInstance());
		} catch (final Exception e) {
			// Ignore if any parent is unset
		}
		for (final MultisetEntry entry : getStructuredMarking()) {
			if (first) {
				first = false;
			} else {
				if (timed) {
					sb.append(" +++ ");
				} else {
					sb.append(" ++ ");
				}
			}
			sb.append(entry);
		}
		marking = sb.toString();
	}

	private void updateTokenCount() {
		tokenCount = 0;
		for (final MultisetEntry entry : getStructuredMarking()) {
			tokenCount += entry.getCoefficient();
		}
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return InstancePackageImpl.Literals.MARKING;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public int getTokenCount() {
		return tokenCount;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setTokenCount(int newTokenCount) {
		int oldTokenCount = tokenCount;
		tokenCount = newTokenCount;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, InstancePackageImpl.MARKING__TOKEN_COUNT, oldTokenCount, tokenCount));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public String getMarking() {
		return marking;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    @SuppressWarnings("unchecked")
	public Instance<? extends PlaceNode> getPlaceInstance() {
		if (placeInstance != null && ((EObject)placeInstance).eIsProxy()) {
			InternalEObject oldPlaceInstance = (InternalEObject)placeInstance;
			placeInstance = (Instance<? extends PlaceNode>)eResolveProxy(oldPlaceInstance);
			if (placeInstance != oldPlaceInstance) {
				if (eNotificationRequired())
					eNotify(new ENotificationImpl(this, Notification.RESOLVE, InstancePackageImpl.MARKING__PLACE_INSTANCE, oldPlaceInstance, placeInstance));
			}
		}
		return placeInstance;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public Instance<? extends PlaceNode> basicGetPlaceInstance() {
		return placeInstance;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setPlaceInstance(Instance<? extends PlaceNode> newPlaceInstance) {
		Instance<? extends PlaceNode> oldPlaceInstance = placeInstance;
		placeInstance = newPlaceInstance;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, InstancePackageImpl.MARKING__PLACE_INSTANCE, oldPlaceInstance, placeInstance));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public List<MultisetEntry> getStructuredMarking() {
		if (structuredMarking == null) {
			structuredMarking = new EObjectContainmentEList<MultisetEntry>(MultisetEntry.class, this, InstancePackageImpl.MARKING__STRUCTURED_MARKING);
		}
		return structuredMarking;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public NotificationChain eInverseRemove(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
			case InstancePackageImpl.MARKING__STRUCTURED_MARKING:
				return ((InternalEList<?>)getStructuredMarking()).basicRemove(otherEnd, msgs);
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
			case InstancePackageImpl.MARKING__PLACE_INSTANCE:
				if (resolve) return getPlaceInstance();
				return basicGetPlaceInstance();
			case InstancePackageImpl.MARKING__TOKEN_COUNT:
				return getTokenCount();
			case InstancePackageImpl.MARKING__MARKING:
				return getMarking();
			case InstancePackageImpl.MARKING__STRUCTURED_MARKING:
				return getStructuredMarking();
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
			case InstancePackageImpl.MARKING__PLACE_INSTANCE:
				setPlaceInstance((Instance<? extends PlaceNode>)newValue);
				return;
			case InstancePackageImpl.MARKING__TOKEN_COUNT:
				setTokenCount((Integer)newValue);
				return;
			case InstancePackageImpl.MARKING__STRUCTURED_MARKING:
				getStructuredMarking().clear();
				getStructuredMarking().addAll((Collection<? extends MultisetEntry>)newValue);
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
			case InstancePackageImpl.MARKING__PLACE_INSTANCE:
				setPlaceInstance((Instance<? extends PlaceNode>)null);
				return;
			case InstancePackageImpl.MARKING__TOKEN_COUNT:
				setTokenCount(TOKEN_COUNT_EDEFAULT);
				return;
			case InstancePackageImpl.MARKING__STRUCTURED_MARKING:
				getStructuredMarking().clear();
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
			case InstancePackageImpl.MARKING__PLACE_INSTANCE:
				return placeInstance != null;
			case InstancePackageImpl.MARKING__TOKEN_COUNT:
				return tokenCount != TOKEN_COUNT_EDEFAULT;
			case InstancePackageImpl.MARKING__MARKING:
				return MARKING_EDEFAULT == null ? marking != null : !MARKING_EDEFAULT.equals(marking);
			case InstancePackageImpl.MARKING__STRUCTURED_MARKING:
				return structuredMarking != null && !structuredMarking.isEmpty();
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
		if (placeInstance != null) {
			sb.append(placeInstance);
		}
		sb.append(": ");
		if (getMarking() == null) {
			updateUnstructuredMarking();
		}
		sb.append(getMarking().replaceAll("(\\+{2,3})\n", " $1 "));
		return sb.toString();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		int code = placeInstance.hashCode();
		if (getStructuredMarking() != null) {
			for (final MultisetEntry entry : getStructuredMarking()) {
				code = entry.hashCode() + 5 * code;
			}
		}
		if (marking != null) {
			code += marking.hashCode();
		}
		return code;
	}

	/**
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(final Object other) {
		if (other == null || !(other instanceof Marking)) { return false; }
		if (other == this) { return true; }
		final Marking o = (Marking) other;
		if (getStructuredMarking() == o.getStructuredMarking() && getMarking() == o.getMarking()) { return true; }
		if (getStructuredMarking() == null || o.getStructuredMarking() == null) { return false; }
		if (getStructuredMarking() != null && getStructuredMarking().size() != o.getStructuredMarking().size()) { return false; }
		if (getMarking() != null && !getMarking().equals(o.getMarking())) { return false; }
		if (getStructuredMarking() != null) {
			final Iterator<MultisetEntry> it = o.getStructuredMarking().iterator();
			for (final MultisetEntry mine : getStructuredMarking()) {
				final MultisetEntry others = it.next();
				if (mine != others && (mine == null || !mine.equals(others))) { return false; }
			}
		}
		return placeInstance == getPlaceInstance() || placeInstance != null
		        && placeInstance.equals(o.getPlaceInstance());
	}
} // MarkingImpl
