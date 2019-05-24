package org.cpntools.accesscpn.cosimulation.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.cpntools.accesscpn.cosimulation.AbstractPlugin;
import org.cpntools.accesscpn.cosimulation.PlacePlugin;
import org.cpntools.accesscpn.engine.highlevel.instance.cpnvalues.CPNValue;

public abstract class AbstractChannel extends AbstractPlugin implements PlacePlugin {
	List<CPNValue> offers = new ArrayList<CPNValue>();
	private boolean closed;

	@Override
	public synchronized void close() {
		closed = true;
		notifyAll();
	}

	@Override
	public synchronized Collection<CPNValue> getOffers() {
		if (offers.isEmpty()) { return Collections.emptyList(); }
		final List<CPNValue> theOffers = offers;
		offers = new ArrayList<CPNValue>();
		return theOffers;
	}

	@Override
	public boolean isClosed() {
		return closed;
	}

	@Override
	public void offer(final Collection<CPNValue> offers) {
		for (final CPNValue offer : offers) {
			offerSingle(offer);
		}
	}

	public void offerSingle(final CPNValue offer) {
		// Implement if desired
	}

	public void offer(final CPNValue offer) {
		offerSingle(offer);
	}

	@Override
	public synchronized Collection<CPNValue> waitForOffer() {
		Collection<CPNValue> result;
		while ((result = getOffers()).isEmpty() && !isClosed()) {
			try {
				wait();
			} catch (final InterruptedException e) {
				// Ingnore interrupt
			}
		}
		return result;
	}

	protected synchronized void publishOffer(final CPNValue... offer) {
		for (final CPNValue o : offer) {
			offers.add(o);
		}
		notifyAll();
	}

	protected synchronized void publishOffer(final CPNValue o) {
		offers.add(o);
		notifyAll();
	}
}
