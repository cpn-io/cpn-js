
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.*;

import com.indevstudio.cpnide.server.model.PlaceMark;
import javassist.NotFoundException;
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
import org.cpntools.accesscpn.engine.highlevel.instance.Instance;
import org.cpntools.accesscpn.engine.highlevel.instance.Marking;
import org.cpntools.accesscpn.engine.highlevel.instance.cpnvalues.CPNValue;
import org.cpntools.accesscpn.model.HLDeclaration;
import org.cpntools.accesscpn.model.PetriNet;
import org.cpntools.accesscpn.model.PlaceNode;
import org.cpntools.accesscpn.model.Transition;
import org.cpntools.accesscpn.model.declaration.VariableDeclaration;
import org.cpntools.accesscpn.model.exporter.DOMGenerator;
import org.cpntools.accesscpn.model.monitors.Monitor;
import org.cpntools.accesscpn.model.util.BuildCPNUtil;

import org.eclipse.emf.common.notify.Notifier;
import org.junit.Test;

public class ExampleAccessCPN2 {

	private PetriNet net;
	//private final BuildCPNUtil build;
	private HighLevelSimulator sim;
	  
	public ExampleAccessCPN2() throws Exception {
	//	build = new BuildCPNUtil();
	}

	public void loadModel(String fileName, String modelName) throws Exception {

		File file = new File(fileName);
		FileInputStream in = new FileInputStream(file);
		try {
			net = org.cpntools.accesscpn.model.importer.DOMParser.parse(in, modelName);
		} catch (Exception e) {
			System.err.println("Could not parse model in " + file.getAbsolutePath());
			e.printStackTrace();
		}
		
		SimulatorService ss = SimulatorService.getInstance();
		Simulator s = ss.getNewSimulator();
		sim = HighLevelSimulator.getHighLevelSimulator(s);
		
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
		sim.destroy();
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
	
	public void check(String modelDir, String outputDir) {

		try {
			Checker c = new Checker(net, null, sim);
			//c.checkEntireModel();
			
			System.out.println("initialize");
			c.checkInitializing(modelDir, outputDir);
			System.out.println("declarations");
			c.checkDeclarations();
			System.out.println("serializes");
			c.generateSerializers();
			System.out.println("pages");
			c.checkPages();
			System.out.println("place instances");
			c.generatePlaceInstances();
			System.out.println("monitors");
			c.checkMonitors();

			for (final Monitor m : net.getMonitors())
				c.checkMonitor(m);

			System.out.println("non-place instances");
			c.generateNonPlaceInstances();
			System.out.println("sim-scheduler");
			c.initialiseSimulationScheduler();
//			System.out.println("SML");
//			c.instantiateSMLInterface();
			System.out.println("done");


			c.checkDeclarations();
			System.out.println("serializes");
			c.generateSerializers();
			System.out.println("pages");
			c.checkPages();
			System.out.println("place instances");
			c.generatePlaceInstances();
			System.out.println("monitors");
			c.checkMonitors();
			System.out.println("non-place instances");
			c.generateNonPlaceInstances();
			System.out.println("sim-scheduler");
			c.initialiseSimulationScheduler();
//			System.out.println("SML");
//			c.instantiateSMLInterface();
			System.out.println("done");

			// can also check
			//c.checkDeclarations();
			//c.checkDeclaration(decl);
			//c.checkInitializing();
			//c.checkInitializing(modelPath, outputPath); -- relevant for writing simulation results to disk
			//c.checkMonitors();
			//c.checkPages();
			//c.checkPage(page, prime);
			
		} catch (SyntaxCheckerException e) {
			
			System.err.println(e);

			ModelError error = new ModelError(null, "CPN model",
					"The generated CPN model contains errors; see console.");
			errors.add(error);

			e.printStackTrace();

		} catch (DeclarationCheckerException e) {

			System.err.println(e);

			ModelError error = new ModelError(null, "CPN model",
					"The generated CPN model contains errors; see console.");
			errors.add(error);

		} catch (LocalCheckFailed e) {

			System.err.println(e);


			ModelError error = new ModelError(null, "CPN model",
					"The generated CPN model contains errors; see console.");
			errors.add(error);

		} catch (CheckerException e) {

			System.err.println(e);


			ModelError error = new ModelError(null, "CPN model",
					"The generated CPN model contains errors; see console.");
			errors.add(error);

		} catch (ErrorInitializingSMLInterface e) {
			// ignore this one: unclear why it is raised

			System.err.println(e);
			e.printStackTrace();

			
			ModelError error = new ModelError(null, "CPN model",
					"Could not initalize SML interface");
			errors.add(error);


		} catch (Exception e) {
			System.err.println(e);
			e.printStackTrace();
		}

		//sim.setTarget((org.cpntools.accesscpn.model.impl.PetriNetImpl) net);
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
			// build.declareVariable(net, name, type);
		}
	}

