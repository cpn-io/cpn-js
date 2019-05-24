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

import org.cpntools.accesscpn.model.graphics.ArcGraphics;
import org.cpntools.accesscpn.model.graphics.HasGraphics;

/**
 * @model
 * @author michael
 */
public interface Arc extends HasId, HasGraphics, HLArcAddin {
	/**
	 * @model containment="false" opposite="sourceArc" required="true"
	 * @return source of arc
	 */
	public Node getSource();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.Arc#getSource <em>Source</em>}' reference. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @param value
	 *            the new value of the '<em>Source</em>' reference.
	 * @see #getSource()
	 * @generated
	 */
	void setSource(Node value);

	/**
	 * @model containment="false" opposite="targetArc" required="true"
	 * @return target of arc
	 */
	public Node getTarget();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.Arc#getTarget <em>Target</em>}' reference. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @param value
	 *            the new value of the '<em>Target</em>' reference.
	 * @see #getTarget()
	 * @generated
	 */
	void setTarget(Node value);

	/**
	 * @model containment="false" opposite="arc" required="true"
	 * @return page containing the arc
	 */
	public Page getPage();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.Arc#getPage <em>Page</em>}' container reference. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @param value
	 *            the new value of the '<em>Page</em>' container reference.
	 * @see #getPage()
	 * @generated
	 */
	void setPage(Page value);

	// Utility methods not part of the model

	/**
	 * @param n
	 *            node
	 * @return the other end of the arc
	 */
	public Node getOtherEnd(Node n);

	/**
	 * @return the end of the arc that is a place
	 */
	public PlaceNode getPlaceNode();

	/**
	 * @return the end of the arc that is a transition
	 */
	public Transition getTransition();

	/**
	 * @return whether this arc is ready to be sent to the simulator
	 */
	boolean isReady();

	/**
	 * @return
	 */
	public ArcGraphics getArcGraphics();
}
