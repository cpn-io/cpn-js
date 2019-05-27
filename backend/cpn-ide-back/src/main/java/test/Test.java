package test;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertEquals;


public class Test {
    /*@org.junit.Test
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
*/


    @org.junit.Test
   public void testConections() throws IOException, InterruptedException {
        String initCpn  = "http://localhost:8080/api/v2/cpn/init";
        String initSim = "http://localhost:8080/api/v2/cpn/sim/init";
        String sessionId = "232323";
        assertEquals(200, sendInitCpn(sessionId, initCpn ).getStatusCodeValue());
        TimeUnit.SECONDS.sleep(1);
        assertEquals(200, sendInitSimulator(sessionId, initSim ).getStatusCodeValue());
        while(true){
            assertEquals(200, sendInitCpn(sessionId, initCpn ).getStatusCodeValue());
            TimeUnit.SECONDS.sleep(1);
        }

    }


    public static ResponseEntity<Object> sendInitCpn(String sessionId, String initCpn) throws IOException {
        RestTemplate template = new RestTemplate();
        Map<String, String> bodyParamMap = new HashMap<String, String>();
        final String fileName = "/home/awahtel/avahtel/repo/cpn-ide/cpn-ide-front/src/assets/cpn/mynet.cpn";
        //Set your request body params
        String cpnFile = readFromFile(fileName);
        bodyParamMap.put("xml", cpnFile);


        HttpHeaders header = new HttpHeaders();
        header.setAccept(Arrays.asList(MediaType.ALL));
        header.setContentType(MediaType.APPLICATION_JSON);
        header.set("X-SessionId", sessionId);

        String reqBodyData = new ObjectMapper().writeValueAsString(bodyParamMap);

        HttpEntity<String> requestEnty = new HttpEntity<>(reqBodyData, header);

        ResponseEntity<Object> result = template.postForEntity(initCpn, requestEnty, Object.class);
        return result;
    }


public static ResponseEntity<Object> sendInitSimulator(String sessionId, String initSim){
    RestTemplate template = new RestTemplate();
    Map<String, String> bodyParamMap = new HashMap<String, String>();
    //final String fileName = "/home/awahtel/avahtel/repo/cpn-ide/cpn-ide-front/src/assets/cpn/mynet.cpn";
    //Set your request body params
    //String cpnFile = readFromFile(fileName);
   // bodyParamMap.put("xml", cpnFile);


    HttpHeaders header = new HttpHeaders();
    header.setAccept(Arrays.asList(MediaType.ALL));
    header.setContentType(MediaType.APPLICATION_JSON);
    header.set("X-SessionId", sessionId);
    HttpEntity entity = new HttpEntity(header);


    // String reqBodyData = new ObjectMapper().writeValueAsString(bodyParamMap);

    HttpEntity<String> requestEnty = new HttpEntity<>("{}", header);

    ResponseEntity<Object> result = template.exchange(initSim, HttpMethod.GET, requestEnty, Object.class);
    return result;
}

    public static String readFromFile(String fileName) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(fileName));
        StringBuilder stringBuilder = new StringBuilder();
        String line = null;
        String ls = System.getProperty("line.separator");
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
            stringBuilder.append(ls);
        }
        stringBuilder.deleteCharAt(stringBuilder.length() - 1);
        reader.close();

        String content = stringBuilder.toString();
        return content;
    }
}
