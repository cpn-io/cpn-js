package org.cpntools.accesscpn.cosimulation.impl;

import java.util.Collection;

import org.cpntools.accesscpn.cosimulation.OutputChannel;
import org.cpntools.accesscpn.engine.highlevel.instance.cpnvalues.CPNValue;

public class SinkOutputChannel implements OutputChannel {
	private boolean closed;

	/**
	 * @see org.cpntools.accesscpn.cosimulation.OutputChannel#close()
	 */
	@Override
	public void close() {
		closed = true;
	}

	/**
	 * @see org.cpntools.accesscpn.cosimulation.OutputChannel#isClosed()
	 */
	@Override
	public boolean isClosed() {
		return closed;
	}

	/**
	 * @see org.cpntools.accesscpn.cosimulation.OutputChannel#offer(java.util.Collection)
	 */
	@Override
	public void offer(final Collection<CPNValue> offers) {
		// Discard
	}

	/**
	 * @see org.cpntools.accesscpn.cosimulation.OutputChannel#offer(org.cpntools.accesscpn.engine.highlevel.instance.cpnvalues.CPNValue)
	 */
	@Override
	public void offer(final CPNValue offer) {
		// Discard
	}
}
