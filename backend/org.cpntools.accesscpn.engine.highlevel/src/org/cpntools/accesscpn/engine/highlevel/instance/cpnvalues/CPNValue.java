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
package org.cpntools.accesscpn.engine.highlevel.instance.cpnvalues;

import org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelData;
import org.cpntools.accesscpn.model.cpntypes.CPNAlias;
import org.cpntools.accesscpn.model.cpntypes.CPNSubset;
import org.cpntools.accesscpn.model.cpntypes.CPNType;


/**
 * @author mwesterg
 * 
 */
public abstract class CPNValue {
	private String time;

	/**
	 * @param time
	 */
	public CPNValue(final String time) {
		this.time = time;
	}

	/**
	 * @param time
	 */
	public void setTime(final String time) {
		this.time = time;
	}

	/**
	 * @param modelData
	 * @param type
	 * @return
	 */
	protected abstract boolean matchesInternal(ModelData modelData, CPNType type);

	/**
	 * @param modelData
	 * @param type
	 * @return
	 */
	public boolean matches(final ModelData modelData, final CPNType type) {
		return matchesInternal(modelData, getRealType(modelData, type));
	}

	protected CPNType getRealType(final ModelData modelData, final CPNType type) {
		if (type instanceof CPNAlias) {
			final CPNAlias alias = (CPNAlias) type;
			return getRealType(modelData, modelData.getType(alias.getSort()));
		} else if (type instanceof CPNSubset) {
			final CPNSubset subset = (CPNSubset) type;
			return getRealType(modelData, modelData.getType(subset.getSort()));
		}
		return type;
	}

	/**
	 * @return
	 */
	public String getTime() {
		return time;
	}
}
