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
/**
 * <copyright> </copyright> $Id$
 */
package org.cpntools.accesscpn.model.declaration.impl;

import org.cpntools.accesscpn.model.auxgraphics.impl.AuxgraphicsPackageImpl;
import org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl;
import org.cpntools.accesscpn.model.declaration.DeclarationFactory;
import org.cpntools.accesscpn.model.declaration.DeclarationStructure;
import org.cpntools.accesscpn.model.declaration.GlobalReferenceDeclaration;
import org.cpntools.accesscpn.model.declaration.MLDeclaration;
import org.cpntools.accesscpn.model.declaration.TypeDeclaration;
import org.cpntools.accesscpn.model.declaration.UseDeclaration;
import org.cpntools.accesscpn.model.declaration.VariableDeclaration;
import org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl;
import org.cpntools.accesscpn.model.impl.ModelPackageImpl;
import org.cpntools.accesscpn.model.monitors.impl.MonitorsPackageImpl;
import org.eclipse.emf.ecore.EAttribute;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EFactory;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.EReference;
import org.eclipse.emf.ecore.impl.EPackageImpl;

/**
 * <!-- begin-user-doc --> An implementation of the model <b>Package</b>. <!-- end-user-doc -->
 * @see org.cpntools.accesscpn.model.declaration.DeclarationFactory
 * @model kind="package"
 * @generated
 */
public class DeclarationPackageImpl extends EPackageImpl {
	/**
	 * The package name.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public static final String eNAME = "declaration";

	/**
	 * The package namespace URI.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public static final String eNS_URI = "http:///org/cpntools/accesscpn/model/declaration.ecore";

	/**
	 * The package namespace name.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public static final String eNS_PREFIX = "org.cpntools.accesscpn.model.declaration";

	/**
	 * The singleton instance of the package.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public static final DeclarationPackageImpl eINSTANCE = org.cpntools.accesscpn.model.declaration.impl.DeclarationPackageImpl.init();

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.declaration.impl.DeclarationStructureImpl <em>Structure</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.declaration.impl.DeclarationStructureImpl
	 * @see org.cpntools.accesscpn.model.declaration.impl.DeclarationPackageImpl#getDeclarationStructure()
	 * @generated
	 */
	public static final int DECLARATION_STRUCTURE = 0;

	/**
	 * The number of structural features of the '<em>Structure</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int DECLARATION_STRUCTURE_FEATURE_COUNT = 0;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.declaration.impl.VariableDeclarationImpl <em>Variable Declaration</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.declaration.impl.VariableDeclarationImpl
	 * @see org.cpntools.accesscpn.model.declaration.impl.DeclarationPackageImpl#getVariableDeclaration()
	 * @generated
	 */
	public static final int VARIABLE_DECLARATION = 5;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.declaration.impl.MLDeclarationImpl <em>ML Declaration</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.declaration.impl.MLDeclarationImpl
	 * @see org.cpntools.accesscpn.model.declaration.impl.DeclarationPackageImpl#getMLDeclaration()
	 * @generated
	 */
	public static final int ML_DECLARATION = 2;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.declaration.impl.UseDeclarationImpl <em>Use Declaration</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.declaration.impl.UseDeclarationImpl
	 * @see org.cpntools.accesscpn.model.declaration.impl.DeclarationPackageImpl#getUseDeclaration()
	 * @generated
	 */
	public static final int USE_DECLARATION = 4;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.declaration.impl.GlobalReferenceDeclarationImpl <em>Global Reference Declaration</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.declaration.impl.GlobalReferenceDeclarationImpl
	 * @see org.cpntools.accesscpn.model.declaration.impl.DeclarationPackageImpl#getGlobalReferenceDeclaration()
	 * @generated
	 */
	public static final int GLOBAL_REFERENCE_DECLARATION = 1;

