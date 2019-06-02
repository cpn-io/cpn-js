/*
 * BRITNeY Suite Copyright (C) 2004-2006 Michael Westergaard and others This program is free software; you can
 * redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later version. This program is distributed in
 * the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. You should have received a
 * copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
 */
package org.cpntools.accesscpn.engine.protocol;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

/**
 * @author Michael Westergaard
 */
public class Packet implements Serializable {
	private static final boolean debug = false;

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	List<Boolean> b;
	Iterator<Boolean> bi;

	int command;

	byte data[];

	List<Integer> i;

	Iterator<Integer> ii;

	int opcode;

	List<Object> parameters;

	Class<?> ret;

	List<String> s;
	Iterator<String> si;

	/**
	 * 
	 */
	public Packet() {
		opcode = 0;
		data = new byte[0];
	}

	/**
	 * @param command
	 *            command type
	 */
	public Packet(final int command) {
		this(9, command);
	}

	/**
	 * @param opcode
	 *            opcode of command
	 * @param command
	 *            command type
	 */
	public Packet(final int opcode, final int command) {
		this.opcode = opcode;
		b = new ArrayList<Boolean>();
		i = new ArrayList<Integer>();
		s = new ArrayList<String>();
		reset();
		addInteger(command);
	}

	/**
	 * @param opcode
	 *            opcode of GPC command
	 * @param parameters
	 *            GPC parameters
	 */
	public Packet(final int opcode, final List<? extends Object> parameters) {
		if (opcode != 5 && opcode != 6) { throw new IllegalArgumentException("Trying to create GPC with wrong opcode"); }
		this.opcode = opcode;
		this.parameters = new ArrayList<Object>(parameters);
	}

	/**
	 * @param opcode
	 *            opcode of eval command (1 or 3)
	 * @param data
	 *            data of packet
	 */
	public Packet(final int opcode, final String data) {
		if (opcode != 1 && opcode != 3) { throw new IllegalArgumentException("Trying to create eval with wrong opcode"); }
		this.opcode = opcode;
		this.data = data.getBytes();
	}

	/**
	 * @param data
	 *            data of packet
	 */
	public Packet(final String data) {
		this(1, data);
	}

	/**
	 * @param bv
	 *            boolean value
	 */
	public void addBoolean(final boolean bv) {
		b.add(bv);
	}

	/**
	 * @param iv
	 *            integer value
	 */
	public void addInteger(final int iv) {
		i.add(iv);
	}

	/**
	 * @param sv
	 *            string value
	 */
	public void addString(final String sv) {
		s.add(sv);
	}

	/**
	 * @return the next boolean of the Packet
	 */
	public boolean getBoolean() {
		return bi.next();
	}

	private byte[] getByteArray(final DataInputStream in, final int length) throws IOException {
		final byte packetdata[] = new byte[length];
		int pos = 0;
		while (pos < length) {
			pos += in.read(packetdata, pos, length - pos);
		}
		for (int k = packetdata.length % 4; k != 0 && k < 4; k++) {
			in.read();
		}
		return packetdata;
	}

	/**
	 * @return the command
	 */
	public int getCommand() {
		return command;
	}

	/**
	 * @return the stored data
	 */
	public String getData() {
		return new String(data);
	}

	/**
	 * @return the next integer of the Packet
	 */
	public int getInteger() {
		return ii.next();
	}

	/**
	 * @return the opcode of this packet
	 */
	public int getOpcode() {
		return opcode;
	}

	/**
	 * @return the parameters
	 */
	public List<Object> getParameters() {
		return Collections.unmodifiableList(parameters);
	}

	/**
	 * @return the ret
	 */
	public Class<?> getReturnType() {
		return ret;
	}

	/**
	 * @return the next string of the Packet
	 */
	public String getString() {
		if (isBIS()) { return si.next(); }
		return getData();
	}

	private String getString(final DataInputStream in, final int length) throws IOException {
		return new String(getByteArray(in, length));
	}

	/**
	 * @return whether this is a BIS type packet
	 */
	public boolean isBIS() {
		return opcode == 9 || opcode == 7 || opcode == 3 && data == null || opcode == 12 || opcode == 13;
	}

