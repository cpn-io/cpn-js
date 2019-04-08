package test;

import org.cpntools.accesscpn.engine.Simulator;
import org.cpntools.accesscpn.engine.SimulatorService;
import org.cpntools.accesscpn.engine.highlevel.HighLevelSimulator;
import org.cpntools.accesscpn.engine.highlevel.checker.Checker;
import org.cpntools.accesscpn.engine.highlevel.instance.Instance;
import org.cpntools.accesscpn.model.*;
import org.cpntools.accesscpn.model.importer.DOMParser;

import java.io.ByteArrayInputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.List;

public class Test {
    public static void main(String[] args) throws Exception {
        System.out.println("Access/CPN test started!");

        String path = "/home/user/INDEV/development/denisov/cpnide-ide/cpnide-ide-front/src/assets/cpnide/";
        String filename = path + "discretemodel_task1.cpnide";

        byte[] bytes = Files.readAllBytes(Paths.get(filename));
        String xmlstr = new String(bytes, "utf-8");

        PetriNet petriNet = DOMParser.parse(new ByteArrayInputStream(bytes), filename);

        SimulatorService ss = SimulatorService.getInstance();
        Simulator s = ss.getNewSimulator();
//        final HighLevelSimulator simulator = HighLevelSimulator.getHighLevelSimulator(s);
        // final HighLevelSimulator simulator = HighLevelSimulator.getHighLevelSimulator();

        try {
//            final Checker checker = new Checker(petriNet, null, simulator);

//            System.out.print("localCheck()... ");
//            checker.localCheck();
//            System.out.println("success!");
//
//            System.out.print("checkInitializing()... ");
//            checker.checkInitializing();
//            System.out.println("success!");
////
//            System.out.print("checkDeclarations()... ");
//            checker.checkDeclarations();
//            System.out.println("success!");
//
//            System.out.print("generateSerializers()... ");
//            checker.generateSerializers();
//            System.out.println("success!");
//
//            System.out.print("checkPages()... ");
//            checker.checkPages();
//            System.out.println("success!");
//
//            System.out.print("generatePlaceInstances()... ");
//            checker.generatePlaceInstances();
//            System.out.println("success!");
//
//            System.out.print("checkMonitors()... ");
//            checker.checkMonitors();
//            System.out.println("success!");
//
//            System.out.print("generateNonPlaceInstances()... ");
//            checker.generateNonPlaceInstances();
//            System.out.println("success!");
//
//            System.out.print("initialiseSimulationScheduler()... ");
//            checker.initialiseSimulationScheduler();
//            System.out.println("success!");

//            List<Instance<PlaceNode>> places = simulator.getAllPlaceInstances();
////            Instance<PlaceNode> p_move12 = null;
//            for (Instance<PlaceNode> p : places) {
//                // if (p.getNode().getName().getText().equals("move12")) { p_move12 = p; break; }
//                p.getNode().getPage()
//                System.out.println("Place -> " + p.getNode().getName().getText());
//            }

            for (Page page: petriNet.getPage()) {
                System.out.println("---------------------------------------------");
                System.out.println("Page -> " + page.getName());
                System.out.println("Page ID -> " + page.getId());

                System.out.println("Port places: ");
                Iterator<RefPlace> refPlaceIterator = page.portPlace().iterator();
                while (refPlaceIterator.hasNext()) {
                    RefPlace refPlace = refPlaceIterator.next();
//                    System.out.println(refPlace + ", ref page = " + refPlace.getRef().getPage().getName());
                    System.out.println(refPlace);
                }
                // page.portPlace();
                System.out.println("Places: ");
                Iterator<Place> placeIterator = page.place().iterator();
                while (placeIterator.hasNext()) {
                    Place place = placeIterator.next();
                    System.out.println(place);


                    if (place.getReferences() != null && place.getReferences().size() > 0) {
                        System.out.println("Ref places");
                        for (RefPlace refPlace: place.getReferences()) {
                            System.out.println(refPlace);
                        }
                    }
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            System.out.println("Access/CPN test finished!");
//            simulator.destroy();
//            simulator.release();
        }
    }
}
