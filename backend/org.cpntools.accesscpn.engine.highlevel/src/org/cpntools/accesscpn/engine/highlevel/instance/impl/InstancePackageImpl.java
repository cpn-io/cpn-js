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
 * <copyright>
 * </copyright>
 *
 * $Id$
 */
package org.cpntools.accesscpn.engine.highlevel.instance.impl;






import org.cpntools.accesscpn.engine.highlevel.instance.Binding;
import org.cpntools.accesscpn.engine.highlevel.instance.Instance;
import org.cpntools.accesscpn.engine.highlevel.instance.InstanceFactory;
import org.cpntools.accesscpn.engine.highlevel.instance.Marking;
import org.cpntools.accesscpn.engine.highlevel.instance.MultisetEntry;
import org.cpntools.accesscpn.engine.highlevel.instance.State;
import org.cpntools.accesscpn.engine.highlevel.instance.ValueAssignment;
import org.cpntools.accesscpn.model.PlaceNode;
import org.cpntools.accesscpn.model.Transition;
import org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl;
import org.cpntools.accesscpn.model.declaration.impl.DeclarationPackageImpl;
import org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl;
import org.cpntools.accesscpn.model.impl.ModelPackageImpl;
import org.cpntools.accesscpn.model.monitors.impl.MonitorsPackageImpl;
import org.eclipse.emf.ecore.EAttribute;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EDataType;
import org.eclipse.emf.ecore.EFactory;
import org.eclipse.emf.ecore.EGenericType;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.EReference;
import org.eclipse.emf.ecore.ETypeParameter;
import org.eclipse.emf.ecore.impl.EPackageImpl;

/**
 * <!-- begin-user-doc -->
 * The <b>Package</b> for the model.
 * It contains accessors for the meta objects to represent
 * <ul>
 *   <li>each class,</li>
 *   <li>each feature of each class,</li>
 *   <li>each enum,</li>
 *   <li>and each data type</li>
 * </ul>
 * <!-- end-user-doc -->
 * @see org.cpntools.accesscpn.engine.highlevel.instance.InstanceFactory
 * @model kind="package"
 * @generated
 */
public class InstancePackageImpl extends EPackageImpl {
	/**
	 * The package name.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public static final String eNAME = "instance";

	/**
	 * The package namespace URI.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public static final String eNS_URI = "http:///org/cpntools/accesscpn/engine/highlevel/instance.ecore";

	/**
	 * The package namespace name.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public static final String eNS_PREFIX = "org.cpntools.accesscpn.engine.highlevel.instance";

	/**
	 * The singleton instance of the package.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public static final InstancePackageImpl eINSTANCE = org.cpntools.accesscpn.engine.highlevel.instance.impl.InstancePackageImpl.init();

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.engine.highlevel.instance.impl.BindingImpl <em>Binding</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.BindingImpl
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.InstancePackageImpl#getBinding()
	 * @generated
	 */
	public static final int BINDING = 0;

	/**
	 * The feature id for the '<em><b>Transition Instance</b></em>' reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int BINDING__TRANSITION_INSTANCE = 0;

	/**
	 * The feature id for the '<em><b>All Assignments</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int BINDING__ALL_ASSIGNMENTS = 1;

	/**
	 * The number of structural features of the '<em>Binding</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int BINDING_FEATURE_COUNT = 2;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.engine.highlevel.instance.impl.InstanceImpl <em>Instance</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.InstanceImpl
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.InstancePackageImpl#getInstance()
	 * @generated
	 */
	public static final int INSTANCE = 1;

	/**
	 * The feature id for the '<em><b>Node</b></em>' reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int INSTANCE__NODE = 0;

	/**
	 * The feature id for the '<em><b>Transition Path</b></em>' reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int INSTANCE__TRANSITION_PATH = 1;

	/**
	 * The number of structural features of the '<em>Instance</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int INSTANCE_FEATURE_COUNT = 2;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.engine.highlevel.instance.impl.MarkingImpl <em>Marking</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.MarkingImpl
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.InstancePackageImpl#getMarking()
	 * @generated
	 */
	public static final int MARKING = 2;

