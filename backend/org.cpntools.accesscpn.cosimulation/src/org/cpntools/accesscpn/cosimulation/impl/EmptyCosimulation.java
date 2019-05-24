package org.cpntools.accesscpn.cosimulation.impl;

import java.util.Calendar;
import java.util.Collections;

/**
 * @author michael
 */
public class EmptyCosimulation extends CPNToolsCosimulation {

	/**
	 * 
	 */
	@SuppressWarnings("unchecked")
	public EmptyCosimulation() {
		super(null, null, Collections.EMPTY_MAP, Collections.EMPTY_MAP, Collections.EMPTY_MAP, Calendar.getInstance(),
		        1000);
	}

}
