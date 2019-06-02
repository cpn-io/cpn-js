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
 * <copyright>
 * </copyright>
 *
 * $Id$
 */
package org.cpntools.accesscpn.model.cpntypes.util;



import java.util.List;

import org.cpntools.accesscpn.model.cpntypes.*;
import org.cpntools.accesscpn.model.cpntypes.CPNAlias;
import org.cpntools.accesscpn.model.cpntypes.CPNBool;
import org.cpntools.accesscpn.model.cpntypes.CPNEnum;
import org.cpntools.accesscpn.model.cpntypes.CPNIndex;
import org.cpntools.accesscpn.model.cpntypes.CPNInt;
import org.cpntools.accesscpn.model.cpntypes.CPNList;
import org.cpntools.accesscpn.model.cpntypes.CPNProduct;
import org.cpntools.accesscpn.model.cpntypes.CPNReal;
import org.cpntools.accesscpn.model.cpntypes.CPNRecord;
import org.cpntools.accesscpn.model.cpntypes.CPNString;
import org.cpntools.accesscpn.model.cpntypes.CPNSubset;
import org.cpntools.accesscpn.model.cpntypes.CPNType;
import org.cpntools.accesscpn.model.cpntypes.CPNUnion;
import org.cpntools.accesscpn.model.cpntypes.CPNUnit;
import org.cpntools.accesscpn.model.cpntypes.NameTypePair;
import org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.util.Switch;

/**
 * <!-- begin-user-doc -->
 * The <b>Switch</b> for the model's inheritance hierarchy.
 * It supports the call {@link #doSwitch(EObject) doSwitch(object)}
 * to invoke the <code>caseXXX</code> method for each class of the model,
 * starting with the actual class of the object
 * and proceeding up the inheritance hierarchy
 * until a non-null result is returned,
 * which is the result of the switch.
 * <!-- end-user-doc -->
 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl
 * @generated
 */
public class CpntypesSwitch<T> extends Switch<T> {
	/**
	 * The cached model package
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	protected static CpntypesPackageImpl modelPackage;

	/**
	 * Creates an instance of the switch.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public CpntypesSwitch() {
		if (modelPackage == null) {
			modelPackage = CpntypesPackageImpl.eINSTANCE;
		}
	}

	/**
	 * Checks whether this is a switch for the given package.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @parameter ePackage the package in question.
	 * @return whether this is a switch for the given package.
	 * @generated
	 */
	@Override
	protected boolean isSwitchFor(EPackage ePackage) {
		return ePackage == modelPackage;
	}

