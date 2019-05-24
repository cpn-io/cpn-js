package org.cpntools.accesscpn.model.monitors;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * @model
 * @author michael
 */
public enum MonitorType implements InternalMonitorType {

	/**
	 * @model
	 */
	MARKING_SIZE(0, "MARKING_SIZE", "MARKING_SIZE"),

	/**
	 * @model
	 */
	BREAKPOINT(1, "BREAKPOINT", "BREAKPOINT"),

	/**
	 * @model
	 */
	USER_DEFINED(2, "USER_DEFINED", "USER_DEFINED"),
	/**
	 * @model
	 */
	DATA_COLLECTION(3, "DATA_COLLECTION", "DATA_COLLECTION"),

	/**
	 * @model
	 */
	WRITE_IN_FILE(4, "WRITE_IN_FILE", "WRITE_IN_FILE"),

	/**
	 * @model
	 */
	LIST_LENGTH(5, "LIST_LENGTH", "LIST_LENGTH"),
	/**
	 * @model
	 */
	COUNT_TRANSITION(6, "COUNT_TRANSITION", "COUNT_TRANSITION"),
	/**
	 * @model
	 */
	PLACE_CONTENT(7, "PLACE_CONTENT", "PLACE_CONTENT"),
	/**
	 * @model
	 */
	TRANSTION_ENABLED(8, "TRANSTION_ENABLED", "TRANSTION_ENABLED");
	/**
	 * The '<em><b>MARKING SIZE</b></em>' literal value.
	 * <!-- begin-user-doc -->
	 * <p>
	 * If the meaning of '<em><b>MARKING SIZE</b></em>' literal object isn't clear,
	 * there really should be more of a description here...
	 * </p>
	 * <!-- end-user-doc -->
	 * @see #MARKING_SIZE
	 * @model
	 * @generated
	 * @ordered
	 */
	public static final int MARKING_SIZE_VALUE = 0;
	/**
	 * The '<em><b>BREAKPOINT</b></em>' literal value.
	 * <!-- begin-user-doc -->
	 * <p>
	 * If the meaning of '<em><b>BREAKPOINT</b></em>' literal object isn't clear,
	 * there really should be more of a description here...
	 * </p>
	 * <!-- end-user-doc -->
	 * @see #BREAKPOINT
	 * @model
	 * @generated
	 * @ordered
	 */
	public static final int BREAKPOINT_VALUE = 1;
	/**
	 * The '<em><b>USER DEFINED</b></em>' literal value.
	 * <!-- begin-user-doc -->
	 * <p>
	 * If the meaning of '<em><b>USER DEFINED</b></em>' literal object isn't clear,
	 * there really should be more of a description here...
	 * </p>
	 * <!-- end-user-doc -->
	 * @see #USER_DEFINED
	 * @model
	 * @generated
	 * @ordered
	 */
	public static final int USER_DEFINED_VALUE = 2;
	/**
	 * The '<em><b>DATA COLLECTION</b></em>' literal value.
	 * <!-- begin-user-doc -->
	 * <p>
	 * If the meaning of '<em><b>DATA COLLECTION</b></em>' literal object isn't clear,
	 * there really should be more of a description here...
	 * </p>
	 * <!-- end-user-doc -->
	 * @see #DATA_COLLECTION
	 * @model
	 * @generated
	 * @ordered
	 */
	public static final int DATA_COLLECTION_VALUE = 3;
	/**
	 * The '<em><b>WRITE IN FILE</b></em>' literal value.
	 * <!-- begin-user-doc -->
	 * <p>
	 * If the meaning of '<em><b>WRITE IN FILE</b></em>' literal object isn't clear,
	 * there really should be more of a description here...
	 * </p>
	 * <!-- end-user-doc -->
	 * @see #WRITE_IN_FILE
	 * @model
	 * @generated
	 * @ordered
	 */
	public static final int WRITE_IN_FILE_VALUE = 4;
	/**
	 * The '<em><b>LIST LENGTH</b></em>' literal value.
	 * <!-- begin-user-doc -->
	 * <p>
	 * If the meaning of '<em><b>LIST LENGTH</b></em>' literal object isn't clear,
	 * there really should be more of a description here...
	 * </p>
	 * <!-- end-user-doc -->
	 * @see #LIST_LENGTH
	 * @model
	 * @generated
	 * @ordered
	 */
	public static final int LIST_LENGTH_VALUE = 5;
	/**
	 * The '<em><b>COUNT TRANSITION</b></em>' literal value.
	 * <!-- begin-user-doc -->
	 * <p>
	 * If the meaning of '<em><b>COUNT TRANSITION</b></em>' literal object isn't clear,
	 * there really should be more of a description here...
	 * </p>
	 * <!-- end-user-doc -->
	 * @see #COUNT_TRANSITION
	 * @model
	 * @generated
	 * @ordered
	 */
	public static final int COUNT_TRANSITION_VALUE = 6;
	/**
	 * The '<em><b>PLACE CONTENT</b></em>' literal value.
	 * <!-- begin-user-doc -->
	 * <p>
	 * If the meaning of '<em><b>PLACE CONTENT</b></em>' literal object isn't clear,
	 * there really should be more of a description here...
	 * </p>
	 * <!-- end-user-doc -->
	 * @see #PLACE_CONTENT
	 * @model
	 * @generated
	 * @ordered
	 */
	public static final int PLACE_CONTENT_VALUE = 7;
	/**
	 * The '<em><b>TRANSTION ENABLED</b></em>' literal value.
	 * <!-- begin-user-doc -->
	 * <p>
	 * If the meaning of '<em><b>TRANSTION ENABLED</b></em>' literal object isn't clear,
	 * there really should be more of a description here...
	 * </p>
	 * <!-- end-user-doc -->
	 * @see #TRANSTION_ENABLED
	 * @model
	 * @generated
	 * @ordered
	 */
	public static final int TRANSTION_ENABLED_VALUE = 8;
	/**
	 * An array of all the '<em><b>Monitor Type</b></em>' enumerators.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private static final MonitorType[] VALUES_ARRAY = new MonitorType[] {
			MARKING_SIZE,
			BREAKPOINT,
			USER_DEFINED,
			DATA_COLLECTION,
			WRITE_IN_FILE,
			LIST_LENGTH,
			COUNT_TRANSITION,
			PLACE_CONTENT,
			TRANSTION_ENABLED,
		};
	/**
	 * A public read-only list of all the '<em><b>Monitor Type</b></em>' enumerators.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 */
	public static final List<MonitorType> VALUES = Collections.unmodifiableList(Arrays.asList(VALUES_ARRAY));