	/**
	 * The feature id for the '<em><b>Place Instance</b></em>' reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int MARKING__PLACE_INSTANCE = 0;

	/**
	 * The feature id for the '<em><b>Token Count</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int MARKING__TOKEN_COUNT = 1;

	/**
	 * The feature id for the '<em><b>Marking</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int MARKING__MARKING = 2;

	/**
	 * The feature id for the '<em><b>Structured Marking</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int MARKING__STRUCTURED_MARKING = 3;

	/**
	 * The number of structural features of the '<em>Marking</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int MARKING_FEATURE_COUNT = 4;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.engine.highlevel.instance.impl.MultisetEntryImpl <em>Multiset Entry</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.MultisetEntryImpl
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.InstancePackageImpl#getMultisetEntry()
	 * @generated
	 */
	public static final int MULTISET_ENTRY = 3;

	/**
	 * The feature id for the '<em><b>Coefficient</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int MULTISET_ENTRY__COEFFICIENT = 0;

	/**
	 * The feature id for the '<em><b>Value As String</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int MULTISET_ENTRY__VALUE_AS_STRING = 1;

	/**
	 * The number of structural features of the '<em>Multiset Entry</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int MULTISET_ENTRY_FEATURE_COUNT = 2;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.engine.highlevel.instance.impl.StateImpl <em>State</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.StateImpl
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.InstancePackageImpl#getState()
	 * @generated
	 */
	public static final int STATE = 4;

	/**
	 * The feature id for the '<em><b>All Markings</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int STATE__ALL_MARKINGS = 0;

	/**
	 * The number of structural features of the '<em>State</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int STATE_FEATURE_COUNT = 1;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.engine.highlevel.instance.impl.ValueAssignmentImpl <em>Value Assignment</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.ValueAssignmentImpl
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.InstancePackageImpl#getValueAssignment()
	 * @generated
	 */
	public static final int VALUE_ASSIGNMENT = 5;

