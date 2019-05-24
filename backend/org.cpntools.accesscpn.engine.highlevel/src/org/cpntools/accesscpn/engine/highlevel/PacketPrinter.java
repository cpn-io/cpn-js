package org.cpntools.accesscpn.engine.highlevel;

import java.util.Observer;

import org.cpntools.accesscpn.engine.protocol.Packet;

public class PacketPrinter extends PacketInspector implements Observer {
	public PacketPrinter(final HighLevelSimulator simulator) {
		super(simulator);
	}

	@Override
	protected void handlePacket(final Packet p) {
		System.out.println(p);
	}

	@Override
	protected void handleReceive(final Packet p) {
		System.out.println(p);
	}

	@Override
	protected void handleOutput(final String text) {
// System.out.println("Evaluate: " + text);
	}

	@Override
	protected void handleError(final String text) {
// System.out.println("Error   : " + text);

	}

	@Override
	protected void handleInput(final String text) {
// System.out.println("Result  : " + text);

	}

	@Override
	protected void handleSimulatePacket(final Packet packet) throws Exception {
	}

	@Override
	protected void handleSyntaxPacket(final Packet packet) throws Exception {
	}

	@Override
	protected void handleDeclPacket(final Packet packet) throws Exception {
	}

	@Override
	protected void handleMiscPacket(final Packet packet) throws Exception {
	}

}
