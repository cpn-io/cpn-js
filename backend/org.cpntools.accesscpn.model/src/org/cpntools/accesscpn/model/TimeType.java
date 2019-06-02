package org.cpntools.accesscpn.model;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * @model
 * @author michael
 */
public enum TimeType implements InternalTimeType {
	/**
	 * 
	 */
	INTEGER(0, "Integer", "Integer"), /**
	 * 
	 */
	REAL(1, "Real", "Real");

	/**
	 * @model name="Integer"
	 */
	public static final int INTEGER_VALUE = 0;

	/**
	 * @model name="Real"
	 */
	public static final int REAL_VALUE = 1;

	/**
	 * An array of all the '<em><b>Time Type</b></em>' enumerators.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private static final TimeType[] VALUES_ARRAY = new TimeType[] {
			INTEGER,
			REAL,
		};
	/**
	 * A public read-only list of all the '<em><b>Time Type</b></em>' enumerators.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 */
	public static final List<TimeType> VALUES = Collections.unmodifiableList(Arrays.asList(VALUES_ARRAY));

	/**
	 * Returns the '<em><b>Time Type</b></em>' literal with the specified literal value.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 */
	public static TimeType get(String literal) {
		for (int i = 0; i < VALUES_ARRAY.length; ++i) {
			TimeType result = VALUES_ARRAY[i];
			if (result.toString().equals(literal)) {
				return result;
			}
		}
		return null;
	}

	/**
	 * Returns the '<em><b>Time Type</b></em>' literal with the specified name.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 */
	public static TimeType getByName(String name) {
		for (int i = 0; i < VALUES_ARRAY.length; ++i) {
			TimeType result = VALUES_ARRAY[i];
			if (result.getName().equals(name)) {
				return result;
			}
		}
		return null;
	}

	/**
	 * Returns the '<em><b>Time Type</b></em>' literal with the specified integer value.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 */
	public static TimeType get(int value) {
		switch (value) {
			case INTEGER_VALUE: return INTEGER;
			case REAL_VALUE: return REAL;
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
	private TimeType(int value, String name, String literal) {
		this.value = value;
		this.name = name;
		this.literal = literal;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public int getValue() {
	  return value;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public String getName() {
	  return name;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
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
interface InternalTimeType extends org.eclipse.emf.common.util.Enumerator {
	// Empty
}
