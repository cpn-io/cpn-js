package com.indevstudio.cpnide.server.playout;

import org.deckfour.xes.extension.std.XConceptExtension;
import org.deckfour.xes.extension.std.XLifecycleExtension;
import org.deckfour.xes.extension.std.XTimeExtension;

import java.io.File;
import java.io.PrintWriter;
import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.Assert.assertTrue;

public class PlayOutExporterCSV extends PlayOutExporter {

    private final List<String[]> log;
    private int caseCol;

    public PlayOutExporterCSV() {
        log = new ArrayList<>();
        caseCol = 0;
    }

    @Override
    public boolean hasType(PlayOutConfig config) {
        return config.getExportType().equals(PlayOutConfig.CSV);
    }

    @Override
    public String getExtension() {
        return PlayOutConfig.CSV;
    }

    @Override
    public int createLog(PriorityQueue<PlayOutEvent> events, PlayOutConfig config) {
        PriorityQueue<PlayOutEvent> eventsToDo = new PriorityQueue<>(events);

        addHeaderRow(log, config);
        if (caseCol == 0) {
            // No case column. No need to add any row.
            return 0;
        }

        while (!eventsToDo.isEmpty()) {
            PlayOutEvent event = eventsToDo.poll();
            if ((event.isCompleteEvent() && config.getRecordedEvents().contains(PlayOutConfig.COMPLETE))
                    || (event.isStartEvent() && config.getRecordedEvents().contains(PlayOutConfig.START))) {
                addRow(log, event, config);
            }
        }

        return log.size() - 1;
    }

    protected int getCaseColumn() {
        return caseCol;
    }

    /*
     * Adds the header row to the CSV matrix.
     */
    private void addHeaderRow(List<String[]> log, PlayOutConfig config){
        //Timestamp
        //LifeCycleTransition
        //RemainingAttributes
        Set<String> keySet = config.getVarDeclarations().keySet();
        String[] keyArray = keySet.toArray(new String[0]);
        String[] firstRow = new String[keySet.size()+3];
        firstRow[0] = XTimeExtension.KEY_TIMESTAMP;
        firstRow[1] = XLifecycleExtension.KEY_TRANSITION;
        firstRow[2] = XConceptExtension.KEY_NAME;
        System.arraycopy(keyArray, 0, firstRow, 3, keySet.size());
        for (int i = 3; i < firstRow.length; i++) {
            if (firstRow[i].equals(config.getCaseId())) {
                // Found the case column.
                caseCol = i;
                break;
            }
        }
        /*
         * As this is the header row, the existing log should now be cleared first.
         * Thanks to Philipp Heisenberger for pointing it out.
         */
        log.clear();
        log.add(firstRow);
    }

    /*
     * Adds a row for the given event to the CSV matrix.
     *
     * Precondition: caseCol != 0, that is, we do have a case column.
     */
    private void addRow(List<String[]> log, PlayOutEvent event, PlayOutConfig config) {
        String timeStampEvent = config.getDateFormat().format(getTimeStampFromEvent(event.getTime(), config));
        String lifeCycleTransition = getLifeCycleTransitionFromEvent(event, config);
        String conceptName = getConceptNameFromEvent(event, lifeCycleTransition, config);
        String[] varDeclarationsArray = getVarDeclarationsFromEvent(event, config);
        String[] newRow = new String[varDeclarationsArray.length+3];
        newRow[0] = timeStampEvent;
        newRow[1] = lifeCycleTransition;
        newRow[2] = conceptName;
        System.arraycopy(varDeclarationsArray, 0, newRow, 3, varDeclarationsArray.length);
        if (!newRow[caseCol].isEmpty()) {
            // Event belongs to some trace. Add it.
            log.add(newRow);
        }
    }

