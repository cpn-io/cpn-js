/**
 * 
 */
package org.cpntools.accesscpn.cosimulation;

import org.cpntools.accesscpn.model.cpntypes.CPNType;

/**
 * @author michael
 * @param <T>
 */
public class ChannelDescription<T> {
	private final T channel;
	private final CPNType type;
	private final String name;

	public ChannelDescription(final String name, final CPNType type, final T channel) {
		this.name = name;
		this.type = type;
		this.channel = channel;
	}

	/**
	 * @return
	 */
	public T getChannel() {
		return channel;
	}

	/**
	 * @return
	 */
	public String getName() {
		return name;
	}

	/**
	 * @return
	 */
	public CPNType getType() {
		return type;
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return name;
	}
}