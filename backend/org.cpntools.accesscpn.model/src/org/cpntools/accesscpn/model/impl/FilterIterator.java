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
package org.cpntools.accesscpn.model.impl;

import java.util.Iterator;

/**
 * @author mw
 * @param <T> type to iterate over
 */
public abstract class FilterIterator<T> implements Iterator<T> {
	Iterator<T> realIterator;
	T nextElement;
	boolean hasNext;

	/**
	 * @param realIterator real iterator
	 */
	public FilterIterator(final Iterator<T> realIterator) {
		this.realIterator = realIterator;
		hasNext = true;
		fill();
	}

	/**
	 * @see java.util.Iterator#hasNext()
	 */
	@Override
    public boolean hasNext() {
		return hasNext;
	}

	/**
	 * @see java.util.Iterator#next()
	 */
	@Override
    public T next() {
		final T next = nextElement;
		fill();
		return next;
	}

	private void fill() {
		if (hasNext) {
			while (realIterator.hasNext()) {
				final T potentialNextElement = realIterator.next();
				if (accept(potentialNextElement)) {
					this.nextElement = potentialNextElement;
					return;
				}
			}
			hasNext = false;
		}
	}

	/**
	 * @param value a value
	 * @return whether to include value in iterator
	 */
	public abstract boolean accept(T value);

	/**
	 * @see java.util.Iterator#remove()
	 */
	@Override
    public void remove() {
		throw new UnsupportedOperationException();
	}

}
