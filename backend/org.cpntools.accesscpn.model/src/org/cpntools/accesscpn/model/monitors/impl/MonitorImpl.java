/**
 * <copyright> </copyright> $Id$
 */
package org.cpntools.accesscpn.model.monitors.impl;

import java.lang.Object;
import java.util.Collection;
import java.util.List;

import org.cpntools.accesscpn.model.HasName;
import org.cpntools.accesscpn.model.Name;
import org.cpntools.accesscpn.model.Node;
import org.cpntools.accesscpn.model.PetriNet;
import org.cpntools.accesscpn.model.declaration.MLDeclaration;
import org.cpntools.accesscpn.model.impl.HasIdImpl;
import org.cpntools.accesscpn.model.impl.ModelPackageImpl;
import org.cpntools.accesscpn.model.monitors.Monitor;
import org.cpntools.accesscpn.model.monitors.MonitorType;
import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.common.notify.NotificationChain;
import org.eclipse.emf.common.util.EList;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.InternalEObject;
import org.eclipse.emf.ecore.impl.ENotificationImpl;
import org.eclipse.emf.ecore.util.EObjectResolvingEList;
import org.eclipse.emf.ecore.util.EcoreUtil;

/**
 * <!-- begin-user-doc --> An implementation of the model object '<em><b>Monitor</b></em>'. <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * <ul>
 *   <li>{@link org.cpntools.accesscpn.model.monitors.impl.MonitorImpl#getName <em>Name</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.monitors.impl.MonitorImpl#getPetriNet <em>Petri Net</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.monitors.impl.MonitorImpl#isDisabled <em>Disabled</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.monitors.impl.MonitorImpl#isEmpty <em>Empty</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.monitors.impl.MonitorImpl#isEnabled <em>Enabled</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.monitors.impl.MonitorImpl#getExtension <em>Extension</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.monitors.impl.MonitorImpl#getKind <em>Kind</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.monitors.impl.MonitorImpl#getInit <em>Init</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.monitors.impl.MonitorImpl#getStop <em>Stop</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.monitors.impl.MonitorImpl#getPredicate <em>Predicate</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.monitors.impl.MonitorImpl#getObserver <em>Observer</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.monitors.impl.MonitorImpl#getAction <em>Action</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.monitors.impl.MonitorImpl#getNodes <em>Nodes</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.monitors.impl.MonitorImpl#isTimed <em>Timed</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.monitors.impl.MonitorImpl#isLogging <em>Logging</em>}</li>
 * </ul>
 * </p>
 *
 * @generated
 */
public class MonitorImpl extends HasIdImpl implements Monitor {
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
	 * The default value of the '{@link #isDisabled() <em>Disabled</em>}' attribute.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #isDisabled()
	 * @generated
	 * @ordered
	 */
	protected static final boolean DISABLED_EDEFAULT = false;

	/**
	 * The cached value of the '{@link #isDisabled() <em>Disabled</em>}' attribute.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #isDisabled()
	 * @generated
	 * @ordered
	 */
	protected boolean disabled = DISABLED_EDEFAULT;

	/**
	 * The default value of the '{@link #isEmpty() <em>Empty</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #isEmpty()
	 * @generated
	 * @ordered
	 */
	protected static final boolean EMPTY_EDEFAULT = false;

	/**
	 * The cached value of the '{@link #isEmpty() <em>Empty</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #isEmpty()
	 * @generated
	 * @ordered
	 */
	protected boolean empty = EMPTY_EDEFAULT;

	/**
	 * The default value of the '{@link #isEnabled() <em>Enabled</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #isEnabled()
	 * @generated
	 * @ordered
	 */
	protected static final boolean ENABLED_EDEFAULT = false;

	/**
	 * The cached value of the '{@link #isEnabled() <em>Enabled</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #isEnabled()
	 * @generated
	 * @ordered
	 */
	protected boolean enabled = ENABLED_EDEFAULT;

	/**
	 * The default value of the '{@link #getExtension() <em>Extension</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getExtension()
	 * @generated
	 * @ordered
	 */
	protected static final String EXTENSION_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getExtension() <em>Extension</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getExtension()
	 * @generated
	 * @ordered
	 */
	protected String extension = EXTENSION_EDEFAULT;

