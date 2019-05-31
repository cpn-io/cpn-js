package com.indevstudio.cpnide.server.net;

import com.indevstudio.cpnide.server.model.IssueDescription;
import com.indevstudio.cpnide.server.model.PlaceMark;
import javassist.NotFoundException;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.cpntools.accesscpn.engine.SimulatorService;
import org.cpntools.accesscpn.engine.highlevel.*;
import org.cpntools.accesscpn.engine.highlevel.checker.Checker;
import org.cpntools.accesscpn.engine.highlevel.instance.Binding;
import org.cpntools.accesscpn.engine.highlevel.instance.Instance;
import org.cpntools.accesscpn.model.*;
import org.cpntools.accesscpn.model.exporter.DOMGenerator;
import org.cpntools.accesscpn.model.importer.DOMParser;
import org.cpntools.accesscpn.model.monitors.Monitor;
import org.springframework.stereotype.Component;
import org.w3c.dom.Document;

import javax.annotation.PostConstruct;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.*;
import java.lang.Object;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutionException;

@Component
@Slf4j
public class PetriNetContainer {
    public static  class NetInfo {
        List<String> enableTrans;
        List<PlaceMark> tokensAndMark;

        public List<String> getEnableTrans() {
            return enableTrans;
        }

        public void setEnableTrans(List<String> enableTrans) {
            this.enableTrans = enableTrans;
        }

        public List<PlaceMark> getTokensAndMark() {
            return tokensAndMark;
        }

        public void setTokensAndMark(List<PlaceMark> tokensAndMark) {
            this.tokensAndMark = tokensAndMark;
        }

        public NetInfo(List<String> enableTrans, List<PlaceMark> tokensAndMark) {
            this.enableTrans = enableTrans;
            this.tokensAndMark = tokensAndMark;
        }
    }
    private ConcurrentHashMap<String, PetriNet> usersNets = new ConcurrentHashMap<>();
    private ConcurrentHashMap<String, Checker> usersCheckers = new ConcurrentHashMap<>();
    private ConcurrentHashMap<String, HighLevelSimulator> usersSimulator = new ConcurrentHashMap<>();
    private ConcurrentHashMap<String, NetInfo> netInf = new ConcurrentHashMap<>();
    private final static Object lock = new Object();
      public void CreateNewNet(String sessionId, String xml) throws Exception {
        synchronized (lock)        {
            PetriNet net = DOMParser.parse(new ByteArrayInputStream(xml.getBytes(StandardCharsets.UTF_8)), sessionId);
            usersNets.put(sessionId, net);
//
            HighLevelSimulator sim = usersSimulator.get(sessionId);
            if (sim == null)
                sim = HighLevelSimulator.getHighLevelSimulator(SimulatorService.getInstance().getNewSimulator());

            Checker checker = new Checker(net, null, sim);
            usersCheckers.put(sessionId, checker);
            usersSimulator.put(sessionId, sim);
            checker.checkInitializing();
        }
    }

    List<IssueDescription> getOrCreateIssueList(String id, Map<String, List<IssueDescription>> issues) {
        List<IssueDescription> issList = issues.get(id);
        if (issList == null) {
            issList = new ArrayList<>();
            issues.put(id, issList);
        }

        return issList;
    }


    public String exportNetToXml(String sessionId) throws Exception {
        synchronized (lock)        {
            PetriNet net = usersNets.get(sessionId);
            if (net == null)
                throw new NotFoundException("Session object not found");

            Document xmlDoc = DOMGenerator.export(net);
            TransformerFactory tf = TransformerFactory.newInstance();
            Transformer transformer = tf.newTransformer();

            try (StringWriter writer = new StringWriter()) {
                StreamResult result = new StreamResult(writer);
                transformer.transform(new DOMSource(xmlDoc), result);
                return writer.toString();
            }
        }

    }


