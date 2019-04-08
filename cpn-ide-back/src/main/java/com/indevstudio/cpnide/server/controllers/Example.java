package com.indevstudio.cpnide.server.controllers;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.LinkedList;
import java.util.List;

import org.cpntools.accesscpn.engine.Simulator;
import org.cpntools.accesscpn.engine.SimulatorService;
import org.cpntools.accesscpn.engine.highlevel.CheckerException;
import org.cpntools.accesscpn.engine.highlevel.DeclarationCheckerException;
import org.cpntools.accesscpn.engine.highlevel.HighLevelSimulator;
import org.cpntools.accesscpn.engine.highlevel.LocalCheckFailed;
import org.cpntools.accesscpn.engine.highlevel.SyntaxCheckerException;
import org.cpntools.accesscpn.engine.highlevel.checker.Checker;
import org.cpntools.accesscpn.engine.highlevel.checker.ErrorInitializingSMLInterface;
import org.cpntools.accesscpn.engine.highlevel.instance.Binding;
import org.cpntools.accesscpn.model.HLDeclaration;
import org.cpntools.accesscpn.model.PetriNet;
import org.cpntools.accesscpn.model.declaration.VariableDeclaration;
import org.cpntools.accesscpn.model.exporter.DOMGenerator;
import org.cpntools.accesscpn.model.util.BuildCPNUtil;

public class Example {

    private PetriNet net;
    private final BuildCPNUtil build;
    private HighLevelSimulator sim;

    public Example() throws Exception {
        build = new BuildCPNUtil();
    }

    public void loadModel(String fileName, String modelName) throws Exception {

        File file = new File("/home/awahtel/avahtel/cpnide/discret_model2.cpnide");
        FileInputStream in = new FileInputStream(file);
        try {
            net = org.cpntools.accesscpn.model.importer.DOMParser.parse(in, modelName);
        } catch (Exception e) {
            System.err.println("Could not parse model in " + file.getAbsolutePath());
            e.printStackTrace();
        }

        SimulatorService ss = SimulatorService.getInstance();
        Simulator s = ss.getNewSimulator();

        // sim = HighLevelSimulator.getHighLevelSimulator(s);
    }

    public void writeModel(String dir, String fileName, PetriNet net) {
        try {
            final OutputStream outputStream = new FileOutputStream(new File(dir, fileName));
            DOMGenerator.export(net, outputStream);
            outputStream.close();
        } catch (Exception e) {
            System.err.println("Could not write model in " + dir+"/"+fileName);
            e.printStackTrace();
        }
    }

    public void destroy() throws Exception {
        // sim.destroy();
    }

    /** Wrapper class for errors/warnings
     *
     * @author dfahland
     *
     */
    public static class ModelError {

        public static final int SEVERE = 0;
        public static final int WARNING = 1;

        public ModelError(Object modelEObject, String location, String error) {
            this(modelEObject, location, error, SEVERE);
        }

        public ModelError(Object modelEObject, String location, String error, int errorlevel) {
            this.modelObject = modelEObject;
            this.location = location;
            this.error = error;
            this.errorlevel = errorlevel;
        }

        public Object modelObject;
        public String location;
        public String error;
        public int errorlevel;
    }

    private List<ModelError> errors = new LinkedList<ModelError>();

    public void check() {

        try {
            Checker c = new Checker(net, null, sim);
            c.checkEntireModel();

            // can also check
            //c.checkDeclarations();
            //c.checkDeclaration(decl);
            //c.checkInitializing();
            //c.checkInitializing(modelPath, outputPath); -- relevant for writing simulation results to disk
            //c.checkMonitors();
            //c.checkPages();
            //c.checkPage(page, prime);

        } catch (SyntaxCheckerException e) {

            ModelError error = new ModelError(null, "CPN model",
                    "The generated CPN model contains errors; see console.");
            errors.add(error);

            e.printStackTrace();

        } catch (DeclarationCheckerException e) {

            ModelError error = new ModelError(null, "CPN model",
                    "The generated CPN model contains errors; see console.");
            errors.add(error);

        } catch (LocalCheckFailed e) {

            ModelError error = new ModelError(null, "CPN model",
                    "The generated CPN model contains errors; see console.");
            errors.add(error);

        } catch (CheckerException e) {

            ModelError error = new ModelError(null, "CPN model",
                    "The generated CPN model contains errors; see console.");
            errors.add(error);

        } catch (ErrorInitializingSMLInterface e) {
            // ignore this one: unclear why it is raised

            ModelError error = new ModelError(null, "CPN model",
                    "Could not initalize SML interface");
            errors.add(error);


        } catch (Exception e) {
            // to handle
        }

        // sim.setTarget((org.cpntools.accesscpn.model.impl.PetriNetImpl) net);
    }

    /**
     * Check if the give variable is already declared. If yes, return the type
     * of the declaration. If not, return {@code null}.
     *
     * @param varName
     * @return type of an existing declaration or {@code null} if not declared
     */
    private String isVariableDeclared(String varName) {
        for (HLDeclaration decl : net.declaration()) {
            if (decl.getStructure() != null && decl.getStructure() instanceof VariableDeclaration) {
                for (String varNames : ((VariableDeclaration) decl.getStructure()).getVariables()) {
                    if (varNames.equals(varName)) {
                        return ((VariableDeclaration) decl.getStructure()).getTypeName();
                    }
                }
            }
        }
        return null;
    }

    private void declareVariable(String name, String type) {
        if (isVariableDeclared(name) == null) {
            build.declareVariable(net, name, type);
        }
    }

    public List<Binding> enabledBindings() {

        List<Binding> bindings = new LinkedList<Binding>();

        try {

            //System.out.println("current marking: "+sim.getMarking().toString());

//            List<Instance<Transition>> tis = sim.getAllTransitionInstances();
//            for (Instance<Transition> ti : tis) {
//                if (sim.isEnabled(ti))
//                    bindings.addAll(sim.getBindings(ti));
//            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        //System.out.println(bindings);

        return bindings;
    }

    public void fire(Binding b) {
        try {

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) throws Exception {
//        String fileName = "./model/hoponhopoff-color.cpnide";
//        Example access = new Example();
//        access.loadModel(fileName, "myModel");
//        access.check();
//
//        List<Instance<PlaceNode>> places = access.sim.getAllPlaceInstances();
//        Instance<PlaceNode> p_move12 = null;
//        for (Instance<PlaceNode> p : places) {
//            if (p.getNode().getName().getText().equals("move12")) { p_move12 = p; break; }
//        }
//
//
//        System.out.println("\nInitial Marking\n"+access.sim.getMarking());
//        if (p_move12 != null) System.out.println("Marking of move12 is: \n"+access.sim.getMarking().getMarking(p_move12).getStructuredMarking());
//        Binding enabledBinding = access.enabledBindings().get(0);
//        System.out.println("\nPicked "+enabledBinding.getTransitionInstance());
//        access.sim.execute(enabledBinding);
//        System.out.println("Reached Marking\n"+access.sim.getMarking());
//        Marking m = access.sim.getMarking().getMarking(p_move12);
//        String tokens_on_m = m.getMarking();
//        int number_of_tokens = m.getTokenCount();
//        if (p_move12 != null)System.out.println("Marking of move12 is "+tokens_on_m+" ("+number_of_tokens+")");
//
//        System.out.println(access.sim.evaluate("1+1"));

//        access.writeModel("./model/", "hoponhopoff-color-reexport.cpnide", access.net);


    }
}
