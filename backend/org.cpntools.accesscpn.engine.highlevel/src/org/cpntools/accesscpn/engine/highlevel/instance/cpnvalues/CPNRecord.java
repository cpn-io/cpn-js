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
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelData;
import org.cpntools.accesscpn.model.cpntypes.CPNType;
import org.cpntools.accesscpn.model.cpntypes.NameTypePair;

/**
 * @author mwesterg
 */
public class CPNRecord extends CPNValue {
	private final Map<String, CPNValue> values;

	/**
	 * @param values
	 */
	public CPNRecord(final Map<String, CPNValue> values) {
		super("0");
		this.values = Collections.unmodifiableMap(new TreeMap<String, CPNValue>(values));
	}

	/**
	 * @param values
	 */
	public CPNRecord(final String time, final Map<String, CPNValue> values) {
		super(time);
		this.values = Collections.unmodifiableMap(new TreeMap<String, CPNValue>(values));
	}

	/**
	 * @return
	 */
	public Map<String, CPNValue> getValues() {
		return values;
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		final StringBuilder sb = new StringBuilder();
		sb.append("{ ");
		boolean first = true;
		for (final Entry<String, CPNValue> entry : values.entrySet()) {
			if (!first) {
				sb.append(", ");
			}
			first = false;
			sb.append(entry.getKey());
			sb.append(" = ");
			sb.append(entry.getValue());
		}
		sb.append(" }");
		return sb.toString();
	}

	/**
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.cpnvalues.CPNValue#matches(org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelData,
	 *      org.cpntools.accesscpn.model.cpntypes.CPNType)
	 */
	@Override
	protected boolean matchesInternal(final ModelData modelData, final CPNType type) {
		if (!(type instanceof org.cpntools.accesscpn.model.cpntypes.CPNRecord)) { return false; }
		final org.cpntools.accesscpn.model.cpntypes.CPNRecord record = (org.cpntools.accesscpn.model.cpntypes.CPNRecord) type;
		if (record.getValues().size() != values.size()) { return false; }
		for (final NameTypePair pair : record.getValues()) {
			final CPNValue value = values.get(pair.getName());
			if (value == null) { return false; }
			if (!value.matches(modelData, modelData.getType(pair.getSort()))) { return false; }
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
		if (o == null || !(o instanceof CPNRecord)) { return false; }
		final CPNRecord other = (CPNRecord) o;
		return values.equals(other.values);
	}
}
