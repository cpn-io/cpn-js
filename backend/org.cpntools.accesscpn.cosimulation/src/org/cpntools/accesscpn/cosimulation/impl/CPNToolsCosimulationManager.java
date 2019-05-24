package org.cpntools.accesscpn.cosimulation.impl;

import java.util.Calendar;
import java.util.Map;

import javax.naming.OperationNotSupportedException;

import org.cpntools.accesscpn.cosimulation.CosimulationManager;
import org.cpntools.accesscpn.cosimulation.PlacePlugin;
import org.cpntools.accesscpn.cosimulation.SubpagePlugin;
import org.cpntools.accesscpn.cosimulation.TransitionPlugin;
import org.cpntools.accesscpn.engine.highlevel.HighLevelSimulator;
import org.cpntools.accesscpn.engine.highlevel.checker.Checker;
import org.cpntools.accesscpn.engine.highlevel.instance.Instance;
import org.cpntools.accesscpn.model.Page;
import org.cpntools.accesscpn.model.PetriNet;
import org.cpntools.accesscpn.model.PlaceNode;
import org.cpntools.accesscpn.model.Transition;

/**
 * @author mwesterg
 */
public class CPNToolsCosimulationManager implements CosimulationManager<CPNToolsCosimulation> {

	/**
	 * @see org.cpntools.accesscpn.cosimulation.CosimulationManager#launch(org.cpntools.accesscpn.cosimulation.Cosimulation)
	 */
	@Override
	public CPNToolsSimulation launch(final CPNToolsCosimulation cosimulation) throws Exception {
		final CPNToolsSimulation simulation = new CPNToolsSimulation(cosimulation);
		simulation.start();
		return simulation;
	}

	/**
	 * @see org.cpntools.accesscpn.cosimulation.CosimulationManager#launchInCPNTools(org.cpntools.accesscpn.cosimulation.Cosimulation)
	 */
	@Override
	public void launchInCPNTools(final CPNToolsCosimulation cosimulation) throws Exception {
		launch(cosimulation);
		cosimulation.getSimulator();
		while (true) {
			throw new OperationNotSupportedException("Not implemented yet");
		}
	}

	/**
	 * @see org.cpntools.accesscpn.cosimulation.CosimulationManager#setup(org.cpntools.accesscpn.model.PetriNet,
	 *      org.cpntools.accesscpn.engine.highlevel.HighLevelSimulator,
	 *      org.cpntools.accesscpn.cosimulation.ExecutionContext, java.util.Map, java.util.Map, java.util.Map)
	 */
	@Override
	public CPNToolsCosimulation setup(final PetriNet model, final HighLevelSimulator simulator,
	        final Map<Instance<Page>, SubpagePlugin> subpagePlugins,
	        final Map<Instance<PlaceNode>, PlacePlugin> placePlugins,
	        final Map<Instance<Transition>, TransitionPlugin> transitionPlugins, final Calendar offset,
	        final long granularity) {
		return new CPNToolsCosimulation(model, simulator, subpagePlugins, placePlugins, transitionPlugins, offset,
		        granularity);
	}

	/**
	 * @see org.cpntools.accesscpn.cosimulation.CosimulationManager#setup(org.cpntools.accesscpn.model.PetriNet,
	 *      org.cpntools.accesscpn.cosimulation.ExecutionContext, java.util.Map, java.util.Map, java.util.Map)
	 */
	@Override
	public CPNToolsCosimulation setup(final PetriNet model, final Map<Instance<Page>, SubpagePlugin> subpagePlugins,
	        final Map<Instance<PlaceNode>, PlacePlugin> placePlugins,
	        final Map<Instance<Transition>, TransitionPlugin> transitionPlugins, final Calendar offset,
	        final long granularity) {
		try {
			final HighLevelSimulator highLevelSimulator = HighLevelSimulator.getHighLevelSimulator();
			final Checker checker = new Checker(model, null, highLevelSimulator);
			checker.checkEntireModel();
			return setup(model, highLevelSimulator, subpagePlugins, placePlugins, transitionPlugins, offset,
			        granularity);
		} catch (final Exception e) {
			return new EmptyCosimulation();
		}
	}

}
