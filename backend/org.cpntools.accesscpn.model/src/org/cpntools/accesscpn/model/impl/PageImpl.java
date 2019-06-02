/**
 * <copyright> </copyright> $Id$
 */
package org.cpntools.accesscpn.model.impl;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import org.cpntools.accesscpn.model.Arc;
import org.cpntools.accesscpn.model.HasLabel;
import org.cpntools.accesscpn.model.HasName;
import org.cpntools.accesscpn.model.Instance;
import org.cpntools.accesscpn.model.Label;
import org.cpntools.accesscpn.model.Name;
import org.cpntools.accesscpn.model.Page;
import org.cpntools.accesscpn.model.PetriNet;
import org.cpntools.accesscpn.model.Place;
import org.cpntools.accesscpn.model.RefPlace;
import org.cpntools.accesscpn.model.Transition;
import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.common.notify.NotificationChain;
import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.InternalEObject;
import org.eclipse.emf.ecore.impl.ENotificationImpl;
import org.eclipse.emf.ecore.util.EObjectContainmentWithInverseEList;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.ecore.util.InternalEList;


/**
 * <!-- begin-user-doc --> An implementation of the model object '<em><b>Page</b></em>'. <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * <ul>
 *   <li>{@link org.cpntools.accesscpn.model.impl.PageImpl#getName <em>Name</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.impl.PageImpl#getLabel <em>Label</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.impl.PageImpl#getPetriNet <em>Petri Net</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.impl.PageImpl#getObject <em>Object</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.impl.PageImpl#getArc <em>Arc</em>}</li>
 * </ul>
 * </p>
 *
 * @generated
 */
public class PageImpl extends HasIdImpl implements Page {
	/**
	 * The cached value of the '{@link #getName() <em>Name</em>}' reference. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @see #getName()
	 * @generated
	 * @ordered
	 */
	protected Name name;

	/**
	 * The cached value of the '{@link #getLabel() <em>Label</em>}' containment reference list.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getLabel()
	 * @generated
	 * @ordered
	 */
	protected EList<Label> label;

	/**
	 * The cached value of the '{@link #getObject() <em>Object</em>}' containment reference list.
	 * <!-- begin-user-doc
	 * --> <!-- end-user-doc -->
	 * @see #getObject()
	 * @generated
	 * @ordered
	 */
	protected EList<org.cpntools.accesscpn.model.Object> object;

