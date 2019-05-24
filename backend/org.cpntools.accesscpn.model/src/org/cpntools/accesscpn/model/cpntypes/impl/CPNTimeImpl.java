/**
 */
package org.cpntools.accesscpn.model.cpntypes.impl;

import org.cpntools.accesscpn.model.cpntypes.CPNTime;
import org.eclipse.emf.ecore.EClass;

/**
 * <!-- begin-user-doc --> An implementation of the model object '<em><b>CPN Time</b></em>'. <!-- end-user-doc -->
 * <p>
 * </p>
 *
 * @generated
 */
public class CPNTimeImpl extends CPNTypeImpl implements CPNTime {
	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	protected CPNTimeImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return CpntypesPackageImpl.Literals.CPN_TIME;
	}

	/**
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNType#asString()
	 */
	@Override
	public String asString() {
		return "time" + postFixAsString();
	}

} // CPNTimeImpl
