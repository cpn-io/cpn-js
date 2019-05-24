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
 * @model abstract="true" interface="true"
 * @author michael
 */
public interface CPNToolsTransitionAddin {
	/**
	 * @model required="false"
	 * @return the code region
	 */
	public Code getCode();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.CPNToolsTransitionAddin#getCode <em>Code</em>}' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Code</em>' reference.
	 * @see #getCode()
	 * @generated
	 */
	void setCode(Code value);

	/**
	 * @model required="false"
	 * @return the time region
	 */
	public Time getTime();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.CPNToolsTransitionAddin#getTime <em>Time</em>}' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Time</em>' reference.
	 * @see #getTime()
	 * @generated
	 */
	void setTime(Time value);
	
	/**
	 * @model required="false"
	 * @return
	 */
	public Priority getPriority();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.CPNToolsTransitionAddin#getPriority <em>Priority</em>}' reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param value the new value of the '<em>Priority</em>' reference.
	 * @see #getPriority()
	 * @generated
	 */
	void setPriority(Priority value);
}
