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

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * @model
 * @author michael
 */
public enum HLArcType implements InternalHLArcType {
	/**
	 * The '<em><b>Normal</b></em>' literal object.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see #NORMAL_VALUE
	 * @generated
	 * @ordered
	 */
	NORMAL(0, "Normal", "Normal"),
	/**
	 * The '<em><b>Test</b></em>' literal object.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see #TEST_VALUE
	 * @generated
	 * @ordered
	 */
	TEST(1, "Test", "Test"), /**
	 * The '<em><b>Inhibitor</b></em>' literal object.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #INHIBITOR_VALUE
	 * @generated
	 * @ordered
	 */
	INHIBITOR(2, "Inhibitor", "Inhibitor"), /**
	 * The '<em><b>Reset</b></em>' literal object.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #RESET_VALUE
	 * @generated
	 * @ordered
	 */
	RESET(3, "Reset", "Reset");
	/**
	 * @model name="Normal"
	 */
	public static final int NORMAL_VALUE = 0;

	/**
	 * @model name="Test"
	 */
	public static final int TEST_VALUE = 1;

	/**
	 * The '<em><b>Inhibitor</b></em>' literal value.
	 * <!-- begin-user-doc -->
	 * <p>
	 * If the meaning of '<em><b>Inhibitor</b></em>' literal object isn't clear,
	 * there really should be more of a description here...
	 * </p>
	 * <!-- end-user-doc -->
	 * @see #INHIBITOR
	 * @model name="Inhibitor"
	 * @generated
	 * @ordered
	 */
	public static final int INHIBITOR_VALUE = 2;

	/**
	 * The '<em><b>Reset</b></em>' literal value.
	 * <!-- begin-user-doc -->
	 * <p>
	 * If the meaning of '<em><b>Reset</b></em>' literal object isn't clear,
	 * there really should be more of a description here...
	 * </p>
	 * <!-- end-user-doc -->
	 * @see #RESET
	 * @model name="Reset"
	 * @generated
	 * @ordered
	 */
	public static final int RESET_VALUE = 3;

	/**
	 * An array of all the '<em><b>HL Arc Type</b></em>' enumerators.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private static final HLArcType[] VALUES_ARRAY = new HLArcType[] {
			NORMAL,
			TEST,
			INHIBITOR,
			RESET,
		};

	/**
	 * A public read-only list of all the '<em><b>HL Arc Type</b></em>' enumerators.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 */
	public static final List<HLArcType> VALUES = Collections.unmodifiableList(Arrays.asList(VALUES_ARRAY));

	/**
	 * Returns the '<em><b>HL Arc Type</b></em>' literal with the specified literal value.
	 * <!-- begin-user-doc -->
	 * 
	 * @param literal
	 *            the string literal
	 * @return the corresponding arctype <!-- end-user-doc -->
	 * @generated
	 */
	public static HLArcType get(String literal) {
		for (int i = 0; i < VALUES_ARRAY.length; ++i) {
			HLArcType result = VALUES_ARRAY[i];
			if (result.toString().equals(literal)) {
				return result;
			}
		}
		return null;
	}

	/**
	 * Returns the '<em><b>HL Arc Type</b></em>' literal with the specified name.
	 * <!-- begin-user-doc -->
	 * 
	 * @param name
	 *            the name
	 * @return the corresponding type <!-- end-user-doc -->
	 * @generated
	 */
	public static HLArcType getByName(String name) {
		for (int i = 0; i < VALUES_ARRAY.length; ++i) {
			HLArcType result = VALUES_ARRAY[i];
			if (result.getName().equals(name)) {
				return result;
			}
		}
		return null;
	}

	/**
	 * Returns the '<em><b>HL Arc Type</b></em>' literal with the specified integer value.
	 * <!-- begin-user-doc -->
	 * 
	 * @param value
	 *            the value
	 * @return the corresponding arc type <!-- end-user-doc -->
	 * @generated
	 */
	public static HLArcType get(int value) {
		switch (value) {
			case NORMAL_VALUE: return NORMAL;
			case TEST_VALUE: return TEST;
			case INHIBITOR_VALUE: return INHIBITOR;
			case RESET_VALUE: return RESET;
		}
		return null;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private final int value;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private final String name;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private final String literal;

	/**
	 * Only this class can construct instances.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private HLArcType(int value, String name, String literal) {
		this.value = value;
		this.name = name;
		this.literal = literal;
	}

	/**
	 * <!-- begin-user-doc -->
	 * 
	 * @return the value of this arc type <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public int getValue() {
	  return value;
	}

	/**
	 * <!-- begin-user-doc -->
	 * 
	 * @return the name of this type <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public String getName() {
	  return name;
	}

	/**
	 * <!-- begin-user-doc -->
	 * 
	 * @return the literal of thie arc type <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public String getLiteral() {
	  return literal;
	}

	/**
	 * Returns the literal value of the enumerator, which is its string representation.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 */
	@Override
	public String toString() {
		return literal;
	}
}

/**
 * A private implementation interface used to hide the inheritance from Enumerator.
 * <!-- begin-user-doc --> <!--
 * end-user-doc -->
 * @generated
 */
interface InternalHLArcType extends org.eclipse.emf.common.util.Enumerator {
	// Empty
}
