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
package org.cpntools.accesscpn.model.graphics.impl;

import java.net.URL;

import org.cpntools.accesscpn.model.graphics.Fill;
import org.cpntools.accesscpn.model.graphics.Rotation;
import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.impl.ENotificationImpl;
import org.eclipse.emf.ecore.impl.EObjectImpl;


/**
 * <!-- begin-user-doc -->
 * An implementation of the model object '<em><b>Fill</b></em>'.
 * <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * <ul>
 *   <li>{@link org.cpntools.accesscpn.model.graphics.impl.FillImpl#getColor <em>Color</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.graphics.impl.FillImpl#getImage <em>Image</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.graphics.impl.FillImpl#getGradientColor <em>Gradient Color</em>}</li>
 *   <li>{@link org.cpntools.accesscpn.model.graphics.impl.FillImpl#getGradientRotation <em>Gradient Rotation</em>}</li>
 * </ul>
 * </p>
 *
 * @generated
 */
public class FillImpl extends EObjectImpl implements Fill {
	/**
	 * The default value of the '{@link #getColor() <em>Color</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getColor()
	 * @generated
	 * @ordered
	 */
	protected static final String COLOR_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getColor() <em>Color</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getColor()
	 * @generated
	 * @ordered
	 */
	protected String color = COLOR_EDEFAULT;

	/**
	 * The default value of the '{@link #getImage() <em>Image</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getImage()
	 * @generated
	 * @ordered
	 */
	protected static final URL IMAGE_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getImage() <em>Image</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getImage()
	 * @generated
	 * @ordered
	 */
	protected URL image = IMAGE_EDEFAULT;

	/**
	 * The default value of the '{@link #getGradientColor() <em>Gradient Color</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getGradientColor()
	 * @generated
	 * @ordered
	 */
	protected static final String GRADIENT_COLOR_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getGradientColor() <em>Gradient Color</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getGradientColor()
	 * @generated
	 * @ordered
	 */
	protected String gradientColor = GRADIENT_COLOR_EDEFAULT;

	/**
	 * The default value of the '{@link #getGradientRotation() <em>Gradient Rotation</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getGradientRotation()
	 * @generated
	 * @ordered
	 */
	protected static final Rotation GRADIENT_ROTATION_EDEFAULT = null;

	/**
	 * The cached value of the '{@link #getGradientRotation() <em>Gradient Rotation</em>}' attribute.
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @see #getGradientRotation()
	 * @generated
	 * @ordered
	 */
	protected Rotation gradientRotation = GRADIENT_ROTATION_EDEFAULT;

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	protected FillImpl() {
		super();
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	protected EClass eStaticClass() {
		return GraphicsPackageImpl.Literals.FILL;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public String getColor() {
		return color;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setColor(String newColor) {
		String oldColor = color;
		color = newColor;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, GraphicsPackageImpl.FILL__COLOR, oldColor, color));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public URL getImage() {
		return image;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setImage(URL newImage) {
		URL oldImage = image;
		image = newImage;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, GraphicsPackageImpl.FILL__IMAGE, oldImage, image));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public String getGradientColor() {
		return gradientColor;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setGradientColor(String newGradientColor) {
		String oldGradientColor = gradientColor;
		gradientColor = newGradientColor;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, GraphicsPackageImpl.FILL__GRADIENT_COLOR, oldGradientColor, gradientColor));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public Rotation getGradientRotation() {
		return gradientRotation;
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
    public void setGradientRotation(Rotation newGradientRotation) {
		Rotation oldGradientRotation = gradientRotation;
		gradientRotation = newGradientRotation;
		if (eNotificationRequired())
			eNotify(new ENotificationImpl(this, Notification.SET, GraphicsPackageImpl.FILL__GRADIENT_ROTATION, oldGradientRotation, gradientRotation));
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public Object eGet(int featureID, boolean resolve, boolean coreType) {
		switch (featureID) {
			case GraphicsPackageImpl.FILL__COLOR:
				return getColor();
			case GraphicsPackageImpl.FILL__IMAGE:
				return getImage();
			case GraphicsPackageImpl.FILL__GRADIENT_COLOR:
				return getGradientColor();
			case GraphicsPackageImpl.FILL__GRADIENT_ROTATION:
				return getGradientRotation();
		}
		return super.eGet(featureID, resolve, coreType);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void eSet(int featureID, Object newValue) {
		switch (featureID) {
			case GraphicsPackageImpl.FILL__COLOR:
				setColor((String)newValue);
				return;
			case GraphicsPackageImpl.FILL__IMAGE:
				setImage((URL)newValue);
				return;
			case GraphicsPackageImpl.FILL__GRADIENT_COLOR:
				setGradientColor((String)newValue);
				return;
			case GraphicsPackageImpl.FILL__GRADIENT_ROTATION:
				setGradientRotation((Rotation)newValue);
				return;
		}
		super.eSet(featureID, newValue);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public void eUnset(int featureID) {
		switch (featureID) {
			case GraphicsPackageImpl.FILL__COLOR:
				setColor(COLOR_EDEFAULT);
				return;
			case GraphicsPackageImpl.FILL__IMAGE:
				setImage(IMAGE_EDEFAULT);
				return;
			case GraphicsPackageImpl.FILL__GRADIENT_COLOR:
				setGradientColor(GRADIENT_COLOR_EDEFAULT);
				return;
			case GraphicsPackageImpl.FILL__GRADIENT_ROTATION:
				setGradientRotation(GRADIENT_ROTATION_EDEFAULT);
				return;
		}
		super.eUnset(featureID);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public boolean eIsSet(int featureID) {
		switch (featureID) {
			case GraphicsPackageImpl.FILL__COLOR:
				return COLOR_EDEFAULT == null ? color != null : !COLOR_EDEFAULT.equals(color);
			case GraphicsPackageImpl.FILL__IMAGE:
				return IMAGE_EDEFAULT == null ? image != null : !IMAGE_EDEFAULT.equals(image);
			case GraphicsPackageImpl.FILL__GRADIENT_COLOR:
				return GRADIENT_COLOR_EDEFAULT == null ? gradientColor != null : !GRADIENT_COLOR_EDEFAULT.equals(gradientColor);
			case GraphicsPackageImpl.FILL__GRADIENT_ROTATION:
				return GRADIENT_ROTATION_EDEFAULT == null ? gradientRotation != null : !GRADIENT_ROTATION_EDEFAULT.equals(gradientRotation);
		}
		return super.eIsSet(featureID);
	}

	/**
	 * <!-- begin-user-doc -->
	 * <!-- end-user-doc -->
	 * @generated
	 */
	@Override
	public String toString() {
		if (eIsProxy()) return super.toString();

		StringBuffer result = new StringBuffer(super.toString());
		result.append(" (color: ");
		result.append(color);
		result.append(", image: ");
		result.append(image);
		result.append(", gradientColor: ");
		result.append(gradientColor);
		result.append(", gradientRotation: ");
		result.append(gradientRotation);
		result.append(')');
		return result.toString();
	}

} //FillImpl
