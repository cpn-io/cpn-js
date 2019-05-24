package org.cpntools.accesscpn.cosimulation.impl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.cpntools.accesscpn.cosimulation.CPNToolsPlugin;
import org.cpntools.accesscpn.cosimulation.ChannelDescription;
import org.cpntools.accesscpn.cosimulation.Cosimulation;
import org.cpntools.accesscpn.cosimulation.DataStore;
import org.cpntools.accesscpn.cosimulation.ExecutionContext;
import org.cpntools.accesscpn.cosimulation.InputChannel;
import org.cpntools.accesscpn.cosimulation.OutputChannel;
import org.cpntools.accesscpn.cosimulation.PlacePlugin;
import org.cpntools.accesscpn.cosimulation.SubpagePlugin;
import org.cpntools.accesscpn.cosimulation.TransitionPlugin;
import org.cpntools.accesscpn.engine.highlevel.HighLevelSimulator;
import org.cpntools.accesscpn.engine.highlevel.instance.Instance;
import org.cpntools.accesscpn.engine.highlevel.instance.InstanceFactory;
import org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelData;
import org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelDataAdapterFactory;
import org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelInstance;
import org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelInstance.ArcInfo;
import org.cpntools.accesscpn.engine.highlevel.instance.adapter.ModelInstanceAdapterFactory;
import org.cpntools.accesscpn.model.Node;
import org.cpntools.accesscpn.model.Page;
import org.cpntools.accesscpn.model.ParameterAssignment;
import org.cpntools.accesscpn.model.PetriNet;
import org.cpntools.accesscpn.model.PlaceNode;
import org.cpntools.accesscpn.model.RefPlace;
import org.cpntools.accesscpn.model.Transition;

/**
 * @author michael
 */
public class CPNToolsCosimulation implements Cosimulation {

	private final PetriNet model;
	private final HighLevelSimulator simulator;
	private final Map<Instance<Page>, SubpagePlugin> subpagePlugins;
	private final Map<Instance<PlaceNode>, PlacePlugin> placePlugins;
	private final Map<Instance<Transition>, TransitionPlugin> transitionPlugins;
	private List<Instance<Transition>> allTransitionInstances;
	private final ModelData modelData;
	private final Map<Instance<PlaceNode>, InputChannel> inputs;
	private final Map<Instance<PlaceNode>, OutputChannel> outputs;
	private final Map<Instance<PlaceNode>, DataStore> data;
	private final ModelInstance modelInstance;
	private final List<ChannelDescription<InputChannel>> inputPlaces;
	private final List<ChannelDescription<OutputChannel>> outputPlaces;
	private final List<ChannelDescription<DataStore>> dataPlaces;
	private final ExecutionContext context;

