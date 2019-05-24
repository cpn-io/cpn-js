package org.cpntools.accesscpn.cosimulation;

import java.util.Map;

import org.cpntools.accesscpn.engine.highlevel.instance.Binding;
import org.cpntools.accesscpn.engine.highlevel.instance.cpnvalues.CPNValue;

/**
 * @author michael
 * 
 */
public interface TransitionPlugin extends CPNToolsPlugin {
	/**
	 * @param binding
	 *            the binding for which the transition was executed
	 * @param time
	 *            the time stamp at which the binding was executed
	 * @param valueMap
	 *            as far as possible translated values of bindings
	 * @return a map containing new values for bindings; implementations may try rebinding variables
	 *         after execution such that produced (but not consumed) tokens depend on newly bound
	 *         values).
	 * @throws Exception
	 */
	Map<String, CPNValue> execute(Binding binding, Number time, Map<String, CPNValue> valueMap)
			throws Exception;

	boolean isEnabled(Binding binding, Number time, Map<String, CPNValue> valueMap);
}
