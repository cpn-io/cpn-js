package com.indevstudio.cpnide.server.playout;

import lombok.Data;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Data
public class PlayOutConfig {

    public static final String CSV = "csv";
    public static final String XES = "xes";

    public static final String START = "start";
    public static final String COMPLETE = "complete";
    public static final String STARTCOMPLETE = "start+complete";
    public static final String TRANSITION = "in transition name";

    public static final String YEARS = "years";
    public static final String MONTHS = "months";
    public static final String WEEKS = "weeks";
    public static final String DAYS = "days";
    public static final String HOURS = "hours";
    public static final String MINUTES = "minutes";
    public static final String SECONDS = "seconds";

    /*
     * THe variable to be used for the case ID.
     */
    private String caseId;

    /*
     ( The export type (must be "csv" or "xes").
     */
    private String exportType;

    /*
     * Whether information level is event.
     * Not sure what this does.
     */
    private Boolean informationLevelIsEvent;

    /*
     * Which events need to be recorded (must be "start", "complete", "start+complete", or "in transition name").
     */
    private String recordedEvents;
    private String startDateTime;
    private String timeUnit;
    private Map<String, String> varDeclarations;
    private DateFormat dateFormat;

    private String path;
    private String fileName;

    // These values need to be initialized from other values
    private long timeUnitMultiplier;
    private long startTimeLong;
    private int calendarValue;

    private boolean isInitialized = false;

    public PlayOutConfig() {
        /*
         * The following fields will be set automatically from the body of the received message:
         * - caseId
         * - startDateTime
         * - timeUnit
         * - recordedEvents
         * - informationLevelIsEvent
         * - exportType
         * Changing names for these fields may lead to issues.
         */
        varDeclarations = new HashMap<String,String>();
        dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss.SSS", Locale.US);
    }

    public void initializeConfig(Double timeLastUpdatedEvent) throws ParseException {
        setTimeUnitMultiplier();
        setStartTime();
//        setTimeHasIncreased(timeLastUpdatedEvent);
        isInitialized = true;
    }

    public long getTimeUnitMultiplier() {
        // RETURN ERROR IF NOT INITIALIZED
        if (!isInitialized) {
            setTimeUnitMultiplier();
        }
        return timeUnitMultiplier;
    }

    public int getCalendarValue() {
        return calendarValue;
    }

    public void setTimeUnitMultiplier(){
        switch (timeUnit) {
            case YEARS:
                timeUnitMultiplier = (long) 1000 * 60 * 60 * 24 * 365;
                calendarValue = Calendar.YEAR;
                break;
            case MONTHS:
                timeUnitMultiplier = (long) 1000 * 60 * 60 * 24 * 31;
                calendarValue = Calendar.MONTH;
                break;
            case WEEKS:
                timeUnitMultiplier = 1000L * 60 * 60 * 24 * 7;
                calendarValue = Calendar.WEEK_OF_YEAR;
                break;
            case DAYS:
                timeUnitMultiplier = 1000L * 60 * 60 * 24;
                calendarValue = Calendar.DAY_OF_YEAR;
                break;
            case HOURS:
                timeUnitMultiplier = 1000L * 60 * 60;
                calendarValue = Calendar.HOUR_OF_DAY;
                break;
            case MINUTES:
                timeUnitMultiplier = 1000L * 60;
                calendarValue = Calendar.MINUTE;
                break;
            case SECONDS:
                timeUnitMultiplier = 1000L;
                calendarValue = Calendar.SECOND;
                break;
            default:
                System.out.println("no correct timeUnit given");
                throw new IllegalArgumentException(timeUnit + " is not a valid timeunit");
        }
    }

    public long getStartTimeLong(){
        //RETURN ERROR IF NOT INITIALIZED
        if (!isInitialized) {
            setStartTime();
        }
        return startTimeLong;
    }

    public void setStartTime(){
        String modifiedStartDateTimeString = startDateTime.replace("T", " ");
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date date = null;
        try {
            date = formatter.parse(modifiedStartDateTimeString);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        this.startTimeLong = date.getTime();
    }

    public void setVarDeclarations(Map<String, String> varDeclarations) {
        this.varDeclarations.clear();
        this.varDeclarations.putAll(varDeclarations);
    }

}