	/**
	 * @return whether this is a GPC type packet
	 */
	public boolean isGFC() {
		return opcode == 5 || opcode == 6;
	}

	/**
	 * @return whether this is a GUI call-back
	 */
	public boolean isCB() {
		return opcode == 3 && data == null;
	}

	private void putByteArray(final DataOutputStream out, final byte[] packetdata) throws IOException {
		out.writeInt(packetdata.length);
		out.write(packetdata);
		for (int j = packetdata.length % 4; j != 0 && j < 4; j++) {
			out.write(0);
		}
	}

	private void putString(final DataOutputStream out, final String d) throws IOException {
		putByteArray(out, d.getBytes());
	}

	private void readObject(final java.io.ObjectInputStream stream) throws IOException {
		receive(new DataInputStream(stream));
	}

	private int getIntWithPutback(final List<Integer> seen, final int position, final DataInputStream stream)
	        throws IOException {
		while (seen.size() <= position) {
			seen.add(stream.readInt());
		}
		return seen.get(position);
	}

	/**
	 * @param in
	 *            stream to receive on
	 * @throws IOException
	 *             if an IO error occurred
	 */
	public void receive(final DataInputStream in) throws IOException {
		if (Packet.debug) {
			System.out.println("Packet.recevied");
		}
		data = null;
		opcode = in.readInt();
		if (Packet.debug) {
			System.out.println("Packet.recevied opcode: " + opcode);
		}
		final List<Integer> seen = new ArrayList<Integer>();
		if (isBIS()) {
			if (b != null) {
				b.clear();
			} else {
				b = new ArrayList<Boolean>();
			}

			if (i != null) {
				i.clear();
			} else {
				i = new ArrayList<Integer>();
			}

			if (s != null) {
				s.clear();
			} else {
				s = new ArrayList<String>();
			}

			final int bs = getIntWithPutback(seen, 0, in);
			final int is = getIntWithPutback(seen, 1, in);
			final int ss = getIntWithPutback(seen, 2, in);

			for (int j = 0; j < bs; j++) {
				if (getIntWithPutback(seen, 3 + j, in) == 0) {
					b.add(false);
				} else {
					b.add(true);
				}
			}

			for (int j = 0; j < is; j++) {
				final int iii = getIntWithPutback(seen, 3 + bs + j, in);
				i.add(iii);
			}

			for (int j = 0; j < ss; j++) {
				s.add(getString(in, in.readInt()));
			}
			reset();
		} else if (isGFC()) {
			command = getIntWithPutback(seen, 0, in);
			parameters = new ArrayList<Object>();
			if (Packet.debug) {
				System.out.println("Packet.recevied command: " + command);
			}
			final int args = getIntWithPutback(seen, 1, in) - 1; // Return is also counted
			if (Packet.debug) {
				System.out.println("Packet.recevied #args: " + args);
			}
			switch (getIntWithPutback(seen, 2, in)) {
			case 1:
				ret = Integer.class;
				break;
			case 2:
				ret = String.class;
				break;
			case 3:
				ret = Boolean.class;
				break;
			case 4:
				ret = Void.class;
				break;
			case 5:
				ret = Integer.class;
				break;
			case 6:
				ret = String.class;
				break;
			case 7:
				ret = String.class;
				break;
			case 8:
				ret = byte[].class;
				break;
			default:
				assert false;
			}
			if (Packet.debug) {
				System.out.println("Packet.recevied return: " + ret);
			}

			int pos = 3;
			for (int j = 0; j < args; ++j) {
				if (getIntWithPutback(seen, pos++, in) != 1) { throw new IOException(
				        "Recieved parameter INOUT or OUT; neither is supported."); }
				switch (getIntWithPutback(seen, pos++, in)) {
				case 1:
					parameters.add(getIntWithPutback(seen, pos++, in));
					break;
				case 2:
					parameters.add(getString(in, getIntWithPutback(seen, pos++, in)));
					break;
				case 3:
					parameters.add(getIntWithPutback(seen, pos++, in) != 0);
					break;
				case 4:
					break;
				case 5:
					parameters.add(getIntWithPutback(seen, pos++, in));
					break;
				case 6:
					parameters.add(getString(in, getIntWithPutback(seen, pos++, in)));
					break;
				case 7:
					parameters.add(getString(in, getIntWithPutback(seen, pos++, in)));
					break;
				case 8:
					parameters.add(getByteArray(in, getIntWithPutback(seen, pos++, in)));
					break;
				default:
					assert false;
				}

			}
			if (Packet.debug) {
				System.out.println("Packet.recevied parameters: " + parameters);
			}
		} else {
			final int length = in.readInt();
			data = new byte[length];
			int pos = 0;
			while (pos < length) {
				pos += in.read(data, pos, length - pos);
			}
		}
	}

// private boolean isGFCDirection(final int value) {
// return value == 1 || value == 2 || value == 3;
// }

// private boolean isGFCType(final int value) {
// return value == 1 || value == 2 || value == 3 || value == 4 || value == 5 || value == 6 || value == 8;
// }