	/**
	 * @param model
	 * @param simulator
	 * @param subpagePlugins
	 * @param placePlugins
	 * @param transitionPlugins
	 * @param granularity
	 * @param offset
	 */
	public CPNToolsCosimulation(final PetriNet model, final HighLevelSimulator simulator,
	        final Map<Instance<Page>, SubpagePlugin> subpagePlugins,
	        final Map<Instance<PlaceNode>, PlacePlugin> placePlugins,
	        final Map<Instance<Transition>, TransitionPlugin> transitionPlugins, final Calendar offset,
	        final long granularity) {
		this.model = model;
		this.simulator = simulator;
		this.subpagePlugins = subpagePlugins;
		this.placePlugins = placePlugins;
		this.transitionPlugins = transitionPlugins;
		context = new ExecutionContext(offset, granularity);
		modelData = (ModelData) ModelDataAdapterFactory.getInstance().adapt(model, ModelData.class);
		modelInstance = (ModelInstance) ModelInstanceAdapterFactory.getInstance().adapt(model, ModelInstance.class);
		inputs = new HashMap<Instance<PlaceNode>, InputChannel>();
		outputs = new HashMap<Instance<PlaceNode>, OutputChannel>();
		data = new HashMap<Instance<PlaceNode>, DataStore>();

		inputPlaces = new ArrayList<ChannelDescription<InputChannel>>();
		outputPlaces = new ArrayList<ChannelDescription<OutputChannel>>();
		dataPlaces = new ArrayList<ChannelDescription<DataStore>>();

		final Set<String> used = new HashSet<String>();

		try {
			final List<Instance<Transition>> modifiableTransitionInstances = simulator.getAllTransitionInstances();
			allTransitionInstances = Collections.unmodifiableList(modifiableTransitionInstances);

			for (final Instance<PlaceNode> pi : placePlugins.keySet()) {
				used.add(pi.getNode().getId());
			}
			inputs.putAll(placePlugins);
			outputs.putAll(placePlugins);

			for (final Instance<Page> pi : subpagePlugins.keySet()) {
				for (final ParameterAssignment parameter : pi.getTransitionPath().getNode().getParameterAssignment()) {
					used.add(parameter.getParameter());
				}
			}
			addModules(subpagePlugins, modifiableTransitionInstances);
		} catch (final Exception e) {
			e.printStackTrace();
			allTransitionInstances = Collections.emptyList();
		}

		for (final Page page : modelInstance.getTopPages()) {
			final ArcInfo arcInfo = modelInstance.getArcInfo(page);

			assert modelInstance.getAllInstances(page).size() == 1;
			assert modelInstance.getAllInstances(page).iterator().next().getTransitionPath() == null;

			for (final org.cpntools.accesscpn.model.Instance instance : page.instance()) {
				for (final ParameterAssignment parameter : instance.getParameterAssignment()) {
					if (!used.contains(parameter.getParameter())) {
						addPlace(null, inputPlaces, outputPlaces, dataPlaces, inputs, outputs, data, instance, arcInfo,
						        parameter, true);
						used.add(parameter.getParameter());
					}
				}
			}

			for (final PlaceNode place : page.place()) {
				if (!used.contains(place.getId())) {
					final int in = size(arcInfo.getInputs().get(place));
					final int out = size(arcInfo.getOutputs().get(place));
					if (in == 0 && out != 0) {
						final PipeChannel channel = new PipeChannel();
						inputPlaces.add(new ChannelDescription<InputChannel>(place.getName().getText(), modelData
						        .getType(place), channel));
						inputs.put(InstanceFactory.INSTANCE.createInstance(place, null), channel);
					}
					if (out == 0 && in != 0) {
						final PipeChannel channel = new PipeChannel();
						outputPlaces.add(new ChannelDescription<OutputChannel>(place.getName().getText(), modelData
						        .getType(place), channel));
						outputs.put(InstanceFactory.INSTANCE.createInstance(place, null), channel);
					}
					if (in == 0 && out == 0) {
						final DataStore channel = new DefaultDataStore();
						dataPlaces.add(new ChannelDescription<DataStore>(place.getName().getText(), modelData
						        .getType(place), channel));
						data.put(InstanceFactory.INSTANCE.createInstance(place, null), channel);
					}
				}
			}
		}

	}

	/**
	 * @see org.cpntools.accesscpn.cosimulation.Cosimulation#lock()
	 */
	@Override
	public void lock() {
		context.lock();
	}

	/**
	 * @see org.cpntools.accesscpn.cosimulation.Cosimulation#unlock()
	 */
	@Override
	public void unlock() {
		context.unlock();
	}

	private int size(final List<?> list) {
		if (list == null) { return 0; }
		return list.size();
	}

	/**
	 * @see org.cpntools.accesscpn.cosimulation.Cosimulation#data()
	 */
	@Override
	public Iterable<Entry<Instance<PlaceNode>, DataStore>> data() {
		return data.entrySet();
	}

	/**
	 * @return the allTransitionInstances
	 */
	public List<Instance<Transition>> getAllTransitionInstances() {
		return allTransitionInstances;
	}

	/**
	 * @return the model
	 */
	public PetriNet getModel() {
		return model;
	}

	/**
	 * @return the modelData
	 */
	public ModelData getModelData() {
		return modelData;
	}

	/**
	 * @return the modelInstance
	 */
	public ModelInstance getModelInstance() {
		return modelInstance;
	}

	/**
	 * @return the simulator
	 */
	public HighLevelSimulator getSimulator() {
		return simulator;
	}

	/**
	 * @param transitionInstance
	 * @return
	 */
	public TransitionPlugin getTransitionPlugin(final Instance<Transition> transitionInstance) {
		return transitionPlugins.get(transitionInstance);
	}

	/**
	 * @see org.cpntools.accesscpn.cosimulation.Cosimulation#inputs()
	 */
	@Override
	public Iterable<Map.Entry<Instance<PlaceNode>, InputChannel>> inputs() {
		return inputs.entrySet();
	}

	/**
	 * @see org.cpntools.accesscpn.cosimulation.Cosimulation#outputs()
	 */
	@Override
	public Iterable<Entry<Instance<PlaceNode>, OutputChannel>> outputs() {
		return outputs.entrySet();
	}

