package com.indevstudio.cpnide.server.model.monitors;

public class MonitorTemplateFactory {
    public static MonitorTemplate createMonitorTemplate(MonitorTypes type) throws Exception
    {
        switch (type)
        {
            case BREAKPOINT:
                return new BreakpointMonitorTemplate();
            case MARKING_SIZE:
                return new MarkingSizeMonitorTemplate();
            case USER_DEFINED:
                return new UserDefinedMonitorTemplate();
            case WRITE_IN_FILE:
                return new WriteInFileMonitorTemplate();
            case DATA_COLLECTION:
                return new DataCollectionMonitorTemplate();
            case PLACE_CONTENT_BP:
                return new PlaceContentBpMonitorTemplate();
            case TRANSITION_ENABLED:
                return new TransitionEnabledMonitorTemplate();
            case LIST_LEN_DATA_COLLECTION:
                return new ListLenDataCollectionMonitorTemplate();
            case COUNT_TRANSITION_OCCURRENCES:
                return new CountTransitionOccurrencesMonitorTemplate();
        }
        throw new Exception("Unknown montior type");
    }
}
