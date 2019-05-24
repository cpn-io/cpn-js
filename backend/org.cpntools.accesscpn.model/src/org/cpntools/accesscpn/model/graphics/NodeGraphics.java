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
package org.cpntools.accesscpn.model.graphics;

/**
 * @model
 * @author michael
 */
public interface NodeGraphics extends Graphics {
	/**
	 * @model containment="true"
	 * @return the position
	 */
	public Coordinate getPosition();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.graphics.NodeGraphics#getPosition <em>Position</em>}' containment reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Position</em>' containment reference.
	 * @see #getPosition()
	 * @generated
	 */
	void setPosition(Coordinate value);

	/**
	 * @model containment="true"
	 * @return the dimension
	 */
	public Coordinate getDimension();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.graphics.NodeGraphics#getDimension <em>Dimension</em>}' containment reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Dimension</em>' containment reference.
	 * @see #getDimension()
	 * @generated
	 */
	void setDimension(Coordinate value);

	/**
	 * @model containment="true"
	 * @return the line
	 */
	public Line getLine();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.graphics.NodeGraphics#getLine <em>Line</em>}' containment reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Line</em>' containment reference.
	 * @see #getLine()
	 * @generated
	 */
	void setLine(Line value);

	/**
	 * @model containment="true"
	 * @return the fill
	 */
	public Fill getFill();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.graphics.NodeGraphics#getFill <em>Fill</em>}' containment reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Fill</em>' containment reference.
	 * @see #getFill()
	 * @generated
	 */
	void setFill(Fill value);
}
