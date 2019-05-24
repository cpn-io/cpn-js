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
package org.cpntools.accesscpn.model.graphics.impl;

import org.cpntools.accesscpn.model.auxgraphics.impl.AuxgraphicsPackageImpl;
import org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl;
import org.cpntools.accesscpn.model.declaration.impl.DeclarationPackageImpl;
import org.cpntools.accesscpn.model.graphics.Align;
import org.cpntools.accesscpn.model.graphics.AnnotationGraphics;
import org.cpntools.accesscpn.model.graphics.ArcGraphics;
import org.cpntools.accesscpn.model.graphics.Coordinate;
import org.cpntools.accesscpn.model.graphics.Decoration;
import org.cpntools.accesscpn.model.graphics.Fill;
import org.cpntools.accesscpn.model.graphics.Font;
import org.cpntools.accesscpn.model.graphics.Graphics;
import org.cpntools.accesscpn.model.graphics.GraphicsFactory;
import org.cpntools.accesscpn.model.graphics.HasGraphics;
import org.cpntools.accesscpn.model.graphics.Line;
import org.cpntools.accesscpn.model.graphics.NodeGraphics;
import org.cpntools.accesscpn.model.graphics.Rotation;
import org.cpntools.accesscpn.model.graphics.Shape;
import org.cpntools.accesscpn.model.graphics.Style;
import org.cpntools.accesscpn.model.impl.ModelPackageImpl;
import org.cpntools.accesscpn.model.monitors.impl.MonitorsPackageImpl;
import org.eclipse.emf.ecore.EAttribute;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EDataType;
import org.eclipse.emf.ecore.EEnum;
import org.eclipse.emf.ecore.EFactory;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.EReference;
import org.eclipse.emf.ecore.impl.EPackageImpl;

/**
 * <!-- begin-user-doc --> An implementation of the model <b>Package</b>. <!-- end-user-doc -->
 * @see org.cpntools.accesscpn.model.graphics.GraphicsFactory
 * @model kind="package"
 * @generated
 */
public class GraphicsPackageImpl extends EPackageImpl {
	/**
	 * The package name.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public static final String eNAME = "graphics";

	/**
	 * The package namespace URI.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public static final String eNS_URI = "http:///org/cpntools/accesscpn/model/graphics.ecore";

	/**
	 * The package namespace name.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public static final String eNS_PREFIX = "org.cpntools.accesscpn.model.graphics";

	/**
	 * The singleton instance of the package.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public static final GraphicsPackageImpl eINSTANCE = org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl.init();

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.graphics.impl.GraphicsImpl <em>Graphics</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsImpl
	 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getGraphics()
	 * @generated
	 */
	public static final int GRAPHICS = 5;

	/**
	 * The feature id for the '<em><b>Parent</b></em>' container reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int GRAPHICS__PARENT = 0;

	/**
	 * The number of structural features of the '<em>Graphics</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int GRAPHICS_FEATURE_COUNT = 1;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.graphics.impl.AnnotationGraphicsImpl <em>Annotation Graphics</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.graphics.impl.AnnotationGraphicsImpl
	 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getAnnotationGraphics()
	 * @generated
	 */
	public static final int ANNOTATION_GRAPHICS = 0;

	/**
	 * The feature id for the '<em><b>Parent</b></em>' container reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int ANNOTATION_GRAPHICS__PARENT = GRAPHICS__PARENT;

	/**
	 * The feature id for the '<em><b>Fill</b></em>' containment reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int ANNOTATION_GRAPHICS__FILL = GRAPHICS_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Offset</b></em>' containment reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int ANNOTATION_GRAPHICS__OFFSET = GRAPHICS_FEATURE_COUNT + 1;

	/**
	 * The feature id for the '<em><b>Line</b></em>' containment reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int ANNOTATION_GRAPHICS__LINE = GRAPHICS_FEATURE_COUNT + 2;

	/**
	 * The feature id for the '<em><b>Font</b></em>' containment reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int ANNOTATION_GRAPHICS__FONT = GRAPHICS_FEATURE_COUNT + 3;

	/**
	 * The number of structural features of the '<em>Annotation Graphics</em>' class.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int ANNOTATION_GRAPHICS_FEATURE_COUNT = GRAPHICS_FEATURE_COUNT + 4;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.graphics.impl.ArcGraphicsImpl <em>Arc Graphics</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.graphics.impl.ArcGraphicsImpl
	 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getArcGraphics()
	 * @generated
	 */
	public static final int ARC_GRAPHICS = 1;

	/**
	 * The feature id for the '<em><b>Parent</b></em>' container reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int ARC_GRAPHICS__PARENT = GRAPHICS__PARENT;

	/**
	 * The feature id for the '<em><b>Line</b></em>' containment reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int ARC_GRAPHICS__LINE = GRAPHICS_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Position</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int ARC_GRAPHICS__POSITION = GRAPHICS_FEATURE_COUNT + 1;

	/**
	 * The number of structural features of the '<em>Arc Graphics</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int ARC_GRAPHICS_FEATURE_COUNT = GRAPHICS_FEATURE_COUNT + 2;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.graphics.impl.CoordinateImpl <em>Coordinate</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.graphics.impl.CoordinateImpl
	 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getCoordinate()
	 * @generated
	 */
	public static final int COORDINATE = 2;

	/**
	 * The feature id for the '<em><b>X</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int COORDINATE__X = 0;

	/**
	 * The feature id for the '<em><b>Y</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int COORDINATE__Y = 1;

	/**
	 * The number of structural features of the '<em>Coordinate</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int COORDINATE_FEATURE_COUNT = 2;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.graphics.impl.FillImpl <em>Fill</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.graphics.impl.FillImpl
	 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getFill()
	 * @generated
	 */
	public static final int FILL = 3;

	/**
	 * The feature id for the '<em><b>Color</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FILL__COLOR = 0;

	/**
	 * The feature id for the '<em><b>Image</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FILL__IMAGE = 1;

	/**
	 * The feature id for the '<em><b>Gradient Color</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FILL__GRADIENT_COLOR = 2;

	/**
	 * The feature id for the '<em><b>Gradient Rotation</b></em>' attribute. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int FILL__GRADIENT_ROTATION = 3;

	/**
	 * The number of structural features of the '<em>Fill</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FILL_FEATURE_COUNT = 4;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.graphics.impl.FontImpl <em>Font</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.graphics.impl.FontImpl
	 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getFont()
	 * @generated
	 */
	public static final int FONT = 4;

