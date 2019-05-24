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
import org.cpntools.accesscpn.model.cpntypes.NameTypePair;

/**
 * @author mwesterg
 */
public class CPNUnion extends CPNValue {

	private final String name;
	private final CPNType type;
	private final CPNValue value;

	/**
	 * @param name
	 * @param type
	 * @param value
	 */
	public CPNUnion(final String name, final CPNType type, final CPNValue value) {
		this("0", name, type, value);
	}

	/**
	 * @param time
	 * @param name
	 * @param type
	 * @param value
	 */
	public CPNUnion(final String time, final String name, final CPNType type, final CPNValue value) {
		super(time);
		this.name = name;
		this.type = type;
		this.value = value;
	}

	@Override
	protected boolean matchesInternal(final ModelData modelData, @SuppressWarnings("hiding") final CPNType type) {
		if (!(type instanceof org.cpntools.accesscpn.model.cpntypes.CPNUnion)) { return false; }
		final org.cpntools.accesscpn.model.cpntypes.CPNUnion unionType = (org.cpntools.accesscpn.model.cpntypes.CPNUnion) type;
		for (final NameTypePair t : unionType.getValues()) {
			if (t.getName().equals(name)) {
				final CPNType theType = modelData.getType(t.getSort());
				if (theType.getClass().isAssignableFrom(type.getClass())) { return value.matches(modelData, theType); }
			}
		}
		return false;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @return the type
	 */
	public CPNType getType() {
		return type;
	}

	/**
	 * @return the value
	 */
	public CPNValue getValue() {
		return value;
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		if (value == null) { return name.hashCode() * 7; }
		return name.hashCode() * 2 + value.hashCode() * 3;
	}

	/**
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(final Object o) {
		if (o == null || !(o instanceof CPNUnion)) { return false; }
		final CPNUnion other = (CPNUnion) o;
		if (value == null) { return other.value == null && name.equals(other.name); }
		return name.equals(other.name) && value.equals(other.value);
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		if (value == null) { return name; }
		return name + " (" + value + ")";
	}
}
