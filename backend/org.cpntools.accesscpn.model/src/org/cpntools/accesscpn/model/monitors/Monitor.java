package org.cpntools.accesscpn.model.monitors;

import java.lang.Object;
import java.util.List;

import org.cpntools.accesscpn.model.HasId;
import org.cpntools.accesscpn.model.HasName;
import org.cpntools.accesscpn.model.PetriNet;
import org.cpntools.accesscpn.model.declaration.MLDeclaration;

/**
 * @model
 * @author michael
 */
public interface Monitor extends HasId, HasName {
	/**
	 * @model
	 */
	PetriNet getPetriNet();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.monitors.Monitor#getPetriNet <em>Petri Net</em>}' container reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Petri Net</em>' container reference.
	 * @see #getPetriNet()
	 * @generated
	 */
	void setPetriNet(PetriNet value);

	/**
	 * @model required="true"
	 * @return
	 */
	boolean isDisabled();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.monitors.Monitor#isDisabled <em>Disabled</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Disabled</em>' attribute.
	 * @see #isDisabled()
	 * @generated
	 */
	void setDisabled(boolean value);

	/**
	 * @model
	 */
	boolean isEmpty();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.monitors.Monitor#isEmpty <em>Empty</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Empty</em>' attribute.
	 * @see #isEmpty()
	 * @generated
	 */
	void setEmpty(boolean value);

	/**
	 * @model
	 */
	boolean isEnabled();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.monitors.Monitor#isEnabled <em>Enabled</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Enabled</em>' attribute.
	 * @see #isEnabled()
	 * @generated
	 */
	void setEnabled(boolean value);

	/**
	 * @model
	 */
	String getExtension();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.monitors.Monitor#getExtension <em>Extension</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Extension</em>' attribute.
	 * @see #getExtension()
	 * @generated
	 */
	void setExtension(String value);

	/**
	 * @model required="true"
	 */
	MonitorType getKind();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.monitors.Monitor#getKind <em>Kind</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Kind</em>' attribute.
	 * @see org.cpntools.accesscpn.model.monitors.MonitorType
	 * @see #getKind()
	 * @generated
	 */
	void setKind(MonitorType value);

	/**
	 * @model containment="true"
	 * @return
	 */
	MLDeclaration getInit();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.monitors.Monitor#getInit <em>Init</em>}' containment reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Init</em>' containment reference.
	 * @see #getInit()
	 * @generated
	 */
	void setInit(MLDeclaration value);

	/**
	 * @model containment="true"
	 * @return
	 */
	MLDeclaration getStop();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.monitors.Monitor#getStop <em>Stop</em>}' containment reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Stop</em>' containment reference.
	 * @see #getStop()
	 * @generated
	 */
	void setStop(MLDeclaration value);

	/**
	 * @model containment="true"
	 * @return
	 */
	MLDeclaration getPredicate();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.monitors.Monitor#getPredicate <em>Predicate</em>}' containment reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Predicate</em>' containment reference.
	 * @see #getPredicate()
	 * @generated
	 */
	void setPredicate(MLDeclaration value);

	/**
	 * @model containment="true"
	 * @return
	 */
	MLDeclaration getObserver();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.monitors.Monitor#getObserver <em>Observer</em>}' containment reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Observer</em>' containment reference.
	 * @see #getObserver()
	 * @generated
	 */
	void setObserver(MLDeclaration value);

	/**
	 * @model
	 * @return
	 */
	MLDeclaration getAction();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.monitors.Monitor#getAction <em>Action</em>}' reference.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Action</em>' reference.
	 * @see #getAction()
	 * @generated
	 */
	void setAction(MLDeclaration value);

	/**
	 * @model containment="false"
	 * @return
	 */
	List<Object> getNodes();

	/**
	 * @model
	 */
	boolean isTimed();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.monitors.Monitor#isTimed <em>Timed</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Timed</em>' attribute.
	 * @see #isTimed()
	 * @generated
	 */
	void setTimed(boolean value);

	/**
	 * @model
	 */
	boolean isLogging();

	/**
	 * Sets the value of the '{@link org.cpntools.accesscpn.model.monitors.Monitor#isLogging <em>Logging</em>}' attribute.
	 * <!-- begin-user-doc --> <!-- end-user-doc -->
	 * @param value the new value of the '<em>Logging</em>' attribute.
	 * @see #isLogging()
	 * @generated
	 */
	void setLogging(boolean value);
}