	/**
	 * The feature id for the '<em><b>Family</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FONT__FAMILY = 0;

	/**
	 * The feature id for the '<em><b>Style</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FONT__STYLE = 1;

	/**
	 * The feature id for the '<em><b>Weight</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FONT__WEIGHT = 2;

	/**
	 * The feature id for the '<em><b>Size</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FONT__SIZE = 3;

	/**
	 * The feature id for the '<em><b>Decoration</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FONT__DECORATION = 4;

	/**
	 * The feature id for the '<em><b>Align</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FONT__ALIGN = 5;

	/**
	 * The feature id for the '<em><b>Rotation</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FONT__ROTATION = 6;

	/**
	 * The number of structural features of the '<em>Font</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int FONT_FEATURE_COUNT = 7;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.graphics.HasGraphics <em>Has Graphics</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.graphics.HasGraphics
	 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getHasGraphics()
	 * @generated
	 */
	public static final int HAS_GRAPHICS = 6;

	/**
	 * The feature id for the '<em><b>Graphics</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int HAS_GRAPHICS__GRAPHICS = 0;

	/**
	 * The number of structural features of the '<em>Has Graphics</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int HAS_GRAPHICS_FEATURE_COUNT = 1;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.graphics.impl.LineImpl <em>Line</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.graphics.impl.LineImpl
	 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getLine()
	 * @generated
	 */
	public static final int LINE = 7;

	/**
	 * The feature id for the '<em><b>Shape</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int LINE__SHAPE = 0;

	/**
	 * The feature id for the '<em><b>Color</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int LINE__COLOR = 1;

	/**
	 * The feature id for the '<em><b>Width</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int LINE__WIDTH = 2;

	/**
	 * The feature id for the '<em><b>Style</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int LINE__STYLE = 3;

	/**
	 * The number of structural features of the '<em>Line</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int LINE_FEATURE_COUNT = 4;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.graphics.impl.NodeGraphicsImpl <em>Node Graphics</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.graphics.impl.NodeGraphicsImpl
	 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getNodeGraphics()
	 * @generated
	 */
	public static final int NODE_GRAPHICS = 8;

