package org.cpntools.accesscpn.engine.protocol;

/**
 * @author michael
 */
public class UnknownCommandException extends DMOSimulatorException {

	/**
     * 
     */
	private static final long serialVersionUID = 1L;

	/**
	 * @param p
	 */
	public UnknownCommandException(final Packet p) {
		super(p);
	}

}