	/**
	 * The default value of the '{@link #getKind() <em>Kind</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getKind()
	 * @generated
	 * @ordered
	 */
	protected static final MonitorType KIND_EDEFAULT = MonitorType.MARKING_SIZE;

	/**
	 * The cached value of the '{@link #getKind() <em>Kind</em>}' attribute.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #getKind()
	 * @generated
	 * @ordered
	 */
	protected MonitorType kind = KIND_EDEFAULT;

	/**
	 * The cached value of the '{@link #getInit() <em>Init</em>}' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #getInit()
	 * @generated
	 * @ordered
	 */
	protected MLDeclaration init;

	/**
	 * The cached value of the '{@link #getStop() <em>Stop</em>}' containment reference.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #getStop()
	 * @generated
	 * @ordered
	 */
	protected MLDeclaration stop;

	/**
	 * The cached value of the '{@link #getPredicate() <em>Predicate</em>}' containment reference.
	 * <!-- begin-user-doc
	 * --> <!-- end-user-doc -->
	 * @see #getPredicate()
	 * @generated
	 * @ordered
	 */
	protected MLDeclaration predicate;

	/**
	 * The cached value of the '{@link #getObserver() <em>Observer</em>}' containment reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getObserver()
	 * @generated
	 * @ordered
	 */
	protected MLDeclaration observer;

	/**
	 * The cached value of the '{@link #getAction() <em>Action</em>}' reference.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getAction()
	 * @generated
	 * @ordered
	 */
	protected MLDeclaration action;

	/**
	 * The cached value of the '{@link #getNodes() <em>Nodes</em>}' reference list.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #getNodes()
	 * @generated
	 * @ordered
	 */
	protected EList<Object> nodes;

	/**
	 * The default value of the '{@link #isTimed() <em>Timed</em>}' attribute. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @see #isTimed()
	 * @generated
	 * @ordered
	 */
	protected static final boolean TIMED_EDEFAULT = false;

	/**
	 * The cached value of the '{@link #isTimed() <em>Timed</em>}' attribute. <!-- begin-user-doc --> <!-- end-user-doc
	 * -->
	 * 
	 * @see #isTimed()
	 * @generated
	 * @ordered
	 */
	protected boolean timed = TIMED_EDEFAULT;

	/**
	 * The default value of the '{@link #isLogging() <em>Logging</em>}' attribute.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #isLogging()
	 * @generated
	 * @ordered
	 */
	protected static final boolean LOGGING_EDEFAULT = false;