	/**
	 * The feature id for the '<em><b>Parent</b></em>' container reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int NODE_GRAPHICS__PARENT = GRAPHICS__PARENT;

	/**
	 * The feature id for the '<em><b>Position</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int NODE_GRAPHICS__POSITION = GRAPHICS_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Dimension</b></em>' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int NODE_GRAPHICS__DIMENSION = GRAPHICS_FEATURE_COUNT + 1;

	/**
	 * The feature id for the '<em><b>Line</b></em>' containment reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int NODE_GRAPHICS__LINE = GRAPHICS_FEATURE_COUNT + 2;

	/**
	 * The feature id for the '<em><b>Fill</b></em>' containment reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int NODE_GRAPHICS__FILL = GRAPHICS_FEATURE_COUNT + 3;

	/**
	 * The number of structural features of the '<em>Node Graphics</em>' class.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int NODE_GRAPHICS_FEATURE_COUNT = GRAPHICS_FEATURE_COUNT + 4;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.graphics.Align <em>Align</em>}' enum. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.cpntools.accesscpn.model.graphics.Align
	 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getAlign()
	 * @generated
	 */
	public static final int ALIGN = 9;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.graphics.Shape <em>Shape</em>}' enum. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.cpntools.accesscpn.model.graphics.Shape
	 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getShape()
	 * @generated
	 */
	public static final int SHAPE = 10;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.graphics.Style <em>Style</em>}' enum. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.cpntools.accesscpn.model.graphics.Style
	 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getStyle()
	 * @generated
	 */
	public static final int STYLE = 11;

	/**
	 * The meta object id for the '<em>CSS2 Color</em>' data type.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see java.lang.String
	 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getCSS2Color()
	 * @generated
	 */
	public static final int CSS2_COLOR = 12;

	/**
	 * The meta object id for the '<em>CSS2 Font Family</em>' data type.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see java.lang.String
	 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getCSS2FontFamily()
	 * @generated
	 */
	public static final int CSS2_FONT_FAMILY = 13;

	/**
	 * The meta object id for the '<em>CSS2 Font Style</em>' data type.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see java.lang.String
	 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getCSS2FontStyle()
	 * @generated
	 */
	public static final int CSS2_FONT_STYLE = 14;

	/**
	 * The meta object id for the '<em>CSS2 Font Weight</em>' data type.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see java.lang.String
	 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getCSS2FontWeight()
	 * @generated
	 */
	public static final int CSS2_FONT_WEIGHT = 15;

	/**
	 * The meta object id for the '<em>CSS2 Font Size</em>' data type.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see java.lang.String
	 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getCSS2FontSize()
	 * @generated
	 */
	public static final int CSS2_FONT_SIZE = 16;

	/**
	 * The meta object id for the '<em>Non Negative Decimal</em>' data type. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getNonNegativeDecimal()
	 * @generated
	 */
	public static final int NON_NEGATIVE_DECIMAL = 17;

	/**
	 * The meta object id for the '<em>URL</em>' data type.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see java.net.URL
	 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getURL()
	 * @generated
	 */
	public static final int URL = 18;

	/**
	 * The meta object id for the '<em>Rotation</em>' data type.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.graphics.Rotation
	 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getRotation()
	 * @generated
	 */
	public static final int ROTATION = 19;

	/**
	 * The meta object id for the '<em>Decoration</em>' data type.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.graphics.Decoration
	 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getDecoration()
	 * @generated
	 */
	public static final int DECORATION = 20;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass annotationGraphicsEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass arcGraphicsEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass coordinateEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass fillEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass fontEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass graphicsEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass hasGraphicsEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass lineEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass nodeGraphicsEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EEnum alignEEnum = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EEnum shapeEEnum = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EEnum styleEEnum = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EDataType css2ColorEDataType = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EDataType css2FontFamilyEDataType = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EDataType css2FontStyleEDataType = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EDataType css2FontWeightEDataType = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EDataType css2FontSizeEDataType = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EDataType nonNegativeDecimalEDataType = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EDataType urlEDataType = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EDataType rotationEDataType = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EDataType decorationEDataType = null;

	/**
	 * Creates an instance of the model <b>Package</b>, registered with {@link org.eclipse.emf.ecore.EPackage.Registry
	 * EPackage.Registry} by the package package URI value.
	 * <p>
	 * Note: the correct way to create the package is via the static factory method {@link #init init()}, which also
	 * performs initialization of the package, or returns the registered package, if one already exists. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.eclipse.emf.ecore.EPackage.Registry
	 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#eNS_URI
	 * @see #init()
	 * @generated
	 */
	private GraphicsPackageImpl() {
		super(eNS_URI, ((EFactory)GraphicsFactory.INSTANCE));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private static boolean isInited = false;

	/**
	 * Creates, registers, and initializes the <b>Package</b> for this model, and for any others upon which it depends.
	 * <p>
	 * This method is used to initialize {@link GraphicsPackageImpl#eINSTANCE} when that field is accessed. Clients
	 * should not invoke it directly. Instead, they should simply access that field to obtain the package. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see #eNS_URI
	 * @see #createPackageContents()
	 * @see #initializePackageContents()
	 * @generated
	 */
	public static GraphicsPackageImpl init() {
		if (isInited) return (GraphicsPackageImpl)EPackage.Registry.INSTANCE.getEPackage(GraphicsPackageImpl.eNS_URI);

		// Obtain or create and register package
		GraphicsPackageImpl theGraphicsPackage = (GraphicsPackageImpl)(EPackage.Registry.INSTANCE.get(eNS_URI) instanceof GraphicsPackageImpl ? EPackage.Registry.INSTANCE.get(eNS_URI) : new GraphicsPackageImpl());

		isInited = true;

		// Obtain or create and register interdependencies
		ModelPackageImpl theModelPackage = (ModelPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(ModelPackageImpl.eNS_URI) instanceof ModelPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(ModelPackageImpl.eNS_URI) : ModelPackageImpl.eINSTANCE);
		AuxgraphicsPackageImpl theAuxgraphicsPackage = (AuxgraphicsPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(AuxgraphicsPackageImpl.eNS_URI) instanceof AuxgraphicsPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(AuxgraphicsPackageImpl.eNS_URI) : AuxgraphicsPackageImpl.eINSTANCE);
		CpntypesPackageImpl theCpntypesPackage = (CpntypesPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(CpntypesPackageImpl.eNS_URI) instanceof CpntypesPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(CpntypesPackageImpl.eNS_URI) : CpntypesPackageImpl.eINSTANCE);
		DeclarationPackageImpl theDeclarationPackage = (DeclarationPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(DeclarationPackageImpl.eNS_URI) instanceof DeclarationPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(DeclarationPackageImpl.eNS_URI) : DeclarationPackageImpl.eINSTANCE);
		MonitorsPackageImpl theMonitorsPackage = (MonitorsPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(MonitorsPackageImpl.eNS_URI) instanceof MonitorsPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(MonitorsPackageImpl.eNS_URI) : MonitorsPackageImpl.eINSTANCE);

		// Create package meta-data objects
		theGraphicsPackage.createPackageContents();
		theModelPackage.createPackageContents();
		theAuxgraphicsPackage.createPackageContents();
		theCpntypesPackage.createPackageContents();
		theDeclarationPackage.createPackageContents();
		theMonitorsPackage.createPackageContents();

		// Initialize created meta-data
		theGraphicsPackage.initializePackageContents();
		theModelPackage.initializePackageContents();
		theAuxgraphicsPackage.initializePackageContents();
		theCpntypesPackage.initializePackageContents();
		theDeclarationPackage.initializePackageContents();
		theMonitorsPackage.initializePackageContents();

		// Mark meta-data to indicate it can't be changed
		theGraphicsPackage.freeze();

  
		// Update the registry and return the package
		EPackage.Registry.INSTANCE.put(GraphicsPackageImpl.eNS_URI, theGraphicsPackage);
		return theGraphicsPackage;
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.graphics.AnnotationGraphics <em>Annotation Graphics</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>Annotation Graphics</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.AnnotationGraphics
	 * @generated
	 */
	public EClass getAnnotationGraphics() {
		return annotationGraphicsEClass;
	}

	/**
	 * Returns the meta object for the containment reference '{@link org.cpntools.accesscpn.model.graphics.AnnotationGraphics#getFill <em>Fill</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference '<em>Fill</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.AnnotationGraphics#getFill()
	 * @see #getAnnotationGraphics()
	 * @generated
	 */
	public EReference getAnnotationGraphics_Fill() {
		return (EReference)annotationGraphicsEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the containment reference '{@link org.cpntools.accesscpn.model.graphics.AnnotationGraphics#getOffset <em>Offset</em>}'.
	 * <!-- begin-user-doc
	 * --> <!-- end-user-doc -->
	 * @return the meta object for the containment reference '<em>Offset</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.AnnotationGraphics#getOffset()
	 * @see #getAnnotationGraphics()
	 * @generated
	 */
	public EReference getAnnotationGraphics_Offset() {
		return (EReference)annotationGraphicsEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for the containment reference '{@link org.cpntools.accesscpn.model.graphics.AnnotationGraphics#getLine <em>Line</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference '<em>Line</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.AnnotationGraphics#getLine()
	 * @see #getAnnotationGraphics()
	 * @generated
	 */
	public EReference getAnnotationGraphics_Line() {
		return (EReference)annotationGraphicsEClass.getEStructuralFeatures().get(2);
	}

	/**
	 * Returns the meta object for the containment reference '{@link org.cpntools.accesscpn.model.graphics.AnnotationGraphics#getFont <em>Font</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference '<em>Font</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.AnnotationGraphics#getFont()
	 * @see #getAnnotationGraphics()
	 * @generated
	 */
	public EReference getAnnotationGraphics_Font() {
		return (EReference)annotationGraphicsEClass.getEStructuralFeatures().get(3);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.graphics.ArcGraphics <em>Arc Graphics</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>Arc Graphics</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.ArcGraphics
	 * @generated
	 */
	public EClass getArcGraphics() {
		return arcGraphicsEClass;
	}

	/**
	 * Returns the meta object for the containment reference '{@link org.cpntools.accesscpn.model.graphics.ArcGraphics#getLine <em>Line</em>}'.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @return the meta object for the containment reference '<em>Line</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.ArcGraphics#getLine()
	 * @see #getArcGraphics()
	 * @generated
	 */
	public EReference getArcGraphics_Line() {
		return (EReference)arcGraphicsEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the containment reference list '{@link org.cpntools.accesscpn.model.graphics.ArcGraphics#getPosition <em>Position</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference list '<em>Position</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.ArcGraphics#getPosition()
	 * @see #getArcGraphics()
	 * @generated
	 */
	public EReference getArcGraphics_Position() {
		return (EReference)arcGraphicsEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.graphics.Coordinate <em>Coordinate</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>Coordinate</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Coordinate
	 * @generated
	 */
	public EClass getCoordinate() {
		return coordinateEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.graphics.Coordinate#getX <em>X</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>X</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Coordinate#getX()
	 * @see #getCoordinate()
	 * @generated
	 */
	public EAttribute getCoordinate_X() {
		return (EAttribute)coordinateEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.graphics.Coordinate#getY <em>Y</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Y</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Coordinate#getY()
	 * @see #getCoordinate()
	 * @generated
	 */
	public EAttribute getCoordinate_Y() {
		return (EAttribute)coordinateEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.graphics.Fill <em>Fill</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>Fill</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Fill
	 * @generated
	 */
	public EClass getFill() {
		return fillEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.graphics.Fill#getColor <em>Color</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Color</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Fill#getColor()
	 * @see #getFill()
	 * @generated
	 */
	public EAttribute getFill_Color() {
		return (EAttribute)fillEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.graphics.Fill#getImage <em>Image</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Image</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Fill#getImage()
	 * @see #getFill()
	 * @generated
	 */
	public EAttribute getFill_Image() {
		return (EAttribute)fillEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.graphics.Fill#getGradientColor <em>Gradient Color</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Gradient Color</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Fill#getGradientColor()
	 * @see #getFill()
	 * @generated
	 */
	public EAttribute getFill_GradientColor() {
		return (EAttribute)fillEClass.getEStructuralFeatures().get(2);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.graphics.Fill#getGradientRotation <em>Gradient Rotation</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Gradient Rotation</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Fill#getGradientRotation()
	 * @see #getFill()
	 * @generated
	 */
	public EAttribute getFill_GradientRotation() {
		return (EAttribute)fillEClass.getEStructuralFeatures().get(3);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.graphics.Font <em>Font</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>Font</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Font
	 * @generated
	 */
	public EClass getFont() {
		return fontEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.graphics.Font#getFamily <em>Family</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Family</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Font#getFamily()
	 * @see #getFont()
	 * @generated
	 */
	public EAttribute getFont_Family() {
		return (EAttribute)fontEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.graphics.Font#getStyle <em>Style</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Style</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Font#getStyle()
	 * @see #getFont()
	 * @generated
	 */
	public EAttribute getFont_Style() {
		return (EAttribute)fontEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.graphics.Font#getWeight <em>Weight</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Weight</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Font#getWeight()
	 * @see #getFont()
	 * @generated
	 */
	public EAttribute getFont_Weight() {
		return (EAttribute)fontEClass.getEStructuralFeatures().get(2);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.graphics.Font#getSize <em>Size</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Size</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Font#getSize()
	 * @see #getFont()
	 * @generated
	 */
	public EAttribute getFont_Size() {
		return (EAttribute)fontEClass.getEStructuralFeatures().get(3);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.graphics.Font#getDecoration <em>Decoration</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Decoration</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Font#getDecoration()
	 * @see #getFont()
	 * @generated
	 */
	public EAttribute getFont_Decoration() {
		return (EAttribute)fontEClass.getEStructuralFeatures().get(4);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.graphics.Font#getAlign <em>Align</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Align</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Font#getAlign()
	 * @see #getFont()
	 * @generated
	 */
	public EAttribute getFont_Align() {
		return (EAttribute)fontEClass.getEStructuralFeatures().get(5);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.graphics.Font#getRotation <em>Rotation</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Rotation</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Font#getRotation()
	 * @see #getFont()
	 * @generated
	 */
	public EAttribute getFont_Rotation() {
		return (EAttribute)fontEClass.getEStructuralFeatures().get(6);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.graphics.Graphics <em>Graphics</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>Graphics</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Graphics
	 * @generated
	 */
	public EClass getGraphics() {
		return graphicsEClass;
	}

	/**
	 * Returns the meta object for the container reference '{@link org.cpntools.accesscpn.model.graphics.Graphics#getParent <em>Parent</em>}'.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @return the meta object for the container reference '<em>Parent</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Graphics#getParent()
	 * @see #getGraphics()
	 * @generated
	 */
	public EReference getGraphics_Parent() {
		return (EReference)graphicsEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.graphics.HasGraphics <em>Has Graphics</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>Has Graphics</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.HasGraphics
	 * @generated
	 */
	public EClass getHasGraphics() {
		return hasGraphicsEClass;
	}

	/**
	 * Returns the meta object for the containment reference '{@link org.cpntools.accesscpn.model.graphics.HasGraphics#getGraphics <em>Graphics</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the containment reference '<em>Graphics</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.HasGraphics#getGraphics()
	 * @see #getHasGraphics()
	 * @generated
	 */
	public EReference getHasGraphics_Graphics() {
		return (EReference)hasGraphicsEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.graphics.Line <em>Line</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>Line</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Line
	 * @generated
	 */
	public EClass getLine() {
		return lineEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.graphics.Line#getShape <em>Shape</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Shape</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Line#getShape()
	 * @see #getLine()
	 * @generated
	 */
	public EAttribute getLine_Shape() {
		return (EAttribute)lineEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.graphics.Line#getColor <em>Color</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Color</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Line#getColor()
	 * @see #getLine()
	 * @generated
	 */
	public EAttribute getLine_Color() {
		return (EAttribute)lineEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.graphics.Line#getWidth <em>Width</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Width</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Line#getWidth()
	 * @see #getLine()
	 * @generated
	 */
	public EAttribute getLine_Width() {
		return (EAttribute)lineEClass.getEStructuralFeatures().get(2);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.graphics.Line#getStyle <em>Style</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Style</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Line#getStyle()
	 * @see #getLine()
	 * @generated
	 */
	public EAttribute getLine_Style() {
		return (EAttribute)lineEClass.getEStructuralFeatures().get(3);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.graphics.NodeGraphics <em>Node Graphics</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>Node Graphics</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.NodeGraphics
	 * @generated
	 */
	public EClass getNodeGraphics() {
		return nodeGraphicsEClass;
	}

	/**
	 * Returns the meta object for the containment reference '{@link org.cpntools.accesscpn.model.graphics.NodeGraphics#getPosition <em>Position</em>}'.
	 * <!-- begin-user-doc
	 * --> <!-- end-user-doc -->
	 * @return the meta object for the containment reference '<em>Position</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.NodeGraphics#getPosition()
	 * @see #getNodeGraphics()
	 * @generated
	 */
	public EReference getNodeGraphics_Position() {
		return (EReference)nodeGraphicsEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the containment reference '{@link org.cpntools.accesscpn.model.graphics.NodeGraphics#getDimension <em>Dimension</em>}'.
	 * <!-- begin-user-doc
	 * --> <!-- end-user-doc -->
	 * @return the meta object for the containment reference '<em>Dimension</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.NodeGraphics#getDimension()
	 * @see #getNodeGraphics()
	 * @generated
	 */
	public EReference getNodeGraphics_Dimension() {
		return (EReference)nodeGraphicsEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for the containment reference '{@link org.cpntools.accesscpn.model.graphics.NodeGraphics#getLine <em>Line</em>}'.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @return the meta object for the containment reference '<em>Line</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.NodeGraphics#getLine()
	 * @see #getNodeGraphics()
	 * @generated
	 */
	public EReference getNodeGraphics_Line() {
		return (EReference)nodeGraphicsEClass.getEStructuralFeatures().get(2);
	}

	/**
	 * Returns the meta object for the containment reference '{@link org.cpntools.accesscpn.model.graphics.NodeGraphics#getFill <em>Fill</em>}'.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @return the meta object for the containment reference '<em>Fill</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.NodeGraphics#getFill()
	 * @see #getNodeGraphics()
	 * @generated
	 */
	public EReference getNodeGraphics_Fill() {
		return (EReference)nodeGraphicsEClass.getEStructuralFeatures().get(3);
	}

	/**
	 * Returns the meta object for enum '{@link org.cpntools.accesscpn.model.graphics.Align <em>Align</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for enum '<em>Align</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Align
	 * @generated
	 */
	public EEnum getAlign() {
		return alignEEnum;
	}

	/**
	 * Returns the meta object for enum '{@link org.cpntools.accesscpn.model.graphics.Shape <em>Shape</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for enum '<em>Shape</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Shape
	 * @generated
	 */
	public EEnum getShape() {
		return shapeEEnum;
	}

	/**
	 * Returns the meta object for enum '{@link org.cpntools.accesscpn.model.graphics.Style <em>Style</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for enum '<em>Style</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Style
	 * @generated
	 */
	public EEnum getStyle() {
		return styleEEnum;
	}

	/**
	 * Returns the meta object for data type '{@link java.lang.String <em>CSS2 Color</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for data type '<em>CSS2 Color</em>'.
	 * @see java.lang.String
	 * @model instanceClass="java.lang.String"
	 * @generated
	 */
	public EDataType getCSS2Color() {
		return css2ColorEDataType;
	}

	/**
	 * Returns the meta object for data type '{@link java.lang.String <em>CSS2 Font Family</em>}'.
	 * <!-- begin-user-doc
	 * --> <!-- end-user-doc -->
	 * @return the meta object for data type '<em>CSS2 Font Family</em>'.
	 * @see java.lang.String
	 * @model instanceClass="java.lang.String"
	 * @generated
	 */
	public EDataType getCSS2FontFamily() {
		return css2FontFamilyEDataType;
	}

	/**
	 * Returns the meta object for data type '{@link java.lang.String <em>CSS2 Font Style</em>}'.
	 * <!-- begin-user-doc
	 * --> <!-- end-user-doc -->
	 * @return the meta object for data type '<em>CSS2 Font Style</em>'.
	 * @see java.lang.String
	 * @model instanceClass="java.lang.String"
	 * @generated
	 */
	public EDataType getCSS2FontStyle() {
		return css2FontStyleEDataType;
	}

	/**
	 * Returns the meta object for data type '{@link java.lang.String <em>CSS2 Font Weight</em>}'.
	 * <!-- begin-user-doc
	 * --> <!-- end-user-doc -->
	 * @return the meta object for data type '<em>CSS2 Font Weight</em>'.
	 * @see java.lang.String
	 * @model instanceClass="java.lang.String"
	 * @generated
	 */
	public EDataType getCSS2FontWeight() {
		return css2FontWeightEDataType;
	}

	/**
	 * Returns the meta object for data type '{@link java.lang.String <em>CSS2 Font Size</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for data type '<em>CSS2 Font Size</em>'.
	 * @see java.lang.String
	 * @model instanceClass="java.lang.String"
	 * @generated
	 */
	public EDataType getCSS2FontSize() {
		return css2FontSizeEDataType;
	}

	/**
	 * Returns the meta object for data type '<em>Non Negative Decimal</em>'. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @return the meta object for data type '<em>Non Negative Decimal</em>'.
	 * @model instanceClass="double"
	 * @generated
	 */
	public EDataType getNonNegativeDecimal() {
		return nonNegativeDecimalEDataType;
	}

	/**
	 * Returns the meta object for data type '{@link java.net.URL <em>URL</em>}'.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @return the meta object for data type '<em>URL</em>'.
	 * @see java.net.URL
	 * @model instanceClass="java.net.URL"
	 * @generated
	 */
	public EDataType getURL() {
		return urlEDataType;
	}

	/**
	 * Returns the meta object for data type '{@link org.cpntools.accesscpn.model.graphics.Rotation <em>Rotation</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for data type '<em>Rotation</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Rotation
	 * @model instanceClass="org.cpntools.accesscpn.model.graphics.Rotation"
	 * @generated
	 */
	public EDataType getRotation() {
		return rotationEDataType;
	}

	/**
	 * Returns the meta object for data type '{@link org.cpntools.accesscpn.model.graphics.Decoration <em>Decoration</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for data type '<em>Decoration</em>'.
	 * @see org.cpntools.accesscpn.model.graphics.Decoration
	 * @model instanceClass="org.cpntools.accesscpn.model.graphics.Decoration"
	 * @generated
	 */
	public EDataType getDecoration() {
		return decorationEDataType;
	}

	/**
	 * Returns the factory that creates the instances of the model.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the factory that creates the instances of the model.
	 * @generated
	 */
	public GraphicsFactory getGraphicsFactory() {
		return (GraphicsFactory)getEFactoryInstance();
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
		annotationGraphicsEClass = createEClass(ANNOTATION_GRAPHICS);
		createEReference(annotationGraphicsEClass, ANNOTATION_GRAPHICS__FILL);
		createEReference(annotationGraphicsEClass, ANNOTATION_GRAPHICS__OFFSET);
		createEReference(annotationGraphicsEClass, ANNOTATION_GRAPHICS__LINE);
		createEReference(annotationGraphicsEClass, ANNOTATION_GRAPHICS__FONT);

		arcGraphicsEClass = createEClass(ARC_GRAPHICS);
		createEReference(arcGraphicsEClass, ARC_GRAPHICS__LINE);
		createEReference(arcGraphicsEClass, ARC_GRAPHICS__POSITION);

		coordinateEClass = createEClass(COORDINATE);
		createEAttribute(coordinateEClass, COORDINATE__X);
		createEAttribute(coordinateEClass, COORDINATE__Y);

		fillEClass = createEClass(FILL);
		createEAttribute(fillEClass, FILL__COLOR);
		createEAttribute(fillEClass, FILL__IMAGE);
		createEAttribute(fillEClass, FILL__GRADIENT_COLOR);
		createEAttribute(fillEClass, FILL__GRADIENT_ROTATION);

		fontEClass = createEClass(FONT);
		createEAttribute(fontEClass, FONT__FAMILY);
		createEAttribute(fontEClass, FONT__STYLE);
		createEAttribute(fontEClass, FONT__WEIGHT);
		createEAttribute(fontEClass, FONT__SIZE);
		createEAttribute(fontEClass, FONT__DECORATION);
		createEAttribute(fontEClass, FONT__ALIGN);
		createEAttribute(fontEClass, FONT__ROTATION);

		graphicsEClass = createEClass(GRAPHICS);
		createEReference(graphicsEClass, GRAPHICS__PARENT);

		hasGraphicsEClass = createEClass(HAS_GRAPHICS);
		createEReference(hasGraphicsEClass, HAS_GRAPHICS__GRAPHICS);

		lineEClass = createEClass(LINE);
		createEAttribute(lineEClass, LINE__SHAPE);
		createEAttribute(lineEClass, LINE__COLOR);
		createEAttribute(lineEClass, LINE__WIDTH);
		createEAttribute(lineEClass, LINE__STYLE);

		nodeGraphicsEClass = createEClass(NODE_GRAPHICS);
		createEReference(nodeGraphicsEClass, NODE_GRAPHICS__POSITION);
		createEReference(nodeGraphicsEClass, NODE_GRAPHICS__DIMENSION);
		createEReference(nodeGraphicsEClass, NODE_GRAPHICS__LINE);
		createEReference(nodeGraphicsEClass, NODE_GRAPHICS__FILL);

		// Create enums
		alignEEnum = createEEnum(ALIGN);
		shapeEEnum = createEEnum(SHAPE);
		styleEEnum = createEEnum(STYLE);

		// Create data types
		css2ColorEDataType = createEDataType(CSS2_COLOR);
		css2FontFamilyEDataType = createEDataType(CSS2_FONT_FAMILY);
		css2FontStyleEDataType = createEDataType(CSS2_FONT_STYLE);
		css2FontWeightEDataType = createEDataType(CSS2_FONT_WEIGHT);
		css2FontSizeEDataType = createEDataType(CSS2_FONT_SIZE);
		nonNegativeDecimalEDataType = createEDataType(NON_NEGATIVE_DECIMAL);
		urlEDataType = createEDataType(URL);
		rotationEDataType = createEDataType(ROTATION);
		decorationEDataType = createEDataType(DECORATION);
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

		// Create type parameters

		// Set bounds for type parameters

		// Add supertypes to classes
		annotationGraphicsEClass.getESuperTypes().add(this.getGraphics());
		arcGraphicsEClass.getESuperTypes().add(this.getGraphics());
		nodeGraphicsEClass.getESuperTypes().add(this.getGraphics());

		// Initialize classes and features; add operations and parameters
		initEClass(annotationGraphicsEClass, AnnotationGraphics.class, "AnnotationGraphics", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getAnnotationGraphics_Fill(), this.getFill(), null, "fill", null, 0, 1, AnnotationGraphics.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getAnnotationGraphics_Offset(), this.getCoordinate(), null, "offset", null, 0, 1, AnnotationGraphics.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getAnnotationGraphics_Line(), this.getLine(), null, "line", null, 0, 1, AnnotationGraphics.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getAnnotationGraphics_Font(), this.getFont(), null, "font", null, 0, 1, AnnotationGraphics.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(arcGraphicsEClass, ArcGraphics.class, "ArcGraphics", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getArcGraphics_Line(), this.getLine(), null, "line", null, 0, 1, ArcGraphics.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getArcGraphics_Position(), this.getCoordinate(), null, "position", null, 0, -1, ArcGraphics.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(coordinateEClass, Coordinate.class, "Coordinate", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getCoordinate_X(), ecorePackage.getEDouble(), "x", null, 1, 1, Coordinate.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getCoordinate_Y(), ecorePackage.getEDouble(), "y", null, 1, 1, Coordinate.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(fillEClass, Fill.class, "Fill", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getFill_Color(), this.getCSS2Color(), "color", null, 0, 1, Fill.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getFill_Image(), this.getURL(), "image", null, 0, 1, Fill.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getFill_GradientColor(), this.getCSS2Color(), "gradientColor", null, 0, 1, Fill.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getFill_GradientRotation(), this.getRotation(), "gradientRotation", null, 0, 1, Fill.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(fontEClass, Font.class, "Font", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getFont_Family(), this.getCSS2FontFamily(), "family", null, 1, 1, Font.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getFont_Style(), this.getCSS2FontStyle(), "style", null, 1, 1, Font.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getFont_Weight(), this.getCSS2FontWeight(), "weight", null, 1, 1, Font.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getFont_Size(), this.getCSS2FontSize(), "size", null, 1, 1, Font.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getFont_Decoration(), this.getDecoration(), "decoration", null, 0, 1, Font.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getFont_Align(), this.getAlign(), "align", null, 1, 1, Font.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getFont_Rotation(), ecorePackage.getEDouble(), "rotation", null, 1, 1, Font.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(graphicsEClass, Graphics.class, "Graphics", IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getGraphics_Parent(), this.getHasGraphics(), this.getHasGraphics_Graphics(), "parent", null, 1, 1, Graphics.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(hasGraphicsEClass, HasGraphics.class, "HasGraphics", IS_ABSTRACT, IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getHasGraphics_Graphics(), this.getGraphics(), this.getGraphics_Parent(), "graphics", null, 0, 1, HasGraphics.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(lineEClass, Line.class, "Line", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getLine_Shape(), this.getShape(), "shape", null, 1, 1, Line.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getLine_Color(), this.getCSS2Color(), "color", null, 1, 1, Line.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getLine_Width(), this.getNonNegativeDecimal(), "width", null, 1, 1, Line.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getLine_Style(), this.getStyle(), "style", null, 1, 1, Line.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(nodeGraphicsEClass, NodeGraphics.class, "NodeGraphics", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getNodeGraphics_Position(), this.getCoordinate(), null, "position", null, 0, 1, NodeGraphics.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getNodeGraphics_Dimension(), this.getCoordinate(), null, "dimension", null, 0, 1, NodeGraphics.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getNodeGraphics_Line(), this.getLine(), null, "line", null, 0, 1, NodeGraphics.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEReference(getNodeGraphics_Fill(), this.getFill(), null, "fill", null, 0, 1, NodeGraphics.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		// Initialize enums and add enum literals
		initEEnum(alignEEnum, Align.class, "Align");
		addEEnumLiteral(alignEEnum, Align.LEFT);
		addEEnumLiteral(alignEEnum, Align.RIGHT);
		addEEnumLiteral(alignEEnum, Align.CENTER);

		initEEnum(shapeEEnum, Shape.class, "Shape");
		addEEnumLiteral(shapeEEnum, Shape.LINE);
		addEEnumLiteral(shapeEEnum, Shape.CURVE);

		initEEnum(styleEEnum, Style.class, "Style");
		addEEnumLiteral(styleEEnum, Style.SOLID);
		addEEnumLiteral(styleEEnum, Style.DASH);
		addEEnumLiteral(styleEEnum, Style.DOT);

		// Initialize data types
		initEDataType(css2ColorEDataType, String.class, "CSS2Color", IS_SERIALIZABLE, !IS_GENERATED_INSTANCE_CLASS);
		initEDataType(css2FontFamilyEDataType, String.class, "CSS2FontFamily", IS_SERIALIZABLE, !IS_GENERATED_INSTANCE_CLASS);
		initEDataType(css2FontStyleEDataType, String.class, "CSS2FontStyle", IS_SERIALIZABLE, !IS_GENERATED_INSTANCE_CLASS);
		initEDataType(css2FontWeightEDataType, String.class, "CSS2FontWeight", IS_SERIALIZABLE, !IS_GENERATED_INSTANCE_CLASS);
		initEDataType(css2FontSizeEDataType, String.class, "CSS2FontSize", IS_SERIALIZABLE, !IS_GENERATED_INSTANCE_CLASS);
		initEDataType(nonNegativeDecimalEDataType, double.class, "NonNegativeDecimal", IS_SERIALIZABLE, !IS_GENERATED_INSTANCE_CLASS);
		initEDataType(urlEDataType, java.net.URL.class, "URL", IS_SERIALIZABLE, !IS_GENERATED_INSTANCE_CLASS);
		initEDataType(rotationEDataType, Rotation.class, "Rotation", IS_SERIALIZABLE, !IS_GENERATED_INSTANCE_CLASS);
		initEDataType(decorationEDataType, Decoration.class, "Decoration", IS_SERIALIZABLE, !IS_GENERATED_INSTANCE_CLASS);

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
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.graphics.impl.AnnotationGraphicsImpl <em>Annotation Graphics</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.graphics.impl.AnnotationGraphicsImpl
		 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getAnnotationGraphics()
		 * @generated
		 */
		public static final EClass ANNOTATION_GRAPHICS = eINSTANCE.getAnnotationGraphics();

		/**
		 * The meta object literal for the '<em><b>Fill</b></em>' containment reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference ANNOTATION_GRAPHICS__FILL = eINSTANCE.getAnnotationGraphics_Fill();

		/**
		 * The meta object literal for the '<em><b>Offset</b></em>' containment reference feature.
		 * <!-- begin-user-doc
		 * --> <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference ANNOTATION_GRAPHICS__OFFSET = eINSTANCE.getAnnotationGraphics_Offset();

		/**
		 * The meta object literal for the '<em><b>Line</b></em>' containment reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference ANNOTATION_GRAPHICS__LINE = eINSTANCE.getAnnotationGraphics_Line();

		/**
		 * The meta object literal for the '<em><b>Font</b></em>' containment reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference ANNOTATION_GRAPHICS__FONT = eINSTANCE.getAnnotationGraphics_Font();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.graphics.impl.ArcGraphicsImpl <em>Arc Graphics</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.graphics.impl.ArcGraphicsImpl
		 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getArcGraphics()
		 * @generated
		 */
		public static final EClass ARC_GRAPHICS = eINSTANCE.getArcGraphics();

		/**
		 * The meta object literal for the '<em><b>Line</b></em>' containment reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference ARC_GRAPHICS__LINE = eINSTANCE.getArcGraphics_Line();

		/**
		 * The meta object literal for the '<em><b>Position</b></em>' containment reference list feature. <!--
		 * begin-user-doc --> <!-- end-user-doc -->
		 * 
		 * @generated
		 */
		public static final EReference ARC_GRAPHICS__POSITION = eINSTANCE.getArcGraphics_Position();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.graphics.impl.CoordinateImpl <em>Coordinate</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.graphics.impl.CoordinateImpl
		 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getCoordinate()
		 * @generated
		 */
		public static final EClass COORDINATE = eINSTANCE.getCoordinate();

		/**
		 * The meta object literal for the '<em><b>X</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute COORDINATE__X = eINSTANCE.getCoordinate_X();

		/**
		 * The meta object literal for the '<em><b>Y</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute COORDINATE__Y = eINSTANCE.getCoordinate_Y();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.graphics.impl.FillImpl <em>Fill</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.graphics.impl.FillImpl
		 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getFill()
		 * @generated
		 */
		public static final EClass FILL = eINSTANCE.getFill();

		/**
		 * The meta object literal for the '<em><b>Color</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute FILL__COLOR = eINSTANCE.getFill_Color();

		/**
		 * The meta object literal for the '<em><b>Image</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute FILL__IMAGE = eINSTANCE.getFill_Image();

		/**
		 * The meta object literal for the '<em><b>Gradient Color</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EAttribute FILL__GRADIENT_COLOR = eINSTANCE.getFill_GradientColor();

		/**
		 * The meta object literal for the '<em><b>Gradient Rotation</b></em>' attribute feature.
		 * <!-- begin-user-doc
		 * --> <!-- end-user-doc -->
		 * @generated
		 */
		public static final EAttribute FILL__GRADIENT_ROTATION = eINSTANCE.getFill_GradientRotation();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.graphics.impl.FontImpl <em>Font</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.graphics.impl.FontImpl
		 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getFont()
		 * @generated
		 */
		public static final EClass FONT = eINSTANCE.getFont();

		/**
		 * The meta object literal for the '<em><b>Family</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute FONT__FAMILY = eINSTANCE.getFont_Family();

		/**
		 * The meta object literal for the '<em><b>Style</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute FONT__STYLE = eINSTANCE.getFont_Style();

		/**
		 * The meta object literal for the '<em><b>Weight</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute FONT__WEIGHT = eINSTANCE.getFont_Weight();

		/**
		 * The meta object literal for the '<em><b>Size</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute FONT__SIZE = eINSTANCE.getFont_Size();

		/**
		 * The meta object literal for the '<em><b>Decoration</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute FONT__DECORATION = eINSTANCE.getFont_Decoration();

		/**
		 * The meta object literal for the '<em><b>Align</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute FONT__ALIGN = eINSTANCE.getFont_Align();

		/**
		 * The meta object literal for the '<em><b>Rotation</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute FONT__ROTATION = eINSTANCE.getFont_Rotation();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.graphics.impl.GraphicsImpl <em>Graphics</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsImpl
		 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getGraphics()
		 * @generated
		 */
		public static final EClass GRAPHICS = eINSTANCE.getGraphics();

		/**
		 * The meta object literal for the '<em><b>Parent</b></em>' container reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference GRAPHICS__PARENT = eINSTANCE.getGraphics_Parent();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.graphics.HasGraphics <em>Has Graphics</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.graphics.HasGraphics
		 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getHasGraphics()
		 * @generated
		 */
		public static final EClass HAS_GRAPHICS = eINSTANCE.getHasGraphics();

		/**
		 * The meta object literal for the '<em><b>Graphics</b></em>' containment reference feature.
		 * <!-- begin-user-doc
		 * --> <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference HAS_GRAPHICS__GRAPHICS = eINSTANCE.getHasGraphics_Graphics();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.graphics.impl.LineImpl <em>Line</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.graphics.impl.LineImpl
		 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getLine()
		 * @generated
		 */
		public static final EClass LINE = eINSTANCE.getLine();

		/**
		 * The meta object literal for the '<em><b>Shape</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute LINE__SHAPE = eINSTANCE.getLine_Shape();

		/**
		 * The meta object literal for the '<em><b>Color</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute LINE__COLOR = eINSTANCE.getLine_Color();

		/**
		 * The meta object literal for the '<em><b>Width</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute LINE__WIDTH = eINSTANCE.getLine_Width();

		/**
		 * The meta object literal for the '<em><b>Style</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute LINE__STYLE = eINSTANCE.getLine_Style();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.graphics.impl.NodeGraphicsImpl <em>Node Graphics</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.graphics.impl.NodeGraphicsImpl
		 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getNodeGraphics()
		 * @generated
		 */
		public static final EClass NODE_GRAPHICS = eINSTANCE.getNodeGraphics();

		/**
		 * The meta object literal for the '<em><b>Position</b></em>' containment reference feature.
		 * <!-- begin-user-doc
		 * --> <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference NODE_GRAPHICS__POSITION = eINSTANCE.getNodeGraphics_Position();

		/**
		 * The meta object literal for the '<em><b>Dimension</b></em>' containment reference feature. <!--
		 * begin-user-doc --> <!-- end-user-doc -->
		 * 
		 * @generated
		 */
		public static final EReference NODE_GRAPHICS__DIMENSION = eINSTANCE.getNodeGraphics_Dimension();

		/**
		 * The meta object literal for the '<em><b>Line</b></em>' containment reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference NODE_GRAPHICS__LINE = eINSTANCE.getNodeGraphics_Line();

		/**
		 * The meta object literal for the '<em><b>Fill</b></em>' containment reference feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EReference NODE_GRAPHICS__FILL = eINSTANCE.getNodeGraphics_Fill();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.graphics.Align <em>Align</em>}' enum.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.graphics.Align
		 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getAlign()
		 * @generated
		 */
		public static final EEnum ALIGN = eINSTANCE.getAlign();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.graphics.Shape <em>Shape</em>}' enum.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.graphics.Shape
		 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getShape()
		 * @generated
		 */
		public static final EEnum SHAPE = eINSTANCE.getShape();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.graphics.Style <em>Style</em>}' enum.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.graphics.Style
		 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getStyle()
		 * @generated
		 */
		public static final EEnum STYLE = eINSTANCE.getStyle();

		/**
		 * The meta object literal for the '<em>CSS2 Color</em>' data type. <!-- begin-user-doc --> <!-- end-user-doc
		 * -->
		 * 
		 * @see java.lang.String
		 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getCSS2Color()
		 * @generated
		 */
		public static final EDataType CSS2_COLOR = eINSTANCE.getCSS2Color();

		/**
		 * The meta object literal for the '<em>CSS2 Font Family</em>' data type.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @see java.lang.String
		 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getCSS2FontFamily()
		 * @generated
		 */
		public static final EDataType CSS2_FONT_FAMILY = eINSTANCE.getCSS2FontFamily();

		/**
		 * The meta object literal for the '<em>CSS2 Font Style</em>' data type.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @see java.lang.String
		 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getCSS2FontStyle()
		 * @generated
		 */
		public static final EDataType CSS2_FONT_STYLE = eINSTANCE.getCSS2FontStyle();

		/**
		 * The meta object literal for the '<em>CSS2 Font Weight</em>' data type.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @see java.lang.String
		 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getCSS2FontWeight()
		 * @generated
		 */
		public static final EDataType CSS2_FONT_WEIGHT = eINSTANCE.getCSS2FontWeight();

		/**
		 * The meta object literal for the '<em>CSS2 Font Size</em>' data type.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @see java.lang.String
		 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getCSS2FontSize()
		 * @generated
		 */
		public static final EDataType CSS2_FONT_SIZE = eINSTANCE.getCSS2FontSize();

		/**
		 * The meta object literal for the '<em>Non Negative Decimal</em>' data type.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getNonNegativeDecimal()
		 * @generated
		 */
		public static final EDataType NON_NEGATIVE_DECIMAL = eINSTANCE.getNonNegativeDecimal();

		/**
		 * The meta object literal for the '<em>URL</em>' data type.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see java.net.URL
		 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getURL()
		 * @generated
		 */
		public static final EDataType URL = eINSTANCE.getURL();

		/**
		 * The meta object literal for the '<em>Rotation</em>' data type.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.graphics.Rotation
		 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getRotation()
		 * @generated
		 */
		public static final EDataType ROTATION = eINSTANCE.getRotation();

		/**
		 * The meta object literal for the '<em>Decoration</em>' data type. <!-- begin-user-doc --> <!-- end-user-doc
		 * -->
		 * 
		 * @see org.cpntools.accesscpn.model.graphics.Decoration
		 * @see org.cpntools.accesscpn.model.graphics.impl.GraphicsPackageImpl#getDecoration()
		 * @generated
		 */
		public static final EDataType DECORATION = eINSTANCE.getDecoration();

	}

} // GraphicsPackageImpl
