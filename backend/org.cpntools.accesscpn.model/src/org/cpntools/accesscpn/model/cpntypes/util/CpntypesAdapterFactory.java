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
package org.cpntools.accesscpn.model.cpntypes.util;



import org.cpntools.accesscpn.model.cpntypes.*;
import org.cpntools.accesscpn.model.cpntypes.CPNAlias;
import org.cpntools.accesscpn.model.cpntypes.CPNBool;
import org.cpntools.accesscpn.model.cpntypes.CPNEnum;
import org.cpntools.accesscpn.model.cpntypes.CPNIndex;
import org.cpntools.accesscpn.model.cpntypes.CPNInt;
import org.cpntools.accesscpn.model.cpntypes.CPNList;
import org.cpntools.accesscpn.model.cpntypes.CPNProduct;
import org.cpntools.accesscpn.model.cpntypes.CPNReal;
import org.cpntools.accesscpn.model.cpntypes.CPNRecord;
import org.cpntools.accesscpn.model.cpntypes.CPNString;
import org.cpntools.accesscpn.model.cpntypes.CPNSubset;
import org.cpntools.accesscpn.model.cpntypes.CPNType;
import org.cpntools.accesscpn.model.cpntypes.CPNUnion;
import org.cpntools.accesscpn.model.cpntypes.CPNUnit;
import org.cpntools.accesscpn.model.cpntypes.NameTypePair;
import org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl;
import org.eclipse.emf.common.notify.Adapter;
import org.eclipse.emf.common.notify.Notifier;
import org.eclipse.emf.common.notify.impl.AdapterFactoryImpl;
import org.eclipse.emf.ecore.EObject;

/**
 * <!-- begin-user-doc -->
 * The <b>Adapter Factory</b> for the model.
 * It provides an adapter <code>createXXX</code> method for each class of the model.
 * <!-- end-user-doc -->
 * @see org.cpntools.accesscpn.model.cpntypes.impl.CpntypesPackageImpl
 * @generated
 */
public class CpntypesAdapterFactory extends AdapterFactoryImpl {
	/**
	 * The cached model package.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	protected static CpntypesPackageImpl modelPackage;

	/**
	 * Creates an instance of the adapter factory.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public CpntypesAdapterFactory() {
		if (modelPackage == null) {
			modelPackage = CpntypesPackageImpl.eINSTANCE;
		}
	}

	/**
	 * Returns whether this factory is applicable for the type of the object.
	 * <!-- begin-user-doc -->
	 * This implementation returns <code>true</code> if the object is either the model's package or is an instance object of the model.
	 * <!-- end-user-doc -->
	 * @return whether this factory is applicable for the type of the object.
	 * @generated
	 */
	@Override
	public boolean isFactoryForType(Object object) {
		if (object == modelPackage) {
			return true;
		}
		if (object instanceof EObject) {
			return ((EObject)object).eClass().getEPackage() == modelPackage;
		}
		return false;
	}

	/**
	 * The switch that delegates to the <code>createXXX</code> methods.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	protected CpntypesSwitch<Adapter> modelSwitch =
		new CpntypesSwitch<Adapter>() {
			@Override
			public Adapter caseCPNAlias(CPNAlias object) {
				return createCPNAliasAdapter();
			}
			@Override
			public Adapter caseCPNBool(CPNBool object) {
				return createCPNBoolAdapter();
			}
			@Override
			public Adapter caseCPNEnum(CPNEnum object) {
				return createCPNEnumAdapter();
			}
			@Override
			public Adapter caseCPNIndex(CPNIndex object) {
				return createCPNIndexAdapter();
			}
			@Override
			public Adapter caseCPNInt(CPNInt object) {
				return createCPNIntAdapter();
			}
			@Override
			public Adapter caseCPNIntInf(CPNIntInf object) {
				return createCPNIntInfAdapter();
			}
			@Override
			public Adapter caseCPNList(CPNList object) {
				return createCPNListAdapter();
			}
			@Override
			public Adapter caseCPNProduct(CPNProduct object) {
				return createCPNProductAdapter();
			}
			@Override
			public Adapter caseCPNReal(CPNReal object) {
				return createCPNRealAdapter();
			}
			@Override
			public Adapter caseCPNRecord(CPNRecord object) {
				return createCPNRecordAdapter();
			}
			@Override
			public Adapter caseCPNString(CPNString object) {
				return createCPNStringAdapter();
			}
			@Override
			public Adapter caseCPNSubset(CPNSubset object) {
				return createCPNSubsetAdapter();
			}
			@Override
			public Adapter caseCPNTime(CPNTime object) {
				return createCPNTimeAdapter();
			}
			@Override
			public Adapter caseCPNType(CPNType object) {
				return createCPNTypeAdapter();
			}
			@Override
			public Adapter caseCPNUnion(CPNUnion object) {
				return createCPNUnionAdapter();
			}
			@Override
			public Adapter caseCPNUnit(CPNUnit object) {
				return createCPNUnitAdapter();
			}
			@Override
			public Adapter caseNameTypePair(NameTypePair object) {
				return createNameTypePairAdapter();
			}
			@Override
			public Adapter defaultCase(EObject object) {
				return createEObjectAdapter();
			}
		};

	/**
	 * Creates an adapter for the <code>target</code>.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @param target the object to adapt.
	 * @return the adapter for the <code>target</code>.
	 * @generated
	 */
	@Override
	public Adapter createAdapter(Notifier target) {
		return modelSwitch.doSwitch((EObject)target);
	}


