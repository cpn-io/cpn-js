/**
 * <copyright> </copyright> $Id$
 */
package org.cpntools.accesscpn.model.impl;

import org.cpntools.accesscpn.model.Annotation;
import org.cpntools.accesscpn.model.Arc;
import org.cpntools.accesscpn.model.Attribute;
import org.cpntools.accesscpn.model.CPNToolsTransitionAddin;
import org.cpntools.accesscpn.model.Code;
import org.cpntools.accesscpn.model.Condition;
import org.cpntools.accesscpn.model.FusionGroup;
import org.cpntools.accesscpn.model.HLAnnotation;
import org.cpntools.accesscpn.model.HLAnnotationAddin;
import org.cpntools.accesscpn.model.HLArcAddin;
import org.cpntools.accesscpn.model.HLArcType;
import org.cpntools.accesscpn.model.HLDeclaration;
import org.cpntools.accesscpn.model.HLMarking;
import org.cpntools.accesscpn.model.HLPlaceAddin;
import org.cpntools.accesscpn.model.HLTransitionAddin;
import org.cpntools.accesscpn.model.HasId;
import org.cpntools.accesscpn.model.HasLabel;
import org.cpntools.accesscpn.model.HasName;
import org.cpntools.accesscpn.model.HasToolInfo;
import org.cpntools.accesscpn.model.Instance;
import org.cpntools.accesscpn.model.Label;
import org.cpntools.accesscpn.model.ModelFactory;
import org.cpntools.accesscpn.model.Name;
import org.cpntools.accesscpn.model.Node;
import org.cpntools.accesscpn.model.Page;
import org.cpntools.accesscpn.model.ParameterAssignment;
import org.cpntools.accesscpn.model.PetriNet;
import org.cpntools.accesscpn.model.Place;
import org.cpntools.accesscpn.model.PlaceNode;
import org.cpntools.accesscpn.model.Priority;
import org.cpntools.accesscpn.model.RefPlace;
import org.cpntools.accesscpn.model.RefTrans;
import org.cpntools.accesscpn.model.Sort;
import org.cpntools.accesscpn.model.Time;
import org.cpntools.accesscpn.model.TimeType;
import org.cpntools.accesscpn.model.ToolInfo;
import org.cpntools.accesscpn.model.Transition;
import org.cpntools.accesscpn.model.TransitionNode;
import org.cpntools.accesscpn.model.auxgraphics.impl.AuxgraphicsPackageImpl;
import org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl;
import org.cpntools.accesscpn.model.declaration.impl.DeclarationPackageImpl;
import org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl;
import org.cpntools.accesscpn.model.monitors.impl.MonitorsPackageImpl;
import org.eclipse.emf.ecore.EAttribute;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EEnum;
import org.eclipse.emf.ecore.EFactory;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.EReference;
import org.eclipse.emf.ecore.impl.EPackageImpl;

/**
 * <!-- begin-user-doc --> An implementation of the model <b>Package</b>. <!-- end-user-doc -->
 * @see org.cpntools.accesscpn.model.ModelFactory
 * @model kind="package"
 * @generated
 */
public class ModelPackageImpl extends EPackageImpl {
	/**
	 * The package name.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public static final String eNAME = "model";

	/**
	 * The package namespace URI.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public static final String eNS_URI = "http:///org/cpntools/accesscpn/model.ecore";

	/**
	 * The package namespace name.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public static final String eNS_PREFIX = "org.cpntools.accesscpn.model";

	/**
	 * The singleton instance of the package.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public static final ModelPackageImpl eINSTANCE = org.cpntools.accesscpn.model.impl.ModelPackageImpl.init();

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.HasToolInfo <em>Has Tool Info</em>}' class. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.cpntools.accesscpn.model.HasToolInfo
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHasToolInfo()
	 * @generated
	 */
	public static final int HAS_TOOL_INFO = 17;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HAS_TOOL_INFO__TOOLINFO = 0;

	/**
	 * The number of structural features of the '<em>Has Tool Info</em>' class.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HAS_TOOL_INFO_FEATURE_COUNT = 1;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.LabelImpl <em>Label</em>}' class. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.cpntools.accesscpn.model.impl.LabelImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getLabel()
	 * @generated
	 */
	public static final int LABEL = 19;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int LABEL__TOOLINFO = HAS_TOOL_INFO__TOOLINFO;

	/**
	 * The feature id for the '<em><b>Parent</b></em>' container reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int LABEL__PARENT = HAS_TOOL_INFO_FEATURE_COUNT + 0;

	/**
	 * The number of structural features of the '<em>Label</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int LABEL_FEATURE_COUNT = HAS_TOOL_INFO_FEATURE_COUNT + 1;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.AnnotationImpl <em>Annotation</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.impl.AnnotationImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getAnnotation()
	 * @generated
	 */
	public static final int ANNOTATION = 0;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int ANNOTATION__TOOLINFO = LABEL__TOOLINFO;

	/**
	 * The feature id for the '<em><b>Parent</b></em>' container reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int ANNOTATION__PARENT = LABEL__PARENT;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int ANNOTATION__GRAPHICS = LABEL_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Text</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int ANNOTATION__TEXT = LABEL_FEATURE_COUNT + 1;

	/**
	 * The number of structural features of the '<em>Annotation</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int ANNOTATION_FEATURE_COUNT = LABEL_FEATURE_COUNT + 2;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.HasIdImpl <em>Has Id</em>}' class. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.cpntools.accesscpn.model.impl.HasIdImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHasId()
	 * @generated
	 */
	public static final int HAS_ID = 14;

	/**
	 * The feature id for the '<em><b>Id</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HAS_ID__ID = 0;

	/**
	 * The number of structural features of the '<em>Has Id</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HAS_ID_FEATURE_COUNT = 1;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.ArcImpl <em>Arc</em>}' class. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.cpntools.accesscpn.model.impl.ArcImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getArc()
	 * @generated
	 */
	public static final int ARC = 1;

	/**
	 * The feature id for the '<em><b>Id</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int ARC__ID = HAS_ID__ID;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int ARC__GRAPHICS = HAS_ID_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Hlinscription</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int ARC__HLINSCRIPTION = HAS_ID_FEATURE_COUNT + 1;

	/**
	 * The feature id for the '<em><b>Kind</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int ARC__KIND = HAS_ID_FEATURE_COUNT + 2;

	/**
	 * The feature id for the '<em><b>Source</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int ARC__SOURCE = HAS_ID_FEATURE_COUNT + 3;

	/**
	 * The feature id for the '<em><b>Target</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int ARC__TARGET = HAS_ID_FEATURE_COUNT + 4;

	/**
	 * The feature id for the '<em><b>Page</b></em>' container reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int ARC__PAGE = HAS_ID_FEATURE_COUNT + 5;

	/**
	 * The number of structural features of the '<em>Arc</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int ARC_FEATURE_COUNT = HAS_ID_FEATURE_COUNT + 6;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.AttributeImpl <em>Attribute</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.impl.AttributeImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getAttribute()
	 * @generated
	 */
	public static final int ATTRIBUTE = 2;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int ATTRIBUTE__TOOLINFO = LABEL__TOOLINFO;

