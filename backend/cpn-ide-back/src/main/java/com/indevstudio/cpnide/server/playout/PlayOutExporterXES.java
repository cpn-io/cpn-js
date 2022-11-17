package com.indevstudio.cpnide.server.playout;

import org.deckfour.xes.classification.XEventAndClassifier;
import org.deckfour.xes.classification.XEventLifeTransClassifier;
import org.deckfour.xes.classification.XEventNameClassifier;
import org.deckfour.xes.extension.std.XConceptExtension;
import org.deckfour.xes.extension.std.XLifecycleExtension;
import org.deckfour.xes.extension.std.XTimeExtension;
import org.deckfour.xes.factory.XFactory;
import org.deckfour.xes.factory.XFactoryRegistry;
import org.deckfour.xes.model.XAttribute;
import org.deckfour.xes.model.XEvent;
import org.deckfour.xes.model.XLog;
import org.deckfour.xes.model.XTrace;
import org.deckfour.xes.out.XSerializer;
import org.deckfour.xes.out.XesXmlSerializer;

import java.io.File;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

public class PlayOutExporterXES extends PlayOutExporter {

    private static final int unknownType = 0; // Don't know yet.
    private static final int failedType = 1; // Typing failed (could be a mixed type, or an unknown value).
    private static final int literalType = 2; // Literal type (strings)
    private static final int discreteType = 3; // Discrete type (integers)
    private static final int continuousType = 4; // Continuous type (reals)
    private static final int booleanType = 5; // Boolean type
    private static final int dateType = 6; // Date type.

    private XFactory factory;
    private XLog log;

    public PlayOutExporterXES() {
        factory = XFactoryRegistry.instance().currentDefault();
        log = factory.createLog(factory.createAttributeMap());
    }

    @Override
    public boolean hasType(PlayOutConfig config) {
        return config.getExportType().equals(PlayOutConfig.XES);
    }

    @Override
    public String getExtension() {
        return PlayOutConfig.XES;
    }

    @Override
    public int createLog(PriorityQueue<PlayOutEvent> events, PlayOutConfig config) {
        Map<String, XTrace> traces = new HashMap<String, XTrace>();

        // Use the CSV log as base.
        PlayOutExporterCSV exporterCSV = new PlayOutExporterCSV();
        exporterCSV.createLog(events, config);

        List<String[]> logCSV = exporterCSV.getLog();
        if (logCSV == null) {
            // No data found.
            return 0;
        }

        int caseCol = exporterCSV.getCaseColumn();
        if (caseCol == 0) {
            // No case column found in data.
            return 0;
        }

        // Get the attribute keys.
        String[] keys = logCSV.get(0);

        // Whether attributes are global.
        boolean[] isGlobal = new boolean[keys.length];
        for (int col = 0; col < keys.length; col++) {
            isGlobal[col] = true;
        }

        // Attribute types.
        int[] types = new int[keys.length];

        // Get possible attribute types.
        for (int col = 3; col < keys.length; col++) {
            if (col == caseCol) {
                continue;
            }
            types[col] = getType(logCSV, col, config);
        }

        // Create an event for every other row in the matrix.
        for (int row = 1; row < logCSV.size(); row++) {
            // Get the values.
            String[] values = logCSV.get(row);

            // Get the trace for this event.
            XTrace trace = traces.get(values[caseCol]);
            if (trace == null) {
                // New case id. Create a new trace for this case id.
                trace = factory.createTrace(factory.createAttributeMap());
                XConceptExtension.instance().assignName(trace, values[caseCol]);
                traces.put(values[caseCol], trace);
                log.add(trace);
            }

            // Create the event.
            XEvent event = factory.createEvent(factory.createAttributeMap());
            trace.add(event);

            // Add event attributes.

            // First, add timestamp.
            try {
                XTimeExtension.instance().assignTimestamp(event, config.getDateFormat().parse(values[0]));
            } catch (Exception e) {
                // No timestamp, hence not global.
                isGlobal[0] = false;
            }

            // Second, add lifecycle transition.
            try {
                XLifecycleExtension.instance().assignStandardTransition(event, XLifecycleExtension.StandardModel.decode(values[1]));
            } catch (Exception e) {
                // Decoding must have failed. Use UNKNOWN instead.
                XLifecycleExtension.instance().assignStandardTransition(event, XLifecycleExtension.StandardModel.UNKNOWN);
            }

            // Third, add concept name.
            XConceptExtension.instance().assignName(event, values[2]);

            // Fourth, add additional attributes.
            for (int col = 3; col < values.length; col++) {
                if (col != caseCol) {
                    if (!values[col].isEmpty()) {
                        // Get an attribute for this value.
                        XAttribute attribute = getAttribute(types[col], keys[col], values[col], factory, config);
                        if (attribute != null) {
                            // Got attribute, add it.
                            event.getAttributes().put(keys[col], attribute);
                        } else {
                            // Got no attribute, hence not global.
                            isGlobal[col] = false;
                        }
                    } else {
                        // No value, hence not global.
                        isGlobal[col] = false;
                    }
                }
            }
        }

        // Add default extensions
        log.getExtensions().add(XConceptExtension.instance());
        log.getExtensions().add(XLifecycleExtension.instance());
        log.getExtensions().add(XTimeExtension.instance());

        // Add global event attributes
        for (int col = 0; col < keys.length; col++) {
            if (col != caseCol && isGlobal[col]) {
                XAttribute attribute = getGlobalAttribute(col, types[col], keys[col], factory);
                log.getGlobalEventAttributes().add(attribute);
            }
        }

        // Add default classifiers
        log.getClassifiers().add(new XEventAndClassifier(new XEventNameClassifier(), new XEventLifeTransClassifier()));
        log.getClassifiers().add(new XEventNameClassifier());

        return logCSV.size() - 1;
    }

