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
package org.cpntools.accesscpn.model.cpntypes;

/**
 * @model
 * @author michael
 */
public interface CPNString extends CPNType {

	/**
	 * @return lower value
	 * @model required="false"
	 */
	public String getRangeLow();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.cpntypes.CPNString#getRangeLow <em>Range Low</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Range Low</em>' attribute.
	 * @see #getRangeLow()
	 * @generated
	 */
	void setRangeLow(String value);

	/**
	 * @return higher value
	 * @model required="false"
	 */
	public String getRangeHigh();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.cpntypes.CPNString#getRangeHigh <em>Range High</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Range High</em>' attribute.
	 * @see #getRangeHigh()
	 * @generated
	 */
	void setRangeHigh(String value);

	/**
	 * @return lower length
	 * @model required="false"
	 */
	public String getLengthLow();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.cpntypes.CPNString#getLengthLow <em>Length Low</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Length Low</em>' attribute.
	 * @see #getLengthLow()
	 * @generated
	 */
	void setLengthLow(String value);

	/**
	 * @return higher length
	 * @model required="false"
	 */
	public String getLengthHigh();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.cpntypes.CPNString#getLengthHigh <em>Length High</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Length High</em>' attribute.
	 * @see #getLengthHigh()
	 * @generated
	 */
	void setLengthHigh(String value);

}
