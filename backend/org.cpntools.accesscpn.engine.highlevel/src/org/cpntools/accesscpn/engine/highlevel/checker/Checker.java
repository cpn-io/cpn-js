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
package org.cpntools.accesscpn.engine.highlevel.checker;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Random;

import org.cpntools.accesscpn.engine.highlevel.CheckerException;
import org.cpntools.accesscpn.engine.highlevel.DeclarationCheckerException;
import org.cpntools.accesscpn.engine.highlevel.HighLevelSimulator;
import org.cpntools.accesscpn.engine.highlevel.LocalCheckFailed;
import org.cpntools.accesscpn.engine.highlevel.PageSorter;
import org.cpntools.accesscpn.engine.highlevel.SyntaxCheckerException;
import org.cpntools.accesscpn.model.FusionGroup;
import org.cpntools.accesscpn.model.HLDeclaration;
import org.cpntools.accesscpn.model.Instance;
import org.cpntools.accesscpn.model.Page;
import org.cpntools.accesscpn.model.PetriNet;
import org.cpntools.accesscpn.model.Place;
import org.cpntools.accesscpn.model.RefPlace;
import org.cpntools.accesscpn.model.Transition;
import org.cpntools.accesscpn.model.impl.PetriNetImpl;
import org.cpntools.accesscpn.model.monitors.Monitor;

/**
 * @author mw
 */
public class Checker {

    private final PetriNet petriNet;
    private final Random random = new Random();
    private final HighLevelSimulator s;
    private final File output;

    /**
     * @param petriNet           net to check
     * @param output             output directory; if null will be set to modelo directory
     * @param highLevelSimulator simulator to use for checking
     */
    public Checker(final PetriNet petriNet, final File output, final HighLevelSimulator highLevelSimulator) {
        this.petriNet = petriNet;
        this.output = output;
        s = highLevelSimulator;
        if (petriNet instanceof PetriNetImpl) {
            ((PetriNetImpl) petriNet).eAdapters().add(highLevelSimulator);
        }
    }

    /**
     * @param decl declaration to check
     * @throws DeclarationCheckerException exception is invalid
     * @throws IOException                 if an IO error occurred
     */
    public void checkDeclaration(final HLDeclaration decl) throws DeclarationCheckerException, IOException {
        s.checkDeclaration(decl);
    }

    /**
     * @throws DeclarationCheckerException one or more declarationa are invlaid
     * @throws IOException                 if an IO error occurred
     */
    public void checkDeclarations() throws DeclarationCheckerException, IOException {
        for (final HLDeclaration decl : petriNet.declaration()) {
            checkDeclaration(decl);
        }
    }

    /**
     * @throws Exception
     */
    public void generateSerializers() throws Exception {
        final ArrayList<HLDeclaration> declarations = new ArrayList<HLDeclaration>();
        for (final HLDeclaration declaration : petriNet.declaration()) {
            declarations.add(declaration);
        }
        final String serializerFunction = SerializerGenerator.getInstance().generate(declarations);
        s.evaluate(serializerFunction);
    }

    /**
     * @throws IOException if an IO error occurred
     * @throws Exception   could not initialise simulator
     */
    public void checkInitializing() throws IOException, Exception {
        // s.evaluate("val _ = CpnMLSys.GramError.debugState:= true;");
        checkInitializing("", "");
    }

    public void checkInitializing(String modelPath, String outputPath) throws Exception {
        if (outputPath != null && !"".equals(outputPath)) {
            new File(outputPath).mkdirs();
        }
        s.initialize(petriNet.getTimeType());
        evaluate("CPN\'Settings.use_manbind := true"); //$NON-NLS-1$

        s.initializeSyntaxCheck();
        s.setSimulationOptions(false, false, false, true, true, false, false, "", "", "", "", "", "", false, false);
        s.setInitializationSimulationOptions(false, false, random.nextInt() / 2);

        s.setSimulationOptions(false, false, false, true, true, false, false, "", "", "", "", "", "", true, true);
        try {
            if (modelPath.matches("^([A-Za-z]):\\\\(.*)")) {
                modelPath = modelPath.replaceFirst("^([A-Za-z]):\\\\(.*)", "/cygdrive/$1/$2").replace('\\', '/');
            }
            if (outputPath.matches("^([A-Za-z]):\\\\(.*)")) {
                outputPath = outputPath.replaceFirst("^([A-Za-z]):\\\\(.*)", "/cygdrive/$1/$2").replace('\\', '/');
            }
            s.setModelNameModelDirOutputDir(petriNet.getName().getText(), modelPath, outputPath);
        } catch (final Exception e) {
            e.printStackTrace();
            throw new Exception("Setting of model directory and/or output directory failed: " + e, e);
        }
    }

