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
public interface HLArcAddin {

	/**
	 * @return the inscription of this arc
	 * @model required="false" containment="false"
	 */
	public HLAnnotation getHlinscription();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.HLArcAddin#getHlinscription <em>Hlinscription</em>}' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Hlinscription</em>' reference.
	 * @see #getHlinscription()
	 * @generated
	 */
	void setHlinscription(HLAnnotation value);

	// This has been added -- seems like the standard has forgotten ablut this?
	/**
	 * @model required="true"
	 * @return the type of the arc
	 */
	public HLArcType getKind();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.HLArcAddin#getKind <em>Type</em>}' attribute. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @param value the new value of the '<em>Type</em>' attribute.
	 * @see org.cpntools.accesscpn.model.HLArcType
	 * @see #getKind()
	 * @generated
	 */
	void setKind(HLArcType value);
}
