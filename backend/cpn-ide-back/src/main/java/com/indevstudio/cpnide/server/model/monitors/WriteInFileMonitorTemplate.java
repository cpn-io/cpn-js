package com.indevstudio.cpnide.server.model.monitors;

import org.cpntools.accesscpn.engine.highlevel.HighLevelSimulator;
import org.cpntools.accesscpn.model.Node;
import org.cpntools.accesscpn.model.PetriNet;

import java.util.Collection;

public class WriteInFileMonitorTemplate implements MonitorTemplate {
    @Override
    public String defaultPredicate(HighLevelSimulator sim, PetriNet net, Collection<Node> selectedNodes) {
        return "fun pred (bindelem) =\nlet\n  fun predBindElem (PAGE'ELEMENT (1, {its,oid,s})) = (length its = 1)\n"
                + "      | predBindElem _ = false\nin\n  predBindElem bindelem\nend";
    }

    @Override
    public String defaultObserver(HighLevelSimulator sim, PetriNet net, Collection<Node> selectedNodes) {
        return "fun obs (bindelem) =\nlet\n"
                + "  fun obsBindElem (PAGE'ELEMENT (1, {its,oid,s})) = time()-Option.valOf(ModelTime.fromString s)\n"
                + "      | obsBindElem _ = 0.0\nin\n  obsBindElem bindelem\nend";
    }

    @Override
    public boolean defaultTimed(HighLevelSimulator sim, PetriNet net, Collection<Node> selectedNodes) {
        return false;
    }

    @Override
    public String defaultInit(HighLevelSimulator sim, PetriNet net, Collection<Node> selectedNodes) {
        return "fun init () =\n  NONE";
    }

    @Override
    public String defaultStop(HighLevelSimulator sim, PetriNet net, Collection<Node> selectedNodes) {
        return "fun stop () =\\n  NONEд";
    }
}
