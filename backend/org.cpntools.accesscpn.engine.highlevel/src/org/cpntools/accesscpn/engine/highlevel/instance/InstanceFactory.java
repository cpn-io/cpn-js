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
/**
 * <copyright> </copyright> $Id$
 */
package org.cpntools.accesscpn.engine.highlevel.instance;

import java.util.List;

import org.cpntools.accesscpn.model.PlaceNode;
import org.cpntools.accesscpn.model.Transition;


/**
 * <!-- begin-user-doc --> The <b>Factory</b> for the model. It provides a create method for each
 * non-abstract class of the model. <!-- end-user-doc -->
 * @generated
 */
public interface InstanceFactory {
	/**
	 * The singleton instance of the factory.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	InstanceFactory INSTANCE = org.cpntools.accesscpn.engine.highlevel.instance.impl.InstanceFactoryImpl.eINSTANCE;
	/**
	 * Returns a new object of class '<em>Instance</em>'. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @return a new object of class '<em>Instance</em>'.
	 * @generated
	 */
	<T> Instance<T> createInstance();

	/**
	 * @param <T>
	 *            type of node
	 * @param node
	 *            node
	 * @param instanceNumber
	 *            instance number
	 * @return an instance of the given node and instance number
	 */
	<T> Instance<T> createInstance(T node, int instanceNumber);

	/**
	 * @param <T>
	 * @param node
	 * @param transitionList
	 * @return
	 */
	<T> Instance<T> createInstance(T node,
			Instance<org.cpntools.accesscpn.model.Instance> transitionList);

	/**
	 * @param <T>
	 * @param node
	 * @param instanceNumber
	 * @param transitionList
	 * @return
	 */
	<T> Instance<T> createInstance(T node, int instanceNumber,
			Instance<org.cpntools.accesscpn.model.Instance> transitionList);

	/**
	 * Returns a new object of class '<em>Marking</em>'. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @return a new object of class '<em>Marking</em>'.
	 * @generated
	 */
	Marking createMarking();

	/**
	 * @param placeInstance
	 * @param marking
	 * @return
	 */
	Marking createMarking(Instance<PlaceNode> placeInstance, List<MultisetEntry> marking);

	/**
	 * Returns a new object of class '<em>State</em>'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return a new object of class '<em>State</em>'.
	 * @generated
	 */
	State createState();

	/**
	 * Returns a new object of class '<em>Multiset Entry</em>'.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @return a new object of class '<em>Multiset Entry</em>'.
	 * @generated
	 */
	MultisetEntry createMultisetEntry();

	/**
	 * Returns a new object of class '<em>Binding</em>'. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @return a new object of class '<em>Binding</em>'.
	 * @generated
	 */
	Binding createBinding();

	/**
	 * @param transition
	 * @param assignments
	 * @return
	 */
	Binding createBinding(Instance<? extends Transition> transition, List<ValueAssignment> assignments);

	/**
	 * Returns a new object of class '<em>Value Assignment</em>'.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @return a new object of class '<em>Value Assignment</em>'.
	 * @generated
	 */
	ValueAssignment createValueAssignment();

	/**
	 * @param name
	 * @param value
	 * @return
	 */
	ValueAssignment createValueAssignment(String name, String value);

	/**
	 * @param coefficient
	 * @param value
	 * @return
	 */
	MultisetEntry createMultisetEntry(int coefficient, String value);

	/**
	 * @param markings
	 * @return
	 */
	State createState(List<Marking> markings);

	/**
	 * @param marking
	 *            the marking
	 * @return a marking with the given marking (useful for setting the marking of a place)
	 */
	Marking createMarking(String marking);

	/**
	 * @param tokens
	 *            number of tokens
	 * @param marking
	 *            the marking
	 * @return a marking with the given number of tokens and marking
	 */
	Marking createMarking(int tokens, String marking);

	/**
	 * @param pi
	 * @return
	 */
	Marking createMarking(Instance<PlaceNode> pi);

} // InstanceFactory