	/**
	 * The feature id for the '<em><b>Name</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int VALUE_ASSIGNMENT__NAME = 0;

	/**
	 * The feature id for the '<em><b>Value</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int VALUE_ASSIGNMENT__VALUE = 1;

	/**
	 * The number of structural features of the '<em>Value Assignment</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int VALUE_ASSIGNMENT_FEATURE_COUNT = 2;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	private EClass bindingEClass = null;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	private EClass instanceEClass = null;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	private EClass markingEClass = null;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	private EClass multisetEntryEClass = null;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	private EClass stateEClass = null;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	private EClass valueAssignmentEClass = null;

	/**
	 * Creates an instance of the model <b>Package</b>, registered with
	 * {@link org.eclipse.emf.ecore.EPackage.Registry EPackage.Registry} by the package
	 * package URI value.
	 * <p>Note: the correct way to create the package is via the static
	 * factory method {@link #init init()}, which also performs
	 * initialization of the package, or returns the registered package,
	 * if one already exists.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see org.eclipse.emf.ecore.EPackage.Registry
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.InstancePackageImpl#eNS_URI
	 * @see #init()
	 * @generated
	 */
	private InstancePackageImpl() {
		super(eNS_URI, ((EFactory)InstanceFactory.INSTANCE));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	private static boolean isInited = false;

	/**
	 * Creates, registers, and initializes the <b>Package</b> for this model, and for any others upon which it depends.
	 * 
	 * <p>This method is used to initialize {@link InstancePackageImpl#eINSTANCE} when that field is accessed.
	 * Clients should not invoke it directly. Instead, they should simply access that field to obtain the package.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #eNS_URI
	 * @see #createPackageContents()
	 * @see #initializePackageContents()
	 * @generated
	 */
	public static InstancePackageImpl init() {
		if (isInited) return (InstancePackageImpl)EPackage.Registry.INSTANCE.getEPackage(InstancePackageImpl.eNS_URI);

		// Obtain or create and register package
		InstancePackageImpl theInstancePackage = (InstancePackageImpl)(EPackage.Registry.INSTANCE.get(eNS_URI) instanceof InstancePackageImpl ? EPackage.Registry.INSTANCE.get(eNS_URI) : new InstancePackageImpl());

		isInited = true;

		// Initialize simple dependencies
		ModelPackageImpl.eINSTANCE.eClass();
		GraphicsPackageImpl.eINSTANCE.eClass();
		DeclarationPackageImpl.eINSTANCE.eClass();
		CpntypesPackageImpl.eINSTANCE.eClass();
		MonitorsPackageImpl.eINSTANCE.eClass();

		// Create package meta-data objects
		theInstancePackage.createPackageContents();

		// Initialize created meta-data
		theInstancePackage.initializePackageContents();

		// Mark meta-data to indicate it can't be changed
		theInstancePackage.freeze();

  
		// Update the registry and return the package
		EPackage.Registry.INSTANCE.put(InstancePackageImpl.eNS_URI, theInstancePackage);
		return theInstancePackage;
	}


	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.engine.highlevel.instance.Binding <em>Binding</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Binding</em>'.
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.Binding
	 * @generated
	 */
	public EClass getBinding() {
		return bindingEClass;
	}

	/**
	 * Returns the meta object for the reference '{@link org.cpntools.accesscpn.engine.highlevel.instance.Binding#getTransitionInstance <em>Transition Instance</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the reference '<em>Transition Instance</em>'.
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.Binding#getTransitionInstance()
	 * @see #getBinding()
	 * @generated
	 */
	public EReference getBinding_TransitionInstance() {
		return (EReference)bindingEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the containment reference list '{@link org.cpntools.accesscpn.engine.highlevel.instance.Binding#getAllAssignments <em>All Assignments</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference list '<em>All Assignments</em>'.
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.Binding#getAllAssignments()
	 * @see #getBinding()
	 * @generated
	 */
	public EReference getBinding_AllAssignments() {
		return (EReference)bindingEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.engine.highlevel.instance.Instance <em>Instance</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Instance</em>'.
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.Instance
	 * @generated
	 */
	public EClass getInstance() {
		return instanceEClass;
	}

	/**
	 * Returns the meta object for the reference '{@link org.cpntools.accesscpn.engine.highlevel.instance.Instance#getNode <em>Node</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the reference '<em>Node</em>'.
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.Instance#getNode()
	 * @see #getInstance()
	 * @generated
	 */
	public EReference getInstance_Node() {
		return (EReference)instanceEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the reference '{@link org.cpntools.accesscpn.engine.highlevel.instance.Instance#getTransitionPath <em>Transition Path</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the reference '<em>Transition Path</em>'.
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.Instance#getTransitionPath()
	 * @see #getInstance()
	 * @generated
	 */
	public EReference getInstance_TransitionPath() {
		return (EReference)instanceEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.engine.highlevel.instance.Marking <em>Marking</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Marking</em>'.
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.Marking
	 * @generated
	 */
	public EClass getMarking() {
		return markingEClass;
	}

	/**
	 * Returns the meta object for the reference '{@link org.cpntools.accesscpn.engine.highlevel.instance.Marking#getPlaceInstance <em>Place Instance</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the reference '<em>Place Instance</em>'.
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.Marking#getPlaceInstance()
	 * @see #getMarking()
	 * @generated
	 */
	public EReference getMarking_PlaceInstance() {
		return (EReference)markingEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.engine.highlevel.instance.Marking#getTokenCount <em>Token Count</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Token Count</em>'.
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.Marking#getTokenCount()
	 * @see #getMarking()
	 * @generated
	 */
	public EAttribute getMarking_TokenCount() {
		return (EAttribute)markingEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.engine.highlevel.instance.Marking#getMarking <em>Marking</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Marking</em>'.
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.Marking#getMarking()
	 * @see #getMarking()
	 * @generated
	 */
	public EAttribute getMarking_Marking() {
		return (EAttribute)markingEClass.getEStructuralFeatures().get(2);
	}

	/**
	 * Returns the meta object for the containment reference list '{@link org.cpntools.accesscpn.engine.highlevel.instance.Marking#getStructuredMarking <em>Structured Marking</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference list '<em>Structured Marking</em>'.
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.Marking#getStructuredMarking()
	 * @see #getMarking()
	 * @generated
	 */
	public EReference getMarking_StructuredMarking() {
		return (EReference)markingEClass.getEStructuralFeatures().get(3);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.engine.highlevel.instance.MultisetEntry <em>Multiset Entry</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Multiset Entry</em>'.
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.MultisetEntry
	 * @generated
	 */
	public EClass getMultisetEntry() {
		return multisetEntryEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.engine.highlevel.instance.MultisetEntry#getCoefficient <em>Coefficient</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Coefficient</em>'.
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.MultisetEntry#getCoefficient()
	 * @see #getMultisetEntry()
	 * @generated
	 */
	public EAttribute getMultisetEntry_Coefficient() {
		return (EAttribute)multisetEntryEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.engine.highlevel.instance.MultisetEntry#getValueAsString <em>Value As String</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Value As String</em>'.
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.MultisetEntry#getValueAsString()
	 * @see #getMultisetEntry()
	 * @generated
	 */
	public EAttribute getMultisetEntry_ValueAsString() {
		return (EAttribute)multisetEntryEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.engine.highlevel.instance.State <em>State</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>State</em>'.
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.State
	 * @generated
	 */
	public EClass getState() {
		return stateEClass;
	}

	/**
	 * Returns the meta object for the containment reference list '{@link org.cpntools.accesscpn.engine.highlevel.instance.State#getAllMarkings <em>All Markings</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference list '<em>All Markings</em>'.
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.State#getAllMarkings()
	 * @see #getState()
	 * @generated
	 */
	public EReference getState_AllMarkings() {
		return (EReference)stateEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.engine.highlevel.instance.ValueAssignment <em>Value Assignment</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Value Assignment</em>'.
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.ValueAssignment
	 * @generated
	 */
	public EClass getValueAssignment() {
		return valueAssignmentEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.engine.highlevel.instance.ValueAssignment#getName <em>Name</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Name</em>'.
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.ValueAssignment#getName()
	 * @see #getValueAssignment()
	 * @generated
	 */
	public EAttribute getValueAssignment_Name() {
		return (EAttribute)valueAssignmentEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.engine.highlevel.instance.ValueAssignment#getValue <em>Value</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Value</em>'.
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.ValueAssignment#getValue()
	 * @see #getValueAssignment()
	 * @generated
	 */
	public EAttribute getValueAssignment_Value() {
		return (EAttribute)valueAssignmentEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the factory that creates the instances of the model.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the factory that creates the instances of the model.
	 * @generated
	 */
	public InstanceFactory getInstanceFactory() {
		return (InstanceFactory)getEFactoryInstance();
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	private boolean isCreated = false;

	/**
	 * Creates the meta-model objects for the package.  This method is
	 * guarded to have no affect on any invocation but its first.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public void createPackageContents() {
		if (isCreated) return;
		isCreated = true;

		// Create classes and their features
		bindingEClass = createEClass(BINDING);
		createEReference(bindingEClass, BINDING__TRANSITION_INSTANCE);
		createEReference(bindingEClass, BINDING__ALL_ASSIGNMENTS);

		instanceEClass = createEClass(INSTANCE);
		createEReference(instanceEClass, INSTANCE__NODE);
		createEReference(instanceEClass, INSTANCE__TRANSITION_PATH);

		markingEClass = createEClass(MARKING);
		createEReference(markingEClass, MARKING__PLACE_INSTANCE);
		createEAttribute(markingEClass, MARKING__TOKEN_COUNT);
		createEAttribute(markingEClass, MARKING__MARKING);
		createEReference(markingEClass, MARKING__STRUCTURED_MARKING);

		multisetEntryEClass = createEClass(MULTISET_ENTRY);
		createEAttribute(multisetEntryEClass, MULTISET_ENTRY__COEFFICIENT);
		createEAttribute(multisetEntryEClass, MULTISET_ENTRY__VALUE_AS_STRING);

		stateEClass = createEClass(STATE);
		createEReference(stateEClass, STATE__ALL_MARKINGS);

		valueAssignmentEClass = createEClass(VALUE_ASSIGNMENT);
		createEAttribute(valueAssignmentEClass, VALUE_ASSIGNMENT__NAME);
		createEAttribute(valueAssignmentEClass, VALUE_ASSIGNMENT__VALUE);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	private boolean isInitialized = false;

	/**
	 * Complete the initialization of the package and its meta-model.  This
	 * method is guarded to have no affect on any invocation but its first.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public void initializePackageContents() {
		if (isInitialized) return;
		isInitialized = true;

		// Initialize package
		setName(eNAME);
		setNsPrefix(eNS_PREFIX);
		setNsURI(eNS_URI);

		// Obtain other dependent packages
		ModelPackageImpl theModelPackage = (ModelPackageImpl)EPackage.Registry.INSTANCE.getEPackage(ModelPackageImpl.eNS_URI);

		// Create type parameters
		ETypeParameter instanceEClass_T = addETypeParameter(instanceEClass, "T");

		// Set bounds for type parameters

		// Add supertypes to classes

		// Initialize classes and features; add operations and parameters
		initEClass(bindingEClass, Binding.class, "Binding", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		EGenericType g1 = createEGenericType(this.getInstance());
		EGenericType g2 = createEGenericType(theModelPackage.getTransition());
		g1.getETypeArguments().add(g2);
		initEReference(getBinding_TransitionInstance(), g1, null, "transitionInstance", null, 0, 1, Binding.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getBinding_AllAssignments(), this.getValueAssignment(), null, "allAssignments", null, 0, -1, Binding.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(instanceEClass, Instance.class, "Instance", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		g1 = createEGenericType(instanceEClass_T);
		initEReference(getInstance_Node(), g1, null, "node", null, 0, 1, Instance.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		g1 = createEGenericType(this.getInstance());
		g2 = createEGenericType(theModelPackage.getInstance());
		g1.getETypeArguments().add(g2);
		initEReference(getInstance_TransitionPath(), g1, null, "transitionPath", null, 0, 1, Instance.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(markingEClass, Marking.class, "Marking", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		g1 = createEGenericType(this.getInstance());
		g2 = createEGenericType();
		g1.getETypeArguments().add(g2);
		EGenericType g3 = createEGenericType(theModelPackage.getPlaceNode());
		g2.setEUpperBound(g3);
		initEReference(getMarking_PlaceInstance(), g1, null, "placeInstance", null, 0, 1, Marking.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getMarking_TokenCount(), ecorePackage.getEInt(), "tokenCount", null, 0, 1, Marking.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getMarking_Marking(), ecorePackage.getEString(), "marking", null, 0, 1, Marking.class, IS_TRANSIENT, !IS_VOLATILE, !IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getMarking_StructuredMarking(), this.getMultisetEntry(), null, "structuredMarking", null, 0, -1, Marking.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(multisetEntryEClass, MultisetEntry.class, "MultisetEntry", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getMultisetEntry_Coefficient(), ecorePackage.getEInt(), "coefficient", null, 0, 1, MultisetEntry.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getMultisetEntry_ValueAsString(), ecorePackage.getEString(), "valueAsString", null, 0, 1, MultisetEntry.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(stateEClass, State.class, "State", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getState_AllMarkings(), this.getMarking(), null, "allMarkings", null, 0, -1, State.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(valueAssignmentEClass, ValueAssignment.class, "ValueAssignment", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getValueAssignment_Name(), ecorePackage.getEString(), "name", null, 0, 1, ValueAssignment.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getValueAssignment_Value(), ecorePackage.getEString(), "value", null, 0, 1, ValueAssignment.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		// Create resource
		createResource(eNS_URI);
	}

	/**
	 * <!-- begin-user-doc -->
	 * Defines literals for the meta objects that represent
	 * <ul>
	 *   <li>each class,</li>
	 *   <li>each feature of each class,</li>
	 *   <li>each enum,</li>
	 *   <li>and each data type</li>
	 * </ul>
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@SuppressWarnings("hiding")
	public interface Literals {
		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.engine.highlevel.instance.impl.BindingImpl <em>Binding</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.BindingImpl
		 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.InstancePackageImpl#getBinding()
		 * @generated
		 */
		public static final EClass BINDING = eINSTANCE.getBinding();

		/**
		 * The meta object literal for the '<em><b>Transition Instance</b></em>' reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference BINDING__TRANSITION_INSTANCE = eINSTANCE.getBinding_TransitionInstance();

		/**
		 * The meta object literal for the '<em><b>All Assignments</b></em>' containment reference list feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference BINDING__ALL_ASSIGNMENTS = eINSTANCE.getBinding_AllAssignments();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.engine.highlevel.instance.impl.InstanceImpl <em>Instance</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.InstanceImpl
		 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.InstancePackageImpl#getInstance()
		 * @generated
		 */
		public static final EClass INSTANCE = eINSTANCE.getInstance();

		/**
		 * The meta object literal for the '<em><b>Node</b></em>' reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference INSTANCE__NODE = eINSTANCE.getInstance_Node();

		/**
		 * The meta object literal for the '<em><b>Transition Path</b></em>' reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference INSTANCE__TRANSITION_PATH = eINSTANCE.getInstance_TransitionPath();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.engine.highlevel.instance.impl.MarkingImpl <em>Marking</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.MarkingImpl
		 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.InstancePackageImpl#getMarking()
		 * @generated
		 */
		public static final EClass MARKING = eINSTANCE.getMarking();

		/**
		 * The meta object literal for the '<em><b>Place Instance</b></em>' reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference MARKING__PLACE_INSTANCE = eINSTANCE.getMarking_PlaceInstance();

		/**
		 * The meta object literal for the '<em><b>Token Count</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EAttribute MARKING__TOKEN_COUNT = eINSTANCE.getMarking_TokenCount();

		/**
		 * The meta object literal for the '<em><b>Marking</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EAttribute MARKING__MARKING = eINSTANCE.getMarking_Marking();

		/**
		 * The meta object literal for the '<em><b>Structured Marking</b></em>' containment reference list feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference MARKING__STRUCTURED_MARKING = eINSTANCE.getMarking_StructuredMarking();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.engine.highlevel.instance.impl.MultisetEntryImpl <em>Multiset Entry</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.MultisetEntryImpl
		 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.InstancePackageImpl#getMultisetEntry()
		 * @generated
		 */
		public static final EClass MULTISET_ENTRY = eINSTANCE.getMultisetEntry();

		/**
		 * The meta object literal for the '<em><b>Coefficient</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EAttribute MULTISET_ENTRY__COEFFICIENT = eINSTANCE.getMultisetEntry_Coefficient();

		/**
		 * The meta object literal for the '<em><b>Value As String</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EAttribute MULTISET_ENTRY__VALUE_AS_STRING = eINSTANCE.getMultisetEntry_ValueAsString();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.engine.highlevel.instance.impl.StateImpl <em>State</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.StateImpl
		 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.InstancePackageImpl#getState()
		 * @generated
		 */
		public static final EClass STATE = eINSTANCE.getState();

		/**
		 * The meta object literal for the '<em><b>All Markings</b></em>' containment reference list feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference STATE__ALL_MARKINGS = eINSTANCE.getState_AllMarkings();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.engine.highlevel.instance.impl.ValueAssignmentImpl <em>Value Assignment</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.ValueAssignmentImpl
		 * @see org.cpntools.accesscpn.engine.highlevel.instance.impl.InstancePackageImpl#getValueAssignment()
		 * @generated
		 */
		public static final EClass VALUE_ASSIGNMENT = eINSTANCE.getValueAssignment();

		/**
		 * The meta object literal for the '<em><b>Name</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EAttribute VALUE_ASSIGNMENT__NAME = eINSTANCE.getValueAssignment_Name();

		/**
		 * The meta object literal for the '<em><b>Value</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EAttribute VALUE_ASSIGNMENT__VALUE = eINSTANCE.getValueAssignment_Value();

	}

} //InstancePackageImpl
