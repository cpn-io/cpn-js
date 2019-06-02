package org.cpntools.accesscpn.engine.protocol;

/**
 * @author michael
 */
public class UnknownTimeConceptException extends DMOSimulatorException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * @param p
	 */
	public UnknownTimeConceptException(final Packet p) {
		super(p);
	}

}
