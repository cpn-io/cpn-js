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
package org.cpntools.accesscpn.model.cpntypes;


/**
 * <!-- begin-user-doc -->
 * The <b>Factory</b> for the model.
 * It provides a create method for each non-abstract class of the model.
 * <!-- end-user-doc -->
 * @generated
 */
public interface CpntypesFactory {
	/**
	 * The singleton instance of the factory.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	CpntypesFactory INSTANCE = org.cpntools.accesscpn.model.cpntypes.impl.CpntypesFactoryImpl.eINSTANCE;
	/**
	 * Returns a new object of class '<em>CPN Unit</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>CPN Unit</em>'.
	 * @generated
	 */
	CPNUnit createCPNUnit();

	/**
	 * Returns a new object of class '<em>CPN Enum</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>CPN Enum</em>'.
	 * @generated
	 */
	CPNEnum createCPNEnum();

	/**
	 * Returns a new object of class '<em>CPN Product</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>CPN Product</em>'.
	 * @generated
	 */
	CPNProduct createCPNProduct();

	/**
	 * Returns a new object of class '<em>CPN Real</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>CPN Real</em>'.
	 * @generated
	 */
	CPNReal createCPNReal();

	/**
	 * Returns a new object of class '<em>CPN Index</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>CPN Index</em>'.
	 * @generated
	 */
	CPNIndex createCPNIndex();

	/**
	 * Returns a new object of class '<em>CPN String</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>CPN String</em>'.
	 * @generated
	 */
	CPNString createCPNString();

	/**
	 * Returns a new object of class '<em>CPN Alias</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>CPN Alias</em>'.
	 * @generated
	 */
	CPNAlias createCPNAlias();

	/**
	 * Returns a new object of class '<em>CPN Int</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>CPN Int</em>'.
	 * @generated
	 */
	CPNInt createCPNInt();

	/**
	 * Returns a new object of class '<em>CPN Int Inf</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>CPN Int Inf</em>'.
	 * @generated
	 */
	CPNIntInf createCPNIntInf();

	/**
	 * Returns a new object of class '<em>CPN Bool</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>CPN Bool</em>'.
	 * @generated
	 */
	CPNBool createCPNBool();

	/**
	 * Returns a new object of class '<em>CPN List</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>CPN List</em>'.
	 * @generated
	 */
	CPNList createCPNList();

	/**
	 * Returns a new object of class '<em>CPN Record</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>CPN Record</em>'.
	 * @generated
	 */
	CPNRecord createCPNRecord();

	/**
	 * Returns a new object of class '<em>CPN Union</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>CPN Union</em>'.
	 * @generated
	 */
	CPNUnion createCPNUnion();

	/**
	 * Returns a new object of class '<em>CPN Subset</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>CPN Subset</em>'.
	 * @generated
	 */
	CPNSubset createCPNSubset();

	/**
	 * Returns a new object of class '<em>CPN Time</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>CPN Time</em>'.
	 * @generated
	 */
	CPNTime createCPNTime();

	/**
	 * Returns a new object of class '<em>Name Type Pair</em>'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return a new object of class '<em>Name Type Pair</em>'.
	 * @generated
	 */
	NameTypePair createNameTypePair();

} //CpntypesFactory
