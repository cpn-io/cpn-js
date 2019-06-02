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
import org.cpntools.accesscpn.model.HasName;
import org.cpntools.accesscpn.model.HasToolInfo;
import org.cpntools.accesscpn.model.Label;
import org.cpntools.accesscpn.model.Name;
import org.cpntools.accesscpn.model.Page;
import org.cpntools.accesscpn.model.ToolInfo;
import org.cpntools.accesscpn.model.graphics.Graphics;
import org.cpntools.accesscpn.model.graphics.HasGraphics;
import org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl;
import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.common.notify.NotificationChain;
import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.InternalEObject;
import org.eclipse.emf.ecore.impl.ENotificationImpl;
import org.eclipse.emf.ecore.util.EObjectContainmentWithInverseEList;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.ecore.util.InternalEList;


/**
 * <!-- begin-user-doc --> An implementation of the model object '<em><b>Object</b></em>'. <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * <ul>
 *   <li>{@link org.cpntools.accesscpn.model.impl.ObjectImpl#getToolinfo <em>Toolinfo</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.impl.ObjectImpl#getGraphics <em>Graphics</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.impl.ObjectImpl#getLabel <em>Label</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.impl.ObjectImpl#getName <em>Name</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.impl.ObjectImpl#getPage <em>Page</em>}</li>
 * </ul>
 * </p>
 *
 * @generated
 */
public abstract class ObjectImpl extends HasIdImpl implements org.cpntools.accesscpn.model.Object {
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
	 * The cached value of the '{@link #getGraphics() <em>Graphics</em>}' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getGraphics()
	 * @generated
	 * @ordered
	 */
	protected Graphics graphics;

	/**
	 * The cached value of the '{@link #getLabel() <em>Label</em>}' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getLabel()
	 * @generated
	 * @ordered
	 */
	protected EList<Label> label;

