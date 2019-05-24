package org.cpntools.accesscpn.cosimulation;

import java.util.Collection;

import org.cpntools.accesscpn.engine.highlevel.instance.cpnvalues.CPNValue;

public interface DataStore {
	void addValue(CPNValue value);

	Collection<CPNValue> getValues();

	boolean isChanged();

	boolean isClosed();

	boolean removeValue(CPNValue token);

	void setValues(Collection<CPNValue> values);
}