    /**
     * @param page  page to check
     * @param prime whether the page is prime
     * @throws IOException      if an IO error occurred
     * @throws CheckerException if the page is inavlid
     */
    public void checkPage(final Page page, final boolean prime) throws IOException, CheckerException {
        s.checkPage(page, prime);
    }

    /**
     * @throws IOException      if an IO error occurred
     * @throws CheckerException if one or more pages are invalid
     */
    public void checkPages() throws IOException, CheckerException {
        final PageSorter ps = new PageSorter(petriNet.getPage());
        for (final Page page : ps) {
            checkPage(page, ps.isPrime(page));
        }
    }

    public void checkEntireModel() throws Exception {
        checkEntireModel("", "");
    }

    /**
     * Check the entire model. This may take a LONG time for large models, and interactive tools should instead do
     * checks incrementally showing feedback to the user.
     *
     * @throws Exception
     */
    public void checkEntireModel(final String modelPath, final String outputPath) throws Exception {
        localCheck();
        checkInitializing(modelPath, outputPath);
        checkDeclarations();
        generateSerializers();
        checkPages();
        generatePlaceInstances();
        checkMonitors();
        generateNonPlaceInstances();
        initialiseSimulationScheduler();
        instantiateSMLInterface();
    }

    /**
     * @param b
     * @throws SyntaxCheckerException
     * @throws IOException
     */
    public void checkMonitors() throws SyntaxCheckerException, IOException {
        s.setPerformanceReportOptions(true, false, true, false, false, true, true, false, false, false, false, false,
                false, false, false, true, false, true, false, false, true, true, false, false, false, true, false);
        s.setReplicationReportOptions(true, true, false, false, false, true, true, false, false, false, false, false);
        s.setMonitorOrder(petriNet.getMonitors());
        for (final Monitor m : petriNet.getMonitors()) {
            s.checkMonitor(m);
        }

    }

    public void checkMonitor(final Monitor m) throws SyntaxCheckerException, IOException {
        s.checkMonitor(m);
    }

    /**
     * @param id id of fusion group
     * @throws IOException if an IO error occurred
     */
    public void generateInstanceForFusionGroup(final String id) throws IOException {
        s.generateInstanceForFusionGroup(id);
    }

    /**
     * @param id id of place
     * @throws IOException if an IO error occurred
     */
    public void generateInstanceForPlace(final String id) throws IOException {
        s.generateInstanceForPlace(id);
    }

    /**
     * @param id id of transition
     * @throws IOException if an IO error occurred
     */
    public void generateInstanceForTransition(final String id) throws IOException {
        s.generateInstanceForTransition(id);
    }

    /**
     * @throws IOException if an IO error occurred
     */
    public void generatePlaceInstances() throws IOException {
        for (final FusionGroup fusionGroup : petriNet.getFusionGroups()) {
            generateInstanceForFusionGroup(fusionGroup.getId());
        }

        for (final Page page : petriNet.getPage()) {
            for (final RefPlace refPlace : page.readyFusionGroups()) {
                generateInstanceForPlace(refPlace.getId());
            }

            for (final RefPlace refPlace : page.readyPortPlaces()) {
                generateInstanceForPlace(refPlace.getId());
            }

            for (final Place place : page.readyPlaces()) {
                generateInstanceForPlace(place.getId());
            }
        }
    }

