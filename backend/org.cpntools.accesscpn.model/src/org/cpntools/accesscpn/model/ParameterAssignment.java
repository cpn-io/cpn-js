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
package org.cpntools.accesscpn.model;



/**
 * @model
 * @author michael
 */
public interface ParameterAssignment {
	/**
	 * @model
	 * @return id of Place parameter (socket)
	 */
	String getParameter();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.ParameterAssignment#getParameter <em>Parameter</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Parameter</em>' attribute.
	 * @see #getParameter()
	 * @generated
	 */
	void setParameter(String value);

	/**
	 * @model
	 * @return id of RefPlace (port)
	 */
	String getValue();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.ParameterAssignment#getValue <em>Value</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Value</em>' attribute.
	 * @see #getValue()
	 * @generated
	 */
	void setValue(String value);

	/**
	 * @return the instance owning this parameter assignment
	 * @model containment="false"
	 */
	Instance getInstance();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.ParameterAssignment#getInstance <em>Instance</em>}' container reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Instance</em>' container reference.
	 * @see #getInstance()
	 * @generated
	 */
	void setInstance(Instance value);
}
