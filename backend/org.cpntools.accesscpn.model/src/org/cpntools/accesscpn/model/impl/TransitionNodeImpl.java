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

import org.cpntools.accesscpn.model.Arc;
import org.cpntools.accesscpn.model.CPNToolsTransitionAddin;
import org.cpntools.accesscpn.model.Code;
import org.cpntools.accesscpn.model.Condition;
import org.cpntools.accesscpn.model.HLTransitionAddin;
import org.cpntools.accesscpn.model.Priority;
import org.cpntools.accesscpn.model.Time;
import org.cpntools.accesscpn.model.TransitionNode;
import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.InternalEObject;
import org.eclipse.emf.ecore.impl.ENotificationImpl;



/**
 * <!-- begin-user-doc --> An implementation of the model object '<em><b>Transition Node</b></em>'. <!-- end-user-doc
 * -->
 * <p>
 * The following features are implemented:
 * <ul>
 * <li>{@link org.cpntools.accesscpn.model.impl.TransitionNodeImpl#getCondition <em>Condition</em>}</li>
 * <li>{@link org.cpntools.accesscpn.model.impl.TransitionNodeImpl#getCode <em>Code</em>}</li>
 * <li>{@link org.cpntools.accesscpn.model.impl.TransitionNodeImpl#getTime <em>Time</em>}</li>
 * </ul>
 * </p>
 * 
 * @generated
 */
public abstract class TransitionNodeImpl extends NodeImpl implements TransitionNode {
	/**
	 * The cached value of the '{@link #getCondition() <em>Condition</em>}' reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #getCondition()
	 * @generated
	 * @ordered
	 */
	protected Condition condition;

	/**
	 * The cached value of the '{@link #getCode() <em>Code</em>}' reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @see #getCode()
	 * @generated
	 * @ordered
	 */
	protected Code code;
	/**
	 * The cached value of the '{@link #getTime() <em>Time</em>}' reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @see #getTime()
	 * @generated
	 * @ordered
	 */
	protected Time time;

