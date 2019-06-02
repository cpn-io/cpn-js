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

import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelData;
import org.cpntools.accesscpn.model.cpntypes.CPNType;

/**
 * @author mwesterg
 */
public class CPNProduct extends CPNValue {
	private final List<CPNValue> values;

	/**
	 * @param values
	 */
	public CPNProduct(final List<CPNValue> values) {
		super("0");
		this.values = Collections.unmodifiableList(values);

	}

	/**
	 * @param values
	 */
	public CPNProduct(final String time, final List<CPNValue> values) {
		super(time);
		this.values = Collections.unmodifiableList(values);

	}

	/**
	 * @param values
	 */
	public CPNProduct(final CPNValue... values) {
		this(Arrays.asList(values));
	}

	/**
	 * @return
	 */
	public List<CPNValue> getValues() {
		return values;
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		final StringBuilder sb = new StringBuilder();
		sb.append('(');
		boolean first = true;
		for (final CPNValue v : values) {
			if (!first) {
				sb.append(", ");
			}
			first = false;
			sb.append(v);
		}
		sb.append(')');
		return sb.toString();
	}

	/**
	 * @see org.cpntools.accesscpn.engine.highlevel.instance.cpnvalues.CPNValue#matches(org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelData,
	 *      org.cpntools.accesscpn.model.cpntypes.CPNType)
	 */
	@Override
	protected boolean matchesInternal(final ModelData modelData, final CPNType type) {
		if (!(type instanceof org.cpntools.accesscpn.model.cpntypes.CPNProduct)) { return false; }
		final org.cpntools.accesscpn.model.cpntypes.CPNProduct product = (org.cpntools.accesscpn.model.cpntypes.CPNProduct) type;
		if (values.size() != product.getTypes().size()) { return false; }
		final Iterator<String> it = product.getTypes().iterator();
		for (final CPNValue value : values) {
			if (!value.matches(modelData, modelData.getType(it.next()))) { return false; }
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
		if (o == null || !(o instanceof CPNProduct)) { return false; }
		final CPNProduct other = (CPNProduct) o;
		return values.equals(other.values);
	}
}
