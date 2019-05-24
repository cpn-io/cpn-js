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


/**
 * @model
 * @author mw
 * @param <T>
 *            (Node) type this is an instance of
 */
public interface Instance<T> {
	/**
	 * @model containment="false"
	 * @return the element
	 */
	public T getNode();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.engine.highlevel.instance.Instance#getNode <em>Node</em>}' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Node</em>' reference.
	 * @see #getNode()
	 * @generated
	 */
	void setNode(T value);

	/**
	 * @return
	 */
	public int getInstanceNumber();

	/**
	 * @model containment="false"
	 * @return
	 */
	public Instance<org.cpntools.accesscpn.model.Instance> getTransitionPath();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.engine.highlevel.instance.Instance#getTransitionPath <em>Transition Path</em>}' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Transition Path</em>' reference.
	 * @see #getTransitionPath()
	 * @generated
	 */
	void setTransitionPath(Instance<org.cpntools.accesscpn.model.Instance> value);
}