	public List<Binding> enabledBindings() {
		    
		    List<Binding> bindings = new LinkedList<Binding>();
		    
		    try {
		      
		      //System.out.println("current marking: "+sim.getMarking().toString());
		      
		      List<Instance<Transition>> tis = sim.getAllTransitionInstances();
		      for (Instance<Transition> ti : tis) {
		        if (sim.isEnabled(ti))
		          bindings.addAll(sim.getBindings(ti));
		      }
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

	@Test
	public void testAccessCpn() throws Exception {
		//String fileName = "./model/hoponhopoff-color.cpn";
		//String fileName = "./model/mscProtocol.cpn";
		//String fileName = "./model/discretemodel_task1.cpn";
		String fileName = "/home/semenov-k/Downloads/fuelstation_4c_cpn_ide.xml";//fuelstation_4xxxx.cpn";
		//String fileName = "./model/fuelstation_4.cpn";
		//String fileName = "./model/mynet-edited.cpn";
		
		
		System.out.println("loading...");
		ExampleAccessCPN2 access = new ExampleAccessCPN2();
		access.loadModel(fileName, "myMo-de-l");
		
		System.out.println("checking...");
		File modelDir = new File("/home/semenov-k/Project/git/cpn-js/backend/model_out/CPN-IDE-SESSION-1576496493869");//new File(fileName).getParentFile().getAbsoluteFile();
		access.check(modelDir.toString(), modelDir.toString());
		
		for (ModelError e : access.errors) {
			System.out.println(e.error+" "+e.location);
		}


		List<String> arr = new ArrayList<>();
		while (true) {
			List<Instance<Transition>> tis = access.sim.getAllTransitionInstances();

			for (Instance<Transition> ti : tis) {

				if (access.sim.isEnabled(ti))
					arr.add(ti.getNode().getId());
			}
			if (arr.isEmpty()) {
				String res = access.sim.increaseTime();
				if (res != null) //sim ended
					break;
			} else break;
		}

		HighLevelSimulator s = access.sim;
		if (s == null)
			throw new NotFoundException("Session object not found");


		List<PlaceMark> result = new ArrayList<>();
		for (Instance<PlaceNode> p : s.getAllPlaceInstances()) {
			int tokens = s.getTokens(p);
			String marking = s.getMarking(p);
			result.add(PlaceMark.builder().id(p.getNode().getId()).marking(marking).tokens(tokens).build());
		}

		// run replication simulation
		System.out.println("simulator, writing to: "+access.sim.getOutputDir());
		access.sim.evaluate("CPN'Replications.nreplications 3");
		System.out.println("simulator, written to: "+access.sim.getOutputDir());
		
		// run step-wise simulation
//		System.out.println(access.sim.getMarking());
		 
//		List<Instance<PlaceNode>> places = access.sim.getAllPlaceInstances();
//		Instance<PlaceNode> p_move12 = null;
//		for (Instance<PlaceNode> p : places) {
//			if (p.getNode().getName().getText().equals("move12")) { p_move12 = p; break; }
//		}
//		
//		
//		System.out.println("\nInitial Marking\n"+access.sim.getMarking());
//		if (p_move12 != null) System.out.println("Marking of move12 is: \n"+access.sim.getMarking().getMarking(p_move12).getStructuredMarking());
//		Binding enabledBinding = access.enabledBindings().get(0);
//		System.out.println("\nPicked "+enabledBinding.getTransitionInstance());
//		access.sim.execute(enabledBinding);
//		System.out.println("Reached Marking\n"+access.sim.getMarking());
//		Marking m = access.sim.getMarking().getMarking(p_move12);
//		String tokens_on_m = m.getMarking();
//		int number_of_tokens = m.getTokenCount();
//		if (p_move12 != null)System.out.println("Marking of move12 is "+tokens_on_m+" ("+number_of_tokens+")");
//		
//		System.out.println(access.sim.evaluate("1+1"));
//		
		// export model
//		access.writeModel("./model/", "reexport.cpn", access.net);
		

	}
}

