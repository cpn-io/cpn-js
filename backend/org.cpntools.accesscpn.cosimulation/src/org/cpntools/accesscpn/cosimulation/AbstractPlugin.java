package org.cpntools.accesscpn.cosimulation;

/**
 * @author michael
 * 
 */
public abstract class AbstractPlugin implements CPNToolsPlugin {
	protected ExecutionContext context;

	@Override
	public void end() {
	}

	@Override
	public void start(final ExecutionContext context) {
		this.context = context;
	}
}
