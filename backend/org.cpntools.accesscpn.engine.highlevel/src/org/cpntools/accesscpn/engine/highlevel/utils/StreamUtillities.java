/*
 * BRITNeY Suite Copyright (C) 2004-2006 Michael Westergaard and others This program is free
 * software; you can redistribute it and/or modify it under the terms of the GNU General Public
 * License as published by the Free Software Foundation; either version 2 of the License, or (at
 * your option) any later version. This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE. See the GNU General Public License for more details. You should have received
 * a copy of the GNU General Public License along with this program; if not, write to the Free
 * Software Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
 */
package org.cpntools.accesscpn.engine.highlevel.utils;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * @author Michael Westergaard
 */
public class StreamUtillities {
	private StreamUtillities() {
		/* Make constructor private */
	}

	/**
	 * @param input
	 *            input to copy from
	 * @param output
	 *            output to copy to
	 * @throws IOException
	 *             on error
	 */
	public static void copy(final InputStream input, final OutputStream output) throws IOException {
		BufferedInputStream bufferedInput;
		try {
			bufferedInput = (BufferedInputStream) input;
		} catch (final ClassCastException e) {
			bufferedInput = new BufferedInputStream(input);
		}
		BufferedOutputStream bufferedOutput;
		try {
			bufferedOutput = (BufferedOutputStream) output;
		} catch (final ClassCastException e) {
			bufferedOutput = new BufferedOutputStream(output);
		}

		int read;
		while ((read = bufferedInput.read()) != -1) {
			bufferedOutput.write(read);
		}
		bufferedOutput.flush();
		bufferedInput.close();
	}

	/**
	 * @param contents
	 * @return
	 * @throws IOException
	 */
	public static String copyToString(final InputStream contents) throws IOException {
		final ByteArrayOutputStream bos = new ByteArrayOutputStream();
		copy(contents, bos);
		return bos.toString();
	}
}
