package com.indevstudio.cpnide.server.playout;

import com.indevstudio.cpnide.server.model.PlaceMark;
import com.indevstudio.cpnide.server.model.SimInfo;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.cpntools.accesscpn.engine.highlevel.instance.Binding;
import org.cpntools.accesscpn.model.Label;
import org.cpntools.accesscpn.model.PetriNet;
import org.deckfour.xes.extension.std.XLifecycleExtension;
import org.springframework.stereotype.Component;

import java.io.File;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Slf4j
public class PlayOutContainer {

    /*
     * The session ids which have empty logs.
     */
//    private Set<String> isEmpty = new HashSet<>();

    /*
     * Folders and paths for the session ids.
     */
    private ConcurrentHashMap<String, String> folders = new ConcurrentHashMap<>();
    private ConcurrentHashMap<String, String> fileNames = new ConcurrentHashMap<>();

    /*
     * The collection of events for every session id for which we are recording.
     */
    private ConcurrentHashMap<String, PriorityQueue<PlayOutEvent>> events = new ConcurrentHashMap<>();

    /*
     * The latest marking for every session id for which we are recording time.
     */
    private ConcurrentHashMap<String, List<PlaceMark>> markings = new ConcurrentHashMap<>();

    /*
     * The variable declarations for every session id.
     */
    private ConcurrentHashMap<String, HashMap<String, String>> varDeclarations = new ConcurrentHashMap<>();

    /*
     * Available exporters.
     */
    private List<PlayOutExporter> exporters;

    /*
     * This class uses the instance pattern.
     */
    private static PlayOutContainer instance = null;

    private PlayOutContainer() {
        // Initialize the exporters.
        exporters = new ArrayList<PlayOutExporter>();
        exporters.add(new PlayOutExporterCSV());
        exporters.add(new PlayOutExporterXES());
    }

    public static PlayOutContainer getInstance() {
        if (instance == null) {
            instance = new PlayOutContainer();
        }
        return instance;
    }

    /*
     * Set whether we need to record events.
     */
    public void setRecordEvents(String sessionId, Boolean bool){
        if (bool) {
            // Yes
            events.put(sessionId, new PriorityQueue<PlayOutEvent>());
        } else {
            // No
            events.remove(sessionId);
        }
    }

    /*
     * Sets whether we need to record time,
     */
    public void setRecordTime(String sessionId, Boolean bool) {
        if (bool) {
            // Yes
            markings.put(sessionId, new ArrayList<PlaceMark>());
        } else {
            // No
            markings.remove(sessionId);
        }
    }

    /*
     * Whether we are recording time.
     */
    public Boolean isRecordingTime(String sessionId) {
        return markings.containsKey(sessionId);
    }

    /*
     * Sets the folder and path for the given session id.
     */
//    public void setFileName(String sessionId, String fileName) {
//        String outputPath = FilenameUtils.concat(System.getProperty("user.home"), "CPN_IDE");
//        outputPath = FilenameUtils.concat(outputPath, "log_out");
//        outputPath = FilenameUtils.concat(outputPath, sessionId);
//        folders.put(sessionId, Paths.get(outputPath).toAbsolutePath().toString());
//        fileNames.put(sessionId, fileName);
//    }

    /*
     * Clears all events for the given session id.
     */
    public void clear(String sessionId) {
        if (events.containsKey(sessionId)) {
            events.get(sessionId).clear();
        }
    }

    /*
     * Whether some evens were recorded for the given session id.
     */
//    public Boolean existRecordedEvents(String sessionId) {
//        return events.containsKey(sessionId) && !events.get(sessionId).isEmpty();
//    }