      public void InitSimulator(String sessionId) throws Exception {
        synchronized (lock)  {
            PetriNet net = usersNets.get(sessionId);
            if (net == null)
                throw new NotFoundException("Session object not found");


            HighLevelSimulator sim = usersSimulator.get(sessionId);
            if (sim != null)
                sim.destroy();
            sim = HighLevelSimulator.getHighLevelSimulator(SimulatorService.getInstance().getNewSimulator());
            usersSimulator.put(sessionId, sim);

            Checker checker = new Checker(net, new File("C:\\tmp\\cpn.file"), sim);
            sim.setTarget((org.cpntools.accesscpn.model.impl.PetriNetImpl) net);



            //checker.localCheck();
            checker.checkInitializing();
            checker.checkDeclarations();
           // checker.generateSerializers();
            checker.checkPages();
          //  PerfomEntireChecking(sessionId);
            checker.generatePlaceInstances();
           // checker.checkMonitors();
            checker.generateNonPlaceInstances();
            checker.initialiseSimulationScheduler();
           // checker.instantiateSMLInterface();
          //  netInf.put(sessionId, new NetInfo(getEnableTransitions(sessionId), getTokensAndMarking(sessionId)));
            usersSimulator.put(sessionId, sim);

        }

    }


      public List<String> getEnableTransitions(String sessionId) throws Exception {
      synchronized (lock) {
          HighLevelSimulator s = usersSimulator.get(sessionId);
          if (s == null)
              throw new NotFoundException("Session object not found");
          //Checker checker = new Checker(net, new File("C:\\tmp\\cpn.file"), sim);
          List<Instance<Transition>> tis = s.getAllTransitionInstances();
          List<String> arr = new ArrayList<>();

          for (Instance<Transition> ti : tis) {

              if (s.isEnabled(ti))
                  arr.add(ti.getNode().getId());
          }
          return arr;
      }
    }

    public List<String> returnEnableTrans(String sessionId) throws Exception {
        NetInfo netInf = this.netInf.get(sessionId);
          if(netInf != null)
            return this.netInf.get(sessionId).getEnableTrans();
          else return  getEnableTransitions(sessionId);
    }

    public List<PlaceMark> returnTokensAndMarking(String sessionId) throws Exception {
        NetInfo netInf = this.netInf.get(sessionId);
        if(netInf != null)
            return this.netInf.get(sessionId).getTokensAndMark();
        else return  getTokensAndMarking(sessionId);
    }


    public List<PlaceMark> getTokensAndMarking(String sessionId) throws Exception {
       synchronized (lock) {
           HighLevelSimulator s = usersSimulator.get(sessionId);
           if (s == null)
               throw new NotFoundException("Session object not found");


           List<PlaceMark> result = new ArrayList<>();
           for (Instance<PlaceNode> p : s.getAllPlaceInstances()) {
               int tokens = s.getTokens(p);
               String marking = s.getMarking(p);
               result.add(PlaceMark.builder().id(p.getNode().getId()).marking(marking).tokens(tokens).build());
           }
           return result;
       }
    }

    public Map<String, List<IssueDescription>> PerfomEntireChecking(String sessionId) throws Exception {
        synchronized (lock) {
            Checker checker = usersCheckers.get(sessionId);
            //HighLevelSimulator ss = usersSimulator.get(sessionId);
            PetriNet net = usersNets.get(sessionId);
            if (net == null || checker == null)
                throw new NotFoundException("Session object not found");


            Map<String, List<IssueDescription>> issues = new HashMap<>();

            for (final HLDeclaration decl : net.declaration())
                CheckDelaration(checker, decl, issues);

            final PageSorter ps = new PageSorter(net.getPage());
            for (final Page page : ps)
                CheckPage(checker, page, ps.isPrime(page), issues);

            for (final Monitor m : net.getMonitors())
                CheckMonitor(checker, m, issues);
            //checker.generatePlaceInstances();
            //checker.generateNonPlaceInstances();
            return issues;

            //checker.generateSerializers();
            //checker.checkPages();
            //checker.generatePlaceInstances();
            // checker.checkMonitors();
            //checker.generateNonPlaceInstances();
            //checker.initialiseSimulationScheduler();
            // checker.instantiateSMLInterface();
        }
    }

    public void AddDeclaration(String sessionId, HLDeclaration declaration) throws Exception {
        synchronized (lock) {
            PetriNet net = usersNets.get(sessionId);
            if (net == null)
                throw new NotFoundException("Session object not found");
            declaration.setParent(net);
        }
    }

    public void DeleteDeclaration(String sessionId, String id) throws Exception {
        synchronized (lock) {
            PetriNet net = usersNets.get(sessionId);
            if (net == null)
                throw new NotFoundException("Session object not found");

            HLDeclaration decltToDelete = null;
            for (final HLDeclaration decl : net.declaration()) {
                if (decl.getId().equals(id)) {
                    decltToDelete = decl;
                    break;
                }
            }

            if (decltToDelete == null)
                throw new NotFoundException("Declaration with id: " + id + ", not found");

            decltToDelete.setParent(null);
        }
    }