    /**
     * @throws IOException
     * @deprecated use #generatePlaceInstances and #generateNonPlaceInstances instead (so you can generate monitors
     * inbetween)
     */
    @Deprecated
    public void generateInstances() throws IOException {
        generatePlaceInstances();
        generateNonPlaceInstances();
    }

    public void generateNonPlaceInstances() throws IOException {
        for (final Page page : petriNet.getPage()) {
            for (final Transition transition : page.readyTransitions()) {
                generateInstanceForTransition(transition.getId());
            }

            for (final Instance instance : page.instance()) {
                generateInstanceForTransition(instance.getId());
            }
        }

        initialiseSimulationScheduler();
    }

    /**
     * @throws IOException if an IO error occurred
     */
    public void initialiseSimulationScheduler() throws IOException {
        s.initialiseSimulationScheduler();
    }

    /**
     * @param code
     * @return
     * @throws EvaluationException
     */
    public String evaluate(final String code) throws EvaluationException {
        try {
            return s.evaluate(code);
        } catch (final Exception e) {
            throw new EvaluationException(code, e.getMessage());
        }
    }

    /**
     * @param generator
     * @return
     * @throws EvaluationException
     */
    public String use(final String generator) throws EvaluationException {
        try {
            final String code = evaluate("print(String.concat(" + generator + "))");
            System.out.println(code);
            return evaluate("CPN'Env.use_string(" + generator + ")");
        } catch (final EvaluationException e) {
            final String code = evaluate("print(String.concat(" + generator + "))");
            throw new UseException(code, e.getMessage());
        }
    }

    /**
     * @throws ErrorInitializingSMLInterface if the SML interface could not be initialized
     */
    public void instantiateSMLInterface() throws ErrorInitializingSMLInterface {
        try {
            s.lock();
            evaluate("structure CPN'NetCapture = CPN'NetCapture(structure CPN'InstTable = CPN'InstTable)");
            evaluate("CPN'NetCapture.initNet ()");
            evaluate("CPN'NetCapture.checkNames()");
            evaluate("structure CPN'State = CPN'State(structure CPN'NetCapture = CPN'NetCapture)");
            use("CPN'State.genMark(CPN'NetCapture.getNet())");
            use("CPN'State.genState(CPN'NetCapture.getNet())");
            evaluate("structure CPN'Event = CPN'Event(structure CPN'NetCapture = CPN'NetCapture)");
            use("CPN'Event.genBind(CPN'NetCapture.getNet())");
            use("CPN'Event.genEvent(CPN'NetCapture.getNet())");
            evaluate("structure CPNToolsModel = CPNToolsModel(structure CPNToolsState = CPNToolsState structure CPNToolsEvent = CPNToolsEvent)");
            evaluate("structure CPN'HashFunction = CPN'HashFunction(structure CPN'NetCapture = CPN'NetCapture)");
            use("CPN'HashFunction.genHashFunction(CPN'NetCapture.getNet())");
            evaluate("structure CPN'Order = CPN'Order(structure CPN'NetCapture = CPN'NetCapture)");
            use("CPN'Order.genStateOrder(CPN'NetCapture.getNet())");
            evaluate("structure CPN'PackCommon = CPN'PackCommon(structure JavaExecute = JavaExecute)");
            evaluate("structure CPN'PackFunction = CPN'PackFunction(structure CPN'NetCapture = CPN'NetCapture)");
            use("CPN'PackFunction.genPackerFunction(CPN'NetCapture.getNet())");
            try {
                evaluate("structure CPN'Serializer = CPN'Serializer(structure CPN'NetCapture = CPN'NetCapture)");
                use("CPN'Serializer.genSerializer(CPN'NetCapture.getNet())");
            } catch (final EvaluationException e) {
                // We don't really use the serializer anyways, and it fails in simple cases
            }
        } catch (final EvaluationException e) {
            throw new ErrorInitializingSMLInterface(e);
        } finally {
            s.release();
        }
    }

    /**
     * @throws LocalCheckFailed
     */
    public void localCheck() throws LocalCheckFailed {
        LocalChecker.getInstance().check(petriNet);
    }

}