	/**
	 * @see org.cpntools.accesscpn.cosimulation.Cosimulation#plugins()
	 */
	@Override
	public Iterable<CPNToolsPlugin> plugins() {
		return new Iterable<CPNToolsPlugin>() {
			@Override
			public Iterator<CPNToolsPlugin> iterator() {
				return new Iterator<CPNToolsPlugin>() {
					int level = 0;
					Iterator<? extends CPNToolsPlugin> nextIterator = subpagePlugins.values().iterator();

					@Override
					public boolean hasNext() {
						hoist();
						return nextIterator.hasNext();
					}

					@Override
					public CPNToolsPlugin next() {
						hoist();
						return nextIterator.next();
					}

					@Override
					public void remove() {
						nextIterator.remove();
					}

					private void hoist() {
						if (nextIterator.hasNext()) { return; }
						level++;
						if (level == 1) {
							nextIterator = placePlugins.values().iterator();
							hoist();
						} else if (level == 2) {
							nextIterator = transitionPlugins.values().iterator();
							hoist();
						}
					}
				};
			}
		};
	}

	/**
	 * @see org.cpntools.accesscpn.cosimulation.Cosimulation#subpagePlugins()
	 */
	@Override
	public Iterable<SubpagePlugin> subpagePlugins() {
		return new Iterable<SubpagePlugin>() {
			@Override
			public Iterator<SubpagePlugin> iterator() {
				return subpagePlugins.values().iterator();
			}
		};
	}

	private void addModules(final Map<Instance<Page>, SubpagePlugin> subpagePlugins,
	        final List<Instance<Transition>> modifiableTransitionInstances) {
		for (final Entry<Instance<Page>, SubpagePlugin> entry : subpagePlugins.entrySet()) {
			final Instance<org.cpntools.accesscpn.model.Instance> transitionPath = entry.getKey().getTransitionPath();
			assert transitionPath != null;
			final List<ChannelDescription<InputChannel>> i = new ArrayList<ChannelDescription<InputChannel>>();
			final List<ChannelDescription<OutputChannel>> o = new ArrayList<ChannelDescription<OutputChannel>>();
			final List<ChannelDescription<DataStore>> d = new ArrayList<ChannelDescription<DataStore>>();
			final Map<Instance<PlaceNode>, InputChannel> ii = new HashMap<Instance<PlaceNode>, InputChannel>();
			final Map<Instance<PlaceNode>, OutputChannel> oo = new HashMap<Instance<PlaceNode>, OutputChannel>();
			final Map<Instance<PlaceNode>, DataStore> dd = new HashMap<Instance<PlaceNode>, DataStore>();
			final org.cpntools.accesscpn.model.Instance instance = transitionPath.getNode();
			final ArcInfo arcInfo = modelInstance.getArcInfo(instance.getPage());
			for (final ParameterAssignment pa : instance.getParameterAssignment()) {
				final boolean isUsed = addPlace(transitionPath.getTransitionPath(), i, o, d, ii, oo, dd, instance,
				        arcInfo, pa, false);
				assert isUsed;
			}
			if (entry.getValue().setInterface(modelData, i, o, d)) {
				outputs.putAll(oo);
				inputs.putAll(ii);
				data.putAll(dd);
				removeChildTransitions(modifiableTransitionInstances, entry.getKey());
			}
		}
	}

	private boolean addPlace(final Instance<org.cpntools.accesscpn.model.Instance> transitionPath,
	        final List<ChannelDescription<InputChannel>> i, final List<ChannelDescription<OutputChannel>> o,
	        final List<ChannelDescription<DataStore>> d, final Map<Instance<PlaceNode>, InputChannel> ii,
	        final Map<Instance<PlaceNode>, OutputChannel> oo, final Map<Instance<PlaceNode>, DataStore> dd,
	        final org.cpntools.accesscpn.model.Instance instance, final ArcInfo arcInfo, final ParameterAssignment pa,
	        final boolean reverse) {
		final PlaceNode socket = modelInstance.getPlace(pa.getParameter());
		final RefPlace port = (RefPlace) modelInstance.getPlace(pa.getValue());
		boolean isUsed = false;
		if (isInput(socket, port, instance, arcInfo)) {
			isUsed = true;
			final PipeChannel channel = new PipeChannel();
// System.out.println("addPlace input: " + socket + "; " + channel);
			i.add(new ChannelDescription<InputChannel>(socket.getName().getText(), modelData.getType(socket), channel));
			if (reverse) {
				ii.put(InstanceFactory.INSTANCE.createInstance(socket, transitionPath), channel);
			} else {
				oo.put(InstanceFactory.INSTANCE.createInstance(socket, transitionPath), channel);
			}
		}
		if (isOutput(socket, port, instance, arcInfo)) {
			assert !isUsed;
			isUsed = true;
			final PipeChannel channel = new PipeChannel();
// System.out.println("addPlace output: " + socket + "; " + channel);
			o.add(new ChannelDescription<OutputChannel>(socket.getName().getText(), modelData.getType(socket), channel));
			if (reverse) {
				oo.put(InstanceFactory.INSTANCE.createInstance(socket, transitionPath), channel);
			} else {
				ii.put(InstanceFactory.INSTANCE.createInstance(socket, transitionPath), channel);
			}
		}
		if (isData(socket, port, instance, arcInfo)) {
			assert !isUsed;
			isUsed = true;
			final DataStore channel = new DefaultDataStore();
// System.out.println("addPlace data: " + socket + "; " + channel);
			d.add(new ChannelDescription<DataStore>(socket.getName().getText(), modelData.getType(socket), channel));
			dd.put(InstanceFactory.INSTANCE.createInstance(socket, transitionPath), channel);
		}
		return isUsed;
	}