    /*
     * Creates a log for the given session id using the given config, and exports it to file.
     * The log is not kept in memory.
     */
    public PlayOutResp create(String sessionId, PlayOutConfig config) {
        System.out.println("[PlayOutContainer] path " + config.getPath());
        System.out.println("[PlayOutContainer] fileName " + config.getFileName());
        String fileName = "";
        int nofPlayOutEvents = 0;
        int nofLogEvents = 0;
        if (events.containsKey(sessionId)) {
            /*
             * Add the variable declarations to the config.
             */
            if (varDeclarations.containsKey(sessionId)) {
                config.setVarDeclarations(varDeclarations.get(sessionId));
            }
            nofPlayOutEvents = events.get(sessionId).size();
            for (PlayOutExporter exporter : exporters) {
                if (exporter.hasType(config)) {
                    /*
                     * Found an exporter for this type. Have this exporter create the log.
                     */
                    nofLogEvents = exporter.createLog(events.get(sessionId), config);
//                    isEmpty.add(sessionId);
                    if (!exporter.hasEmptyLog()) {
                        /*
                         * Created log is not empty. Export it to file.
                         */
                        String path = config.getPath();
                        if (path != null) {
                            // Use provided path.
                            path = FilenameUtils.getFullPathNoEndSeparator(path);
                        } else {
                            // Use default path in user folder.
                            path = FilenameUtils.concat(System.getProperty("user.home"), "CPN_IDE");
                        }
                        path = FilenameUtils.concat(path, "play_out");
//                        path = FilenameUtils.concat(path, sessionId);
                        path = Paths.get(path).toAbsolutePath().toString();
                        File directory = new File(path);
                        directory.mkdirs();
                        fileName = config.getFileName();
                        if (fileName == null) {
                            fileName = "log";
                        }
                        fileName = FilenameUtils.concat(path, fileName + FilenameUtils.EXTENSION_SEPARATOR + exporter.getExtension());
                        System.out.println("[PlayOutContainer] Exporting to " + fileName);
                        File file = new File(fileName);
                        try {
                            exporter.exportLog(file);
                        } catch (Exception e) {
                            System.out.println(e);
                        }
//                        isEmpty.remove(sessionId);
                    }
                    /*
                    No need to check other exporters.
                     */
                    break;
                }
            }
        }
        PlayOutResp resp = new PlayOutResp();
        resp.setAbsoluteFileName(fileName);
        resp.setNofPlayOutEvents(nofPlayOutEvents);
        resp.setNofLogEvents(nofLogEvents);
        return resp;
    }

    /*
     * Whether the last exported log for the session id is empty.
     */
//    public Boolean isLogEmpty(String sessionId) {
//        return isEmpty.contains(sessionId);
//    }

    /*
     * Gets progress. Not sure whether this is used, hence always "0" for the time being.
     */
    public PlayOutProgress getProgress(String sessionId, PlayOutConfig config) throws Exception{
        PlayOutProgress progress = new PlayOutProgress();
        progress.setProgress("0");
        return progress;
    }

    /*
     * Returns the path to the export file. THis path contains the filename but does not contain the suffix (csv, xes).
     */
//    public String getPath(String sessionId) {
//        if (fileNames.containsKey(sessionId)) {
//            return folders.get(sessionId) + "/" + fileNames.get(sessionId);
//        }
//        return null;
//    }

    /*
     * Adds events for the given session id, using the given binding, info and time.
     */
    public void addEvents(String sessionId, Binding b, SimInfo info, Double time) throws Exception{
        if (!events.containsKey(sessionId)) {
            // We're not recording events
            return;
        }
        if (b.getTransitionInstance().getNode().getNodeGraphics().getFill().getColor().equals("Black")) {
            // Tau transition
            return;
        }
        double simulatorTime = (info.getTime().isEmpty() ? 0.0 : Double.parseDouble(info.getTime()));
        events.get(sessionId).add(new PlayOutEvent(b, simulatorTime, XLifecycleExtension.StandardModel.START.getEncoding(), events.get(sessionId).size()));
        if (time != null) {
            events.get(sessionId).add(new PlayOutEvent(b, Math.max(simulatorTime, time), XLifecycleExtension.StandardModel.COMPLETE.getEncoding(), events.get(sessionId).size()));
        } else {
            events.get(sessionId).add(new PlayOutEvent(b, simulatorTime, XLifecycleExtension.StandardModel.COMPLETE.getEncoding(), events.get(sessionId).size()));
        }
    }

