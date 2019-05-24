/**
 * <copyright> </copyright> $Id$
 */
package org.cpntools.accesscpn.model.impl;

import org.cpntools.accesscpn.model.Annotation;
import org.cpntools.accesscpn.model.HLAnnotationAddin;
import org.cpntools.accesscpn.model.graphics.AnnotationGraphics;
import org.cpntools.accesscpn.model.graphics.Graphics;
import org.cpntools.accesscpn.model.graphics.HasGraphics;
import org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl;
import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.common.notify.NotificationChain;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.InternalEObject;
import org.eclipse.emf.ecore.impl.ENotificationImpl;

/**
 * <!-- begin-user-doc --> An implementation of the model object '<em><b>Annotation</b></em>'. <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * <ul>
 *   <li>{@link org.cpntools.accesscpn.model.impl.AnnotationImpl#getGraphics <em>Graphics</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.impl.AnnotationImpl#getText <em>Text</em>}</li>
 * </ul>
 * </p>
 *
 * @generated
 */
public abstract class AnnotationImpl extends LabelImpl implements Annotation {
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
	 * The default value of the '{@link #getText() <em>Text</em>}' attribute. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @see #getText()
	 * @generated
	 * @ordered
	 */
	protected static final String TEXT_EDEFAULT = null;
	/**
	 * The cached value of the '{@link #getText() <em>Text</em>}' attribute. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @see #getText()
	 * @generated
	 * @ordered
	 */
	protected String text = TEXT_EDEFAULT;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	protected AnnotationImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return ModelPackageImpl.Literals.ANNOTATION;
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
	 * @see org.cpntools.accesscpn.model.Annotation#getAnnotationGraphics()
	 */
	@Override
	public AnnotationGraphics getAnnotationGraphics() {
		return (AnnotationGraphics) getGraphics();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public NotificationChain basicSetGraphics(Graphics newGraphics, NotificationChain msgs) {
		Graphics oldGraphics = graphics;
		graphics = newGraphics;
		if (eNotificationRequired()) {
			ENotificationImpl notification = new ENotificationImpl(this, Notification.SET, ModelPackageImpl.ANNOTATION__GRAPHICS, oldGraphics, newGraphics);
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
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.ANNOTATION__GRAPHICS, newGraphics, newGraphics));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public String getText() {
		return text;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void setText(String newText) {
		String oldText = text;
		text = newText;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.ANNOTATION__TEXT, oldText, text));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public NotificationChain eInverseAdd(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
			case ModelPackageImpl.ANNOTATION__GRAPHICS:
				if (graphics != null)
					msgs = ((InternalEObject)graphics).eInverseRemove(this, EOPPOSITE_FEATURE_BASE - ModelPackageImpl.ANNOTATION__GRAPHICS, null, msgs);
				return basicSetGraphics((Graphics)otherEnd, msgs);
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
			case ModelPackageImpl.ANNOTATION__GRAPHICS:
				return basicSetGraphics(null, msgs);
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
			case ModelPackageImpl.ANNOTATION__GRAPHICS:
				return getGraphics();
			case ModelPackageImpl.ANNOTATION__TEXT:
				return getText();
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
			case ModelPackageImpl.ANNOTATION__GRAPHICS:
				setGraphics((Graphics)newValue);
				return;
			case ModelPackageImpl.ANNOTATION__TEXT:
				setText((String)newValue);
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
			case ModelPackageImpl.ANNOTATION__GRAPHICS:
				setGraphics((Graphics)null);
				return;
			case ModelPackageImpl.ANNOTATION__TEXT:
				setText(TEXT_EDEFAULT);
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
			case ModelPackageImpl.ANNOTATION__GRAPHICS:
				return graphics != null;
			case ModelPackageImpl.ANNOTATION__TEXT:
				return TEXT_EDEFAULT == null ? text != null : !TEXT_EDEFAULT.equals(text);
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
				case ModelPackageImpl.ANNOTATION__GRAPHICS: return GraphicsPackageImpl.HAS_GRAPHICS__GRAPHICS;
				default: return -1;
			}
		}
		if (baseClass == HLAnnotationAddin.class) {
			switch (derivedFeatureID) {
				case ModelPackageImpl.ANNOTATION__TEXT: return ModelPackageImpl.HL_ANNOTATION_ADDIN__TEXT;
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
				case GraphicsPackageImpl.HAS_GRAPHICS__GRAPHICS: return ModelPackageImpl.ANNOTATION__GRAPHICS;
				default: return -1;
			}
		}
		if (baseClass == HLAnnotationAddin.class) {
			switch (baseFeatureID) {
				case ModelPackageImpl.HL_ANNOTATION_ADDIN__TEXT: return ModelPackageImpl.ANNOTATION__TEXT;
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

		final StringBuffer result = new StringBuffer(getClass().getSimpleName().replaceFirst("Impl$", "").toLowerCase());
		result.append(": ");
		if (text == null) {
			result.append(text);
		} else {
			result.append(text.replaceAll("\n", "\\\\n"));
		}
		return result.toString();
	}

	/**
	 * @see org.cpntools.accesscpn.model.impl.LabelImpl#asString()
	 */
	@Override
	public String asString() {
		return getText();
	}

	/**
	 * @see org.cpntools.accesscpn.model.HLAnnotationAddin#isReady(boolean)
	 */
	@Override
	public boolean isReady(final boolean mayBeEmpty) {
		return mayBeEmpty || getText() != null && !"".equals(getText());
	}

} // AnnotationImpl