	private boolean empty(final List<?> list) {
		return list == null || list.isEmpty();
	}

	private boolean isData(final PlaceNode socket, final RefPlace port,
	        final org.cpntools.accesscpn.model.Instance instance, final ArcInfo arcInfo) {
		// Port must have arc from instance (including test), no other input and no output arcs and
		// no tests to instances other than instance unless corresponding port only has test arcs on
		// that level, also neither input not output
		if (!empty(arcInfo.getOutputs().get(socket))) { return false; }
		if (!empty(arcInfo.getInputs().get(socket))) {
			if (!size(arcInfo.getInputs().get(port), 1) && arcInfo.getInputs().get(port).get(0) == instance) { return false; }
		}
		if (!empty(arcInfo.getTests().get(socket))) {
			for (final Node n : arcInfo.getTests().get(socket)) {
				if (n instanceof org.cpntools.accesscpn.model.Instance && n != instance) {
					final org.cpntools.accesscpn.model.Instance i = (org.cpntools.accesscpn.model.Instance) n;
					for (final ParameterAssignment pa : i.getParameterAssignment()) {
						if (pa.getParameter().equals(socket.getId())) {
							final PlaceNode otherPort = modelInstance.getPlace(pa.getValue());
							if (!empty(arcInfo.getInputs().get(otherPort))
							        || !empty(arcInfo.getOutputs().get(otherPort))) { return false; }
						}
					}
				}
			}
		}
		if (!(size(arcInfo.getInputs().get(socket), 1) && arcInfo.getInputs().get(socket).get(0) == instance || !empty(arcInfo
		        .getTests().get(socket)) && arcInfo.getTests().get(socket).contains(instance))) { return false; }
		return !(isInput(socket, port, instance, arcInfo) || isOutput(socket, port, instance, arcInfo));
	}

	private boolean isInput(final PlaceNode socket, final RefPlace port,
	        final org.cpntools.accesscpn.model.Instance instance, final ArcInfo arcInfo) {
		// only arcs from port and only arc from socket must be to instance (test are treated as
		// both directions)
		return empty(arcInfo.getInputs().get(port)) && empty(arcInfo.getTests().get(port))
		        && empty(arcInfo.getTests().get(socket)) && size(arcInfo.getOutputs().get(socket), 1)
		        && arcInfo.getOutputs().get(socket).get(0) == instance;
	}

	private boolean isOutput(final PlaceNode socket, final RefPlace port,
	        final org.cpntools.accesscpn.model.Instance instance, final ArcInfo arcInfo) {
		// Only arcs to socket (test treated as both directions), instance must have arc to port
		// (not test), also is not input
		return empty(arcInfo.getOutputs().get(port)) && empty(arcInfo.getTests().get(port))
		        && !empty(arcInfo.getInputs().get(socket)) && arcInfo.getInputs().get(socket).contains(instance)
		        && !isInput(socket, port, instance, arcInfo);
	}

	private void removeChildTransitions(final List<Instance<Transition>> allTransitionInstances,
	        final Instance<Page> pageInstance) {
		for (final Transition t : pageInstance.getNode().transition()) {
			allTransitionInstances.remove(InstanceFactory.INSTANCE.createInstance(t, pageInstance.getTransitionPath()));
		}
		for (final org.cpntools.accesscpn.model.Instance i : pageInstance.getNode().instance()) {
			removeChildTransitions(allTransitionInstances, InstanceFactory.INSTANCE.createInstance(
			        modelData.getPage(i.getSubPageID()),
			        InstanceFactory.INSTANCE.createInstance(i, pageInstance.getTransitionPath())));
		}
	}

	private boolean size(final List<?> list, final int size) {
		if (size == 0) { return empty(list); }
		return list != null && list.size() == size;
	}

	/**
	 * @return
	 */
	public Collection<ChannelDescription<DataStore>> getData() {
		return dataPlaces;
	}

	/**
	 * @return
	 */
	public Collection<ChannelDescription<OutputChannel>> getInputs() {
		return outputPlaces;
	}

	/**
	 * @return
	 */
	public Collection<ChannelDescription<InputChannel>> getOutputs() {
		return inputPlaces;
	}

	/**
	 * @return
	 */
	public ExecutionContext getExecutionContext() {
		return context;
	}

}