    /*
     * Gets the minimal time of any token in the given marking but not in the latest (saved) marking.
     */
    public Double getMinimalTime(String sessionId, List<PlaceMark> marking) {
        if (!markings.containsKey(sessionId)) {
            return null;
        }
        List<PlaceMark> latestMarking = markings.get(sessionId);
        Double time = Double.MAX_VALUE;
        if (latestMarking.isEmpty()) {
            // No latest marking yet.
            for (PlaceMark tokens : marking) {
                time = Double.min(time, getMinimalTime(tokens.getMarking(), ""));
            }
        } else {
            for (int i = 0; i < marking.size(); i++) {
                PlaceMark tokens = marking.get(i);
                PlaceMark latestTokens = latestMarking.get(i);
                if (tokens.getMarking().equals(latestTokens.getMarking())) {
                    // Tokens in this place did not change.
                    continue;
                }
                time = Double.min(time, getMinimalTime(tokens.getMarking(), latestTokens.getMarking()));
            }
        }
        if (time == Double.MAX_VALUE) {
            /*
             * We did not find any new timed token in the given marking.
             * Assuming that every activity produces a new timed token, we conclude that a similar timed token was
             * already present in the latest marking. As we cannot distinguish both tokens, they must have the same
             * timestamp, hence the time the activity took must be 0.0. As a result, we should use the current
             * simulation time for the complete event associated with this activity. To achieve this, we set the
             * minimal time to 0.0, as this time will be maxed with the current simulation time later.
             */
            time = 0.0;
        }
        markings.put(sessionId, marking);
        return time;
    }

    /*
     * Gets the minimal time for any token in the given (current) value that is not in the latest value.
     */
    private double getMinimalTime(String tokenString, String latestTokenString) {
        // Get all current tokens
        Set<String> tokenValues = split(tokenString);
        // get all latest tokens
        Set<String> latestTokenValues = split(latestTokenString);
        // Remove latest tokens from current tokens
        tokenValues.removeAll(latestTokenValues);
        // Return minimal time for any current token that remains.
        return getMinimalTime(tokenValues);
    }

    /*
     * Returns the collection of tokens in the given value.
     */
    private Set<String> split(String tokenValue) {
        Set<String> tokenValues = new HashSet<>();
        while (tokenValue.contains("++")) {
            int indexOfPlusPlus = tokenValue.indexOf("++");
            tokenValues.add(tokenValue.substring(0, indexOfPlusPlus));
            tokenValue = tokenValue.substring(tokenValue.indexOf("\n") + 1);
        }
        tokenValues.add(tokenValue);
        return tokenValues;
    }

    /*
     * Returns the minimal time of a collection of token values.
     */
    private double getMinimalTime(Set<String> tokenValues) {
        Double time = Double.MAX_VALUE;
        for (String tokenValue : tokenValues) {
            int indexOfAt = tokenValue.indexOf("@");
            if (indexOfAt >= 0) {
                time = Double.min(time, Double.max(0.0, Double.parseDouble(tokenValue.substring(indexOfAt + 1).replace("~", "-"))));
            }
        }
        return time;
    }

    /*
     * Sets the variable declaration for the given session id using the given net.
     */
    public void setVarDeclarations(String sessionId, PetriNet net) {
        this.varDeclarations.put(sessionId, new HashMap<String,String>());
        for (Label label : net.getLabel()) {
            String declaration = label.asString();
            if (declaration.startsWith("var")) {
                declaration = declaration.substring(3).replaceAll(" ","");
                Integer indexOfColon = declaration.indexOf(":");
                String rawKey = declaration.substring(0, indexOfColon);
                String color = declaration.substring(indexOfColon + 1);
                String[] keys = rawKey.split(",");
                for (String key : keys) {
                    this.varDeclarations.get(sessionId).put(key.trim(), color);
                }
            }
        }
    }
}
