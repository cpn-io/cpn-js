/**
 */
package org.cpntools.accesscpn.model.cpntypes.impl;

import org.cpntools.accesscpn.model.cpntypes.CPNIntInf;
import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.impl.ENotificationImpl;

/**
 * <!-- begin-user-doc --> An implementation of the model object '<em><b>CPN Int Inf</b></em>'. <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * <ul>
 *   <li>{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNIntInfImpl#getLow <em>Low</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNIntInfImpl#getHigh <em>High</em>}</li>
 * </ul>
 * </p>
 *
 * @generated
 */
public class CPNIntInfImpl extends CPNTypeImpl implements CPNIntInf {
	/**
	 * The default value of the '{@link #getLow() <em>Low</em>}' attribute. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @see #getLow()
	 * @generated
	 * @ordered
	 */
	protected static final String LOW_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getLow() <em>Low</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see #getLow()
	 * @generated
	 * @ordered
	 */
	protected String low = LOW_EDEFAULT;

	/**
	 * The default value of the '{@link #getHigh() <em>High</em>}' attribute. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @see #getHigh()
	 * @generated
	 * @ordered
	 */
	protected static final String HIGH_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getHigh() <em>High</em>}' attribute. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @see #getHigh()
	 * @generated
	 * @ordered
	 */
	protected String high = HIGH_EDEFAULT;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	protected CPNIntInfImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return CpntypesPackageImpl.Literals.CPN_INT_INF;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public String getLow() {
		return low;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void setLow(String newLow) {
		String oldLow = low;
		low = newLow;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, CpntypesPackageImpl.CPN_INT_INF__LOW, oldLow, low));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public String getHigh() {
		return high;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void setHigh(String newHigh) {
		String oldHigh = high;
		high = newHigh;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, CpntypesPackageImpl.CPN_INT_INF__HIGH, oldHigh, high));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Object eGet(int featureID, boolean resolve, boolean coreType) {
		switch (featureID) {
			case CpntypesPackageImpl.CPN_INT_INF__LOW:
				return getLow();
			case CpntypesPackageImpl.CPN_INT_INF__HIGH:
				return getHigh();
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
			case CpntypesPackageImpl.CPN_INT_INF__LOW:
				setLow((String)newValue);
				return;
			case CpntypesPackageImpl.CPN_INT_INF__HIGH:
				setHigh((String)newValue);
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
			case CpntypesPackageImpl.CPN_INT_INF__LOW:
				setLow(LOW_EDEFAULT);
				return;
			case CpntypesPackageImpl.CPN_INT_INF__HIGH:
				setHigh(HIGH_EDEFAULT);
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
			case CpntypesPackageImpl.CPN_INT_INF__LOW:
				return LOW_EDEFAULT == null ? low != null : !LOW_EDEFAULT.equals(low);
			case CpntypesPackageImpl.CPN_INT_INF__HIGH:
				return HIGH_EDEFAULT == null ? high != null : !HIGH_EDEFAULT.equals(high);
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
		result.append(" (low: ");
		result.append(low);
		result.append(", high: ");
		result.append(high);
		result.append(')');
		return result.toString();
	}

	/**
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNType#asString()
	 */
	@Override
	public String asString() {
		if (getLow() == null || getHigh() == null || "".equals(getLow()) || "".equals(getHigh())) { return "intinf"
		        + postFixAsString(); }
		return "intinf with " + getLow() + ".." + getHigh() + postFixAsString();
	}

} // CPNIntInfImpl
