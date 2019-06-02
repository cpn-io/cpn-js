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
package org.cpntools.accesscpn.model.cpntypes.impl;

import org.cpntools.accesscpn.model.auxgraphics.impl.AuxgraphicsPackageImpl;
import org.cpntools.accesscpn.model.cpntypes.CPNAlias;
import org.cpntools.accesscpn.model.cpntypes.CPNBool;
import org.cpntools.accesscpn.model.cpntypes.CPNEnum;
import org.cpntools.accesscpn.model.cpntypes.CPNIndex;
import org.cpntools.accesscpn.model.cpntypes.CPNInt;
import org.cpntools.accesscpn.model.cpntypes.CPNIntInf;
import org.cpntools.accesscpn.model.cpntypes.CPNList;
import org.cpntools.accesscpn.model.cpntypes.CPNProduct;
import org.cpntools.accesscpn.model.cpntypes.CPNReal;
import org.cpntools.accesscpn.model.cpntypes.CPNRecord;
import org.cpntools.accesscpn.model.cpntypes.CPNString;
import org.cpntools.accesscpn.model.cpntypes.CPNSubset;
import org.cpntools.accesscpn.model.cpntypes.CPNTime;
import org.cpntools.accesscpn.model.cpntypes.CPNType;
import org.cpntools.accesscpn.model.cpntypes.CPNUnion;
import org.cpntools.accesscpn.model.cpntypes.CPNUnit;
import org.cpntools.accesscpn.model.cpntypes.CpntypesFactory;
import org.cpntools.accesscpn.model.cpntypes.NameTypePair;
import org.cpntools.accesscpn.model.declaration.impl.DeclarationPackageImpl;
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
 * <!-- begin-user-doc --> The <b>Package</b> for the model. It contains accessors for the meta objects to represent
 * <ul>
 * <li>each class,</li>
 * <li>each feature of each class,</li>
 * <li>each enum,</li>
 * <li>and each data type</li>
 * </ul>
 * <!-- end-user-doc -->
 * @see org.cpntools.accesscpn.model.cpntypes.CpntypesFactory
 * @model kind="package"
 * @generated
 */
public class CpntypesPackageImpl extends EPackageImpl {
	/**
	 * The package name.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public static final String eNAME = "cpntypes";

	/**
	 * The package namespace URI.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public static final String eNS_URI = "http:///org/cpntools/accesscpn/model/cpntypes.ecore";

	/**
	 * The package namespace name.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public static final String eNS_PREFIX = "org.cpntools.accesscpn.model.cpntypes";

	/**
	 * The singleton instance of the package.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public static final CpntypesPackageImpl eINSTANCE = org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl.init();

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNTypeImpl <em>CPN Type</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNTypeImpl
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNType()
	 * @generated
	 */
	public static final int CPN_TYPE = 13;

	/**
	 * The feature id for the '<em><b>Timed</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_TYPE__TIMED = 0;

	/**
	 * The feature id for the '<em><b>Declares</b></em>' attribute list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_TYPE__DECLARES = 1;

	/**
	 * The number of structural features of the '<em>CPN Type</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_TYPE_FEATURE_COUNT = 2;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNAliasImpl <em>CPN Alias</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNAliasImpl
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNAlias()
	 * @generated
	 */
	public static final int CPN_ALIAS = 0;

	/**
	 * The feature id for the '<em><b>Timed</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_ALIAS__TIMED = CPN_TYPE__TIMED;

	/**
	 * The feature id for the '<em><b>Declares</b></em>' attribute list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_ALIAS__DECLARES = CPN_TYPE__DECLARES;

	/**
	 * The feature id for the '<em><b>Sort</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_ALIAS__SORT = CPN_TYPE_FEATURE_COUNT + 0;

	/**
	 * The number of structural features of the '<em>CPN Alias</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int CPN_ALIAS_FEATURE_COUNT = CPN_TYPE_FEATURE_COUNT + 1;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNBoolImpl <em>CPN Bool</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNBoolImpl
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNBool()
	 * @generated
	 */
	public static final int CPN_BOOL = 1;

	/**
	 * The feature id for the '<em><b>Timed</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_BOOL__TIMED = CPN_TYPE__TIMED;

	/**
	 * The feature id for the '<em><b>Declares</b></em>' attribute list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_BOOL__DECLARES = CPN_TYPE__DECLARES;

	/**
	 * The feature id for the '<em><b>True Value</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_BOOL__TRUE_VALUE = CPN_TYPE_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>False Value</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_BOOL__FALSE_VALUE = CPN_TYPE_FEATURE_COUNT + 1;

	/**
	 * The number of structural features of the '<em>CPN Bool</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_BOOL_FEATURE_COUNT = CPN_TYPE_FEATURE_COUNT + 2;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNEnumImpl <em>CPN Enum</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNEnumImpl
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNEnum()
	 * @generated
	 */
	public static final int CPN_ENUM = 2;

	/**
	 * The feature id for the '<em><b>Timed</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_ENUM__TIMED = CPN_TYPE__TIMED;

	/**
	 * The feature id for the '<em><b>Declares</b></em>' attribute list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_ENUM__DECLARES = CPN_TYPE__DECLARES;

	/**
	 * The feature id for the '<em><b>Values</b></em>' attribute list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_ENUM__VALUES = CPN_TYPE_FEATURE_COUNT + 0;

	/**
	 * The number of structural features of the '<em>CPN Enum</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_ENUM_FEATURE_COUNT = CPN_TYPE_FEATURE_COUNT + 1;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNIndexImpl <em>CPN Index</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNIndexImpl
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNIndex()
	 * @generated
	 */
	public static final int CPN_INDEX = 3;

	/**
	 * The feature id for the '<em><b>Timed</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_INDEX__TIMED = CPN_TYPE__TIMED;

	/**
	 * The feature id for the '<em><b>Declares</b></em>' attribute list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_INDEX__DECLARES = CPN_TYPE__DECLARES;

	/**
	 * The feature id for the '<em><b>Name</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_INDEX__NAME = CPN_TYPE_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Low</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_INDEX__LOW = CPN_TYPE_FEATURE_COUNT + 1;

	/**
	 * The feature id for the '<em><b>High</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_INDEX__HIGH = CPN_TYPE_FEATURE_COUNT + 2;

	/**
	 * The number of structural features of the '<em>CPN Index</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int CPN_INDEX_FEATURE_COUNT = CPN_TYPE_FEATURE_COUNT + 3;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNIntImpl <em>CPN Int</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNIntImpl
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNInt()
	 * @generated
	 */
	public static final int CPN_INT = 4;

