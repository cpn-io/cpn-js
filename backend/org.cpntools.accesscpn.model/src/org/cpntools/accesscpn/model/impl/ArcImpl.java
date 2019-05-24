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

import org.cpntools.accesscpn.model.Arc;
import org.cpntools.accesscpn.model.HLAnnotation;
import org.cpntools.accesscpn.model.HLArcAddin;
import org.cpntools.accesscpn.model.HLArcType;
import org.cpntools.accesscpn.model.Node;
import org.cpntools.accesscpn.model.Page;
import org.cpntools.accesscpn.model.PlaceNode;
import org.cpntools.accesscpn.model.Transition;
import org.cpntools.accesscpn.model.graphics.ArcGraphics;
import org.cpntools.accesscpn.model.graphics.Graphics;
import org.cpntools.accesscpn.model.graphics.HasGraphics;
import org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl;
import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.common.notify.NotificationChain;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.InternalEObject;
import org.eclipse.emf.ecore.impl.ENotificationImpl;
import org.eclipse.emf.ecore.util.EcoreUtil;

/**
 * <!-- begin-user-doc --> An implementation of the model object '<em><b>Arc</b></em>'. <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * <ul>
 *   <li>{@link org.cpntools.accesscpn.model.impl.ArcImpl#getGraphics <em>Graphics</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.impl.ArcImpl#getHlinscription <em>Hlinscription</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.impl.ArcImpl#getKind <em>Kind</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.impl.ArcImpl#getSource <em>Source</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.impl.ArcImpl#getTarget <em>Target</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.impl.ArcImpl#getPage <em>Page</em>}</li>
 * </ul>
 * </p>
 *
 * @generated
 */
public class ArcImpl extends HasIdImpl implements Arc {
	/**
	 * The cached value of the '{@link #getGraphics() <em>Graphics</em>}' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getGraphics()
	 * @generated
	 * @ordered
	 */
	protected Graphics graphics;

	/**
	 * The cached value of the '{@link #getHlinscription() <em>Hlinscription</em>}' containment reference. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see #getHlinscription()
	 * @generated
	 * @ordered
	 */
	protected HLAnnotation hlinscription;

	/**
	 * The default value of the '{@link #getKind() <em>Kind</em>}' attribute. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @see #getKind()
	 * @generated
	 * @ordered
	 */
	protected static final HLArcType KIND_EDEFAULT = HLArcType.NORMAL;

	/**
	 * The cached value of the '{@link #getKind() <em>Kind</em>}' attribute. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @see #getKind()
	 * @generated
	 * @ordered
	 */
	protected HLArcType kind = KIND_EDEFAULT;

	/**
	 * The cached value of the '{@link #getSource() <em>Source</em>}' reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #getSource()
	 * @generated
	 * @ordered
	 */
	protected Node source;

	/**
	 * The cached value of the '{@link #getTarget() <em>Target</em>}' reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #getTarget()
	 * @generated
	 * @ordered
	 */
	protected Node target;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	protected ArcImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return ModelPackageImpl.Literals.ARC;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Graphics getGraphics() {
		return graphics;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public NotificationChain basicSetGraphics(Graphics newGraphics, NotificationChain msgs) {
		Graphics oldGraphics = graphics;
		graphics = newGraphics;
		if (eNotificationRequired()) {
			ENotificationImpl notification = new ENotificationImpl(this, Notification.SET, ModelPackageImpl.ARC__GRAPHICS, oldGraphics, newGraphics);
			if (msgs == null) msgs = notification; else msgs.add(notification);
		}
		return msgs;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void setGraphics(Graphics newGraphics) {
		if (newGraphics != graphics) {
			NotificationChain msgs = null;
			if (graphics != null)
				msgs = ((InternalEObject)graphics).eInverseRemove(this, GraphicsPackageImpl.GRAPHICS__PARENT, Graphics.class, msgs);
			if (newGraphics != null)
				msgs = ((InternalEObject)newGraphics).eInverseAdd(this, GraphicsPackageImpl.GRAPHICS__PARENT, Graphics.class, msgs);
			msgs = basicSetGraphics(newGraphics, msgs);
			if (msgs != null) msgs.dispatch();
		}
		else if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.ARC__GRAPHICS, newGraphics, newGraphics));
	}