	/**
	 * 
	 */
	public void reset() {
		bi = b.iterator();
		ii = i.iterator();
		si = s.iterator();
	}

	/**
	 * @param out
	 *            stream to send on
	 * @throws IOException
	 *             if an IO error occurred
	 */
	public void send(final DataOutputStream out) throws IOException {
		if (Packet.debug) {
			System.out.println("Sending " + this);
		}
		out.writeInt(opcode);

		if (isBIS()) {
			if (Packet.debug) {
				System.out.println("Write BIS");
			}
			out.writeInt(b.size());
			out.writeInt(i.size());
			out.writeInt(s.size());

			for (final boolean d : b) {
				if (d) {
					out.writeInt(1);
				} else {
					out.writeInt(0);
				}
			}

			for (final int d : i) {
				out.writeInt(d);
			}

			for (final String d : s) {
				putString(out, d);
			}
		} else if (isGFC()) {
			if (Packet.debug) {
				System.out.println("Write parameters: " + parameters.size());
			}
			for (final Object o : parameters) {
				if (o instanceof Integer) {
					if (Packet.debug) {
						System.out.println("Write int: " + o);
					}
					out.writeInt((Integer) o);
				} else if (o instanceof String) {
					if (Packet.debug) {
						System.out.println("Write string: " + o);
					}
					putString(out, (String) o);
				} else if (o instanceof Boolean) {
					if (Packet.debug) {
						System.out.println("Write bool: " + o);
					}
					if ((Boolean) o) {
						out.writeInt(1);
					} else {
						out.writeInt(0);
					}
				} else if (o instanceof byte[]) {
					if (Packet.debug) {
						System.out.println("Write bytes: " + o);
					}
					putByteArray(out, (byte[]) o);
				} else {
					if (Packet.debug) {
						System.out.println("Write unknown: " + o);
					}
					throw new IOException("Cannot serialize " + o);
				}
			}
		} else {
			if (Packet.debug) {
				System.out.println("Write data: " + data);
			}

			out.writeInt(data.length);
			out.write(data);
		}
		if (Packet.debug) {
			System.out.println("Flush");
		}

		out.flush();
	}

	/**
	 * @param opcode
	 *            opcafe of packet
	 */
	public void setOpcode(final int opcode) {
		this.opcode = opcode;
	}

	/**
	 * @return a string representation of this object
	 */
	@Override
	public String toString() {
		final StringBuilder sb = new StringBuilder("Packet\n opcode = ");
		sb.append(opcode);
		if (isBIS()) {
			if (opcode == 9 || opcode == 5) {
				try {
					final String cmd = getCommand(i.get(0));
					sb.append("\n command = ");
					sb.append(cmd);
					final String subcommand = getSubCommand(i.get(0), i.get(1));
					sb.append(" - subcommand = ");
					sb.append(subcommand);
				} catch (final IndexOutOfBoundsException e) {
					// Ignore if we have no command
				}
			}
			sb.append("\n B = ");
			sb.append(b);
			sb.append(",\n I = ");
			sb.append(i);
			sb.append(",\n S = [");
			boolean first = true;
			for (final String string : s) {
				if (first) {
					first = false;
				} else {
					sb.append(", ");
				}

				sb.append('`');
				sb.append(string);
				sb.append('\'');
			}
			sb.append(']');
		} else if (isGFC()) {
			sb.append("\n GFC = ");
			sb.append(command);
			sb.append(",\nreturn: ");
			sb.append(ret);
			sb.append(",\nparameters: ");
			sb.append(parameters);
		} else {
			sb.append("\n payload = `");
			sb.append(new String(data));
			sb.append('\'');
		}
		return sb.toString();
	}