	/**
	 * The feature id for the '<em><b>Timed</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_INT__TIMED = CPN_TYPE__TIMED;

	/**
	 * The feature id for the '<em><b>Declares</b></em>' attribute list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_INT__DECLARES = CPN_TYPE__DECLARES;

	/**
	 * The feature id for the '<em><b>Low</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_INT__LOW = CPN_TYPE_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>High</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_INT__HIGH = CPN_TYPE_FEATURE_COUNT + 1;

	/**
	 * The number of structural features of the '<em>CPN Int</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_INT_FEATURE_COUNT = CPN_TYPE_FEATURE_COUNT + 2;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNIntInfImpl <em>CPN Int Inf</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNIntInfImpl
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNIntInf()
	 * @generated
	 */
	public static final int CPN_INT_INF = 5;

	/**
	 * The feature id for the '<em><b>Timed</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_INT_INF__TIMED = CPN_TYPE__TIMED;

	/**
	 * The feature id for the '<em><b>Declares</b></em>' attribute list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_INT_INF__DECLARES = CPN_TYPE__DECLARES;

	/**
	 * The feature id for the '<em><b>Low</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_INT_INF__LOW = CPN_TYPE_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>High</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_INT_INF__HIGH = CPN_TYPE_FEATURE_COUNT + 1;

	/**
	 * The number of structural features of the '<em>CPN Int Inf</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_INT_INF_FEATURE_COUNT = CPN_TYPE_FEATURE_COUNT + 2;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNListImpl <em>CPN List</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNListImpl
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNList()
	 * @generated
	 */
	public static final int CPN_LIST = 6;

	/**
	 * The feature id for the '<em><b>Timed</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_LIST__TIMED = CPN_TYPE__TIMED;

	/**
	 * The feature id for the '<em><b>Declares</b></em>' attribute list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_LIST__DECLARES = CPN_TYPE__DECLARES;

	/**
	 * The feature id for the '<em><b>Sort</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_LIST__SORT = CPN_TYPE_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Low</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_LIST__LOW = CPN_TYPE_FEATURE_COUNT + 1;

	/**
	 * The feature id for the '<em><b>High</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_LIST__HIGH = CPN_TYPE_FEATURE_COUNT + 2;

	/**
	 * The number of structural features of the '<em>CPN List</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_LIST_FEATURE_COUNT = CPN_TYPE_FEATURE_COUNT + 3;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNProductImpl <em>CPN Product</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNProductImpl
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNProduct()
	 * @generated
	 */
	public static final int CPN_PRODUCT = 7;

	/**
	 * The feature id for the '<em><b>Timed</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_PRODUCT__TIMED = CPN_TYPE__TIMED;

	/**
	 * The feature id for the '<em><b>Declares</b></em>' attribute list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_PRODUCT__DECLARES = CPN_TYPE__DECLARES;

	/**
	 * The feature id for the '<em><b>Types</b></em>' attribute list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_PRODUCT__TYPES = CPN_TYPE_FEATURE_COUNT + 0;

	/**
	 * The number of structural features of the '<em>CPN Product</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int CPN_PRODUCT_FEATURE_COUNT = CPN_TYPE_FEATURE_COUNT + 1;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNRealImpl <em>CPN Real</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNRealImpl
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNReal()
	 * @generated
	 */
	public static final int CPN_REAL = 8;

	/**
	 * The feature id for the '<em><b>Timed</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_REAL__TIMED = CPN_TYPE__TIMED;

	/**
	 * The feature id for the '<em><b>Declares</b></em>' attribute list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_REAL__DECLARES = CPN_TYPE__DECLARES;

	/**
	 * The feature id for the '<em><b>Low</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_REAL__LOW = CPN_TYPE_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>High</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_REAL__HIGH = CPN_TYPE_FEATURE_COUNT + 1;

	/**
	 * The number of structural features of the '<em>CPN Real</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_REAL_FEATURE_COUNT = CPN_TYPE_FEATURE_COUNT + 2;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNRecordImpl <em>CPN Record</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNRecordImpl
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNRecord()
	 * @generated
	 */
	public static final int CPN_RECORD = 9;

	/**
	 * The feature id for the '<em><b>Timed</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_RECORD__TIMED = CPN_TYPE__TIMED;

	/**
	 * The feature id for the '<em><b>Declares</b></em>' attribute list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_RECORD__DECLARES = CPN_TYPE__DECLARES;

	/**
	 * The feature id for the '<em><b>Values</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_RECORD__VALUES = CPN_TYPE_FEATURE_COUNT + 0;

	/**
	 * The number of structural features of the '<em>CPN Record</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int CPN_RECORD_FEATURE_COUNT = CPN_TYPE_FEATURE_COUNT + 1;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNStringImpl <em>CPN String</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNStringImpl
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNString()
	 * @generated
	 */
	public static final int CPN_STRING = 10;

	/**
	 * The feature id for the '<em><b>Timed</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_STRING__TIMED = CPN_TYPE__TIMED;

	/**
	 * The feature id for the '<em><b>Declares</b></em>' attribute list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_STRING__DECLARES = CPN_TYPE__DECLARES;

	/**
	 * The feature id for the '<em><b>Range Low</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_STRING__RANGE_LOW = CPN_TYPE_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>Range High</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_STRING__RANGE_HIGH = CPN_TYPE_FEATURE_COUNT + 1;

	/**
	 * The feature id for the '<em><b>Length Low</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_STRING__LENGTH_LOW = CPN_TYPE_FEATURE_COUNT + 2;

	/**
	 * The feature id for the '<em><b>Length High</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_STRING__LENGTH_HIGH = CPN_TYPE_FEATURE_COUNT + 3;

	/**
	 * The number of structural features of the '<em>CPN String</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int CPN_STRING_FEATURE_COUNT = CPN_TYPE_FEATURE_COUNT + 4;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNSubsetImpl <em>CPN Subset</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNSubsetImpl
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNSubset()
	 * @generated
	 */
	public static final int CPN_SUBSET = 11;

