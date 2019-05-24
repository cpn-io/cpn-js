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
public interface Line {
	/**
	 * @model required="true"
	 * @return the shape
	 */
	public Shape getShape();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.graphics.Line#getShape <em>Shape</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Shape</em>' attribute.
	 * @see org.cpntools.accesscpn.model.graphics.Shape
	 * @see #getShape()
	 * @generated
	 */
	void setShape(Shape value);

	/**
	 * @model dataType="CSS2Color" required="true"
	 * @return the color
	 */
	public String getColor();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.graphics.Line#getColor <em>Color</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Color</em>' attribute.
	 * @see #getColor()
	 * @generated
	 */
	void setColor(String value);

	/**
	 * @model dataType="NonNegativeDecimal" required="true"
	 * @return the width
	 */
	public double getWidth();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.graphics.Line#getWidth <em>Width</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Width</em>' attribute.
	 * @see #getWidth()
	 * @generated
	 */
	void setWidth(double value);

	/**
	 * @model required="true"
	 * @return the style
	 */
	public Style getStyle();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.graphics.Line#getStyle <em>Style</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Style</em>' attribute.
	 * @see org.cpntools.accesscpn.model.graphics.Style
	 * @see #getStyle()
	 * @generated
	 */
	void setStyle(Style value);
}
