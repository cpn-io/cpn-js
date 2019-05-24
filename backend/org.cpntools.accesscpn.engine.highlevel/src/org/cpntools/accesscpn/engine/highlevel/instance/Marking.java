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
package org.cpntools.accesscpn.engine.highlevel.instance;

import java.util.List;

import org.cpntools.accesscpn.model.PlaceNode;


/**
 * @model
 * @author mw
 */
public interface Marking {
	/**
	 * @model containment="false"
	 * @return
	 */
	Instance<? extends PlaceNode> getPlaceInstance();

	/**
	 * Sets the value of the '
	 * {@link org.cpntools.accesscpn.engine.highlevel.instance.Marking#getPlaceInstance
	 * <em>Place Instance</em>}' containment reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @param value
	 *            the new value of the '<em>Place Instance</em>' containment reference.
	 * @see #getPlaceInstance()
	 * @generated
	 */
	void setPlaceInstance(Instance<? extends PlaceNode> value);

	/**
	 * @model
	 * @return
	 */
	int getTokenCount();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.engine.highlevel.instance.Marking#getTokenCount <em>Token Count</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Token Count</em>' attribute.
	 * @see #getTokenCount()
	 * @generated
	 */
	void setTokenCount(int value);

	/**
	 * @model changeable="false" transient="true"
	 * @return
	 */
	String getMarking();

	/**
	 * @model containment="true"
	 * @return
	 */
	List<MultisetEntry> getStructuredMarking();
}
