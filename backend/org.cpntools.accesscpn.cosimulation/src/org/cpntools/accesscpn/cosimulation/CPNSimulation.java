package org.cpntools.accesscpn.cosimulation;

import java.util.Collection;

import org.cpntools.accesscpn.engine.highlevel.instance.Binding;
import org.cpntools.accesscpn.engine.highlevel.instance.Instance;
import org.cpntools.accesscpn.model.Transition;

/**
 * @author mwesterg
 */
public interface CPNSimulation {
	public void done();

	public Collection<ChannelDescription<DataStore>> getData();

	public Collection<ChannelDescription<OutputChannel>> getInputs();

	public Collection<ChannelDescription<InputChannel>> getOutputs();

	public void setup() throws Exception;

	public void start();

	public boolean step(boolean monitor) throws Exception;

	public boolean step() throws Exception;

	public boolean step(Binding b) throws Exception;

	public boolean step(Instance<Transition> ti) throws Exception;

	public void teardown();

	public boolean isDirty();

	public boolean isDone();
}
