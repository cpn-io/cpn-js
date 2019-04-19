import java.io.*;

/** Class of static methods to convert objects to ByteStream compatible
 * representations and back again
 * @author Guy Gallasch
 * @version 0.6
 */

public class EncodeDecode
{
/** Method to convert a string to a ByteArrayInputStream
 * @param toConvert The string to convert
 * @return A ByteArrayInputStream representing the string
 */
    public static ByteArrayInputStream encode(String toConvert)
    {
        return new ByteArrayInputStream(toConvert.getBytes());
    }
    
/** Method to convert a ByteArrayOutputStream to a string
 * @param toConvert A ByteArrayOutputStream to convert to string
 * @return String decoded from the ByteArrayOutputStream
 */
    public static String decodeString(ByteArrayOutputStream toConvert)
    {
        return toConvert.toString();
    }
}

