/************************************************************************/
/* Access/CPN */
/* Copyright 2010-2011 AIS Group, Eindhoven University of Technology */
/*                                                                      */
/* This library is free software; you can redistribute it and/or */
/* modify it under the terms of the GNU Lesser General Public */
/* License as published by the Free Software Foundation; either */
/* version 2.1 of the License, or (at your option) any later version. */
/*                                                                      */
/* This library is distributed in the hope that it will be useful, */
/* but WITHOUT ANY WARRANTY; without even the implied warranty of */
/* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU */
/* Lesser General Public License for more details. */
/*                                                                      */
/* You should have received a copy of the GNU Lesser General Public */
/* License along with this library; if not, write to the Free Software */
/* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, */
/* MA 02110-1301 USA */
/************************************************************************/
package org.cpntools.accesscpn.engine.proxy;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.Socket;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Observable;
import java.util.Observer;

import org.cpntools.accesscpn.engine.Simulator;
import org.cpntools.accesscpn.engine.highlevel.HighLevelSimulator;
import org.cpntools.accesscpn.engine.highlevel.PacketPrinter;
import org.cpntools.accesscpn.engine.protocol.Packet;
import org.cpntools.accesscpn.model.PetriNet;

public class ProxySimulator extends Thread {
	@SuppressWarnings("unused")
	private final Socket cpnmld;
	@SuppressWarnings("unused")
	private final Socket dmo;
	@SuppressWarnings("unused")
	private final Socket dmoeval;
	private final DataOutputStream dmoevalout;
	private final DataInputStream dmoin;
	private final DataOutputStream dmoout;
	private ModelScraper modelScraper;
	private HighLevelSimulator simulator;

	List<Packet> log;

	public ProxySimulator(final Socket cpnmld, final Socket dmo, final Socket dmoeval,
	        final DataOutputStream dmoevalout, final DataInputStream dmoin, final DataOutputStream dmoout) {
		super("Proxy Simulator");
		setDaemon(true);
		this.cpnmld = cpnmld;
		this.dmo = dmo;
		this.dmoeval = dmoeval;
		this.dmoevalout = dmoevalout;
		this.dmoin = dmoin;
		this.dmoout = dmoout;
		log = new LinkedList<Packet>();
	}

	public PetriNet getPetriNet() throws Exception {
		if (modelScraper == null) { return null; }
		return modelScraper.getPetriNet();
	}

	public HighLevelSimulator getSimulator() {
		return simulator;
	}

	public HighLevelSimulator getSimulatorClone() throws Exception {
		final HighLevelSimulator simulator = HighLevelSimulator.getHighLevelSimulator();
		final ModelScraper modelScraper = new ModelScraper(simulator);
		for (final Packet p : new ArrayList<Packet>(log)) {
			if (p.getOpcode() == 9 || p.getOpcode() == 7 || p.getOpcode() == 5 || p.getOpcode() == 6) {
				if (p.getOpcode() != 5) {
					simulator.send(p);
				}
			} else {
				try {
					simulator.evaluate(p.getData());
				} catch (final Exception e) {

				}
			}
		}
		while (modelScraper.getPetriNet() == null) {
			Thread.sleep(100);
		}
		return simulator;
	}

	@Override
	public void run() {
		try {
			final HighLevelSimulator simulator = instantiateSimulator();
			dmoevalout.write((simulator.getBanner() + "Via Access/CPN Proxy Simulator\n\1").getBytes());
			dmoevalout.flush();

			while (true) {
				Packet p = new Packet();
				p.receive(dmoin);
				log.add(p);
				if (p.getOpcode() == 9 || p.getOpcode() == 7 || p.getOpcode() == 5 || p.getOpcode() == 6) {
					if (p.getOpcode() != 5) {
						p = simulator.send(p);
						synchronized (dmoout) {
							p.send(dmoout);
							dmoout.flush();
						}
					}
				} else {
					try {
						final String expr = p.getData();
						final String result = simulator.evaluate(expr);
						dmoevalout.write((result + "\1").getBytes()); //$NON-NLS-1$
					} catch (final Exception ex) {
						dmoevalout.write((ex.getMessage() + "\2").getBytes()); //$NON-NLS-1$
					}
					dmoevalout.flush();
				}
			}
		} catch (final Exception e) {
		}
	}

	private HighLevelSimulator instantiateSimulator() throws Exception {
		final HighLevelSimulator simulator = HighLevelSimulator.getHighLevelSimulator();
		this.simulator = simulator;
		final ModelScraper modelScraper = new ModelScraper(simulator);
		this.modelScraper = modelScraper;
		simulator.getSimulator().addObserver(modelScraper);
		simulator.getSimulator().addObserver(new PacketPrinter(simulator));
		simulator.getSimulator().addObserver(new Observer() {
			@Override
			public void update(final Observable arg0, final Object arg1) {
				if (arg1 != null && arg1 instanceof Simulator.SimulatorStateChanged) {
					final Simulator.SimulatorStateChanged update = (Simulator.SimulatorStateChanged) arg1;
					final Packet p = new Packet(5, 1);
					p.addInteger(0); // delay
					p.addString("" + update.getStep()); // step
					p.addString("" + update.getTime()); // time
					p.addInteger(update.getEnablings().size()); // trans
					p.addInteger(update.getMarkings().size()); // places
					for (final Map.Entry<Simulator.SimpleInstance, Boolean> entry : update.getEnablings().entrySet()) {
						p.addString(entry.getKey().getId());
						p.addInteger(entry.getKey().getInstance());
						p.addBoolean(entry.getValue());
					}
					for (final Map.Entry<Simulator.SimpleInstance, Simulator.SimpleMarking> entry : update
					        .getMarkings().entrySet()) {
						p.addString(entry.getKey().getId());
						p.addString(entry.getValue().getMarking());
						p.addInteger(entry.getKey().getInstance());
						p.addInteger(entry.getValue().getCount());
					}
					synchronized (dmoout) {
						try {
							p.send(dmoout);
						} catch (final IOException e) {
						}
					}
				}
			}
		});
		return simulator;
	}
}
