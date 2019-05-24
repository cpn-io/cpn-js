package org.cpntools.accesscpn.cosimulation;

import java.util.Collection;

import org.cpntools.accesscpn.engine.highlevel.instance.cpnvalues.CPNValue;

public interface InputChannel {
	void close();

	/**
	 * Get all currently available objects on this communication channel. Once an object has been
	 * returned, it will not be returned again (i.e., this clears the channel). It may return an
	 * empty collection, as as such acts as a poll.
	 * 
	 * @return
	 */
	Collection<CPNValue> getOffers();

	boolean isClosed();

	/**
	 * Same as getOffers except this will only return an empty collection if the channel is closed,
	 * and will block until one or more objects are available.
	 * 
	 * @return
	 */
	Collection<CPNValue> waitForOffer();
}
