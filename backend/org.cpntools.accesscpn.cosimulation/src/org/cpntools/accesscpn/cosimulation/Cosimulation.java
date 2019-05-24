package org.cpntools.accesscpn.cosimulation;

import java.util.Map.Entry;

import org.cpntools.accesscpn.engine.highlevel.instance.Instance;
import org.cpntools.accesscpn.model.PlaceNode;

/**
 * Abstract representation of a running cosimulation.
 * 
 * @author mwesterg
 */
public interface Cosimulation {
	public Iterable<Entry<Instance<PlaceNode>, DataStore>> data();

	public Iterable<Entry<Instance<PlaceNode>, InputChannel>> inputs();

	public Iterable<Entry<Instance<PlaceNode>, OutputChannel>> outputs();

	public Iterable<CPNToolsPlugin> plugins();

	public Iterable<SubpagePlugin> subpagePlugins();

	/** Lock the cosimulation (prevent further execution). */
	public void lock();

	public void unlock();
}
