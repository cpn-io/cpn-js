package com.indevstudio.cpnide.server.controllers;

//import org.apache.log4j.Logger;

import com.indevstudio.cpnide.server.model.PetriNetModel;
import org.cpntools.accesscpn.engine.highlevel.HighLevelSimulator;
import org.cpntools.accesscpn.engine.highlevel.LocalCheckFailed;
import org.cpntools.accesscpn.engine.highlevel.Util;
import org.cpntools.accesscpn.engine.highlevel.checker.Checker;
import org.cpntools.accesscpn.model.*;
import org.cpntools.accesscpn.model.Object;
import org.cpntools.accesscpn.model.importer.DOMParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RequestMapping("/api/cpn")
@SessionAttributes("petriNetModel")
@RestController
public class CpnController {

   // private static final Logger log = Logger.getLogger(CpnController.class);
    //private  PetriNet petriNet = null;
    @Autowired
    PetriNetModel petriNetModel;

    private static final ModelFactory factory = ModelFactory.INSTANCE;;

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
            if(requestBody.get(0).containsKey("xml")) {
                String jsonstr = requestBody.get(0).get("xml").toString();
                String sessionId = requestBody.get(0).get("sessionId").toString();
                petriNetModel.setPetriNet(sessionId ,DOMParser.parse(new ByteArrayInputStream(jsonstr.getBytes(StandardCharsets.UTF_8)), "myNet.cpnide"));
               // petriNetModel.setPetriNet(sessionId ,DOMParser.parse(new URL("file://" + fileName)));

                // final PetriNet petriNet = DOMParser.parse(new URL("file://" + fileName));
                //String.format("Changed markets: %s; new markets: %s", "sdsdsdsds","seeefe");
                //  String ev = null;
                final HighLevelSimulator s = petriNetModel.getHighLevelSimulator();
                final Checker checker = new Checker(petriNetModel.getPetriNet(sessionId), null, s);
                check(petriNetModel.getPetriNet(sessionId));
                checker.localCheck();
                checker.checkInitializing();
                checker.checkDeclarations();
              //  checker.generateSerializers();
                checker.checkPages();
               // checker.generatePlaceInstances();
                checker.checkMonitors();
                //checker.generateNonPlaceInstances();
                checker.initialiseSimulationScheduler();
               // checker.instantiateSMLInterface();

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

        }
        catch(Exception e){
            System.out.println(e.getMessage());
            message = e.getMessage();


        }
        result = new ResponseEntity<>(message, HttpStatus.OK);
        return result;
    }



    public void check(PetriNet petriNet) throws LocalCheckFailed {
        Iterator var3 = petriNet.getPage().iterator();

        while(var3.hasNext()) {
            Page page = (Page)var3.next();
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

            while(var3.hasNext()) {
                Object object = (Object)var3.next();
                if ( object.getName() == null) {
                    Name tempName = factory.createName();
                    tempName.setText(object.getId());
                    object.setName(tempName);
                }
            }

        }
    }


}
