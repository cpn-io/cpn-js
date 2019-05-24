/**
 * <copyright> </copyright> $Id$
 */
package org.cpntools.accesscpn.model.monitors.impl;

import java.lang.Object;
import org.cpntools.accesscpn.model.auxgraphics.impl.AuxgraphicsPackageImpl;
import org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl;
import org.cpntools.accesscpn.model.declaration.impl.DeclarationPackageImpl;
import org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl;
import org.cpntools.accesscpn.model.impl.ModelPackageImpl;
import org.cpntools.accesscpn.model.monitors.Monitor;
import org.cpntools.accesscpn.model.monitors.MonitorType;
import org.cpntools.accesscpn.model.monitors.MonitorsFactory;
import org.eclipse.emf.ecore.EAttribute;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EEnum;
import org.eclipse.emf.ecore.EFactory;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.EReference;
import org.eclipse.emf.ecore.impl.EPackageImpl;

/**
 * <!-- begin-user-doc --> The <b>Package</b> for the model. It contains accessors for the meta objects to represent
 * <ul>
 * <li>each class,</li>
 * <li>each feature of each class,</li>
 * <li>each enum,</li>
 * <li>and each data type</li>
 * </ul>
 * <!-- end-user-doc -->
 * @see org.cpntools.accesscpn.model.monitors.MonitorsFactory
 * @model kind="package"
 * @generated
 */
public class MonitorsPackageImpl extends EPackageImpl {
	/**
	 * The package name.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public static final String eNAME = "monitors";

	/**
	 * The package namespace URI.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public static final String eNS_URI = "http:///org/cpntools/accesscpn/model/monitors.ecore";

	/**
	 * The package namespace name.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public static final String eNS_PREFIX = "org.cpntools.accesscpn.model.monitors";

	/**
	 * The singleton instance of the package.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public static final MonitorsPackageImpl eINSTANCE = org.cpntools.accesscpn.model.monitors.impl.MonitorsPackageImpl.init();

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.monitors.impl.MonitorImpl <em>Monitor</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.monitors.impl.MonitorImpl
	 * @see org.cpntools.accesscpn.model.monitors.impl.MonitorsPackageImpl#getMonitor()
	 * @generated
	 */
	public static final int MONITOR = 0;

	/**
	 * The feature id for the '<em><b>Id</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int MONITOR__ID = ModelPackageImpl.HAS_ID__ID;

	/**
	 * The feature id for the '<em><b>Name</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int MONITOR__NAME = ModelPackageImpl.HAS_ID_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Petri Net</b></em>' container reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int MONITOR__PETRI_NET = ModelPackageImpl.HAS_ID_FEATURE_COUNT + 1;

	/**
	 * The feature id for the '<em><b>Disabled</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int MONITOR__DISABLED = ModelPackageImpl.HAS_ID_FEATURE_COUNT + 2;

	/**
	 * The feature id for the '<em><b>Empty</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int MONITOR__EMPTY = ModelPackageImpl.HAS_ID_FEATURE_COUNT + 3;

	/**
	 * The feature id for the '<em><b>Enabled</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int MONITOR__ENABLED = ModelPackageImpl.HAS_ID_FEATURE_COUNT + 4;

	/**
	 * The feature id for the '<em><b>Extension</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int MONITOR__EXTENSION = ModelPackageImpl.HAS_ID_FEATURE_COUNT + 5;

	/**
	 * The feature id for the '<em><b>Kind</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int MONITOR__KIND = ModelPackageImpl.HAS_ID_FEATURE_COUNT + 6;

	/**
	 * The feature id for the '<em><b>Init</b></em>' containment reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int MONITOR__INIT = ModelPackageImpl.HAS_ID_FEATURE_COUNT + 7;

	/**
	 * The feature id for the '<em><b>Stop</b></em>' containment reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int MONITOR__STOP = ModelPackageImpl.HAS_ID_FEATURE_COUNT + 8;

	/**
	 * The feature id for the '<em><b>Predicate</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int MONITOR__PREDICATE = ModelPackageImpl.HAS_ID_FEATURE_COUNT + 9;

	/**
	 * The feature id for the '<em><b>Observer</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int MONITOR__OBSERVER = ModelPackageImpl.HAS_ID_FEATURE_COUNT + 10;

	/**
	 * The feature id for the '<em><b>Action</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int MONITOR__ACTION = ModelPackageImpl.HAS_ID_FEATURE_COUNT + 11;

	/**
	 * The feature id for the '<em><b>Nodes</b></em>' reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int MONITOR__NODES = ModelPackageImpl.HAS_ID_FEATURE_COUNT + 12;

	/**
	 * The feature id for the '<em><b>Timed</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int MONITOR__TIMED = ModelPackageImpl.HAS_ID_FEATURE_COUNT + 13;

	/**
	 * The feature id for the '<em><b>Logging</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int MONITOR__LOGGING = ModelPackageImpl.HAS_ID_FEATURE_COUNT + 14;

	/**
	 * The number of structural features of the '<em>Monitor</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int MONITOR_FEATURE_COUNT = ModelPackageImpl.HAS_ID_FEATURE_COUNT + 15;

	/**
	 * The meta object id for the '{@link java.lang.Object <em>Object</em>}' class.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see java.lang.Object
	 * @see org.cpntools.accesscpn.model.monitors.impl.MonitorsPackageImpl#getObject()
	 * @generated
	 */
	public static final int OBJECT = 1;