	/**
	 * The cached value of the '{@link #getArc() <em>Arc</em>}' containment reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #getArc()
	 * @generated
	 * @ordered
	 */
	protected EList<Arc> arc;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	protected PageImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return ModelPackageImpl.Literals.PAGE;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public Name getName() {
		if (name != null && ((EObject)name).eIsProxy()) {
			InternalEObject oldName = (InternalEObject)name;
			name = (Name)eResolveProxy(oldName);
			if (name != oldName) {
				if (eNotificationRequired())
					eNotify(new ENotificationImpl(this, Notification.RESOLVE, ModelPackageImpl.PAGE__NAME, oldName, name));
			}
		}
		return name;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public Name basicGetName() {
		return name;
	}

	/**
	 * @see org.cpntools.accesscpn.model.HasName#setName(org.cpntools.accesscpn.model.Name)
	 */
	@Override
    public void setName(final Name newName) {
		if (name != null) {
			name.setParent(null);
		}
		setNameGen(newName);
		if (newName != null) {
			newName.setParent(this);
		}
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public void setNameGen(Name newName) {
		Name oldName = name;
		name = newName;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.PAGE__NAME, oldName, name));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public List<Label> getLabel() {
		if (label == null) {
			label = new EObjectContainmentWithInverseEList<Label>(Label.class, this, ModelPackageImpl.PAGE__LABEL, ModelPackageImpl.LABEL__PARENT);
		}
		return label;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public PetriNet getPetriNet() {
		if (eContainerFeatureID() != ModelPackageImpl.PAGE__PETRI_NET) return null;
		return (PetriNet)eContainer();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public NotificationChain basicSetPetriNet(PetriNet newPetriNet, NotificationChain msgs) {
		msgs = eBasicSetContainer((InternalEObject)newPetriNet, ModelPackageImpl.PAGE__PETRI_NET, msgs);
		return msgs;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setPetriNet(PetriNet newPetriNet) {
		if (newPetriNet != eInternalContainer() || (eContainerFeatureID() != ModelPackageImpl.PAGE__PETRI_NET && newPetriNet != null)) {
			if (EcoreUtil.isAncestor(this, (EObject)newPetriNet))
				throw new IllegalArgumentException("Recursive containment not allowed for " + toString());
			NotificationChain msgs = null;
			if (eInternalContainer() != null)
				msgs = eBasicRemoveFromContainer(msgs);
			if (newPetriNet != null)
				msgs = ((InternalEObject)newPetriNet).eInverseAdd(this, ModelPackageImpl.PETRI_NET__PAGE, PetriNet.class, msgs);
			msgs = basicSetPetriNet(newPetriNet, msgs);
			if (msgs != null) msgs.dispatch();
		}
		else if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, ModelPackageImpl.PAGE__PETRI_NET, newPetriNet, newPetriNet));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public List<org.cpntools.accesscpn.model.Object> getObject() {
		if (object == null) {
			object = new EObjectContainmentWithInverseEList<org.cpntools.accesscpn.model.Object>(org.cpntools.accesscpn.model.Object.class, this, ModelPackageImpl.PAGE__OBJECT, ModelPackageImpl.OBJECT__PAGE);
		}
		return object;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public List<Arc> getArc() {
		if (arc == null) {
			arc = new EObjectContainmentWithInverseEList<Arc>(Arc.class, this, ModelPackageImpl.PAGE__ARC, ModelPackageImpl.ARC__PAGE);
		}
		return arc;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@SuppressWarnings("unchecked")
	@Override
	public NotificationChain eInverseAdd(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
			case ModelPackageImpl.PAGE__LABEL:
				return ((InternalEList<InternalEObject>)(InternalEList<?>)getLabel()).basicAdd(otherEnd, msgs);
			case ModelPackageImpl.PAGE__PETRI_NET:
				if (eInternalContainer() != null)
					msgs = eBasicRemoveFromContainer(msgs);
				return basicSetPetriNet((PetriNet)otherEnd, msgs);
			case ModelPackageImpl.PAGE__OBJECT:
				return ((InternalEList<InternalEObject>)(InternalEList<?>)getObject()).basicAdd(otherEnd, msgs);
			case ModelPackageImpl.PAGE__ARC:
				return ((InternalEList<InternalEObject>)(InternalEList<?>)getArc()).basicAdd(otherEnd, msgs);
		}
		return super.eInverseAdd(otherEnd, featureID, msgs);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public NotificationChain eInverseRemove(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
			case ModelPackageImpl.PAGE__LABEL:
				return ((InternalEList<?>)getLabel()).basicRemove(otherEnd, msgs);
			case ModelPackageImpl.PAGE__PETRI_NET:
				return basicSetPetriNet(null, msgs);
			case ModelPackageImpl.PAGE__OBJECT:
				return ((InternalEList<?>)getObject()).basicRemove(otherEnd, msgs);
			case ModelPackageImpl.PAGE__ARC:
				return ((InternalEList<?>)getArc()).basicRemove(otherEnd, msgs);
		}
		return super.eInverseRemove(otherEnd, featureID, msgs);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public NotificationChain eBasicRemoveFromContainerFeature(NotificationChain msgs) {
		switch (eContainerFeatureID()) {
			case ModelPackageImpl.PAGE__PETRI_NET:
				return eInternalContainer().eInverseRemove(this, ModelPackageImpl.PETRI_NET__PAGE, PetriNet.class, msgs);
		}
		return super.eBasicRemoveFromContainerFeature(msgs);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Object eGet(int featureID, boolean resolve, boolean coreType) {
		switch (featureID) {
			case ModelPackageImpl.PAGE__NAME:
				if (resolve) return getName();
				return basicGetName();
			case ModelPackageImpl.PAGE__LABEL:
				return getLabel();
			case ModelPackageImpl.PAGE__PETRI_NET:
				return getPetriNet();
			case ModelPackageImpl.PAGE__OBJECT:
				return getObject();
			case ModelPackageImpl.PAGE__ARC:
				return getArc();
		}
		return super.eGet(featureID, resolve, coreType);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@SuppressWarnings("unchecked")
	@Override
	public void eSet(int featureID, Object newValue) {
		switch (featureID) {
			case ModelPackageImpl.PAGE__NAME:
				setName((Name)newValue);
				return;
			case ModelPackageImpl.PAGE__LABEL:
				getLabel().clear();
				getLabel().addAll((Collection<? extends Label>)newValue);
				return;
			case ModelPackageImpl.PAGE__PETRI_NET:
				setPetriNet((PetriNet)newValue);
				return;
			case ModelPackageImpl.PAGE__OBJECT:
				getObject().clear();
				getObject().addAll((Collection<? extends org.cpntools.accesscpn.model.Object>)newValue);
				return;
			case ModelPackageImpl.PAGE__ARC:
				getArc().clear();
				getArc().addAll((Collection<? extends Arc>)newValue);
				return;
		}
		super.eSet(featureID, newValue);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void eUnset(int featureID) {
		switch (featureID) {
			case ModelPackageImpl.PAGE__NAME:
				setName((Name)null);
				return;
			case ModelPackageImpl.PAGE__LABEL:
				getLabel().clear();
				return;
			case ModelPackageImpl.PAGE__PETRI_NET:
				setPetriNet((PetriNet)null);
				return;
			case ModelPackageImpl.PAGE__OBJECT:
				getObject().clear();
				return;
			case ModelPackageImpl.PAGE__ARC:
				getArc().clear();
				return;
		}
		super.eUnset(featureID);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public boolean eIsSet(int featureID) {
		switch (featureID) {
			case ModelPackageImpl.PAGE__NAME:
				return name != null;
			case ModelPackageImpl.PAGE__LABEL:
				return label != null && !label.isEmpty();
			case ModelPackageImpl.PAGE__PETRI_NET:
				return getPetriNet() != null;
			case ModelPackageImpl.PAGE__OBJECT:
				return object != null && !object.isEmpty();
			case ModelPackageImpl.PAGE__ARC:
				return arc != null && !arc.isEmpty();
		}
		return super.eIsSet(featureID);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public int eBaseStructuralFeatureID(int derivedFeatureID, Class<?> baseClass) {
		if (baseClass == HasName.class) {
			switch (derivedFeatureID) {
				case ModelPackageImpl.PAGE__NAME: return ModelPackageImpl.HAS_NAME__NAME;
				default: return -1;
			}
		}
		if (baseClass == HasLabel.class) {
			switch (derivedFeatureID) {
				case ModelPackageImpl.PAGE__LABEL: return ModelPackageImpl.HAS_LABEL__LABEL;
				default: return -1;
			}
		}
		return super.eBaseStructuralFeatureID(derivedFeatureID, baseClass);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public int eDerivedStructuralFeatureID(int baseFeatureID, Class<?> baseClass) {
		if (baseClass == HasName.class) {
			switch (baseFeatureID) {
				case ModelPackageImpl.HAS_NAME__NAME: return ModelPackageImpl.PAGE__NAME;
				default: return -1;
			}
		}
		if (baseClass == HasLabel.class) {
			switch (baseFeatureID) {
				case ModelPackageImpl.HAS_LABEL__LABEL: return ModelPackageImpl.PAGE__LABEL;
				default: return -1;
			}
		}
		return super.eDerivedStructuralFeatureID(baseFeatureID, baseClass);
	}

	/**
	 * @see org.cpntools.accesscpn.model.Page#place()
	 */
	@Override
    @SuppressWarnings("unchecked")
	public Iterable<Place> place() {
		return new Iterable<Place>() {
			@Override
            public Iterator<Place> iterator() {
				return (FilterIterator<Place>) (FilterIterator<?>) new FilterIterator<org.cpntools.accesscpn.model.Object>(
				        getObject().iterator()) {
					@Override
					public boolean accept(final org.cpntools.accesscpn.model.Object object) {
						return object instanceof Place;
					}
				};
			}
		};
	}

	/**
	 * @see org.cpntools.accesscpn.model.Page#transition()
	 */
	@Override
    @SuppressWarnings("unchecked")
	public Iterable<Transition> transition() {
		return new Iterable<Transition>() {
			@Override
            public Iterator<Transition> iterator() {
				return (FilterIterator<Transition>) (FilterIterator<?>) new FilterIterator<org.cpntools.accesscpn.model.Object>(
				        getObject().iterator()) {
					@Override
					public boolean accept(final org.cpntools.accesscpn.model.Object object) {
						return object instanceof Transition;
					}
				};
			}
		};
	}

	/**
	 * @see org.cpntools.accesscpn.model.Page#instance()
	 */
	@Override
    @SuppressWarnings("unchecked")
	public Iterable<Instance> instance() {
		return new Iterable<Instance>() {
			@Override
            public Iterator<Instance> iterator() {
				return (FilterIterator<Instance>) (FilterIterator<?>) new FilterIterator<org.cpntools.accesscpn.model.Object>(
				        getObject().iterator()) {
					@Override
					public boolean accept(final org.cpntools.accesscpn.model.Object object) {
						return object instanceof Instance;
					}
				};
			}
		};
	}

	/**
	 * @see org.cpntools.accesscpn.model.Page#fusionGroup()
	 */
	@Override
    @SuppressWarnings("unchecked")
	public Iterable<RefPlace> fusionGroup() {
		return new Iterable<RefPlace>() {
			@Override
            public Iterator<RefPlace> iterator() {
				return (FilterIterator<RefPlace>) (FilterIterator<?>) new FilterIterator<org.cpntools.accesscpn.model.Object>(
				        getObject().iterator()) {
					@Override
					public boolean accept(final org.cpntools.accesscpn.model.Object object) {
						return object instanceof RefPlace && ((RefPlace) object).isFusionGroup();
					}
				};
			}
		};
	}

	/**
	 * @see org.cpntools.accesscpn.model.Page#portPlace()
	 */
	@Override
    @SuppressWarnings("unchecked")
	public Iterable<RefPlace> portPlace() {
		return new Iterable<RefPlace>() {
			@Override
            public Iterator<RefPlace> iterator() {
				return (FilterIterator<RefPlace>) (FilterIterator<?>) new FilterIterator<org.cpntools.accesscpn.model.Object>(
				        getObject().iterator()) {
					@Override
					public boolean accept(final org.cpntools.accesscpn.model.Object object) {
						return object instanceof RefPlace && ((RefPlace) object).isPort();
					}
				};
			}
		};
	}

	/**
	 * @see org.cpntools.accesscpn.model.Page#place()
	 */
	@Override
    @SuppressWarnings("unchecked")
	public Iterable<Place> readyPlaces() {
		return new Iterable<Place>() {
			@Override
            public Iterator<Place> iterator() {
				return (FilterIterator<Place>) (FilterIterator<?>) new FilterIterator<org.cpntools.accesscpn.model.Object>(
				        getObject().iterator()) {
					@Override
					public boolean accept(final org.cpntools.accesscpn.model.Object object) {
						return object instanceof Place && ((Place) object).isReady();
					}
				};
			}
		};
	}

	/**
	 * @see org.cpntools.accesscpn.model.Page#transition()
	 */
	@Override
    @SuppressWarnings("unchecked")
	public Iterable<Transition> readyTransitions() {
		return new Iterable<Transition>() {
			@Override
            public Iterator<Transition> iterator() {
				return (FilterIterator<Transition>) (FilterIterator<?>) new FilterIterator<org.cpntools.accesscpn.model.Object>(
				        getObject().iterator()) {
					@Override
					public boolean accept(final org.cpntools.accesscpn.model.Object object) {
						return object instanceof Transition && ((Transition) object).isReady();
					}
				};
			}
		};
	}

	/**
	 * @see org.cpntools.accesscpn.model.Page#instance()
	 */
	@Override
    @SuppressWarnings("unchecked")
	public Iterable<Instance> readyInstances() {
		return new Iterable<Instance>() {
			@Override
            public Iterator<Instance> iterator() {
				return (FilterIterator<Instance>) (FilterIterator<?>) new FilterIterator<org.cpntools.accesscpn.model.Object>(
				        getObject().iterator()) {
					@Override
					public boolean accept(final org.cpntools.accesscpn.model.Object object) {
						return object instanceof Instance && ((Instance) object).isReady();
					}
				};
			}
		};
	}

	/**
	 * @see org.cpntools.accesscpn.model.Page#fusionGroup()
	 */
	@Override
    @SuppressWarnings("unchecked")
	public Iterable<RefPlace> readyFusionGroups() {
		return new Iterable<RefPlace>() {
			@Override
            public Iterator<RefPlace> iterator() {
				return (FilterIterator<RefPlace>) (FilterIterator<?>) new FilterIterator<org.cpntools.accesscpn.model.Object>(
				        getObject().iterator()) {
					@Override
					public boolean accept(final org.cpntools.accesscpn.model.Object object) {
						return object instanceof RefPlace && ((RefPlace) object).isFusionGroup()
						        && ((RefPlace) object).isReady();
					}
				};
			}
		};
	}

	/**
	 * @see org.cpntools.accesscpn.model.Page#portPlace()
	 */
	@Override
    @SuppressWarnings("unchecked")
	public Iterable<RefPlace> readyPortPlaces() {
		return new Iterable<RefPlace>() {
			@Override
            public Iterator<RefPlace> iterator() {
				return (FilterIterator<RefPlace>) (FilterIterator<?>) new FilterIterator<org.cpntools.accesscpn.model.Object>(
				        getObject().iterator()) {
					@Override
					public boolean accept(final org.cpntools.accesscpn.model.Object object) {
						return object instanceof RefPlace && ((RefPlace) object).isPort()
						        && ((RefPlace) object).isReady();
					}
				};
			}
		};
	}

} // PageImpl
