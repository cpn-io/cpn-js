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
package org.cpntools.accesscpn.engine.highlevel.instance.adapter;

import org.cpntools.accesscpn.model.util.ModelAdapterFactory;
import org.eclipse.emf.common.notify.Adapter;


/**
 * @author mwesterg
 * 
 */
public class ModelInstanceAdapterFactory extends ModelAdapterFactory {
	protected static final ModelInstanceAdapterFactory instance = new ModelInstanceAdapterFactory();

	/**
	 * @return
	 */
	public static ModelInstanceAdapterFactory getInstance() {
		return instance;
	}

	protected ModelInstanceAdapterFactory() {
		// Hide constructor
	}

	/**
	 * @see org.cpntools.accesscpn.model.util.ModelAdapterFactory#createPetriNetAdapter()
	 */
	@Override
	public Adapter createPetriNetAdapter() {
		return new ModelInstance();
	}

	/**
	 * @see org.cpntools.accesscpn.model.util.ModelAdapterFactory#isFactoryForType(java.lang.Object)
	 */
	@Override
	public boolean isFactoryForType(final Object type) {
		return ModelInstance.class.equals(type);
	}
}
