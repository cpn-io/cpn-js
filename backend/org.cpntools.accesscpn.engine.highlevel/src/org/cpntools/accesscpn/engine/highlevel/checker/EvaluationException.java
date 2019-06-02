package org.cpntools.accesscpn.engine.highlevel.checker;

/**
 * @author michael
 */
public class EvaluationException extends Exception {

	/**
     * 
     */
	private static final long serialVersionUID = 1L;
	private final String code;

	/**
	 * @param code
	 * @param message
	 */
	public EvaluationException(final String code, final String message) {
		super(message);
		this.code = code;
	}

	/**
	 * @return
	 */
	public String getCode() {
		return code;
	}

}