	/**
	 * The feature id for the '<em><b>Timed</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_SUBSET__TIMED = CPN_TYPE__TIMED;

	/**
	 * The feature id for the '<em><b>Declares</b></em>' attribute list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_SUBSET__DECLARES = CPN_TYPE__DECLARES;

	/**
	 * The feature id for the '<em><b>Sort</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_SUBSET__SORT = CPN_TYPE_FEATURE_COUNT + 0;

	/**
	 * The feature id for the '<em><b>By</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_SUBSET__BY = CPN_TYPE_FEATURE_COUNT + 1;

	/**
	 * The feature id for the '<em><b>With</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_SUBSET__WITH = CPN_TYPE_FEATURE_COUNT + 2;

	/**
	 * The number of structural features of the '<em>CPN Subset</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int CPN_SUBSET_FEATURE_COUNT = CPN_TYPE_FEATURE_COUNT + 3;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNTimeImpl <em>CPN Time</em>}' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNTimeImpl
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNTime()
	 * @generated
	 */
	public static final int CPN_TIME = 12;

	/**
	 * The feature id for the '<em><b>Timed</b></em>' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_TIME__TIMED = CPN_TYPE__TIMED;

	/**
	 * The feature id for the '<em><b>Declares</b></em>' attribute list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_TIME__DECLARES = CPN_TYPE__DECLARES;

	/**
	 * The number of structural features of the '<em>CPN Time</em>' class.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_TIME_FEATURE_COUNT = CPN_TYPE_FEATURE_COUNT + 0;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNUnionImpl <em>CPN Union</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNUnionImpl
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNUnion()
	 * @generated
	 */
	public static final int CPN_UNION = 14;

	/**
	 * The feature id for the '<em><b>Timed</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_UNION__TIMED = CPN_TYPE__TIMED;

	/**
	 * The feature id for the '<em><b>Declares</b></em>' attribute list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_UNION__DECLARES = CPN_TYPE__DECLARES;

	/**
	 * The feature id for the '<em><b>Values</b></em>' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_UNION__VALUES = CPN_TYPE_FEATURE_COUNT + 0;

	/**
	 * The number of structural features of the '<em>CPN Union</em>' class. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @generated
	 * @ordered
	 */
	public static final int CPN_UNION_FEATURE_COUNT = CPN_TYPE_FEATURE_COUNT + 1;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNUnitImpl <em>CPN Unit</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNUnitImpl
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNUnit()
	 * @generated
	 */
	public static final int CPN_UNIT = 15;

	/**
	 * The feature id for the '<em><b>Timed</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_UNIT__TIMED = CPN_TYPE__TIMED;

	/**
	 * The feature id for the '<em><b>Declares</b></em>' attribute list.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_UNIT__DECLARES = CPN_TYPE__DECLARES;

	/**
	 * The feature id for the '<em><b>Id</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_UNIT__ID = CPN_TYPE_FEATURE_COUNT + 0;

	/**
	 * The number of structural features of the '<em>CPN Unit</em>' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int CPN_UNIT_FEATURE_COUNT = CPN_TYPE_FEATURE_COUNT + 1;

	/**
	 * The meta object id for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.NameTypePairImpl <em>Name Type Pair</em>}' class.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.NameTypePairImpl
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getNameTypePair()
	 * @generated
	 */
	public static final int NAME_TYPE_PAIR = 16;

	/**
	 * The feature id for the '<em><b>Name</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int NAME_TYPE_PAIR__NAME = 0;

	/**
	 * The feature id for the '<em><b>Sort</b></em>' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int NAME_TYPE_PAIR__SORT = 1;

	/**
	 * The number of structural features of the '<em>Name Type Pair</em>' class.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @generated
	 * @ordered
	 */
	public static final int NAME_TYPE_PAIR_FEATURE_COUNT = 2;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass cpnAliasEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass cpnBoolEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass cpnEnumEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass cpnIndexEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass cpnIntEClass = null;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	private EClass cpnIntInfEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass cpnListEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass cpnProductEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass cpnRealEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass cpnRecordEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass cpnStringEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass cpnSubsetEClass = null;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	private EClass cpnTimeEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass cpnTypeEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass cpnUnionEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass cpnUnitEClass = null;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private EClass nameTypePairEClass = null;