	/**
	 * The feature id for the '<em><b>Parent</b></em>' container reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int ATTRIBUTE__PARENT = LABEL__PARENT;

	/**
	 * The number of structural features of the '<em>Attribute</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int ATTRIBUTE_FEATURE_COUNT = LABEL_FEATURE_COUNT + 0;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.HasLabel <em>Has Label</em>}' class. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.cpntools.accesscpn.model.HasLabel
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHasLabel()
	 * @generated
	 */
	public static final int HAS_LABEL = 15;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.HasName <em>Has Name</em>}' class. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.cpntools.accesscpn.model.HasName
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHasName()
	 * @generated
	 */
	public static final int HAS_NAME = 16;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.HLAnnotationImpl <em>HL Annotation</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.impl.HLAnnotationImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHLAnnotation()
	 * @generated
	 */
	public static final int HL_ANNOTATION = 7;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.NameImpl <em>Name</em>}' class. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.cpntools.accesscpn.model.impl.NameImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getName_()
	 * @generated
	 */
	public static final int NAME = 20;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.ObjectImpl <em>Object</em>}' class. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.cpntools.accesscpn.model.impl.ObjectImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getObject()
	 * @generated
	 */
	public static final int OBJECT = 22;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.NodeImpl <em>Node</em>}' class. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.cpntools.accesscpn.model.impl.NodeImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getNode()
	 * @generated
	 */
	public static final int NODE = 21;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.PageImpl <em>Page</em>}' class. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.cpntools.accesscpn.model.impl.PageImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getPage()
	 * @generated
	 */
	public static final int PAGE = 23;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.PetriNetImpl <em>Petri Net</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.impl.PetriNetImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getPetriNet()
	 * @generated
	 */
	public static final int PETRI_NET = 25;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.PlaceNodeImpl <em>Place Node</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.impl.PlaceNodeImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getPlaceNode()
	 * @generated
	 */
	public static final int PLACE_NODE = 27;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.PlaceImpl <em>Place</em>}' class. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.cpntools.accesscpn.model.impl.PlaceImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getPlace()
	 * @generated
	 */
	public static final int PLACE = 26;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.RefPlaceImpl <em>Ref Place</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.impl.RefPlaceImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getRefPlace()
	 * @generated
	 */
	public static final int REF_PLACE = 29;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.TransitionNodeImpl <em>Transition Node</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.impl.TransitionNodeImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getTransitionNode()
	 * @generated
	 */
	public static final int TRANSITION_NODE = 35;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.RefTransImpl <em>Ref Trans</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.impl.RefTransImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getRefTrans()
	 * @generated
	 */
	public static final int REF_TRANS = 30;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.ToolInfoImpl <em>Tool Info</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.impl.ToolInfoImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getToolInfo()
	 * @generated
	 */
	public static final int TOOL_INFO = 33;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.TransitionImpl <em>Transition</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.impl.TransitionImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getTransition()
	 * @generated
	 */
	public static final int TRANSITION = 34;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.HLMarkingImpl <em>HL Marking</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.impl.HLMarkingImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHLMarking()
	 * @generated
	 */
	public static final int HL_MARKING = 11;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.HLPlaceAddin <em>HL Place Addin</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.HLPlaceAddin
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHLPlaceAddin()
	 * @generated
	 */
	public static final int HL_PLACE_ADDIN = 12;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.HLAnnotationAddin <em>HL Annotation Addin</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.HLAnnotationAddin
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHLAnnotationAddin()
	 * @generated
	 */
	public static final int HL_ANNOTATION_ADDIN = 8;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.HLArcAddin <em>HL Arc Addin</em>}' class. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.cpntools.accesscpn.model.HLArcAddin
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHLArcAddin()
	 * @generated
	 */
	public static final int HL_ARC_ADDIN = 9;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.ConditionImpl <em>Condition</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.impl.ConditionImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getCondition()
	 * @generated
	 */
	public static final int CONDITION = 5;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.HLTransitionAddin <em>HL Transition Addin</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.HLTransitionAddin
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHLTransitionAddin()
	 * @generated
	 */
	public static final int HL_TRANSITION_ADDIN = 13;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.CPNToolsTransitionAddin <em>CPN Tools Transition Addin</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.CPNToolsTransitionAddin
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getCPNToolsTransitionAddin()
	 * @generated
	 */
	public static final int CPN_TOOLS_TRANSITION_ADDIN = 3;

	/**
	 * The feature id for the '<em><b>Code</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_TOOLS_TRANSITION_ADDIN__CODE = 0;

	/**
	 * The feature id for the '<em><b>Time</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_TOOLS_TRANSITION_ADDIN__TIME = 1;

	/**
	 * The feature id for the '<em><b>Priority</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_TOOLS_TRANSITION_ADDIN__PRIORITY = 2;

	/**
	 * The number of structural features of the '<em>CPN Tools Transition Addin</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_TOOLS_TRANSITION_ADDIN_FEATURE_COUNT = 3;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.CodeImpl <em>Code</em>}' class. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.cpntools.accesscpn.model.impl.CodeImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getCode()
	 * @generated
	 */
	public static final int CODE = 4;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CODE__TOOLINFO = ANNOTATION__TOOLINFO;

	/**
	 * The feature id for the '<em><b>Parent</b></em>' container reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int CODE__PARENT = ANNOTATION__PARENT;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CODE__GRAPHICS = ANNOTATION__GRAPHICS;

	/**
	 * The feature id for the '<em><b>Text</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CODE__TEXT = ANNOTATION__TEXT;

	/**
	 * The number of structural features of the '<em>Code</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CODE_FEATURE_COUNT = ANNOTATION_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CONDITION__TOOLINFO = ANNOTATION__TOOLINFO;

	/**
	 * The feature id for the '<em><b>Parent</b></em>' container reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int CONDITION__PARENT = ANNOTATION__PARENT;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CONDITION__GRAPHICS = ANNOTATION__GRAPHICS;

	/**
	 * The feature id for the '<em><b>Text</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CONDITION__TEXT = ANNOTATION__TEXT;

	/**
	 * The number of structural features of the '<em>Condition</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int CONDITION_FEATURE_COUNT = ANNOTATION_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Id</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int OBJECT__ID = HAS_ID__ID;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int OBJECT__TOOLINFO = HAS_ID_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int OBJECT__GRAPHICS = HAS_ID_FEATURE_COUNT + 1;

	/**
	 * The feature id for the '<em><b>Label</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int OBJECT__LABEL = HAS_ID_FEATURE_COUNT + 2;

	/**
	 * The feature id for the '<em><b>Name</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int OBJECT__NAME = HAS_ID_FEATURE_COUNT + 3;

	/**
	 * The feature id for the '<em><b>Page</b></em>' container reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int OBJECT__PAGE = HAS_ID_FEATURE_COUNT + 4;

	/**
	 * The number of structural features of the '<em>Object</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int OBJECT_FEATURE_COUNT = HAS_ID_FEATURE_COUNT + 5;

	/**
	 * The feature id for the '<em><b>Id</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int NODE__ID = OBJECT__ID;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int NODE__TOOLINFO = OBJECT__TOOLINFO;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int NODE__GRAPHICS = OBJECT__GRAPHICS;

	/**
	 * The feature id for the '<em><b>Label</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int NODE__LABEL = OBJECT__LABEL;

	/**
	 * The feature id for the '<em><b>Name</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int NODE__NAME = OBJECT__NAME;

	/**
	 * The feature id for the '<em><b>Page</b></em>' container reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int NODE__PAGE = OBJECT__PAGE;

	/**
	 * The feature id for the '<em><b>Source Arc</b></em>' reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int NODE__SOURCE_ARC = OBJECT_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Target Arc</b></em>' reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int NODE__TARGET_ARC = OBJECT_FEATURE_COUNT + 1;

	/**
	 * The number of structural features of the '<em>Node</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int NODE_FEATURE_COUNT = OBJECT_FEATURE_COUNT + 2;

	/**
	 * The feature id for the '<em><b>Id</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PLACE_NODE__ID = NODE__ID;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PLACE_NODE__TOOLINFO = NODE__TOOLINFO;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PLACE_NODE__GRAPHICS = NODE__GRAPHICS;

	/**
	 * The feature id for the '<em><b>Label</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PLACE_NODE__LABEL = NODE__LABEL;

	/**
	 * The feature id for the '<em><b>Name</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PLACE_NODE__NAME = NODE__NAME;

	/**
	 * The feature id for the '<em><b>Page</b></em>' container reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PLACE_NODE__PAGE = NODE__PAGE;

	/**
	 * The feature id for the '<em><b>Source Arc</b></em>' reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PLACE_NODE__SOURCE_ARC = NODE__SOURCE_ARC;

	/**
	 * The feature id for the '<em><b>Target Arc</b></em>' reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PLACE_NODE__TARGET_ARC = NODE__TARGET_ARC;

	/**
	 * The feature id for the '<em><b>Sort</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PLACE_NODE__SORT = NODE_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Initial Marking</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PLACE_NODE__INITIAL_MARKING = NODE_FEATURE_COUNT + 1;

	/**
	 * The number of structural features of the '<em>Place Node</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int PLACE_NODE_FEATURE_COUNT = NODE_FEATURE_COUNT + 2;

	/**
	 * The feature id for the '<em><b>Id</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PLACE__ID = PLACE_NODE__ID;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PLACE__TOOLINFO = PLACE_NODE__TOOLINFO;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PLACE__GRAPHICS = PLACE_NODE__GRAPHICS;

	/**
	 * The feature id for the '<em><b>Label</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PLACE__LABEL = PLACE_NODE__LABEL;

	/**
	 * The feature id for the '<em><b>Name</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PLACE__NAME = PLACE_NODE__NAME;

	/**
	 * The feature id for the '<em><b>Page</b></em>' container reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PLACE__PAGE = PLACE_NODE__PAGE;

	/**
	 * The feature id for the '<em><b>Source Arc</b></em>' reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PLACE__SOURCE_ARC = PLACE_NODE__SOURCE_ARC;

	/**
	 * The feature id for the '<em><b>Target Arc</b></em>' reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PLACE__TARGET_ARC = PLACE_NODE__TARGET_ARC;

	/**
	 * The feature id for the '<em><b>Sort</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PLACE__SORT = PLACE_NODE__SORT;

	/**
	 * The feature id for the '<em><b>Initial Marking</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PLACE__INITIAL_MARKING = PLACE_NODE__INITIAL_MARKING;

	/**
	 * The feature id for the '<em><b>References</b></em>' reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PLACE__REFERENCES = PLACE_NODE_FEATURE_COUNT + 0;

	/**
	 * The number of structural features of the '<em>Place</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PLACE_FEATURE_COUNT = PLACE_NODE_FEATURE_COUNT + 1;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.TimeImpl <em>Time</em>}' class. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.cpntools.accesscpn.model.impl.TimeImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getTime()
	 * @generated
	 */
	public static final int TIME = 32;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.HLDeclarationImpl <em>HL Declaration</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.impl.HLDeclarationImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHLDeclaration()
	 * @generated
	 */
	public static final int HL_DECLARATION = 10;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.InstanceImpl <em>Instance</em>}' class. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.cpntools.accesscpn.model.impl.InstanceImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getInstance()
	 * @generated
	 */
	public static final int INSTANCE = 18;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.ParameterAssignmentImpl <em>Parameter Assignment</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.impl.ParameterAssignmentImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getParameterAssignment()
	 * @generated
	 */
	public static final int PARAMETER_ASSIGNMENT = 24;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.FusionGroupImpl <em>Fusion Group</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.impl.FusionGroupImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getFusionGroup()
	 * @generated
	 */
	public static final int FUSION_GROUP = 6;

	/**
	 * The feature id for the '<em><b>Id</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FUSION_GROUP__ID = PLACE__ID;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FUSION_GROUP__TOOLINFO = PLACE__TOOLINFO;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FUSION_GROUP__GRAPHICS = PLACE__GRAPHICS;

	/**
	 * The feature id for the '<em><b>Label</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FUSION_GROUP__LABEL = PLACE__LABEL;

	/**
	 * The feature id for the '<em><b>Name</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FUSION_GROUP__NAME = PLACE__NAME;

	/**
	 * The feature id for the '<em><b>Page</b></em>' container reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FUSION_GROUP__PAGE = PLACE__PAGE;

	/**
	 * The feature id for the '<em><b>Source Arc</b></em>' reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FUSION_GROUP__SOURCE_ARC = PLACE__SOURCE_ARC;

	/**
	 * The feature id for the '<em><b>Target Arc</b></em>' reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FUSION_GROUP__TARGET_ARC = PLACE__TARGET_ARC;

	/**
	 * The feature id for the '<em><b>Sort</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FUSION_GROUP__SORT = PLACE__SORT;

	/**
	 * The feature id for the '<em><b>Initial Marking</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FUSION_GROUP__INITIAL_MARKING = PLACE__INITIAL_MARKING;

	/**
	 * The feature id for the '<em><b>References</b></em>' reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FUSION_GROUP__REFERENCES = PLACE__REFERENCES;

	/**
	 * The feature id for the '<em><b>Petri Net</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FUSION_GROUP__PETRI_NET = PLACE_FEATURE_COUNT + 0;

	/**
	 * The number of structural features of the '<em>Fusion Group</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int FUSION_GROUP_FEATURE_COUNT = PLACE_FEATURE_COUNT + 1;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HL_ANNOTATION__TOOLINFO = ANNOTATION__TOOLINFO;

	/**
	 * The feature id for the '<em><b>Parent</b></em>' container reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int HL_ANNOTATION__PARENT = ANNOTATION__PARENT;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HL_ANNOTATION__GRAPHICS = ANNOTATION__GRAPHICS;

	/**
	 * The feature id for the '<em><b>Text</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HL_ANNOTATION__TEXT = ANNOTATION__TEXT;

	/**
	 * The number of structural features of the '<em>HL Annotation</em>' class.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HL_ANNOTATION_FEATURE_COUNT = ANNOTATION_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Text</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HL_ANNOTATION_ADDIN__TEXT = 0;

	/**
	 * The number of structural features of the '<em>HL Annotation Addin</em>' class.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HL_ANNOTATION_ADDIN_FEATURE_COUNT = 1;

	/**
	 * The feature id for the '<em><b>Hlinscription</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HL_ARC_ADDIN__HLINSCRIPTION = 0;

	/**
	 * The feature id for the '<em><b>Kind</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HL_ARC_ADDIN__KIND = 1;

	/**
	 * The number of structural features of the '<em>HL Arc Addin</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int HL_ARC_ADDIN_FEATURE_COUNT = 2;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HL_DECLARATION__TOOLINFO = ANNOTATION__TOOLINFO;

	/**
	 * The feature id for the '<em><b>Parent</b></em>' container reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int HL_DECLARATION__PARENT = ANNOTATION__PARENT;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HL_DECLARATION__GRAPHICS = ANNOTATION__GRAPHICS;

	/**
	 * The feature id for the '<em><b>Text</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HL_DECLARATION__TEXT = ANNOTATION__TEXT;

	/**
	 * The feature id for the '<em><b>Id</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HL_DECLARATION__ID = ANNOTATION_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Structure</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HL_DECLARATION__STRUCTURE = ANNOTATION_FEATURE_COUNT + 1;

	/**
	 * The number of structural features of the '<em>HL Declaration</em>' class.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HL_DECLARATION_FEATURE_COUNT = ANNOTATION_FEATURE_COUNT + 2;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HL_MARKING__TOOLINFO = ANNOTATION__TOOLINFO;

	/**
	 * The feature id for the '<em><b>Parent</b></em>' container reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int HL_MARKING__PARENT = ANNOTATION__PARENT;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HL_MARKING__GRAPHICS = ANNOTATION__GRAPHICS;

	/**
	 * The feature id for the '<em><b>Text</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HL_MARKING__TEXT = ANNOTATION__TEXT;

	/**
	 * The number of structural features of the '<em>HL Marking</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int HL_MARKING_FEATURE_COUNT = ANNOTATION_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Sort</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HL_PLACE_ADDIN__SORT = 0;

	/**
	 * The feature id for the '<em><b>Initial Marking</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HL_PLACE_ADDIN__INITIAL_MARKING = 1;

	/**
	 * The number of structural features of the '<em>HL Place Addin</em>' class.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HL_PLACE_ADDIN_FEATURE_COUNT = 2;

	/**
	 * The feature id for the '<em><b>Condition</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HL_TRANSITION_ADDIN__CONDITION = 0;

	/**
	 * The number of structural features of the '<em>HL Transition Addin</em>' class.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HL_TRANSITION_ADDIN_FEATURE_COUNT = 1;

	/**
	 * The feature id for the '<em><b>Label</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HAS_LABEL__LABEL = 0;

	/**
	 * The number of structural features of the '<em>Has Label</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int HAS_LABEL_FEATURE_COUNT = 1;

	/**
	 * The feature id for the '<em><b>Name</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HAS_NAME__NAME = 0;

	/**
	 * The number of structural features of the '<em>Has Name</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HAS_NAME_FEATURE_COUNT = 1;

	/**
	 * The feature id for the '<em><b>Id</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int INSTANCE__ID = NODE__ID;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int INSTANCE__TOOLINFO = NODE__TOOLINFO;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int INSTANCE__GRAPHICS = NODE__GRAPHICS;

	/**
	 * The feature id for the '<em><b>Label</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int INSTANCE__LABEL = NODE__LABEL;

	/**
	 * The feature id for the '<em><b>Name</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int INSTANCE__NAME = NODE__NAME;

	/**
	 * The feature id for the '<em><b>Page</b></em>' container reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int INSTANCE__PAGE = NODE__PAGE;

	/**
	 * The feature id for the '<em><b>Source Arc</b></em>' reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int INSTANCE__SOURCE_ARC = NODE__SOURCE_ARC;

	/**
	 * The feature id for the '<em><b>Target Arc</b></em>' reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int INSTANCE__TARGET_ARC = NODE__TARGET_ARC;

	/**
	 * The feature id for the '<em><b>Parameter Assignment</b></em>' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int INSTANCE__PARAMETER_ASSIGNMENT = NODE_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Sub Page ID</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int INSTANCE__SUB_PAGE_ID = NODE_FEATURE_COUNT + 1;

	/**
	 * The number of structural features of the '<em>Instance</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int INSTANCE_FEATURE_COUNT = NODE_FEATURE_COUNT + 2;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int NAME__TOOLINFO = HL_ANNOTATION__TOOLINFO;

	/**
	 * The feature id for the '<em><b>Parent</b></em>' container reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int NAME__PARENT = HL_ANNOTATION__PARENT;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int NAME__GRAPHICS = HL_ANNOTATION__GRAPHICS;

	/**
	 * The feature id for the '<em><b>Text</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int NAME__TEXT = HL_ANNOTATION__TEXT;

	/**
	 * The number of structural features of the '<em>Name</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int NAME_FEATURE_COUNT = HL_ANNOTATION_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Id</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PAGE__ID = HAS_ID__ID;

	/**
	 * The feature id for the '<em><b>Name</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PAGE__NAME = HAS_ID_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Label</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PAGE__LABEL = HAS_ID_FEATURE_COUNT + 1;

	/**
	 * The feature id for the '<em><b>Petri Net</b></em>' container reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int PAGE__PETRI_NET = HAS_ID_FEATURE_COUNT + 2;

	/**
	 * The feature id for the '<em><b>Object</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PAGE__OBJECT = HAS_ID_FEATURE_COUNT + 3;

	/**
	 * The feature id for the '<em><b>Arc</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PAGE__ARC = HAS_ID_FEATURE_COUNT + 4;

	/**
	 * The number of structural features of the '<em>Page</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PAGE_FEATURE_COUNT = HAS_ID_FEATURE_COUNT + 5;

	/**
	 * The feature id for the '<em><b>Parameter</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PARAMETER_ASSIGNMENT__PARAMETER = 0;

	/**
	 * The feature id for the '<em><b>Value</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PARAMETER_ASSIGNMENT__VALUE = 1;

	/**
	 * The feature id for the '<em><b>Instance</b></em>' container reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int PARAMETER_ASSIGNMENT__INSTANCE = 2;

	/**
	 * The number of structural features of the '<em>Parameter Assignment</em>' class.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PARAMETER_ASSIGNMENT_FEATURE_COUNT = 3;

	/**
	 * The feature id for the '<em><b>Id</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PETRI_NET__ID = HAS_ID__ID;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PETRI_NET__TOOLINFO = HAS_ID_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Label</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PETRI_NET__LABEL = HAS_ID_FEATURE_COUNT + 1;

	/**
	 * The feature id for the '<em><b>Name</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PETRI_NET__NAME = HAS_ID_FEATURE_COUNT + 2;

	/**
	 * The feature id for the '<em><b>Kind</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PETRI_NET__KIND = HAS_ID_FEATURE_COUNT + 3;

	/**
	 * The feature id for the '<em><b>Page</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PETRI_NET__PAGE = HAS_ID_FEATURE_COUNT + 4;

	/**
	 * The feature id for the '<em><b>Monitors</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PETRI_NET__MONITORS = HAS_ID_FEATURE_COUNT + 5;

	/**
	 * The feature id for the '<em><b>Fusion Groups</b></em>' reference list. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int PETRI_NET__FUSION_GROUPS = HAS_ID_FEATURE_COUNT + 6;

	/**
	 * The feature id for the '<em><b>Time Type</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PETRI_NET__TIME_TYPE = HAS_ID_FEATURE_COUNT + 7;

	/**
	 * The number of structural features of the '<em>Petri Net</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int PETRI_NET_FEATURE_COUNT = HAS_ID_FEATURE_COUNT + 8;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.PriorityImpl <em>Priority</em>}' class. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.cpntools.accesscpn.model.impl.PriorityImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getPriority()
	 * @generated
	 */
	public static final int PRIORITY = 28;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PRIORITY__TOOLINFO = ANNOTATION__TOOLINFO;

	/**
	 * The feature id for the '<em><b>Parent</b></em>' container reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int PRIORITY__PARENT = ANNOTATION__PARENT;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PRIORITY__GRAPHICS = ANNOTATION__GRAPHICS;

	/**
	 * The feature id for the '<em><b>Text</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PRIORITY__TEXT = ANNOTATION__TEXT;

	/**
	 * The number of structural features of the '<em>Priority</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int PRIORITY_FEATURE_COUNT = ANNOTATION_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Id</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_PLACE__ID = PLACE_NODE__ID;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_PLACE__TOOLINFO = PLACE_NODE__TOOLINFO;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_PLACE__GRAPHICS = PLACE_NODE__GRAPHICS;

	/**
	 * The feature id for the '<em><b>Label</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_PLACE__LABEL = PLACE_NODE__LABEL;

	/**
	 * The feature id for the '<em><b>Name</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_PLACE__NAME = PLACE_NODE__NAME;

	/**
	 * The feature id for the '<em><b>Page</b></em>' container reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_PLACE__PAGE = PLACE_NODE__PAGE;

	/**
	 * The feature id for the '<em><b>Source Arc</b></em>' reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_PLACE__SOURCE_ARC = PLACE_NODE__SOURCE_ARC;

	/**
	 * The feature id for the '<em><b>Target Arc</b></em>' reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_PLACE__TARGET_ARC = PLACE_NODE__TARGET_ARC;

	/**
	 * The feature id for the '<em><b>Sort</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_PLACE__SORT = PLACE_NODE__SORT;

	/**
	 * The feature id for the '<em><b>Initial Marking</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_PLACE__INITIAL_MARKING = PLACE_NODE__INITIAL_MARKING;

	/**
	 * The feature id for the '<em><b>Ref</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_PLACE__REF = PLACE_NODE_FEATURE_COUNT + 0;

	/**
	 * The number of structural features of the '<em>Ref Place</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int REF_PLACE_FEATURE_COUNT = PLACE_NODE_FEATURE_COUNT + 1;

	/**
	 * The feature id for the '<em><b>Id</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION_NODE__ID = NODE__ID;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION_NODE__TOOLINFO = NODE__TOOLINFO;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION_NODE__GRAPHICS = NODE__GRAPHICS;

	/**
	 * The feature id for the '<em><b>Label</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION_NODE__LABEL = NODE__LABEL;

	/**
	 * The feature id for the '<em><b>Name</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION_NODE__NAME = NODE__NAME;

	/**
	 * The feature id for the '<em><b>Page</b></em>' container reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION_NODE__PAGE = NODE__PAGE;

	/**
	 * The feature id for the '<em><b>Source Arc</b></em>' reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION_NODE__SOURCE_ARC = NODE__SOURCE_ARC;

	/**
	 * The feature id for the '<em><b>Target Arc</b></em>' reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION_NODE__TARGET_ARC = NODE__TARGET_ARC;

	/**
	 * The feature id for the '<em><b>Condition</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION_NODE__CONDITION = NODE_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Code</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION_NODE__CODE = NODE_FEATURE_COUNT + 1;

	/**
	 * The feature id for the '<em><b>Time</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION_NODE__TIME = NODE_FEATURE_COUNT + 2;

	/**
	 * The feature id for the '<em><b>Priority</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION_NODE__PRIORITY = NODE_FEATURE_COUNT + 3;

	/**
	 * The number of structural features of the '<em>Transition Node</em>' class.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION_NODE_FEATURE_COUNT = NODE_FEATURE_COUNT + 4;

	/**
	 * The feature id for the '<em><b>Id</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_TRANS__ID = TRANSITION_NODE__ID;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_TRANS__TOOLINFO = TRANSITION_NODE__TOOLINFO;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_TRANS__GRAPHICS = TRANSITION_NODE__GRAPHICS;

	/**
	 * The feature id for the '<em><b>Label</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_TRANS__LABEL = TRANSITION_NODE__LABEL;

	/**
	 * The feature id for the '<em><b>Name</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_TRANS__NAME = TRANSITION_NODE__NAME;

	/**
	 * The feature id for the '<em><b>Page</b></em>' container reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_TRANS__PAGE = TRANSITION_NODE__PAGE;

	/**
	 * The feature id for the '<em><b>Source Arc</b></em>' reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_TRANS__SOURCE_ARC = TRANSITION_NODE__SOURCE_ARC;

	/**
	 * The feature id for the '<em><b>Target Arc</b></em>' reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_TRANS__TARGET_ARC = TRANSITION_NODE__TARGET_ARC;

	/**
	 * The feature id for the '<em><b>Condition</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_TRANS__CONDITION = TRANSITION_NODE__CONDITION;

	/**
	 * The feature id for the '<em><b>Code</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_TRANS__CODE = TRANSITION_NODE__CODE;

	/**
	 * The feature id for the '<em><b>Time</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_TRANS__TIME = TRANSITION_NODE__TIME;

	/**
	 * The feature id for the '<em><b>Priority</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_TRANS__PRIORITY = TRANSITION_NODE__PRIORITY;

	/**
	 * The feature id for the '<em><b>Ref</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int REF_TRANS__REF = TRANSITION_NODE_FEATURE_COUNT + 0;

	/**
	 * The number of structural features of the '<em>Ref Trans</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int REF_TRANS_FEATURE_COUNT = TRANSITION_NODE_FEATURE_COUNT + 1;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.impl.SortImpl <em>Sort</em>}' class. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.cpntools.accesscpn.model.impl.SortImpl
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getSort()
	 * @generated
	 */
	public static final int SORT = 31;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int SORT__TOOLINFO = ANNOTATION__TOOLINFO;

	/**
	 * The feature id for the '<em><b>Parent</b></em>' container reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int SORT__PARENT = ANNOTATION__PARENT;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int SORT__GRAPHICS = ANNOTATION__GRAPHICS;

	/**
	 * The feature id for the '<em><b>Text</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int SORT__TEXT = ANNOTATION__TEXT;

	/**
	 * The number of structural features of the '<em>Sort</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int SORT_FEATURE_COUNT = ANNOTATION_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TIME__TOOLINFO = ANNOTATION__TOOLINFO;

	/**
	 * The feature id for the '<em><b>Parent</b></em>' container reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int TIME__PARENT = ANNOTATION__PARENT;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TIME__GRAPHICS = ANNOTATION__GRAPHICS;

	/**
	 * The feature id for the '<em><b>Text</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TIME__TEXT = ANNOTATION__TEXT;

	/**
	 * The number of structural features of the '<em>Time</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TIME_FEATURE_COUNT = ANNOTATION_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Tool</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TOOL_INFO__TOOL = 0;

	/**
	 * The feature id for the '<em><b>Version</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TOOL_INFO__VERSION = 1;

	/**
	 * The feature id for the '<em><b>Parent</b></em>' container reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int TOOL_INFO__PARENT = 2;

	/**
	 * The number of structural features of the '<em>Tool Info</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int TOOL_INFO_FEATURE_COUNT = 3;

	/**
	 * The feature id for the '<em><b>Id</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION__ID = TRANSITION_NODE__ID;

	/**
	 * The feature id for the '<em><b>Toolinfo</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION__TOOLINFO = TRANSITION_NODE__TOOLINFO;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION__GRAPHICS = TRANSITION_NODE__GRAPHICS;

	/**
	 * The feature id for the '<em><b>Label</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION__LABEL = TRANSITION_NODE__LABEL;

	/**
	 * The feature id for the '<em><b>Name</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION__NAME = TRANSITION_NODE__NAME;

	/**
	 * The feature id for the '<em><b>Page</b></em>' container reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION__PAGE = TRANSITION_NODE__PAGE;

	/**
	 * The feature id for the '<em><b>Source Arc</b></em>' reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION__SOURCE_ARC = TRANSITION_NODE__SOURCE_ARC;

	/**
	 * The feature id for the '<em><b>Target Arc</b></em>' reference list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION__TARGET_ARC = TRANSITION_NODE__TARGET_ARC;

	/**
	 * The feature id for the '<em><b>Condition</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION__CONDITION = TRANSITION_NODE__CONDITION;

	/**
	 * The feature id for the '<em><b>Code</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION__CODE = TRANSITION_NODE__CODE;

	/**
	 * The feature id for the '<em><b>Time</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION__TIME = TRANSITION_NODE__TIME;

	/**
	 * The feature id for the '<em><b>Priority</b></em>' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION__PRIORITY = TRANSITION_NODE__PRIORITY;

	/**
	 * The number of structural features of the '<em>Transition</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int TRANSITION_FEATURE_COUNT = TRANSITION_NODE_FEATURE_COUNT + 0;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.HLArcType <em>HL Arc Type</em>}' enum. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.cpntools.accesscpn.model.HLArcType
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHLArcType()
	 * @generated
	 */
	public static final int HL_ARC_TYPE = 36;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.TimeType <em>Time Type</em>}' enum. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.cpntools.accesscpn.model.TimeType
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getTimeType()
	 * @generated
	 */
	public static final int TIME_TYPE = 37;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass annotationEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass arcEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass attributeEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass hasIdEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass hasLabelEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass hasNameEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass hasToolInfoEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass labelEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass nameEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass nodeEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass objectEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass pageEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass petriNetEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass placeEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass placeNodeEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass refPlaceEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass refTransEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass toolInfoEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass transitionEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass transitionNodeEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass hlMarkingEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass hlPlaceAddinEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass hlAnnotationAddinEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass hlArcAddinEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass hlAnnotationEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass conditionEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass hlTransitionAddinEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass cpnToolsTransitionAddinEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass codeEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass timeEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass hlDeclarationEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass instanceEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass parameterAssignmentEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass fusionGroupEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass priorityEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass sortEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EEnum hlArcTypeEEnum = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EEnum timeTypeEEnum = null;

	/**
	 * Creates an instance of the model <b>Package</b>, registered with {@link org.eclipse.emf.ecore.EPackage.Registry
	 * EPackage.Registry} by the package package URI value.
	 * <p>
	 * Note: the correct way to create the package is via the static factory method {@link #init init()}, which also
	 * performs initialization of the package, or returns the registered package, if one already exists. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.eclipse.emf.ecore.EPackage.Registry
	 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#eNS_URI
	 * @see #init()
	 * @generated
	 */
	private ModelPackageImpl() {
		super(eNS_URI, ((EFactory)ModelFactory.INSTANCE));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private static boolean isInited = false;

	/**
	 * Creates, registers, and initializes the <b>Package</b> for this model, and for any others upon which it depends.
	 * 
	 * <p>This method is used to initialize {@link ModelPackageImpl#eINSTANCE} when that field is accessed.
	 * Clients should not invoke it directly. Instead, they should simply access that field to obtain the package.
	 * <!-- begin-user-doc
	 * --> <!-- end-user-doc -->
	 * @see #eNS_URI
	 * @see #createPackageContents()
	 * @see #initializePackageContents()
	 * @generated
	 */
	public static ModelPackageImpl init() {
		if (isInited) return (ModelPackageImpl)EPackage.Registry.INSTANCE.getEPackage(ModelPackageImpl.eNS_URI);

		// Obtain or create and register package
		ModelPackageImpl theModelPackage = (ModelPackageImpl)(EPackage.Registry.INSTANCE.get(eNS_URI) instanceof ModelPackageImpl ? EPackage.Registry.INSTANCE.get(eNS_URI) : new ModelPackageImpl());

		isInited = true;

		// Obtain or create and register interdependencies
		AuxgraphicsPackageImpl theAuxgraphicsPackage = (AuxgraphicsPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(AuxgraphicsPackageImpl.eNS_URI) instanceof AuxgraphicsPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(AuxgraphicsPackageImpl.eNS_URI) : AuxgraphicsPackageImpl.eINSTANCE);
		CpntypesPackageImpl theCpntypesPackage = (CpntypesPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(CpntypesPackageImpl.eNS_URI) instanceof CpntypesPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(CpntypesPackageImpl.eNS_URI) : CpntypesPackageImpl.eINSTANCE);
		DeclarationPackageImpl theDeclarationPackage = (DeclarationPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(DeclarationPackageImpl.eNS_URI) instanceof DeclarationPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(DeclarationPackageImpl.eNS_URI) : DeclarationPackageImpl.eINSTANCE);
		GraphicsPackageImpl theGraphicsPackage = (GraphicsPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(GraphicsPackageImpl.eNS_URI) instanceof GraphicsPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(GraphicsPackageImpl.eNS_URI) : GraphicsPackageImpl.eINSTANCE);
		MonitorsPackageImpl theMonitorsPackage = (MonitorsPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(MonitorsPackageImpl.eNS_URI) instanceof MonitorsPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(MonitorsPackageImpl.eNS_URI) : MonitorsPackageImpl.eINSTANCE);

		// Create package meta-data objects
		theModelPackage.createPackageContents();
		theAuxgraphicsPackage.createPackageContents();
		theCpntypesPackage.createPackageContents();
		theDeclarationPackage.createPackageContents();
		theGraphicsPackage.createPackageContents();
		theMonitorsPackage.createPackageContents();

		// Initialize created meta-data
		theModelPackage.initializePackageContents();
		theAuxgraphicsPackage.initializePackageContents();
		theCpntypesPackage.initializePackageContents();
		theDeclarationPackage.initializePackageContents();
		theGraphicsPackage.initializePackageContents();
		theMonitorsPackage.initializePackageContents();

		// Mark meta-data to indicate it can't be changed
		theModelPackage.freeze();

  
		// Update the registry and return the package
		EPackage.Registry.INSTANCE.put(ModelPackageImpl.eNS_URI, theModelPackage);
		return theModelPackage;
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.Annotation <em>Annotation</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>Annotation</em>'.
	 * @see org.cpntools.accesscpn.model.Annotation
	 * @generated
	 */
	public EClass getAnnotation() {
		return annotationEClass;
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.Arc <em>Arc</em>}'.
	 * <!-- begin-user-doc
	 * --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>Arc</em>'.
	 * @see org.cpntools.accesscpn.model.Arc
	 * @generated
	 */
	public EClass getArc() {
		return arcEClass;
	}

	/**
	 * Returns the meta object for the reference '{@link org.cpntools.accesscpn.model.Arc#getSource <em>Source</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the reference '<em>Source</em>'.
	 * @see org.cpntools.accesscpn.model.Arc#getSource()
	 * @see #getArc()
	 * @generated
	 */
	public EReference getArc_Source() {
		return (EReference)arcEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the reference '{@link org.cpntools.accesscpn.model.Arc#getTarget <em>Target</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the reference '<em>Target</em>'.
	 * @see org.cpntools.accesscpn.model.Arc#getTarget()
	 * @see #getArc()
	 * @generated
	 */
	public EReference getArc_Target() {
		return (EReference)arcEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for the container reference '{@link org.cpntools.accesscpn.model.Arc#getPage <em>Page</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the container reference '<em>Page</em>'.
	 * @see org.cpntools.accesscpn.model.Arc#getPage()
	 * @see #getArc()
	 * @generated
	 */
	public EReference getArc_Page() {
		return (EReference)arcEClass.getEStructuralFeatures().get(2);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.Attribute <em>Attribute</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>Attribute</em>'.
	 * @see org.cpntools.accesscpn.model.Attribute
	 * @generated
	 */
	public EClass getAttribute() {
		return attributeEClass;
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.HasId <em>Has Id</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>Has Id</em>'.
	 * @see org.cpntools.accesscpn.model.HasId
	 * @generated
	 */
	public EClass getHasId() {
		return hasIdEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.HasId#getId <em>Id</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for the attribute '<em>Id</em>'.
	 * @see org.cpntools.accesscpn.model.HasId#getId()
	 * @see #getHasId()
	 * @generated
	 */
	public EAttribute getHasId_Id() {
		return (EAttribute)hasIdEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.HasLabel <em>Has Label</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>Has Label</em>'.
	 * @see org.cpntools.accesscpn.model.HasLabel
	 * @generated
	 */
	public EClass getHasLabel() {
		return hasLabelEClass;
	}

	/**
	 * Returns the meta object for the containment reference list '
	 * {@link org.cpntools.accesscpn.model.HasLabel#getLabel <em>Label</em>}'. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @return the meta object for the containment reference list '<em>Label</em>'.
	 * @see org.cpntools.accesscpn.model.HasLabel#getLabel()
	 * @see #getHasLabel()
	 * @generated
	 */
	public EReference getHasLabel_Label() {
		return (EReference)hasLabelEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.HasName <em>Has Name</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>Has Name</em>'.
	 * @see org.cpntools.accesscpn.model.HasName
	 * @generated
	 */
	public EClass getHasName() {
		return hasNameEClass;
	}

	/**
	 * Returns the meta object for the reference '{@link org.cpntools.accesscpn.model.HasName#getName <em>Name</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the reference '<em>Name</em>'.
	 * @see org.cpntools.accesscpn.model.HasName#getName()
	 * @see #getHasName()
	 * @generated
	 */
	public EReference getHasName_Name() {
		return (EReference)hasNameEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.HasToolInfo <em>Has Tool Info</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>Has Tool Info</em>'.
	 * @see org.cpntools.accesscpn.model.HasToolInfo
	 * @generated
	 */
	public EClass getHasToolInfo() {
		return hasToolInfoEClass;
	}

	/**
	 * Returns the meta object for the containment reference list '{@link org.cpntools.accesscpn.model.HasToolInfo#getToolinfo <em>Toolinfo</em>}'.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @return the meta object for the containment reference list '<em>Toolinfo</em>'.
	 * @see org.cpntools.accesscpn.model.HasToolInfo#getToolinfo()
	 * @see #getHasToolInfo()
	 * @generated
	 */
	public EReference getHasToolInfo_Toolinfo() {
		return (EReference)hasToolInfoEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.Label <em>Label</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>Label</em>'.
	 * @see org.cpntools.accesscpn.model.Label
	 * @generated
	 */
	public EClass getLabel() {
		return labelEClass;
	}

	/**
	 * Returns the meta object for the container reference '{@link org.cpntools.accesscpn.model.Label#getParent <em>Parent</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the container reference '<em>Parent</em>'.
	 * @see org.cpntools.accesscpn.model.Label#getParent()
	 * @see #getLabel()
	 * @generated
	 */
	public EReference getLabel_Parent() {
		return (EReference)labelEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.Name <em>Name</em>}'.
	 * <!-- begin-user-doc
	 * --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>Name</em>'.
	 * @see org.cpntools.accesscpn.model.Name
	 * @generated
	 */
	public EClass getName_() {
		return nameEClass;
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.Node <em>Node</em>}'.
	 * <!-- begin-user-doc
	 * --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>Node</em>'.
	 * @see org.cpntools.accesscpn.model.Node
	 * @generated
	 */
	public EClass getNode() {
		return nodeEClass;
	}

	/**
	 * Returns the meta object for the reference list '{@link org.cpntools.accesscpn.model.Node#getSourceArc <em>Source Arc</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the reference list '<em>Source Arc</em>'.
	 * @see org.cpntools.accesscpn.model.Node#getSourceArc()
	 * @see #getNode()
	 * @generated
	 */
	public EReference getNode_SourceArc() {
		return (EReference)nodeEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the reference list '{@link org.cpntools.accesscpn.model.Node#getTargetArc <em>Target Arc</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the reference list '<em>Target Arc</em>'.
	 * @see org.cpntools.accesscpn.model.Node#getTargetArc()
	 * @see #getNode()
	 * @generated
	 */
	public EReference getNode_TargetArc() {
		return (EReference)nodeEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.Object <em>Object</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>Object</em>'.
	 * @see org.cpntools.accesscpn.model.Object
	 * @generated
	 */
	public EClass getObject() {
		return objectEClass;
	}

	/**
	 * Returns the meta object for the container reference '{@link org.cpntools.accesscpn.model.Object#getPage <em>Page</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the container reference '<em>Page</em>'.
	 * @see org.cpntools.accesscpn.model.Object#getPage()
	 * @see #getObject()
	 * @generated
	 */
	public EReference getObject_Page() {
		return (EReference)objectEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.Page <em>Page</em>}'.
	 * <!-- begin-user-doc
	 * --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>Page</em>'.
	 * @see org.cpntools.accesscpn.model.Page
	 * @generated
	 */
	public EClass getPage() {
		return pageEClass;
	}

	/**
	 * Returns the meta object for the container reference '{@link org.cpntools.accesscpn.model.Page#getPetriNet <em>Petri Net</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the container reference '<em>Petri Net</em>'.
	 * @see org.cpntools.accesscpn.model.Page#getPetriNet()
	 * @see #getPage()
	 * @generated
	 */
	public EReference getPage_PetriNet() {
		return (EReference)pageEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the containment reference list '{@link org.cpntools.accesscpn.model.Page#getObject <em>Object</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the containment reference list '<em>Object</em>'.
	 * @see org.cpntools.accesscpn.model.Page#getObject()
	 * @see #getPage()
	 * @generated
	 */
	public EReference getPage_Object() {
		return (EReference)pageEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for the containment reference list '{@link org.cpntools.accesscpn.model.Page#getArc <em>Arc</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the containment reference list '<em>Arc</em>'.
	 * @see org.cpntools.accesscpn.model.Page#getArc()
	 * @see #getPage()
	 * @generated
	 */
	public EReference getPage_Arc() {
		return (EReference)pageEClass.getEStructuralFeatures().get(2);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.PetriNet <em>Petri Net</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>Petri Net</em>'.
	 * @see org.cpntools.accesscpn.model.PetriNet
	 * @generated
	 */
	public EClass getPetriNet() {
		return petriNetEClass;
	}

	/**
	 * Returns the meta object for the containment reference list '{@link org.cpntools.accesscpn.model.PetriNet#getPage <em>Page</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the containment reference list '<em>Page</em>'.
	 * @see org.cpntools.accesscpn.model.PetriNet#getPage()
	 * @see #getPetriNet()
	 * @generated
	 */
	public EReference getPetriNet_Page() {
		return (EReference)petriNetEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for the containment reference list '{@link org.cpntools.accesscpn.model.PetriNet#getMonitors <em>Monitors</em>}'.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @return the meta object for the containment reference list '<em>Monitors</em>'.
	 * @see org.cpntools.accesscpn.model.PetriNet#getMonitors()
	 * @see #getPetriNet()
	 * @generated
	 */
	public EReference getPetriNet_Monitors() {
		return (EReference)petriNetEClass.getEStructuralFeatures().get(2);
	}

	/**
	 * Returns the meta object for the reference list '{@link org.cpntools.accesscpn.model.PetriNet#getFusionGroups <em>Fusion Groups</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the reference list '<em>Fusion Groups</em>'.
	 * @see org.cpntools.accesscpn.model.PetriNet#getFusionGroups()
	 * @see #getPetriNet()
	 * @generated
	 */
	public EReference getPetriNet_FusionGroups() {
		return (EReference)petriNetEClass.getEStructuralFeatures().get(3);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.PetriNet#getTimeType <em>Time Type</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Time Type</em>'.
	 * @see org.cpntools.accesscpn.model.PetriNet#getTimeType()
	 * @see #getPetriNet()
	 * @generated
	 */
	public EAttribute getPetriNet_TimeType() {
		return (EAttribute)petriNetEClass.getEStructuralFeatures().get(4);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.PetriNet#getKind <em>Kind</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Kind</em>'.
	 * @see org.cpntools.accesscpn.model.PetriNet#getKind()
	 * @see #getPetriNet()
	 * @generated
	 */
	public EAttribute getPetriNet_Kind() {
		return (EAttribute)petriNetEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.Place <em>Place</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>Place</em>'.
	 * @see org.cpntools.accesscpn.model.Place
	 * @generated
	 */
	public EClass getPlace() {
		return placeEClass;
	}

	/**
	 * Returns the meta object for the reference list '{@link org.cpntools.accesscpn.model.Place#getReferences <em>References</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the reference list '<em>References</em>'.
	 * @see org.cpntools.accesscpn.model.Place#getReferences()
	 * @see #getPlace()
	 * @generated
	 */
	public EReference getPlace_References() {
		return (EReference)placeEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.PlaceNode <em>Place Node</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>Place Node</em>'.
	 * @see org.cpntools.accesscpn.model.PlaceNode
	 * @generated
	 */
	public EClass getPlaceNode() {
		return placeNodeEClass;
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.RefPlace <em>Ref Place</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>Ref Place</em>'.
	 * @see org.cpntools.accesscpn.model.RefPlace
	 * @generated
	 */
	public EClass getRefPlace() {
		return refPlaceEClass;
	}

	/**
	 * Returns the meta object for the reference '{@link org.cpntools.accesscpn.model.RefPlace#getRef <em>Ref</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the reference '<em>Ref</em>'.
	 * @see org.cpntools.accesscpn.model.RefPlace#getRef()
	 * @see #getRefPlace()
	 * @generated
	 */
	public EReference getRefPlace_Ref() {
		return (EReference)refPlaceEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.RefTrans <em>Ref Trans</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>Ref Trans</em>'.
	 * @see org.cpntools.accesscpn.model.RefTrans
	 * @generated
	 */
	public EClass getRefTrans() {
		return refTransEClass;
	}

	/**
	 * Returns the meta object for the reference '{@link org.cpntools.accesscpn.model.RefTrans#getRef <em>Ref</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the reference '<em>Ref</em>'.
	 * @see org.cpntools.accesscpn.model.RefTrans#getRef()
	 * @see #getRefTrans()
	 * @generated
	 */
	public EReference getRefTrans_Ref() {
		return (EReference)refTransEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.ToolInfo <em>Tool Info</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>Tool Info</em>'.
	 * @see org.cpntools.accesscpn.model.ToolInfo
	 * @generated
	 */
	public EClass getToolInfo() {
		return toolInfoEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.ToolInfo#getTool <em>Tool</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Tool</em>'.
	 * @see org.cpntools.accesscpn.model.ToolInfo#getTool()
	 * @see #getToolInfo()
	 * @generated
	 */
	public EAttribute getToolInfo_Tool() {
		return (EAttribute)toolInfoEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.ToolInfo#getVersion <em>Version</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Version</em>'.
	 * @see org.cpntools.accesscpn.model.ToolInfo#getVersion()
	 * @see #getToolInfo()
	 * @generated
	 */
	public EAttribute getToolInfo_Version() {
		return (EAttribute)toolInfoEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for the container reference '{@link org.cpntools.accesscpn.model.ToolInfo#getParent <em>Parent</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the container reference '<em>Parent</em>'.
	 * @see org.cpntools.accesscpn.model.ToolInfo#getParent()
	 * @see #getToolInfo()
	 * @generated
	 */
	public EReference getToolInfo_Parent() {
		return (EReference)toolInfoEClass.getEStructuralFeatures().get(2);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.Transition <em>Transition</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>Transition</em>'.
	 * @see org.cpntools.accesscpn.model.Transition
	 * @generated
	 */
	public EClass getTransition() {
		return transitionEClass;
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.TransitionNode <em>Transition Node</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>Transition Node</em>'.
	 * @see org.cpntools.accesscpn.model.TransitionNode
	 * @generated
	 */
	public EClass getTransitionNode() {
		return transitionNodeEClass;
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.HLMarking <em>HL Marking</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>HL Marking</em>'.
	 * @see org.cpntools.accesscpn.model.HLMarking
	 * @generated
	 */
	public EClass getHLMarking() {
		return hlMarkingEClass;
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.HLPlaceAddin <em>HL Place Addin</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>HL Place Addin</em>'.
	 * @see org.cpntools.accesscpn.model.HLPlaceAddin
	 * @generated
	 */
	public EClass getHLPlaceAddin() {
		return hlPlaceAddinEClass;
	}

	/**
	 * Returns the meta object for the reference '{@link org.cpntools.accesscpn.model.HLPlaceAddin#getInitialMarking <em>Initial Marking</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the reference '<em>Initial Marking</em>'.
	 * @see org.cpntools.accesscpn.model.HLPlaceAddin#getInitialMarking()
	 * @see #getHLPlaceAddin()
	 * @generated
	 */
	public EReference getHLPlaceAddin_InitialMarking() {
		return (EReference)hlPlaceAddinEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for the reference '{@link org.cpntools.accesscpn.model.HLPlaceAddin#getSort <em>Sort</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the reference '<em>Sort</em>'.
	 * @see org.cpntools.accesscpn.model.HLPlaceAddin#getSort()
	 * @see #getHLPlaceAddin()
	 * @generated
	 */
	public EReference getHLPlaceAddin_Sort() {
		return (EReference)hlPlaceAddinEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.HLAnnotationAddin <em>HL Annotation Addin</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>HL Annotation Addin</em>'.
	 * @see org.cpntools.accesscpn.model.HLAnnotationAddin
	 * @generated
	 */
	public EClass getHLAnnotationAddin() {
		return hlAnnotationAddinEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.HLAnnotationAddin#getText <em>Text</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Text</em>'.
	 * @see org.cpntools.accesscpn.model.HLAnnotationAddin#getText()
	 * @see #getHLAnnotationAddin()
	 * @generated
	 */
	public EAttribute getHLAnnotationAddin_Text() {
		return (EAttribute)hlAnnotationAddinEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.HLArcAddin <em>HL Arc Addin</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>HL Arc Addin</em>'.
	 * @see org.cpntools.accesscpn.model.HLArcAddin
	 * @generated
	 */
	public EClass getHLArcAddin() {
		return hlArcAddinEClass;
	}

	/**
	 * Returns the meta object for the reference '{@link org.cpntools.accesscpn.model.HLArcAddin#getHlinscription <em>Hlinscription</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the reference '<em>Hlinscription</em>'.
	 * @see org.cpntools.accesscpn.model.HLArcAddin#getHlinscription()
	 * @see #getHLArcAddin()
	 * @generated
	 */
	public EReference getHLArcAddin_Hlinscription() {
		return (EReference)hlArcAddinEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.HLArcAddin#getKind <em>Kind</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Kind</em>'.
	 * @see org.cpntools.accesscpn.model.HLArcAddin#getKind()
	 * @see #getHLArcAddin()
	 * @generated
	 */
	public EAttribute getHLArcAddin_Kind() {
		return (EAttribute)hlArcAddinEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.HLAnnotation <em>HL Annotation</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>HL Annotation</em>'.
	 * @see org.cpntools.accesscpn.model.HLAnnotation
	 * @generated
	 */
	public EClass getHLAnnotation() {
		return hlAnnotationEClass;
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.Condition <em>Condition</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>Condition</em>'.
	 * @see org.cpntools.accesscpn.model.Condition
	 * @generated
	 */
	public EClass getCondition() {
		return conditionEClass;
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.HLTransitionAddin <em>HL Transition Addin</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>HL Transition Addin</em>'.
	 * @see org.cpntools.accesscpn.model.HLTransitionAddin
	 * @generated
	 */
	public EClass getHLTransitionAddin() {
		return hlTransitionAddinEClass;
	}

	/**
	 * Returns the meta object for the reference '{@link org.cpntools.accesscpn.model.HLTransitionAddin#getCondition <em>Condition</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the reference '<em>Condition</em>'.
	 * @see org.cpntools.accesscpn.model.HLTransitionAddin#getCondition()
	 * @see #getHLTransitionAddin()
	 * @generated
	 */
	public EReference getHLTransitionAddin_Condition() {
		return (EReference)hlTransitionAddinEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.CPNToolsTransitionAddin <em>CPN Tools Transition Addin</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>CPN Tools Transition Addin</em>'.
	 * @see org.cpntools.accesscpn.model.CPNToolsTransitionAddin
	 * @generated
	 */
	public EClass getCPNToolsTransitionAddin() {
		return cpnToolsTransitionAddinEClass;
	}

	/**
	 * Returns the meta object for the reference '{@link org.cpntools.accesscpn.model.CPNToolsTransitionAddin#getCode <em>Code</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the reference '<em>Code</em>'.
	 * @see org.cpntools.accesscpn.model.CPNToolsTransitionAddin#getCode()
	 * @see #getCPNToolsTransitionAddin()
	 * @generated
	 */
	public EReference getCPNToolsTransitionAddin_Code() {
		return (EReference)cpnToolsTransitionAddinEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the reference '{@link org.cpntools.accesscpn.model.CPNToolsTransitionAddin#getTime <em>Time</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the reference '<em>Time</em>'.
	 * @see org.cpntools.accesscpn.model.CPNToolsTransitionAddin#getTime()
	 * @see #getCPNToolsTransitionAddin()
	 * @generated
	 */
	public EReference getCPNToolsTransitionAddin_Time() {
		return (EReference)cpnToolsTransitionAddinEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for the reference '{@link org.cpntools.accesscpn.model.CPNToolsTransitionAddin#getPriority <em>Priority</em>}'.
	 * <!-- begin-user-doc
	 * --> <!-- end-user-doc -->
	 * @return the meta object for the reference '<em>Priority</em>'.
	 * @see org.cpntools.accesscpn.model.CPNToolsTransitionAddin#getPriority()
	 * @see #getCPNToolsTransitionAddin()
	 * @generated
	 */
	public EReference getCPNToolsTransitionAddin_Priority() {
		return (EReference)cpnToolsTransitionAddinEClass.getEStructuralFeatures().get(2);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.Code <em>Code</em>}'.
	 * <!-- begin-user-doc
	 * --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>Code</em>'.
	 * @see org.cpntools.accesscpn.model.Code
	 * @generated
	 */
	public EClass getCode() {
		return codeEClass;
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.Time <em>Time</em>}'.
	 * <!-- begin-user-doc
	 * --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>Time</em>'.
	 * @see org.cpntools.accesscpn.model.Time
	 * @generated
	 */
	public EClass getTime() {
		return timeEClass;
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.HLDeclaration <em>HL Declaration</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>HL Declaration</em>'.
	 * @see org.cpntools.accesscpn.model.HLDeclaration
	 * @generated
	 */
	public EClass getHLDeclaration() {
		return hlDeclarationEClass;
	}

	/**
	 * Returns the meta object for the containment reference '{@link org.cpntools.accesscpn.model.HLDeclaration#getStructure <em>Structure</em>}'.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @return the meta object for the containment reference '<em>Structure</em>'.
	 * @see org.cpntools.accesscpn.model.HLDeclaration#getStructure()
	 * @see #getHLDeclaration()
	 * @generated
	 */
	public EReference getHLDeclaration_Structure() {
		return (EReference)hlDeclarationEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.Instance <em>Instance</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>Instance</em>'.
	 * @see org.cpntools.accesscpn.model.Instance
	 * @generated
	 */
	public EClass getInstance() {
		return instanceEClass;
	}

	/**
	 * Returns the meta object for the containment reference list '
	 * {@link org.cpntools.accesscpn.model.Instance#getParameterAssignment <em>Parameter Assignment</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for the containment reference list '<em>Parameter Assignment</em>'.
	 * @see org.cpntools.accesscpn.model.Instance#getParameterAssignment()
	 * @see #getInstance()
	 * @generated
	 */
	public EReference getInstance_ParameterAssignment() {
		return (EReference)instanceEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.Instance#getSubPageID <em>Sub Page ID</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Sub Page ID</em>'.
	 * @see org.cpntools.accesscpn.model.Instance#getSubPageID()
	 * @see #getInstance()
	 * @generated
	 */
	public EAttribute getInstance_SubPageID() {
		return (EAttribute)instanceEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.ParameterAssignment <em>Parameter Assignment</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>Parameter Assignment</em>'.
	 * @see org.cpntools.accesscpn.model.ParameterAssignment
	 * @generated
	 */
	public EClass getParameterAssignment() {
		return parameterAssignmentEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.ParameterAssignment#getParameter <em>Parameter</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Parameter</em>'.
	 * @see org.cpntools.accesscpn.model.ParameterAssignment#getParameter()
	 * @see #getParameterAssignment()
	 * @generated
	 */
	public EAttribute getParameterAssignment_Parameter() {
		return (EAttribute)parameterAssignmentEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.ParameterAssignment#getValue <em>Value</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Value</em>'.
	 * @see org.cpntools.accesscpn.model.ParameterAssignment#getValue()
	 * @see #getParameterAssignment()
	 * @generated
	 */
	public EAttribute getParameterAssignment_Value() {
		return (EAttribute)parameterAssignmentEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for the container reference '{@link org.cpntools.accesscpn.model.ParameterAssignment#getInstance <em>Instance</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the container reference '<em>Instance</em>'.
	 * @see org.cpntools.accesscpn.model.ParameterAssignment#getInstance()
	 * @see #getParameterAssignment()
	 * @generated
	 */
	public EReference getParameterAssignment_Instance() {
		return (EReference)parameterAssignmentEClass.getEStructuralFeatures().get(2);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.FusionGroup <em>Fusion Group</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>Fusion Group</em>'.
	 * @see org.cpntools.accesscpn.model.FusionGroup
	 * @generated
	 */
	public EClass getFusionGroup() {
		return fusionGroupEClass;
	}

	/**
	 * Returns the meta object for the reference '{@link org.cpntools.accesscpn.model.FusionGroup#getPetriNet <em>Petri Net</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the reference '<em>Petri Net</em>'.
	 * @see org.cpntools.accesscpn.model.FusionGroup#getPetriNet()
	 * @see #getFusionGroup()
	 * @generated
	 */
	public EReference getFusionGroup_PetriNet() {
		return (EReference)fusionGroupEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.Priority <em>Priority</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>Priority</em>'.
	 * @see org.cpntools.accesscpn.model.Priority
	 * @generated
	 */
	public EClass getPriority() {
		return priorityEClass;
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.Sort <em>Sort</em>}'.
	 * <!-- begin-user-doc
	 * --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>Sort</em>'.
	 * @see org.cpntools.accesscpn.model.Sort
	 * @generated
	 */
	public EClass getSort() {
		return sortEClass;
	}

	/**
	 * Returns the meta object for enum '{@link org.cpntools.accesscpn.model.HLArcType <em>HL Arc Type</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for enum '<em>HL Arc Type</em>'.
	 * @see org.cpntools.accesscpn.model.HLArcType
	 * @generated
	 */
	public EEnum getHLArcType() {
		return hlArcTypeEEnum;
	}

	/**
	 * Returns the meta object for enum '{@link org.cpntools.accesscpn.model.TimeType <em>Time Type</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for enum '<em>Time Type</em>'.
	 * @see org.cpntools.accesscpn.model.TimeType
	 * @generated
	 */
	public EEnum getTimeType() {
		return timeTypeEEnum;
	}

	/**
	 * Returns the factory that creates the instances of the model.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the factory that creates the instances of the model.
	 * @generated
	 */
	public ModelFactory getModelFactory() {
		return (ModelFactory)getEFactoryInstance();
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
		annotationEClass = createEClass(ANNOTATION);

		arcEClass = createEClass(ARC);
		createEReference(arcEClass, ARC__SOURCE);
		createEReference(arcEClass, ARC__TARGET);
		createEReference(arcEClass, ARC__PAGE);

		attributeEClass = createEClass(ATTRIBUTE);

		cpnToolsTransitionAddinEClass = createEClass(CPN_TOOLS_TRANSITION_ADDIN);
		createEReference(cpnToolsTransitionAddinEClass, CPN_TOOLS_TRANSITION_ADDIN__CODE);
		createEReference(cpnToolsTransitionAddinEClass, CPN_TOOLS_TRANSITION_ADDIN__TIME);
		createEReference(cpnToolsTransitionAddinEClass, CPN_TOOLS_TRANSITION_ADDIN__PRIORITY);

		codeEClass = createEClass(CODE);

		conditionEClass = createEClass(CONDITION);

		fusionGroupEClass = createEClass(FUSION_GROUP);
		createEReference(fusionGroupEClass, FUSION_GROUP__PETRI_NET);

		hlAnnotationEClass = createEClass(HL_ANNOTATION);

		hlAnnotationAddinEClass = createEClass(HL_ANNOTATION_ADDIN);
		createEAttribute(hlAnnotationAddinEClass, HL_ANNOTATION_ADDIN__TEXT);

		hlArcAddinEClass = createEClass(HL_ARC_ADDIN);
		createEReference(hlArcAddinEClass, HL_ARC_ADDIN__HLINSCRIPTION);
		createEAttribute(hlArcAddinEClass, HL_ARC_ADDIN__KIND);

		hlDeclarationEClass = createEClass(HL_DECLARATION);
		createEReference(hlDeclarationEClass, HL_DECLARATION__STRUCTURE);

		hlMarkingEClass = createEClass(HL_MARKING);

		hlPlaceAddinEClass = createEClass(HL_PLACE_ADDIN);
		createEReference(hlPlaceAddinEClass, HL_PLACE_ADDIN__SORT);
		createEReference(hlPlaceAddinEClass, HL_PLACE_ADDIN__INITIAL_MARKING);

		hlTransitionAddinEClass = createEClass(HL_TRANSITION_ADDIN);
		createEReference(hlTransitionAddinEClass, HL_TRANSITION_ADDIN__CONDITION);

		hasIdEClass = createEClass(HAS_ID);
		createEAttribute(hasIdEClass, HAS_ID__ID);

		hasLabelEClass = createEClass(HAS_LABEL);
		createEReference(hasLabelEClass, HAS_LABEL__LABEL);

		hasNameEClass = createEClass(HAS_NAME);
		createEReference(hasNameEClass, HAS_NAME__NAME);

		hasToolInfoEClass = createEClass(HAS_TOOL_INFO);
		createEReference(hasToolInfoEClass, HAS_TOOL_INFO__TOOLINFO);

		instanceEClass = createEClass(INSTANCE);
		createEReference(instanceEClass, INSTANCE__PARAMETER_ASSIGNMENT);
		createEAttribute(instanceEClass, INSTANCE__SUB_PAGE_ID);

		labelEClass = createEClass(LABEL);
		createEReference(labelEClass, LABEL__PARENT);

		nameEClass = createEClass(NAME);

		nodeEClass = createEClass(NODE);
		createEReference(nodeEClass, NODE__SOURCE_ARC);
		createEReference(nodeEClass, NODE__TARGET_ARC);

		objectEClass = createEClass(OBJECT);
		createEReference(objectEClass, OBJECT__PAGE);

		pageEClass = createEClass(PAGE);
		createEReference(pageEClass, PAGE__PETRI_NET);
		createEReference(pageEClass, PAGE__OBJECT);
		createEReference(pageEClass, PAGE__ARC);

		parameterAssignmentEClass = createEClass(PARAMETER_ASSIGNMENT);
		createEAttribute(parameterAssignmentEClass, PARAMETER_ASSIGNMENT__PARAMETER);
		createEAttribute(parameterAssignmentEClass, PARAMETER_ASSIGNMENT__VALUE);
		createEReference(parameterAssignmentEClass, PARAMETER_ASSIGNMENT__INSTANCE);

		petriNetEClass = createEClass(PETRI_NET);
		createEAttribute(petriNetEClass, PETRI_NET__KIND);
		createEReference(petriNetEClass, PETRI_NET__PAGE);
		createEReference(petriNetEClass, PETRI_NET__MONITORS);
		createEReference(petriNetEClass, PETRI_NET__FUSION_GROUPS);
		createEAttribute(petriNetEClass, PETRI_NET__TIME_TYPE);

		placeEClass = createEClass(PLACE);
		createEReference(placeEClass, PLACE__REFERENCES);

		placeNodeEClass = createEClass(PLACE_NODE);

		priorityEClass = createEClass(PRIORITY);

		refPlaceEClass = createEClass(REF_PLACE);
		createEReference(refPlaceEClass, REF_PLACE__REF);

		refTransEClass = createEClass(REF_TRANS);
		createEReference(refTransEClass, REF_TRANS__REF);

		sortEClass = createEClass(SORT);

		timeEClass = createEClass(TIME);

		toolInfoEClass = createEClass(TOOL_INFO);
		createEAttribute(toolInfoEClass, TOOL_INFO__TOOL);
		createEAttribute(toolInfoEClass, TOOL_INFO__VERSION);
		createEReference(toolInfoEClass, TOOL_INFO__PARENT);

		transitionEClass = createEClass(TRANSITION);

		transitionNodeEClass = createEClass(TRANSITION_NODE);

		// Create enums
		hlArcTypeEEnum = createEEnum(HL_ARC_TYPE);
		timeTypeEEnum = createEEnum(TIME_TYPE);
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
		GraphicsPackageImpl theGraphicsPackage = (GraphicsPackageImpl)EPackage.Registry.INSTANCE.getEPackage(GraphicsPackageImpl.eNS_URI);
		DeclarationPackageImpl theDeclarationPackage = (DeclarationPackageImpl)EPackage.Registry.INSTANCE.getEPackage(DeclarationPackageImpl.eNS_URI);
		MonitorsPackageImpl theMonitorsPackage = (MonitorsPackageImpl)EPackage.Registry.INSTANCE.getEPackage(MonitorsPackageImpl.eNS_URI);

		// Create type parameters

		// Set bounds for type parameters

		// Add supertypes to classes
		annotationEClass.getESuperTypes().add(this.getLabel());
		annotationEClass.getESuperTypes().add(theGraphicsPackage.getHasGraphics());
		annotationEClass.getESuperTypes().add(this.getHLAnnotationAddin());
		arcEClass.getESuperTypes().add(this.getHasId());
		arcEClass.getESuperTypes().add(theGraphicsPackage.getHasGraphics());
		arcEClass.getESuperTypes().add(this.getHLArcAddin());
		attributeEClass.getESuperTypes().add(this.getLabel());
		codeEClass.getESuperTypes().add(this.getAnnotation());
		conditionEClass.getESuperTypes().add(this.getAnnotation());
		fusionGroupEClass.getESuperTypes().add(this.getPlace());
		hlAnnotationEClass.getESuperTypes().add(this.getAnnotation());
		hlDeclarationEClass.getESuperTypes().add(this.getAnnotation());
		hlDeclarationEClass.getESuperTypes().add(this.getHasId());
		hlMarkingEClass.getESuperTypes().add(this.getAnnotation());
		instanceEClass.getESuperTypes().add(this.getNode());
		labelEClass.getESuperTypes().add(this.getHasToolInfo());
		nameEClass.getESuperTypes().add(this.getHLAnnotation());
		nodeEClass.getESuperTypes().add(this.getObject());
		objectEClass.getESuperTypes().add(this.getHasId());
		objectEClass.getESuperTypes().add(this.getHasToolInfo());
		objectEClass.getESuperTypes().add(theGraphicsPackage.getHasGraphics());
		objectEClass.getESuperTypes().add(this.getHasLabel());
		objectEClass.getESuperTypes().add(this.getHasName());
		pageEClass.getESuperTypes().add(this.getHasId());
		pageEClass.getESuperTypes().add(this.getHasName());
		pageEClass.getESuperTypes().add(this.getHasLabel());
		petriNetEClass.getESuperTypes().add(this.getHasId());
		petriNetEClass.getESuperTypes().add(this.getHasToolInfo());
		petriNetEClass.getESuperTypes().add(this.getHasLabel());
		petriNetEClass.getESuperTypes().add(this.getHasName());
		placeEClass.getESuperTypes().add(this.getPlaceNode());
		placeNodeEClass.getESuperTypes().add(this.getNode());
		placeNodeEClass.getESuperTypes().add(this.getHLPlaceAddin());
		priorityEClass.getESuperTypes().add(this.getAnnotation());
		refPlaceEClass.getESuperTypes().add(this.getPlaceNode());
		refTransEClass.getESuperTypes().add(this.getTransitionNode());
		sortEClass.getESuperTypes().add(this.getAnnotation());
		timeEClass.getESuperTypes().add(this.getAnnotation());
		transitionEClass.getESuperTypes().add(this.getTransitionNode());
		transitionNodeEClass.getESuperTypes().add(this.getNode());
		transitionNodeEClass.getESuperTypes().add(this.getHLTransitionAddin());
		transitionNodeEClass.getESuperTypes().add(this.getCPNToolsTransitionAddin());

		// Initialize classes and features; add operations and parameters
		initEClass(annotationEClass, Annotation.class, "Annotation", IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);

		initEClass(arcEClass, Arc.class, "Arc", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getArc_Source(), this.getNode(), this.getNode_SourceArc(), "source", null, 1, 1, Arc.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getArc_Target(), this.getNode(), this.getNode_TargetArc(), "target", null, 1, 1, Arc.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getArc_Page(), this.getPage(), this.getPage_Arc(), "page", null, 1, 1, Arc.class, IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(attributeEClass, Attribute.class, "Attribute", IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);

		initEClass(cpnToolsTransitionAddinEClass, CPNToolsTransitionAddin.class, "CPNToolsTransitionAddin", IS_ABSTRACT, IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getCPNToolsTransitionAddin_Code(), this.getCode(), null, "code", null, 0, 1, CPNToolsTransitionAddin.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getCPNToolsTransitionAddin_Time(), this.getTime(), null, "time", null, 0, 1, CPNToolsTransitionAddin.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getCPNToolsTransitionAddin_Priority(), this.getPriority(), null, "priority", null, 0, 1, CPNToolsTransitionAddin.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(codeEClass, Code.class, "Code", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);

		initEClass(conditionEClass, Condition.class, "Condition", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);

		initEClass(fusionGroupEClass, FusionGroup.class, "FusionGroup", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getFusionGroup_PetriNet(), this.getPetriNet(), this.getPetriNet_FusionGroups(), "petriNet", null, 0, 1, FusionGroup.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(hlAnnotationEClass, HLAnnotation.class, "HLAnnotation", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);

		initEClass(hlAnnotationAddinEClass, HLAnnotationAddin.class, "HLAnnotationAddin", IS_ABSTRACT, IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getHLAnnotationAddin_Text(), ecorePackage.getEString(), "text", null, 1, 1, HLAnnotationAddin.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(hlArcAddinEClass, HLArcAddin.class, "HLArcAddin", IS_ABSTRACT, IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getHLArcAddin_Hlinscription(), this.getHLAnnotation(), null, "hlinscription", null, 0, 1, HLArcAddin.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getHLArcAddin_Kind(), this.getHLArcType(), "kind", null, 1, 1, HLArcAddin.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(hlDeclarationEClass, HLDeclaration.class, "HLDeclaration", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getHLDeclaration_Structure(), theDeclarationPackage.getDeclarationStructure(), null, "structure", null, 0, 1, HLDeclaration.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(hlMarkingEClass, HLMarking.class, "HLMarking", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);

		initEClass(hlPlaceAddinEClass, HLPlaceAddin.class, "HLPlaceAddin", IS_ABSTRACT, IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getHLPlaceAddin_Sort(), this.getSort(), null, "sort", null, 0, 1, HLPlaceAddin.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getHLPlaceAddin_InitialMarking(), this.getHLMarking(), null, "initialMarking", null, 0, 1, HLPlaceAddin.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(hlTransitionAddinEClass, HLTransitionAddin.class, "HLTransitionAddin", IS_ABSTRACT, IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getHLTransitionAddin_Condition(), this.getCondition(), null, "condition", null, 0, 1, HLTransitionAddin.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(hasIdEClass, HasId.class, "HasId", IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getHasId_Id(), ecorePackage.getEString(), "id", null, 1, 1, HasId.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(hasLabelEClass, HasLabel.class, "HasLabel", IS_ABSTRACT, IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getHasLabel_Label(), this.getLabel(), this.getLabel_Parent(), "label", null, 0, -1, HasLabel.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(hasNameEClass, HasName.class, "HasName", IS_ABSTRACT, IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getHasName_Name(), this.getName_(), null, "name", null, 0, 1, HasName.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(hasToolInfoEClass, HasToolInfo.class, "HasToolInfo", IS_ABSTRACT, IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getHasToolInfo_Toolinfo(), this.getToolInfo(), this.getToolInfo_Parent(), "toolinfo", null, 0, -1, HasToolInfo.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(instanceEClass, Instance.class, "Instance", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getInstance_ParameterAssignment(), this.getParameterAssignment(), this.getParameterAssignment_Instance(), "parameterAssignment", null, 0, -1, Instance.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getInstance_SubPageID(), ecorePackage.getEString(), "subPageID", null, 0, 1, Instance.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(labelEClass, Label.class, "Label", IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getLabel_Parent(), this.getHasLabel(), this.getHasLabel_Label(), "parent", null, 1, 1, Label.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		addEOperation(labelEClass, ecorePackage.getEString(), "asString", 0, 1, IS_UNIQUE, IS_ORDERED);

		initEClass(nameEClass, Name.class, "Name", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);

		initEClass(nodeEClass, Node.class, "Node", IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getNode_SourceArc(), this.getArc(), this.getArc_Source(), "sourceArc", null, 0, -1, Node.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getNode_TargetArc(), this.getArc(), this.getArc_Target(), "targetArc", null, 0, -1, Node.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(objectEClass, org.cpntools.accesscpn.model.Object.class, "Object", IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getObject_Page(), this.getPage(), this.getPage_Object(), "page", null, 1, 1, org.cpntools.accesscpn.model.Object.class, IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(pageEClass, Page.class, "Page", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getPage_PetriNet(), this.getPetriNet(), this.getPetriNet_Page(), "petriNet", null, 1, 1, Page.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getPage_Object(), this.getObject(), this.getObject_Page(), "object", null, 0, -1, Page.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getPage_Arc(), this.getArc(), this.getArc_Page(), "arc", null, 0, -1, Page.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(parameterAssignmentEClass, ParameterAssignment.class, "ParameterAssignment", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getParameterAssignment_Parameter(), ecorePackage.getEString(), "parameter", null, 0, 1, ParameterAssignment.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getParameterAssignment_Value(), ecorePackage.getEString(), "value", null, 0, 1, ParameterAssignment.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getParameterAssignment_Instance(), this.getInstance(), this.getInstance_ParameterAssignment(), "instance", null, 0, 1, ParameterAssignment.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(petriNetEClass, PetriNet.class, "PetriNet", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getPetriNet_Kind(), ecorePackage.getEString(), "kind", null, 1, 1, PetriNet.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getPetriNet_Page(), this.getPage(), this.getPage_PetriNet(), "page", null, 1, -1, PetriNet.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getPetriNet_Monitors(), theMonitorsPackage.getMonitor(), theMonitorsPackage.getMonitor_PetriNet(), "monitors", null, 0, -1, PetriNet.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getPetriNet_FusionGroups(), this.getFusionGroup(), this.getFusionGroup_PetriNet(), "fusionGroups", null, 0, -1, PetriNet.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getPetriNet_TimeType(), this.getTimeType(), "timeType", null, 1, 1, PetriNet.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(placeEClass, Place.class, "Place", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getPlace_References(), this.getRefPlace(), this.getRefPlace_Ref(), "references", null, 0, -1, Place.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(placeNodeEClass, PlaceNode.class, "PlaceNode", IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);

		initEClass(priorityEClass, Priority.class, "Priority", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);

		initEClass(refPlaceEClass, RefPlace.class, "RefPlace", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getRefPlace_Ref(), this.getPlace(), this.getPlace_References(), "ref", null, 1, 1, RefPlace.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(refTransEClass, RefTrans.class, "RefTrans", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getRefTrans_Ref(), this.getTransitionNode(), null, "ref", null, 1, 1, RefTrans.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(sortEClass, Sort.class, "Sort", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);

		initEClass(timeEClass, Time.class, "Time", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);

		initEClass(toolInfoEClass, ToolInfo.class, "ToolInfo", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getToolInfo_Tool(), ecorePackage.getEString(), "tool", null, 1, 1, ToolInfo.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getToolInfo_Version(), ecorePackage.getEString(), "version", null, 1, 1, ToolInfo.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getToolInfo_Parent(), this.getHasToolInfo(), this.getHasToolInfo_Toolinfo(), "parent", null, 1, 1, ToolInfo.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(transitionEClass, Transition.class, "Transition", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);

		initEClass(transitionNodeEClass, TransitionNode.class, "TransitionNode", IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);

		// Initialize enums and add enum literals
		initEEnum(hlArcTypeEEnum, HLArcType.class, "HLArcType");
		addEEnumLiteral(hlArcTypeEEnum, HLArcType.NORMAL);
		addEEnumLiteral(hlArcTypeEEnum, HLArcType.TEST);
		addEEnumLiteral(hlArcTypeEEnum, HLArcType.INHIBITOR);
		addEEnumLiteral(hlArcTypeEEnum, HLArcType.RESET);

		initEEnum(timeTypeEEnum, TimeType.class, "TimeType");
		addEEnumLiteral(timeTypeEEnum, TimeType.INTEGER);
		addEEnumLiteral(timeTypeEEnum, TimeType.REAL);

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
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.AnnotationImpl <em>Annotation</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.AnnotationImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getAnnotation()
		 * @generated
		 */
		public static final EClass ANNOTATION = eINSTANCE.getAnnotation();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.ArcImpl <em>Arc</em>}' class. <!--
		 * begin-user-doc --> <!-- end-user-doc -->
		 * 
		 * @see org.cpntools.accesscpn.model.impl.ArcImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getArc()
		 * @generated
		 */
		public static final EClass ARC = eINSTANCE.getArc();

		/**
		 * The meta object literal for the '<em><b>Source</b></em>' reference feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EReference ARC__SOURCE = eINSTANCE.getArc_Source();

		/**
		 * The meta object literal for the '<em><b>Target</b></em>' reference feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EReference ARC__TARGET = eINSTANCE.getArc_Target();

		/**
		 * The meta object literal for the '<em><b>Page</b></em>' container reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference ARC__PAGE = eINSTANCE.getArc_Page();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.AttributeImpl <em>Attribute</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.AttributeImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getAttribute()
		 * @generated
		 */
		public static final EClass ATTRIBUTE = eINSTANCE.getAttribute();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.HasIdImpl <em>Has Id</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.HasIdImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHasId()
		 * @generated
		 */
		public static final EClass HAS_ID = eINSTANCE.getHasId();

		/**
		 * The meta object literal for the '<em><b>Id</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute HAS_ID__ID = eINSTANCE.getHasId_Id();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.HasLabel <em>Has Label</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.HasLabel
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHasLabel()
		 * @generated
		 */
		public static final EClass HAS_LABEL = eINSTANCE.getHasLabel();

		/**
		 * The meta object literal for the '<em><b>Label</b></em>' containment reference list feature. <!--
		 * begin-user-doc --> <!-- end-user-doc -->
		 * 
		 * @generated
		 */
		public static final EReference HAS_LABEL__LABEL = eINSTANCE.getHasLabel_Label();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.HasName <em>Has Name</em>}' class. <!--
		 * begin-user-doc --> <!-- end-user-doc -->
		 * 
		 * @see org.cpntools.accesscpn.model.HasName
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHasName()
		 * @generated
		 */
		public static final EClass HAS_NAME = eINSTANCE.getHasName();

		/**
		 * The meta object literal for the '<em><b>Name</b></em>' reference feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EReference HAS_NAME__NAME = eINSTANCE.getHasName_Name();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.HasToolInfo <em>Has Tool Info</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.HasToolInfo
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHasToolInfo()
		 * @generated
		 */
		public static final EClass HAS_TOOL_INFO = eINSTANCE.getHasToolInfo();

		/**
		 * The meta object literal for the '<em><b>Toolinfo</b></em>' containment reference list feature. <!--
		 * begin-user-doc --> <!-- end-user-doc -->
		 * 
		 * @generated
		 */
		public static final EReference HAS_TOOL_INFO__TOOLINFO = eINSTANCE.getHasToolInfo_Toolinfo();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.LabelImpl <em>Label</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.LabelImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getLabel()
		 * @generated
		 */
		public static final EClass LABEL = eINSTANCE.getLabel();

		/**
		 * The meta object literal for the '<em><b>Parent</b></em>' container reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference LABEL__PARENT = eINSTANCE.getLabel_Parent();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.NameImpl <em>Name</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.NameImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getName_()
		 * @generated
		 */
		public static final EClass NAME = eINSTANCE.getName_();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.NodeImpl <em>Node</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.NodeImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getNode()
		 * @generated
		 */
		public static final EClass NODE = eINSTANCE.getNode();

		/**
		 * The meta object literal for the '<em><b>Source Arc</b></em>' reference list feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference NODE__SOURCE_ARC = eINSTANCE.getNode_SourceArc();

		/**
		 * The meta object literal for the '<em><b>Target Arc</b></em>' reference list feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference NODE__TARGET_ARC = eINSTANCE.getNode_TargetArc();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.ObjectImpl <em>Object</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.ObjectImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getObject()
		 * @generated
		 */
		public static final EClass OBJECT = eINSTANCE.getObject();

		/**
		 * The meta object literal for the '<em><b>Page</b></em>' container reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference OBJECT__PAGE = eINSTANCE.getObject_Page();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.PageImpl <em>Page</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.PageImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getPage()
		 * @generated
		 */
		public static final EClass PAGE = eINSTANCE.getPage();

		/**
		 * The meta object literal for the '<em><b>Petri Net</b></em>' container reference feature.
		 * <!-- begin-user-doc
		 * --> <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference PAGE__PETRI_NET = eINSTANCE.getPage_PetriNet();

		/**
		 * The meta object literal for the '<em><b>Object</b></em>' containment reference list feature. <!--
		 * begin-user-doc --> <!-- end-user-doc -->
		 * 
		 * @generated
		 */
		public static final EReference PAGE__OBJECT = eINSTANCE.getPage_Object();

		/**
		 * The meta object literal for the '<em><b>Arc</b></em>' containment reference list feature.
		 * <!-- begin-user-doc
		 * --> <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference PAGE__ARC = eINSTANCE.getPage_Arc();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.PetriNetImpl <em>Petri Net</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.PetriNetImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getPetriNet()
		 * @generated
		 */
		public static final EClass PETRI_NET = eINSTANCE.getPetriNet();

		/**
		 * The meta object literal for the '<em><b>Page</b></em>' containment reference list feature. <!--
		 * begin-user-doc --> <!-- end-user-doc -->
		 * 
		 * @generated
		 */
		public static final EReference PETRI_NET__PAGE = eINSTANCE.getPetriNet_Page();

		/**
		 * The meta object literal for the '<em><b>Monitors</b></em>' containment reference list feature. <!--
		 * begin-user-doc --> <!-- end-user-doc -->
		 * 
		 * @generated
		 */
		public static final EReference PETRI_NET__MONITORS = eINSTANCE.getPetriNet_Monitors();

		/**
		 * The meta object literal for the '<em><b>Fusion Groups</b></em>' reference list feature.
		 * <!-- begin-user-doc
		 * --> <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference PETRI_NET__FUSION_GROUPS = eINSTANCE.getPetriNet_FusionGroups();

		/**
		 * The meta object literal for the '<em><b>Time Type</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute PETRI_NET__TIME_TYPE = eINSTANCE.getPetriNet_TimeType();

		/**
		 * The meta object literal for the '<em><b>Kind</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute PETRI_NET__KIND = eINSTANCE.getPetriNet_Kind();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.PlaceImpl <em>Place</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.PlaceImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getPlace()
		 * @generated
		 */
		public static final EClass PLACE = eINSTANCE.getPlace();

		/**
		 * The meta object literal for the '<em><b>References</b></em>' reference list feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference PLACE__REFERENCES = eINSTANCE.getPlace_References();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.PlaceNodeImpl <em>Place Node</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.PlaceNodeImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getPlaceNode()
		 * @generated
		 */
		public static final EClass PLACE_NODE = eINSTANCE.getPlaceNode();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.RefPlaceImpl <em>Ref Place</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.RefPlaceImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getRefPlace()
		 * @generated
		 */
		public static final EClass REF_PLACE = eINSTANCE.getRefPlace();

		/**
		 * The meta object literal for the '<em><b>Ref</b></em>' reference feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EReference REF_PLACE__REF = eINSTANCE.getRefPlace_Ref();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.RefTransImpl <em>Ref Trans</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.RefTransImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getRefTrans()
		 * @generated
		 */
		public static final EClass REF_TRANS = eINSTANCE.getRefTrans();

		/**
		 * The meta object literal for the '<em><b>Ref</b></em>' reference feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EReference REF_TRANS__REF = eINSTANCE.getRefTrans_Ref();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.ToolInfoImpl <em>Tool Info</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.ToolInfoImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getToolInfo()
		 * @generated
		 */
		public static final EClass TOOL_INFO = eINSTANCE.getToolInfo();

		/**
		 * The meta object literal for the '<em><b>Tool</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute TOOL_INFO__TOOL = eINSTANCE.getToolInfo_Tool();

		/**
		 * The meta object literal for the '<em><b>Version</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute TOOL_INFO__VERSION = eINSTANCE.getToolInfo_Version();

		/**
		 * The meta object literal for the '<em><b>Parent</b></em>' container reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference TOOL_INFO__PARENT = eINSTANCE.getToolInfo_Parent();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.TransitionImpl <em>Transition</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.TransitionImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getTransition()
		 * @generated
		 */
		public static final EClass TRANSITION = eINSTANCE.getTransition();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.TransitionNodeImpl <em>Transition Node</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.TransitionNodeImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getTransitionNode()
		 * @generated
		 */
		public static final EClass TRANSITION_NODE = eINSTANCE.getTransitionNode();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.HLMarkingImpl <em>HL Marking</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.HLMarkingImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHLMarking()
		 * @generated
		 */
		public static final EClass HL_MARKING = eINSTANCE.getHLMarking();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.HLPlaceAddin <em>HL Place Addin</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.HLPlaceAddin
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHLPlaceAddin()
		 * @generated
		 */
		public static final EClass HL_PLACE_ADDIN = eINSTANCE.getHLPlaceAddin();

		/**
		 * The meta object literal for the '<em><b>Initial Marking</b></em>' reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference HL_PLACE_ADDIN__INITIAL_MARKING = eINSTANCE.getHLPlaceAddin_InitialMarking();

		/**
		 * The meta object literal for the '<em><b>Sort</b></em>' reference feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EReference HL_PLACE_ADDIN__SORT = eINSTANCE.getHLPlaceAddin_Sort();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.HLAnnotationAddin <em>HL Annotation Addin</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.HLAnnotationAddin
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHLAnnotationAddin()
		 * @generated
		 */
		public static final EClass HL_ANNOTATION_ADDIN = eINSTANCE.getHLAnnotationAddin();

		/**
		 * The meta object literal for the '<em><b>Text</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute HL_ANNOTATION_ADDIN__TEXT = eINSTANCE.getHLAnnotationAddin_Text();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.HLArcAddin <em>HL Arc Addin</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.HLArcAddin
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHLArcAddin()
		 * @generated
		 */
		public static final EClass HL_ARC_ADDIN = eINSTANCE.getHLArcAddin();

		/**
		 * The meta object literal for the '<em><b>Hlinscription</b></em>' reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference HL_ARC_ADDIN__HLINSCRIPTION = eINSTANCE.getHLArcAddin_Hlinscription();

		/**
		 * The meta object literal for the '<em><b>Kind</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute HL_ARC_ADDIN__KIND = eINSTANCE.getHLArcAddin_Kind();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.HLAnnotationImpl <em>HL Annotation</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.HLAnnotationImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHLAnnotation()
		 * @generated
		 */
		public static final EClass HL_ANNOTATION = eINSTANCE.getHLAnnotation();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.ConditionImpl <em>Condition</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.ConditionImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getCondition()
		 * @generated
		 */
		public static final EClass CONDITION = eINSTANCE.getCondition();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.HLTransitionAddin <em>HL Transition Addin</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.HLTransitionAddin
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHLTransitionAddin()
		 * @generated
		 */
		public static final EClass HL_TRANSITION_ADDIN = eINSTANCE.getHLTransitionAddin();

		/**
		 * The meta object literal for the '<em><b>Condition</b></em>' reference feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EReference HL_TRANSITION_ADDIN__CONDITION = eINSTANCE.getHLTransitionAddin_Condition();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.CPNToolsTransitionAddin <em>CPN Tools Transition Addin</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.CPNToolsTransitionAddin
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getCPNToolsTransitionAddin()
		 * @generated
		 */
		public static final EClass CPN_TOOLS_TRANSITION_ADDIN = eINSTANCE.getCPNToolsTransitionAddin();

		/**
		 * The meta object literal for the '<em><b>Code</b></em>' reference feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EReference CPN_TOOLS_TRANSITION_ADDIN__CODE = eINSTANCE.getCPNToolsTransitionAddin_Code();

		/**
		 * The meta object literal for the '<em><b>Time</b></em>' reference feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EReference CPN_TOOLS_TRANSITION_ADDIN__TIME = eINSTANCE.getCPNToolsTransitionAddin_Time();

		/**
		 * The meta object literal for the '<em><b>Priority</b></em>' reference feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EReference CPN_TOOLS_TRANSITION_ADDIN__PRIORITY = eINSTANCE.getCPNToolsTransitionAddin_Priority();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.CodeImpl <em>Code</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.CodeImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getCode()
		 * @generated
		 */
		public static final EClass CODE = eINSTANCE.getCode();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.TimeImpl <em>Time</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.TimeImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getTime()
		 * @generated
		 */
		public static final EClass TIME = eINSTANCE.getTime();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.HLDeclarationImpl <em>HL Declaration</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.HLDeclarationImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHLDeclaration()
		 * @generated
		 */
		public static final EClass HL_DECLARATION = eINSTANCE.getHLDeclaration();

		/**
		 * The meta object literal for the '<em><b>Structure</b></em>' containment reference feature. <!--
		 * begin-user-doc --> <!-- end-user-doc -->
		 * 
		 * @generated
		 */
		public static final EReference HL_DECLARATION__STRUCTURE = eINSTANCE.getHLDeclaration_Structure();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.InstanceImpl <em>Instance</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.InstanceImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getInstance()
		 * @generated
		 */
		public static final EClass INSTANCE = eINSTANCE.getInstance();

		/**
		 * The meta object literal for the '<em><b>Parameter Assignment</b></em>' containment reference list feature.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference INSTANCE__PARAMETER_ASSIGNMENT = eINSTANCE.getInstance_ParameterAssignment();

		/**
		 * The meta object literal for the '<em><b>Sub Page ID</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute INSTANCE__SUB_PAGE_ID = eINSTANCE.getInstance_SubPageID();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.ParameterAssignmentImpl <em>Parameter Assignment</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.ParameterAssignmentImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getParameterAssignment()
		 * @generated
		 */
		public static final EClass PARAMETER_ASSIGNMENT = eINSTANCE.getParameterAssignment();

		/**
		 * The meta object literal for the '<em><b>Parameter</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute PARAMETER_ASSIGNMENT__PARAMETER = eINSTANCE.getParameterAssignment_Parameter();

		/**
		 * The meta object literal for the '<em><b>Value</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute PARAMETER_ASSIGNMENT__VALUE = eINSTANCE.getParameterAssignment_Value();

		/**
		 * The meta object literal for the '<em><b>Instance</b></em>' container reference feature.
		 * <!-- begin-user-doc
		 * --> <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference PARAMETER_ASSIGNMENT__INSTANCE = eINSTANCE.getParameterAssignment_Instance();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.FusionGroupImpl <em>Fusion Group</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.FusionGroupImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getFusionGroup()
		 * @generated
		 */
		public static final EClass FUSION_GROUP = eINSTANCE.getFusionGroup();

		/**
		 * The meta object literal for the '<em><b>Petri Net</b></em>' reference feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EReference FUSION_GROUP__PETRI_NET = eINSTANCE.getFusionGroup_PetriNet();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.PriorityImpl <em>Priority</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.PriorityImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getPriority()
		 * @generated
		 */
		public static final EClass PRIORITY = eINSTANCE.getPriority();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.impl.SortImpl <em>Sort</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.impl.SortImpl
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getSort()
		 * @generated
		 */
		public static final EClass SORT = eINSTANCE.getSort();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.HLArcType <em>HL Arc Type</em>}' enum.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.HLArcType
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getHLArcType()
		 * @generated
		 */
		public static final EEnum HL_ARC_TYPE = eINSTANCE.getHLArcType();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.TimeType <em>Time Type</em>}' enum. <!--
		 * begin-user-doc --> <!-- end-user-doc -->
		 * 
		 * @see org.cpntools.accesscpn.model.TimeType
		 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl#getTimeType()
		 * @generated
		 */
		public static final EEnum TIME_TYPE = eINSTANCE.getTimeType();

	}

} // ModelPackageImpl
