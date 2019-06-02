/**
 * <copyright>
 * </copyright>
 *
 * $Id$
 */
package org.cpntools.accesscpn.model.auxgraphics.impl;

import org.cpntools.accesscpn.model.auxgraphics.AuxGraphics;
import org.cpntools.accesscpn.model.auxgraphics.AuxgraphicsFactory;
import org.cpntools.accesscpn.model.auxgraphics.Text;

import org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl;

import org.cpntools.accesscpn.model.declaration.impl.DeclarationPackageImpl;

import org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl;

import org.cpntools.accesscpn.model.impl.ModelPackageImpl;

import org.cpntools.accesscpn.model.monitors.impl.MonitorsPackageImpl;

import org.eclipse.emf.ecore.EAttribute;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EFactory;
import org.eclipse.emf.ecore.EPackage;

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
 * @see org.cpntools.accesscpn.model.auxgraphics.AuxgraphicsFactory
 * @model kind="package"
 * @generated
 */
public class AuxgraphicsPackageImpl extends EPackageImpl {
	/**
	 * The package name.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public static final String eNAME = "auxgraphics";

	/**
	 * The package namespace URI.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public static final String eNS_URI = "http:///org/cpntools/accesscpn/model/auxgraphics.ecore";

	/**
	 * The package namespace name.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public static final String eNS_PREFIX = "org.cpntools.accesscpn.model.auxgraphics";

	/**
	 * The singleton instance of the package.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public static final AuxgraphicsPackageImpl eINSTANCE = org.cpntools.accesscpn.model.auxgraphics.impl.AuxgraphicsPackageImpl.init();

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.auxgraphics.impl.AuxGraphicsImpl <em>Aux Graphics</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.auxgraphics.impl.AuxGraphicsImpl
	 * @see org.cpntools.accesscpn.model.auxgraphics.impl.AuxgraphicsPackageImpl#getAuxGraphics()
	 * @generated
	 */
	public static final int AUX_GRAPHICS = 0;

	/**
	 * The feature id for the '<em><b>Id</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int AUX_GRAPHICS__ID = ModelPackageImpl.OBJECT__ID;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int AUX_GRAPHICS__TOOLINFO = ModelPackageImpl.OBJECT__TOOLINFO;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int AUX_GRAPHICS__GRAPHICS = ModelPackageImpl.OBJECT__GRAPHICS;

	/**
	 * The feature id for the '<em><b>Label</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int AUX_GRAPHICS__LABEL = ModelPackageImpl.OBJECT__LABEL;

	/**
	 * The feature id for the '<em><b>Name</b></em>' reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int AUX_GRAPHICS__NAME = ModelPackageImpl.OBJECT__NAME;

	/**
	 * The feature id for the '<em><b>Page</b></em>' container reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int AUX_GRAPHICS__PAGE = ModelPackageImpl.OBJECT__PAGE;

	/**
	 * The number of structural features of the '<em>Aux Graphics</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int AUX_GRAPHICS_FEATURE_COUNT = ModelPackageImpl.OBJECT_FEATURE_COUNT + 0;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.auxgraphics.impl.TextImpl <em>Text</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.auxgraphics.impl.TextImpl
	 * @see org.cpntools.accesscpn.model.auxgraphics.impl.AuxgraphicsPackageImpl#getText()
	 * @generated
	 */
	public static final int TEXT = 1;

