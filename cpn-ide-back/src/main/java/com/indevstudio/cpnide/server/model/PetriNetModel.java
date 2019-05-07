package com.indevstudio.cpnide.server.model;

import org.cpntools.accesscpn.engine.Simulator;
import org.cpntools.accesscpn.engine.SimulatorService;
import org.cpntools.accesscpn.engine.highlevel.HighLevelSimulator;
import org.cpntools.accesscpn.model.PetriNet;
import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;

@Component
public class PetriNetModel {
    private ConcurrentHashMap<String, PetriNet> usersNets = new ConcurrentHashMap<>();
    private   HighLevelSimulator sim ;
    public PetriNetModel(){
        try {
            SimulatorService ss = SimulatorService.getInstance();
            Simulator s = ss.getNewSimulator();
            sim = HighLevelSimulator.getHighLevelSimulator(s);
            //s = HighLevelSimulator.getHighLevelSimulator();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public PetriNet getPetriNet(String userSessionId) {
        return usersNets.get(userSessionId);
    }

    public void setPetriNet(String userSessionId,PetriNet petriNet) {
        usersNets.put(userSessionId, petriNet);
    }

    public HighLevelSimulator getHighLevelSimulator(){
        return  this.sim;
    }

}
