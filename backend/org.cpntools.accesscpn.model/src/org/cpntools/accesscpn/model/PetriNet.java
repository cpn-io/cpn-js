/************************************************************************/
/* Access/CPN */
/* Copyright 2010-2011 AIS Group, Eindhoven University of Technology */
/*                                                                      */
/* This library is free software; you can redistribute it and/or */
/* modify it under the terms of the GNU Lesser General Public */
/* License as published by the Free Software Foundation; either */
/* version 2.1 of the License, or (at your option) any later version. */
/*                                                                      */
/* This library is distributed in the hope that it will be useful, */
/* but WITHOUT ANY WARRANTY; without even the implied warranty of */
/* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU */
/* Lesser General Public License for more details. */
/*                                                                      */
/* You should have received a copy of the GNU Lesser General Public */
/* License along with this library; if not, write to the Free Software */
/* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, */
/* MA 02110-1301 USA */
/************************************************************************/
package org.cpntools.accesscpn.model;

import java.util.List;

import org.cpntools.accesscpn.model.monitors.Monitor;

/**
 * @model
 * @author michael
 */
public interface PetriNet extends HasId, HasToolInfo, HasLabel, HasName {
	/**
	 * @model required="true"
	 * @return the type of petri net
	 */
	public String getKind();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.PetriNet#getKind <em>Type</em>}' attribute. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @param value
	 *            the new value of the '<em>Type</em>' attribute.
	 * @see #getKind()
	 * @generated
	 */
	void setKind(String value);

	/**
	 * @model containment="true" lower="1" opposite="petriNet" type="Page"
	 * @return all pages of this petri net
	 */
	public List<Page> getPage();

	/**
	 * @model containment="true" opposite="petriNet" type="Monitor"
	 */
	public List<Monitor> getMonitors();

	// This definition differs from the standard to avoid double representation
	/**
	 * @return all declarations of this petri net
	 */
	public Iterable<HLDeclaration> declaration();

	// This is added to better support fusion groups
	/**
	 * @return all fusion groups in this petri net
	 * @model containment="false" opposite="petriNet" type="FusionGroup"
	 */
	List<FusionGroup> getFusionGroups();

	/**
	 * @model required="true"
	 */
	TimeType getTimeType();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.PetriNet#getTimeType <em>Time Type</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Time Type</em>' attribute.
	 * @see org.cpntools.accesscpn.model.TimeType
	 * @see #getTimeType()
	 * @generated
	 */
	void setTimeType(TimeType value);

	/**
	 * Return whether this model is timed (i.e., if it contains a timed declaration)
	 * 
	 * @return
	 */
	public boolean isTimed();
}