	/**
	 * The feature id for the '<em><b>Name</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int GLOBAL_REFERENCE_DECLARATION__NAME = DECLARATION_STRUCTURE_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Value</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int GLOBAL_REFERENCE_DECLARATION__VALUE = DECLARATION_STRUCTURE_FEATURE_COUNT + 1;

	/**
	 * The number of structural features of the '<em>Global Reference Declaration</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int GLOBAL_REFERENCE_DECLARATION_FEATURE_COUNT = DECLARATION_STRUCTURE_FEATURE_COUNT + 2;

	/**
	 * The feature id for the '<em><b>Code</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int ML_DECLARATION__CODE = DECLARATION_STRUCTURE_FEATURE_COUNT + 0;

	/**
	 * The number of structural features of the '<em>ML Declaration</em>' class.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int ML_DECLARATION_FEATURE_COUNT = DECLARATION_STRUCTURE_FEATURE_COUNT + 1;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.declaration.impl.TypeDeclarationImpl <em>Type Declaration</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.declaration.impl.TypeDeclarationImpl
	 * @see org.cpntools.accesscpn.model.declaration.impl.DeclarationPackageImpl#getTypeDeclaration()
	 * @generated
	 */
	public static final int TYPE_DECLARATION = 3;

	/**
	 * The feature id for the '<em><b>Type Name</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TYPE_DECLARATION__TYPE_NAME = DECLARATION_STRUCTURE_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Sort</b></em>' containment reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int TYPE_DECLARATION__SORT = DECLARATION_STRUCTURE_FEATURE_COUNT + 1;

	/**
	 * The number of structural features of the '<em>Type Declaration</em>' class.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TYPE_DECLARATION_FEATURE_COUNT = DECLARATION_STRUCTURE_FEATURE_COUNT + 2;

	/**
	 * The feature id for the '<em><b>File Name</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int USE_DECLARATION__FILE_NAME = DECLARATION_STRUCTURE_FEATURE_COUNT + 0;

	/**
	 * The number of structural features of the '<em>Use Declaration</em>' class.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int USE_DECLARATION_FEATURE_COUNT = DECLARATION_STRUCTURE_FEATURE_COUNT + 1;

	/**
	 * The feature id for the '<em><b>Type Name</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int VARIABLE_DECLARATION__TYPE_NAME = DECLARATION_STRUCTURE_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Variables</b></em>' attribute list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int VARIABLE_DECLARATION__VARIABLES = DECLARATION_STRUCTURE_FEATURE_COUNT + 1;

	/**
	 * The number of structural features of the '<em>Variable Declaration</em>' class.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int VARIABLE_DECLARATION_FEATURE_COUNT = DECLARATION_STRUCTURE_FEATURE_COUNT + 2;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass variableDeclarationEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass declarationStructureEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass mlDeclarationEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass useDeclarationEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass globalReferenceDeclarationEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass typeDeclarationEClass = null;

	/**
	 * Creates an instance of the model <b>Package</b>, registered with {@link org.eclipse.emf.ecore.EPackage.Registry
	 * EPackage.Registry} by the package package URI value.
	 * <p>
	 * Note: the correct way to create the package is via the static factory method {@link #init init()}, which also
	 * performs initialization of the package, or returns the registered package, if one already exists. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.eclipse.emf.ecore.EPackage.Registry
	 * @see org.cpntools.accesscpn.model.declaration.impl.DeclarationPackageImpl#eNS_URI
	 * @see #init()
	 * @generated
	 */
	private DeclarationPackageImpl() {
		super(eNS_URI, ((EFactory)DeclarationFactory.INSTANCE));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private static boolean isInited = false;

	/**
	 * Creates, registers, and initializes the <b>Package</b> for this model, and for any others upon which it depends.
	 * <p>
	 * This method is used to initialize {@link DeclarationPackageImpl#eINSTANCE} when that field is accessed. Clients
	 * should not invoke it directly. Instead, they should simply access that field to obtain the package. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see #eNS_URI
	 * @see #createPackageContents()
	 * @see #initializePackageContents()
	 * @generated
	 */
	public static DeclarationPackageImpl init() {
		if (isInited) return (DeclarationPackageImpl)EPackage.Registry.INSTANCE.getEPackage(DeclarationPackageImpl.eNS_URI);

		// Obtain or create and register package
		DeclarationPackageImpl theDeclarationPackage = (DeclarationPackageImpl)(EPackage.Registry.INSTANCE.get(eNS_URI) instanceof DeclarationPackageImpl ? EPackage.Registry.INSTANCE.get(eNS_URI) : new DeclarationPackageImpl());

		isInited = true;

		// Obtain or create and register interdependencies
		ModelPackageImpl theModelPackage = (ModelPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(ModelPackageImpl.eNS_URI) instanceof ModelPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(ModelPackageImpl.eNS_URI) : ModelPackageImpl.eINSTANCE);
		AuxgraphicsPackageImpl theAuxgraphicsPackage = (AuxgraphicsPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(AuxgraphicsPackageImpl.eNS_URI) instanceof AuxgraphicsPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(AuxgraphicsPackageImpl.eNS_URI) : AuxgraphicsPackageImpl.eINSTANCE);
		CpntypesPackageImpl theCpntypesPackage = (CpntypesPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(CpntypesPackageImpl.eNS_URI) instanceof CpntypesPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(CpntypesPackageImpl.eNS_URI) : CpntypesPackageImpl.eINSTANCE);
		GraphicsPackageImpl theGraphicsPackage = (GraphicsPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(GraphicsPackageImpl.eNS_URI) instanceof GraphicsPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(GraphicsPackageImpl.eNS_URI) : GraphicsPackageImpl.eINSTANCE);
		MonitorsPackageImpl theMonitorsPackage = (MonitorsPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(MonitorsPackageImpl.eNS_URI) instanceof MonitorsPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(MonitorsPackageImpl.eNS_URI) : MonitorsPackageImpl.eINSTANCE);

		// Create package meta-data objects
		theDeclarationPackage.createPackageContents();
		theModelPackage.createPackageContents();
		theAuxgraphicsPackage.createPackageContents();
		theCpntypesPackage.createPackageContents();
		theGraphicsPackage.createPackageContents();
		theMonitorsPackage.createPackageContents();

		// Initialize created meta-data
		theDeclarationPackage.initializePackageContents();
		theModelPackage.initializePackageContents();
		theAuxgraphicsPackage.initializePackageContents();
		theCpntypesPackage.initializePackageContents();
		theGraphicsPackage.initializePackageContents();
		theMonitorsPackage.initializePackageContents();

		// Mark meta-data to indicate it can't be changed
		theDeclarationPackage.freeze();

  
		// Update the registry and return the package
		EPackage.Registry.INSTANCE.put(DeclarationPackageImpl.eNS_URI, theDeclarationPackage);
		return theDeclarationPackage;
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.declaration.VariableDeclaration <em>Variable Declaration</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>Variable Declaration</em>'.
	 * @see org.cpntools.accesscpn.model.declaration.VariableDeclaration
	 * @generated
	 */
	public EClass getVariableDeclaration() {
		return variableDeclarationEClass;
	}

	/**
	 * Returns the meta object for the attribute '
	 * {@link org.cpntools.accesscpn.model.declaration.VariableDeclaration#getTypeName <em>Type Name</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for the attribute '<em>Type Name</em>'.
	 * @see org.cpntools.accesscpn.model.declaration.VariableDeclaration#getTypeName()
	 * @see #getVariableDeclaration()
	 * @generated
	 */
	public EAttribute getVariableDeclaration_TypeName() {
		return (EAttribute)variableDeclarationEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the attribute list '
	 * {@link org.cpntools.accesscpn.model.declaration.VariableDeclaration#getVariables <em>Variables</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for the attribute list '<em>Variables</em>'.
	 * @see org.cpntools.accesscpn.model.declaration.VariableDeclaration#getVariables()
	 * @see #getVariableDeclaration()
	 * @generated
	 */
	public EAttribute getVariableDeclaration_Variables() {
		return (EAttribute)variableDeclarationEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.declaration.DeclarationStructure <em>Structure</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>Structure</em>'.
	 * @see org.cpntools.accesscpn.model.declaration.DeclarationStructure
	 * @generated
	 */
	public EClass getDeclarationStructure() {
		return declarationStructureEClass;
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.declaration.MLDeclaration <em>ML Declaration</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>ML Declaration</em>'.
	 * @see org.cpntools.accesscpn.model.declaration.MLDeclaration
	 * @generated
	 */
	public EClass getMLDeclaration() {
		return mlDeclarationEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.declaration.MLDeclaration#getCode <em>Code</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Code</em>'.
	 * @see org.cpntools.accesscpn.model.declaration.MLDeclaration#getCode()
	 * @see #getMLDeclaration()
	 * @generated
	 */
	public EAttribute getMLDeclaration_Code() {
		return (EAttribute)mlDeclarationEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.declaration.UseDeclaration <em>Use Declaration</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>Use Declaration</em>'.
	 * @see org.cpntools.accesscpn.model.declaration.UseDeclaration
	 * @generated
	 */
	public EClass getUseDeclaration() {
		return useDeclarationEClass;
	}

	/**
	 * Returns the meta object for the attribute '
	 * {@link org.cpntools.accesscpn.model.declaration.UseDeclaration#getFileName <em>File Name</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for the attribute '<em>File Name</em>'.
	 * @see org.cpntools.accesscpn.model.declaration.UseDeclaration#getFileName()
	 * @see #getUseDeclaration()
	 * @generated
	 */
	public EAttribute getUseDeclaration_FileName() {
		return (EAttribute)useDeclarationEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.declaration.GlobalReferenceDeclaration <em>Global Reference Declaration</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>Global Reference Declaration</em>'.
	 * @see org.cpntools.accesscpn.model.declaration.GlobalReferenceDeclaration
	 * @generated
	 */
	public EClass getGlobalReferenceDeclaration() {
		return globalReferenceDeclarationEClass;
	}

	/**
	 * Returns the meta object for the attribute '
	 * {@link org.cpntools.accesscpn.model.declaration.GlobalReferenceDeclaration#getName <em>Name</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for the attribute '<em>Name</em>'.
	 * @see org.cpntools.accesscpn.model.declaration.GlobalReferenceDeclaration#getName()
	 * @see #getGlobalReferenceDeclaration()
	 * @generated
	 */
	public EAttribute getGlobalReferenceDeclaration_Name() {
		return (EAttribute)globalReferenceDeclarationEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the attribute '
	 * {@link org.cpntools.accesscpn.model.declaration.GlobalReferenceDeclaration#getValue <em>Value</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for the attribute '<em>Value</em>'.
	 * @see org.cpntools.accesscpn.model.declaration.GlobalReferenceDeclaration#getValue()
	 * @see #getGlobalReferenceDeclaration()
	 * @generated
	 */
	public EAttribute getGlobalReferenceDeclaration_Value() {
		return (EAttribute)globalReferenceDeclarationEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.declaration.TypeDeclaration <em>Type Declaration</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>Type Declaration</em>'.
	 * @see org.cpntools.accesscpn.model.declaration.TypeDeclaration
	 * @generated
	 */
	public EClass getTypeDeclaration() {
		return typeDeclarationEClass;
	}

	/**
	 * Returns the meta object for the attribute '
	 * {@link org.cpntools.accesscpn.model.declaration.TypeDeclaration#getTypeName <em>Type Name</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for the attribute '<em>Type Name</em>'.
	 * @see org.cpntools.accesscpn.model.declaration.TypeDeclaration#getTypeName()
	 * @see #getTypeDeclaration()
	 * @generated
	 */
	public EAttribute getTypeDeclaration_TypeName() {
		return (EAttribute)typeDeclarationEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the containment reference '{@link org.cpntools.accesscpn.model.declaration.TypeDeclaration#getSort <em>Sort</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference '<em>Sort</em>'.
	 * @see org.cpntools.accesscpn.model.declaration.TypeDeclaration#getSort()
	 * @see #getTypeDeclaration()
	 * @generated
	 */
	public EReference getTypeDeclaration_Sort() {
		return (EReference)typeDeclarationEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the factory that creates the instances of the model.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the factory that creates the instances of the model.
	 * @generated
	 */
	public DeclarationFactory getDeclarationFactory() {
		return (DeclarationFactory)getEFactoryInstance();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private boolean isCreated = false;

	/**
	 * Creates the meta-model objects for the package.  This method is
	 * guarded to have no affect on any invocation but its first.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public void createPackageContents() {
		if (isCreated) return;
		isCreated = true;

		// Create classes and their features
		declarationStructureEClass = createEClass(DECLARATION_STRUCTURE);

		globalReferenceDeclarationEClass = createEClass(GLOBAL_REFERENCE_DECLARATION);
		createEAttribute(globalReferenceDeclarationEClass, GLOBAL_REFERENCE_DECLARATION__NAME);
		createEAttribute(globalReferenceDeclarationEClass, GLOBAL_REFERENCE_DECLARATION__VALUE);

		mlDeclarationEClass = createEClass(ML_DECLARATION);
		createEAttribute(mlDeclarationEClass, ML_DECLARATION__CODE);

		typeDeclarationEClass = createEClass(TYPE_DECLARATION);
		createEAttribute(typeDeclarationEClass, TYPE_DECLARATION__TYPE_NAME);
		createEReference(typeDeclarationEClass, TYPE_DECLARATION__SORT);

		useDeclarationEClass = createEClass(USE_DECLARATION);
		createEAttribute(useDeclarationEClass, USE_DECLARATION__FILE_NAME);

		variableDeclarationEClass = createEClass(VARIABLE_DECLARATION);
		createEAttribute(variableDeclarationEClass, VARIABLE_DECLARATION__TYPE_NAME);
		createEAttribute(variableDeclarationEClass, VARIABLE_DECLARATION__VARIABLES);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private boolean isInitialized = false;

	/**
	 * Complete the initialization of the package and its meta-model.  This
	 * method is guarded to have no affect on any invocation but its first.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
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
		CpntypesPackageImpl theCpntypesPackage = (CpntypesPackageImpl)EPackage.Registry.INSTANCE.getEPackage(CpntypesPackageImpl.eNS_URI);

		// Create type parameters

		// Set bounds for type parameters

		// Add supertypes to classes
		globalReferenceDeclarationEClass.getESuperTypes().add(this.getDeclarationStructure());
		mlDeclarationEClass.getESuperTypes().add(this.getDeclarationStructure());
		typeDeclarationEClass.getESuperTypes().add(this.getDeclarationStructure());
		useDeclarationEClass.getESuperTypes().add(this.getDeclarationStructure());
		variableDeclarationEClass.getESuperTypes().add(this.getDeclarationStructure());

		// Initialize classes and features; add operations and parameters
		initEClass(declarationStructureEClass, DeclarationStructure.class, "DeclarationStructure", IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);

		initEClass(globalReferenceDeclarationEClass, GlobalReferenceDeclaration.class, "GlobalReferenceDeclaration", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getGlobalReferenceDeclaration_Name(), ecorePackage.getEString(), "name", null, 1, 1, GlobalReferenceDeclaration.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getGlobalReferenceDeclaration_Value(), ecorePackage.getEString(), "value", null, 1, 1, GlobalReferenceDeclaration.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(mlDeclarationEClass, MLDeclaration.class, "MLDeclaration", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getMLDeclaration_Code(), ecorePackage.getEString(), "code", null, 1, 1, MLDeclaration.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(typeDeclarationEClass, TypeDeclaration.class, "TypeDeclaration", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getTypeDeclaration_TypeName(), ecorePackage.getEString(), "typeName", null, 1, 1, TypeDeclaration.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getTypeDeclaration_Sort(), theCpntypesPackage.getCPNType(), null, "sort", null, 0, 1, TypeDeclaration.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(useDeclarationEClass, UseDeclaration.class, "UseDeclaration", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getUseDeclaration_FileName(), ecorePackage.getEString(), "fileName", null, 1, 1, UseDeclaration.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(variableDeclarationEClass, VariableDeclaration.class, "VariableDeclaration", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getVariableDeclaration_TypeName(), ecorePackage.getEString(), "typeName", null, 1, 1, VariableDeclaration.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getVariableDeclaration_Variables(), ecorePackage.getEString(), "variables", null, 1, -1, VariableDeclaration.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		// Create resource
		createResource(eNS_URI);
	}

	/**
	 * <!-- begin-user-doc --> Defines literals for the meta objects that represent
	 * <ul>
	 * <li>each class,</li>
	 * <li>each feature of each class,</li>
	 * <li>each enum,</li>
	 * <li>and each data type</li>
	 * </ul>
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public interface Literals {
		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.declaration.impl.VariableDeclarationImpl <em>Variable Declaration</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.declaration.impl.VariableDeclarationImpl
		 * @see org.cpntools.accesscpn.model.declaration.impl.DeclarationPackageImpl#getVariableDeclaration()
		 * @generated
		 */
		public static final EClass VARIABLE_DECLARATION = eINSTANCE.getVariableDeclaration();

		/**
		 * The meta object literal for the '<em><b>Type Name</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute VARIABLE_DECLARATION__TYPE_NAME = eINSTANCE.getVariableDeclaration_TypeName();

		/**
		 * The meta object literal for the '<em><b>Variables</b></em>' attribute list feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EAttribute VARIABLE_DECLARATION__VARIABLES = eINSTANCE.getVariableDeclaration_Variables();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.declaration.impl.DeclarationStructureImpl <em>Structure</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.declaration.impl.DeclarationStructureImpl
		 * @see org.cpntools.accesscpn.model.declaration.impl.DeclarationPackageImpl#getDeclarationStructure()
		 * @generated
		 */
		public static final EClass DECLARATION_STRUCTURE = eINSTANCE.getDeclarationStructure();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.declaration.impl.MLDeclarationImpl <em>ML Declaration</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.declaration.impl.MLDeclarationImpl
		 * @see org.cpntools.accesscpn.model.declaration.impl.DeclarationPackageImpl#getMLDeclaration()
		 * @generated
		 */
		public static final EClass ML_DECLARATION = eINSTANCE.getMLDeclaration();

		/**
		 * The meta object literal for the '<em><b>Code</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute ML_DECLARATION__CODE = eINSTANCE.getMLDeclaration_Code();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.declaration.impl.UseDeclarationImpl <em>Use Declaration</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.declaration.impl.UseDeclarationImpl
		 * @see org.cpntools.accesscpn.model.declaration.impl.DeclarationPackageImpl#getUseDeclaration()
		 * @generated
		 */
		public static final EClass USE_DECLARATION = eINSTANCE.getUseDeclaration();

		/**
		 * The meta object literal for the '<em><b>File Name</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute USE_DECLARATION__FILE_NAME = eINSTANCE.getUseDeclaration_FileName();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.declaration.impl.GlobalReferenceDeclarationImpl <em>Global Reference Declaration</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.declaration.impl.GlobalReferenceDeclarationImpl
		 * @see org.cpntools.accesscpn.model.declaration.impl.DeclarationPackageImpl#getGlobalReferenceDeclaration()
		 * @generated
		 */
		public static final EClass GLOBAL_REFERENCE_DECLARATION = eINSTANCE.getGlobalReferenceDeclaration();

		/**
		 * The meta object literal for the '<em><b>Name</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute GLOBAL_REFERENCE_DECLARATION__NAME = eINSTANCE.getGlobalReferenceDeclaration_Name();

		/**
		 * The meta object literal for the '<em><b>Value</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute GLOBAL_REFERENCE_DECLARATION__VALUE = eINSTANCE.getGlobalReferenceDeclaration_Value();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.declaration.impl.TypeDeclarationImpl <em>Type Declaration</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.declaration.impl.TypeDeclarationImpl
		 * @see org.cpntools.accesscpn.model.declaration.impl.DeclarationPackageImpl#getTypeDeclaration()
		 * @generated
		 */
		public static final EClass TYPE_DECLARATION = eINSTANCE.getTypeDeclaration();

		/**
		 * The meta object literal for the '<em><b>Type Name</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute TYPE_DECLARATION__TYPE_NAME = eINSTANCE.getTypeDeclaration_TypeName();

		/**
		 * The meta object literal for the '<em><b>Sort</b></em>' containment reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference TYPE_DECLARATION__SORT = eINSTANCE.getTypeDeclaration_Sort();

	}

} // DeclarationPackageImpl
