import java.util.*;
import java.net.*;
import java.io.*;

/** JavaCPNInterface is the interface which defines the methods implemented
 * by JavaCPN.
 * @author Guy Gallasch
 * @version 0.6
 */

public interface JavaCPNInterface
{
    // A method to actively establish a connection to an external process
    public void connect(String hostName, int port) throws IOException;

    // A method to passively establish a connection with an external process
    public void accept(int port) throws IOException;

    // A method to send data to an external process
    public void send(ByteArrayInputStream sendBytes) throws SocketException;

    // A method to receive data from an external process
    public ByteArrayOutputStream receive() throws SocketException;

    // A method to close a connection to an external process
    public void disconnect() throws IOException;
}