	/**
	 * The cached value of the '{@link #getName() <em>Name</em>}' reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @see #getName()
	 * @generated
	 * @ordered
	 */
	protected Name name;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	protected ObjectImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return ModelPackageImpl.Literals.OBJECT;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public List<ToolInfo> getToolinfo() {
		if (toolinfo == null) {
			toolinfo = new EObjectContainmentWithInverseEList<ToolInfo>(ToolInfo.class, this, ModelPackageImpl.OBJECT__TOOLINFO, ModelPackageImpl.TOOL_INFO__PARENT);
		}
		return toolinfo;
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
			ENotificationImpl notification = new ENotificationImpl(this, Notification.SET, ModelPackageImpl.OBJECT__GRAPHICS, oldGraphics, newGraphics);
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
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.OBJECT__GRAPHICS, newGraphics, newGraphics));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public List<Label> getLabel() {
		if (label == null) {
			label = new EObjectContainmentWithInverseEList<Label>(Label.class, this, ModelPackageImpl.OBJECT__LABEL, ModelPackageImpl.LABEL__PARENT);
		}
		return label;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public Name getName() {
		if (name != null && ((EObject)name).eIsProxy()) {
			InternalEObject oldName = (InternalEObject)name;
			name = (Name)eResolveProxy(oldName);
			if (name != oldName) {
				if (eNotificationRequired())
					eNotify(new ENotificationImpl(this, Notification.RESOLVE, ModelPackageImpl.OBJECT__NAME, oldName, name));
			}
		}
		return name;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public Name basicGetName() {
		return name;
	}

	/**
	 * @see org.cpntools.accesscpn.model.HasName#setName(org.cpntools.accesscpn.model.Name)
	 */
	@Override
    public void setName(final Name newName) {
		if (name != null) {
			name.setParent(null);
		}
		setNameGen(newName);
		if (newName != null) {
			newName.setParent(this);
		}
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public void setNameGen(Name newName) {
		Name oldName = name;
		name = newName;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.OBJECT__NAME, oldName, name));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public Page getPage() {
		if (eContainerFeatureID() != ModelPackageImpl.OBJECT__PAGE) return null;
		return (Page)eContainer();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public NotificationChain basicSetPage(Page newPage, NotificationChain msgs) {
		msgs = eBasicSetContainer((InternalEObject)newPage, ModelPackageImpl.OBJECT__PAGE, msgs);
		return msgs;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setPage(Page newPage) {
		if (newPage != eInternalContainer() || (eContainerFeatureID() != ModelPackageImpl.OBJECT__PAGE && newPage != null)) {
			if (EcoreUtil.isAncestor(this, (EObject)newPage))
				throw new IllegalArgumentException("Recursive containment not allowed for " + toString());
			NotificationChain msgs = null;
			if (eInternalContainer() != null)
				msgs = eBasicRemoveFromContainer(msgs);
			if (newPage != null)
				msgs = ((InternalEObject)newPage).eInverseAdd(this, ModelPackageImpl.PAGE__OBJECT, Page.class, msgs);
			msgs = basicSetPage(newPage, msgs);
			if (msgs != null) msgs.dispatch();
		}
		else if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.OBJECT__PAGE, newPage, newPage));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@SuppressWarnings("unchecked")
	@Override
	public NotificationChain eInverseAdd(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
			case ModelPackageImpl.OBJECT__TOOLINFO:
				return ((InternalEList<InternalEObject>)(InternalEList<?>)getToolinfo()).basicAdd(otherEnd, msgs);
			case ModelPackageImpl.OBJECT__GRAPHICS:
				if (graphics != null)
					msgs = ((InternalEObject)graphics).eInverseRemove(this, EOPPOSITE_FEATURE_BASE - ModelPackageImpl.OBJECT__GRAPHICS, null, msgs);
				return basicSetGraphics((Graphics)otherEnd, msgs);
			case ModelPackageImpl.OBJECT__LABEL:
				return ((InternalEList<InternalEObject>)(InternalEList<?>)getLabel()).basicAdd(otherEnd, msgs);
			case ModelPackageImpl.OBJECT__PAGE:
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
			case ModelPackageImpl.OBJECT__TOOLINFO:
				return ((InternalEList<?>)getToolinfo()).basicRemove(otherEnd, msgs);
			case ModelPackageImpl.OBJECT__GRAPHICS:
				return basicSetGraphics(null, msgs);
			case ModelPackageImpl.OBJECT__LABEL:
				return ((InternalEList<?>)getLabel()).basicRemove(otherEnd, msgs);
			case ModelPackageImpl.OBJECT__PAGE:
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
			case ModelPackageImpl.OBJECT__PAGE:
				return eInternalContainer().eInverseRemove(this, ModelPackageImpl.PAGE__OBJECT, Page.class, msgs);
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
			case ModelPackageImpl.OBJECT__TOOLINFO:
				return getToolinfo();
			case ModelPackageImpl.OBJECT__GRAPHICS:
				return getGraphics();
			case ModelPackageImpl.OBJECT__LABEL:
				return getLabel();
			case ModelPackageImpl.OBJECT__NAME:
				if (resolve) return getName();
				return basicGetName();
			case ModelPackageImpl.OBJECT__PAGE:
				return getPage();
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
			case ModelPackageImpl.OBJECT__TOOLINFO:
				getToolinfo().clear();
				getToolinfo().addAll((Collection<? extends ToolInfo>)newValue);
				return;
			case ModelPackageImpl.OBJECT__GRAPHICS:
				setGraphics((Graphics)newValue);
				return;
			case ModelPackageImpl.OBJECT__LABEL:
				getLabel().clear();
				getLabel().addAll((Collection<? extends Label>)newValue);
				return;
			case ModelPackageImpl.OBJECT__NAME:
				setName((Name)newValue);
				return;
			case ModelPackageImpl.OBJECT__PAGE:
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
			case ModelPackageImpl.OBJECT__TOOLINFO:
				getToolinfo().clear();
				return;
			case ModelPackageImpl.OBJECT__GRAPHICS:
				setGraphics((Graphics)null);
				return;
			case ModelPackageImpl.OBJECT__LABEL:
				getLabel().clear();
				return;
			case ModelPackageImpl.OBJECT__NAME:
				setName((Name)null);
				return;
			case ModelPackageImpl.OBJECT__PAGE:
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
			case ModelPackageImpl.OBJECT__TOOLINFO:
				return toolinfo != null && !toolinfo.isEmpty();
			case ModelPackageImpl.OBJECT__GRAPHICS:
				return graphics != null;
			case ModelPackageImpl.OBJECT__LABEL:
				return label != null && !label.isEmpty();
			case ModelPackageImpl.OBJECT__NAME:
				return name != null;
			case ModelPackageImpl.OBJECT__PAGE:
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
		if (baseClass == HasToolInfo.class) {
			switch (derivedFeatureID) {
				case ModelPackageImpl.OBJECT__TOOLINFO: return ModelPackageImpl.HAS_TOOL_INFO__TOOLINFO;
				default: return -1;
			}
		}
		if (baseClass == HasGraphics.class) {
			switch (derivedFeatureID) {
				case ModelPackageImpl.OBJECT__GRAPHICS: return GraphicsPackageImpl.HAS_GRAPHICS__GRAPHICS;
				default: return -1;
			}
		}
		if (baseClass == HasLabel.class) {
			switch (derivedFeatureID) {
				case ModelPackageImpl.OBJECT__LABEL: return ModelPackageImpl.HAS_LABEL__LABEL;
				default: return -1;
			}
		}
		if (baseClass == HasName.class) {
			switch (derivedFeatureID) {
				case ModelPackageImpl.OBJECT__NAME: return ModelPackageImpl.HAS_NAME__NAME;
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
		if (baseClass == HasToolInfo.class) {
			switch (baseFeatureID) {
				case ModelPackageImpl.HAS_TOOL_INFO__TOOLINFO: return ModelPackageImpl.OBJECT__TOOLINFO;
				default: return -1;
			}
		}
		if (baseClass == HasGraphics.class) {
			switch (baseFeatureID) {
				case GraphicsPackageImpl.HAS_GRAPHICS__GRAPHICS: return ModelPackageImpl.OBJECT__GRAPHICS;
				default: return -1;
			}
		}
		if (baseClass == HasLabel.class) {
			switch (baseFeatureID) {
				case ModelPackageImpl.HAS_LABEL__LABEL: return ModelPackageImpl.OBJECT__LABEL;
				default: return -1;
			}
		}
		if (baseClass == HasName.class) {
			switch (baseFeatureID) {
				case ModelPackageImpl.HAS_NAME__NAME: return ModelPackageImpl.OBJECT__NAME;
				default: return -1;
			}
		}
		return super.eDerivedStructuralFeatureID(baseFeatureID, baseClass);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @generated NOT
	 */
	@Override
	public String toString() {
		if (eIsProxy()) { return super.toString(); }

		final StringBuffer result = new StringBuffer(getClass().getSimpleName().replaceFirst("Impl$", ""));
		result.append(" (id: ");
		result.append(id);
		result.append(", ");
		result.append(getName());
		result.append(')');
		return result.toString();
	}

} // ObjectImpl
