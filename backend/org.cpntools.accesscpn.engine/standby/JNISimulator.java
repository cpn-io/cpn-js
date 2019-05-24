/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *  BRITNeY Suite                                                          *
 *                                                                         *
 *  Copyright (C) 2004-2006 Michael Westergaard and others                 *
 *                                                                         *
 *  This program is free software; you can redistribute it and/or          *
 *  modify it under the terms of the GNU General Public License            *
 *  as published by the Free Software Foundation; either version 2         *
 *  of the License, or (at your option) any later version.                 *
 *                                                                         *
 *  This program is distributed in the hope that it will be useful,        *
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of         *
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the          *
 *  GNU General Public License for more details.                           *
 *                                                                         *
 *  You should have received a copy of the GNU General Public License      *
 *  along with this program; if not, write to the Free Software            *
 *  Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, *
 *  USA.                                                                   *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
package org.cpntools.accesscpn.engine;

import java.io.*;
import java.net.URL;

import org.cpntools.accesscpn.engine.SimulatorImplementation;

/**
 * @author Michael Westergaard
 */
public class JNISimulator implements SimulatorImplementation {
	DataInputStream dmoevalin;

	DataInputStream dmoin;

	DataOutputStream dmoout;

	String banner;

	int simulatorNumber;

	private static boolean available = true;

	static {
		try {
			if (JNISimulator.isAvailable()) {
				System.loadLibrary("jnisimulator"); //$NON-NLS-1$
				JNISimulator.available = true;
			}
		} catch (final UnsatisfiedLinkError e) {
			JNISimulator.available = false;
		}
	}

	private native int startSimulator(String runguy, String path, String image) throws Exception;

	private native void killSimulator(int number) throws Exception;

	/**
	 * @param runguy
	 * @param image
	 * @throws Exception
	 */
	public JNISimulator(URL runguy, URL image) throws Exception {
		File img = null;
		if (image == null) {
			image = getClass().getResource("/simulator/cpn.ML.x86-win32"); //$NON-NLS-1$
		}
//		img = VersionedCache.getInstance().getResource(image);
		final String imageName = img.getName();
		final String imagePath = img.getParent().toString();

		if (runguy == null) {
			runguy = getClass().getResource("/simulator/run.x86-win32.exe"); //$NON-NLS-1$
		}
//		img = VersionedCache.getInstance().getResource(runguy);
		final String runguyName = img.toString();

		simulatorNumber = startSimulator(runguyName, imagePath, imageName);

		dmoevalin = new DataInputStream(new BufferedInputStream(new EvalInputStream(simulatorNumber)));
		dmoout = new DataOutputStream(new BufferedOutputStream(new DMOOutputStream(simulatorNumber)));
		dmoin = new DataInputStream(new BufferedInputStream(new DMOInputStream(simulatorNumber)));

//		banner = getString(dmoevalin);
	}

	/**
	 * @return whether this simulator is available on this platform (= false
	 *         currently)
	 */
	public static boolean isAvailable() {
		return JNISimulator.available && false;
	}

	/**
	 * @throws Exception
	 */
	public void destroy() throws Exception {
		killSimulator(simulatorNumber);
	}

	/**
	 * @see dk.klafbang.tincpn.simulator.Simulator#getBanner()
	 */
	public String getBanner() {
		return banner;
	}

	/**
	 * @see dk.klafbang.tincpn.simulator.Simulator#send(dk.klafbang.tincpn.simulator.Packet)
	 */
	public Packet send(final Packet p) throws IOException {
		try {
			p.send(dmoout);

			final Packet bis = new Packet();
			bis.receive(dmoin);
			return bis;
		} finally {
		}
	}

	/**
	 * @see dk.klafbang.tincpn.simulator.Simulator#evaluate(java.lang.String)
	 */
	public String evaluate(final String expr) throws Exception {
		lock();
		try {
			final Packet d = new Packet(1, expr);
			d.send(dmoout);
			dmoout.flush();

			try {
				final String result = getString(dmoevalin);
				notifyListeners(expr, result);
				return result;
			} catch (final Exception e) {
				notifyListeners(expr, e.getMessage() + "\n"); //$NON-NLS-1$
				throw e;
			}
		} finally {
			release();
		}
	}

	/**
	 * @see dk.klafbang.tincpn.simulator.Simulator#clone()
	 */
	@Override
	public Simulator clone() {
		return this; // FIXME
	}
}

class Helper {
	/**
	 * @param b
	 * @param off
	 * @param len
	 * @return whether the off and len are within the bounds of the array
	 */
	public static boolean validateInput(final byte b[], final int off, final int len) {
		if (b == null) { throw new NullPointerException(); }
		if (off < 0 || len < 0 || off + len > b.length) { throw new IndexOutOfBoundsException(); }
		return len != 0;
	}
}

class EvalInputStream extends InputStream {
	int simulator;

	/**
	 * @param simulatorNumber
	 */
	public EvalInputStream(final int simulatorNumber) {
		simulator = simulatorNumber;
	}

	private native int read(int simulatorNumber, byte b[], int off, int len) throws IOException;

	/**
	 * @see java.io.InputStream#read(byte[], int, int)
	 */
	@Override
	public int read(final byte b[], final int off, final int len) throws IOException {
		if (Helper.validateInput(b, off, len)) { return read(simulator, b, off, len); }
		return 0;
	}

	private native int read(int simulatorNumber) throws IOException;

	/**
	 * @see java.io.InputStream#read()
	 */
	@Override
	public int read() throws IOException {
		return read(simulator);
	}
}

class DMOOutputStream extends OutputStream {
	int simulator;

	/**
	 * @param simulatorNumber
	 */
	public DMOOutputStream(final int simulatorNumber) {
		simulator = simulatorNumber;
	}

	private native void write(int simulatorNumber, byte b[], int off, int len) throws IOException;

	/**
	 * @see java.io.OutputStream#write(byte[], int, int)
	 */
	@Override
	public void write(final byte b[], final int off, final int len) throws IOException {
		if (Helper.validateInput(b, off, len)) {
			write(simulator, b, off, len);
		}
	}

	private native void write(int simulatorNumber, int b) throws IOException;

	/**
	 * @see java.io.OutputStream#write(int)
	 */
	@Override
	public void write(final int b) throws IOException {
		write(simulator, b);
	}
}

class DMOInputStream extends InputStream {
	int simulator;

	/**
	 * @param simulatorNumber
	 */
	public DMOInputStream(final int simulatorNumber) {
		simulator = simulatorNumber;
	}

	private native int read(int simulatorNumber, byte b[], int off, int len) throws IOException;

	/**
	 * @see java.io.InputStream#read(byte[], int, int)
	 */
	@Override
	public int read(final byte b[], final int off, final int len) throws IOException {
		if (Helper.validateInput(b, off, len)) { return read(simulator, b, off, len); }
		return 0;
	}

	private native int read(int simulatorNumber) throws IOException;

	/**
	 * @see java.io.InputStream#read()
	 */
	@Override
	public int read() throws IOException {
		return read(simulator);
	}
}
