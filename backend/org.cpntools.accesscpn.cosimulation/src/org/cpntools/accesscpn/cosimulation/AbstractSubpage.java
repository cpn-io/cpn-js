package org.cpntools.accesscpn.cosimulation;

import java.util.Collection;

import org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelData;

public abstract class AbstractSubpage implements SubpagePlugin {
	protected boolean done = false;
	protected ExecutionContext context;
	protected ModelData modelData;

	@Override
	public void end() {
		done = true;
	}

	@Override
	public boolean isDone() {
		return done;
	}

	@Override
	public void run() {

	}

	@Override
	public boolean setInterface(final ModelData modelData, final Collection<ChannelDescription<InputChannel>> inputs,
	        final Collection<ChannelDescription<OutputChannel>> outputs,
	        final Collection<ChannelDescription<DataStore>> data) {
		this.modelData = modelData;
		return false;
	}

	@Override
	public void start(final ExecutionContext context) throws Exception {
		this.context = context;
		run();
	}

	protected void done() {
		done = true;
	}
}
