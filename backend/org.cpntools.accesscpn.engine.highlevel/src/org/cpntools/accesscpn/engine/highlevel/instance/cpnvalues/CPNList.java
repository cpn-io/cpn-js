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
package org.cpntools.accesscpn.engine.highlevel.instance.cpnvalues;

import java.util.Collections;
import java.util.List;

import org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelData;
import org.cpntools.accesscpn.model.cpntypes.CPNType;

/**
 * @author mwesterg
 * @param <T>
 */
public class CPNList<T extends CPNValue> extends CPNValue {
	private final List<T> values;

	/**
	 * @param values
	 */
	public CPNList(final List<T> values) {
		super("0");
		this.values = Collections.unmodifiableList(values);
	}

	/**
	 * @param values
	 */
	public CPNList(final String time, final List<T> values) {
		super(time);
		this.values = Collections.unmodifiableList(values);
	}

	/**
	 * @return
	 */
	public List<T> getValues() {
		return values;
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return values.toString();
	}

	/**
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.cpnvalues.CPNValue#matches(org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelData,
	 *      org.cpntools.accesscpn.model.cpntypes.CPNType)
	 */
	@Override
	protected boolean matchesInternal(final ModelData modelData, final CPNType type) {
		if (!(type instanceof org.cpntools.accesscpn.model.cpntypes.CPNList)) { return false; }
		final org.cpntools.accesscpn.model.cpntypes.CPNList lst = (org.cpntools.accesscpn.model.cpntypes.CPNList) type;
		final CPNType lsttype = modelData.getType(lst.getSort());
		for (final T value : values) {
			if (!value.matches(modelData, lsttype)) { return false; }
		}
		return true;
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		return values.hashCode();
	}

	/**
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(final Object o) {
		if (o == null || !(o instanceof CPNList<?>)) { return false; }
		final CPNList<?> other = (CPNList<?>) o;
		return values.equals(other.values);
	}
}
