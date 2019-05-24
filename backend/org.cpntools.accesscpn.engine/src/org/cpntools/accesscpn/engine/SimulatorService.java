/*
 * BRITNeY Suite Copyright (C) 2004-2006 Michael Westergaard and others This program is free software; you can
 * redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later version. This program is distributed in
 * the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details. You should have received a
 * copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
 */
package org.cpntools.accesscpn.engine;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Observable;

/**
 * @author Michael Westergaard
 */
public class SimulatorService extends Observable implements Iterable<Simulator>, Runnable {
	static SimulatorService s = new SimulatorService();

	/**
	 * Get a static instance of SimulatorService
	 * 
	 * @return the static instance
	 */
	public static SimulatorService getInstance() {
		return SimulatorService.s;
	}

	private final Map<String, Simulator> simulatorMap;

	private final Map<Simulator, String> reverseSimulatorMap;

	int maxId = 0;

	List<Simulator> simulators;

	private SimulatorService() {
		simulators = new ArrayList<Simulator>();
		simulatorMap = new HashMap<String, Simulator>();
		reverseSimulatorMap = new HashMap<Simulator, String>();
		Runtime.getRuntime().addShutdownHook(new Thread(this, "SimulatorService shutdown hook")); //$NON-NLS-1$
	}

	/**
	 * @return a new simulator
	 * @throws Exception
	 *             if an error occurred
	 */
	public Simulator getNewSimulator() throws Exception {
		SimulatorImplementation implementation;
		try {
			implementation = new DaemonSimulator();
		} catch (final Exception e) {
			throw new Exception("Error starting simulator; try killing any processes containing cpnmld or run.x86");
		}
		final Simulator simulator = new Simulator(implementation);
		simulators.add(simulator);
		setChanged();
		notifyObservers(simulator);
		return simulator;
	}

	/**
	 * @param id
	 *            id of simulator
	 * @return the simulator with the id
	 */
	public Simulator getSimulator(final String id) {
		return simulatorMap.get(id);
	}

	/**
	 * @param simulator
	 *            simulator to ID
	 * @return a new unique id for the given simulator
	 */
	public synchronized String getUniqueId(final Simulator simulator) {
		String id = reverseSimulatorMap.get(simulator);
		if (id != null) { return id; }
		id = "simulator" + maxId++; //$NON-NLS-1$
		simulatorMap.put(id, simulator);
		reverseSimulatorMap.put(simulator, id);
		return id;
	}

	/**
	 * @return an iterator of all simulators
	 * @see java.lang.Iterable#iterator()
	 */
	@Override
    public Iterator<Simulator> iterator() {
		return simulators.iterator();
	}

	/**
	 * @see java.lang.Runnable#run()
	 */
	@Override
    public void run() {
		for (final Simulator simulator : new ArrayList<Simulator>(simulators)) {
			try {
				simulator.destroy();
			} catch (final Exception ex) { // Ignore error
			}
		}
	}

	/**
	 * @return the current number of simulators
	 */
	public int size() {
		return simulators.size();
	}

	/**
	 * @param id
	 *            id of simulator
	 * @param simulator
	 *            simulator
	 */
	public void unregisterSimulator(final String id, final Simulator simulator) {
		reverseSimulatorMap.remove(simulator);
		simulatorMap.remove(id);
		simulators.remove(simulator);
		setChanged();
		notifyObservers(simulator);
	}
}
