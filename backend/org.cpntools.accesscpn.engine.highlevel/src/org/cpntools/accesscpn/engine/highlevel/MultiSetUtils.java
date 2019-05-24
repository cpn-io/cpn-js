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
package org.cpntools.accesscpn.engine.highlevel;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.SortedMap;
import java.util.TreeMap;


/**
 * @author mwesterg
 *
 */
public class MultiSetUtils {
	/**
	 * @param <T>
	 * @param a
	 * @param b
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static <T> List<T> max(List<? extends T> a, List<? extends T> b) {
		if (a == null) return (List<T>) b;
		if (b == null) return (List<T>) a;
		List<T> result = new ArrayList<T>(a);
		Map<T, Integer> coeffs = new HashMap<T, Integer>();
		buildMap(a, coeffs);
		for (T t : b) {
			Integer coeff = coeffs.remove(t);
			if (coeff != null) {
				int newCoeff = coeff - 1;
				if (newCoeff > 0)
					coeffs.put(t, newCoeff);
			} else {
				result.add(t);
			}
		}
		return result;
	}

	private static <T> void buildMap(List<? extends T> a, Map<T, Integer> coeffs) {
		for (T t : a) {
			Integer coeff = coeffs.get(t);
			if (coeff == null) {
				coeffs.put(t, 1);
			} else {
				coeffs.put(t, coeff + 1);
			}
		}
	}
	
	/**
	 * @param <T>
	 * @param a
	 * @return
	 */
	public static <T extends Comparable<T>> String toString(List<? extends T> a) {
		SortedMap<T, Integer> coeffs = new TreeMap<T, Integer>();
		buildMap(a, coeffs);
		return buildString(coeffs);
	}
	
	/**
	 * @param <T>
	 * @param a
	 * @return
	 */
	public static <T> String toString(List<? extends T> a, boolean unsorted) {
		if (a == null || a.isEmpty()) return "empty";
		Map<T, Integer> coeffs = new HashMap<T, Integer>();
		buildMap(a, coeffs);
		return buildString(coeffs);
	}
	
	private static <T> String buildString(Map<T, Integer> coeffs) {
		StringBuilder sb = new StringBuilder();
		boolean first = true;
		for (Entry<T, Integer> entry: coeffs.entrySet()) {
			if (!first) sb.append(" ++ ");
			first = false;
			sb.append(entry.getValue());
			sb.append('`');
			sb.append(entry.getKey());
		}
		return sb.toString();
	}

	/**
	 * @param <T>
	 * @param a
	 * @param b
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static <T> List<T> min(List<? extends T> a, List<? extends T> b) {
		if (a == null) return (List<T>) b;
		if (b == null) return (List<T>) a;
		List<T> result = new ArrayList<T>();
		if (a.isEmpty() || b.isEmpty()) return result;
		Map<T, Integer> coeffs = new HashMap<T, Integer>();
		buildMap(a, coeffs);
		for (T t : b) {
			Integer coeff = coeffs.remove(t);
			if (coeff != null) {
				int newCoeff = coeff - 1;
				if (newCoeff > 0) {
					coeffs.put(t, newCoeff);
					result.add(t);
				}
			}
		}
		return result;
	}

}
