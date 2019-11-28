package com.indevstudio.cpnide.server.model.monitors;

import org.cpntools.accesscpn.engine.highlevel.HighLevelSimulator;
import org.cpntools.accesscpn.model.Node;
import org.cpntools.accesscpn.model.PetriNet;

import java.util.Collection;

public class MarkingSizeMonitorTemplate implements MonitorTemplate {
    @Override
    public String defaultPredicate(HighLevelSimulator sim, PetriNet net, Collection<Node> selectedNodes) {
        return "";
    }

    @Override
    public String defaultObserver(HighLevelSimulator sim, PetriNet net, Collection<Node> selectedNodes) {
        return "";
    }

    @Override
    public boolean defaultTimed(HighLevelSimulator sim, PetriNet net, Collection<Node> selectedNodes) {
        return false;
    }

    @Override
    public String defaultInit(HighLevelSimulator sim, PetriNet net, Collection<Node> selectedNodes) {
        return "";
    }

    @Override
    public String defaultStop(HighLevelSimulator sim, PetriNet net, Collection<Node> selectedNodes) {
        return "";
    }
}
