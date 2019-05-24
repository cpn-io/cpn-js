package org.cpntools.accesscpn.cosimulation.impl;

import java.util.Collection;

import org.cpntools.accesscpn.engine.highlevel.instance.cpnvalues.CPNValue;

/**
 * @author michael
 */
public class PipeChannel extends AbstractChannel {
	/**
	 * @see org.cpntools.accesscpn.cosimulation.impl.AbstractChannel#offer(java.util.Collection)
	 */
	@Override
	public void offer(final Collection<CPNValue> offers) {
		final CPNValue[] array = new CPNValue[offers.size()];
		offers.toArray(array);
		publishOffer(array);
	}

	/**
	 * @see org.cpntools.accesscpn.cosimulation.OutputChannel#offer(org.cpntools.accesscpn.engine.highlevel.instance.cpnvalues.CPNValue)
	 */
	@Override
	public void offer(final CPNValue offer) {
		publishOffer(offer);
	}
}
