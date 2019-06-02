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
package org.cpntools.accesscpn.engine.highlevel;

/**
 * @author mw
 */
public class Util {

	/**
	 * @param s
	 *            string
	 * @return whether the string is empty or null
	 */
	public static String emptyOrNull(final String s) {
		if (s == null) {
			return "";
		} else {
			return s;
		}
	}

	/**
	 * @param s
	 *            string to escape
	 * @return escaped version of s
	 */
	public static String mlEscape(final String s) {
		// TODO: Tjek om der er flere tegn som skal escapes
		return s.trim().replaceFirst("[^a-zA-Z'_0-9\\p{Space}\\-.].*", "").trim().replaceAll("[\\p{Space}\\-.]", "_");
	}
}
