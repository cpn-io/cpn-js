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
package org.cpntools.accesscpn.model.util;




import java.util.List;

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
import org.cpntools.accesscpn.model.graphics.HasGraphics;
import org.cpntools.accesscpn.model.impl.ModelPackageImpl;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.util.Switch;

/**
 * <!-- begin-user-doc -->
 * The <b>Switch</b> for the model's inheritance hierarchy.
 * It supports the call {@link #doSwitch(EObject) doSwitch(object)}
 * to invoke the <code>caseXXX</code> method for each class of the model,
 * starting with the actual class of the object
 * and proceeding up the inheritance hierarchy
 * until a non-null result is returned,
 * which is the result of the switch.
 * <!-- end-user-doc -->
 * @see org.cpntools.accesscpn.model.impl.ModelPackageImpl
 * @generated
 */
public class ModelSwitch<T> extends Switch<T> {
	/**
	 * The cached model package
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	protected static ModelPackageImpl modelPackage;

	/**
	 * Creates an instance of the switch.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	public ModelSwitch() {
		if (modelPackage == null) {
			modelPackage = ModelPackageImpl.eINSTANCE;
		}
	}

	/**
	 * Checks whether this is a switch for the given package.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @parameter ePackage the package in question.
	 * @return whether this is a switch for the given package.
	 * @generated
	 */
	@Override
	protected boolean isSwitchFor(EPackage ePackage) {
		return ePackage == modelPackage;
	}

