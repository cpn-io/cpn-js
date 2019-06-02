package org.cpntools.accesscpn.cosimulation;

import java.util.Collection;

import org.cpntools.accesscpn.engine.highlevel.instance.cpnvalues.CPNValue;

public interface OutputChannel {
	void close();

	boolean isClosed();

	/**
	 * Send a collection of object along this communication channel
	 * 
	 * @param offers
	 */
	void offer(Collection<CPNValue> offers);

	void offer(CPNValue offer);
}
