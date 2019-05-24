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
/**
 * 
 */
package org.cpntools.accesscpn.engine.utils;

import java.util.Arrays;
import java.util.logging.Formatter;
import java.util.logging.LogRecord;

/**
 * @author mw
 */
public class SingleLineLogFormatter extends Formatter {
	/**
	 * @see java.util.logging.Formatter#format(java.util.logging.LogRecord)
	 */
	@Override
	public String format(final LogRecord record) {
		final StringBuilder sb = new StringBuilder();
		sb.append(record.getLoggerName());
		sb.append(": ");
		sb.append(record.getLevel());
		sb.append(": ");
		sb.append(record.getThreadID());
		sb.append('.');
		sb.append(record.getSourceClassName().replaceAll(".*[.]", ""));
		sb.append('.');
		sb.append(record.getSourceMethodName());
		if (record.getParameters() != null) {
			sb.append('(');
			sb.append(Arrays.toString(record.getParameters()));
			sb.append(')');
		}
		sb.append(": ");
		sb.append(record.getMessage());
		if (record.getThrown() != null) {
			sb.append('\n');
			sb.append(record.getThrown());
			for (final StackTraceElement traceElement : record.getThrown().getStackTrace()) {
				sb.append("\n\tat ");
				sb.append(traceElement);
			}
		}
		sb.append('\n');
		return sb.toString();
	}
}