	/**
	 * Creates a new adapter for an object of class '{@link org.cpntools.accesscpn.model.cpntypes.CPNAlias <em>CPN Alias</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNAlias
	 * @generated
	 */
	public Adapter createCPNAliasAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link org.cpntools.accesscpn.model.cpntypes.CPNBool <em>CPN Bool</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNBool
	 * @generated
	 */
	public Adapter createCPNBoolAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link org.cpntools.accesscpn.model.cpntypes.CPNEnum <em>CPN Enum</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNEnum
	 * @generated
	 */
	public Adapter createCPNEnumAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link org.cpntools.accesscpn.model.cpntypes.CPNIndex <em>CPN Index</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNIndex
	 * @generated
	 */
	public Adapter createCPNIndexAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link org.cpntools.accesscpn.model.cpntypes.CPNInt <em>CPN Int</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNInt
	 * @generated
	 */
	public Adapter createCPNIntAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link org.cpntools.accesscpn.model.cpntypes.CPNIntInf <em>CPN Int Inf</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNIntInf
	 * @generated
	 */
	public Adapter createCPNIntInfAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link org.cpntools.accesscpn.model.cpntypes.CPNList <em>CPN List</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNList
	 * @generated
	 */
	public Adapter createCPNListAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link org.cpntools.accesscpn.model.cpntypes.CPNProduct <em>CPN Product</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNProduct
	 * @generated
	 */
	public Adapter createCPNProductAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link org.cpntools.accesscpn.model.cpntypes.CPNReal <em>CPN Real</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNReal
	 * @generated
	 */
	public Adapter createCPNRealAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link org.cpntools.accesscpn.model.cpntypes.CPNRecord <em>CPN Record</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNRecord
	 * @generated
	 */
	public Adapter createCPNRecordAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link org.cpntools.accesscpn.model.cpntypes.CPNString <em>CPN String</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNString
	 * @generated
	 */
	public Adapter createCPNStringAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link org.cpntools.accesscpn.model.cpntypes.CPNSubset <em>CPN Subset</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNSubset
	 * @generated
	 */
	public Adapter createCPNSubsetAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link org.cpntools.accesscpn.model.cpntypes.CPNTime <em>CPN Time</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNTime
	 * @generated
	 */
	public Adapter createCPNTimeAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link org.cpntools.accesscpn.model.cpntypes.CPNType <em>CPN Type</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNType
	 * @generated
	 */
	public Adapter createCPNTypeAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link org.cpntools.accesscpn.model.cpntypes.CPNUnion <em>CPN Union</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNUnion
	 * @generated
	 */
	public Adapter createCPNUnionAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link org.cpntools.accesscpn.model.cpntypes.CPNUnit <em>CPN Unit</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see org.cpntools.accesscpn.model.cpntypes.CPNUnit
	 * @generated
	 */
	public Adapter createCPNUnitAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for an object of class '{@link org.cpntools.accesscpn.model.cpntypes.NameTypePair <em>Name Type Pair</em>}'.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null so that we can easily ignore cases;
	 * it's useful to ignore a case when inheritance will catch all the cases anyway.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @see org.cpntools.accesscpn.model.cpntypes.NameTypePair
	 * @generated
	 */
	public Adapter createNameTypePairAdapter() {
		return null;
	}

	/**
	 * Creates a new adapter for the default case.
	 * <!-- begin-user-doc -->
	 * This default implementation returns null.
	 * <!-- end-user-doc -->
	 * @return the new adapter.
	 * @generated
	 */
	public Adapter createEObjectAdapter() {
		return null;
	}

} //CpntypesAdapterFactory
