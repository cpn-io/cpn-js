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

import java.util.List;

/**
 * @model abstract="true"
 * @author michael
 */
public interface CPNType {
	/**
	 * @model is the type timed
	 * @return whether the type id timed
	 */
	public Boolean getTimed();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.cpntypes.CPNType#getTimed <em>Timed</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Timed</em>' attribute.
	 * @see #getTimed()
	 * @generated
	 */
	void setTimed(Boolean value);

	/**
	 * @return get all declares
	 * @model type="String"
	 */
	public List<String> getDeclares();

	/**
	 * @param declare declare to add
	 */
	public void addDeclare(String declare);

	/**
	 * @return string rep of type
	 */
	public String asString();
}
