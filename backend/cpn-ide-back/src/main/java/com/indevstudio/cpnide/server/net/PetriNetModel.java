package com.indevstudio.cpnide.server.net;

import lombok.extern.slf4j.Slf4j;
import org.cpntools.accesscpn.engine.Simulator;
import org.cpntools.accesscpn.engine.SimulatorService;
import org.cpntools.accesscpn.engine.highlevel.HighLevelSimulator;
import org.cpntools.accesscpn.engine.highlevel.LocalCheckFailed;
import org.cpntools.accesscpn.engine.highlevel.Util;
import org.cpntools.accesscpn.engine.highlevel.checker.Checker;
import org.cpntools.accesscpn.model.*;
import org.cpntools.accesscpn.model.Object;
import org.springframework.stereotype.Component;

import java.util.Iterator;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Slf4j
public class PetriNetModel {
    private ConcurrentHashMap<String, PetriNet> usersNets = new ConcurrentHashMap<>();
    private   HighLevelSimulator sim ;

    public PetriNetModel(){
        try {
            SimulatorService ss = SimulatorService.getInstance();
            Simulator s = ss.getNewSimulator();
            sim = HighLevelSimulator.getHighLevelSimulator(s);
        } catch (Exception e) {
           log.error("Failed to create Simulator: " , e);
        }
    }

    public boolean isContain(String userId) {
       return usersNets.containsKey(userId);
    }

    public PetriNet getPetriNet(String userSessionId) {
        return usersNets.get(userSessionId);
    }

    public void initializePetriNet(String userSessionId,PetriNet petriNet) {
        usersNets.clear();
        usersNets.put(userSessionId, petriNet);
    }

    public void PerformValidation(PetriNet petriNet) throws Exception
    {
        final Checker checker = new Checker(petriNet, null, sim);
        check(petriNet);
        checker.localCheck();
        checker.checkInitializing();
        checker.checkDeclarations();
        checker.generateSerializers();
        checker.checkPages();
        checker.checkMonitors();
        checker.generatePlaceInstances();
        checker.generateNonPlaceInstances();
        checker.initialiseSimulationScheduler();
        // checker.instantiateSMLInterface();
    }


    public void setPetriNet(String userSessionId,PetriNet petriNet) {
        usersNets.put(userSessionId, petriNet);
    }


    public HighLevelSimulator getHighLevelSimulator(){
        return  this.sim;
    }


    private static final ModelFactory factory = ModelFactory.INSTANCE;


    public void check(PetriNet petriNet) throws LocalCheckFailed {
        Iterator var3 = petriNet.getPage().iterator();

        while (var3.hasNext()) {
            Page page = (Page) var3.next();
            this.checkPage(page);
        }

    }

    private void checkPage(Page page) throws LocalCheckFailed {
        this.checkAllNames(page);
    }


    public static String getName(HasName object) {
        String name = object.getName().getText();
        if (name == null) {
            return "";
        } else {
            name = Util.mlEscape(name);
            name = name.replaceFirst("[^\\p{Alnum}'_].*", "");
            return !name.matches("^[\\p{Alpha}].*") ? "" : name;
        }
    }

    private void checkAllNames(Page page) throws LocalCheckFailed {
        if ("".equals(getName(page))) {
            throw new LocalCheckFailed(page.getId(), "Page has no or illegal name (name is `" + page.getName().getText() + "')");
        } else {
            Iterator var3 = page.getObject().iterator();

            while (var3.hasNext()) {
                Object object = (Object) var3.next();
                if (object.getName() == null) {
                    Name tempName = factory.createName();
                    tempName.setText(object.getId());
                    object.setName(tempName);
                }
            }

        }
    }

    public void checkEntireModel(final PetriNet net, final HighLevelSimulator sim) throws Exception {
        Checker c = new Checker(net, null, sim);
        c.checkEntireModel();
    }


}