	private static String getSubCommand(final Integer integer, final Integer integer2) {
		switch (integer) {
		case 100:
			return "no subcommand";
		case 200:
			return getMiscSubCommand(integer2);
		case 300:
			return getDeclSubCommand(integer2);
		case 400:
			return getSyntaxCheckSubCommand(integer2);
		case 500:
			return getSimulateSubCommand(integer2);
		case 450:
		case 800:
		default:
			return "unknown subcommand";
		}
	}

	private static String getSimulateSubCommand(final Integer integer) {
		switch (integer) {
		case 1:
			return "initialise simulator (create instances and intial state)";
		case 2:
			return "get simulation time and step number";
		case 3:
			return "create instances for specified objects";
		case 4:
			return "update instances for pages";
		case 5:
			return "build and initialise simulation scheduler";
		case 11:
			return "start run";
		case 12:
			return "execute transition";
		case 13:
			return "check enabledness of transition";
		case 14:
			return "check enabledness of transition without using scheduler structures";
		case 15:
			return "manually bind transition";
		case 19:
			return "reset step, time, and randum number generator";
		case 20:
			return "initialise state of simulator";
		case 21:
			return "create and reset scheduler";
		case 22:
			return "set marking of place instances";
		case 23:
			return "change model time";
		case 24:
			return "increase model time";
		case 31:
			return "return textual marking of place instances";
		case 32:
			return "marking size of place instances";
		case 35:
			return "return enabledness of transition instances";
		case 36:
			return "return enabledness of transition instances without using scheduler structures";
		case 41:
			return "save simulation report";
		case 42:
			return "clear simulation report";
		default:
			return "unknown subcommand";
		}
	}

	private static String getSyntaxCheckSubCommand(final Integer integer) {
		switch (integer) {
		case 1:
			return "initialise syntax checker";
		case 2:
			return "syntax check a page";
		case 3:
			return "is marking of given type";
		case 4:
			return "are two types equal";
		case 5:
			return "initialise code generation to file";
		default:
			return "unknown subcommand";
		}
	}

	private static String getDeclSubCommand(final Integer integer) {
		switch (integer) {
		case 1:
			return "check and create global declarations";
		case 2:
			return "check and create local declarations";
		default:
			return "unknown subcommand";
		}
	}

	private static String getMiscSubCommand(final Integer integer) {
		switch (integer) {
		case 9:
			return "set model name, model directory, and output directory";
		case 10:
			return "set simulation options";
		case 11:
			return "set initialisation simulation options";
		case 13:
			return "set options for simulation performance report";
		case 14:
			return "set options for replication/iid performance report";
		case 15:
			return "select levels for confidence intervals in performance reports";
		case 20:
			return "save image of ML-engine";
		case 30:
			return "enter state space tool (old)";
		default:
			return "unknown subcommand";
		}
	}

	private static String getCommand(final Integer integer) {
		switch (integer) {
		case 100:
			return "bootstrap";
		case 200:
			return "miscellaneous";
		case 300:
			return "compile declarations";
		case 400:
			return "syntax check net";
		case 450:
			return "monitor";
		case 500:
			return "simulate";
		case 800:
			return "state space";
		default:
			return "unknown command";
		}
	}

	private void writeObject(final java.io.ObjectOutputStream stream) throws IOException {
		send(new DataOutputStream(stream));
	}

	/**
	 * Clear the i list
	 */
	public void clearI() {
		i.clear();
	}
}