	/**
	 * @see org.cpntools.accesscpn.model.Arc#getArcGraphics()
	 */
	@Override
	public ArcGraphics getArcGraphics() {
		return (ArcGraphics) getGraphics();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public HLAnnotation getHlinscription() {
		if (hlinscription != null && ((EObject)hlinscription).eIsProxy()) {
			InternalEObject oldHlinscription = (InternalEObject)hlinscription;
			hlinscription = (HLAnnotation)eResolveProxy(oldHlinscription);
			if (hlinscription != oldHlinscription) {
				if (eNotificationRequired())
					eNotify(new ENotificationImpl(this, Notification.RESOLVE, ModelPackageImpl.ARC__HLINSCRIPTION, oldHlinscription, hlinscription));
			}
		}
		return hlinscription;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public HLAnnotation basicGetHlinscription() {
		return hlinscription;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void setHlinscription(HLAnnotation newHlinscription) {
		HLAnnotation oldHlinscription = hlinscription;
		hlinscription = newHlinscription;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.ARC__HLINSCRIPTION, oldHlinscription, hlinscription));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public HLArcType getKind() {
		return kind;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void setKind(HLArcType newKind) {
		HLArcType oldKind = kind;
		kind = newKind == null ? KIND_EDEFAULT : newKind;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.ARC__KIND, oldKind, kind));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Node getSource() {
		if (source != null && ((EObject)source).eIsProxy()) {
			InternalEObject oldSource = (InternalEObject)source;
			source = (Node)eResolveProxy(oldSource);
			if (source != oldSource) {
				if (eNotificationRequired())
					eNotify(new ENotificationImpl(this, Notification.RESOLVE, ModelPackageImpl.ARC__SOURCE, oldSource, source));
			}
		}
		return source;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public Node basicGetSource() {
		return source;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public NotificationChain basicSetSource(Node newSource, NotificationChain msgs) {
		Node oldSource = source;
		source = newSource;
		if (eNotificationRequired()) {
			ENotificationImpl notification = new ENotificationImpl(this, Notification.SET, ModelPackageImpl.ARC__SOURCE, oldSource, newSource);
			if (msgs == null) msgs = notification; else msgs.add(notification);
		}
		return msgs;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void setSource(Node newSource) {
		if (newSource != source) {
			NotificationChain msgs = null;
			if (source != null)
				msgs = ((InternalEObject)source).eInverseRemove(this, ModelPackageImpl.NODE__SOURCE_ARC, Node.class, msgs);
			if (newSource != null)
				msgs = ((InternalEObject)newSource).eInverseAdd(this, ModelPackageImpl.NODE__SOURCE_ARC, Node.class, msgs);
			msgs = basicSetSource(newSource, msgs);
			if (msgs != null) msgs.dispatch();
		}
		else if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.ARC__SOURCE, newSource, newSource));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Node getTarget() {
		if (target != null && ((EObject)target).eIsProxy()) {
			InternalEObject oldTarget = (InternalEObject)target;
			target = (Node)eResolveProxy(oldTarget);
			if (target != oldTarget) {
				if (eNotificationRequired())
					eNotify(new ENotificationImpl(this, Notification.RESOLVE, ModelPackageImpl.ARC__TARGET, oldTarget, target));
			}
		}
		return target;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public Node basicGetTarget() {
		return target;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public NotificationChain basicSetTarget(Node newTarget, NotificationChain msgs) {
		Node oldTarget = target;
		target = newTarget;
		if (eNotificationRequired()) {
			ENotificationImpl notification = new ENotificationImpl(this, Notification.SET, ModelPackageImpl.ARC__TARGET, oldTarget, newTarget);
			if (msgs == null) msgs = notification; else msgs.add(notification);
		}
		return msgs;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void setTarget(Node newTarget) {
		if (newTarget != target) {
			NotificationChain msgs = null;
			if (target != null)
				msgs = ((InternalEObject)target).eInverseRemove(this, ModelPackageImpl.NODE__TARGET_ARC, Node.class, msgs);
			if (newTarget != null)
				msgs = ((InternalEObject)newTarget).eInverseAdd(this, ModelPackageImpl.NODE__TARGET_ARC, Node.class, msgs);
			msgs = basicSetTarget(newTarget, msgs);
			if (msgs != null) msgs.dispatch();
		}
		else if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.ARC__TARGET, newTarget, newTarget));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Page getPage() {
		if (eContainerFeatureID() != ModelPackageImpl.ARC__PAGE) return null;
		return (Page)eContainer();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public NotificationChain basicSetPage(Page newPage, NotificationChain msgs) {
		msgs = eBasicSetContainer((InternalEObject)newPage, ModelPackageImpl.ARC__PAGE, msgs);
		return msgs;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void setPage(Page newPage) {
		if (newPage != eInternalContainer() || (eContainerFeatureID() != ModelPackageImpl.ARC__PAGE && newPage != null)) {
			if (EcoreUtil.isAncestor(this, (EObject)newPage))
				throw new IllegalArgumentException("Recursive containment not allowed for " + toString());
			NotificationChain msgs = null;
			if (eInternalContainer() != null)
				msgs = eBasicRemoveFromContainer(msgs);
			if (newPage != null)
				msgs = ((InternalEObject)newPage).eInverseAdd(this, ModelPackageImpl.PAGE__ARC, Page.class, msgs);
			msgs = basicSetPage(newPage, msgs);
			if (msgs != null) msgs.dispatch();
		}
		else if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.ARC__PAGE, newPage, newPage));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public NotificationChain eInverseAdd(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
			case ModelPackageImpl.ARC__GRAPHICS:
				if (graphics != null)
					msgs = ((InternalEObject)graphics).eInverseRemove(this, EOPPOSITE_FEATURE_BASE - ModelPackageImpl.ARC__GRAPHICS, null, msgs);
				return basicSetGraphics((Graphics)otherEnd, msgs);
			case ModelPackageImpl.ARC__SOURCE:
				if (source != null)
					msgs = ((InternalEObject)source).eInverseRemove(this, ModelPackageImpl.NODE__SOURCE_ARC, Node.class, msgs);
				return basicSetSource((Node)otherEnd, msgs);
			case ModelPackageImpl.ARC__TARGET:
				if (target != null)
					msgs = ((InternalEObject)target).eInverseRemove(this, ModelPackageImpl.NODE__TARGET_ARC, Node.class, msgs);
				return basicSetTarget((Node)otherEnd, msgs);
			case ModelPackageImpl.ARC__PAGE:
				if (eInternalContainer() != null)
					msgs = eBasicRemoveFromContainer(msgs);
				return basicSetPage((Page)otherEnd, msgs);
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
			case ModelPackageImpl.ARC__GRAPHICS:
				return basicSetGraphics(null, msgs);
			case ModelPackageImpl.ARC__SOURCE:
				return basicSetSource(null, msgs);
			case ModelPackageImpl.ARC__TARGET:
				return basicSetTarget(null, msgs);
			case ModelPackageImpl.ARC__PAGE:
				return basicSetPage(null, msgs);
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
			case ModelPackageImpl.ARC__PAGE:
				return eInternalContainer().eInverseRemove(this, ModelPackageImpl.PAGE__ARC, Page.class, msgs);
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
			case ModelPackageImpl.ARC__GRAPHICS:
				return getGraphics();
			case ModelPackageImpl.ARC__HLINSCRIPTION:
				if (resolve) return getHlinscription();
				return basicGetHlinscription();
			case ModelPackageImpl.ARC__KIND:
				return getKind();
			case ModelPackageImpl.ARC__SOURCE:
				if (resolve) return getSource();
				return basicGetSource();
			case ModelPackageImpl.ARC__TARGET:
				if (resolve) return getTarget();
				return basicGetTarget();
			case ModelPackageImpl.ARC__PAGE:
				return getPage();
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
			case ModelPackageImpl.ARC__GRAPHICS:
				setGraphics((Graphics)newValue);
				return;
			case ModelPackageImpl.ARC__HLINSCRIPTION:
				setHlinscription((HLAnnotation)newValue);
				return;
			case ModelPackageImpl.ARC__KIND:
				setKind((HLArcType)newValue);
				return;
			case ModelPackageImpl.ARC__SOURCE:
				setSource((Node)newValue);
				return;
			case ModelPackageImpl.ARC__TARGET:
				setTarget((Node)newValue);
				return;
			case ModelPackageImpl.ARC__PAGE:
				setPage((Page)newValue);
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
			case ModelPackageImpl.ARC__GRAPHICS:
				setGraphics((Graphics)null);
				return;
			case ModelPackageImpl.ARC__HLINSCRIPTION:
				setHlinscription((HLAnnotation)null);
				return;
			case ModelPackageImpl.ARC__KIND:
				setKind(KIND_EDEFAULT);
				return;
			case ModelPackageImpl.ARC__SOURCE:
				setSource((Node)null);
				return;
			case ModelPackageImpl.ARC__TARGET:
				setTarget((Node)null);
				return;
			case ModelPackageImpl.ARC__PAGE:
				setPage((Page)null);
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
			case ModelPackageImpl.ARC__GRAPHICS:
				return graphics != null;
			case ModelPackageImpl.ARC__HLINSCRIPTION:
				return hlinscription != null;
			case ModelPackageImpl.ARC__KIND:
				return kind != KIND_EDEFAULT;
			case ModelPackageImpl.ARC__SOURCE:
				return source != null;
			case ModelPackageImpl.ARC__TARGET:
				return target != null;
			case ModelPackageImpl.ARC__PAGE:
				return getPage() != null;
		}
		return super.eIsSet(featureID);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public int eBaseStructuralFeatureID(int derivedFeatureID, Class<?> baseClass) {
		if (baseClass == HasGraphics.class) {
			switch (derivedFeatureID) {
				case ModelPackageImpl.ARC__GRAPHICS: return GraphicsPackageImpl.HAS_GRAPHICS__GRAPHICS;
				default: return -1;
			}
		}
		if (baseClass == HLArcAddin.class) {
			switch (derivedFeatureID) {
				case ModelPackageImpl.ARC__HLINSCRIPTION: return ModelPackageImpl.HL_ARC_ADDIN__HLINSCRIPTION;
				case ModelPackageImpl.ARC__KIND: return ModelPackageImpl.HL_ARC_ADDIN__KIND;
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
		if (baseClass == HasGraphics.class) {
			switch (baseFeatureID) {
				case GraphicsPackageImpl.HAS_GRAPHICS__GRAPHICS: return ModelPackageImpl.ARC__GRAPHICS;
				default: return -1;
			}
		}
		if (baseClass == HLArcAddin.class) {
			switch (baseFeatureID) {
				case ModelPackageImpl.HL_ARC_ADDIN__HLINSCRIPTION: return ModelPackageImpl.ARC__HLINSCRIPTION;
				case ModelPackageImpl.HL_ARC_ADDIN__KIND: return ModelPackageImpl.ARC__KIND;
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
		result.append(" (kind: ");
		result.append(kind);
		result.append(')');
		return result.toString();
	}

	/**
	 * @see org.cpntools.accesscpn.model.Arc#getOtherEnd(org.cpntools.accesscpn.model.Node)
	 */
	@Override
	public Node getOtherEnd(final Node n) {
		if (getSource() == n) { return getTarget(); }
		if (getTarget() == n) { return getSource(); }
		return null;
	}

	/**
	 * @see org.cpntools.accesscpn.model.Arc#getPlaceNode()
	 */
	@Override
	public PlaceNode getPlaceNode() {
		if (getSource() != null && getSource() instanceof PlaceNode) { return (PlaceNode) getSource(); }
		if (getTarget() != null && getTarget() instanceof PlaceNode) { return (PlaceNode) getTarget(); }
		throw new IllegalStateException("Arc (" + getId() + ") is not connected to a place");
	}

	/**
	 * @see org.cpntools.accesscpn.model.Arc#getTransition()
	 */
	@Override
	public Transition getTransition() {
		if (getSource() != null && getSource() instanceof Transition) { return (Transition) getSource(); }
		if (getTarget() != null && getTarget() instanceof Transition) { return (Transition) getTarget(); }
		throw new IllegalStateException("Arc (" + getId() + ") from " + getSource() + " to " + getTarget()
		        + " is not connected to a transition");
	}

	/**
	 * @see org.cpntools.accesscpn.model.HLAnnotationAddin#isReady(boolean)
	 */
	@Override
	public boolean isReady() {
		try {
			return getHlinscription().isReady(false) && getPlaceNode().isReady();
		} catch (final NullPointerException e) {
			return false;
		}
	}

} // ArcImpl