	/**
	 * Calls <code>caseXXX</code> for each class of the model until one returns a non null result; it yields that result.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the first non-null result returned by a <code>caseXXX</code> call.
	 * @generated
	 */
	@Override
 protected T doSwitch(int classifierID, EObject theEObject) {
		switch (classifierID) {
			case CpntypesPackageImpl.CPN_ALIAS: {
				CPNAlias cpnAlias = (CPNAlias)theEObject;
				T result = caseCPNAlias(cpnAlias);
				if (result == null) result = caseCPNType(cpnAlias);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case CpntypesPackageImpl.CPN_BOOL: {
				CPNBool cpnBool = (CPNBool)theEObject;
				T result = caseCPNBool(cpnBool);
				if (result == null) result = caseCPNType(cpnBool);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case CpntypesPackageImpl.CPN_ENUM: {
				CPNEnum cpnEnum = (CPNEnum)theEObject;
				T result = caseCPNEnum(cpnEnum);
				if (result == null) result = caseCPNType(cpnEnum);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case CpntypesPackageImpl.CPN_INDEX: {
				CPNIndex cpnIndex = (CPNIndex)theEObject;
				T result = caseCPNIndex(cpnIndex);
				if (result == null) result = caseCPNType(cpnIndex);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case CpntypesPackageImpl.CPN_INT: {
				CPNInt cpnInt = (CPNInt)theEObject;
				T result = caseCPNInt(cpnInt);
				if (result == null) result = caseCPNType(cpnInt);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case CpntypesPackageImpl.CPN_INT_INF: {
				CPNIntInf cpnIntInf = (CPNIntInf)theEObject;
				T result = caseCPNIntInf(cpnIntInf);
				if (result == null) result = caseCPNType(cpnIntInf);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case CpntypesPackageImpl.CPN_LIST: {
				CPNList cpnList = (CPNList)theEObject;
				T result = caseCPNList(cpnList);
				if (result == null) result = caseCPNType(cpnList);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case CpntypesPackageImpl.CPN_PRODUCT: {
				CPNProduct cpnProduct = (CPNProduct)theEObject;
				T result = caseCPNProduct(cpnProduct);
				if (result == null) result = caseCPNType(cpnProduct);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case CpntypesPackageImpl.CPN_REAL: {
				CPNReal cpnReal = (CPNReal)theEObject;
				T result = caseCPNReal(cpnReal);
				if (result == null) result = caseCPNType(cpnReal);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case CpntypesPackageImpl.CPN_RECORD: {
				CPNRecord cpnRecord = (CPNRecord)theEObject;
				T result = caseCPNRecord(cpnRecord);
				if (result == null) result = caseCPNType(cpnRecord);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case CpntypesPackageImpl.CPN_STRING: {
				CPNString cpnString = (CPNString)theEObject;
				T result = caseCPNString(cpnString);
				if (result == null) result = caseCPNType(cpnString);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case CpntypesPackageImpl.CPN_SUBSET: {
				CPNSubset cpnSubset = (CPNSubset)theEObject;
				T result = caseCPNSubset(cpnSubset);
				if (result == null) result = caseCPNType(cpnSubset);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case CpntypesPackageImpl.CPN_TIME: {
				CPNTime cpnTime = (CPNTime)theEObject;
				T result = caseCPNTime(cpnTime);
				if (result == null) result = caseCPNType(cpnTime);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case CpntypesPackageImpl.CPN_TYPE: {
				CPNType cpnType = (CPNType)theEObject;
				T result = caseCPNType(cpnType);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case CpntypesPackageImpl.CPN_UNION: {
				CPNUnion cpnUnion = (CPNUnion)theEObject;
				T result = caseCPNUnion(cpnUnion);
				if (result == null) result = caseCPNType(cpnUnion);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case CpntypesPackageImpl.CPN_UNIT: {
				CPNUnit cpnUnit = (CPNUnit)theEObject;
				T result = caseCPNUnit(cpnUnit);
				if (result == null) result = caseCPNType(cpnUnit);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case CpntypesPackageImpl.NAME_TYPE_PAIR: {
				NameTypePair nameTypePair = (NameTypePair)theEObject;
				T result = caseNameTypePair(nameTypePair);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			default: return defaultCase(theEObject);
		}
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>CPN Alias</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>CPN Alias</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCPNAlias(CPNAlias object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>CPN Bool</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>CPN Bool</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCPNBool(CPNBool object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>CPN Enum</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>CPN Enum</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCPNEnum(CPNEnum object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>CPN Index</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>CPN Index</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCPNIndex(CPNIndex object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>CPN Int</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>CPN Int</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCPNInt(CPNInt object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>CPN Int Inf</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>CPN Int Inf</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCPNIntInf(CPNIntInf object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>CPN List</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>CPN List</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCPNList(CPNList object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>CPN Product</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>CPN Product</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCPNProduct(CPNProduct object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>CPN Real</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>CPN Real</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCPNReal(CPNReal object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>CPN Record</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>CPN Record</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCPNRecord(CPNRecord object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>CPN String</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>CPN String</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCPNString(CPNString object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>CPN Subset</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>CPN Subset</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCPNSubset(CPNSubset object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>CPN Time</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>CPN Time</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCPNTime(CPNTime object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>CPN Type</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>CPN Type</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCPNType(CPNType object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>CPN Union</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>CPN Union</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCPNUnion(CPNUnion object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>CPN Unit</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>CPN Unit</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCPNUnit(CPNUnit object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Name Type Pair</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Name Type Pair</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseNameTypePair(NameTypePair object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>EObject</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch, but this is the last case anyway.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>EObject</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject)
	 * @generated
	 */
	@Override
 public T defaultCase(EObject object) {
		return null;
	}

} //CpntypesSwitch