	/**
	 * The number of structural features of the '<em>Object</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int OBJECT_FEATURE_COUNT = 0;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.monitors.MonitorType <em>Monitor Type</em>}' enum.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.monitors.MonitorType
	 * @see org.cpntools.accesscpn.model.monitors.impl.MonitorsPackageImpl#getMonitorType()
	 * @generated
	 */
	public static final int MONITOR_TYPE = 2;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass monitorEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass objectEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EEnum monitorTypeEEnum = null;

	/**
	 * Creates an instance of the model <b>Package</b>, registered with {@link org.eclipse.emf.ecore.EPackage.Registry
	 * EPackage.Registry} by the package package URI value.
	 * <p>
	 * Note: the correct way to create the package is via the static factory method {@link #init init()}, which also
	 * performs initialization of the package, or returns the registered package, if one already exists. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.eclipse.emf.ecore.EPackage.Registry
	 * @see org.cpntools.accesscpn.model.monitors.impl.MonitorsPackageImpl#eNS_URI
	 * @see #init()
	 * @generated
	 */
	private MonitorsPackageImpl() {
		super(eNS_URI, ((EFactory)MonitorsFactory.INSTANCE));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private static boolean isInited = false;

	/**
	 * Creates, registers, and initializes the <b>Package</b> for this model, and for any others upon which it depends.
	 * <p>
	 * This method is used to initialize {@link MonitorsPackageImpl#eINSTANCE} when that field is accessed. Clients
	 * should not invoke it directly. Instead, they should simply access that field to obtain the package. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see #eNS_URI
	 * @see #createPackageContents()
	 * @see #initializePackageContents()
	 * @generated
	 */
	public static MonitorsPackageImpl init() {
		if (isInited) return (MonitorsPackageImpl)EPackage.Registry.INSTANCE.getEPackage(MonitorsPackageImpl.eNS_URI);

		// Obtain or create and register package
		MonitorsPackageImpl theMonitorsPackage = (MonitorsPackageImpl)(EPackage.Registry.INSTANCE.get(eNS_URI) instanceof MonitorsPackageImpl ? EPackage.Registry.INSTANCE.get(eNS_URI) : new MonitorsPackageImpl());

		isInited = true;

		// Obtain or create and register interdependencies
		ModelPackageImpl theModelPackage = (ModelPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(ModelPackageImpl.eNS_URI) instanceof ModelPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(ModelPackageImpl.eNS_URI) : ModelPackageImpl.eINSTANCE);
		AuxgraphicsPackageImpl theAuxgraphicsPackage = (AuxgraphicsPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(AuxgraphicsPackageImpl.eNS_URI) instanceof AuxgraphicsPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(AuxgraphicsPackageImpl.eNS_URI) : AuxgraphicsPackageImpl.eINSTANCE);
		CpntypesPackageImpl theCpntypesPackage = (CpntypesPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(CpntypesPackageImpl.eNS_URI) instanceof CpntypesPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(CpntypesPackageImpl.eNS_URI) : CpntypesPackageImpl.eINSTANCE);
		DeclarationPackageImpl theDeclarationPackage = (DeclarationPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(DeclarationPackageImpl.eNS_URI) instanceof DeclarationPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(DeclarationPackageImpl.eNS_URI) : DeclarationPackageImpl.eINSTANCE);
		GraphicsPackageImpl theGraphicsPackage = (GraphicsPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(GraphicsPackageImpl.eNS_URI) instanceof GraphicsPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(GraphicsPackageImpl.eNS_URI) : GraphicsPackageImpl.eINSTANCE);

		// Create package meta-data objects
		theMonitorsPackage.createPackageContents();
		theModelPackage.createPackageContents();
		theAuxgraphicsPackage.createPackageContents();
		theCpntypesPackage.createPackageContents();
		theDeclarationPackage.createPackageContents();
		theGraphicsPackage.createPackageContents();

		// Initialize created meta-data
		theMonitorsPackage.initializePackageContents();
		theModelPackage.initializePackageContents();
		theAuxgraphicsPackage.initializePackageContents();
		theCpntypesPackage.initializePackageContents();
		theDeclarationPackage.initializePackageContents();
		theGraphicsPackage.initializePackageContents();

		// Mark meta-data to indicate it can't be changed
		theMonitorsPackage.freeze();

  
		// Update the registry and return the package
		EPackage.Registry.INSTANCE.put(MonitorsPackageImpl.eNS_URI, theMonitorsPackage);
		return theMonitorsPackage;
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.monitors.Monitor <em>Monitor</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>Monitor</em>'.
	 * @see org.cpntools.accesscpn.model.monitors.Monitor
	 * @generated
	 */
	public EClass getMonitor() {
		return monitorEClass;
	}

	/**
	 * Returns the meta object for the container reference '{@link org.cpntools.accesscpn.model.monitors.Monitor#getPetriNet <em>Petri Net</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the container reference '<em>Petri Net</em>'.
	 * @see org.cpntools.accesscpn.model.monitors.Monitor#getPetriNet()
	 * @see #getMonitor()
	 * @generated
	 */
	public EReference getMonitor_PetriNet() {
		return (EReference)monitorEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.monitors.Monitor#isDisabled <em>Disabled</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Disabled</em>'.
	 * @see org.cpntools.accesscpn.model.monitors.Monitor#isDisabled()
	 * @see #getMonitor()
	 * @generated
	 */
	public EAttribute getMonitor_Disabled() {
		return (EAttribute)monitorEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.monitors.Monitor#isEmpty <em>Empty</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Empty</em>'.
	 * @see org.cpntools.accesscpn.model.monitors.Monitor#isEmpty()
	 * @see #getMonitor()
	 * @generated
	 */
	public EAttribute getMonitor_Empty() {
		return (EAttribute)monitorEClass.getEStructuralFeatures().get(2);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.monitors.Monitor#isEnabled <em>Enabled</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Enabled</em>'.
	 * @see org.cpntools.accesscpn.model.monitors.Monitor#isEnabled()
	 * @see #getMonitor()
	 * @generated
	 */
	public EAttribute getMonitor_Enabled() {
		return (EAttribute)monitorEClass.getEStructuralFeatures().get(3);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.monitors.Monitor#getExtension <em>Extension</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Extension</em>'.
	 * @see org.cpntools.accesscpn.model.monitors.Monitor#getExtension()
	 * @see #getMonitor()
	 * @generated
	 */
	public EAttribute getMonitor_Extension() {
		return (EAttribute)monitorEClass.getEStructuralFeatures().get(4);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.monitors.Monitor#getKind <em>Kind</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Kind</em>'.
	 * @see org.cpntools.accesscpn.model.monitors.Monitor#getKind()
	 * @see #getMonitor()
	 * @generated
	 */
	public EAttribute getMonitor_Kind() {
		return (EAttribute)monitorEClass.getEStructuralFeatures().get(5);
	}

	/**
	 * Returns the meta object for the containment reference '{@link org.cpntools.accesscpn.model.monitors.Monitor#getInit <em>Init</em>}'.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @return the meta object for the containment reference '<em>Init</em>'.
	 * @see org.cpntools.accesscpn.model.monitors.Monitor#getInit()
	 * @see #getMonitor()
	 * @generated
	 */
	public EReference getMonitor_Init() {
		return (EReference)monitorEClass.getEStructuralFeatures().get(6);
	}

	/**
	 * Returns the meta object for the containment reference '{@link org.cpntools.accesscpn.model.monitors.Monitor#getStop <em>Stop</em>}'.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @return the meta object for the containment reference '<em>Stop</em>'.
	 * @see org.cpntools.accesscpn.model.monitors.Monitor#getStop()
	 * @see #getMonitor()
	 * @generated
	 */
	public EReference getMonitor_Stop() {
		return (EReference)monitorEClass.getEStructuralFeatures().get(7);
	}

	/**
	 * Returns the meta object for the containment reference '{@link org.cpntools.accesscpn.model.monitors.Monitor#getPredicate <em>Predicate</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference '<em>Predicate</em>'.
	 * @see org.cpntools.accesscpn.model.monitors.Monitor#getPredicate()
	 * @see #getMonitor()
	 * @generated
	 */
	public EReference getMonitor_Predicate() {
		return (EReference)monitorEClass.getEStructuralFeatures().get(8);
	}

	/**
	 * Returns the meta object for the containment reference '{@link org.cpntools.accesscpn.model.monitors.Monitor#getObserver <em>Observer</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference '<em>Observer</em>'.
	 * @see org.cpntools.accesscpn.model.monitors.Monitor#getObserver()
	 * @see #getMonitor()
	 * @generated
	 */
	public EReference getMonitor_Observer() {
		return (EReference)monitorEClass.getEStructuralFeatures().get(9);
	}

	/**
	 * Returns the meta object for the reference '{@link org.cpntools.accesscpn.model.monitors.Monitor#getAction <em>Action</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the reference '<em>Action</em>'.
	 * @see org.cpntools.accesscpn.model.monitors.Monitor#getAction()
	 * @see #getMonitor()
	 * @generated
	 */
	public EReference getMonitor_Action() {
		return (EReference)monitorEClass.getEStructuralFeatures().get(10);
	}

	/**
	 * Returns the meta object for the reference list '{@link org.cpntools.accesscpn.model.monitors.Monitor#getNodes <em>Nodes</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the reference list '<em>Nodes</em>'.
	 * @see org.cpntools.accesscpn.model.monitors.Monitor#getNodes()
	 * @see #getMonitor()
	 * @generated
	 */
	public EReference getMonitor_Nodes() {
		return (EReference)monitorEClass.getEStructuralFeatures().get(11);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.monitors.Monitor#isTimed <em>Timed</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Timed</em>'.
	 * @see org.cpntools.accesscpn.model.monitors.Monitor#isTimed()
	 * @see #getMonitor()
	 * @generated
	 */
	public EAttribute getMonitor_Timed() {
		return (EAttribute)monitorEClass.getEStructuralFeatures().get(12);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.monitors.Monitor#isLogging <em>Logging</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Logging</em>'.
	 * @see org.cpntools.accesscpn.model.monitors.Monitor#isLogging()
	 * @see #getMonitor()
	 * @generated
	 */
	public EAttribute getMonitor_Logging() {
		return (EAttribute)monitorEClass.getEStructuralFeatures().get(13);
	}

	/**
	 * Returns the meta object for class '{@link java.lang.Object <em>Object</em>}'.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @return the meta object for class '<em>Object</em>'.
	 * @see java.lang.Object
	 * @model instanceClass="java.lang.Object"
	 * @generated
	 */
	public EClass getObject() {
		return objectEClass;
	}

	/**
	 * Returns the meta object for enum '{@link org.cpntools.accesscpn.model.monitors.MonitorType <em>Monitor Type</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for enum '<em>Monitor Type</em>'.
	 * @see org.cpntools.accesscpn.model.monitors.MonitorType
	 * @generated
	 */
	public EEnum getMonitorType() {
		return monitorTypeEEnum;
	}

	/**
	 * Returns the factory that creates the instances of the model.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the factory that creates the instances of the model.
	 * @generated
	 */
	public MonitorsFactory getMonitorsFactory() {
		return (MonitorsFactory)getEFactoryInstance();
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
		monitorEClass = createEClass(MONITOR);
		createEReference(monitorEClass, MONITOR__PETRI_NET);
		createEAttribute(monitorEClass, MONITOR__DISABLED);
		createEAttribute(monitorEClass, MONITOR__EMPTY);
		createEAttribute(monitorEClass, MONITOR__ENABLED);
		createEAttribute(monitorEClass, MONITOR__EXTENSION);
		createEAttribute(monitorEClass, MONITOR__KIND);
		createEReference(monitorEClass, MONITOR__INIT);
		createEReference(monitorEClass, MONITOR__STOP);
		createEReference(monitorEClass, MONITOR__PREDICATE);
		createEReference(monitorEClass, MONITOR__OBSERVER);
		createEReference(monitorEClass, MONITOR__ACTION);
		createEReference(monitorEClass, MONITOR__NODES);
		createEAttribute(monitorEClass, MONITOR__TIMED);
		createEAttribute(monitorEClass, MONITOR__LOGGING);

		objectEClass = createEClass(OBJECT);

		// Create enums
		monitorTypeEEnum = createEEnum(MONITOR_TYPE);
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
		ModelPackageImpl theModelPackage = (ModelPackageImpl)EPackage.Registry.INSTANCE.getEPackage(ModelPackageImpl.eNS_URI);
		DeclarationPackageImpl theDeclarationPackage = (DeclarationPackageImpl)EPackage.Registry.INSTANCE.getEPackage(DeclarationPackageImpl.eNS_URI);

		// Create type parameters

		// Set bounds for type parameters

		// Add supertypes to classes
		monitorEClass.getESuperTypes().add(theModelPackage.getHasId());
		monitorEClass.getESuperTypes().add(theModelPackage.getHasName());

		// Initialize classes and features; add operations and parameters
		initEClass(monitorEClass, Monitor.class, "Monitor", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getMonitor_PetriNet(), theModelPackage.getPetriNet(), theModelPackage.getPetriNet_Monitors(), "petriNet", null, 0, 1, Monitor.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getMonitor_Disabled(), ecorePackage.getEBoolean(), "disabled", null, 1, 1, Monitor.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getMonitor_Empty(), ecorePackage.getEBoolean(), "empty", null, 0, 1, Monitor.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getMonitor_Enabled(), ecorePackage.getEBoolean(), "enabled", null, 0, 1, Monitor.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getMonitor_Extension(), ecorePackage.getEString(), "extension", null, 0, 1, Monitor.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getMonitor_Kind(), this.getMonitorType(), "kind", null, 1, 1, Monitor.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getMonitor_Init(), theDeclarationPackage.getMLDeclaration(), null, "init", null, 0, 1, Monitor.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getMonitor_Stop(), theDeclarationPackage.getMLDeclaration(), null, "stop", null, 0, 1, Monitor.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getMonitor_Predicate(), theDeclarationPackage.getMLDeclaration(), null, "predicate", null, 0, 1, Monitor.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getMonitor_Observer(), theDeclarationPackage.getMLDeclaration(), null, "observer", null, 0, 1, Monitor.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getMonitor_Action(), theDeclarationPackage.getMLDeclaration(), null, "action", null, 0, 1, Monitor.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getMonitor_Nodes(), this.getObject(), null, "nodes", null, 0, -1, Monitor.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getMonitor_Timed(), ecorePackage.getEBoolean(), "timed", null, 0, 1, Monitor.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getMonitor_Logging(), ecorePackage.getEBoolean(), "logging", null, 0, 1, Monitor.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(objectEClass, Object.class, "Object", IS_ABSTRACT, IS_INTERFACE, !IS_GENERATED_INSTANCE_CLASS);

		// Initialize enums and add enum literals
		initEEnum(monitorTypeEEnum, MonitorType.class, "MonitorType");
		addEEnumLiteral(monitorTypeEEnum, MonitorType.MARKING_SIZE);
		addEEnumLiteral(monitorTypeEEnum, MonitorType.BREAKPOINT);
		addEEnumLiteral(monitorTypeEEnum, MonitorType.USER_DEFINED);
		addEEnumLiteral(monitorTypeEEnum, MonitorType.DATA_COLLECTION);
		addEEnumLiteral(monitorTypeEEnum, MonitorType.WRITE_IN_FILE);
		addEEnumLiteral(monitorTypeEEnum, MonitorType.LIST_LENGTH);
		addEEnumLiteral(monitorTypeEEnum, MonitorType.COUNT_TRANSITION);
		addEEnumLiteral(monitorTypeEEnum, MonitorType.PLACE_CONTENT);
		addEEnumLiteral(monitorTypeEEnum, MonitorType.TRANSTION_ENABLED);

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
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.monitors.impl.MonitorImpl <em>Monitor</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.monitors.impl.MonitorImpl
		 * @see org.cpntools.accesscpn.model.monitors.impl.MonitorsPackageImpl#getMonitor()
		 * @generated
		 */
		public static final EClass MONITOR = eINSTANCE.getMonitor();

		/**
		 * The meta object literal for the '<em><b>Petri Net</b></em>' container reference feature.
		 * <!-- begin-user-doc
		 * --> <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference MONITOR__PETRI_NET = eINSTANCE.getMonitor_PetriNet();

		/**
		 * The meta object literal for the '<em><b>Disabled</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute MONITOR__DISABLED = eINSTANCE.getMonitor_Disabled();

		/**
		 * The meta object literal for the '<em><b>Empty</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute MONITOR__EMPTY = eINSTANCE.getMonitor_Empty();

		/**
		 * The meta object literal for the '<em><b>Enabled</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute MONITOR__ENABLED = eINSTANCE.getMonitor_Enabled();

		/**
		 * The meta object literal for the '<em><b>Extension</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute MONITOR__EXTENSION = eINSTANCE.getMonitor_Extension();

		/**
		 * The meta object literal for the '<em><b>Kind</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute MONITOR__KIND = eINSTANCE.getMonitor_Kind();

		/**
		 * The meta object literal for the '<em><b>Init</b></em>' containment reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference MONITOR__INIT = eINSTANCE.getMonitor_Init();

		/**
		 * The meta object literal for the '<em><b>Stop</b></em>' containment reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference MONITOR__STOP = eINSTANCE.getMonitor_Stop();

		/**
		 * The meta object literal for the '<em><b>Predicate</b></em>' containment reference feature. <!--
		 * begin-user-doc --> <!-- end-user-doc -->
		 * 
		 * @generated
		 */
		public static final EReference MONITOR__PREDICATE = eINSTANCE.getMonitor_Predicate();

		/**
		 * The meta object literal for the '<em><b>Observer</b></em>' containment reference feature.
		 * <!-- begin-user-doc
		 * --> <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference MONITOR__OBSERVER = eINSTANCE.getMonitor_Observer();

		/**
		 * The meta object literal for the '<em><b>Action</b></em>' reference feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EReference MONITOR__ACTION = eINSTANCE.getMonitor_Action();

		/**
		 * The meta object literal for the '<em><b>Nodes</b></em>' reference list feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EReference MONITOR__NODES = eINSTANCE.getMonitor_Nodes();

		/**
		 * The meta object literal for the '<em><b>Timed</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute MONITOR__TIMED = eINSTANCE.getMonitor_Timed();

		/**
		 * The meta object literal for the '<em><b>Logging</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute MONITOR__LOGGING = eINSTANCE.getMonitor_Logging();

		/**
		 * The meta object literal for the '{@link java.lang.Object <em>Object</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see java.lang.Object
		 * @see org.cpntools.accesscpn.model.monitors.impl.MonitorsPackageImpl#getObject()
		 * @generated
		 */
		public static final EClass OBJECT = eINSTANCE.getObject();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.monitors.MonitorType <em>Monitor Type</em>}' enum.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.monitors.MonitorType
		 * @see org.cpntools.accesscpn.model.monitors.impl.MonitorsPackageImpl#getMonitorType()
		 * @generated
		 */
		public static final EEnum MONITOR_TYPE = eINSTANCE.getMonitorType();

	}

} // MonitorsPackageImpl
