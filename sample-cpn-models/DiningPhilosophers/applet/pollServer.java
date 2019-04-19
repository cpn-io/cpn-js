import java.io.*;
import java.net.*;
import java.util.*;
import java.awt.*;

public class pollServer extends Thread {

    private int port;
    private String host;
    private Philosopher[] philosophers;
    private PhilCanvas parent;
    private TextArea text;
    private JavaCPN diningPhil;
    public static boolean stop;

    public pollServer(int port, String host, Philosopher[] phils, PhilCanvas parent, TextArea text){

	super("pollCPN");

	this.port=port;
	this.host=host;
	this.philosophers=phils;
	this.parent=parent;
	this.text=text;

    }

    public void run(){

	String newline=System.getProperty("line.separator");
        try
	{
          diningPhil = new JavaCPN();
          diningPhil.connect(host, port);
          text.append("Connection successfully established ..." + newline);
          stop=false;

        }
        catch (UnknownHostException e)
            {
                  System.err.println("Don't know about host " + host);
                  text.append("Don't know about host " + host + newline);
                  stop=true;
            }
        catch (IOException e)
            {
                  System.err.println("Couldn't get I/O for the connection to "+host);
                  text.append("Couldn't get I/O for the connection to " + host + newline);
                  stop=true;
            }


	if(stop!=true){

	    String fromCPN;
	    int index;
	    String state;
	  
	    try{
		while(stop!=true){
		    fromCPN=EncodeDecode.decodeString(diningPhil.receive());
		    
		    if(fromCPN.equals("deadlocked")){
			parent.deadlocked = 1;
			parent.repaint();
			text.append("System deadlocked !!!" + newline);

                    } else {	    

			index=Integer.parseInt(fromCPN.substring(3,4));
			state=fromCPN.substring(6,fromCPN.length());
			
			if(state.equals("eat")){
			    philosophers[index-1].state=1;
			    parent.repaint();
			}  else {

			    if(state.equals("gotright")){
				philosophers[index-1].state=2;
				parent.repaint();

			    } else {

				if(state.equals("gotleft")){
				philosophers[index-1].state=3;
				parent.repaint();

				} else {
				
				    if(state.equals("think")){
					philosophers[index-1].state=0;
					parent.repaint();
				    }
				  
				}
			    }

		        }
			
		    }
		}

		text.append("Connection interrupted..." + newline);
		
	} catch (IOException e) { 
		
		text.append("Connection interrupted ..."+ newline);
	}
	    
    }
}

}

