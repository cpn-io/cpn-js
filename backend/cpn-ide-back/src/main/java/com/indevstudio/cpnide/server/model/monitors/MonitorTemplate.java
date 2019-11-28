package com.indevstudio.cpnide.server.model.monitors;

import org.cpntools.accesscpn.engine.highlevel.HighLevelSimulator;
import org.cpntools.accesscpn.model.Node;
import org.cpntools.accesscpn.model.PetriNet;

import java.util.Collection;

public interface MonitorTemplate {
    String defaultPredicate(HighLevelSimulator sim, PetriNet net, Collection<Node> selectedNodes);

    String defaultObserver(HighLevelSimulator sim, PetriNet net, Collection<Node> selectedNodes);

    boolean defaultTimed(HighLevelSimulator sim, PetriNet net, Collection<Node> selectedNodes);

    String defaultInit(HighLevelSimulator sim, PetriNet net, Collection<Node> selectedNodes);

    String defaultStop(HighLevelSimulator sim, PetriNet net, Collection<Node> selectedNodes);
}