    /*
     * Returns the wall clock time for the given simulation time.
     */
    private Date getTimeStampFromEvent(double eventTime, PlayOutConfig config) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date(config.getStartTimeLong()));
        calendar.add(config.getCalendarValue(), (int) eventTime);
        if (!config.getTimeUnit().equals(PlayOutConfig.YEARS)
                && !config.getTimeUnit().equals((PlayOutConfig.MONTHS))){
            calendar.add(Calendar.MILLISECOND, (int) (eventTime % 1 * config.getTimeUnitMultiplier()));
        } else { //value becomes to large for int
            //Months and decimal numbers don't work well together
            if (config.getTimeUnit().equals(PlayOutConfig.MONTHS) && eventTime % 1 != 0){
                int month = calendar.get(Calendar.MONTH);
                double monthMultiplier;
                if(month == 1){
                    monthMultiplier = 28.0/31.0;
                } else if (month == 3 || month == 5 || month == 8 || month == 10){
                    monthMultiplier = 30.0/31.0;
                } else {
                    monthMultiplier = 1;
                }
                calendar.add(Calendar.SECOND, (int) (eventTime % 1 * monthMultiplier * (config.getTimeUnitMultiplier()/1000)));
            } else {
                calendar.add(Calendar.SECOND, (int) (eventTime % 1 * (config.getTimeUnitMultiplier() / 1000)));
            }
        }
        return calendar.getTime();
    }

    /*
     * Returns the lifecycle transition for the given event.
     */
    private String getLifeCycleTransitionFromEvent(PlayOutEvent event, PlayOutConfig config){
        String result = "";
        if(!config.getRecordedEvents().equals(PlayOutConfig.TRANSITION)) {
            // Get the lifecycle transition from the event.
            result = event.getLifeCycleTransition();
        } else {
            // Get the lifecycle transition from the transition name. The transition name should then end with "+" followed by the lifecycle transition.
            String transitionString = event.getBinding().getTransitionInstance().getNode().getName().asString();
            String[] parts = transitionString.split(Pattern.quote("+"));
            int sizeOfParts = parts.length;
            if (sizeOfParts <= 1) {
                return result;
            } else {
                String possibleLifeCycle = parts[sizeOfParts-1];
                if (!XLifecycleExtension.StandardModel.decode(possibleLifeCycle).equals(XLifecycleExtension.StandardModel.UNKNOWN)){
                    // Found a known value for the lifecycle transition.
                    return possibleLifeCycle;
                }
                return result;
            }
        }
        return result;
    }

    /*
     * Returns the concept name for the event.
     */
    private String getConceptNameFromEvent(PlayOutEvent event, String lifeCycleTransitionValue, PlayOutConfig config){
        String result;
        if (!config.getRecordedEvents().equals(PlayOutConfig.TRANSITION)) {
            // Use the name of the transition as the name of the event.
            result = event.getBinding().getTransitionInstance().getNode().getName().asString();
        } else {
            // Strip the possible "+complete" etc. from the name oif the transition, and use that.
            result = event.getBinding().getTransitionInstance().getNode().getName().asString().replace("+" + lifeCycleTransitionValue, "");
        }
        return result;
    }

    /*
     * Returns all variable declarations used by the given binding.
     */
    private String[] getVarDeclarationsFromEvent(PlayOutEvent event, PlayOutConfig config){
        Set<String> keySet = config.getVarDeclarations().keySet();
        String[] result = new String[keySet.size()];
        int i = 0;
        for (String key: keySet) {
            if (event.getBinding().getValueAssignment(key) != null) {
                String value = event.getBinding().getValueAssignment(key).getValue();
                result[i] = sanitize(value);
            } else {
                result[i] = "";
            }
            i++;
        }
        return result;
    }

    /*
     * Sanitizes the given value:
     * - Negative numbers like (~1) are sanitized to -1.
     * - Booleans are sanitized to all lower case characters.
     */
    private String sanitize(String value) {
        if (value.startsWith("(~") && value.endsWith(")")) {
            // Is a negative number.
            return "-" + value.substring(2, value.length()-1);
        }
        if (value.equalsIgnoreCase("true")) {
            return "true";
        }
        if (value.equalsIgnoreCase("false")) {
            return "false";
        }
        return value;
    }

    @Override
    public boolean hasEmptyLog() {
        return log.size() == 1;
    }

    @Override
    public void exportLog(File file) {
        try (PrintWriter pw = new PrintWriter(file)) {
            log.stream().map(this::convertToCSV).forEach(pw::println);
            assertTrue(file.exists());
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    /*
     * Used by the XES exporter.
     */
    protected List<String[]> getLog() {
        return log;
    }

    /*
     * Converts data to CSV data.
     */
    private String convertToCSV(String[] data) {
        return Stream.of(data).map(this::escapeSpecialCharacters).collect(Collectors.joining(","));
    }

    /*
     * Escape some special characters.
     */
    private String escapeSpecialCharacters(String data) {
        String escapedData = data.replaceAll("\\R", " ");
        if (data.contains(",") || data.contains("\"") || data.contains("'")) {
            data = data.replace("\"", "\"\"");
            escapedData = "\"" + data + "\"";
        }
        return escapedData;
    }

}
