import java.applet.*;
import java.awt.*;
import java.awt.event.*;
import java.io.*;
import java.net.*;
import java.util.*;

public class DiningPhilosopher extends Applet implements ActionListener {
 
    public Philosopher[] philosophers = new Philosopher[5];
    PhilCanvas display;
    Button start;
    TextField portField;
    TextArea textArea;
    InetAddress address;   
    String host=null;
    int port=0;
    int presstart=0;
    String newline=System.getProperty("line.separator");

    public void init(){

	//Initialise the network connection
	host = getCodeBase().getHost();

	try {

	    address = InetAddress.getByName(host);

	} catch (UnknownHostException e){

	    System.out.println("Couldn't get internet address: Unknown address");
	    textArea.append("Couldn't get internet address: Unknown address"+newline);

	}

	
	//initialise the philosophers
	for(int i=0;i<5;i++){
	    philosophers[i]=new Philosopher(0,0,i);
	}


	//build the UI
        setLayout(new BorderLayout());
	display = new PhilCanvas(this,philosophers);
	display.setSize(500,240);

	add("North",display);
	start = new Button("Start");
	start.setSize(60,20);
	Label label=new Label ("Port Number:",Label.RIGHT);
	portField=new TextField(6);
	textArea=new TextArea(10,20);
	textArea.setEditable(false);

	Panel p1 = new Panel();
	p1.setLayout(new BorderLayout());
	p1.add("West",start);
	p1.add("Center",label);
	p1.add("East",portField);
	p1.add("South",textArea);
        add("South",p1);

	start.addActionListener(this);
	portField.addActionListener(this);
	
    }

    public Insets getInsets(){
		
	return new Insets(4,4,5,5);

    }


    public void actionPerformed(ActionEvent event){

	String port_str=null;

	//the user presses start
	if((port_str=portField.getText()).equals("")){
	    // case nothing has been typed in the port field
	    textArea.append("Specify a port number in the port field"+newline);
	} else {
	    // start pollServer which communicates with the server
	    if(presstart==0){
	    port = Integer.parseInt(port_str);
	    new pollServer(port,host,philosophers,display,textArea).start();
	    //replace the start by a stop button
	    start.setLabel("Stop");
	    presstart++;
	    } else {
		//the press stop - pollServer is stopped and the display refreshed
		pollServer.stop=true;
		for(int i=0;i<5;i++){
		    philosophers[i].state=0;
		    display.deadlocked=0;
		    display.repaint();
		}
		//the user can start a communication again
		start.setLabel("Start");
		presstart--;
	    }
	}

    }

}






