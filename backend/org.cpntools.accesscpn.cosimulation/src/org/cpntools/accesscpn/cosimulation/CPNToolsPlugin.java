package org.cpntools.accesscpn.cosimulation;

/**
 * @author michael
 * 
 */
public interface CPNToolsPlugin {
	/**
	 * Called after a run.
	 */
	void end();

	/**
	 * Called before a run.
	 * 
	 * @throws Exception
	 */
	void start(ExecutionContext context) throws Exception;
}