    /*
     * Returns the (suggested) type of the given column.
     */
    private int getType(List<String[]> matrix, int col, PlayOutConfig config) {
        int type = unknownType;
        for (int row = 1; row < matrix.size(); row++) {
            String value = matrix.get(row)[col];
            if (value.isEmpty()) {
                // No value. Ignore.
                continue;
            }
            // Literals start (and end) with a double quote.
            if (value.startsWith("\"") && value.endsWith("\"")) {
                if (type == unknownType) {
                    type = literalType;
                }
                if (type != literalType) {
                    return failedType;
                }
                continue;
            }
            // Try parsing an integer.
            try {
                Integer.parseInt(value);
                if (type == unknownType) {
                    type = discreteType;
                }
                if (type != discreteType && type != continuousType) {
                    return failedType;
                }
                continue;
            } catch (Exception eDisc) {
                // Not an integer.
            }
            // Try parsing a double.
            try {
                Double.parseDouble(value);
                if (type == unknownType || type == discreteType) {
                    type = continuousType;
                }
                if (type != continuousType) {
                    return failedType;
                }
                continue;
            } catch (Exception eCont) {
                // Not a double.
            }
            // Try a boolean.
            if (value.equalsIgnoreCase("false") || value.equalsIgnoreCase("true")) {
                if (type == unknownType) {
                    type = booleanType;
                }
                if (type != booleanType) {
                    return failedType;
                }
                continue;
            }
            // Try a date.
            try {
                config.getDateFormat().parse(value);
                if (type == unknownType) {
                    type = dateType;
                }
                if (type != dateType) {
                    return failedType;
                }
                continue;
            } catch (Exception eDate) {
                // Not a date.
            }
            // All failed.
            return failedType;
        }
        return type;
    }

    /*
     * Returns an attribute of the given type for the given key and value.
     */
    private XAttribute getAttribute(int type, String key, String value, XFactory factory, PlayOutConfig config) {
        XAttribute attribute = null;
        switch (type) {
            case literalType : // Create a literal attribute (do not forget to remove the double quotes!)
                attribute = factory.createAttributeLiteral(key, removeQuotes(value), null);
                break;
            case discreteType : // Create a discrete attribute.
                attribute = factory.createAttributeDiscrete(key, Integer.parseInt(value), null);
                break;
            case continuousType : // Create a continuous attribute.
                attribute = factory.createAttributeContinuous(key, Double.parseDouble(value), null);
                break;
            case booleanType : // Create a boolean attribute.
                attribute = factory.createAttributeBoolean(key, value.equalsIgnoreCase("true"), null);
                break;
            case dateType : // Create a timestamp attribute.
                try {
                    attribute = factory.createAttributeTimestamp(key, config.getDateFormat().parse(value), null);
                } catch (Exception e) {
                    // Should not occur, was tested before.
                }
                break;
            default: // Create a literal attribute, do not strip any quotes to show the difference.
                attribute = factory.createAttributeLiteral(key, value, null);
                break;
        }
        return attribute;
    }

    /*
     * Returns a (global) attribute for the given column and key.
     */
    private XAttribute getGlobalAttribute(int col, int type, String key, XFactory factory) {
        XAttribute attribute;
        switch (col) {
            case 0:
                attribute = factory.createAttributeTimestamp(key, 0, XTimeExtension.instance());
                break;
            case 1:
                attribute = factory.createAttributeLiteral(key, "UNKNOWN", XLifecycleExtension.instance());
                break;
            case 2:
                attribute = factory.createAttributeLiteral(key, "UNKNOWN", XConceptExtension.instance());
                break;
            default:
                switch (type) {
                    case literalType:
                        attribute = factory.createAttributeLiteral(key, "UNKNOWN", null);
                        break;
                    case discreteType:
                        attribute = factory.createAttributeDiscrete(key, 0, null);
                        break;
                    case continuousType:
                        attribute = factory.createAttributeContinuous(key, 0.0, null);
                        break;
                    case booleanType:
                        attribute = factory.createAttributeBoolean(key, false, null);
                        break;
                    case dateType:
                        attribute = factory.createAttributeTimestamp(key, 0, null);
                        break;
                    default:
                        attribute = factory.createAttributeLiteral(key, "\"UNKNOWN\"", null);
                        break;
                }
                break;
        }
        return attribute;
    }

    /*
     * Removes quotes.
     */
    private String removeQuotes(String value) {
        // Remove the outer quotes, replace inner pair of quotes by a single quote.
        return value.substring(1, value.length()-1).replaceAll("\"\"", "\"");
    }

    @Override
    public boolean hasEmptyLog() {
        return log.isEmpty();
    }

    @Override
    public void exportLog(File file) {
        try {
            FileOutputStream out = new FileOutputStream(file);
            XSerializer logSerializer = new XesXmlSerializer();
            logSerializer.serialize(log, out);
            out.close();
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
