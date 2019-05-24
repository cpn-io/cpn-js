/**
 * <copyright> </copyright> $Id$
 */
package org.cpntools.accesscpn.model.impl;

import org.cpntools.accesscpn.model.Instance;
import org.cpntools.accesscpn.model.ParameterAssignment;
import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.common.notify.NotificationChain;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.InternalEObject;
import org.eclipse.emf.ecore.impl.ENotificationImpl;
import org.eclipse.emf.ecore.impl.EObjectImpl;
import org.eclipse.emf.ecore.util.EcoreUtil;


/**
 * <!-- begin-user-doc --> An implementation of the model object '<em><b>Parameter Assignment</b></em>'. <!--
 * end-user-doc -->
 * <p>
 * The following features are implemented:
 * <ul>
 *   <li>{@link org.cpntools.accesscpn.model.impl.ParameterAssignmentImpl#getParameter <em>Parameter</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.impl.ParameterAssignmentImpl#getValue <em>Value</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.impl.ParameterAssignmentImpl#getInstance <em>Instance</em>}</li>
 * </ul>
 * </p>
 *
 * @generated
 */
public class ParameterAssignmentImpl extends EObjectImpl implements ParameterAssignment {
	/**
	 * The default value of the '{@link #getParameter() <em>Parameter</em>}' attribute.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #getParameter()
	 * @generated
	 * @ordered
	 */
	protected static final String PARAMETER_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getParameter() <em>Parameter</em>}' attribute.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #getParameter()
	 * @generated
	 * @ordered
	 */
	protected String parameter = PARAMETER_EDEFAULT;

	/**
	 * The default value of the '{@link #getValue() <em>Value</em>}' attribute.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #getValue()
	 * @generated
	 * @ordered
	 */
	protected static final String VALUE_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getValue() <em>Value</em>}' attribute. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @see #getValue()
	 * @generated
	 * @ordered
	 */
	protected String value = VALUE_EDEFAULT;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	protected ParameterAssignmentImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return ModelPackageImpl.Literals.PARAMETER_ASSIGNMENT;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public String getParameter() {
		return parameter;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setParameter(String newParameter) {
		String oldParameter = parameter;
		parameter = newParameter;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.PARAMETER_ASSIGNMENT__PARAMETER, oldParameter, parameter));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public String getValue() {
		return value;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setValue(String newValue) {
		String oldValue = value;
		value = newValue;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.PARAMETER_ASSIGNMENT__VALUE, oldValue, value));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public Instance getInstance() {
		if (eContainerFeatureID() != ModelPackageImpl.PARAMETER_ASSIGNMENT__INSTANCE) return null;
		return (Instance)eContainer();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public NotificationChain basicSetInstance(Instance newInstance, NotificationChain msgs) {
		msgs = eBasicSetContainer((InternalEObject)newInstance, ModelPackageImpl.PARAMETER_ASSIGNMENT__INSTANCE, msgs);
		return msgs;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setInstance(Instance newInstance) {
		if (newInstance != eInternalContainer() || (eContainerFeatureID() != ModelPackageImpl.PARAMETER_ASSIGNMENT__INSTANCE && newInstance != null)) {
			if (EcoreUtil.isAncestor(this, (EObject)newInstance))
				throw new IllegalArgumentException("Recursive containment not allowed for " + toString());
			NotificationChain msgs = null;
			if (eInternalContainer() != null)
				msgs = eBasicRemoveFromContainer(msgs);
			if (newInstance != null)
				msgs = ((InternalEObject)newInstance).eInverseAdd(this, ModelPackageImpl.INSTANCE__PARAMETER_ASSIGNMENT, Instance.class, msgs);
			msgs = basicSetInstance(newInstance, msgs);
			if (msgs != null) msgs.dispatch();
		}
		else if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.PARAMETER_ASSIGNMENT__INSTANCE, newInstance, newInstance));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public NotificationChain eInverseAdd(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
			case ModelPackageImpl.PARAMETER_ASSIGNMENT__INSTANCE:
				if (eInternalContainer() != null)
					msgs = eBasicRemoveFromContainer(msgs);
				return basicSetInstance((Instance)otherEnd, msgs);
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
			case ModelPackageImpl.PARAMETER_ASSIGNMENT__INSTANCE:
				return basicSetInstance(null, msgs);
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
			case ModelPackageImpl.PARAMETER_ASSIGNMENT__INSTANCE:
				return eInternalContainer().eInverseRemove(this, ModelPackageImpl.INSTANCE__PARAMETER_ASSIGNMENT, Instance.class, msgs);
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
			case ModelPackageImpl.PARAMETER_ASSIGNMENT__PARAMETER:
				return getParameter();
			case ModelPackageImpl.PARAMETER_ASSIGNMENT__VALUE:
				return getValue();
			case ModelPackageImpl.PARAMETER_ASSIGNMENT__INSTANCE:
				return getInstance();
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
			case ModelPackageImpl.PARAMETER_ASSIGNMENT__PARAMETER:
				setParameter((String)newValue);
				return;
			case ModelPackageImpl.PARAMETER_ASSIGNMENT__VALUE:
				setValue((String)newValue);
				return;
			case ModelPackageImpl.PARAMETER_ASSIGNMENT__INSTANCE:
				setInstance((Instance)newValue);
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
			case ModelPackageImpl.PARAMETER_ASSIGNMENT__PARAMETER:
				setParameter(PARAMETER_EDEFAULT);
				return;
			case ModelPackageImpl.PARAMETER_ASSIGNMENT__VALUE:
				setValue(VALUE_EDEFAULT);
				return;
			case ModelPackageImpl.PARAMETER_ASSIGNMENT__INSTANCE:
				setInstance((Instance)null);
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
			case ModelPackageImpl.PARAMETER_ASSIGNMENT__PARAMETER:
				return PARAMETER_EDEFAULT == null ? parameter != null : !PARAMETER_EDEFAULT.equals(parameter);
			case ModelPackageImpl.PARAMETER_ASSIGNMENT__VALUE:
				return VALUE_EDEFAULT == null ? value != null : !VALUE_EDEFAULT.equals(value);
			case ModelPackageImpl.PARAMETER_ASSIGNMENT__INSTANCE:
				return getInstance() != null;
		}
		return super.eIsSet(featureID);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public String toString() {
		if (eIsProxy()) return super.toString();

		StringBuffer result = new StringBuffer(super.toString());
		result.append(" (parameter: ");
		result.append(parameter);
		result.append(", value: ");
		result.append(value);
		result.append(')');
		return result.toString();
	}

} // ParameterAssignmentImpl
