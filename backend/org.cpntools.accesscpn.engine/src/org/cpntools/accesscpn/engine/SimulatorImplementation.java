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
package org.cpntools.accesscpn.engine;

import java.io.IOException;

import org.cpntools.accesscpn.engine.protocol.Packet;

/**
 * @author mw
 */
public interface SimulatorImplementation {
	/**
	 * 
	 */
	void destroy();

	/**
	 * @return banner from simulator
	 */
	String getBanner();

	/**
	 * @return a packet from the simulator
	 * @throws IOException
	 *             if an IO error occurred
	 */
	Packet receive() throws IOException;

	/**
	 * @param p
	 *            packet to send
	 * @throws IOException
	 *             if an IO error occurred
	 */
	void send(Packet p) throws IOException;

	/**
	 * Read data from eval stream.
	 * 
	 * @param data
	 *            array to store in
	 * @param start
	 *            first position to store in
	 * @param count
	 *            max number of bytes to read
	 * @return the actual number of bytes read
	 * @throws IOException
	 *             if an error occurs
	 * @see java.io.InputStream#read(byte[], int, int)
	 */
	int getEvalBytes(byte[] data, int start, int count) throws IOException;

}