	/**
	 * The cached value of the '{@link #getPriority() <em>Priority</em>}' reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getPriority()
	 * @generated
	 * @ordered
	 */
	protected Priority priority;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	protected TransitionNodeImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return ModelPackageImpl.Literals.TRANSITION_NODE;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public Condition getCondition() {
		if (condition != null && ((EObject)condition).eIsProxy()) {
			InternalEObject oldCondition = (InternalEObject)condition;
			condition = (Condition)eResolveProxy(oldCondition);
			if (condition != oldCondition) {
				if (eNotificationRequired())
					eNotify(new ENotificationImpl(this, Notification.RESOLVE, ModelPackageImpl.TRANSITION_NODE__CONDITION, oldCondition, condition));
			}
		}
		return condition;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public Condition basicGetCondition() {
		return condition;
	}

	/**
	 * @see org.cpntools.accesscpn.model.HLTransitionAddin#setCondition(org.cpntools.accesscpn.model.Condition)
	 */
	@Override
    public void setCondition(final Condition newCondition) {
		if (condition != null) {
			condition.setParent(null);
		}
		setConditionGen(newCondition);
		if (newCondition != null) {
			newCondition.setParent(this);
		}
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public void setConditionGen(Condition newCondition) {
		Condition oldCondition = condition;
		condition = newCondition;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.TRANSITION_NODE__CONDITION, oldCondition, condition));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public Code getCode() {
		if (code != null && ((EObject)code).eIsProxy()) {
			InternalEObject oldCode = (InternalEObject)code;
			code = (Code)eResolveProxy(oldCode);
			if (code != oldCode) {
				if (eNotificationRequired())
					eNotify(new ENotificationImpl(this, Notification.RESOLVE, ModelPackageImpl.TRANSITION_NODE__CODE, oldCode, code));
			}
		}
		return code;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public Code basicGetCode() {
		return code;
	}

	/**
	 * @see org.cpntools.accesscpn.model.CPNToolsTransitionAddin#setCode(org.cpntools.accesscpn.model.Code)
	 */
	@Override
    public void setCode(final Code newCode) {
		if (code != null) {
			code.setParent(null);
		}
		setCodeGen(newCode);
		if (newCode != null) {
			code.setParent(this);
		}
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public void setCodeGen(Code newCode) {
		Code oldCode = code;
		code = newCode;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.TRANSITION_NODE__CODE, oldCode, code));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public Time getTime() {
		if (time != null && ((EObject)time).eIsProxy()) {
			InternalEObject oldTime = (InternalEObject)time;
			time = (Time)eResolveProxy(oldTime);
			if (time != oldTime) {
				if (eNotificationRequired())
					eNotify(new ENotificationImpl(this, Notification.RESOLVE, ModelPackageImpl.TRANSITION_NODE__TIME, oldTime, time));
			}
		}
		return time;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public Time basicGetTime() {
		return time;
	}

	/**
	 * @see org.cpntools.accesscpn.model.CPNToolsTransitionAddin#setTime(org.cpntools.accesscpn.model.Time)
	 */
	@Override
    public void setTime(final Time newTime) {
		if (time != null) {
			time.setParent(null);
		}
		setTimeGen(newTime);
		if (newTime != null) {
			newTime.setParent(this);
		}
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public void setTimeGen(Time newTime) {
		Time oldTime = time;
		time = newTime;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.TRANSITION_NODE__TIME, oldTime, time));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public Priority getPriority() {
		if (priority != null && ((EObject)priority).eIsProxy()) {
			InternalEObject oldPriority = (InternalEObject)priority;
			priority = (Priority)eResolveProxy(oldPriority);
			if (priority != oldPriority) {
				if (eNotificationRequired())
					eNotify(new ENotificationImpl(this, Notification.RESOLVE, ModelPackageImpl.TRANSITION_NODE__PRIORITY, oldPriority, priority));
			}
		}
		return priority;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public Priority basicGetPriority() {
		return priority;
	}

	/**
	 * @see org.cpntools.accesscpn.model.CPNToolsTransitionAddin#setPriority(org.cpntools.accesscpn.model.Priority)
	 */
	@Override
    public void setPriority(final Priority newPriority) {
		if (priority != null) {
			priority.setParent(null);
		}
		setPriorityGen(newPriority);
		if (newPriority != null) {
			priority.setParent(this);
		}
	}
	
	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public void setPriorityGen(Priority newPriority) {
		Priority oldPriority = priority;
		priority = newPriority;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.TRANSITION_NODE__PRIORITY, oldPriority, priority));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Object eGet(int featureID, boolean resolve, boolean coreType) {
		switch (featureID) {
			case ModelPackageImpl.TRANSITION_NODE__CONDITION:
				if (resolve) return getCondition();
				return basicGetCondition();
			case ModelPackageImpl.TRANSITION_NODE__CODE:
				if (resolve) return getCode();
				return basicGetCode();
			case ModelPackageImpl.TRANSITION_NODE__TIME:
				if (resolve) return getTime();
				return basicGetTime();
			case ModelPackageImpl.TRANSITION_NODE__PRIORITY:
				if (resolve) return getPriority();
				return basicGetPriority();
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
			case ModelPackageImpl.TRANSITION_NODE__CONDITION:
				setCondition((Condition)newValue);
				return;
			case ModelPackageImpl.TRANSITION_NODE__CODE:
				setCode((Code)newValue);
				return;
			case ModelPackageImpl.TRANSITION_NODE__TIME:
				setTime((Time)newValue);
				return;
			case ModelPackageImpl.TRANSITION_NODE__PRIORITY:
				setPriority((Priority)newValue);
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
			case ModelPackageImpl.TRANSITION_NODE__CONDITION:
				setCondition((Condition)null);
				return;
			case ModelPackageImpl.TRANSITION_NODE__CODE:
				setCode((Code)null);
				return;
			case ModelPackageImpl.TRANSITION_NODE__TIME:
				setTime((Time)null);
				return;
			case ModelPackageImpl.TRANSITION_NODE__PRIORITY:
				setPriority((Priority)null);
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
			case ModelPackageImpl.TRANSITION_NODE__CONDITION:
				return condition != null;
			case ModelPackageImpl.TRANSITION_NODE__CODE:
				return code != null;
			case ModelPackageImpl.TRANSITION_NODE__TIME:
				return time != null;
			case ModelPackageImpl.TRANSITION_NODE__PRIORITY:
				return priority != null;
		}
		return super.eIsSet(featureID);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public int eBaseStructuralFeatureID(int derivedFeatureID, Class<?> baseClass) {
		if (baseClass == HLTransitionAddin.class) {
			switch (derivedFeatureID) {
				case ModelPackageImpl.TRANSITION_NODE__CONDITION: return ModelPackageImpl.HL_TRANSITION_ADDIN__CONDITION;
				default: return -1;
			}
		}
		if (baseClass == CPNToolsTransitionAddin.class) {
			switch (derivedFeatureID) {
				case ModelPackageImpl.TRANSITION_NODE__CODE: return ModelPackageImpl.CPN_TOOLS_TRANSITION_ADDIN__CODE;
				case ModelPackageImpl.TRANSITION_NODE__TIME: return ModelPackageImpl.CPN_TOOLS_TRANSITION_ADDIN__TIME;
				case ModelPackageImpl.TRANSITION_NODE__PRIORITY: return ModelPackageImpl.CPN_TOOLS_TRANSITION_ADDIN__PRIORITY;
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
		if (baseClass == HLTransitionAddin.class) {
			switch (baseFeatureID) {
				case ModelPackageImpl.HL_TRANSITION_ADDIN__CONDITION: return ModelPackageImpl.TRANSITION_NODE__CONDITION;
				default: return -1;
			}
		}
		if (baseClass == CPNToolsTransitionAddin.class) {
			switch (baseFeatureID) {
				case ModelPackageImpl.CPN_TOOLS_TRANSITION_ADDIN__CODE: return ModelPackageImpl.TRANSITION_NODE__CODE;
				case ModelPackageImpl.CPN_TOOLS_TRANSITION_ADDIN__TIME: return ModelPackageImpl.TRANSITION_NODE__TIME;
				case ModelPackageImpl.CPN_TOOLS_TRANSITION_ADDIN__PRIORITY: return ModelPackageImpl.TRANSITION_NODE__PRIORITY;
				default: return -1;
			}
		}
		return super.eDerivedStructuralFeatureID(baseFeatureID, baseClass);
	}

	/**
	 * @see org.cpntools.accesscpn.model.HLAnnotationAddin#isReady(boolean)
	 */
	@Override
	public boolean isReady() {
		try {
			if (super.isReady()) {
				for (final Arc arc : getSourceArc()) {
					if (!arc.isReady()) { return false; }
				}
				for (final Arc arc : getTargetArc()) {
					if (!arc.isReady()) { return false; }
				}
				return true;
			}
			return false;
		} catch (final NullPointerException e) {
			return false;
		}
	}
} // TransitionNodeImpl
