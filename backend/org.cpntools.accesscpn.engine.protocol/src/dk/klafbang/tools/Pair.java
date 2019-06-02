/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * BRITNeY Suite * * Copyright (C) 2004-2006 Michael Westergaard and others * * This program is free software; you can
 * redistribute it and/or * modify it under the terms of the GNU General Public License * as published by the Free
 * Software Foundation; either version 2 * of the License, or (at your option) any later version. * * This program is
 * distributed in the hope that it will be useful, * but WITHOUT ANY WARRANTY; without even the implied warranty of *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the * GNU General Public License for more details. * * You
 * should have received a copy of the GNU General Public License * along with this program; if not, write to the Free
 * Software * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, * USA. * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * *
 */
package dk.klafbang.tools;

/**
 * @author Michael Westergaard
 * @param <S>
 * @param <T>
 */
public class Pair<S, T> {
	/**
	 * @param <S>
	 * @param <T>
	 * @param first
	 * @param second
	 * @return a new Pair instance
	 */
	public static <S, T> Pair<S, T> createPair(final S first, final T second) {
		return new Pair<S, T>(first, second);
	}

	S first;

	T second;

	/**
	 * @param first
	 * @param second
	 */
	protected Pair(final S first, final T second) {
		this.first = first;
		this.second = second;
	}

	/**
	 * @return first componont
	 */
	public S getFirst() {
		return first;
	}

	/**
	 * @return second component
	 */
	public T getSecond() {
		return second;
	}

	/**
	 * @param value
	 */
	public void setFirst(final S value) {
		first = value;
	}

	/**
	 * @param value
	 */
	public void setSecond(final T value) {
		second = value;
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "(" + first + ", " + second + ")"; //$NON-NLS-1$//$NON-NLS-2$//$NON-NLS-3$
	}

	/**
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(final Object object) {
		try {
			final Pair<?, ?> other = (Pair<?, ?>) object;
			if (first.equals(other.first) && second.equals(other.second)) { return true; }
			return false;
		} catch (final Exception e) {
			return false;
		}
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		try {
			final int hash1 = first.hashCode();
			try {
				final int hash2 = second.hashCode();
				return hash1 + hash2;
			} catch (final Exception e2) {
				return hash1;
			}
		} catch (final Exception e) {
			return 0;
		}
	}
}