	/**
	 * Creates an instance of the model <b>Package</b>, registered with {@link org.eclipse.emf.ecore.EPackage.Registry
	 * EPackage.Registry} by the package package URI value.
	 * <p>
	 * Note: the correct way to create the package is via the static factory method {@link #init init()}, which also
	 * performs initialization of the package, or returns the registered package, if one already exists. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see org.eclipse.emf.ecore.EPackage.Registry
	 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#eNS_URI
	 * @see #init()
	 * @generated
	 */
	private CpntypesPackageImpl() {
		super(eNS_URI, ((EFactory)CpntypesFactory.INSTANCE));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	private static boolean isInited = false;

	/**
	 * Creates, registers, and initializes the <b>Package</b> for this model, and for any others upon which it depends.
	 * <p>
	 * This method is used to initialize {@link CpntypesPackageImpl#eINSTANCE} when that field is accessed. Clients
	 * should not invoke it directly. Instead, they should simply access that field to obtain the package. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @see #eNS_URI
	 * @see #createPackageContents()
	 * @see #initializePackageContents()
	 * @generated
	 */
	public static CpntypesPackageImpl init() {
		if (isInited) return (CpntypesPackageImpl)EPackage.Registry.INSTANCE.getEPackage(CpntypesPackageImpl.eNS_URI);

		// Obtain or create and register package
		CpntypesPackageImpl theCpntypesPackage = (CpntypesPackageImpl)(EPackage.Registry.INSTANCE.get(eNS_URI) instanceof CpntypesPackageImpl ? EPackage.Registry.INSTANCE.get(eNS_URI) : new CpntypesPackageImpl());

		isInited = true;

		// Obtain or create and register interdependencies
		ModelPackageImpl theModelPackage = (ModelPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(ModelPackageImpl.eNS_URI) instanceof ModelPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(ModelPackageImpl.eNS_URI) : ModelPackageImpl.eINSTANCE);
		AuxgraphicsPackageImpl theAuxgraphicsPackage = (AuxgraphicsPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(AuxgraphicsPackageImpl.eNS_URI) instanceof AuxgraphicsPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(AuxgraphicsPackageImpl.eNS_URI) : AuxgraphicsPackageImpl.eINSTANCE);
		DeclarationPackageImpl theDeclarationPackage = (DeclarationPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(DeclarationPackageImpl.eNS_URI) instanceof DeclarationPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(DeclarationPackageImpl.eNS_URI) : DeclarationPackageImpl.eINSTANCE);
		GraphicsPackageImpl theGraphicsPackage = (GraphicsPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(GraphicsPackageImpl.eNS_URI) instanceof GraphicsPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(GraphicsPackageImpl.eNS_URI) : GraphicsPackageImpl.eINSTANCE);
		MonitorsPackageImpl theMonitorsPackage = (MonitorsPackageImpl)(EPackage.Registry.INSTANCE.getEPackage(MonitorsPackageImpl.eNS_URI) instanceof MonitorsPackageImpl ? EPackage.Registry.INSTANCE.getEPackage(MonitorsPackageImpl.eNS_URI) : MonitorsPackageImpl.eINSTANCE);

		// Create package meta-data objects
		theCpntypesPackage.createPackageContents();
		theModelPackage.createPackageContents();
		theAuxgraphicsPackage.createPackageContents();
		theDeclarationPackage.createPackageContents();
		theGraphicsPackage.createPackageContents();
		theMonitorsPackage.createPackageContents();

		// Initialize created meta-data
		theCpntypesPackage.initializePackageContents();
		theModelPackage.initializePackageContents();
		theAuxgraphicsPackage.initializePackageContents();
		theDeclarationPackage.initializePackageContents();
		theGraphicsPackage.initializePackageContents();
		theMonitorsPackage.initializePackageContents();

		// Mark meta-data to indicate it can't be changed
		theCpntypesPackage.freeze();

  
		// Update the registry and return the package
		EPackage.Registry.INSTANCE.put(CpntypesPackageImpl.eNS_URI, theCpntypesPackage);
		return theCpntypesPackage;
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.cpntypes.CPNAlias <em>CPN Alias</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>CPN Alias</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNAlias
	 * @generated
	 */
	public EClass getCPNAlias() {
		return cpnAliasEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNAlias#getSort <em>Sort</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Sort</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNAlias#getSort()
	 * @see #getCPNAlias()
	 * @generated
	 */
	public EAttribute getCPNAlias_Sort() {
		return (EAttribute)cpnAliasEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.cpntypes.CPNBool <em>CPN Bool</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>CPN Bool</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNBool
	 * @generated
	 */
	public EClass getCPNBool() {
		return cpnBoolEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNBool#getTrueValue <em>True Value</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>True Value</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNBool#getTrueValue()
	 * @see #getCPNBool()
	 * @generated
	 */
	public EAttribute getCPNBool_TrueValue() {
		return (EAttribute)cpnBoolEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNBool#getFalseValue <em>False Value</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>False Value</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNBool#getFalseValue()
	 * @see #getCPNBool()
	 * @generated
	 */
	public EAttribute getCPNBool_FalseValue() {
		return (EAttribute)cpnBoolEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.cpntypes.CPNEnum <em>CPN Enum</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>CPN Enum</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNEnum
	 * @generated
	 */
	public EClass getCPNEnum() {
		return cpnEnumEClass;
	}

	/**
	 * Returns the meta object for the attribute list '{@link org.cpntools.accesscpn.model.cpntypes.CPNEnum#getValues <em>Values</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute list '<em>Values</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNEnum#getValues()
	 * @see #getCPNEnum()
	 * @generated
	 */
	public EAttribute getCPNEnum_Values() {
		return (EAttribute)cpnEnumEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.cpntypes.CPNIndex <em>CPN Index</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>CPN Index</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNIndex
	 * @generated
	 */
	public EClass getCPNIndex() {
		return cpnIndexEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNIndex#getName <em>Name</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Name</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNIndex#getName()
	 * @see #getCPNIndex()
	 * @generated
	 */
	public EAttribute getCPNIndex_Name() {
		return (EAttribute)cpnIndexEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNIndex#getLow <em>Low</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Low</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNIndex#getLow()
	 * @see #getCPNIndex()
	 * @generated
	 */
	public EAttribute getCPNIndex_Low() {
		return (EAttribute)cpnIndexEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNIndex#getHigh <em>High</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>High</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNIndex#getHigh()
	 * @see #getCPNIndex()
	 * @generated
	 */
	public EAttribute getCPNIndex_High() {
		return (EAttribute)cpnIndexEClass.getEStructuralFeatures().get(2);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.cpntypes.CPNInt <em>CPN Int</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>CPN Int</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNInt
	 * @generated
	 */
	public EClass getCPNInt() {
		return cpnIntEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNInt#getLow <em>Low</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Low</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNInt#getLow()
	 * @see #getCPNInt()
	 * @generated
	 */
	public EAttribute getCPNInt_Low() {
		return (EAttribute)cpnIntEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNInt#getHigh <em>High</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>High</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNInt#getHigh()
	 * @see #getCPNInt()
	 * @generated
	 */
	public EAttribute getCPNInt_High() {
		return (EAttribute)cpnIntEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.cpntypes.CPNIntInf <em>CPN Int Inf</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>CPN Int Inf</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNIntInf
	 * @generated
	 */
	public EClass getCPNIntInf() {
		return cpnIntInfEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNIntInf#getLow <em>Low</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Low</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNIntInf#getLow()
	 * @see #getCPNIntInf()
	 * @generated
	 */
	public EAttribute getCPNIntInf_Low() {
		return (EAttribute)cpnIntInfEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNIntInf#getHigh <em>High</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>High</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNIntInf#getHigh()
	 * @see #getCPNIntInf()
	 * @generated
	 */
	public EAttribute getCPNIntInf_High() {
		return (EAttribute)cpnIntInfEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.cpntypes.CPNList <em>CPN List</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>CPN List</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNList
	 * @generated
	 */
	public EClass getCPNList() {
		return cpnListEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNList#getSort <em>Sort</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Sort</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNList#getSort()
	 * @see #getCPNList()
	 * @generated
	 */
	public EAttribute getCPNList_Sort() {
		return (EAttribute)cpnListEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNList#getLow <em>Low</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Low</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNList#getLow()
	 * @see #getCPNList()
	 * @generated
	 */
	public EAttribute getCPNList_Low() {
		return (EAttribute)cpnListEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNList#getHigh <em>High</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>High</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNList#getHigh()
	 * @see #getCPNList()
	 * @generated
	 */
	public EAttribute getCPNList_High() {
		return (EAttribute)cpnListEClass.getEStructuralFeatures().get(2);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.cpntypes.CPNProduct <em>CPN Product</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>CPN Product</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNProduct
	 * @generated
	 */
	public EClass getCPNProduct() {
		return cpnProductEClass;
	}

	/**
	 * Returns the meta object for the attribute list '{@link org.cpntools.accesscpn.model.cpntypes.CPNProduct#getTypes <em>Types</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute list '<em>Types</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNProduct#getTypes()
	 * @see #getCPNProduct()
	 * @generated
	 */
	public EAttribute getCPNProduct_Types() {
		return (EAttribute)cpnProductEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.cpntypes.CPNReal <em>CPN Real</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>CPN Real</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNReal
	 * @generated
	 */
	public EClass getCPNReal() {
		return cpnRealEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNReal#getHigh <em>High</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>High</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNReal#getHigh()
	 * @see #getCPNReal()
	 * @generated
	 */
	public EAttribute getCPNReal_High() {
		return (EAttribute)cpnRealEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNReal#getLow <em>Low</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Low</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNReal#getLow()
	 * @see #getCPNReal()
	 * @generated
	 */
	public EAttribute getCPNReal_Low() {
		return (EAttribute)cpnRealEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.cpntypes.CPNRecord <em>CPN Record</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>CPN Record</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNRecord
	 * @generated
	 */
	public EClass getCPNRecord() {
		return cpnRecordEClass;
	}

	/**
	 * Returns the meta object for the containment reference list '{@link org.cpntools.accesscpn.model.cpntypes.CPNRecord#getValues <em>Values</em>}'.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @return the meta object for the containment reference list '<em>Values</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNRecord#getValues()
	 * @see #getCPNRecord()
	 * @generated
	 */
	public EReference getCPNRecord_Values() {
		return (EReference)cpnRecordEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.cpntypes.CPNString <em>CPN String</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>CPN String</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNString
	 * @generated
	 */
	public EClass getCPNString() {
		return cpnStringEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNString#getRangeLow <em>Range Low</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Range Low</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNString#getRangeLow()
	 * @see #getCPNString()
	 * @generated
	 */
	public EAttribute getCPNString_RangeLow() {
		return (EAttribute)cpnStringEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNString#getRangeHigh <em>Range High</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Range High</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNString#getRangeHigh()
	 * @see #getCPNString()
	 * @generated
	 */
	public EAttribute getCPNString_RangeHigh() {
		return (EAttribute)cpnStringEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNString#getLengthLow <em>Length Low</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Length Low</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNString#getLengthLow()
	 * @see #getCPNString()
	 * @generated
	 */
	public EAttribute getCPNString_LengthLow() {
		return (EAttribute)cpnStringEClass.getEStructuralFeatures().get(2);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNString#getLengthHigh <em>Length High</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Length High</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNString#getLengthHigh()
	 * @see #getCPNString()
	 * @generated
	 */
	public EAttribute getCPNString_LengthHigh() {
		return (EAttribute)cpnStringEClass.getEStructuralFeatures().get(3);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.cpntypes.CPNSubset <em>CPN Subset</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>CPN Subset</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNSubset
	 * @generated
	 */
	public EClass getCPNSubset() {
		return cpnSubsetEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNSubset#getSort <em>Sort</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Sort</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNSubset#getSort()
	 * @see #getCPNSubset()
	 * @generated
	 */
	public EAttribute getCPNSubset_Sort() {
		return (EAttribute)cpnSubsetEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNSubset#getBy <em>By</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>By</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNSubset#getBy()
	 * @see #getCPNSubset()
	 * @generated
	 */
	public EAttribute getCPNSubset_By() {
		return (EAttribute)cpnSubsetEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNSubset#getWith <em>With</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>With</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNSubset#getWith()
	 * @see #getCPNSubset()
	 * @generated
	 */
	public EAttribute getCPNSubset_With() {
		return (EAttribute)cpnSubsetEClass.getEStructuralFeatures().get(2);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.cpntypes.CPNTime <em>CPN Time</em>}'.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the meta object for class '<em>CPN Time</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNTime
	 * @generated
	 */
	public EClass getCPNTime() {
		return cpnTimeEClass;
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.cpntypes.CPNType <em>CPN Type</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>CPN Type</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNType
	 * @generated
	 */
	public EClass getCPNType() {
		return cpnTypeEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNType#getTimed <em>Timed</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Timed</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNType#getTimed()
	 * @see #getCPNType()
	 * @generated
	 */
	public EAttribute getCPNType_Timed() {
		return (EAttribute)cpnTypeEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the attribute list '{@link org.cpntools.accesscpn.model.cpntypes.CPNType#getDeclares <em>Declares</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute list '<em>Declares</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNType#getDeclares()
	 * @see #getCPNType()
	 * @generated
	 */
	public EAttribute getCPNType_Declares() {
		return (EAttribute)cpnTypeEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.cpntypes.CPNUnion <em>CPN Union</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>CPN Union</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNUnion
	 * @generated
	 */
	public EClass getCPNUnion() {
		return cpnUnionEClass;
	}

	/**
	 * Returns the meta object for the containment reference list '{@link org.cpntools.accesscpn.model.cpntypes.CPNUnion#getValues <em>Values</em>}'.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @return the meta object for the containment reference list '<em>Values</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNUnion#getValues()
	 * @see #getCPNUnion()
	 * @generated
	 */
	public EReference getCPNUnion_Values() {
		return (EReference)cpnUnionEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.cpntypes.CPNUnit <em>CPN Unit</em>}'. <!--
	 * begin-user-doc --> <!-- end-user-doc -->
	 * 
	 * @return the meta object for class '<em>CPN Unit</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNUnit
	 * @generated
	 */
	public EClass getCPNUnit() {
		return cpnUnitEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.CPNUnit#getId <em>Id</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Id</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNUnit#getId()
	 * @see #getCPNUnit()
	 * @generated
	 */
	public EAttribute getCPNUnit_Id() {
		return (EAttribute)cpnUnitEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for class '{@link org.cpntools.accesscpn.model.cpntypes.NameTypePair <em>Name Type Pair</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for class '<em>Name Type Pair</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.NameTypePair
	 * @generated
	 */
	public EClass getNameTypePair() {
		return nameTypePairEClass;
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.NameTypePair#getName <em>Name</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Name</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.NameTypePair#getName()
	 * @see #getNameTypePair()
	 * @generated
	 */
	public EAttribute getNameTypePair_Name() {
		return (EAttribute)nameTypePairEClass.getEStructuralFeatures().get(0);
	}

	/**
	 * Returns the meta object for the attribute '{@link org.cpntools.accesscpn.model.cpntypes.NameTypePair#getSort <em>Sort</em>}'.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the meta object for the attribute '<em>Sort</em>'.
	 * @see org.cpntools.accesscpn.model.cpntypes.NameTypePair#getSort()
	 * @see #getNameTypePair()
	 * @generated
	 */
	public EAttribute getNameTypePair_Sort() {
		return (EAttribute)nameTypePairEClass.getEStructuralFeatures().get(1);
	}

	/**
	 * Returns the factory that creates the instances of the model.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @return the factory that creates the instances of the model.
	 * @generated
	 */
	public CpntypesFactory getCpntypesFactory() {
		return (CpntypesFactory)getEFactoryInstance();
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
		cpnAliasEClass = createEClass(CPN_ALIAS);
		createEAttribute(cpnAliasEClass, CPN_ALIAS__SORT);

		cpnBoolEClass = createEClass(CPN_BOOL);
		createEAttribute(cpnBoolEClass, CPN_BOOL__TRUE_VALUE);
		createEAttribute(cpnBoolEClass, CPN_BOOL__FALSE_VALUE);

		cpnEnumEClass = createEClass(CPN_ENUM);
		createEAttribute(cpnEnumEClass, CPN_ENUM__VALUES);

		cpnIndexEClass = createEClass(CPN_INDEX);
		createEAttribute(cpnIndexEClass, CPN_INDEX__NAME);
		createEAttribute(cpnIndexEClass, CPN_INDEX__LOW);
		createEAttribute(cpnIndexEClass, CPN_INDEX__HIGH);

		cpnIntEClass = createEClass(CPN_INT);
		createEAttribute(cpnIntEClass, CPN_INT__LOW);
		createEAttribute(cpnIntEClass, CPN_INT__HIGH);

		cpnIntInfEClass = createEClass(CPN_INT_INF);
		createEAttribute(cpnIntInfEClass, CPN_INT_INF__LOW);
		createEAttribute(cpnIntInfEClass, CPN_INT_INF__HIGH);

		cpnListEClass = createEClass(CPN_LIST);
		createEAttribute(cpnListEClass, CPN_LIST__SORT);
		createEAttribute(cpnListEClass, CPN_LIST__LOW);
		createEAttribute(cpnListEClass, CPN_LIST__HIGH);

		cpnProductEClass = createEClass(CPN_PRODUCT);
		createEAttribute(cpnProductEClass, CPN_PRODUCT__TYPES);

		cpnRealEClass = createEClass(CPN_REAL);
		createEAttribute(cpnRealEClass, CPN_REAL__LOW);
		createEAttribute(cpnRealEClass, CPN_REAL__HIGH);

		cpnRecordEClass = createEClass(CPN_RECORD);
		createEReference(cpnRecordEClass, CPN_RECORD__VALUES);

		cpnStringEClass = createEClass(CPN_STRING);
		createEAttribute(cpnStringEClass, CPN_STRING__RANGE_LOW);
		createEAttribute(cpnStringEClass, CPN_STRING__RANGE_HIGH);
		createEAttribute(cpnStringEClass, CPN_STRING__LENGTH_LOW);
		createEAttribute(cpnStringEClass, CPN_STRING__LENGTH_HIGH);

		cpnSubsetEClass = createEClass(CPN_SUBSET);
		createEAttribute(cpnSubsetEClass, CPN_SUBSET__SORT);
		createEAttribute(cpnSubsetEClass, CPN_SUBSET__BY);
		createEAttribute(cpnSubsetEClass, CPN_SUBSET__WITH);

		cpnTimeEClass = createEClass(CPN_TIME);

		cpnTypeEClass = createEClass(CPN_TYPE);
		createEAttribute(cpnTypeEClass, CPN_TYPE__TIMED);
		createEAttribute(cpnTypeEClass, CPN_TYPE__DECLARES);

		cpnUnionEClass = createEClass(CPN_UNION);
		createEReference(cpnUnionEClass, CPN_UNION__VALUES);

		cpnUnitEClass = createEClass(CPN_UNIT);
		createEAttribute(cpnUnitEClass, CPN_UNIT__ID);

		nameTypePairEClass = createEClass(NAME_TYPE_PAIR);
		createEAttribute(nameTypePairEClass, NAME_TYPE_PAIR__NAME);
		createEAttribute(nameTypePairEClass, NAME_TYPE_PAIR__SORT);
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
		cpnAliasEClass.getESuperTypes().add(this.getCPNType());
		cpnBoolEClass.getESuperTypes().add(this.getCPNType());
		cpnEnumEClass.getESuperTypes().add(this.getCPNType());
		cpnIndexEClass.getESuperTypes().add(this.getCPNType());
		cpnIntEClass.getESuperTypes().add(this.getCPNType());
		cpnIntInfEClass.getESuperTypes().add(this.getCPNType());
		cpnListEClass.getESuperTypes().add(this.getCPNType());
		cpnProductEClass.getESuperTypes().add(this.getCPNType());
		cpnRealEClass.getESuperTypes().add(this.getCPNType());
		cpnRecordEClass.getESuperTypes().add(this.getCPNType());
		cpnStringEClass.getESuperTypes().add(this.getCPNType());
		cpnSubsetEClass.getESuperTypes().add(this.getCPNType());
		cpnTimeEClass.getESuperTypes().add(this.getCPNType());
		cpnUnionEClass.getESuperTypes().add(this.getCPNType());
		cpnUnitEClass.getESuperTypes().add(this.getCPNType());

		// Initialize classes and features; add operations and parameters
		initEClass(cpnAliasEClass, CPNAlias.class, "CPNAlias", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getCPNAlias_Sort(), ecorePackage.getEString(), "sort", null, 1, 1, CPNAlias.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(cpnBoolEClass, CPNBool.class, "CPNBool", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getCPNBool_TrueValue(), ecorePackage.getEString(), "trueValue", null, 0, 1, CPNBool.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getCPNBool_FalseValue(), ecorePackage.getEString(), "falseValue", null, 0, 1, CPNBool.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(cpnEnumEClass, CPNEnum.class, "CPNEnum", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getCPNEnum_Values(), ecorePackage.getEString(), "values", null, 0, -1, CPNEnum.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(cpnIndexEClass, CPNIndex.class, "CPNIndex", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getCPNIndex_Name(), ecorePackage.getEString(), "name", null, 1, 1, CPNIndex.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getCPNIndex_Low(), ecorePackage.getEString(), "low", null, 1, 1, CPNIndex.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getCPNIndex_High(), ecorePackage.getEString(), "high", null, 1, 1, CPNIndex.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(cpnIntEClass, CPNInt.class, "CPNInt", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getCPNInt_Low(), ecorePackage.getEString(), "low", null, 0, 1, CPNInt.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getCPNInt_High(), ecorePackage.getEString(), "high", null, 0, 1, CPNInt.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(cpnIntInfEClass, CPNIntInf.class, "CPNIntInf", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getCPNIntInf_Low(), ecorePackage.getEString(), "low", null, 0, 1, CPNIntInf.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getCPNIntInf_High(), ecorePackage.getEString(), "high", null, 0, 1, CPNIntInf.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(cpnListEClass, CPNList.class, "CPNList", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getCPNList_Sort(), ecorePackage.getEString(), "sort", null, 1, 1, CPNList.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getCPNList_Low(), ecorePackage.getEString(), "low", null, 0, 1, CPNList.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getCPNList_High(), ecorePackage.getEString(), "high", null, 0, 1, CPNList.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(cpnProductEClass, CPNProduct.class, "CPNProduct", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getCPNProduct_Types(), ecorePackage.getEString(), "types", null, 0, -1, CPNProduct.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, !IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(cpnRealEClass, CPNReal.class, "CPNReal", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getCPNReal_Low(), ecorePackage.getEString(), "low", null, 0, 1, CPNReal.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getCPNReal_High(), ecorePackage.getEString(), "high", null, 0, 1, CPNReal.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(cpnRecordEClass, CPNRecord.class, "CPNRecord", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getCPNRecord_Values(), this.getNameTypePair(), null, "values", null, 1, -1, CPNRecord.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(cpnStringEClass, CPNString.class, "CPNString", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getCPNString_RangeLow(), ecorePackage.getEString(), "rangeLow", null, 0, 1, CPNString.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getCPNString_RangeHigh(), ecorePackage.getEString(), "rangeHigh", null, 0, 1, CPNString.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getCPNString_LengthLow(), ecorePackage.getEString(), "lengthLow", null, 0, 1, CPNString.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getCPNString_LengthHigh(), ecorePackage.getEString(), "lengthHigh", null, 0, 1, CPNString.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(cpnSubsetEClass, CPNSubset.class, "CPNSubset", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getCPNSubset_Sort(), ecorePackage.getEString(), "sort", null, 0, 1, CPNSubset.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getCPNSubset_By(), ecorePackage.getEString(), "by", null, 0, 1, CPNSubset.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getCPNSubset_With(), ecorePackage.getEString(), "with", null, 0, 1, CPNSubset.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(cpnTimeEClass, CPNTime.class, "CPNTime", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);

		initEClass(cpnTypeEClass, CPNType.class, "CPNType", IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getCPNType_Timed(), ecorePackage.getEBooleanObject(), "timed", null, 0, 1, CPNType.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getCPNType_Declares(), ecorePackage.getEString(), "declares", null, 0, -1, CPNType.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(cpnUnionEClass, CPNUnion.class, "CPNUnion", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEReference(getCPNUnion_Values(), this.getNameTypePair(), null, "values", null, 1, -1, CPNUnion.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, IS_COMPOSITE, !IS_RESOLVE_PROXIES, !IS_UNSETTABLE, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(cpnUnitEClass, CPNUnit.class, "CPNUnit", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getCPNUnit_Id(), ecorePackage.getEString(), "id", null, 0, 1, CPNUnit.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

		initEClass(nameTypePairEClass, NameTypePair.class, "NameTypePair", !IS_ABSTRACT, !IS_INTERFACE, IS_GENERATED_INSTANCE_CLASS);
		initEAttribute(getNameTypePair_Name(), ecorePackage.getEString(), "name", null, 0, 1, NameTypePair.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);
		initEAttribute(getNameTypePair_Sort(), ecorePackage.getEString(), "sort", null, 0, 1, NameTypePair.class, !IS_TRANSIENT, !IS_VOLATILE, IS_CHANGEABLE, !IS_UNSETTABLE, !IS_ID, IS_UNIQUE, !IS_DERIVED, IS_ORDERED);

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
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNAliasImpl <em>CPN Alias</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNAliasImpl
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNAlias()
		 * @generated
		 */
		public static final EClass CPN_ALIAS = eINSTANCE.getCPNAlias();

		/**
		 * The meta object literal for the '<em><b>Sort</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_ALIAS__SORT = eINSTANCE.getCPNAlias_Sort();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNBoolImpl <em>CPN Bool</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNBoolImpl
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNBool()
		 * @generated
		 */
		public static final EClass CPN_BOOL = eINSTANCE.getCPNBool();

		/**
		 * The meta object literal for the '<em><b>True Value</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_BOOL__TRUE_VALUE = eINSTANCE.getCPNBool_TrueValue();

		/**
		 * The meta object literal for the '<em><b>False Value</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_BOOL__FALSE_VALUE = eINSTANCE.getCPNBool_FalseValue();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNEnumImpl <em>CPN Enum</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNEnumImpl
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNEnum()
		 * @generated
		 */
		public static final EClass CPN_ENUM = eINSTANCE.getCPNEnum();

		/**
		 * The meta object literal for the '<em><b>Values</b></em>' attribute list feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_ENUM__VALUES = eINSTANCE.getCPNEnum_Values();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNIndexImpl <em>CPN Index</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNIndexImpl
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNIndex()
		 * @generated
		 */
		public static final EClass CPN_INDEX = eINSTANCE.getCPNIndex();

		/**
		 * The meta object literal for the '<em><b>Name</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_INDEX__NAME = eINSTANCE.getCPNIndex_Name();

		/**
		 * The meta object literal for the '<em><b>Low</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_INDEX__LOW = eINSTANCE.getCPNIndex_Low();

		/**
		 * The meta object literal for the '<em><b>High</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_INDEX__HIGH = eINSTANCE.getCPNIndex_High();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNIntImpl <em>CPN Int</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNIntImpl
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNInt()
		 * @generated
		 */
		public static final EClass CPN_INT = eINSTANCE.getCPNInt();

		/**
		 * The meta object literal for the '<em><b>Low</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_INT__LOW = eINSTANCE.getCPNInt_Low();

		/**
		 * The meta object literal for the '<em><b>High</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_INT__HIGH = eINSTANCE.getCPNInt_High();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNIntInfImpl <em>CPN Int Inf</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNIntInfImpl
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNIntInf()
		 * @generated
		 */
		public static final EClass CPN_INT_INF = eINSTANCE.getCPNIntInf();

		/**
		 * The meta object literal for the '<em><b>Low</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_INT_INF__LOW = eINSTANCE.getCPNIntInf_Low();

		/**
		 * The meta object literal for the '<em><b>High</b></em>' attribute feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_INT_INF__HIGH = eINSTANCE.getCPNIntInf_High();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNListImpl <em>CPN List</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNListImpl
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNList()
		 * @generated
		 */
		public static final EClass CPN_LIST = eINSTANCE.getCPNList();

		/**
		 * The meta object literal for the '<em><b>Sort</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_LIST__SORT = eINSTANCE.getCPNList_Sort();

		/**
		 * The meta object literal for the '<em><b>Low</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_LIST__LOW = eINSTANCE.getCPNList_Low();

		/**
		 * The meta object literal for the '<em><b>High</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_LIST__HIGH = eINSTANCE.getCPNList_High();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNProductImpl <em>CPN Product</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNProductImpl
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNProduct()
		 * @generated
		 */
		public static final EClass CPN_PRODUCT = eINSTANCE.getCPNProduct();

		/**
		 * The meta object literal for the '<em><b>Types</b></em>' attribute list feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_PRODUCT__TYPES = eINSTANCE.getCPNProduct_Types();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNRealImpl <em>CPN Real</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNRealImpl
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNReal()
		 * @generated
		 */
		public static final EClass CPN_REAL = eINSTANCE.getCPNReal();

		/**
		 * The meta object literal for the '<em><b>High</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_REAL__HIGH = eINSTANCE.getCPNReal_High();

		/**
		 * The meta object literal for the '<em><b>Low</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_REAL__LOW = eINSTANCE.getCPNReal_Low();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNRecordImpl <em>CPN Record</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNRecordImpl
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNRecord()
		 * @generated
		 */
		public static final EClass CPN_RECORD = eINSTANCE.getCPNRecord();

		/**
		 * The meta object literal for the '<em><b>Values</b></em>' containment reference list feature. <!--
		 * begin-user-doc --> <!-- end-user-doc -->
		 * 
		 * @generated
		 */
		public static final EReference CPN_RECORD__VALUES = eINSTANCE.getCPNRecord_Values();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNStringImpl <em>CPN String</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNStringImpl
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNString()
		 * @generated
		 */
		public static final EClass CPN_STRING = eINSTANCE.getCPNString();

		/**
		 * The meta object literal for the '<em><b>Range Low</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_STRING__RANGE_LOW = eINSTANCE.getCPNString_RangeLow();

		/**
		 * The meta object literal for the '<em><b>Range High</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_STRING__RANGE_HIGH = eINSTANCE.getCPNString_RangeHigh();

		/**
		 * The meta object literal for the '<em><b>Length Low</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_STRING__LENGTH_LOW = eINSTANCE.getCPNString_LengthLow();

		/**
		 * The meta object literal for the '<em><b>Length High</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_STRING__LENGTH_HIGH = eINSTANCE.getCPNString_LengthHigh();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNSubsetImpl <em>CPN Subset</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNSubsetImpl
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNSubset()
		 * @generated
		 */
		public static final EClass CPN_SUBSET = eINSTANCE.getCPNSubset();

		/**
		 * The meta object literal for the '<em><b>Sort</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_SUBSET__SORT = eINSTANCE.getCPNSubset_Sort();

		/**
		 * The meta object literal for the '<em><b>By</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_SUBSET__BY = eINSTANCE.getCPNSubset_By();

		/**
		 * The meta object literal for the '<em><b>With</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_SUBSET__WITH = eINSTANCE.getCPNSubset_With();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNTimeImpl <em>CPN Time</em>}' class.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNTimeImpl
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNTime()
		 * @generated
		 */
		public static final EClass CPN_TIME = eINSTANCE.getCPNTime();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNTypeImpl <em>CPN Type</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNTypeImpl
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNType()
		 * @generated
		 */
		public static final EClass CPN_TYPE = eINSTANCE.getCPNType();

		/**
		 * The meta object literal for the '<em><b>Timed</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_TYPE__TIMED = eINSTANCE.getCPNType_Timed();

		/**
		 * The meta object literal for the '<em><b>Declares</b></em>' attribute list feature.
		 * <!-- begin-user-doc -->
		 * <!-- end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_TYPE__DECLARES = eINSTANCE.getCPNType_Declares();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNUnionImpl <em>CPN Union</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNUnionImpl
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNUnion()
		 * @generated
		 */
		public static final EClass CPN_UNION = eINSTANCE.getCPNUnion();

		/**
		 * The meta object literal for the '<em><b>Values</b></em>' containment reference list feature. <!--
		 * begin-user-doc --> <!-- end-user-doc -->
		 * 
		 * @generated
		 */
		public static final EReference CPN_UNION__VALUES = eINSTANCE.getCPNUnion_Values();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.CPNUnitImpl <em>CPN Unit</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CPNUnitImpl
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getCPNUnit()
		 * @generated
		 */
		public static final EClass CPN_UNIT = eINSTANCE.getCPNUnit();

		/**
		 * The meta object literal for the '<em><b>Id</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute CPN_UNIT__ID = eINSTANCE.getCPNUnit_Id();

		/**
		 * The meta object literal for the '{@link org.cpntools.accesscpn.model.cpntypes.impl.NameTypePairImpl <em>Name Type Pair</em>}' class.
		 * <!-- begin-user-doc --> <!-- end-user-doc -->
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.NameTypePairImpl
		 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl#getNameTypePair()
		 * @generated
		 */
		public static final EClass NAME_TYPE_PAIR = eINSTANCE.getNameTypePair();

		/**
		 * The meta object literal for the '<em><b>Name</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute NAME_TYPE_PAIR__NAME = eINSTANCE.getNameTypePair_Name();

		/**
		 * The meta object literal for the '<em><b>Sort</b></em>' attribute feature.
		 * <!-- begin-user-doc --> <!--
		 * end-user-doc -->
		 * @generated
		 */
		public static final EAttribute NAME_TYPE_PAIR__SORT = eINSTANCE.getNameTypePair_Sort();

	}

} // CpntypesPackageImpl