    public Map<String, List<IssueDescription>> CheckPageByID(String sessionId, String id) throws Exception {
        synchronized (lock) {
            Checker checker = usersCheckers.get(sessionId);
            PetriNet net = usersNets.get(sessionId);
            if (net == null || checker == null)
                throw new NotFoundException("Session object not found");

            Map<String, List<IssueDescription>> issues = new HashMap<>();
            final PageSorter ps = new PageSorter(net.getPage());
            for (final Page page : ps) {
                if (page.getId().equals(id)) {
                    CheckPage(checker, page, ps.isPrime(page), issues);
                    return issues;
                }
            }
            return issues;
        }
    }

    public Map<String, List<IssueDescription>> CheckDeclarationByID(String sessionId, String id) throws Exception {
        synchronized (lock) {
            Checker checker = usersCheckers.get(sessionId);
            PetriNet net = usersNets.get(sessionId);
            if (net == null || checker == null)
                throw new NotFoundException("Session object not found");

            Map<String, List<IssueDescription>> issues = new HashMap<>();

            for (final HLDeclaration decl : net.declaration()) {
                if (decl.getId().equals(id)) {
                    CheckDelaration(checker, decl, issues);
                    return issues;
                }
            }
            return issues;
        }
    }

    public Map<String, List<IssueDescription>> CheckMonitorByID(String sessionId, String id) throws Exception {
        synchronized (lock) {
            Checker checker = usersCheckers.get(sessionId);
            // HighLevelSimulator ss = usersSimulator.get(sessionId);
            PetriNet net = usersNets.get(sessionId);
            if (net == null || checker == null)
                throw new NotFoundException("Session object not found");

            Map<String, List<IssueDescription>> issues = new HashMap<>();

            for (final Monitor m : net.getMonitors()) {
                if (m.getId().equals(id)) {
                    CheckMonitor(checker, m, issues);
                    return issues;
                }
            }
            return issues;
        }
    }

    private void CheckMonitor(Checker checker, Monitor m, Map<String, List<IssueDescription>> issues) throws IOException {
        synchronized (lock) {
            try {
                checker.checkMonitor(m);
            } catch (SyntaxCheckerException ex) {
                List<IssueDescription> issList = getOrCreateIssueList(m.getId(), issues);
                issList.add(IssueDescription.builder().type(IssueTypes.MONITOR.getType()).id(ex.getId()).description(ex.getMessage()).build());
            }
        }
    }

    private void CheckDelaration(Checker checker, HLDeclaration decl, Map<String, List<IssueDescription>> issues) throws IOException {
        synchronized (lock) {
            try {
                checker.checkDeclaration(decl);
            } catch (DeclarationCheckerException ex) {
                List<IssueDescription> issList = getOrCreateIssueList(decl.getId(), issues);
                issList.add(IssueDescription.builder().id(ex.getId()).type(IssueTypes.DECLARATION.getType()).description(ex.getMessage()).build());
            }
        }
    }

    private void CheckPage(Checker checker, Page page, boolean prime, Map<String, List<IssueDescription>> issues) throws IOException {
        synchronized (lock) {
            try {
                checker.checkPage(page, prime);
            } catch (CheckerException ex) {
                String[] lines = ex.getMessage().split("\\n");
                for (String ll : lines) {
                    String[] pair = ll.split(":");
                    if (pair.length == 2) {
                        List<IssueDescription> issList = getOrCreateIssueList(pair[0], issues);
                        issList.add(IssueDescription.builder().type(IssueTypes.PAGE.getType()).id(pair[0]).description(pair[1]).build());
                    } else {
                        List<IssueDescription> issList = getOrCreateIssueList(page.getId(), issues);
                        issList.add(IssueDescription.builder().type(IssueTypes.PAGE.getType()).id(ex.getId()).description(ll).build());
                    }
                }
            }
        }
    }



    public void makeStep(String sessionId){
        //String type = requestBody.get(0).get("type").toString();
        try {
            HighLevelSimulator s = usersSimulator.get(sessionId);
            List<List<Binding>> bindings = new LinkedList<>();
            List<Instance<Transition>> tis = s.getAllTransitionInstances();
            for (Instance<Transition> ti : tis) {
                if ( s.isEnabled(ti))
                    bindings.add(s.getBindings(ti));
            }
             for(List<Binding> bind : bindings){
                 s.execute(bind.get(0));
             }
        } catch (Exception e) {

        }

    }


}
