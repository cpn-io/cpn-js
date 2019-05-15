package com.indevstudio.cpnide.server.controllers;

//import org.apache.log4j.Logger;

import com.indevstudio.cpnide.server.model.PetriNetModel;
import org.cpntools.accesscpn.engine.highlevel.HighLevelSimulator;
import org.cpntools.accesscpn.engine.highlevel.LocalCheckFailed;
import org.cpntools.accesscpn.engine.highlevel.Util;
import org.cpntools.accesscpn.engine.highlevel.checker.Checker;
import org.cpntools.accesscpn.engine.highlevel.instance.Binding;
import org.cpntools.accesscpn.engine.highlevel.instance.Instance;
import org.cpntools.accesscpn.model.*;
import org.cpntools.accesscpn.model.Object;
import org.cpntools.accesscpn.model.importer.DOMParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.cpntools.accesscpn.engine.highlevel.instance.State;

import javax.servlet.http.HttpServletRequest;
import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;
import java.util.*;

@CrossOrigin(origins = "*")
@RequestMapping("/api/cpn")
@SessionAttributes("petriNetModel")
@RestController
public class CpnController {


    class Json {
        String id;
        String marking;
        String tokens;

        Json(String id, String marking, String tokens) {
            this.id = id;
            this.marking = marking;
            this.tokens = tokens;
        }

        Json() {
            this.id = "";
            this.marking = "";
            this.tokens = "";
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getMarking() {
            return marking;
        }

        public void setMarking(String marking) {
            this.marking = marking;
        }

        public String getTokens() {
            return tokens;
        }

        public void setTokens(String tokens) {
            this.tokens = tokens;
        }
    }

    // private static final Logger log = Logger.getLogger(CpnController.class);
    //private  PetriNet petriNet = null;
    @Autowired
    PetriNetModel petriNetModel;


    @PostMapping(value = "/verifi")
    public ResponseEntity<java.lang.Object> verifiPetriNet(
            @RequestBody List<Map> requestBody,
            HttpServletRequest request) throws RuntimeException {
        //final String fileName = "/home/awahtel/eclipse-workspace/org.cpntools.accesscpn.model.tests/resources/models/erdp.cpnide";
        //  final String fileName = "/home/awahtel/avahtel/cpnide/hoponhopoff-color.cpnide";
        final String fileName = "/home/awahtel/avahtel/cpnide/discret_model2.cpnide";
        //  log.info(String.format("saveMarket() - POST request %s, ", request.getRequestURI()));
        //  log.debug(String.format("saveMarket() - POST %s, body = %s, ", request.getRequestURI(), requestBody.get(0)));
        ResponseEntity<java.lang.Object> result = null;
        String message = null;
        try {
            if (requestBody.get(0).containsKey("xml")) {
                String jsonstr = requestBody.get(0).get("xml").toString();
                String sessionId = requestBody.get(0).get("sessionId").toString();
                System.out.println("new SESSION ID ------- " + sessionId );
                if(! petriNetModel.isContain(sessionId)) petriNetModel.initializePetriNet(sessionId, DOMParser.parse(new ByteArrayInputStream(jsonstr.getBytes(StandardCharsets.UTF_8)), "myNet.cpnide"));
                 else petriNetModel.setPetriNet(sessionId, DOMParser.parse(new ByteArrayInputStream(jsonstr.getBytes(StandardCharsets.UTF_8)), "myNet.cpnide"));
                // petriNetModel.setPetriNet(sessionId ,DOMParser.parse(new URL("file://" + fileName)));

                // final PetriNet petriNet = DOMParser.parse(new URL("file://" + fileName));
                //String.format("Changed markets: %s; new markets: %s", "sdsdsdsds","seeefe");
                //  String ev = null;
                final HighLevelSimulator s = petriNetModel.getHighLevelSimulator();

                //testMarrking(sessionId, s);
             //   checkEntireModel(petriNetModel.getPetriNet(sessionId), s);
                final Checker checker = new Checker(petriNetModel.getPetriNet(sessionId), null, s);
                petriNetModel.check(petriNetModel.getPetriNet(sessionId));
                checker.localCheck();
               // checker.checkInitializing();
                checker.checkDeclarations();
              //  checker.generateSerializers();
                checker.checkPages();
               // checker.generatePlaceInstances();
                checker.checkMonitors();
                //checker.generateNonPlaceInstances();
               // checker.initialiseSimulationScheduler();
                //checker.instantiateSMLInterface();

//                checker.checkEntireModel();
            } else {
                //petriNetModel.setPetriNet(DOMParser.parse(new URL("file://" + fileName)));
                String sessionId = requestBody.get(0).get("sessionId").toString();
                String jsonstr = requestBody.get(0).get("sml").toString();
                final HighLevelSimulator s = petriNetModel.getHighLevelSimulator();
                final Checker checker = new Checker(petriNetModel.getPetriNet(sessionId), null, s);
                // checker.checkEntireModel();
                checker.localCheck();
                checker.checkInitializing();
                checker.checkDeclarations();
                checker.generateSerializers();
                checker.checkPages();
                checker.generatePlaceInstances();
                checker.checkMonitors();
                checker.generateNonPlaceInstances();
                checker.initialiseSimulationScheduler();
                s.evaluate(jsonstr);

            }
            //   message = s.evaluate(switchContent);

        } catch (Exception e) {
            //System.out.println(e.getMessage());
            message = e.getMessage();


        }
        result = new ResponseEntity<>(message, HttpStatus.OK);
        return result;
    }


