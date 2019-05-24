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

import org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelData;
import org.cpntools.accesscpn.model.cpntypes.CPNType;

/**
 * @author mwesterg
 */
public class CPNEnum extends CPNValue {

	private final String value;
	private final int position;

	/**
	 * @param value
	 * @param position
	 */
	public CPNEnum(final String value, final int position) {
		this("0", value, position);
	}

	/**
	 * @param time
	 * @param value
	 * @param position
	 */
	public CPNEnum(final String time, final String value, final int position) {
		super(time);
		this.value = value;
		this.position = position;
	}

	/**
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.cpnvalues.CPNValue#matches(org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelData,
	 *      org.cpntools.accesscpn.model.cpntypes.CPNType)
	 */
	@Override
	protected boolean matchesInternal(final ModelData modelData, final CPNType type) {
		if (!(type instanceof org.cpntools.accesscpn.model.cpntypes.CPNEnum)) { return false; }
		final org.cpntools.accesscpn.model.cpntypes.CPNEnum enumType = (org.cpntools.accesscpn.model.cpntypes.CPNEnum) type;
		if (position >= enumType.getValues().size()) { return false; }
		return enumType.getValues().get(position).equals(value);
	}

	/**
	 * @return
	 */
	public String getValue() {
		return value;
	}

	/**
	 * @return
	 */
	public int getPosition() {
		return position;
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return value;
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		return position * 23 + value.hashCode();
	}

	/**
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(final Object o) {
		if (o == null || !(o instanceof CPNEnum)) { return false; }
		final CPNEnum other = (CPNEnum) o;
		return position == other.position && value.equals(other.value);
	}
}