	/**
	 * The cached value of the '{@link #isLogging() <em>Logging</em>}' attribute.
	 * <!-- begin-user-doc --> <!--
	 * end-user-doc -->
	 * @see #isLogging()
	 * @generated
	 * @ordered
	 */
	protected boolean logging = LOGGING_EDEFAULT;

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	protected MonitorImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return MonitorsPackageImpl.Literals.MONITOR;
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
					eNotify(new ENotificationImpl(this, Notification.RESOLVE, MonitorsPackageImpl.MONITOR__NAME, oldName, name));
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
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setName(Name newName) {
		Name oldName = name;
		name = newName;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, MonitorsPackageImpl.MONITOR__NAME, oldName, name));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public PetriNet getPetriNet() {
		if (eContainerFeatureID() != MonitorsPackageImpl.MONITOR__PETRI_NET) return null;
		return (PetriNet)eContainer();
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public NotificationChain basicSetPetriNet(PetriNet newPetriNet, NotificationChain msgs) {
		msgs = eBasicSetContainer((InternalEObject)newPetriNet, MonitorsPackageImpl.MONITOR__PETRI_NET, msgs);
		return msgs;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setPetriNet(PetriNet newPetriNet) {
		if (newPetriNet != eInternalContainer() || (eContainerFeatureID() != MonitorsPackageImpl.MONITOR__PETRI_NET && newPetriNet != null)) {
			if (EcoreUtil.isAncestor(this, (EObject)newPetriNet))
				throw new IllegalArgumentException("Recursive containment not allowed for " + toString());
			NotificationChain msgs = null;
			if (eInternalContainer() != null)
				msgs = eBasicRemoveFromContainer(msgs);
			if (newPetriNet != null)
				msgs = ((InternalEObject)newPetriNet).eInverseAdd(this, ModelPackageImpl.PETRI_NET__MONITORS, PetriNet.class, msgs);
			msgs = basicSetPetriNet(newPetriNet, msgs);
			if (msgs != null) msgs.dispatch();
		}
		else if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, MonitorsPackageImpl.MONITOR__PETRI_NET, newPetriNet, newPetriNet));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public boolean isDisabled() {
		return disabled;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setDisabled(boolean newDisabled) {
		boolean oldDisabled = disabled;
		disabled = newDisabled;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, MonitorsPackageImpl.MONITOR__DISABLED, oldDisabled, disabled));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public boolean isEmpty() {
		return empty;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setEmpty(boolean newEmpty) {
		boolean oldEmpty = empty;
		empty = newEmpty;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, MonitorsPackageImpl.MONITOR__EMPTY, oldEmpty, empty));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public boolean isEnabled() {
		return enabled;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setEnabled(boolean newEnabled) {
		boolean oldEnabled = enabled;
		enabled = newEnabled;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, MonitorsPackageImpl.MONITOR__ENABLED, oldEnabled, enabled));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public String getExtension() {
		return extension;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setExtension(String newExtension) {
		String oldExtension = extension;
		extension = newExtension;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, MonitorsPackageImpl.MONITOR__EXTENSION, oldExtension, extension));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public MonitorType getKind() {
		return kind;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setKind(MonitorType newKind) {
		MonitorType oldKind = kind;
		kind = newKind == null ? KIND_EDEFAULT : newKind;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, MonitorsPackageImpl.MONITOR__KIND, oldKind, kind));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public MLDeclaration getInit() {
		return init;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public NotificationChain basicSetInit(MLDeclaration newInit, NotificationChain msgs) {
		MLDeclaration oldInit = init;
		init = newInit;
		if (eNotificationRequired()) {
			ENotificationImpl notification = new ENotificationImpl(this, Notification.SET, MonitorsPackageImpl.MONITOR__INIT, oldInit, newInit);
			if (msgs == null) msgs = notification; else msgs.add(notification);
		}
		return msgs;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setInit(MLDeclaration newInit) {
		if (newInit != init) {
			NotificationChain msgs = null;
			if (init != null)
				msgs = ((InternalEObject)init).eInverseRemove(this, EOPPOSITE_FEATURE_BASE - MonitorsPackageImpl.MONITOR__INIT, null, msgs);
			if (newInit != null)
				msgs = ((InternalEObject)newInit).eInverseAdd(this, EOPPOSITE_FEATURE_BASE - MonitorsPackageImpl.MONITOR__INIT, null, msgs);
			msgs = basicSetInit(newInit, msgs);
			if (msgs != null) msgs.dispatch();
		}
		else if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, MonitorsPackageImpl.MONITOR__INIT, newInit, newInit));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public MLDeclaration getStop() {
		return stop;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public NotificationChain basicSetStop(MLDeclaration newStop, NotificationChain msgs) {
		MLDeclaration oldStop = stop;
		stop = newStop;
		if (eNotificationRequired()) {
			ENotificationImpl notification = new ENotificationImpl(this, Notification.SET, MonitorsPackageImpl.MONITOR__STOP, oldStop, newStop);
			if (msgs == null) msgs = notification; else msgs.add(notification);
		}
		return msgs;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setStop(MLDeclaration newStop) {
		if (newStop != stop) {
			NotificationChain msgs = null;
			if (stop != null)
				msgs = ((InternalEObject)stop).eInverseRemove(this, EOPPOSITE_FEATURE_BASE - MonitorsPackageImpl.MONITOR__STOP, null, msgs);
			if (newStop != null)
				msgs = ((InternalEObject)newStop).eInverseAdd(this, EOPPOSITE_FEATURE_BASE - MonitorsPackageImpl.MONITOR__STOP, null, msgs);
			msgs = basicSetStop(newStop, msgs);
			if (msgs != null) msgs.dispatch();
		}
		else if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, MonitorsPackageImpl.MONITOR__STOP, newStop, newStop));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public MLDeclaration getPredicate() {
		return predicate;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public NotificationChain basicSetPredicate(MLDeclaration newPredicate, NotificationChain msgs) {
		MLDeclaration oldPredicate = predicate;
		predicate = newPredicate;
		if (eNotificationRequired()) {
			ENotificationImpl notification = new ENotificationImpl(this, Notification.SET, MonitorsPackageImpl.MONITOR__PREDICATE, oldPredicate, newPredicate);
			if (msgs == null) msgs = notification; else msgs.add(notification);
		}
		return msgs;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setPredicate(MLDeclaration newPredicate) {
		if (newPredicate != predicate) {
			NotificationChain msgs = null;
			if (predicate != null)
				msgs = ((InternalEObject)predicate).eInverseRemove(this, EOPPOSITE_FEATURE_BASE - MonitorsPackageImpl.MONITOR__PREDICATE, null, msgs);
			if (newPredicate != null)
				msgs = ((InternalEObject)newPredicate).eInverseAdd(this, EOPPOSITE_FEATURE_BASE - MonitorsPackageImpl.MONITOR__PREDICATE, null, msgs);
			msgs = basicSetPredicate(newPredicate, msgs);
			if (msgs != null) msgs.dispatch();
		}
		else if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, MonitorsPackageImpl.MONITOR__PREDICATE, newPredicate, newPredicate));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public MLDeclaration getObserver() {
		return observer;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	public NotificationChain basicSetObserver(MLDeclaration newObserver, NotificationChain msgs) {
		MLDeclaration oldObserver = observer;
		observer = newObserver;
		if (eNotificationRequired()) {
			ENotificationImpl notification = new ENotificationImpl(this, Notification.SET, MonitorsPackageImpl.MONITOR__OBSERVER, oldObserver, newObserver);
			if (msgs == null) msgs = notification; else msgs.add(notification);
		}
		return msgs;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setObserver(MLDeclaration newObserver) {
		if (newObserver != observer) {
			NotificationChain msgs = null;
			if (observer != null)
				msgs = ((InternalEObject)observer).eInverseRemove(this, EOPPOSITE_FEATURE_BASE - MonitorsPackageImpl.MONITOR__OBSERVER, null, msgs);
			if (newObserver != null)
				msgs = ((InternalEObject)newObserver).eInverseAdd(this, EOPPOSITE_FEATURE_BASE - MonitorsPackageImpl.MONITOR__OBSERVER, null, msgs);
			msgs = basicSetObserver(newObserver, msgs);
			if (msgs != null) msgs.dispatch();
		}
		else if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, MonitorsPackageImpl.MONITOR__OBSERVER, newObserver, newObserver));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public MLDeclaration getAction() {
		if (action != null && ((EObject)action).eIsProxy()) {
			InternalEObject oldAction = (InternalEObject)action;
			action = (MLDeclaration)eResolveProxy(oldAction);
			if (action != oldAction) {
				if (eNotificationRequired())
					eNotify(new ENotificationImpl(this, Notification.RESOLVE, MonitorsPackageImpl.MONITOR__ACTION, oldAction, action));
			}
		}
		return action;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public MLDeclaration basicGetAction() {
		return action;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setAction(MLDeclaration newAction) {
		MLDeclaration oldAction = action;
		action = newAction;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, MonitorsPackageImpl.MONITOR__ACTION, oldAction, action));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public List<Object> getNodes() {
		if (nodes == null) {
			nodes = new EObjectResolvingEList<Object>(Object.class, this, MonitorsPackageImpl.MONITOR__NODES);
		}
		return nodes;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public boolean isTimed() {
		return timed;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setTimed(boolean newTimed) {
		boolean oldTimed = timed;
		timed = newTimed;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, MonitorsPackageImpl.MONITOR__TIMED, oldTimed, timed));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public boolean isLogging() {
		return logging;
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setLogging(boolean newLogging) {
		boolean oldLogging = logging;
		logging = newLogging;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, MonitorsPackageImpl.MONITOR__LOGGING, oldLogging, logging));
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public NotificationChain eInverseAdd(InternalEObject otherEnd, int featureID, NotificationChain msgs) {
		switch (featureID) {
			case MonitorsPackageImpl.MONITOR__PETRI_NET:
				if (eInternalContainer() != null)
					msgs = eBasicRemoveFromContainer(msgs);
				return basicSetPetriNet((PetriNet)otherEnd, msgs);
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
			case MonitorsPackageImpl.MONITOR__PETRI_NET:
				return basicSetPetriNet(null, msgs);
			case MonitorsPackageImpl.MONITOR__INIT:
				return basicSetInit(null, msgs);
			case MonitorsPackageImpl.MONITOR__STOP:
				return basicSetStop(null, msgs);
			case MonitorsPackageImpl.MONITOR__PREDICATE:
				return basicSetPredicate(null, msgs);
			case MonitorsPackageImpl.MONITOR__OBSERVER:
				return basicSetObserver(null, msgs);
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
			case MonitorsPackageImpl.MONITOR__PETRI_NET:
				return eInternalContainer().eInverseRemove(this, ModelPackageImpl.PETRI_NET__MONITORS, PetriNet.class, msgs);
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
			case MonitorsPackageImpl.MONITOR__NAME:
				if (resolve) return getName();
				return basicGetName();
			case MonitorsPackageImpl.MONITOR__PETRI_NET:
				return getPetriNet();
			case MonitorsPackageImpl.MONITOR__DISABLED:
				return isDisabled();
			case MonitorsPackageImpl.MONITOR__EMPTY:
				return isEmpty();
			case MonitorsPackageImpl.MONITOR__ENABLED:
				return isEnabled();
			case MonitorsPackageImpl.MONITOR__EXTENSION:
				return getExtension();
			case MonitorsPackageImpl.MONITOR__KIND:
				return getKind();
			case MonitorsPackageImpl.MONITOR__INIT:
				return getInit();
			case MonitorsPackageImpl.MONITOR__STOP:
				return getStop();
			case MonitorsPackageImpl.MONITOR__PREDICATE:
				return getPredicate();
			case MonitorsPackageImpl.MONITOR__OBSERVER:
				return getObserver();
			case MonitorsPackageImpl.MONITOR__ACTION:
				if (resolve) return getAction();
				return basicGetAction();
			case MonitorsPackageImpl.MONITOR__NODES:
				return getNodes();
			case MonitorsPackageImpl.MONITOR__TIMED:
				return isTimed();
			case MonitorsPackageImpl.MONITOR__LOGGING:
				return isLogging();
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
			case MonitorsPackageImpl.MONITOR__NAME:
				setName((Name)newValue);
				return;
			case MonitorsPackageImpl.MONITOR__PETRI_NET:
				setPetriNet((PetriNet)newValue);
				return;
			case MonitorsPackageImpl.MONITOR__DISABLED:
				setDisabled((Boolean)newValue);
				return;
			case MonitorsPackageImpl.MONITOR__EMPTY:
				setEmpty((Boolean)newValue);
				return;
			case MonitorsPackageImpl.MONITOR__ENABLED:
				setEnabled((Boolean)newValue);
				return;
			case MonitorsPackageImpl.MONITOR__EXTENSION:
				setExtension((String)newValue);
				return;
			case MonitorsPackageImpl.MONITOR__KIND:
				setKind((MonitorType)newValue);
				return;
			case MonitorsPackageImpl.MONITOR__INIT:
				setInit((MLDeclaration)newValue);
				return;
			case MonitorsPackageImpl.MONITOR__STOP:
				setStop((MLDeclaration)newValue);
				return;
			case MonitorsPackageImpl.MONITOR__PREDICATE:
				setPredicate((MLDeclaration)newValue);
				return;
			case MonitorsPackageImpl.MONITOR__OBSERVER:
				setObserver((MLDeclaration)newValue);
				return;
			case MonitorsPackageImpl.MONITOR__ACTION:
				setAction((MLDeclaration)newValue);
				return;
			case MonitorsPackageImpl.MONITOR__NODES:
				getNodes().clear();
				getNodes().addAll((Collection<? extends Object>)newValue);
				return;
			case MonitorsPackageImpl.MONITOR__TIMED:
				setTimed((Boolean)newValue);
				return;
			case MonitorsPackageImpl.MONITOR__LOGGING:
				setLogging((Boolean)newValue);
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
			case MonitorsPackageImpl.MONITOR__NAME:
				setName((Name)null);
				return;
			case MonitorsPackageImpl.MONITOR__PETRI_NET:
				setPetriNet((PetriNet)null);
				return;
			case MonitorsPackageImpl.MONITOR__DISABLED:
				setDisabled(DISABLED_EDEFAULT);
				return;
			case MonitorsPackageImpl.MONITOR__EMPTY:
				setEmpty(EMPTY_EDEFAULT);
				return;
			case MonitorsPackageImpl.MONITOR__ENABLED:
				setEnabled(ENABLED_EDEFAULT);
				return;
			case MonitorsPackageImpl.MONITOR__EXTENSION:
				setExtension(EXTENSION_EDEFAULT);
				return;
			case MonitorsPackageImpl.MONITOR__KIND:
				setKind(KIND_EDEFAULT);
				return;
			case MonitorsPackageImpl.MONITOR__INIT:
				setInit((MLDeclaration)null);
				return;
			case MonitorsPackageImpl.MONITOR__STOP:
				setStop((MLDeclaration)null);
				return;
			case MonitorsPackageImpl.MONITOR__PREDICATE:
				setPredicate((MLDeclaration)null);
				return;
			case MonitorsPackageImpl.MONITOR__OBSERVER:
				setObserver((MLDeclaration)null);
				return;
			case MonitorsPackageImpl.MONITOR__ACTION:
				setAction((MLDeclaration)null);
				return;
			case MonitorsPackageImpl.MONITOR__NODES:
				getNodes().clear();
				return;
			case MonitorsPackageImpl.MONITOR__TIMED:
				setTimed(TIMED_EDEFAULT);
				return;
			case MonitorsPackageImpl.MONITOR__LOGGING:
				setLogging(LOGGING_EDEFAULT);
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
			case MonitorsPackageImpl.MONITOR__NAME:
				return name != null;
			case MonitorsPackageImpl.MONITOR__PETRI_NET:
				return getPetriNet() != null;
			case MonitorsPackageImpl.MONITOR__DISABLED:
				return disabled != DISABLED_EDEFAULT;
			case MonitorsPackageImpl.MONITOR__EMPTY:
				return empty != EMPTY_EDEFAULT;
			case MonitorsPackageImpl.MONITOR__ENABLED:
				return enabled != ENABLED_EDEFAULT;
			case MonitorsPackageImpl.MONITOR__EXTENSION:
				return EXTENSION_EDEFAULT == null ? extension != null : !EXTENSION_EDEFAULT.equals(extension);
			case MonitorsPackageImpl.MONITOR__KIND:
				return kind != KIND_EDEFAULT;
			case MonitorsPackageImpl.MONITOR__INIT:
				return init != null;
			case MonitorsPackageImpl.MONITOR__STOP:
				return stop != null;
			case MonitorsPackageImpl.MONITOR__PREDICATE:
				return predicate != null;
			case MonitorsPackageImpl.MONITOR__OBSERVER:
				return observer != null;
			case MonitorsPackageImpl.MONITOR__ACTION:
				return action != null;
			case MonitorsPackageImpl.MONITOR__NODES:
				return nodes != null && !nodes.isEmpty();
			case MonitorsPackageImpl.MONITOR__TIMED:
				return timed != TIMED_EDEFAULT;
			case MonitorsPackageImpl.MONITOR__LOGGING:
				return logging != LOGGING_EDEFAULT;
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
				case MonitorsPackageImpl.MONITOR__NAME: return ModelPackageImpl.HAS_NAME__NAME;
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
				case ModelPackageImpl.HAS_NAME__NAME: return MonitorsPackageImpl.MONITOR__NAME;
				default: return -1;
			}
		}
		return super.eDerivedStructuralFeatureID(baseFeatureID, baseClass);
	}

	/**
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public String toString() {
		if (eIsProxy()) return super.toString();

		StringBuffer result = new StringBuffer(super.toString());
		result.append(" (disabled: ");
		result.append(disabled);
		result.append(", empty: ");
		result.append(empty);
		result.append(", enabled: ");
		result.append(enabled);
		result.append(", extension: ");
		result.append(extension);
		result.append(", kind: ");
		result.append(kind);
		result.append(", timed: ");
		result.append(timed);
		result.append(", logging: ");
		result.append(logging);
		result.append(')');
		return result.toString();
	}

} // MonitorImpl