    @PostMapping(value = "/step")
    public ResponseEntity<java.lang.Object> makeStep(
            @RequestBody List<Map> requestBody,
            HttpServletRequest request) throws RuntimeException {
        ResponseEntity<java.lang.Object> result = null;
        //String type = requestBody.get(0).get("type").toString();
        try {
            String id = requestBody.get(0).get("id").toString();
            String sessionId = requestBody.get(0).get("sessionId").toString();
            final HighLevelSimulator s = petriNetModel.getHighLevelSimulator();
            // final Checker checker = new Checker(petriNetModel.getPetriNet(sessionId), null, s);
            List<Binding> bindings = new LinkedList<Binding>();
            List<Instance<Transition>> tis = s.getAllTransitionInstances();
            for (Instance<Transition> ti : tis) {
                if (ti.getNode().getId().equals(id) && s.isEnabled(ti))
                    bindings.addAll(s.getBindings(ti));
            }
            //for(Binding b : bindings) {
            // s.execute(b);
            //  }
            s.execute(bindings.get(0));
            List<Instance<PlaceNode>> places = s.getAllPlaceInstances();
            int i = 0;


            Json arr[] = new Json[places.size()];
            for (Instance<PlaceNode> p : places) {
                arr[i] = new Json(p.getNode().getId(), s.getMarking(p), String.valueOf(s.getTokens(p)));
                i++;
            }
            result = new ResponseEntity<>(arr, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            result = new ResponseEntity<>(e.getMessage(), HttpStatus.OK);
        }
        return result;
    }


    @PostMapping(value = "/marking")
    public ResponseEntity<java.lang.Object> getMarkinById(
            @RequestBody List<Map> requestBody,
            HttpServletRequest request) throws RuntimeException {
        ResponseEntity<java.lang.Object> result = null;
        //String type = requestBody.get(0).get("type").toString();
        try {
            String id = requestBody.get(0).get("id").toString();
            String sessionId = requestBody.get(0).get("sessionId").toString();
            final HighLevelSimulator s = petriNetModel.getHighLevelSimulator();

            final Checker checker = new Checker(petriNetModel.getPetriNet(sessionId), null, s);
            s.setTarget((org.cpntools.accesscpn.model.impl.PetriNetImpl) petriNetModel.getPetriNet(sessionId));

            List<Instance<PlaceNode>> places = s.getAllPlaceInstances();
            Instance<PlaceNode> placeNode = null;

            ArrayList<Json> arr = new ArrayList<>();
            // Json arr[] = new Json[id.trim().equals("") ? places.size() : 1];
            // int i = 0;
            for (Instance<PlaceNode> p : places) {
                if (id.trim().equals("") || p.getNode().getId().equals(id)) {
                    placeNode = p;

                    try {
                        int tokens = s.getTokens(p);
                        String marking = s.getMarking(p);
                        arr.add(new Json(p.getNode().getId(), s.getMarking(p), String.valueOf(tokens)));

                        // arr[i] = new Json(p.getNode().getId(), s.getMarking(p), String.valueOf(tokens));
                    } catch (Exception ex) {
                        ex.printStackTrace();
                    }

                    if (!id.trim().equals(""))
                        break;
                    // i++;
                }
            }

            result = new ResponseEntity<>(arr, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            result = new ResponseEntity<>(e.getMessage(), HttpStatus.OK);
        }
        return result;
    }


    @PostMapping(value = "/enable")
    public ResponseEntity<java.lang.Object> getEnableTransitions(
            @RequestBody List<Map> requestBody,
            HttpServletRequest request) throws RuntimeException {
        ResponseEntity<java.lang.Object> result = null;
        //String type = requestBody.get(0).get("type").toString();
        try {
            //String id = requestBody.get(0).get("id").toString();
            String sessionId = requestBody.get(0).get("sessionId").toString();
            final HighLevelSimulator s = petriNetModel.getHighLevelSimulator();
            final Checker checker = new Checker(petriNetModel.getPetriNet(sessionId), null, s);
//            checker.localCheck();
//            checker.checkInitializing();
//            checker.checkDeclarations();
//            checker.generateSerializers();
//            checker.checkPages();
//            checker.generatePlaceInstances();
//            checker.checkMonitors();
//            checker.generateNonPlaceInstances();
//            checker.initialiseSimulationScheduler();
            //checker.instantiateSMLInterface();
            //s.setTarget((org.cpntools.accesscpn.model.impl.PetriNetImpl)petriNetModel.getPetriNet(sessionId));
           // petriNetModel.checkEntireModel(petriNetModel.getPetriNet(sessionId), s);
            //List<Binding> bindings = new LinkedList<Binding>();
            List<Instance<Transition>> tis = s.getAllTransitionInstances();
            ArrayList<String> arr = new ArrayList<>();

            for (Instance<Transition> ti : tis) {
                try {
                    if (s.isEnabled(ti))
                        arr.add(ti.getNode().getId());
                } catch(Exception e){

                }
            }
            result = new ResponseEntity<>(arr, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            result = new ResponseEntity<>(e.getMessage(), HttpStatus.OK);
        }
        return result;
    }



    public void testMarrking(String sessionId, HighLevelSimulator s) throws Exception {
        // s.setTarget((org.cpntools.accesscpn.model.impl.PetriNetImpl) petriNetModel.getPetriNet(sessionId));
        petriNetModel.checkEntireModel(petriNetModel.getPetriNet(sessionId), s);
        List<Instance<PlaceNode>> instanses = s.getAllPlaceInstances();

        for (Instance<PlaceNode> node : instanses) {
            int tok = s.getTokens(node);
            State st = s.getMarking();
            String mark = s.getMarking(node);
            System.out.println("dfdfd" + tok + " " + st + " " + mark);

        }
    }


}