	/**
	 * Returns the '<em><b>Monitor Type</b></em>' literal with the specified literal value.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 */
	public static MonitorType get(String literal) {
		for (int i = 0; i < VALUES_ARRAY.length; ++i) {
			MonitorType result = VALUES_ARRAY[i];
			if (result.toString().equals(literal)) {
				return result;
			}
		}
		return null;
	}

	/**
	 * Returns the '<em><b>Monitor Type</b></em>' literal with the specified name.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 */
	public static MonitorType getByName(String name) {
		for (int i = 0; i < VALUES_ARRAY.length; ++i) {
			MonitorType result = VALUES_ARRAY[i];
			if (result.getName().equals(name)) {
				return result;
			}
		}
		return null;
	}

	/**
	 * Returns the '<em><b>Monitor Type</b></em>' literal with the specified integer value.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 */
	public static MonitorType get(int value) {
		switch (value) {
			case MARKING_SIZE_VALUE: return MARKING_SIZE;
			case BREAKPOINT_VALUE: return BREAKPOINT;
			case USER_DEFINED_VALUE: return USER_DEFINED;
			case DATA_COLLECTION_VALUE: return DATA_COLLECTION;
			case WRITE_IN_FILE_VALUE: return WRITE_IN_FILE;
			case LIST_LENGTH_VALUE: return LIST_LENGTH;
			case COUNT_TRANSITION_VALUE: return COUNT_TRANSITION;
			case PLACE_CONTENT_VALUE: return PLACE_CONTENT;
			case TRANSTION_ENABLED_VALUE: return TRANSTION_ENABLED;
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
	private MonitorType(int value, String name, String literal) {
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
interface InternalMonitorType extends org.eclipse.emf.common.util.Enumerator {
	// Empty
}
