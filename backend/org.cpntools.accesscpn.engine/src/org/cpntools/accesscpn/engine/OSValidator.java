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
package org.cpntools.accesscpn.engine;

/**
 * @author mwesterg
 *
 */
public class OSValidator {

	/**
	 * @param args
	 */
	public static void main(final String[] args) {
		if (isWindows()) {
			System.out.println("This is Windows");
		} else if (isMac()) {
			System.out.println("This is Mac");
		} else if (isUnix()) {
			System.out.println("This is Unix or Linux");
		} else {
			System.out.println("Your OS is not support!!");
		}
	}

	/**
	 * @return
	 */
	public static boolean isWindows() {

		final String os = System.getProperty("os.name").toLowerCase();
		// windows
		return os.indexOf("win") >= 0;

	}

	/**
	 * @return
	 */
	public static boolean isMac() {

		final String os = System.getProperty("os.name").toLowerCase();
		// Mac
		return os.indexOf("mac") >= 0;

	}

	/**
	 * @return
	 */
	public static boolean isUnix() {

		final String os = System.getProperty("os.name").toLowerCase();
		// linux or unix
		return os.indexOf("nix") >= 0 || os.indexOf("nux") >= 0;

	}
}