	/**
	 * Calls <code>caseXXX</code> for each class of the model until one returns a non null result; it yields that result.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @return the first non-null result returned by a <code>caseXXX</code> call.
	 * @generated
	 */
	@Override
 protected T doSwitch(int classifierID, EObject theEObject) {
		switch (classifierID) {
			case ModelPackageImpl.ANNOTATION: {
				Annotation annotation = (Annotation)theEObject;
				T result = caseAnnotation(annotation);
				if (result == null) result = caseLabel(annotation);
				if (result == null) result = caseHasGraphics(annotation);
				if (result == null) result = caseHLAnnotationAddin(annotation);
				if (result == null) result = caseHasToolInfo(annotation);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.ARC: {
				Arc arc = (Arc)theEObject;
				T result = caseArc(arc);
				if (result == null) result = caseHasId(arc);
				if (result == null) result = caseHasGraphics(arc);
				if (result == null) result = caseHLArcAddin(arc);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.ATTRIBUTE: {
				Attribute attribute = (Attribute)theEObject;
				T result = caseAttribute(attribute);
				if (result == null) result = caseLabel(attribute);
				if (result == null) result = caseHasToolInfo(attribute);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.CPN_TOOLS_TRANSITION_ADDIN: {
				CPNToolsTransitionAddin cpnToolsTransitionAddin = (CPNToolsTransitionAddin)theEObject;
				T result = caseCPNToolsTransitionAddin(cpnToolsTransitionAddin);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.CODE: {
				Code code = (Code)theEObject;
				T result = caseCode(code);
				if (result == null) result = caseAnnotation(code);
				if (result == null) result = caseLabel(code);
				if (result == null) result = caseHasGraphics(code);
				if (result == null) result = caseHLAnnotationAddin(code);
				if (result == null) result = caseHasToolInfo(code);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.CONDITION: {
				Condition condition = (Condition)theEObject;
				T result = caseCondition(condition);
				if (result == null) result = caseAnnotation(condition);
				if (result == null) result = caseLabel(condition);
				if (result == null) result = caseHasGraphics(condition);
				if (result == null) result = caseHLAnnotationAddin(condition);
				if (result == null) result = caseHasToolInfo(condition);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.FUSION_GROUP: {
				FusionGroup fusionGroup = (FusionGroup)theEObject;
				T result = caseFusionGroup(fusionGroup);
				if (result == null) result = casePlace(fusionGroup);
				if (result == null) result = casePlaceNode(fusionGroup);
				if (result == null) result = caseNode(fusionGroup);
				if (result == null) result = caseHLPlaceAddin(fusionGroup);
				if (result == null) result = caseObject(fusionGroup);
				if (result == null) result = caseHasId(fusionGroup);
				if (result == null) result = caseHasToolInfo(fusionGroup);
				if (result == null) result = caseHasGraphics(fusionGroup);
				if (result == null) result = caseHasLabel(fusionGroup);
				if (result == null) result = caseHasName(fusionGroup);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.HL_ANNOTATION: {
				HLAnnotation hlAnnotation = (HLAnnotation)theEObject;
				T result = caseHLAnnotation(hlAnnotation);
				if (result == null) result = caseAnnotation(hlAnnotation);
				if (result == null) result = caseLabel(hlAnnotation);
				if (result == null) result = caseHasGraphics(hlAnnotation);
				if (result == null) result = caseHLAnnotationAddin(hlAnnotation);
				if (result == null) result = caseHasToolInfo(hlAnnotation);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.HL_ANNOTATION_ADDIN: {
				HLAnnotationAddin hlAnnotationAddin = (HLAnnotationAddin)theEObject;
				T result = caseHLAnnotationAddin(hlAnnotationAddin);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.HL_ARC_ADDIN: {
				HLArcAddin hlArcAddin = (HLArcAddin)theEObject;
				T result = caseHLArcAddin(hlArcAddin);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.HL_DECLARATION: {
				HLDeclaration hlDeclaration = (HLDeclaration)theEObject;
				T result = caseHLDeclaration(hlDeclaration);
				if (result == null) result = caseAnnotation(hlDeclaration);
				if (result == null) result = caseHasId(hlDeclaration);
				if (result == null) result = caseLabel(hlDeclaration);
				if (result == null) result = caseHasGraphics(hlDeclaration);
				if (result == null) result = caseHLAnnotationAddin(hlDeclaration);
				if (result == null) result = caseHasToolInfo(hlDeclaration);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.HL_MARKING: {
				HLMarking hlMarking = (HLMarking)theEObject;
				T result = caseHLMarking(hlMarking);
				if (result == null) result = caseAnnotation(hlMarking);
				if (result == null) result = caseLabel(hlMarking);
				if (result == null) result = caseHasGraphics(hlMarking);
				if (result == null) result = caseHLAnnotationAddin(hlMarking);
				if (result == null) result = caseHasToolInfo(hlMarking);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.HL_PLACE_ADDIN: {
				HLPlaceAddin hlPlaceAddin = (HLPlaceAddin)theEObject;
				T result = caseHLPlaceAddin(hlPlaceAddin);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.HL_TRANSITION_ADDIN: {
				HLTransitionAddin hlTransitionAddin = (HLTransitionAddin)theEObject;
				T result = caseHLTransitionAddin(hlTransitionAddin);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.HAS_ID: {
				HasId hasId = (HasId)theEObject;
				T result = caseHasId(hasId);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.HAS_LABEL: {
				HasLabel hasLabel = (HasLabel)theEObject;
				T result = caseHasLabel(hasLabel);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.HAS_NAME: {
				HasName hasName = (HasName)theEObject;
				T result = caseHasName(hasName);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.HAS_TOOL_INFO: {
				HasToolInfo hasToolInfo = (HasToolInfo)theEObject;
				T result = caseHasToolInfo(hasToolInfo);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.INSTANCE: {
				Instance instance = (Instance)theEObject;
				T result = caseInstance(instance);
				if (result == null) result = caseNode(instance);
				if (result == null) result = caseObject(instance);
				if (result == null) result = caseHasId(instance);
				if (result == null) result = caseHasToolInfo(instance);
				if (result == null) result = caseHasGraphics(instance);
				if (result == null) result = caseHasLabel(instance);
				if (result == null) result = caseHasName(instance);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.LABEL: {
				Label label = (Label)theEObject;
				T result = caseLabel(label);
				if (result == null) result = caseHasToolInfo(label);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.NAME: {
				Name name = (Name)theEObject;
				T result = caseName(name);
				if (result == null) result = caseHLAnnotation(name);
				if (result == null) result = caseAnnotation(name);
				if (result == null) result = caseLabel(name);
				if (result == null) result = caseHasGraphics(name);
				if (result == null) result = caseHLAnnotationAddin(name);
				if (result == null) result = caseHasToolInfo(name);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.NODE: {
				Node node = (Node)theEObject;
				T result = caseNode(node);
				if (result == null) result = caseObject(node);
				if (result == null) result = caseHasId(node);
				if (result == null) result = caseHasToolInfo(node);
				if (result == null) result = caseHasGraphics(node);
				if (result == null) result = caseHasLabel(node);
				if (result == null) result = caseHasName(node);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.OBJECT: {
				org.cpntools.accesscpn.model.Object object = (org.cpntools.accesscpn.model.Object)theEObject;
				T result = caseObject(object);
				if (result == null) result = caseHasId(object);
				if (result == null) result = caseHasToolInfo(object);
				if (result == null) result = caseHasGraphics(object);
				if (result == null) result = caseHasLabel(object);
				if (result == null) result = caseHasName(object);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.PAGE: {
				Page page = (Page)theEObject;
				T result = casePage(page);
				if (result == null) result = caseHasId(page);
				if (result == null) result = caseHasName(page);
				if (result == null) result = caseHasLabel(page);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.PARAMETER_ASSIGNMENT: {
				ParameterAssignment parameterAssignment = (ParameterAssignment)theEObject;
				T result = caseParameterAssignment(parameterAssignment);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.PETRI_NET: {
				PetriNet petriNet = (PetriNet)theEObject;
				T result = casePetriNet(petriNet);
				if (result == null) result = caseHasId(petriNet);
				if (result == null) result = caseHasToolInfo(petriNet);
				if (result == null) result = caseHasLabel(petriNet);
				if (result == null) result = caseHasName(petriNet);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.PLACE: {
				Place place = (Place)theEObject;
				T result = casePlace(place);
				if (result == null) result = casePlaceNode(place);
				if (result == null) result = caseNode(place);
				if (result == null) result = caseHLPlaceAddin(place);
				if (result == null) result = caseObject(place);
				if (result == null) result = caseHasId(place);
				if (result == null) result = caseHasToolInfo(place);
				if (result == null) result = caseHasGraphics(place);
				if (result == null) result = caseHasLabel(place);
				if (result == null) result = caseHasName(place);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.PLACE_NODE: {
				PlaceNode placeNode = (PlaceNode)theEObject;
				T result = casePlaceNode(placeNode);
				if (result == null) result = caseNode(placeNode);
				if (result == null) result = caseHLPlaceAddin(placeNode);
				if (result == null) result = caseObject(placeNode);
				if (result == null) result = caseHasId(placeNode);
				if (result == null) result = caseHasToolInfo(placeNode);
				if (result == null) result = caseHasGraphics(placeNode);
				if (result == null) result = caseHasLabel(placeNode);
				if (result == null) result = caseHasName(placeNode);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.PRIORITY: {
				Priority priority = (Priority)theEObject;
				T result = casePriority(priority);
				if (result == null) result = caseAnnotation(priority);
				if (result == null) result = caseLabel(priority);
				if (result == null) result = caseHasGraphics(priority);
				if (result == null) result = caseHLAnnotationAddin(priority);
				if (result == null) result = caseHasToolInfo(priority);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.REF_PLACE: {
				RefPlace refPlace = (RefPlace)theEObject;
				T result = caseRefPlace(refPlace);
				if (result == null) result = casePlaceNode(refPlace);
				if (result == null) result = caseNode(refPlace);
				if (result == null) result = caseHLPlaceAddin(refPlace);
				if (result == null) result = caseObject(refPlace);
				if (result == null) result = caseHasId(refPlace);
				if (result == null) result = caseHasToolInfo(refPlace);
				if (result == null) result = caseHasGraphics(refPlace);
				if (result == null) result = caseHasLabel(refPlace);
				if (result == null) result = caseHasName(refPlace);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.REF_TRANS: {
				RefTrans refTrans = (RefTrans)theEObject;
				T result = caseRefTrans(refTrans);
				if (result == null) result = caseTransitionNode(refTrans);
				if (result == null) result = caseNode(refTrans);
				if (result == null) result = caseHLTransitionAddin(refTrans);
				if (result == null) result = caseCPNToolsTransitionAddin(refTrans);
				if (result == null) result = caseObject(refTrans);
				if (result == null) result = caseHasId(refTrans);
				if (result == null) result = caseHasToolInfo(refTrans);
				if (result == null) result = caseHasGraphics(refTrans);
				if (result == null) result = caseHasLabel(refTrans);
				if (result == null) result = caseHasName(refTrans);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.SORT: {
				Sort sort = (Sort)theEObject;
				T result = caseSort(sort);
				if (result == null) result = caseAnnotation(sort);
				if (result == null) result = caseLabel(sort);
				if (result == null) result = caseHasGraphics(sort);
				if (result == null) result = caseHLAnnotationAddin(sort);
				if (result == null) result = caseHasToolInfo(sort);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.TIME: {
				Time time = (Time)theEObject;
				T result = caseTime(time);
				if (result == null) result = caseAnnotation(time);
				if (result == null) result = caseLabel(time);
				if (result == null) result = caseHasGraphics(time);
				if (result == null) result = caseHLAnnotationAddin(time);
				if (result == null) result = caseHasToolInfo(time);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.TOOL_INFO: {
				ToolInfo toolInfo = (ToolInfo)theEObject;
				T result = caseToolInfo(toolInfo);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.TRANSITION: {
				Transition transition = (Transition)theEObject;
				T result = caseTransition(transition);
				if (result == null) result = caseTransitionNode(transition);
				if (result == null) result = caseNode(transition);
				if (result == null) result = caseHLTransitionAddin(transition);
				if (result == null) result = caseCPNToolsTransitionAddin(transition);
				if (result == null) result = caseObject(transition);
				if (result == null) result = caseHasId(transition);
				if (result == null) result = caseHasToolInfo(transition);
				if (result == null) result = caseHasGraphics(transition);
				if (result == null) result = caseHasLabel(transition);
				if (result == null) result = caseHasName(transition);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			case ModelPackageImpl.TRANSITION_NODE: {
				TransitionNode transitionNode = (TransitionNode)theEObject;
				T result = caseTransitionNode(transitionNode);
				if (result == null) result = caseNode(transitionNode);
				if (result == null) result = caseHLTransitionAddin(transitionNode);
				if (result == null) result = caseCPNToolsTransitionAddin(transitionNode);
				if (result == null) result = caseObject(transitionNode);
				if (result == null) result = caseHasId(transitionNode);
				if (result == null) result = caseHasToolInfo(transitionNode);
				if (result == null) result = caseHasGraphics(transitionNode);
				if (result == null) result = caseHasLabel(transitionNode);
				if (result == null) result = caseHasName(transitionNode);
				if (result == null) result = defaultCase(theEObject);
				return result;
			}
			default: return defaultCase(theEObject);
		}
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Annotation</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Annotation</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseAnnotation(Annotation object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Arc</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Arc</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseArc(Arc object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Attribute</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Attribute</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseAttribute(Attribute object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>CPN Tools Transition Addin</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>CPN Tools Transition Addin</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCPNToolsTransitionAddin(CPNToolsTransitionAddin object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Code</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Code</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCode(Code object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Condition</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Condition</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseCondition(Condition object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Fusion Group</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Fusion Group</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseFusionGroup(FusionGroup object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>HL Annotation</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>HL Annotation</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseHLAnnotation(HLAnnotation object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>HL Annotation Addin</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>HL Annotation Addin</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseHLAnnotationAddin(HLAnnotationAddin object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>HL Arc Addin</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>HL Arc Addin</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseHLArcAddin(HLArcAddin object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>HL Declaration</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>HL Declaration</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseHLDeclaration(HLDeclaration object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>HL Marking</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>HL Marking</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseHLMarking(HLMarking object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>HL Place Addin</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>HL Place Addin</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseHLPlaceAddin(HLPlaceAddin object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>HL Transition Addin</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>HL Transition Addin</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseHLTransitionAddin(HLTransitionAddin object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Has Id</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Has Id</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseHasId(HasId object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Has Label</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Has Label</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseHasLabel(HasLabel object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Has Name</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Has Name</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseHasName(HasName object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Has Tool Info</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Has Tool Info</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseHasToolInfo(HasToolInfo object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Instance</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Instance</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseInstance(Instance object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Label</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Label</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseLabel(Label object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Name</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Name</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseName(Name object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Node</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Node</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseNode(Node object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Object</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Object</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseObject(org.cpntools.accesscpn.model.Object object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Page</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Page</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T casePage(Page object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Parameter Assignment</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Parameter Assignment</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseParameterAssignment(ParameterAssignment object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Petri Net</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Petri Net</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T casePetriNet(PetriNet object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Place</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Place</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T casePlace(Place object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Place Node</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Place Node</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T casePlaceNode(PlaceNode object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Priority</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Priority</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T casePriority(Priority object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Ref Place</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Ref Place</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseRefPlace(RefPlace object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Ref Trans</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Ref Trans</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseRefTrans(RefTrans object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Sort</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Sort</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseSort(Sort object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Time</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Time</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseTime(Time object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Tool Info</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Tool Info</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseToolInfo(ToolInfo object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Transition</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Transition</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseTransition(Transition object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Transition Node</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Transition Node</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseTransitionNode(TransitionNode object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>Has Graphics</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>Has Graphics</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject) doSwitch(EObject)
	 * @generated
	 */
	public T caseHasGraphics(HasGraphics object) {
		return null;
	}

	/**
	 * Returns the result of interpreting the object as an instance of '<em>EObject</em>'.
	 * <!-- begin-user-doc -->
	 * This implementation returns null;
	 * returning a non-null result will terminate the switch, but this is the last case anyway.
	 * <!-- end-user-doc -->
	 * @param object the target of the switch.
	 * @return the result of interpreting the object as an instance of '<em>EObject</em>'.
	 * @see #doSwitch(org.eclipse.emf.ecore.EObject)
	 * @generated
	 */
	@Override
 public T defaultCase(EObject object) {
		return null;
	}

} //ModelSwitch