	/**
	 * The feature id for the '<em><b>Id</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TEXT__ID = AUX_GRAPHICS__ID;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TEXT__TOOLINFO = AUX_GRAPHICS__TOOLINFO;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TEXT__GRAPHICS = AUX_GRAPHICS__GRAPHICS;

	/**
	 * The feature id for the '<em><b>Label</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TEXT__LABEL = AUX_GRAPHICS__LABEL;

	/**
	 * The feature id for the '<em><b>Name</b></em>' reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TEXT__NAME = AUX_GRAPHICS__NAME;

	/**
	 * The feature id for the '<em><b>Page</b></em>' container reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TEXT__PAGE = AUX_GRAPHICS__PAGE;

	/**
	 * The feature id for the '<em><b>Text</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TEXT__TEXT = AUX_GRAPHICS_FEATURE_COUNT + 0;

	/**
	 * The number of structural features of the '<em>Text</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TEXT_FEATURE_COUNT = AUX_GRAPHICS_FEATURE_COUNT + 1;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	private EClass auxGraphicsEClass = null;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	private EClass textEClass = null;

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
	 * @see org.cpntools.accesscpn.model.auxgraphics.impl.AuxgraphicsPackageImpl#eNS_URI
	 * @see #init()
	 * @generated
	 */
	private AuxgraphicsPackageImpl() {
		super(eNS_URI, ((EFactory)AuxgraphicsFactory.INSTANCE));
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
	 * <p>This method is used to initialize {@link AuxgraphicsPackageImpl#eINSTANCE} when that field is accessed.
	 * Clients should not invoke it directly. Instead, they should simply access that field to obtain the package.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #eNS_URI
	 * @see #createPackageContents()
	 * @see #initializePackageContents()
	 * @generated
	 */
	public static AuxgraphicsPackageImpl init() {
		if (isInited) return (AuxgraphicsPackageImpl)EPackage.Registry.INSTANCE.getEPackage(AuxgraphicsPackageImpl.eNS_URI);

		// Obtain or create and register package
		AuxgraphicsPackageImpl theAuxgraphicsPackage = (AuxgraphicsPackageImpl)(EPackage.Registry.INSTANCE.get(eNS_URI) instanceof AuxgraphicsPackageImpl ? EPackage.Registry.INSTANCE.get(eNS_URI) : new AuxgraphicsPackageImpl());

		isInited = true;

		// Obtain or create and register interdependencies
		ModelPackageImpl theModelPackage = (ModelPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(ModelPackageImpl.eNS_URI) instanceof ModelPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(ModelPackageImpl.eNS_URI) : ModelPackageImpl.eINSTANCE);
		CpntypesPackageImpl theCpntypesPackage = (CpntypesPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(CpntypesPackageImpl.eNS_URI) instanceof CpntypesPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(CpntypesPackageImpl.eNS_URI) : CpntypesPackageImpl.eINSTANCE);
		DeclarationPackageImpl theDeclarationPackage = (DeclarationPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(DeclarationPackageImpl.eNS_URI) instanceof DeclarationPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(DeclarationPackageImpl.eNS_URI) : DeclarationPackageImpl.eINSTANCE);
		GraphicsPackageImpl theGraphicsPackage = (GraphicsPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(GraphicsPackageImpl.eNS_URI) instanceof GraphicsPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(GraphicsPackageImpl.eNS_URI) : GraphicsPackageImpl.eINSTANCE);
		MonitorsPackageImpl theMonitorsPackage = (MonitorsPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(MonitorsPackageImpl.eNS_URI) instanceof MonitorsPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(MonitorsPackageImpl.eNS_URI) : MonitorsPackageImpl.eINSTANCE);

		// Create package meta-data objects
		theAuxgraphicsPackage.createPackageContents();
		theModelPackage.createPackageContents();
		theCpntypesPackage.createPackageContents();
		theDeclarationPackage.createPackageContents();
		theGraphicsPackage.createPackageContents();
		theMonitorsPackage.createPackageContents();

		// Initialize created meta-data
		theAuxgraphicsPackage.initializePackageContents();
		theModelPackage.initializePackageContents();
		theCpntypesPackage.initializePackageContents();
		theDeclarationPackage.initializePackageContents();
		theGraphicsPackage.initializePackageContents();
		theMonitorsPackage.initializePackageContents();

		// Mark meta-data to indicate it can't be changed
		theAuxgraphicsPackage.freeze();

  
		// Update the registry and return the package
		EPackage.Registry.INSTANCE.put(AuxgraphicsPackageImpl.eNS_URI, theAuxgraphicsPackage);
		return theAuxgraphicsPackage;
	}


	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.auxgraphics.AuxGraphics <em>Aux Graphics</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Aux Graphics</em>'.
	 * @see org.cpntools.accesscpn.model.auxgraphics.AuxGraphics
	 * @generated
	 */
	public EClass getAuxGraphics() {
		return auxGraphicsEClass;
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.auxgraphics.Text <em>Text</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>Text</em>'.
	 * @see org.cpntools.accesscpn.model.auxgraphics.Text
	 * @generated
	 */
	public EClass getText() {
		return textEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.auxgraphics.Text#getText <em>Text</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Text</em>'.
	 * @see org.cpntools.accesscpn.model.auxgraphics.Text#getText()
	 * @see #getText()
	 * @generated
	 */
	public EAttribute getText_Text() {
		return (EAttribute)textEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the factory that creates the instances of the model.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the factory that creates the instances of the model.
	 * @generated
	 */
	public AuxgraphicsFactory getAuxgraphicsFactory() {
		return (AuxgraphicsFactory)getEFactoryInstance();
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
		auxGraphicsEClass = createEClass(AUX_GRAPHICS);

		textEClass = createEClass(TEXT);
		createEAttribute(textEClass, TEXT__TEXT);
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

		// Set bounds for type parameters

		// Add supertypes to classes
		auxGraphicsEClass.getESuperTypes().add(theModelPackage.getObject());
		textEClass.getESuperTypes().add(this.getAuxGraphics());

		// Initialize classes and features; add operations and parameters
		initEClass(auxGraphicsEClass, AuxGraphics.class, "AuxGraphics", IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);

		initEClass(textEClass, Text.class, "Text", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getText_Text(), ecorePackage.getEString(), "text", null, 0, 1, Text.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

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
	public interface Literals {
		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.auxgraphics.impl.AuxGraphicsImpl <em>Aux Graphics</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.auxgraphics.impl.AuxGraphicsImpl
		 * @see org.cpntools.accesscpn.model.auxgraphics.impl.AuxgraphicsPackageImpl#getAuxGraphics()
		 * @generated
		 */
		public static final EClass AUX_GRAPHICS = eINSTANCE.getAuxGraphics();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.auxgraphics.impl.TextImpl <em>Text</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.auxgraphics.impl.TextImpl
		 * @see org.cpntools.accesscpn.model.auxgraphics.impl.AuxgraphicsPackageImpl#getText()
		 * @generated
		 */
		public static final EClass TEXT = eINSTANCE.getText();

		/**
		 * The meta object literal for the '<em><b>Text</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EAttribute TEXT__TEXT = eINSTANCE.getText_Text();

	}

} //AuxgraphicsPackageImpl
